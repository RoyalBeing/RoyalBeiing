// Royal Being — static site generator. Writes all pages into /dist.
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const L = require('./lib.js');
const P = require('./pages.js');
const C = require('./content.js');
const { site, collections, products, coll, collName, esc } = L;

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function write(rel, html) {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}
const page = (rel, opts) => write(rel, L.layout(opts));

// ---- clean & prepare ----
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// ---- copy static assets (styles + public/*) ----
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}
copyDir(path.join(ROOT, 'styles'), path.join(DIST, 'styles'));
copyDir(path.join(ROOT, 'public', 'assets'), path.join(DIST, 'assets'));

let count = 0;

// ---- HOME ----
page('index.html', { title: site.brand.corePhrase, desc: site.brand.tagline, body: P.home() }); count++;

// ---- SHOP ----
page('shop.html', { title: 'Shop All Soaps', desc: 'All 33 Royal Being herbal soaps across five collections.', body: P.shop() }); count++;

// ---- COLLECTIONS ----
collections.forEach((c) => {
  page(`collections/${c.slug}.html`, { title: c.name, desc: c.tagline, body: P.collectionPage(c) }); count++;
});

// ---- PRODUCTS (33) ----
products.forEach((p) => {
  const { body, buyBar } = P.productPage(p);
  page(`products/${p.slug}.html`, { title: p.name, desc: p.publicDescription, body, buyBar }); count++;
});

// ---- JOURNAL ----
page('journal.html', { title: 'The Journal', desc: 'Notes on ritual, ingredients, and process.', body: P.journal() }); count++;
P.journalPosts.forEach((a) => {
  page(`journal/${a.slug}.html`, { title: a.title, desc: a.excerpt, body: P.journalPost(a) }); count++;
});

// ---- CONTENT PAGES ----
const cpages = [
  ['about.html', 'Our Story', C.about()],
  ['our-promise.html', 'Our Promise', C.promise()],
  ['subscriptions.html', 'Monthly Subscriptions', C.subscriptions()],
  ['customize.html', 'Customize Your Soap', C.customize()],
  ['reviews.html', 'Reviews', C.reviews()],
  ['faq.html', 'FAQ', C.faq()],
  ['contact.html', 'Contact', C.contact()],
  ['cart.html', 'Cart', C.cartPage()],
  ['checkout.html', 'Checkout', C.checkout()],
  ['checkout-success.html', 'Order Confirmed', C.checkoutSuccess()],
  ['checkout-cancelled.html', 'Checkout Cancelled', C.checkoutSuccess()],
  ['login.html', 'Sign In', C.authPage('login')],
  ['register.html', 'Create Account', C.authPage('register')],
  ['forgot-password.html', 'Reset Password', C.authPage('login')],
  ['account.html', 'My Account', C.account()],
  ['search.html', 'Search', C.search()],
];
cpages.forEach(([f, t, b]) => { page(f, { title: t, body: b }); count++; });

// account sub-pages (structure)
['orders', 'subscriptions', 'addresses', 'wishlist', 'reviews', 'profile'].forEach((s) => {
  page(`account/${s}.html`, { title: 'Account · ' + s, body: C.account() }); count++;
});

// ---- POLICIES ----
const policies = [
  ['privacy.html', 'Privacy Policy', 'How we handle your data.', [
    ['What we collect', 'We collect the information you provide to place an order, create an account, or contact us — such as your name, email, and shipping address — and basic analytics to improve the site.'],
    ['How we use it', 'To fulfil orders, provide support, send transactional emails, and, with your consent, marketing updates. We never sell your personal data.'],
    ['Your choices', 'You can request access to or deletion of your data at any time by contacting us.'],
  ]],
  ['terms.html', 'Terms of Service', 'The terms that govern use of this site.', [
    ['Use of the site', 'By using this site you agree to these terms. Products are handmade cosmetic goods intended for external use only.'],
    ['Orders & pricing', 'All prices are in USD. We reserve the right to correct errors and to limit quantities. Custom-soap enquiries are requests, not accepted orders.'],
  ]],
  ['shipping-returns.html', 'Shipping & Returns', 'How and where we ship, and our returns approach.', [
    ['Where we ship', 'We currently ship to the United States, the Netherlands, and Belgium. Rates and processing times are configured by market and shown at checkout.'],
    ['Processing time', 'Because bars are handmade in small batches — in most cases made to order — please allow a short processing window before dispatch.'],
    ['Returns', 'For hygiene reasons, opened or used bars cannot be returned. If your order arrives damaged, contact us and we’ll make it right.'],
  ]],
  ['subscription-policy.html', 'Subscription Policy', 'How the monthly ritual works.', [
    ['Billing', 'Subscriptions bill monthly at the standard bar price. No subscription discount is applied unless activated by the owner.'],
    ['Control', 'Pause, skip, update, or cancel anytime from your account. Changes apply to the next cycle.'],
  ]],
  ['accessibility.html', 'Accessibility', 'Our commitment to an inclusive experience.', [
    ['Our commitment', 'We aim to meet WCAG 2.2 AA. The site uses semantic structure, keyboard-accessible menus and dialogs, visible focus styles, sufficient contrast, and respects reduced-motion preferences.'],
    ['Feedback', 'If you encounter a barrier, please contact us so we can address it.'],
  ]],
];
policies.forEach(([f, t, s, secs]) => { page(f, { title: t, desc: s, body: C.policy(t, s, secs) }); count++; });

// ---- 404 ----
page('404.html', { title: 'Page Not Found', body: C.notFound() }); count++;

// ---- sitemap + robots ----
const urls = [];
(function walk(dir, base = '') {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!['assets', 'styles'].includes(e.name)) walk(path.join(dir, e.name), base + e.name + '/'); }
    else if (e.name.endsWith('.html') && e.name !== '404.html') urls.push(base + (e.name === 'index.html' ? '' : e.name));
  }
})(DIST);
const domain = 'https://royalbeing.shop';
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${domain}/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`);

console.log(`✓ Generated ${count} HTML pages + sitemap (${urls.length} urls) into /dist`);
