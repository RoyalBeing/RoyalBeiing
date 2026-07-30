# Deployment — Royal Being

The deployable artifact is the **`/dist`** folder (pure static files). Any static host works.

## Build
```bash
node build/generate.js     # regenerates /dist (75 pages + sitemap + robots)
```

## Host options
- **Netlify / Vercel / Cloudflare Pages**: publish directory = `dist`, build command = `node build/generate.js`.
- **Any web server / S3+CloudFront**: upload the contents of `dist/`.
- Set a custom 404 to `dist/404.html`.

## Domain
Connect `royalbeing.shop` only after owner approval (per client note). Update the domain in
`build/generate.js` (sitemap `domain`) and rebuild.

## Notes
- Videos (~175 MB total) live in `dist/assets/client/videos/`. Consider a CDN and web-optimised
  re-encodes (see ASSET_REPLACEMENT_GUIDE) to reduce transfer.
- No server, database, or secrets are required for this static build. When the owner is ready for
  real commerce (Stripe, accounts, subscriptions, reviews backend), this front-end is structured
  to layer onto a backend without redesigning pages.
