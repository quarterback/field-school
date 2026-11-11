#!/usr/bin/env python3
"""Render the student-edition planning map from the V3 draft GeoJSON.

Draws only what the repository data contains: the provisional study boundary
and the twenty neighborhood label points, coloured by planning region. It adds
no roads, parcels or neighborhood polygons, because none have been approved.
"""
from pathlib import Path
import json, math
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
SRC = HERE.parent / "v3" / "east_detroit_2030_draft.geojson"
OUT = HERE / "figures" / "east_detroit_2030_provisional_map.png"

# Okabe-Ito palette: distinguishable with common forms of colour blindness.
REGIONS = {
    "South / Historic": "#D55E00",
    "Central / Downtown": "#0072B2",
    "West / Residential": "#009E73",
    "East / Growth": "#CC79A7",
    "North / Expansion": "#E69F00",
}
LEFT_LABELS = {"ED06"}
INK, MUTED, PAPER, FILL = "#1d2b30", "#55666c", "#ffffff", "#eef3f1"


def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(f"/usr/share/fonts/truetype/dejavu/{name}", size)


def main():
    geo = json.loads(SRC.read_text(encoding="utf-8"))
    boundary = geo["features"][0]
    points = [f for f in geo["features"][1:] if f["geometry"]["type"] == "Point"]
    ring = boundary["geometry"]["coordinates"][0]

    W, H = 2400, 2000
    map_l, map_t, map_r, map_b = 90, 230, 1640, 1880
    lons = [x for x, _ in ring]
    lats = [y for _, y in ring]
    pad = 0.012
    west, east = min(lons) - pad, max(lons) + pad
    south, north = min(lats) - pad, max(lats) + pad
    kx = math.cos(math.radians((south + north) / 2))  # equirectangular correction
    span_x, span_y = (east - west) * kx, north - south
    scale = min((map_r - map_l) / span_x, (map_b - map_t) / span_y)
    ox = map_l + ((map_r - map_l) - span_x * scale) / 2
    oy = map_t + ((map_b - map_t) - span_y * scale) / 2

    def xy(lon, lat):
        return (ox + (lon - west) * kx * scale, oy + (north - lat) * scale)

    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)

    d.text((90, 60), "East Detroit 2030: provisional study boundary and neighborhoods",
           font=font(46, True), fill=INK)
    d.text((90, 130), "Fictional East Detroit 2030 planning scenario. Not a legal, surveyed or "
           "Census map.", font=font(28), fill=MUTED)

    d.polygon([xy(x, y) for x, y in ring], fill=FILL, outline=INK)
    d.line([xy(x, y) for x, y in ring] + [xy(*ring[0])], fill=INK, width=5, joint="curve")

    lab = font(24, True)
    sub = font(21)
    for f in points:
        p = f["properties"]
        x, y = xy(*f["geometry"]["coordinates"])
        c = REGIONS[p["district"]]
        r = 17
        d.ellipse((x - r, y - r, x + r, y + r), fill=c, outline=INK, width=3)
        if p["id"] in LEFT_LABELS:  # avoid collisions with a nearby label
            w = max(d.textlength(p["id"], font=lab), d.textlength(p["name"], font=sub))
            tx = x - 24 - w
        else:
            tx = x + 24
        d.text((tx, y - 27), p["id"], font=lab, fill=INK)
        d.text((tx, y + 1), p["name"], font=sub, fill=INK)

    # Scale bar: 5 miles.
    miles = 5
    px = miles / 69.0 * scale  # 1 degree of latitude is about 69 miles
    sx, sy = map_l + 20, map_b - 10
    d.rectangle((sx, sy - 12, sx + px, sy), fill=INK)
    d.text((sx, sy - 48), f"{miles} miles (approximate)", font=font(22), fill=INK)
    # North arrow.
    ax, ay = map_r - 40, map_t + 20
    d.polygon([(ax, ay), (ax - 18, ay + 50), (ax + 18, ay + 50)], fill=INK)
    d.text((ax - 10, ay + 56), "N", font=font(26, True), fill=INK)

    # Legend.
    lx, ly = 1720, 260
    d.text((lx, ly), "Planning region", font=font(30, True), fill=INK)
    ly += 60
    for name, c in REGIONS.items():
        d.ellipse((lx, ly, lx + 32, ly + 32), fill=c, outline=INK, width=3)
        d.text((lx + 48, ly), name, font=font(25), fill=INK)
        ly += 54
    ly += 20
    d.rectangle((lx, ly, lx + 32, ly + 32), fill=FILL, outline=INK, width=5)
    d.text((lx + 48, ly - 2), "Study boundary", font=font(25), fill=INK)
    d.text((lx + 48, ly + 30), "(about 115.4 sq mi)", font=font(22), fill=MUTED)
    ly += 110

    notes = [
        "How to read this map",
        "",
        "Dots are label points, not",
        "neighborhood boundaries. No",
        "neighborhood polygons have",
        "been approved.",
        "",
        "The outline is a conceptual",
        "study extent. It has not been",
        "checked against county, city,",
        "airport, school or utility",
        "lines.",
        "",
        "Planning regions are for",
        "reporting, not zoning.",
    ]
    for i, line in enumerate(notes):
        d.text((lx, ly), line, font=font(24, i == 0), fill=INK if i == 0 else MUTED)
        ly += 34

    d.text((90, H - 80), "Source: east-detroit/v3/east_detroit_2030_draft.geojson (WGS84). "
           "Drawn without a basemap. Prepared for Public Mechanics, November 2026.",
           font=font(21), fill=MUTED)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    im.save(OUT, optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
