import sys
import numpy as np
from scipy.ndimage import gaussian_filter
from lib import Canvas, vgrad, noise2, ridge, mix, rgb

# Watkins Public Library entrance on a clear afternoon: glass front with lit
# shelves inside, a ruby name band, a card reader by the door and people arriving.
W, H = 1800, 1200
c = Canvas(W, H)
r = np.random.default_rng(21)
yy, xx = np.mgrid[0:H, 0:W]
c.px = vgrad(H, W, [(0, rgb(70, 136, 206)), (0.45, rgb(150, 196, 232)), (1, rgb(196, 222, 236))])
n = noise2(H, W, 240, 5, seed=8, aniso=2.4)
cl = np.clip((n * np.exp(-((yy - 170) / 120) ** 2) - 0.3) * 6, 0, 1)
c.paint(cl, rgb(248, 250, 252), 0.9)
rp = ridge(W, 520, 70, 520, 13)
c.paint(gaussian_filter(((yy >= rp[None, :]) & (yy < 600)).astype(np.float32), 1), rgb(140, 160, 190), 1)

# building mass
TOP, BASE = 150, 900
c.poly([(-20, TOP + 40), (W + 20, TOP + 40), (W + 20, BASE), (-20, BASE)], rgb(214, 196, 170), 1, blur=0)
c.poly([(-20, TOP), (W + 20, TOP), (W + 20, TOP + 60), (-20, TOP + 60)], rgb(196, 176, 150), 1, blur=0)  # roof slab
c.poly([(-20, TOP + 60), (W + 20, TOP + 60), (W + 20, TOP + 72), (-20, TOP + 72)], rgb(150, 132, 112), 1, blur=0)
# name band
c.poly([(260, 240), (1100, 240), (1100, 310), (260, 310)], rgb(177, 15, 46), 1)
x = 300
for wlen in [120, 70, 150, 90, 110]:
    c.poly([(x, 262), (x + wlen, 262), (x + wlen, 288), (x, 288)], rgb(253, 255, 255), 0.95)
    x += wlen + 24

# glass curtain wall with lit interior
GX0, GX1, GY0, GY1 = 120, 1700, 360, 880
c.poly([(GX0, GY0), (GX1, GY0), (GX1, GY1), (GX0, GY1)], rgb(250, 214, 150), 1, blur=0)
# interior depth: back wall + shelves
c.poly([(GX0, GY0 + 300), (GX1, GY0 + 300), (GX1, GY1), (GX0, GY1)], rgb(214, 170, 120), 1, blur=0)
book_cols = [rgb(177, 15, 46), rgb(255, 207, 0), rgb(104, 194, 243), rgb(172, 215, 202), rgb(60, 70, 90), rgb(236, 230, 214), rgb(120, 80, 60)]
for shelf_x in range(GX0 + 40, GX1 - 120, 260):
    for row in range(5):
        y0 = GY0 + 60 + row * 52
        c.poly([(shelf_x, y0 + 44), (shelf_x + 200, y0 + 44), (shelf_x + 200, y0 + 50), (shelf_x, y0 + 50)], rgb(120, 90, 60), 1, blur=0.5)
        bx = shelf_x + 4
        while bx < shelf_x + 192:
            bw = r.uniform(6, 14)
            bh = r.uniform(26, 42)
            c.poly([(bx, y0 + 44 - bh), (bx + bw, y0 + 44 - bh), (bx + bw, y0 + 44), (bx, y0 + 44)], book_cols[r.integers(0, len(book_cols))], 0.9, blur=0.4)
            bx += bw + 1.5
# reading table and readers inside
for tx in [360, 980, 1420]:
    c.poly([(tx - 120, 790), (tx + 120, 790), (tx + 120, 804), (tx - 120, 804)], rgb(110, 80, 56), 1)
    for px in [tx - 70, tx + 60]:
        c.ellipse(px, 752, 15, 18, rgb(92, 64, 54), 0.9, blur=1.2)
        c.poly([(px - 26, 792), (px + 26, 792), (px + 20, 768), (px - 20, 768)], book_cols[r.integers(0, 5)], 0.85, blur=1.2)
# mullions and reflections
for mx in range(GX0, GX1 + 1, 132):
    c.line([(mx, GY0), (mx, GY1)], rgb(70, 66, 70), 6, 1)
for my in [GY0, GY0 + 200, GY1]:
    c.line([(GX0, my), (GX1, my)], rgb(70, 66, 70), 6, 1)
for k in range(6):
    x0 = GX0 + k * 290 + 40
    c.poly([(x0, GY0), (x0 + 70, GY0), (x0 - 80, GY1), (x0 - 150, GY1)], rgb(255, 255, 255), 0.09, blur=8)

# entrance doors with card reader post
DX0, DX1 = 1112, 1376
c.poly([(DX0, GY0 + 200), (DX1, GY0 + 200), (DX1, GY1), (DX0, GY1)], rgb(255, 230, 186), 1, blur=0)
c.line([(DX0 + 132, GY0 + 200), (DX0 + 132, GY1)], rgb(70, 66, 70), 5, 1)
c.line([(DX0 + 112, 640), (DX0 + 112, 720)], rgb(160, 160, 166), 6, 1)
c.line([(DX0 + 152, 640), (DX0 + 152, 720)], rgb(160, 160, 166), 6, 1)
c.poly([(DX1 + 30, 700), (DX1 + 58, 700), (DX1 + 58, 900), (DX1 + 30, 900)], rgb(60, 62, 70), 1)
c.poly([(DX1 + 22, 660), (DX1 + 66, 660), (DX1 + 66, 712), (DX1 + 22, 712)], rgb(40, 42, 50), 1)
c.ellipse(DX1 + 44, 686, 12, 12, rgb(104, 194, 243), 1, blur=1.5)

# plaza
c.poly([(0, BASE), (W, BASE), (W, H), (0, H)], rgb(206, 198, 186), 1, blur=0)
for k in range(-6, 16):
    c.line([(k * 140, BASE), (k * 140 - 220, H)], rgb(170, 160, 150), 2, 0.6)
c.poly([(0, BASE), (W, BASE), (W, BASE + 14), (0, BASE + 14)], rgb(150, 140, 130), 1)
# planters with grasses and a small tree
for px0 in [40, 1520]:
    c.poly([(px0, 940), (px0 + 240, 940), (px0 + 240, 1010), (px0, 1010)], rgb(150, 140, 126), 1)
    for i in range(70):
        gx = px0 + r.uniform(8, 232)
        c.line([(gx, 942), (gx + r.uniform(-14, 14), 942 - r.uniform(30, 80))], mix(rgb(180, 170, 90), rgb(110, 130, 60), r.random()), 2, 0.9)
# bike rack
for bx in range(560, 900, 60):
    c.line([(bx, 990), (bx, 950), (bx + 36, 950), (bx + 36, 990)], rgb(80, 82, 90), 5, 1)
c.ellipse(700, 980, 28, 28, rgb(40, 40, 46), 1)
c.ellipse(700, 980, 22, 22, rgb(206, 198, 186), 1)
c.ellipse(790, 980, 28, 28, rgb(40, 40, 46), 1)
c.ellipse(790, 980, 22, 22, rgb(206, 198, 186), 1)
c.line([(700, 980), (740, 948), (790, 980), (740, 948), (734, 930)], rgb(255, 207, 0), 4, 1)


def person(x, base, h, col, bag=None, card=False):
    w = h * 0.2
    c.ellipse(x + h * 0.15, base + 4, w * 1.6, h * 0.035, rgb(120, 110, 100), 0.45, blur=3)
    c.poly([(x - w * 0.6, base - h * 0.8), (x + w * 0.6, base - h * 0.8), (x + w * 0.5, base - h * 0.42), (x - w * 0.5, base - h * 0.42)], col, 1, blur=1)
    c.poly([(x - w * 0.45, base - h * 0.44), (x - w * 0.04, base - h * 0.44), (x - w * 0.12, base), (x - w * 0.42, base)], rgb(48, 50, 66), 1, blur=1)
    c.poly([(x + w * 0.04, base - h * 0.44), (x + w * 0.45, base - h * 0.44), (x + w * 0.42, base), (x + w * 0.1, base)], rgb(48, 50, 66), 1, blur=1)
    c.ellipse(x, base - h * 0.9, w * 0.36, w * 0.42, rgb(110, 76, 60), 1, blur=1)
    if bag:
        c.poly([(x + w * 0.5, base - h * 0.62), (x + w * 0.95, base - h * 0.62), (x + w * 0.95, base - h * 0.4), (x + w * 0.5, base - h * 0.4)], bag, 1, blur=1)
    if card:
        c.line([(x + w * 0.5, base - h * 0.7), (x + w * 1.4, base - h * 0.62)], col, w * 0.28, 1)
        c.poly([(x + w * 1.35, base - h * 0.7), (x + w * 1.75, base - h * 0.7), (x + w * 1.75, base - h * 0.58), (x + w * 1.35, base - h * 0.58)], rgb(177, 15, 46), 1, blur=0.6)


person(1338, 905, 250, rgb(36, 92, 84), card=True)
person(980, 1110, 300, rgb(177, 15, 46), bag=rgb(104, 194, 243))
person(1040, 1100, 180, rgb(255, 207, 0))
person(420, 1150, 340, rgb(52, 56, 84), bag=rgb(236, 230, 214))
person(1620, 1170, 330, rgb(96, 60, 90))

c.save(sys.argv[1] if len(sys.argv) > 1 else "/home/claude/render/library.jpg", bloom=0.2, vignette=0.18)
