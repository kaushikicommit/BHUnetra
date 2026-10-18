import json, math
from shapely.geometry import shape
from shapely.validation import make_valid

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)["features"]

changes = load("data/change_candidates.geojson")
zones = load("data/protected_zones.geojson")

# degree^2 -> hectare (approx, is latitude pe)
HA = (111320 ** 2) * math.cos(math.radians(28.45)) / 10000

zone_list = []
for f in zones:
    g = f.get("geometry")
    if not g or g["type"] not in ("Polygon", "MultiPolygon"):
        continue
    props = f.get("properties", {})
    tags = props.get("tags") or props
    is_protected = (tags.get("boundary") == "protected_area"
                    or tags.get("leisure") == "nature_reserve")
    zone_list.append({
        "geom": make_valid(shape(g)),
        "name": tags.get("name", "unnamed"),
        "type": "protected" if is_protected else "forest",
    })

print("Zones loaded:", len(zone_list),
      "| protected:", sum(z["type"] == "protected" for z in zone_list),
      "| forest:", sum(z["type"] == "forest" for z in zone_list))

out = []
for c in changes:
    cg = make_valid(shape(c["geometry"]))
    best = None
    for z in zone_list:
        if cg.intersects(z["geom"]):
            ov = cg.intersection(z["geom"]).area * HA
            rank = (z["type"] == "protected", ov)
            if best is None or rank > best[0]:
                best = (rank, z, ov)
    if best and best[2] > 0.01:
        _, z, ov = best
        out.append({
            "type": "Feature",
            "properties": {
                "change_area_ha": c["properties"]["area_ha"],
                "overlap_ha": round(ov, 2),
                "zone_type": z["type"],
                "zone_name": z["name"],
            },
            "geometry": c["geometry"],
        })

with open("data/changes_in_zones.geojson", "w") as f:
    json.dump({"type": "FeatureCollection", "features": out}, f)

print("Total changes:", len(changes))
print("Changes zone ke andar:", len(out))
print("  protected area me:", sum(o["properties"]["zone_type"] == "protected" for o in out))
print("  forest me:", sum(o["properties"]["zone_type"] == "forest" for o in out))
for o in out:
    p = o["properties"]
    print(" -", p["zone_type"], "|", p["zone_name"], "|", p["overlap_ha"], "ha")