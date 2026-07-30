// Royal Being — content, commerce & system pages
const L = require('./lib.js');
const { site, collections, products, byColl, coll, collName, money, esc, I, productCard } = L;
const { pageBanner, newsletter } = require('./pages.js');

function about() {
  return pageBanner('Woman-Owned · Made in USA', 'Our Story', 'A small community that started with a simple idea: bringing honest, plant-based goodness back to daily self-care.', '<a href="/">Home</a> / About', '/assets/client/lifestyle/woman-1.jpg') + `
<section class="section"><div class="wrap prose reveal">
  <p class="lead">Welcome to Royal Being. We lovingly source pure, raw botanicals and transform them into wholesome herbal soaps that nourish your skin without any harsh additives. No secrets. No shortcuts. Just complete transparency from nature to your bathroom counter.</p>
  <h2>The Royal Being Philosophy</h2>
  <p>Each of our herbal soaps is crafted by hand in small batches and gentle for you. Every batch we pour is a celebration of the earth’s natural bounty. We are deeply committed to your wellness and the health of our planet — when you choose our herbal creations, you support gentle practices, sustainable ingredients, and a brand that truly cares.</p>
  <p>We believe that what you put on your body matters just as much as what you put in it, which is why we formulate our herbal bars with organic, all-natural, and ethically sourced ingredients.</p>
  <h2>About Us</h2>
  <p>Royal Being is a small woman-owned business located in the USA. Each herbal selection is handmade in small batches and, in most cases, made to order to guarantee freshness, purity, and longevity. All natural ingredients and essential oils used in our creations are ethically sourced and formulated in the USA.</p>
  <p>We offer herbal soaps that address multiple or specific concerns, alongside products that nourish your skin. We hope you’ll explore our entire collection of wonderful herbal products. Welcome to our family.</p>
</div></section>
<section class="section split split--rev" style="background:var(--rb-mist)">
  <div class="split__media reveal"><video preload="none" playsinline poster="/assets/client/lifestyle/woman-2.jpg" src="/assets/client/videos/royal-being-ad-horizontal.mp4" controls style="width:100%;height:100%;object-fit:cover"></video></div>
  <div class="reveal"><p class="eyebrow">The Ritual in Motion</p><h2>See the ritual</h2><p class="lead">A short film on the Royal Being ethos — botanical, handmade, and unhurried.</p></div>
</section>
${newsletter}`;
}

function promise() {
  const points = [
    ['Cruelty-Free', 'Never tested on animals — only on willing Royal Beings.'],
    ['Biodegradable', 'Kind to your skin and gentle on the planet.'],
    ['Without the Nasties', 'Formulated without parabens, synthetic sulfates, or phthalates.'],
    ['Small Batches', 'Made in small batches for our Royal Beings — fresh and pure.'],
  ];
  return pageBanner('Ingredients & Standards', 'Our Promise', 'What goes into every bar — and what never does.', '<a href="/">Home</a> / Our Promise', '/assets/client/editorial/calm-soothe.jpg') + `
<section class="section"><div class="wrap">
  <div class="value-grid reveal">${points.map(([h, p]) => `<div class="value-card"><span>${I.check}</span><h4>${h}</h4><p>${p}</p></div>`).join('')}</div>
</div></section>
<section class="section" style="background:var(--rb-mist)"><div class="wrap prose reveal card-soft">
  <h2>Honest by default</h2>
  <p>All of our products are derived from nature, gentle for your skin, and safe for you. We store the full ingredient list for every bar and show key ingredients prominently, with complete formulas available where confirmed.</p>
  <p class="note">Cosmetic care products. Not intended to diagnose, treat, cure, or prevent any condition. If you have sensitive skin or allergies, we recommend a patch test before first use. Claim wording is owner-reviewable before launch.</p>
</div></section>`;
}

function subscriptions() {
  const eligible = products.filter((p) => p.subscriptionEligible && p.status === 'active').slice(0, 4);
  return pageBanner('Never Run Out', 'The Monthly Ritual', 'Your favourite bars, delivered fresh each month. Pause, skip, or cancel anytime.', '<a href="/">Home</a> / Subscriptions', '/assets/client/lifestyle/woman-3.jpg') + `
<section class="section"><div class="wrap">
  <div class="value-grid reveal">
    ${[['Choose your bars', 'Select any subscription-eligible soap from across the collections.'],
       ['Set your rhythm', 'Receive a fresh, small-batch bar every month, delivered to your door.'],
       ['Stay in control', 'Pause, skip a month, change your address, or cancel whenever you like.']]
      .map(([h, p], i) => `<div class="value-card"><span style="font-family:var(--font-display);font-size:1.6rem;color:var(--rb-gold-600)">${i + 1}</span><h4>${h}</h4><p>${p}</p></div>`).join('')}
  </div>
</div></section>
<section class="section" style="background:var(--rb-mist)"><div class="wrap">
  <div class="sec-head reveal"><p class="eyebrow">Popular to Subscribe</p><h2>Start with a favourite</h2></div>
  <div class="product-grid reveal">${eligible.map((p, i) => productCard(p, i)).join('')}</div>
  <p class="note" style="margin-top:20px">Subscriptions bill monthly at the standard bar price. No subscription discount is applied unless activated by the owner.</p>
</div></section>
${newsletter}`;
}

function customize() {
  return pageBanner('Made For You', 'Customize Your Soap', 'Tell us your ideal bar and we’ll be in touch. This is a request — not an instant order or final price.', '<a href="/">Home</a> / Customize', '/assets/client/editorial/gilded-luxury.jpg') + `
<section class="section"><div class="wrap" style="max-width:760px">
  <form class="card-soft reveal" data-demo-form="Thank you — your custom request has been received. We’ll reply with options and pricing.">
    <div class="form-row"><div class="form-field"><label>Name</label><input required></div><div class="form-field"><label>Email</label><input type="email" required></div></div>
    <div class="form-field"><label>Intended use</label><input placeholder="Gift, personal ritual, event favours…"></div>
    <div class="form-row"><div class="form-field"><label>Preferred base / key ingredients</label><input placeholder="Goat’s milk, shea, charcoal…"></div><div class="form-field"><label>Scent direction</label><input placeholder="Floral, woody, citrus…"></div></div>
    <div class="form-row"><div class="form-field"><label>Colour direction</label><input placeholder="Lavender, sage, gold…"></div><div class="form-field"><label>Shape</label><select><option>Bar</option><option>Heart</option><option>Cube</option><option>Square</option><option>Other</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>Quantity estimate</label><input type="number" min="1" placeholder="e.g. 24"></div><div class="form-field"><label>Needed by</label><input type="date"></div></div>
    <div class="form-field"><label>Notes</label><textarea rows="4"></textarea></div>
    <p class="note">Submitting this form is a request, not an accepted order or final price. We’ll confirm options, pricing, minimums, and lead time by email.</p>
    <button class="btn btn-primary btn-block" type="submit">Send Request</button>
    <p class="form-msg note" style="display:none;color:var(--rb-green-900);margin-top:12px"></p>
  </form>
</div></section>`;
}

function reviews() {
  const list = [
    { s: 5, t: 'Charcoal Moment lathers like silk and lasts for weeks. My new daily ritual.', w: 'Amara · verified purchase' },
    { s: 5, t: 'Bamboozled smells like a walk through the forest. My husband is obsessed.', w: 'Michelle · verified purchase' },
    { s: 5, t: 'Turmeric Swirl left my skin looking genuinely brighter. Packaging feels like a gift.', w: 'Joy · verified purchase' },
    { s: 4, t: 'Blissful Lavender is so calming before bed. Wish the bar were even bigger.', w: 'Priya · verified purchase' },
    { s: 5, t: 'The Royal Duke bars are the first men’s soaps my partner has actually loved.', w: 'Dana · verified purchase' },
    { s: 5, t: 'Aloe Vera Wave is gentle enough for my sensitive skin. No tightness after.', w: 'Kelsey · verified purchase' },
  ];
  return pageBanner('Loved by Royal Beings', 'Reviews', 'Text, photo, and video reviews from our community.', '<a href="/">Home</a> / Reviews', '/assets/client/editorial/stacked-bars-1.jpg') + `
<section class="section"><div class="wrap">
  <p class="note center" style="margin-bottom:30px">Sample reviews shown for layout. Real, verified reviews — including photo and video — appear here at launch. Demo entries are clearly tagged and excluded from production.</p>
  <div class="review-grid reveal">${list.map((r) => `<div class="review-card"><div class="stars">${'★'.repeat(r.s)}${'☆'.repeat(5 - r.s)}</div><p>“${r.t}”</p><div class="who">${r.w} <span class="demo-tag">Sample</span></div></div>`).join('')}</div>
</div></section>
<section class="section" style="background:var(--rb-mist)"><div class="wrap" style="max-width:640px">
  <div class="sec-head center reveal"><p class="eyebrow">Share Yours</p><h2>Write a Review</h2></div>
  <form class="card-soft reveal" data-demo-form="Thank you! Your review has been submitted for moderation.">
    <div class="form-field"><label>Product</label><select>${products.map((p) => `<option>${esc(p.name)}</option>`).join('')}</select></div>
    <div class="form-field"><label>Rating</label><select><option>★★★★★</option><option>★★★★</option><option>★★★</option><option>★★</option><option>★</option></select></div>
    <div class="form-field"><label>Your review</label><textarea rows="4" required></textarea></div>
    <div class="form-field"><label>Add a photo or video (optional)</label><input type="file" accept="image/*,video/*"></div>
    <label style="display:flex;gap:10px;font-size:.84rem;margin-bottom:16px"><input type="checkbox" required> I consent to Royal Being displaying my review and any media I upload.</label>
    <button class="btn btn-primary btn-block" type="submit">Submit Review</button>
    <p class="form-msg note" style="display:none;color:var(--rb-green-900);margin-top:12px"></p>
  </form>
</div></section>`;
}

function faq() {
  const groups = [
    ['Ordering & Processing', [
      ['How long until my order ships?', 'Because each bar is handmade in small batches — in most cases made to order — please allow a short processing window before dispatch. Exact times are confirmed at checkout.'],
      ['Why does my bar look slightly different?', 'Natural, handmade variation in colour, swirl, and scent is part of the craft. No two small-batch bars are ever identical.'],
    ]],
    ['Shipping & Returns', [
      ['Where do you ship?', 'We currently ship to the United States, the Netherlands, and Belgium. Additional markets will be added over time.'],
      ['What is your return policy?', 'For hygiene reasons, opened or used bars cannot be returned. If your order arrives damaged, contact us and we’ll make it right. See Shipping & Returns.'],
    ]],
    ['Subscriptions & Waitlists', [
      ['Can I pause or cancel a subscription?', 'Yes — pause, skip a month, or cancel anytime from your account. You’re always in control.'],
      ['How do waitlists work?', 'For sold-out or coming-soon bars, add your email to the waitlist and we’ll notify you the moment it’s available.'],
    ]],
    ['Ingredients & Skin', [
      ['Are your soaps natural?', 'Yes — all natural, handmade, and formulated without parabens, synthetic sulfates, or phthalates.'],
      ['I have sensitive skin — what should I do?', 'We recommend a patch test before first use. Our gentle bars, including the Royal Kid Collection, are formulated with delicate skin in mind.'],
    ]],
    ['Custom Soap', [
      ['Can you make a custom bar?', 'Yes — tell us your ideal bar via Customize Your Soap. Submissions are requests; we’ll confirm options, pricing, minimums, and lead time.'],
    ]],
  ];
  const acc = groups.map(([h, items]) => `<h2 class="reveal">${h}</h2>${items.map(([q, a]) => `<div class="faq-item acc"><button>${q}<span class="plus">+</span></button><div class="acc__body"><p>${a}</p></div></div>`).join('')}`).join('');
  return pageBanner('Answers', 'Frequently Asked Questions', 'Everything you need to know about ordering, ingredients, and the ritual.', '<a href="/">Home</a> / FAQ', '/assets/client/editorial/purify-detox.jpg') +
    `<section class="section"><div class="wrap prose reveal">${acc}<p class="note" style="margin-top:24px">Policy-sensitive answers are owner-reviewable before launch.</p></div></section>`;
}

function contact() {
  return pageBanner('We’re Listening', 'Contact', 'Questions about a bar, an order, or a wholesale enquiry? We’d love to hear from you.', '<a href="/">Home</a> / Contact', '/assets/client/lifestyle/woman-2.jpg') + `
<section class="section"><div class="wrap" style="max-width:720px">
  <form class="card-soft reveal" data-demo-form="Thank you — your message has been sent. We’ll reply within 1–2 business days.">
    <div class="form-row"><div class="form-field"><label>Name</label><input required></div><div class="form-field"><label>Email</label><input type="email" required></div></div>
    <div class="form-field"><label>Topic</label><select><option>General inquiry</option><option>Order support</option><option>Wholesale / custom inquiry</option></select></div>
    <div class="form-field"><label>Message</label><textarea rows="5" required></textarea></div>
    <button class="btn btn-primary btn-block" type="submit">Send Message</button>
    <p class="form-msg note" style="display:none;color:var(--rb-green-900);margin-top:12px"></p>
  </form>
  <p class="center note" style="margin-top:24px">Or email us at <a href="mailto:${site.brand.supportEmail}">${site.brand.supportEmail}</a> · Follow <a href="${site.social.instagram}" target="_blank" rel="noopener">@royalbeing2026</a></p>
</div></section>`;
}

function cartPage() {
  return pageBanner('Your Ritual', 'Cart', '', '<a href="/">Home</a> / Cart', '') + `
<section class="section"><div class="wrap" style="max-width:820px">
  <div id="cart-items" style="min-height:120px"></div>
  <div class="card-soft" style="margin-top:20px">
    <div class="cart-row cart-row--total"><span>Subtotal</span><span id="cart-subtotal">$0.00</span></div>
    <p class="note" style="margin:10px 0 16px">Shipping &amp; taxes calculated at checkout. Use <b>ROYAL 20</b> for 20% off.</p>
    <a class="btn btn-primary btn-block" id="cart-checkout" href="/checkout.html">Proceed to Checkout</a>
  </div>
</div></section>`;
}

function checkout() {
  return pageBanner('Secure Checkout', 'Checkout', '', '<a href="/">Home</a> / <a href="/cart.html">Cart</a> / Checkout', '') + `
<section class="section"><div class="wrap">
  <div class="split" style="align-items:start;gap:48px">
    <form class="reveal" data-demo-form="">
      <div class="card-soft">
        <h3 style="margin-bottom:18px">Contact</h3>
        <div class="form-field"><label>Email</label><input type="email" required></div>
        <h3 style="margin:24px 0 18px">Shipping Address</h3>
        <div class="form-row"><div class="form-field"><label>First name</label><input required></div><div class="form-field"><label>Last name</label><input required></div></div>
        <div class="form-field"><label>Address</label><input required></div>
        <div class="form-row"><div class="form-field"><label>City</label><input required></div><div class="form-field"><label>Postal code</label><input required></div></div>
        <div class="form-field"><label>Country</label><select>${site.markets.map((m) => `<option>${m}</option>`).join('')}</select></div>
        <h3 style="margin:24px 0 18px">Shipping Method</h3>
        <label class="buy-opt sel"><input type="radio" name="ship" checked><span><span class="bo-name">Standard</span><span class="bo-sub">Calculated by market · configured by admin</span></span></label>
        <h3 style="margin:24px 0 18px">Payment</h3>
        <div class="status-note"><b>Demo mode.</b> This is a safe simulated checkout. Real card payment (Stripe) activates through environment variables at launch — no card details are collected here.</div>
        <button class="btn btn-primary btn-block" type="button" onclick="location.href='/checkout-success.html'">Place Order (Demo)</button>
      </div>
    </form>
    <aside class="reveal">
      <div class="card-soft">
        <h3 style="margin-bottom:16px">Order Summary</h3>
        <div id="cart-items"></div>
        <div class="form-field" style="margin-top:14px"><label>Discount code</label><div style="display:flex;gap:8px"><input placeholder="ROYAL 20"><button class="btn btn-outline btn-sm" type="button">Apply</button></div></div>
        <div class="cart-row"><span>Subtotal</span><span id="cart-subtotal">$0.00</span></div>
        <div class="cart-row"><span>Shipping</span><span>Calculated</span></div>
        <div class="cart-row cart-row--total"><span>Total</span><span>—</span></div>
      </div>
    </aside>
  </div>
</div></section>`;
}

function checkoutSuccess() {
  return `<section class="section" style="min-height:60vh;display:grid;place-items:center"><div class="wrap center prose">
    <span style="color:var(--rb-green-900);display:inline-flex;width:64px;height:64px;border:2px solid var(--rb-gold-500);border-radius:50%;place-items:center;margin-bottom:20px">${I.check}</span>
    <h1>Thank You, Royal Being</h1>
    <p class="lead" style="margin-inline:auto">Your order has been received. In demo mode no payment was taken — at launch you’ll receive an order confirmation email here.</p>
    <p><a class="btn btn-primary" href="/shop.html">Continue Shopping</a></p>
  </div></section>`;
}

function authPage(kind) {
  const login = kind === 'login';
  return pageBanner('Your Account', login ? 'Sign In' : 'Create Account', '', `<a href="/">Home</a> / ${login ? 'Sign In' : 'Register'}`, '') + `
<section class="section"><div class="wrap" style="max-width:460px">
  <form class="card-soft reveal" data-demo-form="Accounts activate at launch. This is a demo form.">
    ${login ? '' : '<div class="form-field"><label>Name</label><input required></div>'}
    <div class="form-field"><label>Email</label><input type="email" required></div>
    <div class="form-field"><label>Password</label><input type="password" required></div>
    <button class="btn btn-primary btn-block" type="submit">${login ? 'Sign In' : 'Create Account'}</button>
    <p class="form-msg note" style="display:none;margin-top:12px"></p>
    <p class="center note" style="margin-top:16px">${login ? 'New here? <a href="/register.html">Create an account</a> · <a href="/forgot-password.html">Forgot password?</a>' : 'Already have an account? <a href="/login.html">Sign in</a>'}</p>
  </form>
</div></section>`;
}

function account() {
  return pageBanner('Welcome Back', 'My Account', '', '<a href="/">Home</a> / Account', '') + `
<section class="section"><div class="wrap">
  <div class="value-grid reveal">
    ${[['Orders', 'View your order history and track shipments.', '/account/orders.html'],
       ['Subscriptions', 'Manage your monthly ritual — pause, skip, or cancel.', '/account/subscriptions.html'],
       ['Addresses', 'Save shipping and billing addresses.', '/account/addresses.html'],
       ['Wishlist', 'The bars you’ve saved for later.', '/account/wishlist.html'],
       ['Reviews', 'Reviews you’ve written.', '/account/reviews.html'],
       ['Profile', 'Update your details and language.', '/account/profile.html']]
      .map(([h, p, href]) => `<a class="value-card" href="${href}" style="text-decoration:none"><h4>${h}</h4><p>${p}</p></a>`).join('')}
  </div>
  <p class="note center" style="margin-top:30px">Customer accounts are part of the launch build. This preview shows the account structure.</p>
</div></section>`;
}

function search() {
  return pageBanner('Find Your Ritual', 'Search', '', '<a href="/">Home</a> / Search', '') + `
<section class="section"><div class="wrap" style="max-width:640px">
  <form class="reveal" style="display:flex;gap:10px;margin-bottom:30px" onsubmit="return false">
    <input placeholder="Search soaps, ingredients, collections…" style="flex:1;padding:14px 18px;border:1.5px solid var(--rb-line);border-radius:40px" aria-label="Search">
    <button class="btn btn-primary">Search</button>
  </form>
  <p class="note">Popular right now:</p>
  <div class="pill-row">${products.filter((p) => p.featured).map((p) => `<a class="pill" href="/products/${p.slug}.html">${esc(p.name)}</a>`).join('')}</div>
</div></section>`;
}

function policy(title, sub, sections) {
  return pageBanner('Policy', title, sub, `<a href="/">Home</a> / ${title}`, '') + `
<section class="section"><div class="wrap prose reveal">
  ${sections.map(([h, b]) => `<h2>${h}</h2><p>${b}</p>`).join('')}
  <p class="note" style="margin-top:28px">This policy is a working draft. Final legal wording is owner-reviewable before launch.</p>
</div></section>`;
}

function notFound() {
  return `<section class="section" style="min-height:60vh;display:grid;place-items:center"><div class="wrap center prose">
    <p class="eyebrow">Error 404</p><h1>This page has wandered off</h1>
    <p class="lead" style="margin-inline:auto">The page you’re looking for doesn’t exist — but your ritual awaits.</p>
    <p><a class="btn btn-primary" href="/">Return Home</a> <a class="btn btn-outline" href="/shop.html">Shop Soaps</a></p>
  </div></section>`;
}

module.exports = { about, promise, subscriptions, customize, reviews, faq, contact, cartPage, checkout, checkoutSuccess, authPage, account, search, policy, notFound };
