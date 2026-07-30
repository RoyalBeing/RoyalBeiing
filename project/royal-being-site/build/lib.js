// Royal Being — shared render helpers (partials, cards, fallbacks, icons)
const site = require('../data/site.js');
const collections = require('../data/collections.js');
const products = require('../data/products.js');

const byColl = (slug) => products.filter((p) => p.collection === slug);
const coll = (slug) => collections.find((c) => c.slug === slug);
const collName = (slug) => (coll(slug) ? coll(slug).name : slug);
const money = (n) => site.currencySymbol + Number(n).toFixed(2);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- color helpers for fallback tiles ----
function shade(hex, amt) {
  const c = hex.replace('#', '');
  const n = parseInt(c, 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ---- icons ----
const I = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16z"/><path d="M4 20c2-3 5-5 8-6"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v6M10 10V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-7-4l-2-3a2 2 0 0 1 3-3l1 1"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.7 3.9 4 4.2v3c-1.5 0-2.9-.5-4-1.3V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/></svg>',
};

const status = {
  active: null,
  coming_soon: { label: 'Coming Soon', cls: 'badge--soon' },
  testing: { label: 'Coming Soon', cls: 'badge--soon' },
  preorder: { label: 'Preorder', cls: 'badge--soon' },
  sold_out: { label: 'Sold Out', cls: 'badge--soldout' },
};

// ---- fallback soap tile ----
function soapTile(p) {
  const a = p.colorHex, b = shade(p.colorHex, -34), c = shade(p.colorHex, 26);
  return `<div class="soap-fallback" style="background:radial-gradient(circle at 30% 25%, ${c}, ${a} 55%, ${b})">
    <div class="bar" style="background:linear-gradient(150deg, ${c}, ${a} 60%, ${b})"><span>${esc(p.name)}</span></div>
    <span class="ph-tag">Artwork forthcoming</span></div>`;
}
function primaryMedia(p, cls = '') {
  if (p.media && p.media.primary) return `<img class="${cls}" src="${p.media.primary}" alt="${esc(p.name)} — Royal Being herbal soap" loading="lazy">`;
  return soapTile(p);
}

// ---- product card ----
function productCard(p, order = 0) {
  const st = status[p.status];
  const badges = [];
  if (st) badges.push(`<span class="badge ${st.cls}">${st.label}</span>`);
  if (p.status === 'active' && p.subscriptionEligible && p.featured) badges.push('<span class="badge badge--sub">Subscribe</span>');
  const canBuy = p.status === 'active';
  return `<article class="pcard" data-collection="${p.collection}" data-status="${p.status}" data-price="${p.price}" data-name="${esc(p.name)}" data-order="${order}">
    <a class="pcard__media" href="/products/${p.slug}.html" aria-label="${esc(p.name)}">
      ${primaryMedia(p)}
      <div class="pcard__badges">${badges.join('')}</div>
    </a>
    <button class="pcard__fav" data-fav="${p.slug}" aria-label="Save ${esc(p.name)} to wishlist">${I.heart}</button>
    <div class="pcard__body">
      <div class="pcard__coll">${collName(p.collection)}</div>
      <h3 class="pcard__name"><a href="/products/${p.slug}.html">${esc(p.name)}</a></h3>
      <p class="pcard__desc">${esc(p.publicDescription.split('.')[0])}.</p>
      <div class="pcard__foot">
        <div class="pcard__price"><span class="cur">${site.currencySymbol}</span>${p.price.toFixed(2)}</div>
        ${canBuy
          ? `<button class="btn btn-primary btn-sm" data-add="${p.slug}" data-name="${esc(p.name)}" data-price="${p.price}" data-img="${p.media.primary || ''}">Add</button>`
          : `<a class="btn btn-light btn-sm" href="/products/${p.slug}.html">${p.status === 'sold_out' ? 'Waitlist' : 'Notify Me'}</a>`}
      </div>
    </div>
  </article>`;
}

// ---- logo ----
const emblem = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 44 L17 24 L27 34 L32 20 L37 34 L47 24 L50 44 Z" fill="none" stroke="var(--rb-gold-500)" stroke-width="2.4" stroke-linejoin="round"/><circle cx="17" cy="22" r="2.2" fill="var(--rb-gold-500)"/><circle cx="32" cy="18" r="2.2" fill="var(--rb-gold-500)"/><circle cx="47" cy="22" r="2.2" fill="var(--rb-gold-500)"/><path d="M12 50 Q32 56 52 50" fill="none" stroke="var(--rb-sage-600)" stroke-width="1.6"/></svg>`;
const logo = (cls = '') => `<a class="logo ${cls}" href="/" aria-label="Royal Being home">${emblem}<span class="logo__text">Royal Being<small>The Ritual of Being</small></span></a>`;

// ---- announcement ----
function announcement() {
  const msgs = site.announcements.map((m) => m.replace(/ROYAL 20/g, '<b>ROYAL 20</b>'));
  return `<div class="announce"><div class="announce__track" data-msgs='${JSON.stringify(msgs)}'>${msgs[0]}</div></div>`;
}

// ---- header + mega menu + mobile nav + cart drawer ----
function megaShop() {
  const items = collections.map((c) => `<a href="/collections/${c.slug}.html">${c.name}<span class="count">${c.count}</span></a>`).join('');
  const feat = coll('signature');
  return `<div class="mega" role="menu">
    <div class="mega__col"><h4>Shop by Collection</h4><div class="mega__list">
      <a href="/shop.html">Shop All Soaps<span class="count">33</span></a>${items}
      <a href="/collections/royal-kid.html" style="opacity:.7">Coming Soon<span class="count">Pet · Robes</span></a>
    </div></div>
    <div class="mega__col"><h4>Featured</h4>
      <div class="mega__feature"><img src="/assets/client/editorial/stacked-bars-1.jpg" alt="Royal Being signature bars"><div class="fx"><span>The Signature Collection</span><b>The house flagship</b></div></div>
    </div></div>`;
}
function megaRitual() {
  return `<div class="mega mega--simple" role="menu"><div class="mega__col"><div class="mega__list">
    <a href="/about.html">About Royal Being</a><a href="/our-promise.html">Our Promise</a>
    <a href="/subscriptions.html">Monthly Subscriptions</a><a href="/customize.html">Customize Your Soap</a>
  </div></div></div>`;
}
function header() {
  return `${announcement()}
<header class="site-header"><div class="header-inner">
  <button class="icon-btn burger" data-open-nav aria-label="Open menu">${I.menu}</button>
  ${logo()}
  <nav class="nav" aria-label="Primary">
    <div class="nav__item"><a class="nav__link" href="/">Home</a></div>
    <div class="nav__item"><a class="nav__link" href="/shop.html">Shop ${I.chev}</a>${megaShop()}</div>
    <div class="nav__item"><a class="nav__link" href="/about.html">The Ritual ${I.chev}</a>${megaRitual()}</div>
    <div class="nav__item"><a class="nav__link" href="/reviews.html">Reviews</a></div>
    <div class="nav__item"><a class="nav__link" href="/journal.html">Journal</a></div>
    <div class="nav__item"><a class="nav__link" href="/contact.html">Contact</a></div>
  </nav>
  <div class="header-actions">
    <a class="icon-btn" href="/search.html" aria-label="Search">${I.search}</a>
    <select class="locale-select" aria-label="Language" onchange="">${site.locales.map((l) => `<option value="${l.code}">${l.code.toUpperCase()}</option>`).join('')}</select>
    <a class="icon-btn" href="/account.html" aria-label="Account">${I.user}</a>
    <a class="icon-btn" href="/account.html#wishlist" aria-label="Wishlist">${I.heart}</a>
    <button class="icon-btn" data-open-cart aria-label="Cart">${I.bag}<span class="cart-count" style="display:none">0</span></button>
  </div>
</div></header>
${mobileNav()}${cartDrawer()}`;
}
function mobileNav() {
  const collLinks = collections.map((c) => `<a href="/collections/${c.slug}.html">${c.name} · ${c.count}</a>`).join('');
  return `<div class="mobile-nav"><div class="mobile-nav__scrim"></div><div class="mobile-nav__panel">
    <div class="mobile-nav__head">${logo()}<button class="icon-btn" data-close-nav aria-label="Close">${I.close}</button></div>
    <a class="m-link" href="/">Home</a>
    <div class="m-acc"><button>Shop ${I.chev}</button><div class="m-acc__body"><a href="/shop.html">Shop All Soaps · 33</a>${collLinks}</div></div>
    <div class="m-acc"><button>The Ritual ${I.chev}</button><div class="m-acc__body"><a href="/about.html">About Royal Being</a><a href="/our-promise.html">Our Promise</a><a href="/subscriptions.html">Subscriptions</a><a href="/customize.html">Customize Your Soap</a></div></div>
    <a class="m-link" href="/reviews.html">Reviews</a>
    <a class="m-link" href="/journal.html">Journal</a>
    <a class="m-link" href="/contact.html">Contact</a>
    <a class="m-link" href="/account.html">Account</a>
  </div></div>`;
}
function cartDrawer() {
  return `<div class="cart-drawer"><div class="cart-drawer__scrim"></div><aside class="cart-drawer__panel" aria-label="Shopping cart">
    <div class="cart-drawer__head"><h3>Your Ritual</h3><button class="icon-btn" data-close-cart aria-label="Close cart">${I.close}</button></div>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-drawer__foot">
      <div class="cart-row cart-row--total"><span>Subtotal</span><span id="cart-subtotal">$0.00</span></div>
      <p class="note" style="margin:6px 0 14px">Shipping &amp; taxes calculated at checkout · ROYAL 20 for 20% off</p>
      <a class="btn btn-primary btn-block" id="cart-checkout" href="/checkout.html">Checkout</a>
    </div>
  </aside></div>`;
}

// ---- footer ----
function footer() {
  const shop = collections.map((c) => `<li><a href="/collections/${c.slug}.html">${c.name}</a></li>`).join('');
  return `<footer class="site-footer"><div class="wrap"><div class="footer-top">
    <div class="footer-brand">${logo()}
      <p>Honest, plant-based, wholesome goodness for daily self-care. Handmade and hand-poured in small batches. ${site.brand.est}.</p>
      <div class="footer-social">
        <a href="${site.social.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${I.fb}</a>
        <a href="${site.social.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${I.ig}</a>
        <a href="${site.social.tiktok}" aria-label="TikTok" target="_blank" rel="noopener">${I.tk}</a>
      </div>
    </div>
    <div class="footer-col"><h4>Shop</h4><ul><li><a href="/shop.html">Shop All</a></li>${shop}</ul></div>
    <div class="footer-col"><h4>Customer Care</h4><ul>
      <li><a href="/contact.html">Contact</a></li><li><a href="/faq.html">FAQ</a></li>
      <li><a href="/shipping-returns.html">Shipping &amp; Returns</a></li><li><a href="/subscriptions.html">Subscriptions</a></li>
      <li><a href="/account/orders.html">Track Order</a></li></ul></div>
    <div class="footer-col"><h4>The Ritual</h4><ul>
      <li><a href="/about.html">Our Story</a></li><li><a href="/our-promise.html">Our Promise</a></li>
      <li><a href="/reviews.html">Reviews</a></li><li><a href="/journal.html">Journal</a></li>
      <li><a href="/customize.html">Customize</a></li></ul></div>
  </div>
  <div class="footer-bottom">
    <div class="footer-selects">
      <select aria-label="Language">${site.locales.map((l) => `<option>${l.label}</option>`).join('')}</select>
      <select aria-label="Market">${site.markets.map((m) => `<option>${m}</option>`).join('')}</select>
    </div>
    <div class="pay-methods"><span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>APPLE PAY</span></div>
    <div>© ${new Date().getFullYear()} ${site.brand.legal} · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a> · <a href="/accessibility.html">Accessibility</a></div>
  </div>
</div></footer>`;
}

// ---- page shell ----
function layout({ title, desc, body, buyBar = '', bodyClass = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Royal Being</title>
<meta name="description" content="${esc(desc || site.brand.tagline)}">
<meta property="og:title" content="${esc(title)} · Royal Being">
<meta property="og:description" content="${esc(desc || site.brand.tagline)}">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles/main.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
${buyBar}
<script src="/assets/app.js"></script>
</body>
</html>`;
}

module.exports = {
  site, collections, products, byColl, coll, collName, money, esc, shade,
  I, status, soapTile, primaryMedia, productCard, logo, emblem,
  header, footer, layout,
};
