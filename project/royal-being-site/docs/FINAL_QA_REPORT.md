# Final QA Report — Royal Being (static build)

## Build
- `node build/generate.js` → **75 HTML pages** + sitemap.xml (74 urls) + robots.txt. No errors.
- Data assertion: 33 products, counts 7/10/7/5/4, no duplicate slugs. ✅

## Functional (verified in preview browser)
- Home renders full editorial sequence with real hero, collection cards (real photos), featured
  grid, brand-film video module, Watermelon spotlight, reviews, subscription, journal, gallery. ✅
- Shop: 33 cards, collection/availability filters, sort (featured/price/name), live count. ✅
- Collection pages: correct membership + counts, editorial split, related collections. ✅
- PDP: real photo / schematic / fallback per product, buy + subscribe options, quantity,
  **Add to Cart → cart drawer opens with line item** (verified). Accordions, meta, waitlist for
  coming-soon. ✅
- Cart drawer + full cart + demo checkout + success page. ✅
- Content/policy/auth/account/search/404 pages render. ✅
- **No console errors.** ✅

## Accessibility
- Skip link, semantic landmarks, visible focus, keyboard-operable nav/drawers/accordions,
  Escape-to-close, alt text on images, form labels, reduced-motion support.

## Known limitations (static demo scope)
- Checkout, accounts, subscriptions, reviews, waitlists are front-end/demo (no backend/DB, per brief).
- Videos not re-encoded (no ffmpeg); posters are stills. See ASSET_AUDIT.
- 16 products on branded fallback tiles pending client photography.
- NL/FR locale switcher present in UI; full string translation is a backend-phase task.
