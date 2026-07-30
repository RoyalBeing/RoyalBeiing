# Asset Replacement Guide — Royal Being

Everything is data-driven; you never edit page markup to swap an image.

## Replace a product's photo (removes the fallback tile)
1. Add your web-ready image to `public/assets/client/products/<slug>/<slug>-1.jpg`
   (slugs are the `slug` field in `data/products.js`, e.g. `the-duchess`).
2. In `data/products.js`, find that product and change:
   ```js
   media: { placeholder: true, gallery: [] }
   // →
   media: { primary: '/assets/client/products/the-duchess/the-duchess-1.jpg', gallery: [] }
   ```
3. Add extra angles to `gallery: [...]` to enable the PDP thumbnail strip.
4. Rebuild: `node build/generate.js`.

## Add a collection hero / lifestyle image
Edit `data/collections.js` → `hero` / `lifestyle` paths.

## Replace the temporary logo (one step)
- Wordmark/emblem: `build/lib.js` → `emblem` and `logo()`.
- Favicon: `public/assets/brand/favicon.svg`.
Rebuild and every page updates.

## Re-run the importer
`bash scripts/import-client-assets.sh` re-discovers `~/Downloads` archives, re-converts HEIC,
and refreshes `public/assets/client/`. It never overwrites a different file just because a name
matches; add new client uploads and rebuild to upgrade fallbacks automatically.

## Video optimisation (recommended)
Install ffmpeg and re-encode before launch:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 24 -vf scale=1280:-2 -movflags +faststart out.mp4
ffmpeg -i input.mp4 -ss 2 -frames:v 1 poster.jpg   # true poster frame
```
