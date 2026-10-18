import os, math
import numpy as np
import rasterio
from rasterio.windows import from_bounds
from rasterio.warp import transform_bounds
from rasterio.transform import from_origin
from rasterio.enums import Resampling
from pystac_client import Client

# AOI (aoi.geojson wala box): west, south, east, north
AOI = (77.17, 28.40, 77.27, 28.49)
BANDS = ["blue", "green", "red", "nir", "swir16"]  # B02, B03, B04, B08, B11
JOBS = {
    "region_2023": "2023-10-10/2023-10-31",
}

os.makedirs("data/raw", exist_ok=True)
catalog = Client.open("https://earth-search.aws.element84.com/v1")


def pick_item(date_range):
    search = catalog.search(
        collections=["sentinel-2-l2a"],
        bbox=AOI,
        datetime=date_range,
        query={"eo:cloud_cover": {"lt": 15}},
    )
    items = list(search.items())
    full = [
        i for i in items
        if i.bbox[0] <= AOI[0] and i.bbox[1] <= AOI[1]
        and i.bbox[2] >= AOI[2] and i.bbox[3] >= AOI[3]
    ]
    items = full or items
    items.sort(key=lambda i: i.properties["eo:cloud_cover"])
    print(f"\nMile hue options ({date_range}):")
    for i in items[:6]:
        print("  ", i.datetime.date(), "cloud:", round(i.properties["eo:cloud_cover"], 1), "%")
    if not items:
        raise SystemExit("Koi image nahi mili, date range badha do.")
    return items[0]


def save(item, name):
    href = {b: item.assets[b].href for b in BANDS}
    with rasterio.open(href["red"]) as ref:
        crs = ref.crs
    l, b, r, t = transform_bounds("EPSG:4326", crs, *AOI)
    l = math.floor(l / 10) * 10
    b = math.floor(b / 10) * 10
    r = math.ceil(r / 10) * 10
    t = math.ceil(t / 10) * 10
    w, h = int((r - l) / 10), int((t - b) / 10)

    arrays = []
    for band in BANDS:
        with rasterio.open(href[band]) as src:
            win = from_bounds(l, b, r, t, src.transform)
            arr = src.read(1, window=win, out_shape=(h, w),
                           resampling=Resampling.bilinear)
            arrays.append(arr)
        print("  band done:", band)

    out = f"data/raw/{name}.tif"
    with rasterio.open(out, "w", driver="GTiff", height=h, width=w, count=5,
                       dtype="uint16", crs=crs,
                       transform=from_origin(l, t, 10, 10)) as dst:
        for i, a in enumerate(arrays, 1):
            dst.write(a.astype("uint16"), i)
        dst.descriptions = ("B02", "B03", "B04", "B08", "B11")

    # chhota preview taaki dekh sako ki image saaf hai
    rgb = np.stack([arrays[2], arrays[1], arrays[0]]).astype("float32")
    rgb = (np.clip(rgb / 3000, 0, 1) * 255).astype("uint8")
    with rasterio.open(f"data/raw/{name}_preview.png", "w", driver="PNG",
                       height=h, width=w, count=3, dtype="uint8") as dst:
        dst.write(rgb)
    print("Saved:", out)


for name, date_range in JOBS.items():
    item = pick_item(date_range)
    print("Chuni gayi date:", item.datetime.date())
    save(item, name)

print("\nDone! data/raw folder dekho.")