# Royal Being — Luxury Herbal Soap Website

A complete, static, production-ready storefront for **Royal Being** — *The Ritual of Being*.
Rebuilt from the EcoShop HTML5 template into a modern, accessible, brand-owned site with all
**33 products** across the **5 formal collections**, real client photography and professional
schematics, both video advertisements, a working cart, and full content/policy pages.

> No database or backend is required. The site is generated to plain HTML/CSS/JS in `/dist`
> and can be opened by any static host. Cart & wishlist run in the browser (localStorage);
> checkout runs in a clearly-labelled demo mode.

## Quick start

```bash
# 1. Import & convert client assets (HEIC→web, videos, schematics) — already run once
bash scripts/import-client-assets.sh

# 2. Build the site into /dist
node build/generate.js

# 3. Preview
python3 -m http.server 4820 --directory dist
# open http://localhost:4820
```

## Structure

```
data/            products.js (33 products), collections.js (5), site.js (config)
build/           lib.js (partials/header/footer), pages.js, content.js, generate.js
styles/          main.css (design tokens + components)
public/assets/   app.js (cart/nav/gallery), brand/ (temp logo), client/ (real assets)
scripts/         import-client-assets.sh (re-runnable asset pipeline)
dist/            GENERATED static site (75 pages) — the deployable output
docs/            audits & handoff guides
```

## Editing content

- **Products** — edit `data/products.js`, then rebuild. Everything (cards, PDP, collections,
  shop, search) regenerates from that single source of truth.
- **Images** — drop a matching file into `public/assets/client/products/<slug>/` and set
  `media.primary` (removes the fallback). See `docs/ASSET_REPLACEMENT_GUIDE.md`.
- **Logo** — the temporary crown wordmark lives in `build/lib.js` (`logo`/`emblem`) and
  `public/assets/brand/favicon.svg`. Replace in one place.

## What's built

- Home (18-section editorial sequence), Shop All (filter/sort), 5 collection pages,
  33 product pages, About, Our Promise, Subscriptions, Customize, Reviews, Journal (+6 posts),
  FAQ, Contact, Cart, Checkout (demo), account structure, and all policy pages.
- Responsive laptop→iPhone, keyboard-accessible nav/drawers/accordions, reduced-motion support.
- Collection counts hard-validated at **Royal 7 · Signature 10 · Common 7 · Royal Duke 5 · Royal Kid 4 = 33**.

See `docs/LAUNCH_CHECKLIST.md` for the owner confirmations required before going live.
