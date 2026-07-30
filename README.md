# Royal Being — Shopify Theme

Editable Online Store 2.0 theme matching the Royal Being design system.
**Products & collections come from your Shopify catalog** (already imported).

Layout width is expanded ~30% vs the original static site (`max-width: 1768px`).

## What’s included
- Home (hero, trust, collections from Shopify, featured products, story, newsletter)
- Collection / Product / Cart / Search / 404 / Pages
- Sticky header + mega menu + mobile nav
- Cart drawer with real Shopify Cart AJAX
- Theme editor settings for logo, social, menus, sections

## Connect via GitHub (recommended)

1. Create a **new empty GitHub repo** (or use the one pushed below).
2. In Shopify Admin → **Online Store → Themes → Add theme → Connect from GitHub**
3. Authorize Shopify → select the repo → select branch `main`
4. Publish the theme when ready.
5. In the theme editor:
   - Assign **Main menu** / footer menus
   - Set hero image
   - Pick collections for the homepage grid (or leave blank to auto-list Shopify collections)
   - Upload logo / favicon

### Push this theme to GitHub
From this folder (`shopify-theme/`), the theme files must live at the **repo root**:

```bash
cd shopify-theme
# if using the prepared remote:
# git init && git add . && git commit -m "Royal Being Shopify theme"
# gh repo create royal-being-theme --public --source=. --remote=origin --push
```

## Connect via Shopify CLI (optional)
```bash
npm i -g @shopify/cli @shopify/theme
cd shopify-theme
shopify theme dev --store YOURSTORE.myshopify.com
shopify theme push
```

## After publish checklist
- [ ] Navigation menus created (Shop links to collections)
- [ ] Homepage collection blocks pointed at your 5 smart collections
- [ ] Payments / shipping / taxes configured in Shopify admin
- [ ] Checkout is Shopify’s native checkout (already works)
- [ ] Domain `royalbeing.shop` connected under Settings → Domains

## Design tokens
Sage green `#355E4D`, champagne gold `#D5A557`, ivory `#FAF7F0`.
Fonts: Cormorant Garamond + Montserrat.
