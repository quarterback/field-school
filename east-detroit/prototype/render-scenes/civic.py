import sys
import numpy as np
from scipy.ndimage import gaussian_filter
from lib import Canvas, vgrad, noise2, ridge, mix, rgb

W, H = 2000, 1125
c = Canvas(W, H)
HOR = int(H * 0.585)
VP = (W * 0.53, HOR)
SUN = (W * 0.555, HOR - 40)
r = np.random.default_rng(11)

# sky
c.px = vgrad(H, W, [(0, rgb(46, 86, 140)), (0.25, rgb(92, 130, 175)), (0.43, rgb(200, 180, 170)),
                    (0.55, rgb(252, 205, 150)), (0.59, rgb(255, 222, 170)), (1, rgb(255, 222, 170))])
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt((xx - SUN[0]) ** 2 + ((yy - SUN[1]) * 1.35) ** 2)
glow = np.exp(-d / 170) * 0.5 + np.exp(-d / 34) * 0.7
c.px += glow[..., None] * np.array(rgb(255, 214, 150)) * 0.7
# cirrus
n = noise2(H, W, 260, 5, seed=3, aniso=4.5)
cl = np.clip((n - 0.53) * 5.5, 0, 1) * np.clip((HOR - 60 - yy) / 300, 0, 1) * np.clip(yy / 120, 0, 1)
c.paint(cl, rgb(255, 196, 170), 0.55)

# distant Front Range (two hazy ridges)
for base, amp, col, seed, alpha in [(HOR - 6, 78, rgb(170, 150, 175), 21, 0.85), (HOR + 2, 46, rgb(140, 120, 150), 29, 0.95)]:
    rp = ridge(W, base, amp, 520, seed)
    m = (yy >= rp[None, :]).astype(np.float32)
    m = gaussian_filter(m, 1.0)
    c.paint(m * (yy < HOR + 40), col, alpha)
# sun disk sitting on ridge
c.ellipse(SUN[0], SUN[1] + 30, 34, 34, rgb(255, 246, 220), 1.0, blur=2.5)
rp2 = ridge(W, HOR + 2, 46, 520, 29)
m = (yy >= rp2[None, :]) * (yy < HOR + 40)
c.paint(gaussian_filter(m.astype(np.float32), 1.0), rgb(150, 122, 148), 0.9)

# far plains strip + far city edge (low, hazy)
c.poly([(0, HOR + 8), (W, HOR + 8), (W, HOR + 40), (0, HOR + 40)], rgb(214, 172, 140), 1)
for i in range(70):
    x = r.uniform(W * 0.2, W * 0.86)
    if abs(x - SUN[0]) < 60 and r.random() < 0.7:
        continue
    bw, bh = r.uniform(10, 40), r.uniform(8, 46)
    c.poly([(x, HOR + 14), (x + bw, HOR + 14), (x + bw, HOR + 14 - bh), (x, HOR + 14 - bh)], rgb(176, 138, 140), 0.55, blur=1.4)

# ground / plaza
c.px[HOR + 30:] = vgrad(H - HOR - 30, W, [(0, rgb(222, 176, 140)), (0.3, rgb(176, 140, 118)), (1, rgb(96, 82, 78))])
# paving lines converging to VP
for k in range(-26, 27):
    x0 = VP[0] + k * 170
    c.line([(VP[0] + k * 2.0, HOR + 34), (x0, H + 40)], rgb(80, 66, 64), 1.4, 0.18)
for s in np.geomspace(1, 60, 26):
    y = HOR + 30 + (H - HOR) * (1 / s) * 0.98
    c.line([(0, y), (W, y)], rgb(80, 66, 64), max(0.8, 2.2 / s ** 0.3), 0.14)
# glare from the sun on the paving
g = np.exp(-np.abs(xx - SUN[0]) / (60 + np.clip(yy - HOR, 0, None) * 0.55)) * np.clip((yy - HOR - 26) / 20, 0, 1) * np.exp(-np.clip(yy - HOR, 0, None) / 520)
c.px += (g * 0.5)[..., None] * np.array(rgb(255, 214, 160))


def persp(p0, t):
    return (p0[0] + (VP[0] - p0[0]) * t, p0[1] + (VP[1] - p0[1]) * t)


def depth_t(s):
    return s / (s + 6.0)


def facade(side, s0, s1, height, base_col, lit, win_rows, seed):
    rr = np.random.default_rng(seed)
    wallx = -700 if side == "L" else W + 700
    g0 = (wallx, H + 260)
    top0 = (wallx, H + 260 - height)
    t0, t1 = depth_t(s0), depth_t(s1)
    a, b = persp(g0, t0), persp(g0, t1)
    ta, tb = persp(top0, t0), persp(top0, t1)
    c.poly([a, b, tb, ta], base_col, 1, blur=0.6)
    k = 900 * (1 - t0) * (1 if side == "R" else -1)
    endcol = mix(base_col, rgb(40, 36, 50), 0.45 if lit else 0.3)
    if not lit:
        endcol = mix(base_col, rgb(255, 190, 140), 0.25)
    E = [a, ta, (ta[0] + k, ta[1] - abs(k) * 0.05), (a[0] + k, a[1] + abs(k) * 0.05)]
    c.poly(E, endcol, 1, blur=0.6)
    def EP(u, v):
        bx, by = a[0] + k * u, a[1] + abs(k) * 0.05 * u
        tx, ty = ta[0] + k * u, ta[1] - abs(k) * 0.05 * u
        return (bx + (tx - bx) * v, by + (ty - by) * v)
    ncol_e = max(2, int(abs(k) / 70))
    for i in range(ncol_e):
        u0, u1 = (i + 0.25) / ncol_e, (i + 0.7) / ncol_e
        for j in range(win_rows):
            v0 = 0.14 + 0.82 * j / win_rows
            v1 = v0 + 0.82 / win_rows * 0.55
            q = [EP(u0, v0), EP(u1, v0), EP(u1, v1), EP(u0, v1)]
            col = rgb(255, 200, 140) if rr.random() < 0.18 else mix(endcol, rgb(24, 26, 40), 0.45)
            c.poly(q, col, 0.95, blur=0.5)
    c.poly([EP(0, 0), EP(1, 0), EP(1, 0.1), EP(0, 0.1)], rgb(255, 210, 150), 0.8, blur=0.8)
    # storefront glass band
    def Q(s, v):
        t = depth_t(s)
        gp, tp = persp(g0, t), persp(top0, t)
        return (gp[0] + (tp[0] - gp[0]) * v, gp[1] + (tp[1] - gp[1]) * v)
    c.poly([Q(s0, 0.0), Q(s1, 0.0), Q(s1, 0.09), Q(s0, 0.09)], rgb(255, 214, 160) if lit else rgb(250, 196, 120), 0.85, blur=0.8)
    c.poly([Q(s0, 0.09), Q(s1, 0.09), Q(s1, 0.11), Q(s0, 0.11)], rgb(177, 15, 46) if seed % 2 else rgb(60, 110, 100), 0.9, blur=0.6)
    # window grid
    ncol = int((s1 - s0) * 2.2) + 2
    for i in range(ncol):
        sa = s0 + (s1 - s0) * (i + 0.2) / ncol
        sb = s0 + (s1 - s0) * (i + 0.72) / ncol
        for j in range(win_rows):
            v0 = 0.1 + 0.85 * j / win_rows
            v1 = v0 + 0.85 / win_rows * 0.55
            def P(s, v):
                t = depth_t(s)
                gp, tp = persp(g0, t), persp(top0, t)
                return (gp[0] + (tp[0] - gp[0]) * v, gp[1] + (tp[1] - gp[1]) * v)
            q = [P(sa, v0), P(sb, v0), P(sb, v1), P(sa, v1)]
            refl = rr.random()
            if refl < 0.22 and lit:
                col = rgb(255, 214, 160)
            elif refl < 0.4:
                col = rgb(120, 140, 170)
            else:
                col = mix(base_col, rgb(30, 34, 46), 0.5)
            c.poly(q, col, 0.95, blur=0.5)
    # roof edge highlight
    c.line([ta, tb], rgb(255, 210, 150) if lit else rgb(120, 100, 100), 3, 0.7)


# left side buildings (lit by grazing sun), right side in shade
facade("L", 23, 60, 640, rgb(186, 146, 128), True, 6, 4)
facade("L", 10.0, 22, 860, rgb(160, 120, 112), True, 8, 3)
facade("L", 4.6, 9.5, 760, rgb(176, 126, 104), True, 6, 2)
facade("L", 0.2, 4.2, 980, rgb(150, 104, 92), True, 7, 1)
facade("R", 31, 70, 600, rgb(140, 116, 120), False, 5, 8)
facade("R", 13.5, 30, 940, rgb(112, 92, 98), False, 7, 7)
facade("R", 6.0, 13, 720, rgb(104, 80, 86), False, 6, 6)
facade("R", 0.2, 5.5, 1200, rgb(88, 70, 76), False, 9, 5)

# ruby civic banners on left facade
for s in [5.4, 7.6]:
    t = depth_t(s)
    g0 = (-700, H + 260)
    gp = persp(g0, t)
    tp = persp((-700, H + 260 - 700), t)
    w = 26 * (1 - t) + 2
    c.poly([(tp[0], tp[1]), (tp[0] + w, tp[1]), (tp[0] + w, tp[1] + 120 * (1 - t)), (tp[0], tp[1] + 120 * (1 - t))], rgb(177, 15, 46), 0.95)


def tree(x, base_y, scale, seed):
    rr = np.random.default_rng(seed)
    hgt = 380 * scale
    shadow = [(x - 6 * scale, base_y), (x + 6 * scale, base_y), (x + 160 * scale, base_y + 260 * scale), (x - 70 * scale, base_y + 260 * scale)]
    c.poly(shadow, rgb(60, 46, 48), 0.35, blur=4 * scale + 1)
    c.poly([(x - 7 * scale, base_y), (x + 7 * scale, base_y), (x + 4 * scale, base_y - hgt * 0.55), (x - 4 * scale, base_y - hgt * 0.55)], rgb(48, 36, 34), 1)
    for k in range(int(26)):
        ang = rr.uniform(0, 2 * np.pi)
        rad = rr.uniform(0, 1) ** 0.6 * 120 * scale
        cx = x + np.cos(ang) * rad
        cy = base_y - hgt * 0.72 + np.sin(ang) * rad * 0.7
        rr_ = rr.uniform(38, 70) * scale
        c.ellipse(cx, cy, rr_, rr_ * 0.9, mix(rgb(62, 70, 44), rgb(36, 40, 28), rr.random()), 0.96, blur=1.2 + scale)
        if cx > x - 20 * scale and rr.random() < 0.6:
            c.ellipse(cx + rr_ * 0.45, cy - rr_ * 0.35, rr_ * 0.45, rr_ * 0.35, rgb(214, 170, 96), 0.45, blur=3 * scale + 1)


# trees along both sides, far to near
for s in [40, 26, 17, 11.5, 7.5, 4.8]:
    t = depth_t(s)
    sc = (1 - t) * 1.0
    for side, x0 in [("L", -60), ("R", W + 60)]:
        p = persp((x0, H + 100), t)
        tree(p[0], p[1], sc, int(s * 13) + (1 if side == "L" else 2))


def person(x, base_y, scale, seed, child=False):
    rr = np.random.default_rng(seed)
    h = (100 if not child else 62) * scale
    w = 15 * scale
    # long shadow toward camera (away from sun)
    dx = (x - SUN[0]) * 0.35
    c.poly([(x - w * 0.5, base_y), (x + w * 0.5, base_y), (x + dx * scale + w, base_y + h * 1.9), (x + dx * scale - w, base_y + h * 1.9)], rgb(56, 42, 44), 0.38, blur=2 * scale + 1)
    col = mix(rgb(40, 34, 40), rgb(rr.integers(40, 120), rr.integers(30, 70), rr.integers(40, 90)), 0.35)
    c.poly([(x - w * 0.55, base_y - h * 0.8), (x + w * 0.55, base_y - h * 0.8), (x + w * 0.45, base_y - h * 0.42), (x - w * 0.45, base_y - h * 0.42)], col, 1, blur=0.8)
    stride = rr.uniform(-0.2, 0.25)
    legc = mix(col, rgb(30, 28, 36), 0.5)
    c.poly([(x - w * 0.42, base_y - h * 0.44), (x - w * 0.05, base_y - h * 0.44), (x - w * (0.1 - stride), base_y), (x - w * (0.36 - stride), base_y)], legc, 1, blur=0.7)
    c.poly([(x + w * 0.05, base_y - h * 0.44), (x + w * 0.42, base_y - h * 0.44), (x + w * (0.36 + stride), base_y), (x + w * (0.1 + stride), base_y)], legc, 1, blur=0.7)
    c.ellipse(x, base_y - h * 0.9, w * 0.38, w * 0.44, mix(col, rgb(70, 50, 44), 0.4), 1)
    # rim light
    c.poly([(x - w * 0.55, base_y - h * 0.82), (x - w * 0.35, base_y - h * 0.82), (x - w * 0.3, base_y - h * 0.3), (x - w * 0.42, base_y - h * 0.4)], rgb(255, 200, 140), 0.55, blur=1)


people = [(0.43, 2.2, 1), (0.47, 2.0, 2), (0.62, 3.0, 3), (0.36, 4.4, 4), (0.58, 5.5, 5), (0.51, 7.8, 6), (0.555, 7.6, 7), (0.47, 10, 8), (0.6, 13, 9), (0.42, 15, 10), (0.5, 20, 11), (0.66, 9, 12)]
for fx, s, sd in sorted(people, key=lambda p: -p[1]):
    t = depth_t(s)
    p0 = (W * fx * 2 - VP[0], H + 200)
    p = persp(p0, t * 0.92 + 0.05)
    person(p[0], p[1], (1 - t) * 2.2, sd, child=(sd in (2, 7)))

# low fountain basin with jets
t = depth_t(9)
fb = persp((VP[0], H + 160), t)
c.ellipse(fb[0], fb[1], 150 * (1 - t), 18 * (1 - t), rgb(120, 130, 150), 0.8, blur=1.2)
for jx in np.linspace(-120, 120, 9):
    x = fb[0] + jx * (1 - t)
    hh = (60 + 40 * np.cos(jx / 40)) * (1 - t)
    c.line([(x, fb[1]), (x, fb[1] - hh)], rgb(255, 240, 220), 3 * (1 - t) + 0.6, 0.55, blur=1.6)
# lamp posts
for s in [3.5, 6.5, 12]:
    t = depth_t(s)
    for x0 in [W * 0.2, W * 0.86]:
        p = persp((x0, H + 160), t)
        hh = 520 * (1 - t)
        c.line([(p[0], p[1]), (p[0], p[1] - hh)], rgb(40, 34, 36), 4 * (1 - t) + 1, 1)
        c.ellipse(p[0], p[1] - hh, 10 * (1 - t) + 2, 14 * (1 - t) + 2, rgb(255, 230, 190), 0.9)

# atmospheric haze toward horizon
hz = np.exp(-np.abs(yy - HOR) / 120) * 0.22
c.px = c.px * (1 - hz[..., None]) + hz[..., None] * np.array(rgb(255, 214, 170))
c.save(sys.argv[1] if len(sys.argv) > 1 else "/home/claude/render/civic.jpg", bloom=0.45)
