import sys
import numpy as np
from scipy.ndimage import gaussian_filter
from lib import Canvas, vgrad, noise2, ridge, mix, rgb

W, H = 1800, 1200
c = Canvas(W, H)
r = np.random.default_rng(5)
yy, xx = np.mgrid[0:H, 0:W]
HOR = 640
c.px = vgrad(H, W, [(0, rgb(22, 40, 84)), (0.3, rgb(52, 78, 132)), (0.48, rgb(150, 130, 160)), (0.53, rgb(246, 160, 110)), (1, rgb(246, 160, 110))])
n = noise2(H, W, 300, 5, seed=9, aniso=5)
cl = np.clip((n - 0.55) * 5, 0, 1) * np.clip((HOR - 120 - yy) / 260, 0, 1)
c.paint(cl, rgb(236, 140, 130), 0.5)
# mountains far
rp = ridge(W, HOR - 4, 60, 480, 4)
m = gaussian_filter(((yy >= rp[None, :]) & (yy < HOR + 40)).astype(np.float32), 1)
c.paint(m, rgb(70, 64, 104), 0.92)

# background towers with lit windows
for i in range(16):
    x = r.uniform(-60, W)
    bw = r.uniform(110, 260)
    bh = r.uniform(140, 420)
    top = HOR + 30 - bh
    col = mix(rgb(44, 48, 80), rgb(70, 66, 96), r.random())
    c.poly([(x, HOR + 40), (x + bw, HOR + 40), (x + bw, top), (x, top)], col, 1, blur=0.6)
    for wy in np.arange(top + 16, HOR + 20, 22):
        for wx in np.arange(x + 10, x + bw - 14, 18):
            if r.random() < 0.38:
                c.poly([(wx, wy), (wx + 9, wy), (wx + 9, wy + 11), (wx, wy + 11)], rgb(255, 214, 150), r.uniform(0.6, 0.95), blur=0.5)

# ground band behind platform
c.poly([(0, HOR + 40), (W, HOR + 40), (W, H), (0, H)], rgb(40, 40, 58), 1, blur=0)
# catenary poles + wire
for x in np.arange(80, W, 420):
    c.line([(x, 420), (x, 880)], rgb(30, 32, 44), 7, 1)
    c.line([(x - 60, 470), (x + 60, 470)], rgb(30, 32, 44), 4, 1)
c.line([(0, 520), (W, 520)], rgb(30, 32, 44), 2.4, 1)
c.line([(0, 505), (W, 498)], rgb(30, 32, 44), 1.6, 0.9)

# light rail train (side view)
TY0, TY1 = 560, 860
ty = TY0
body = [(-40, TY0 + 40), (W * 0.96, TY0 + 40), (W * 0.99, TY0 + 90), (W * 1.0, TY1), (-40, TY1)]
c.poly(body, rgb(150, 162, 186), 1, blur=0.8)
c.poly([(-40, TY1 - 70), (W, TY1 - 70), (W, TY1 - 52), (-40, TY1 - 52)], rgb(177, 15, 46), 1)  # ruby stripe
c.poly([(-40, TY0 + 40), (W * 0.96, TY0 + 40), (W * 0.965, TY0 + 56), (-40, TY0 + 56)], rgb(124, 136, 162), 1)
# pantograph
c.line([(W * 0.55, TY0 + 40), (W * 0.58, 520), (W * 0.61, TY0 + 40)], rgb(30, 32, 44), 4, 1)
# windows with warm interior and passengers
for k, x in enumerate(np.arange(20, W * 0.93, 150)):
    c.poly([(x, TY0 + 90), (x + 118, TY0 + 90), (x + 118, TY0 + 210), (x, TY0 + 210)], rgb(240, 200, 140), 1, blur=0.7)
    if r.random() < 0.7:
        px = x + r.uniform(20, 90)
        c.ellipse(px, TY0 + 150, 14, 17, rgb(80, 60, 60), 0.85, blur=1.2)
        c.poly([(px - 26, TY0 + 210), (px + 26, TY0 + 210), (px + 20, TY0 + 172), (px - 20, TY0 + 172)], rgb(70, 70, 96), 0.85, blur=1.2)
    if k % 4 == 2:  # doors
        c.poly([(x + 128, TY0 + 80), (x + 142, TY0 + 80), (x + 142, TY1 - 76), (x + 128, TY1 - 76)], rgb(112, 122, 146), 1)
# headlight glow
c.ellipse(W * 0.985, TY1 - 110, 16, 12, rgb(255, 250, 230), 1, blur=2)
# wheels shadow
c.poly([(-40, TY1), (W, TY1), (W, TY1 + 26), (-40, TY1 + 26)], rgb(20, 20, 30), 1)

# platform (foreground) with canopy
PY = TY1 + 26
c.poly([(0, PY), (W, PY), (W, H), (0, H)], rgb(92, 90, 104), 1, blur=0)
c.px[PY:] += vgrad(H - PY, W, [(0, rgb(30, 22, 18)), (1, rgb(0, 0, 0))]) * 0.0
c.poly([(0, PY), (W, PY), (W, PY + 16), (0, PY + 16)], rgb(255, 207, 0), 1)  # amber tactile edge
# reflections of windows on platform
for x in np.arange(20, W * 0.93, 150):
    c.poly([(x, PY + 30), (x + 118, PY + 30), (x + 150, H), (x - 20, H)], rgb(255, 214, 160), 0.12, blur=12)
# canopy roof top-left
c.poly([(0, 0), (W, 0), (W, 110), (0, 150)], rgb(24, 26, 38), 1)
for x in np.arange(60, W, 220):
    c.poly([(x, 120), (x + 120, 112), (x + 120, 124), (x, 132)], rgb(255, 236, 200), 0.95, blur=1)
c.line([(300, 150), (300, H)], rgb(28, 30, 42), 18, 1)
c.line([(1420, 120), (1420, H)], rgb(28, 30, 42), 18, 1)
# sign
c.poly([(470, 150), (760, 150), (760, 196), (470, 196)], rgb(177, 15, 46), 1)
for i, wl in enumerate([70, 44, 96]):
    c.poly([(490 + sum([70, 44, 96][:i]) + i * 14, 166), (490 + sum([70, 44, 96][:i]) + i * 14 + wl, 166), (490 + sum([70, 44, 96][:i]) + i * 14 + wl, 180), (490 + sum([70, 44, 96][:i]) + i * 14, 180)], rgb(253, 255, 255), 0.9, blur=0.6)


def person(x, base, h, col, bag=False):
    w = h * 0.2
    c.poly([(x - w * 0.6, base - h * 0.8), (x + w * 0.6, base - h * 0.8), (x + w * 0.5, base - h * 0.42), (x - w * 0.5, base - h * 0.42)], col, 1, blur=1)
    c.poly([(x - w * 0.45, base - h * 0.44), (x - w * 0.04, base - h * 0.44), (x - w * 0.1, base), (x - w * 0.42, base)], mix(col, rgb(10, 10, 20), 0.5), 1, blur=1)
    c.poly([(x + w * 0.04, base - h * 0.44), (x + w * 0.45, base - h * 0.44), (x + w * 0.42, base), (x + w * 0.1, base)], mix(col, rgb(10, 10, 20), 0.5), 1, blur=1)
    c.ellipse(x, base - h * 0.9, w * 0.36, w * 0.42, mix(col, rgb(120, 80, 60), 0.5), 1, blur=1)
    c.poly([(x - w * 0.6, base - h * 0.8), (x - w * 0.4, base - h * 0.8), (x - w * 0.36, base - h * 0.45), (x - w * 0.5, base - h * 0.45)], rgb(255, 200, 150), 0.4, blur=1.4)
    if bag:
        c.poly([(x + w * 0.5, base - h * 0.62), (x + w * 0.9, base - h * 0.62), (x + w * 0.9, base - h * 0.4), (x + w * 0.5, base - h * 0.4)], rgb(104, 194, 243), 1, blur=1)


for x, h, col, bag in [(560, 300, rgb(40, 44, 70), True), (640, 270, rgb(110, 40, 50), False), (1000, 330, rgb(30, 60, 64), False), (1230, 250, rgb(60, 50, 80), True), (1600, 360, rgb(50, 46, 60), False), (180, 390, rgb(36, 36, 52), False)]:
    person(x, H - 40 - (360 - h) * 0.3, h, col, bag)

c.save(sys.argv[1] if len(sys.argv) > 1 else "/home/claude/render/station.jpg", bloom=0.5, bloom_sigma=14)
