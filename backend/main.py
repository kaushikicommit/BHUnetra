"""BHUnetra backend: FastAPI + PostGIS.

Run:  uvicorn main:app --reload
Docs: http://127.0.0.1:8000/docs
"""
from contextlib import asynccontextmanager
from datetime import date
from pydantic import BaseModel

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import fetch_all, fetch_one, pool


@asynccontextmanager
async def lifespan(app: FastAPI):
    pool.open()
    yield
    pool.close()


app = FastAPI(title="BHUnetra API", version="0.1.0", lifespan=lifespan)

# Allow the React dev server to call this API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def to_feature_collection(rows: list[dict]) -> dict:
    """Turn query rows (with a 'geometry' column) into a GeoJSON FeatureCollection."""
    features = []
    for row in rows:
        props = {k: v for k, v in row.items() if k != "geometry"}
        features.append(
            {"type": "Feature", "geometry": row["geometry"], "properties": props}
        )
    return {"type": "FeatureCollection", "features": features}


def get_region_or_404(region_id: int) -> None:
    if not fetch_one("SELECT 1 FROM regions WHERE id = %s", (region_id,)):
        raise HTTPException(status_code=404, detail="Region not found")


@app.get("/health")
def health():
    return {"status": "ok", "postgis": fetch_one("SELECT PostGIS_Version() AS v")["v"]}


@app.get("/regions")
def list_regions():
    rows = fetch_all(
        """
        SELECT id, name, description,
               ST_AsGeoJSON(boundary)::json AS geometry
        FROM regions ORDER BY id
        """
    )
    return to_feature_collection(rows)


@app.get("/regions/{region_id}")
def get_region(region_id: int):
    row = fetch_one(
        """
        SELECT id, name, description,
               ST_AsGeoJSON(boundary)::json AS geometry
        FROM regions WHERE id = %s
        """,
        (region_id,),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Region not found")
    return to_feature_collection([row])["features"][0]


@app.get("/regions/{region_id}/snapshots")
def region_snapshots(region_id: int, snapshot_date: date | None = None):
    get_region_or_404(region_id)
    rows = fetch_all(
        """
        SELECT id, snapshot_date, land_class, area_ha,
               ST_AsGeoJSON(geom)::json AS geometry
        FROM land_class_snapshots
        WHERE region_id = %s AND (%s::date IS NULL OR snapshot_date = %s::date)
        ORDER BY snapshot_date, land_class
        """,
        (region_id, snapshot_date, snapshot_date),
    )
    return to_feature_collection(rows)


@app.get("/regions/{region_id}/changes")
def region_changes(region_id: int, protected_only: bool = False):
    get_region_or_404(region_id)
    rows = fetch_all(
        """
        SELECT c.id, c.from_class, c.to_class, c.date_from, c.date_to,
               c.area_ha, c.confidence, c.in_protected_zone,
               z.name AS protected_zone,
               ST_AsGeoJSON(c.geom)::json AS geometry
        FROM change_events c
        LEFT JOIN protected_zones z ON z.id = c.protected_zone_id
        WHERE c.region_id = %s AND (NOT %s OR c.in_protected_zone)
        ORDER BY c.id
        """,
        (region_id, protected_only),
    )
    return to_feature_collection(rows)


@app.get("/regions/{region_id}/protected-zones")
def region_protected_zones(region_id: int):
    get_region_or_404(region_id)
    rows = fetch_all(
        """
        SELECT id, name, zone_type,
               ST_AsGeoJSON(boundary)::json AS geometry
        FROM protected_zones WHERE region_id = %s ORDER BY id
        """,
        (region_id,),
    )
    return to_feature_collection(rows)


@app.get("/alerts")
def alerts(region_id: int | None = None):
    """Changes that fall inside a protected zone."""
    rows = fetch_all(
        """
        SELECT c.id, c.region_id, c.from_class, c.to_class, c.date_from, c.date_to,
               c.area_ha, c.confidence, z.name AS protected_zone,
               ST_AsGeoJSON(c.geom)::json AS geometry
        FROM change_events c
        JOIN protected_zones z ON z.id = c.protected_zone_id
        WHERE c.in_protected_zone AND (%s::int IS NULL OR c.region_id = %s::int)
        ORDER BY c.area_ha DESC
        """,
        (region_id, region_id),
    )
    return to_feature_collection(rows)


class AnalysisRequest(BaseModel):
    region: str
    start_date: date
    end_date: date


@app.post("/analysis")
def run_analysis(req: AnalysisRequest):
    """Summarise detected changes for a region and date range.

    Reads change_events already stored in the database. If nothing overlaps the
    requested dates, falls back to the region's latest stored period so the
    dashboard is never empty (demo data). Later, the ML step fills that table.
    """
    if req.start_date >= req.end_date:
        raise HTTPException(
            status_code=400,
            detail="The second date must be later than the first date.",
        )

    key = req.region.strip()
    region = fetch_one(
        "SELECT id, name FROM regions WHERE lower(name) = lower(%s) OR id::text = %s",
        (key, key),
    )
    if not region:
        raise HTTPException(status_code=404, detail=f"Unknown region: {req.region}")

    changes_sql = """
        SELECT c.id, c.from_class, c.to_class, c.date_from, c.date_to,
               c.area_ha, c.confidence, c.in_protected_zone,
               z.name AS protected_zone,
               ST_AsGeoJSON(c.geom)::json AS geometry
        FROM change_events c
        LEFT JOIN protected_zones z ON z.id = c.protected_zone_id
        WHERE c.region_id = %s AND c.date_from <= %s AND c.date_to >= %s
        ORDER BY c.area_ha DESC
    """
    changes = fetch_all(changes_sql, (region["id"], req.end_date, req.start_date))

    period_from, period_to = req.start_date, req.end_date
    used_fallback = False
    if not changes:
        latest = fetch_one(
            """
            SELECT date_from, date_to FROM change_events
            WHERE region_id = %s
            ORDER BY date_to DESC, date_from DESC LIMIT 1
            """,
            (region["id"],),
        )
        if latest:
            period_from, period_to = latest["date_from"], latest["date_to"]
            changes = fetch_all(changes_sql, (region["id"], period_to, period_from))
            used_fallback = True

    # Total area per transition type, for the bar chart
    totals: dict[str, float] = {}
    for c in changes:
        k = f"{c['from_class']} → {c['to_class']}"
        totals[k] = totals.get(k, 0) + float(c["area_ha"] or 0)
    transitions = [
        {"name": name, "area": round(area, 2)}
        for name, area in sorted(totals.items(), key=lambda kv: -kv[1])
    ]

    # Changes that overlap a protected zone become alerts
    alerts = [
        {
            "title": f"{c['from_class']} → {c['to_class']} inside {c['protected_zone']}",
            "subtitle": f"{c['area_ha']} ha, {c['confidence']}% confidence",
            "area_ha": c["area_ha"],
            "protected_zone": c["protected_zone"],
        }
        for c in changes
        if c["in_protected_zone"]
    ]

    total_ha = round(sum(float(c["area_ha"] or 0) for c in changes), 2)

    # Latest land-cover snapshot on or before the end of the period (may be empty)
    cover_date = period_to if used_fallback else req.end_date
    land_cover = fetch_all(
        """
        SELECT land_class AS name, ROUND(SUM(area_ha)::numeric, 2) AS area
        FROM land_class_snapshots
        WHERE region_id = %s
          AND snapshot_date = (
              SELECT MAX(snapshot_date) FROM land_class_snapshots
              WHERE region_id = %s AND snapshot_date <= %s)
        GROUP BY land_class ORDER BY area DESC
        """,
        (region["id"], region["id"], cover_date),
    )

    # Keep a history of every analysis run
    with pool.connection() as conn:
        run = conn.execute(
            """
            INSERT INTO analysis_runs
                (region_id, date_from, date_to, status, total_change_ha, alert_count, finished_at)
            VALUES (%s, %s, %s, 'done', %s, %s, now())
            RETURNING id
            """,
            (region["id"], req.start_date, req.end_date, total_ha, len(alerts)),
        ).fetchone()

    return {
        "analysis_id": run["id"],
        "region": region["name"],
        "start_date": req.start_date,
        "end_date": req.end_date,
        "period_used": {
            "date_from": period_from,
            "date_to": period_to,
            "fallback": used_fallback,
        },
        "total_changed_ha": total_ha,
        "transition_count": len(transitions),
        "protected_alert_count": len(alerts),
        "transitions": transitions,
        "land_cover": land_cover,
        "alerts": alerts,
        "changes": to_feature_collection(changes),
    }
