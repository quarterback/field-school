import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter, zoom

rng = np.random.default_rng(7)


class Canvas:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.px = np.zeros((h, w, 3), dtype=np.float32)

    def _local(self, pts_bbox, draw_fn, blur, ss=2):
        x0, y0, x1, y1 = pts_bbox
        pad = int(3 * blur + 3)
        x0 = max(0, int(np.floor(x0)) - pad); y0 = max(0, int(np.floor(y0)) - pad)
        x1 = min(self.w, int(np.ceil(x1)) + pad); y1 = min(self.h, int(np.ceil(y1)) + pad)
        if x1 <= x0 or y1 <= y0:
            return None
        im = Image.new("L", ((x1 - x0) * ss, (y1 - y0) * ss), 0)
        d = ImageDraw.Draw(im)
        draw_fn(d, ss, x0, y0)
        im = im.resize((x1 - x0, y1 - y0), Image.BILINEAR)
        m = np.asarray(im, dtype=np.float32) / 255.0
        if blur:
            m = gaussian_filter(m, blur)
        return (y0, y1, x0, x1, m)

    def paint_local(self, loc, color, alpha=1.0):
        if loc is None:
            return
        y0, y1, x0, x1, m = loc
        cc = np.asarray(color, dtype=np.float32).reshape((1, 1, 3))
        a = (m * alpha)[..., None]
        self.px[y0:y1, x0:x1] = self.px[y0:y1, x0:x1] * (1 - a) + cc * a

    def paint(self, m, color, alpha=1.0):
        c = np.asarray(color, dtype=np.float32).reshape((1, 1, 3))
        a = (m * alpha)[..., None]
        self.px = self.px * (1 - a) + c * a

    def poly(self, pts, color, alpha=1.0, blur=0.7):
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        loc = self._local((min(xs), min(ys), max(xs), max(ys)),
                          lambda d, s, ox, oy: d.polygon([((x - ox) * s, (y - oy) * s) for x, y in pts], fill=255), blur)
        self.paint_local(loc, color, alpha)

    def ellipse(self, cx, cy, rx, ry, color, alpha=1.0, blur=0.7):
        loc = self._local((cx - rx, cy - ry, cx + rx, cy + ry),
                          lambda d, s, ox, oy: d.ellipse([(cx - rx - ox) * s, (cy - ry - oy) * s, (cx + rx - ox) * s, (cy + ry - oy) * s], fill=255), blur)
        self.paint_local(loc, color, alpha)

    def line(self, pts, color, width, alpha=1.0, blur=0.6):
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        loc = self._local((min(xs) - width, min(ys) - width, max(xs) + width, max(ys) + width),
                          lambda d, s, ox, oy: d.line([((x - ox) * s, (y - oy) * s) for x, y in pts], fill=255, width=max(1, int(width * s))), blur)
        self.paint_local(loc, color, alpha)

    def save(self, path, grain=0.018, vignette=0.28, bloom=0.0, bloom_sigma=18):
        p = self.px.copy()
        if bloom:
            lum = p.mean(axis=2)
            bright = np.clip((lum - 0.72) / 0.28, 0, 1)[..., None] * p
            p = p + bloom * np.stack([gaussian_filter(bright[..., i], bloom_sigma) for i in range(3)], axis=2)
        yy, xx = np.mgrid[0:self.h, 0:self.w]
        r = np.sqrt(((xx - self.w / 2) / (self.w / 2)) ** 2 + ((yy - self.h / 2) / (self.h / 2)) ** 2)
        p *= (1 - vignette * np.clip(r - 0.45, 0, 1) ** 1.6)[..., None]
        p = p + rng.normal(0, grain, p.shape[:2])[..., None] * np.array([1, 0.97, 1.03])
        p = np.clip(p, 0, 1)
        # gentle filmic curve
        p = p ** 0.97
        Image.fromarray((p * 255).astype(np.uint8)).save(path, quality=88)


def vgrad(h, w, stops):
    """stops: list of (pos 0..1, rgb)"""
    ys = np.linspace(0, 1, h)
    out = np.zeros((h, 3), dtype=np.float32)
    pos = [s[0] for s in stops]
    for i in range(3):
        out[:, i] = np.interp(ys, pos, [s[1][i] for s in stops])
    return np.repeat(out[:, None, :], w, axis=1)


def noise2(h, w, scale, octaves=4, seed=0, aniso=1.0):
    r = np.random.default_rng(seed)
    total = np.zeros((h, w), dtype=np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        sy = max(2, int(h / scale * 2 ** o) + 2)
        sx = max(2, int(w / (scale * aniso) * 2 ** o) + 2)
        g = r.random((sy, sx)).astype(np.float32)
        z = zoom(g, (h / sy * 1.05, w / sx * 1.05), order=3)[:h, :w]
        if z.shape != (h, w):
            z = np.pad(z, ((0, h - z.shape[0]), (0, w - z.shape[1])), mode="edge")
        total += amp * z
        norm += amp
        amp *= 0.5
    return total / norm


def ridge(w, base, amp, scale, seed, octaves=6):
    r = np.random.default_rng(seed)
    xs = np.zeros(w)
    a, n = 1.0, 0.0
    for o in range(octaves):
        k = max(2, int(w / scale * 2 ** o) + 2)
        g = r.random(k)
        xs += a * np.interp(np.linspace(0, k - 1, w), np.arange(k), g)
        n += a
        a *= 0.55
    xs = xs / n
    return base - (xs - xs.min()) / (xs.max() - xs.min() + 1e-6) * amp


def mix(a, b, t):
    return [a[i] * (1 - t) + b[i] * t for i in range(3)]


def rgb(*v):
    return [x / 255 for x in v]
