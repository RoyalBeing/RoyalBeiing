# Asset Audit — Royal Being

Generated during the asset-import phase. Real client assets take priority; branded,
colour-matched fallbacks are used only where no client image exists (all flagged below).

## Sources inspected

| Location | Result |
|---|---|
| `~/Downloads/sass_lyn-attachments (13).zip` | ✅ Royal Duke real photos (Bamboozled, Teakwood) + collection group shots + `The Royal Duke Collection.pdf` |
| `~/Downloads/sass_lyn-attachments (14).zip` | ✅ Royal Duke real photos (Woody, The Ethan, The Aristocrat) |
| `~/Downloads/sass_lyn-attachments (15).zip` | ✅ 14 professional soap schematics (PNG) |
| `~/Downloads/sass_lyn-attachments (16).zip` | ✅ Editorial group images (Purify/Detox, Calm/Soothe, Gilded Luxury, stacked bars, hand-in-shower) |
| `~/Downloads/sass_lyn-attachments (17).zip` | ✅ Lifestyle: Man ×4, Child ×4, woman ×4 |
| `FINAL CUT- ROYAL BEING AD horizontal version.mp4` | ✅ Imported (47 MB) → homepage brand film + About |
| `FINAL CUT - WATERMELON FUSION LONG.mp4` | ✅ Imported (128 MB) → homepage spotlight + Watermelon PDP |
| `LOGO-1 copy (1).png` | Kept as **reference only** (`brand/client-logo-reference.png`); temporary wordmark used in production |
| `ROYAL BEING INFORMATION - FOR WEBSITE copy.pdf` (325 MB) | Product text transcribed in prompt Appendix A → `data/products.js` |

## Processing

- **HEIC → JPEG** via macOS `sips` (max 1600px, q80). 30+ HEIC files converted.
- **PNG schematics** copied at up to 1800px.
- Originals left untouched in `~/Downloads`; only web derivatives copied into the project.
- **61** client asset files organised under `public/assets/client/{products,collections,lifestyle,editorial,videos,brand}/`.

## Known gaps & environment notes

- **No `ffmpeg`** in the build environment → video **poster frames** use a brand/lifestyle
  still rather than an extracted frame, and videos are served in their **original encoding**
  (not re-compressed). Recommend re-encoding to web-optimised MP4 + WebM and generating true
  posters before launch. Videos are lazy-loaded / click-to-play, never autoplay with sound.
- **The Royal Collection 4.HEIC** and **IMG_0318.HEIC** had ambiguous subjects → placed as a
  collection/editorial candidate and `editorial/misc-0318` respectively (not assigned as any
  named product's primary). Review before use.
- Schematic `8.png` is a general "Private Reserve"-style editorial image → **not** forced onto
  a named product (kept in `editorial/private-reserve.png`).

## Products using real client imagery (17)

Glow-rify, Fresh Floral Fiesta, Gilded Age, Aquatic Escape, Turmeric Swirl, Charcoal Moment,
Aloe Vera Wave, Beef Tallow, Blissful Lavender, Detoxify, Citrus Heaven, Calm (schematics);
Bamboozled, Woody, The Ethan, The Aristocrat, Teakwood (real Royal Duke photos).

## Products on branded fallback tiles (16 — awaiting client imagery)

Colour-matched to each soap's documented colour direction, clearly marked "Artwork forthcoming".
Rerunning `scripts/import-client-assets.sh` + adding a matching file auto-upgrades these.

| Collection | Products needing photography |
|---|---|
| Royal | The Rose Garden, The Enchanted Garden, The Reiny, The Duchess |
| Signature | African Rhapsody, Herbal Galaxy Renewal, Sweet Madagascar, Melanin Popping, Islander, **Watermelon Fusion** (has video, needs still), Zen Moment |
| Common | Anti-Aging Herbal Soap |
| Royal Kid | The Chloe, The Bodhi, The Matthew, The Iris |

Editorial group photos (zip 16) *are* used contextually for African Rhapsody, Charcoal Moment,
Detoxify, Blissful Lavender, Calm, Aquatic Escape, Gilded Age, The Aristocrat, Beef Tallow — but
never mislabelled as a specific soap's primary product shot.
