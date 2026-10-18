import json

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)["features"]

def feat(geom, props):
    return {"type": "Feature", "geometry": geom, "properties": props}

feats = []

# protected area / sanctuary (hara)
for f in load("data/protected_zones.geojson"):
    g = f.get("geometry")
    if not g or g["type"] not in ("Polygon", "MultiPolygon"):
        continue
    p = f.get("properties", {})
    tags = p.get("tags") or p
    if tags.get("boundary") == "protected_area" or tags.get("leisure") == "nature_reserve":
        feats.append(feat(g, {"name": tags.get("name", "protected"),
                              "fill": "#2e7d32", "fill-opacity": 0.25,
                              "stroke": "#2e7d32", "stroke-width": 2}))

# saare changes (peela)
for f in load("data/change_candidates.geojson"):
    feats.append(feat(f["geometry"], {"name": "change",
                                      "fill": "#ffd600", "fill-opacity": 0.9,
                                      "stroke": "#ff6f00", "stroke-width": 1}))

# protected zone ke andar wale changes (laal, sabse upar)
for f in load("data/changes_in_zones.geojson"):
    p = f["properties"]
    feats.append(feat(f["geometry"], {"name": p["zone_name"],
                                      "overlap_ha": p["overlap_ha"],
                                      "fill": "#d50000", "fill-opacity": 0.95,
                                      "stroke": "#7f0000", "stroke-width": 2}))

with open("data/demo_map.geojson", "w") as f:
    json.dump({"type": "FeatureCollection", "features": feats}, f)
print("Done: data/demo_map.geojson |", len(feats), "features")