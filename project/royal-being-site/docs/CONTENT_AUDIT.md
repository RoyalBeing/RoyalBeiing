# Content Audit — Royal Being

## Collection counts (hard-validated at build time)

| Collection | Required | Built | Status |
|---|---|---|---|
| The Royal Collection | 7 | 7 | ✅ |
| The Signature Collection | 10 | 10 | ✅ |
| The Common Collection | 7 | 7 | ✅ |
| The Royal Duke Collection | 5 | 5 | ✅ |
| The Royal Kid Herbal Collection | 4 | 4 | ✅ |
| **TOTAL** | **33** | **33** | ✅ |

- No duplicate slugs. Every product has its own route `/products/<slug>.html`.
- Every product is reachable via its collection, Shop All, and search.
- Source descriptions, prices (USD), weights, ingredients, SKUs, colour & shape directions,
  and formulation notes are preserved in `data/products.js`.

## Claims safety

- Public copy uses cosmetic language ("helps skin feel", "gently cleanses", "leaves skin feeling").
- Therapeutic/medical wording from the source PDF (acne treatment, eczema/psoriasis, antibacterial,
  detox toxins, age reversal, stress/sleep/headache) is **not** published; original wording is kept
  in `sourceDescription` for owner review.
- Internal notes ("STILL TRYING", "ACTUAL COLOR ACHIEVED", "ABOUT TO UNDERGO TEST MODE") never
  render as customer copy. "Test mode" products default to `coming_soon` (waitlist).
- The Watermelon Fusion "Ritual of Being" block (white tea / cold-pressed / aging) is tagged
  **Draft · owner review** on the PDP.

## Status distribution

- `active` (purchasable): 22 products
- `coming_soon` (waitlist): 11 — The Enchanted Garden, Gilded Age, The Reiny, The Duchess,
  Zen Moment, The Aristocrat, Teakwood, The Chloe, The Bodhi, The Matthew, The Iris.

## SKUs — reconciled against the source PDF (text extraction)

All 33 prices and weights match the PDF **exactly**. SKU findings:

- **Genuinely blank in the source PDF (10):** Zen Moment, Bamboozled, Woody, The Ethan,
  The Aristocrat, Teakwood, The Chloe, The Bodhi, The Matthew, The Iris. Kept `null`
  (PDP shows "Assigned at launch"). Not recoverable from the PDF — owner must supply.
- **Blissful Lavender:** source shows only `B` (truncated). Kept `null` + flagged.
- **The Reiny:** source shows `TUR-HER-BAR-05` — Turmeric Swirl's code (copy error). Kept `null` + flagged.
- **Gilded Age:** source shows `GLO-HER-BAR-06` — duplicate of Glow-rify (copy error). Preserved the
  source value + flagged (`skuNote`) rather than inventing a new one.
- All other 20 SKUs transcribed verbatim from the PDF.

## Missing SKUs (kept null, not invented)

Total null SKUs: 12 (see above).
Zen Moment, all Royal Duke products, all Royal Kid products, Blissful Lavender, The Reiny.
PDP shows "Assigned at launch" rather than a fabricated SKU.

## No fabrications

No fake customer counts, awards, press logos, star ratings presented as real, or unsupported
payment claims. Sample reviews are clearly tagged "Sample" and excluded from production.
