import json
import numpy as np
import rasterio
from rasterio.features import shapes, sieve
from rasterio.warp import transform_geom

def load(path):
    with rasterio.open(path) as s:
        a = s.read().astype("float32")
        return np.clip((a - 1000) / 10000, 0, 1), s.transform, s.crs

a, t, crs = load("data/raw/region_2023.tif")
b, t2, _ = load("data/raw/region_2026.tif")
assert a.shape == b.shape, "dono images ka size alag hai"

def ndvi(x):  # bands: blue, green, red, nir, swir
    return (x[3] - x[2]) / (x[3] + x[2] + 1e-6)

n1, n2 = ndvi(a), ndvi(b)

# hari/vegetation wali jagah jo ab khuli/bani hui ho gayi
mask = ((n1 > 0.35) & (n2 < 0.20)).astype("uint8")
mask = sieve(mask, 20)  # chhote noise dots hata do

feats = []
for geom, val in shapes(mask, mask=mask.astype(bool), transform=t):
    ring = geom["coordinates"][0]
    area = 0.5 * abs(sum(x1 * y2 - x2 * y1
                         for (x1, y1), (x2, y2) in zip(ring, ring[1:])))
    if area < 5000:  # 0.5 hectare se chhote ignore
        continue
    feats.append({
        "type": "Feature",
        "properties": {"area_ha": round(area / 10000, 2)},
        "geometry": transform_geom(crs, "EPSG:4326", geom),
    })

with open("data/change_candidates.geojson", "w") as f:
    json.dump({"type": "FeatureCollection", "features": feats}, f)
print("Changes mile:", len(feats))

# preview: 2026 image pe red = change
rgb = np.stack([b[2], b[1], b[0]])
rgb = (np.clip(rgb / 0.15, 0, 1) * 255).astype("uint8")
rgb[:, mask.astype(bool)] = np.array([255, 0, 0])[:, None]
h, w = mask.shape
with rasterio.open("data/change_preview.png", "w", driver="PNG",
                   height=h, width=w, count=3, dtype="uint8") as d:
    d.write(rgb)
print("Done: data/change_preview.png aur data/change_candidates.geojson")