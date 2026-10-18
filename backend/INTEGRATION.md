# BHUnetra: ML / satellite integration contract

Flow: imagery -> preprocessing -> classification -> change detection -> rows in PostgreSQL -> FastAPI -> React

## What the ML / image-processing module provides
One Python function (suggested file: `pipeline.py`):

    def run_pipeline(region_id: int, date_from: date, date_to: date) -> dict:
        return {
          "snapshots": [   # land cover per date
            {"snapshot_date": date, "land_class": str, "area_ha": float, "geometry": GeoJSON},
          ],
          "changes": [     # detected transitions
            {"from_class": str, "to_class": str, "area_ha": float,
             "confidence": float, "geometry": GeoJSON},
          ],
          "images": {      # optional, for the before/after panels
            "before_png": "path", "after_png": "path",
            "bounds": [[south, west], [north, east]],
          },
        }

## Rules (the database enforces some of these)
- Class names must be exactly: Vegetation, Water, Agriculture, Built-up, Barren
  (the database rejects anything else, e.g. "Barren land" fails).
- Geometry: GeoJSON Polygon or MultiPolygon in EPSG:4326 (longitude, latitude).
- area_ha in hectares, confidence from 0 to 100.
- Do NOT compute protected-zone overlap. The backend does it with PostGIS (ST_Intersects).

## Backend responsibilities
- Call run_pipeline, insert into land_class_snapshots and change_events,
  set in_protected_zone / protected_zone_id, save the run in analysis_runs,
  and return the summary JSON the frontend already uses.

## Open questions to settle together
1. How long does one run take? (If over about 60 seconds, we switch to a background job + status polling.)
2. Where are the before/after images stored, and in what format?
3. Which regions and dates will have real imagery?
