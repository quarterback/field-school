import sys
import numpy as np
from scipy.ndimage import gaussian_filter
from lib import Canvas, vgrad, noise2, ridge, mix, rgb

W, H = 1800, 1200
c = Canvas(W, H)
r = np.random.default_rng(3)
yy, xx = np.mgrid[0:H, 0:W]
HOR = 600
c.px = vgrad(H, W, [(0, rgb(58, 120, 196)), (0.35, rgb(104, 170, 226)), (0.5, rgb(196, 222, 236)), (1, rgb(196, 222, 236))])
# cumulus
n = noise2(H, W, 220, 6, seed=12, aniso=1.8)
band = np.exp(-((yy - 300) / 170) ** 2)
cl = np.clip((n * band - 0.32) * 6, 0, 1)
shade = np.clip(gaussian_filter(cl, 12) - np.roll(gaussian_filter(cl, 12), -14, axis=0), 0, 1)
c.paint(cl, rgb(250, 250, 248), 0.95)
c.paint(np.clip(shade * 3, 0, 1) * cl, rgb(170, 186, 206), 0.6)
# Front Range
for base, amp, col, seed in [(HOR - 2, 110, rgb(150, 170, 196), 41), (HOR + 6, 60, rgb(120, 146, 176), 47)]:
    rp = ridge(W, base, amp, 600, seed)
    m = gaussian_filter(((yy >= rp[None, :]) & (yy < HOR + 60)).astype(np.float32), 1)
    c.paint(m, col, 1)
# snow caps on the far ridge
rp = ridge(W, HOR - 2, 110, 600, 41)
m = ((yy >= rp[None, :]) & (yy < rp[None, :] + 10) & (rp[None, :] < HOR - 70)).astype(np.float32)


# far plain + new neighborhood rooftops
c.poly([(0, HOR + 20), (W, HOR + 20), (W, HOR + 80), (0, HOR + 80)], rgb(170, 176, 140), 1)
for i in range(46):
    x = r.uniform(W * 0.35, W * 1.0)
    bw, bh = r.uniform(30, 90), r.uniform(20, 70)
    base = HOR + 52
    col = r.choice([0, 1, 2, 3])
    cols = [rgb(214, 204, 190), rgb(190, 120, 100), rgb(232, 226, 214), rgb(150, 160, 170)]
    c.poly([(x, base), (x + bw, base), (x + bw, base - bh), (x, base - bh)], mix(cols[col], rgb(196, 222, 236), 0.35), 1, blur=0.8)
    if r.random() < 0.5:
        c.poly([(x - 3, base - bh), (x + bw / 2, base - bh - 16), (x + bw + 3, base - bh)], mix(rgb(120, 80, 70), rgb(196, 222, 236), 0.35), 1, blur=0.8)
    for wy in np.arange(base - bh + 8, base - 6, 14):
        for wx in np.arange(x + 5, x + bw - 6, 12):
            if r.random() < 0.5:
                c.poly([(wx, wy), (wx + 5, wy), (wx + 5, wy + 6), (wx, wy + 6)], rgb(120, 140, 160), 0.6, blur=0.4)

# prairie ground: rolling grass
g = vgrad(H - HOR - 70, W, [(0, rgb(176, 168, 110)), (0.35, rgb(196, 176, 104)), (1, rgb(150, 136, 70))])
c.px[HOR + 70:] = g
tex = noise2(H, W, 26, 4, seed=5, aniso=0.25)
c.px[HOR + 70:] *= (0.86 + 0.28 * tex[HOR + 70:])[..., None]
c.poly([(0, HOR + 60), (W, HOR + 70), (W, HOR + 120), (0, HOR + 110)], rgb(170, 166, 112), 1, blur=6)

# creek line with cottonwoods (midground)
creek = [(0, 820), (300, 800), (640, 812), (980, 786), (1300, 800), (1800, 780), (1800, 796), (1300, 816), (980, 802), (640, 828), (300, 816), (0, 836)]
c.poly(creek, rgb(120, 168, 186), 1, blur=1.2)


def cottonwood(x, base, s, seed):
    rr = np.random.default_rng(seed)
    c.line([(x, base), (x - 6 * s, base - 140 * s)], rgb(90, 76, 64), 12 * s, 1)
    c.line([(x - 4 * s, base - 100 * s), (x + 50 * s, base - 170 * s)], rgb(90, 76, 64), 7 * s, 1)
    for k in range(30):
        ang = rr.uniform(0, 2 * np.pi)
        rad = rr.uniform(0, 1) ** 0.55 * 120 * s
        cx, cy = x + np.cos(ang) * rad * 1.15, base - 210 * s + np.sin(ang) * rad * 0.8
        rr_ = rr.uniform(34, 62) * s
        c.ellipse(cx, cy, rr_, rr_ * 0.85, mix(rgb(96, 128, 60), rgb(60, 88, 40), rr.random()), 1, blur=1.4)
        if np.sin(ang) < 0 and rr.random() < 0.6:
            c.ellipse(cx - rr_ * 0.2, cy - rr_ * 0.35, rr_ * 0.5, rr_ * 0.35, rgb(176, 196, 96), 0.6, blur=3)


for x, base, s, sd in [(120, 830, 1.0, 1), (360, 812, 0.8, 2), (520, 820, 0.7, 3), (1360, 800, 0.62, 5), (1500, 796, 0.75, 6), (1700, 790, 0.95, 7)]:
    cottonwood(x, base, s, sd)

# footbridge
c.poly([(820, 800), (1060, 790), (1060, 800), (820, 812)], rgb(232, 230, 222), 1)
for x in np.arange(826, 1060, 18):
    c.line([(x, 806 - (x - 820) * 0.04), (x, 786 - (x - 820) * 0.04)], rgb(232, 230, 222), 2, 1)
c.line([(820, 790), (1060, 778)], rgb(232, 230, 222), 3, 1)

# trail curving to foreground
trail = [(860, 812), (1000, 806), (1100, 860), (1060, 960), (900, 1080), (760, 1200), (1180, 1200), (1260, 1080), (1290, 960), (1210, 860), (1060, 806)]
c.poly(trail, rgb(214, 206, 192), 1, blur=1.2)


# grass tufts foreground
for i in range(900):
    x = r.uniform(0, W)
    y = r.uniform(900, H + 20)
    inside = 760 + (H - y) * 0.0 < x < 1300 and y > 870
    if inside and r.random() < 0.85:
        continue
    hgt = (y - 860) * r.uniform(0.08, 0.2)
    col = mix(rgb(210, 186, 110), rgb(120, 110, 50), r.random())
    c.line([(x, y), (x + r.uniform(-8, 8), y - hgt)], col, 1.6, 0.8, blur=0.6)


def walker(x, base, h, col):
    w = h * 0.2
    c.poly([(x - w * 0.55, base - h * 0.8), (x + w * 0.55, base - h * 0.8), (x + w * 0.45, base - h * 0.42), (x - w * 0.45, base - h * 0.42)], col, 1, blur=0.8)
    c.poly([(x - w * 0.42, base - h * 0.44), (x - w * 0.05, base - h * 0.44), (x - w * 0.3, base), (x - w * 0.55, base)], rgb(50, 52, 70), 1, blur=0.8)
    c.poly([(x + w * 0.05, base - h * 0.44), (x + w * 0.42, base - h * 0.44), (x + w * 0.5, base), (x + w * 0.2, base)], rgb(50, 52, 70), 1, blur=0.8)
    c.ellipse(x, base - h * 0.9, w * 0.38, w * 0.44, rgb(110, 76, 60), 1)


walker(1040, 1010, 150, rgb(177, 15, 46))
walker(1090, 1004, 96, rgb(104, 194, 243))
walker(1120, 870, 70, rgb(60, 110, 100))
c.save(sys.argv[1] if len(sys.argv) > 1 else "/home/claude/render/greenway.jpg", bloom=0.25, vignette=0.2)
