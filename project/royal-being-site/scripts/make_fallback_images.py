#!/usr/bin/env python3
"""Generate tasteful, branded 1200x1200 product images for soaps that have no
client photo yet — color-matched to each soap's documented colour direction.
Store-ready (no 'artwork forthcoming' tag)."""
import json, math, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = sys.argv[1]
DATA = sys.argv[2]
os.makedirs(OUT, exist_ok=True)
items = json.load(open(DATA))

SERIF = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
SERIF_B = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
SANS = "/Users/bstar/F/Projects/final-final-royal-beiing-website/main-file-v1.1/Single_Img_Demo/fonts/montserrat-regular-webfont.ttf"

def hx(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def shade(rgb, amt):
    return tuple(max(0, min(255, c + amt)) for c in rgb)
def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
def lum(rgb):
    return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]

def font(path, size):
    return ImageFont.truetype(path, size)

def draw_crown(d, cx, cy, w, col):
    h = w * 0.6
    pts = [(cx-w/2, cy+h/2), (cx-w/2+w*0.12, cy-h/2), (cx-w/4, cy+h*0.05),
           (cx, cy-h/2-h*0.15), (cx+w/4, cy+h*0.05), (cx+w/2-w*0.12, cy-h/2), (cx+w/2, cy+h/2)]
    d.line(pts + [pts[0]], fill=col, width=max(2, int(w*0.03)), joint='curve')
    for px in (cx-w/2+w*0.12, cx, cx+w/2-w*0.12):
        r = w*0.05
        d.ellipse([px-r, cy-h/2-r, px+r, cy-h/2+r], fill=col)

def make(item):
    S = 1200
    base = hx(item['colorHex'])
    light = shade(base, 46); dark = shade(base, -50)
    # radial-ish gradient background
    bg = Image.new('RGB', (S, S), dark)
    top = Image.new('RGB', (S, S), light)
    mask = Image.new('L', (S, S), 0)
    md = ImageDraw.Draw(mask)
    for r in range(S, 0, -6):
        a = int(255 * (r / S))
        md.ellipse([S*0.5 - r*0.75, S*0.35 - r*0.75, S*0.5 + r*0.75, S*0.35 + r*0.75], fill=255 - a)
    bg = Image.composite(top, bg, mask)
    img = bg.filter(ImageFilter.GaussianBlur(2))
    d = ImageDraw.Draw(img)

    # soap bar (rounded rect) with soft shadow
    bw, bh = int(S*0.52), int(S*0.36)
    bx, by = (S - bw)//2, int(S*0.40)
    shadow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([bx+14, by+22, bx+bw+14, by+bh+22], radius=46, fill=(20, 22, 20, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    img = Image.alpha_composite(img.convert('RGBA'), shadow).convert('RGB')
    d = ImageDraw.Draw(img)
    bar = shade(base, 18)
    d.rounded_rectangle([bx, by, bx+bw, by+bh], radius=46, fill=bar)
    # top sheen
    d.rounded_rectangle([bx, by, bx+bw, by+int(bh*0.5)], radius=46, fill=shade(bar, 16))
    d.rounded_rectangle([bx, by+int(bh*0.28), bx+bw, by+bh], radius=46, fill=bar)

    emboss = shade(bar, -34)
    # emblem + name embossed on bar
    draw_crown(d, S//2, by+int(bh*0.30), bw*0.16, emboss)
    fname = font(SERIF_B, 74)
    name = item['name']
    tb = d.textbbox((0, 0), name, font=fname)
    while tb[2]-tb[0] > bw*0.82 and fname.size > 30:
        fname = font(SERIF_B, fname.size-4); tb = d.textbbox((0, 0), name, font=fname)
    d.text((S//2, by+int(bh*0.56)), name, font=fname, fill=emboss, anchor='mm')
    fsub = font(SANS, 22)
    d.text((S//2, by+int(bh*0.78)), 'ROYAL BEING', font=fsub, fill=emboss, anchor='mm')

    # bottom wordmark
    txtcol = (250, 247, 240) if lum(dark) < 150 else (47, 51, 47)
    fw = font(SERIF, 58)
    d.text((S//2, int(S*0.10)), item['name'], font=fw, fill=txtcol, anchor='mm')
    fe = font(SANS, 24)
    d.text((S//2, int(S*0.90)), 'THE  RITUAL  OF  BEING', font=fe, fill=txtcol, anchor='mm')

    img.save(os.path.join(OUT, item['slug'] + '.jpg'), 'JPEG', quality=88)
    return item['slug'] + '.jpg'

n = 0
for it in items:
    if it.get('placeholder'):
        make(it); n += 1
print(f"generated {n} branded product images -> {OUT}")
