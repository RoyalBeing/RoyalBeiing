// Build a Shopify product-import CSV + flat image folder from data/products.js
const fs = require('fs');
const path = require('path');
const products = require('../data/products.js');
const collections = require('../data/collections.js');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const EXPORT = path.join(ROOT, 'shopify-export');
const IMG = path.join(EXPORT, 'images');
fs.mkdirSync(IMG, { recursive: true });

// >>> Replace this base with wherever you host the /images folder (see README).
const IMAGE_BASE = 'https://raw.githubusercontent.com/REPLACE_USER/royal-being-images/main';

const collName = (s) => collections.find((c) => c.slug === s).name;
const grams = (oz) => Math.round(oz * 28.3495);

// copy a public asset into the flat export/images folder, return its filename
function copyImg(webPath) {
  const src = path.join(PUB, webPath.replace(/^\//, ''));
  if (!fs.existsSync(src)) return null;
  const ext = path.extname(src);
  const flat = webPath.split('/products/')[1].replace(/\//g, '-'); // slug-slug-1.png -> slug-slug-1
  // simpler: use "<slug>-<n><ext>" from the last two segments
  const parts = webPath.split('/');
  const file = parts[parts.length - 2] + '__' + parts[parts.length - 1];
  fs.copyFileSync(src, path.join(IMG, file));
  return file;
}

// resolve ordered image filenames for a product
function imagesFor(p) {
  if (p.media && p.media.placeholder) return [p.slug + '.jpg']; // generated branded image
  const list = [p.media.primary, ...(p.media.gallery || [])].filter(Boolean);
  return list.map(copyImg).filter(Boolean);
}

function bodyHTML(p) {
  const howTo = 'Work into a rich lather with warm water, massage over skin, and rinse. Store on a well-draining dish between uses to extend the life of your bar.';
  return [
    `<p>${p.publicDescription}</p>`,
    `<p><strong>Key Ingredients:</strong> ${p.keyIngredients.join(', ')}.</p>`,
    `<p><strong>Full Ingredients:</strong> ${p.fullIngredients}</p>`,
    `<p><strong>How to Use:</strong> ${howTo}</p>`,
    `<p><strong>Weight:</strong> ${p.weightOz} oz &middot; <strong>Collection:</strong> ${collName(p.collection)}</p>`,
    `<p><em>Handmade &amp; hand-poured in small batches &middot; 100% Natural &middot; Made in USA.</em></p>`,
  ].join('\n');
}

function tags(p) {
  const t = [collName(p.collection), 'Herbal Soap', 'Handmade', 'All Natural', 'Made in USA'];
  if (p.subscriptionEligible) t.push('Subscription Eligible');
  if (p.status === 'coming_soon') t.push('Coming Soon');
  if (p.featured) t.push('Featured');
  return t.join(', ');
}

const COLS = ['Handle','Title','Body (HTML)','Vendor','Product Category','Type','Tags','Published',
  'Option1 Name','Option1 Value','Variant SKU','Variant Grams','Variant Inventory Tracker',
  'Variant Inventory Qty','Variant Inventory Policy','Variant Fulfillment Service','Variant Price',
  'Variant Compare At Price','Variant Requires Shipping','Variant Taxable','Variant Barcode',
  'Image Src','Image Position','Image Alt Text','Gift Card','SEO Title','SEO Description','Status'];

const esc = (v) => {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

const rows = [COLS.join(',')];
const CATEGORY = 'Health & Beauty > Personal Care > Cosmetics > Bath & Body > Bar Soap';

products.forEach((p) => {
  const imgs = imagesFor(p);
  const comingSoon = p.status === 'coming_soon';
  const qty = comingSoon ? 0 : 25;
  const main = {
    'Handle': p.slug,
    'Title': p.name,
    'Body (HTML)': bodyHTML(p),
    'Vendor': 'Royal Being',
    'Product Category': CATEGORY,
    'Type': 'Herbal Soap',
    'Tags': tags(p),
    'Published': 'TRUE',
    'Option1 Name': 'Title',
    'Option1 Value': 'Default Title',
    'Variant SKU': p.sku || '',
    'Variant Grams': grams(p.weightOz),
    'Variant Inventory Tracker': 'shopify',
    'Variant Inventory Qty': qty,
    'Variant Inventory Policy': 'deny',
    'Variant Fulfillment Service': 'manual',
    'Variant Price': p.price.toFixed(2),
    'Variant Compare At Price': '',
    'Variant Requires Shipping': 'TRUE',
    'Variant Taxable': 'TRUE',
    'Variant Barcode': '',
    'Image Src': imgs.length ? `${IMAGE_BASE}/${imgs[0]}` : '',
    'Image Position': imgs.length ? 1 : '',
    'Image Alt Text': imgs.length ? `${p.name} — Royal Being herbal soap` : '',
    'Gift Card': 'FALSE',
    'SEO Title': `${p.name} · ${collName(p.collection)} | Royal Being`,
    'SEO Description': p.publicDescription.slice(0, 155),
    'Status': 'active',
  };
  rows.push(COLS.map((c) => esc(main[c])).join(','));

  // extra image rows (Handle + image fields only)
  imgs.slice(1).forEach((f, i) => {
    const r = {};
    COLS.forEach((c) => (r[c] = ''));
    r['Handle'] = p.slug;
    r['Image Src'] = `${IMAGE_BASE}/${f}`;
    r['Image Position'] = i + 2;
    r['Image Alt Text'] = `${p.name} — view ${i + 2}`;
    rows.push(COLS.map((c) => esc(r[c])).join(','));
  });
});

fs.writeFileSync(path.join(EXPORT, 'royal-being-products.csv'), rows.join('\n') + '\n');
const imgCount = fs.readdirSync(IMG).length;
console.log(`✓ CSV rows: ${rows.length - 1} (33 products + gallery images)`);
console.log(`✓ images in folder: ${imgCount}`);
