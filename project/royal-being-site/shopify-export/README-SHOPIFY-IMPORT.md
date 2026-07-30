# Royal Being → Shopify Import

This folder contains everything to load all **33 products** (5 collections) into Shopify.

```
royal-being-products.csv     33 products + gallery images (46 image rows), Shopify format
images/                      46 image files (17 real photos + 16 branded product images + galleries)
images.zip                   the same images, zipped (for the Matrixify app path)
```

Prices, weights, SKUs, ingredients, and descriptions come straight from your source PDF.
Blank SKUs are blank in the source (Zen Moment, all Royal Duke, all Royal Kid, etc.) — add them later.

---

## STEP 1 — Images are already hosted

Product + collection images are public at:
https://github.com/asharqasmani-dotcom/royal-being-images

CSV `Image Src` columns already point at:
`https://raw.githubusercontent.com/asharqasmani-dotcom/royal-being-images/main/...`

**Do not upload `images.zip` alone to Matrixify** — Matrixify only accepts `.csv` / `.xlsx`.
A zip of images is not a recognized import file. Images are pulled from the public URLs in the CSV.

---

## STEP 2 — Import products (pick ONE)

### Option A — Matrixify (recommended)
1. Open Matrixify → Import → **Add file**
2. Upload **only** `royal-being-Products.csv` (filename must contain `Products`)
3. Confirm sheet entity = Products → Import

### Option B — Shopify Admin
Products → Import → `royal-being-Products.csv` → Upload and preview → Import

- All 33 products import as **Active** and **Published** to the Online Store.
- **Coming-soon bars** import with **0 inventory** (sold out / not purchasable), tagged `Coming Soon`.
- In-stock bars import with placeholder inventory **25**.

---

## STEP 3 — Import the 5 collections (Matrixify)

Upload **only** `royal-being-Smart-Collections.csv` in Matrixify (entity = Smart Collections).

Each collection auto-includes products by tag:

| Collection | Tag condition | Products |
|---|---|---|
| The Royal Collection | `The Royal Collection` | 7 |
| The Signature Collection | `The Signature Collection` | 10 |
| The Common Collection | `The Common Collection` | 7 |
| The Royal Duke Collection | `The Royal Duke Collection` | 5 |
| The Royal Kid Herbal Collection | `The Royal Kid Herbal Collection` | 4 |

Import **products first**, then collections, so tags exist before rules run.

(Optional tags also present: `Featured`, `Subscription Eligible`, `Coming Soon`, `Herbal Soap`, `Handmade`, `All Natural`.)

---

## Notes
- **Subscriptions** aren't part of a CSV import — add a Shopify subscription app and enable it on
  the `Subscription Eligible`-tagged products.
- **Weights** are in grams (converted from oz) so shipping rates calculate correctly.
- **Claims:** descriptions use cosmetic wording. Have any therapeutic phrasing reviewed before selling.
- Re-run `node scripts/make_shopify_csv.js` after editing `data/products.js` to regenerate the CSV
  (then update Image Src base to the GitHub raw URL if needed).
