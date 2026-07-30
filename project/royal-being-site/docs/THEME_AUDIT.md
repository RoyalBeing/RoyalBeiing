# Theme Audit — EcoShop → Royal Being

The EcoShop HTML5 template (`main-file-v1.1/html/`) was the layout reference. Its strongest
patterns were rebuilt in modern, dependency-free HTML/CSS/JS; its branding, furniture content,
lorem ipsum, dead links, and legacy tech were removed.

| Royal Being route | EcoShop reference | Retained concept |
|---|---|---|
| Home | `index.html` / `index-1.html` | Sticky header, hero, editorial sections, newsletter |
| Shop All | `shop_03.html` | Product grid, sort, filters, count, cards |
| Collection pages | `shop_01/02/04.html` | Collection hero + grid + value strip |
| Product detail | `product-detail_01.html` | Gallery + thumbs, buy box, accordion tabs |
| Cart | `shopping-cart.html` | Cart drawer + full cart page |
| Checkout | `checkout.html` | Address + summary + demo payment |
| About | `about-us_01/02.html` | Editorial split + brand film |
| Contact | `contact.html` | Accessible form + categories |
| Journal | `blog-list_01.html` / `blog-detail_01.html` | Card grid + article |
| Header | `index-header-1..4.html` | One consistent sticky header + mega menu |

## Removed / not used
- jQuery, Bootstrap 3, Revolution Slider, PHP contact scripts, all demo plugin JS.
- `Single_Img_Demo/` duplicate — not built from.
- All EcoShop furniture imagery, credits, `href="#."` links, fake ratings, lorem ipsum.

## Replaced
- Navy/yellow accent system → Royal Being deep botanical green + champagne gold (used sparingly).
- Generic sans stack → Cormorant Garamond (display) + Montserrat (UI).

## Design tokens
Palette, spacing (96–144px desktop sections), max width ~1360px, subtle motion with
`prefers-reduced-motion` support — all in `styles/main.css`.
