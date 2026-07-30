# Responsive Audit — Royal Being

Verified in the preview browser. Layout scales from 1440px laptop down to 375px iPhone.

| Breakpoint | Behaviour |
|---|---|
| 1440 / 1280 | Full desktop nav + mega menu, 2-col editorial, sidebar filters, sticky PDP gallery |
| 1080 and below | Desktop nav → burger + slide-in mobile nav with collection accordions |
| 860 and below | PDP → single column, sticky mobile buy bar, filter drawer, split sections stack |
| 640 and below | 2-col product grid, single-col collections, full-width CTAs |
| 375 (iPhone SE) | No horizontal overflow; touch targets ≥44px; readable heading scale |

## Confirmed
- Five collection cards + counts remain scannable on iPhone.
- Every collection page shows its full product set without hover-only interactions.
- Cart drawer, mega menu, accordions are keyboard-accessible; Escape closes overlays.
- Videos fit their aspect ratio and never overflow the viewport.
- Reduced-motion preference disables reveals/transitions.

## Recommended before launch
Capture and store desktop + iPhone screenshots for Home, Shop, all 5 collections, one product
per collection, Cart, Checkout, About, Reviews, Account into `docs/screenshots/`.
