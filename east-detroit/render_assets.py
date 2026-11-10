#!/usr/bin/env python3
"""Render a schematic PNG and ZIP from the East Detroit fictional planning data."""
from pathlib import Path
import json, random, zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
GEO = json.loads((ROOT / "east_detroit_scenario.geojson").read_text(encoding="utf-8"))
W, H = 1500, 1040
im = Image.new("RGB", (W, H), "#f4f1e8")
d = ImageDraw.Draw(im)
rand = random.Random(20261110)

def font(size, bold=False):
    p = "/usr/share/fonts/truetype/dejavu/DejaVuSans" + ("-Bold" if bold else "") + ".ttf"
    return ImageFont.truetype(p, size=size)

large = font(48, True)
mid = font(20, True)
regular = font(15)
small = font(13)
d.rectangle((0, 0, W, 106), fill="#173b47")
d.text((72, 26), "EAST DETROIT", font=large, fill="white")
d.text((650, 44), "CITY & COUNTY  /  COLORADO", font=font(26), fill="#d1e4e6")
# This is an illustrated study map, not actual satellite data.
left, top, right, bottom = 90, 140, W - 90, H - 102
west, east, south, north = -104.635, -104.437, 39.728, 39.842
def xy(lon, lat):
    return (round(left + (lon-west)/(east-west)*(right-left)),
            round(bottom - (lat-south)/(north-south)*(bottom-top)))

# Deterministic agricultural parcel pattern.
palette = ["#e9e5d6", "#e0e3d6", "#eee8d3", "#e5e3da", "#f4ecd4", "#dfdfd2"]
for k in range(420):
    x=rand.randrange(left,right-25)
    y=rand.randrange(top,bottom-25)
    a=rand.randrange(18,96); b=rand.randrange(16,65)
    d.rectangle((x,y,min(x+a,right),min(y+b,bottom)), fill=rand.choice(palette))

# Schematic road grid.
roadx=[-104.612,-104.588,-104.565,-104.541,-104.517,-104.493,-104.468,-104.458]
roady=[39.828,39.813,39.797,39.782,39.764,39.751,39.738]
for lon in roadx:
    x,_=xy(lon,39.78)
    d.line([(x,top),(x,bottom)],fill="#fffefa",width=8)
    d.line([(x,top),(x,bottom)],fill="#bbc2b9",width=1)
for lat in roady:
    _,y=xy(-104.52,lat)
    d.line([(left,y),(right,y)], fill="#fffefa",width=8)
    d.line([(left,y),(right,y)], fill="#bec2b8",width=1)

# Fictional districts are taken from the map's actual companion GeoJSON.
zones=[f for f in GEO["features"] if f["geometry"]["type"]=="Polygon"]
boundary=next(f for f in zones if "boundary" in f["properties"].get("category","").lower())
zones=[f for f in zones if f is not boundary]
layer=Image.new("RGBA",(W,H),(0,0,0,0))
over=ImageDraw.Draw(layer)
for f in zones:
    name=f["properties"]["name"]
    coords=f["geometry"]["coordinates"][0]
    pts=[xy(*c) for c in coords]
    rgb=tuple(bytes.fromhex(f["properties"]["fill"].lstrip("#")))
    over.polygon(pts,fill=(*rgb,212),outline=(255,255,255,255),width=3)
im=Image.alpha_composite(im.convert("RGBA"),layer)
d=ImageDraw.Draw(im)
for f in zones:
    pts=[xy(*c) for c in f["geometry"]["coordinates"][0]]
    name=f["properties"]["name"].upper()
    cx=sum(x for x,y in pts[:-1])/max(len(pts)-1,1)
    cy=sum(y for x,y in pts[:-1])/max(len(pts)-1,1)
    bbox=d.textbbox((0,0),name,font=mid)
    tw=bbox[2]-bbox[0]
    if name=="AIRFIELD PROTECTION":
        name="AIRFIELD"
        bbox=d.textbbox((0,0),name,font=mid);tw=bbox[2]-bbox[0]
    d.text((cx-tw/2+1,cy-9+1),name,font=mid,fill="white",stroke_width=3,stroke_fill="white")
    d.text((cx-tw/2,cy-9),name,font=mid,fill="#263742")
outline=[xy(*c) for c in boundary["geometry"]["coordinates"][0]]
d.line(outline,fill="#bf494b",width=7,joint="curve")
# Roads, labels and orientation.
for lon,label in [(-104.612,"Hudson Rd"),(-104.565,"Quail Run Rd"),(-104.517,"Manila Rd"),(-104.468,"Schumaker Rd")]:
    x,_=xy(lon,39.83)
    d.text((x+6,118),label,font=small,fill="#304049")
for lat,label in [(39.828,"E 72nd Ave"),(39.797,"E 56th Ave"),(39.764,"E 38th Ave")]:
    _,y=xy(-104.52,lat)
    d.text((95,y-23),label,font=small,fill="#304049")
_,i70y=xy(-104.55,39.740)
d.line([(left,i70y+20),(right,i70y-20)],fill="#d7b870",width=13)
d.line([(left,i70y+20),(right,i70y-20)],fill="#fff7db",width=8)
d.text((280,i70y-17),"I-70",font=font(26,True),fill="#2b3840",stroke_width=3,stroke_fill="white")
d.text((W-110,150),"N",font=mid,fill="#173b47")
d.polygon([(W-110,173),(W-123,206),(W-110,198),(W-97,206)],fill="#173b47")
# Key deliberately occupies only the border margin at bottom.
d.rectangle((0,H-92,W,H),fill="#f4f1e8")
d.text((72,H-74),"FICTIONAL CITY  /  PROPOSED LAND USE",font=font(19,True),fill="#173b47")
d.text((72,H-45),"Schematic illustration • Adams County CASP study geography • Boundaries and zoning are invented",font=regular,fill="#56636b")
im.convert("RGB").save(ROOT/"east_detroit_concept_map.png",optimize=True)
files=["east_detroit_interactive_map.html","east_detroit_scenario.geojson",
       "east_detroit_google_mymaps.kml","east_detroit_concept_map.png","README.md"]
with zipfile.ZipFile(ROOT/"east_detroit_map_package.zip","w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for f in files:z.write(ROOT/f,arcname=f)
print("Created",ROOT/"east_detroit_concept_map.png",ROOT/"east_detroit_map_package.zip")
