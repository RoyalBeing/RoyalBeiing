# Why changes may not show on Shopify

GitHub `main` has the full homepage (commit `a9945e8`+). Your screenshot still shows the **old** homepage layout (blank hero + “Shop by Collection” + “Featured Soaps” + old story). That means the **published theme is not serving the latest GitHub files**.

## Fix (do this in Shopify Admin)

1. Go to **Online Store → Themes**
2. Find the theme that says **Connected to GitHub** / `RoyalBeing/RoyalBeiing`
3. Confirm branch is **`main`**
4. Click **… → Publish** on that GitHub theme (if another theme is currently live, that is why you see the old site)
5. Open the theme → **Customize** → Homepage  
   - If you do **not** see sections like “Collection showcase”, “Shop by Ritual”, “FAQ preview”, “Final call to action”, the live theme is still an old copy
6. Optional hard reset: **Add theme → Connect from GitHub** again → `RoyalBeing/RoyalBeiing` → `main` → Preview → Publish

## Confirm sync

View page source on the storefront and search for:

`rb-theme:homepage-v2`

If that comment is missing, Shopify is not using the updated `layout/theme.liquid` from GitHub.

## Note

`tvpvh0-yc.myshopify.com` currently shows “Store unavailable”. `royalbeing.shop` is not the Shopify theme (different site). Use the storefront URL from **Online Store → Domains** for the active Shopify shop.
