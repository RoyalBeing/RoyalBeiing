// Royal Being — page body renderers
const L = require('./lib.js');
const { site, collections, products, byColl, coll, collName, money, esc, I, status, primaryMedia, soapTile, productCard } = L;

const feat = products.filter((p) => p.featured);
const active = products.filter((p) => p.status === 'active');

const trust = `<section class="trust"><div class="trust__row">
  <div class="trust__item">${I.leaf}100% Handmade</div>
  <div class="trust__item">${I.drop}Small Batches</div>
  <div class="trust__item">${I.heart}Cruelty-Free</div>
  <div class="trust__item">${I.flag}Made in USA</div>
</div></section>`;

const newsletter = `<section class="section newsletter"><div class="wrap center">
  <p class="eyebrow" style="color:var(--rb-gold-500)">Join the Ritual</p>
  <h2>Become a Royal Being</h2>
  <p>Early access to new bars, small-batch restocks, and the occasional ritual note. No noise.</p>
  <form class="news-form" data-demo-form="Welcome to the ritual — please check your inbox.">
    <input type="email" required placeholder="Your email address" aria-label="Email address">
    <button class="btn btn-gold" type="submit">Subscribe</button>
  </form>
  <p class="form-msg note" style="display:none;color:var(--rb-gold-500);margin-top:12px"></p>
</div></section>`;

function pageBanner(eyebrow, title, sub, crumbs, img) {
  return `<section class="page-banner">
    ${img ? `<div class="page-banner__media"><img src="${img}" alt=""></div><div class="page-banner__scrim"></div>` : '<div class="page-banner__scrim" style="position:absolute;inset:0;background:var(--rb-green-900)"></div>'}
    <div class="page-banner__inner wrap">
      <nav class="breadcrumbs">${crumbs}</nav>
      <p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${sub ? `<p class="lead" style="margin-inline:auto">${sub}</p>` : ''}
    </div></section>`;
}

/* ============================ HOME ============================ */
function home() {
  const collCards = collections.map((c) => `<a class="col-card" href="/collections/${c.slug}.html">
    <img src="${c.hero}" alt="${esc(c.name)}">
    <div class="col-card__body"><p class="eyebrow">${c.eyebrow}</p><h3>${esc(c.name)}</h3>
      <p>${esc(c.tagline)}</p><span class="col-card__count">${c.count} Soaps</span></div></a>`).join('');

  const featCards = feat.slice(0, 8).map((p, i) => productCard(p, i)).join('');

  const wm = products.find((p) => p.slug === 'watermelon-fusion');
  const reviews = [
    { s: 5, t: 'The Charcoal Moment bar lathers like silk and lasts for weeks. My new daily ritual.', w: 'A. — verified' },
    { s: 5, t: 'Bamboozled smells like a walk through the forest. My husband is obsessed.', w: 'M. — verified' },
    { s: 5, t: 'Turmeric Swirl left my skin looking genuinely brighter. The packaging feels like a gift.', w: 'J. — verified' },
  ].map((r) => `<div class="review-card"><div class="stars">${'★'.repeat(r.s)}</div><p>“${r.t}”</p><div class="who">${r.w} <span class="demo-tag">Sample</span></div></div>`).join('');

  return `
<section class="hero">
  <div class="hero__media"><img src="/assets/client/lifestyle/woman-1.jpg" alt="Royal Being ritual"></div>
  <div class="hero__scrim"></div>
  <div class="hero__inner wrap">
    <p class="eyebrow">Royal Being — The Ritual of Being</p>
    <h1>Elevate Your Daily Cleansing into a Sacred Spa Ritual</h1>
    <p>Herbal soaps that last <em class="serif-accent">and last</em> — handmade and hand-poured in small batches, from pure botanicals to your shower.</p>
    <div class="hero__cta"><a class="btn btn-gold" href="/shop.html">Shop Soaps</a><a class="btn btn-outline" href="#collections" style="color:#fff;border-color:#fff">Explore Collections</a></div>
  </div>
</section>
${trust}

<section class="section" id="collections"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">Curated by Ritual</p><h2>Shop by Collection</h2>
    <p class="lead">Thirty-three herbal bars, five considered collections. Find your ritual — from regal florals to grounded, woody bars for men and gentle soaps for little ones.</p></div>
  <div class="collection-grid collection-grid--feature reveal">${collCards}</div>
</div></section>

<section class="section" style="background:var(--rb-mist)"><div class="wrap">
  <div class="sec-head reveal"><p class="eyebrow">Small-Batch Favourites</p><h2>Featured Soaps</h2></div>
  <div class="product-grid reveal">${featCards}</div>
  <div class="center" style="margin-top:40px"><a class="btn btn-outline" href="/shop.html">View All 33 Soaps</a></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">The Ritual in Motion</p><h2>Our Brand Film</h2></div>
  <div class="filmstrip reveal">
    <video preload="none" playsinline poster="/assets/client/lifestyle/woman-2.jpg" src="/assets/client/videos/royal-being-ad-horizontal.mp4"></video>
    <button class="filmstrip__poster" style="background-image:url('/assets/client/lifestyle/woman-2.jpg')" aria-label="Play brand film"><span class="play-btn">${I.play}</span></button>
  </div>
</div></section>

<section class="section split"><div class="split__media reveal"><img src="/assets/client/editorial/hand-in-shower.jpg" alt="Hand holding a Royal Being herbal soap in the shower"></div>
  <div class="reveal"><p class="eyebrow">The Ritual of Being</p><h2>From nature to your bathroom counter</h2>
    <p class="lead">We lovingly source pure, raw botanicals and transform them into wholesome herbal soaps that nourish your skin without harsh additives. No secrets. No shortcuts.</p>
    <p>Each bar is crafted by hand in small batches — a celebration of the earth’s natural bounty, and a small daily act of care for you and the planet.</p>
    <a class="btn btn-outline" href="/about.html">Our Story</a></div>
</section>

<section class="section" style="background:var(--rb-green-900)"><div class="wrap">
  <div class="sec-head center reveal" style="margin-inline:auto"><p class="eyebrow" style="color:var(--rb-gold-500)">Why Royal Being</p><h2 style="color:#fff">Considered in every detail</h2></div>
  <div class="value-grid reveal">
    ${[['All Natural &amp; Organic', 'Ethically sourced botanicals and essential oils, formulated in the USA.', I.leaf],
       ['Long-Lasting Bars', 'Premium bars, hand-poured to last and last — cleansing without harsh chemicals.', I.drop],
       ['For All Skin Types', 'From gentle kids’ bars to grounded men’s soaps and regal florals.', I.heart],
       ['Small-Batch Care', 'Made in small batches, in most cases to order, for freshness and purity.', I.spark]]
      .map(([h, p, ic]) => `<div class="value-card" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.12)"><span style="color:var(--rb-gold-500)">${ic}</span><h4 style="color:#fff">${h}</h4><p style="color:rgba(250,247,240,.75)">${p}</p></div>`).join('')}
  </div>
</div></section>

<section class="section split split--rev"><div class="split__media reveal"><video preload="none" playsinline poster="${wm.media.primary || '/assets/client/editorial/stacked-bars-2.jpg'}" src="/assets/client/videos/watermelon-fusion.mp4" style="width:100%;height:100%;object-fit:cover" controls></video></div>
  <div class="reveal"><p class="eyebrow">Spotlight</p><h2>Watermelon Fusion</h2>
    <p class="lead">A tropical oasis of Goat’s Milk, Peppermint, and Watermelon with poppy seeds for gentle exfoliation.</p>
    <p>Let the tantalizing scent of each lather transport you — skin left feeling refreshed, smoother, softer, and radiant, time after time.</p>
    <a class="btn btn-primary" href="/products/watermelon-fusion.html">Discover Watermelon Fusion</a></div>
</section>

<section class="section" style="background:var(--rb-mist)"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">Loved by Royal Beings</p><h2>Reviews</h2>
    <p class="note">Sample reviews shown for layout — real, verified reviews appear here at launch.</p></div>
  <div class="review-grid reveal">${reviews}</div>
  <div class="center" style="margin-top:36px"><a class="btn btn-outline" href="/reviews.html">Read Reviews</a></div>
</div></section>

<section class="section split"><div class="split__media reveal"><img src="/assets/client/lifestyle/woman-3.jpg" alt="The monthly Royal Being ritual"></div>
  <div class="reveal"><p class="eyebrow">Never Run Out</p><h2>The Monthly Ritual</h2>
    <p class="lead">Subscribe and receive your favourite bars each month. Pause, skip, or cancel anytime.</p>
    <ul class="pill-row" style="list-style:none;padding:0"><li class="pill">Free to pause</li><li class="pill">Cancel anytime</li><li class="pill">Small-batch fresh</li></ul>
    <a class="btn btn-primary" href="/subscriptions.html">Start a Subscription</a></div>
</section>

<section class="section"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">From the Journal</p><h2>Notes on Ritual &amp; Skin</h2></div>
  <div class="product-grid reveal" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">${journalCards().slice(0, 3).join('')}</div>
</div></section>

${newsletter}

<section class="section"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">@royalbeing2026</p><h2>The Gallery</h2></div>
  <div class="gallery-strip reveal">
    ${['editorial/stacked-bars-1.jpg', 'editorial/purify-detox.jpg', 'editorial/calm-soothe.jpg', 'editorial/gilded-luxury.jpg', 'editorial/stacked-bars-2.jpg', 'lifestyle/man-1.jpg', 'lifestyle/child-1.jpg', 'editorial/hand-in-shower.jpg']
      .map((f) => `<a href="${site.social.instagram}" target="_blank" rel="noopener"><img src="/assets/client/${f}" alt="Royal Being"></a>`).join('')}
  </div>
</div></section>`;
}

/* ============================ SHOP ============================ */
function shop() {
  const cards = products.map((p, i) => productCard(p, i)).join('');
  const collFilters = collections.map((c) => `<label><input type="checkbox" class="f-coll" value="${c.slug}"> ${c.name} <span class="note">(${c.count})</span></label>`).join('');
  return pageBanner('33 Herbal Soaps', 'Shop All Soaps', 'Every Royal Being bar, across all five collections. Filter by collection and availability to find your ritual.', '<a href="/">Home</a> / Shop', '/assets/client/editorial/stacked-bars-1.jpg') + `
<section class="section"><div class="wrap">
  <button class="btn btn-outline btn-sm filter-toggle" data-filter-toggle style="margin-bottom:18px">Filters</button>
  <div class="shop-layout">
    <aside class="filters">
      <button class="btn btn-light btn-sm" data-filter-toggle style="margin-bottom:8px;display:none" id="close-filters">Done</button>
      <div class="filter-group"><h4>Collection</h4>${collFilters}</div>
      <div class="filter-group"><h4>Availability</h4>
        <label><input type="checkbox" class="f-status" value="active"> Available now</label>
        <label><input type="checkbox" class="f-status" value="coming_soon"> Coming soon</label>
      </div>
      <button class="btn btn-outline btn-sm" id="clear-filters" style="margin-top:16px">Clear all</button>
    </aside>
    <div>
      <div class="shop-toolbar"><span class="count" id="shop-count">33 soaps</span>
        <select id="shop-sort" aria-label="Sort"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="name">Name A–Z</option></select>
      </div>
      <div class="product-grid" id="shop-grid">${cards}</div>
    </div>
  </div>
</div></section>`;
}

/* ======================== COLLECTION ========================= */
function collectionPage(c) {
  const items = byColl(c.slug);
  const cards = items.map((p, i) => productCard(p, i)).join('');
  const others = collections.filter((x) => x.slug !== c.slug).slice(0, 3);
  const rec = others.map((o) => `<a class="col-card" href="/collections/${o.slug}.html" style="min-height:220px"><img src="${o.hero}" alt="${esc(o.name)}"><div class="col-card__body"><h3 style="font-size:1.3rem">${esc(o.name)}</h3><span class="col-card__count">${o.count} Soaps</span></div></a>`).join('');
  // schematic/editorial media for this collection
  const editorialImg = c.lifestyle;
  return pageBanner(c.eyebrow, c.name, c.tagline, `<a href="/">Home</a> / <a href="/shop.html">Shop</a> / ${c.name}`, c.hero) + `
<section class="section split"><div class="split__media reveal"><img src="${editorialImg}" alt="${esc(c.name)} editorial"></div>
  <div class="reveal"><p class="eyebrow">${c.eyebrow}</p><h2>${esc(c.name)}</h2><p class="lead">${esc(c.story)}</p>
  <p class="muted">${items.length} bars in this collection.</p></div>
</section>
<section class="section" style="background:var(--rb-mist)"><div class="wrap">
  <div class="shop-toolbar"><span class="count">${items.length} soaps</span></div>
  <div class="product-grid reveal">${cards}</div>
</div></section>
<section class="section"><div class="wrap">
  <div class="sec-head center reveal"><p class="eyebrow">Continue the Ritual</p><h2>Other Collections</h2></div>
  <div class="collection-grid reveal">${rec}</div>
</div></section>
${newsletter}`;
}

/* ========================== PRODUCT ========================== */
function productPage(p) {
  const c = coll(p.collection);
  const gallery = [p.media.primary, ...(p.media.gallery || [])].filter(Boolean);
  const thumbs = gallery.length > 1 ? `<div class="pdp__thumbs">${gallery.map((g, i) => `<button class="${i === 0 ? 'active' : ''}" data-img="${g}" data-alt="${esc(p.name)}"><img src="${g}" alt="${esc(p.name)} view ${i + 1}"></button>`).join('')}</div>` : '';
  const mainImg = p.media.primary ? `<img src="${p.media.primary}" alt="${esc(p.name)} — Royal Being herbal soap">` : soapTile(p);
  const st = status[p.status];
  const canBuy = p.status === 'active';

  const statusNote = {
    coming_soon: `<div class="status-note"><b>Coming soon.</b> This bar is completing its small-batch testing. Join the waitlist and we’ll email you the moment it’s ready.</div>`,
    testing: `<div class="status-note"><b>In testing.</b> Join the waitlist to be first to know when ${esc(p.name)} launches.</div>`,
    sold_out: `<div class="status-note"><b>Sold out.</b> Add your email to the waitlist and we’ll notify you when it’s back.</div>`,
    preorder: `<div class="status-note"><b>Available for preorder.</b> Ships once the current batch is poured and cured.</div>`,
  }[p.status] || '';

  const buyBox = canBuy ? `
    <div class="buy-opts">
      <label class="buy-opt sel"><input type="radio" name="buyplan" value="one-time" checked><span><span class="bo-name">One-time purchase</span><span class="bo-sub">${money(p.price)}</span></span></label>
      ${p.subscriptionEligible ? `<label class="buy-opt"><input type="radio" name="buyplan" value="subscription"><span><span class="bo-name">Subscribe monthly</span><span class="bo-sub">${money(p.price)} / month · pause or cancel anytime</span></span></label>` : ''}
    </div>
    <div class="pdp__actions">
      <div class="qty"><button data-qty="-1" aria-label="Decrease quantity">−</button><span id="pdp-qty">1</span><button data-qty="1" aria-label="Increase quantity">+</button></div>
      <button class="btn btn-primary" data-add="${p.slug}" data-name="${esc(p.name)}" data-price="${p.price}" data-img="${p.media.primary || ''}">Add to Cart</button>
      <button class="pcard__fav" data-fav="${p.slug}" aria-label="Save to wishlist" style="position:static;box-shadow:var(--shadow-sm)">${I.heart}</button>
    </div>` : `
    ${statusNote}
    <form class="pdp__actions" data-demo-form="You’re on the list — we’ll email you first." style="flex-wrap:wrap;gap:10px">
      <input type="email" required placeholder="Email for waitlist" aria-label="Email" style="flex:1;min-width:200px;padding:13px 15px;border:1.5px solid var(--rb-line);border-radius:10px">
      <button class="btn btn-primary" type="submit">Join Waitlist</button>
      <p class="form-msg note" style="display:none;width:100%"></p>
    </form>`;

  const acc = (label, body, open = false) => `<div class="acc ${open ? 'open' : ''}"><button>${label}<span class="plus">+</span></button><div class="acc__body">${body}</div></div>`;

  const ritualBlock = p.ritualBlock ? `
    <section class="section split split--rev" style="background:var(--rb-mist)">
      <div class="split__media reveal"><video preload="none" playsinline src="/assets/client/videos/watermelon-fusion.mp4" poster="${p.media.primary || ''}" controls style="width:100%;height:100%;object-fit:cover"></video></div>
      <div class="reveal"><p class="eyebrow">The Ritual of Being <span class="review-flag">Draft · owner review</span></p><h2>Watermelon Fusion</h2>
        <p class="serif-accent" style="font-size:1.2rem">Indulge in the crisp opulence of a sun-drenched oasis. Watermelon Fusion marries intensely hydrating watermelon seed oil with the cooling touch of crushed wild mint and white tea.</p>
        <p>Hand-poured and aged in small batches, this ultra-nourishing artisanal spa bar transforms into a rich, velvety milk that gently polishes, deeply restores, and leaves skin cloaked in a delicate luminescence.</p>
        <p class="note">Elevate your daily cleansing into a sacred spa ritual.</p></div>
    </section>` : '';

  const related = byColl(p.collection).filter((x) => x.slug !== p.slug).slice(0, 4).map((x, i) => productCard(x, i)).join('');

  const schematic = p.media.primary && p.media.primary.includes('/products/') && !p.media.gallery.length && (p.media.primary.endsWith('.png'))
    ? `<section class="section" style="background:var(--rb-mist)"><div class="wrap">
        <div class="sec-head center reveal"><p class="eyebrow">Product Schematic</p><h2>Crafted &amp; Presented</h2></div>
        <div class="schematic-gallery reveal" style="max-width:520px;margin:0 auto"><figure><img src="${p.media.primary}" alt="${esc(p.name)} professional schematic"><figcaption>${esc(p.name)} · ${esc(p.colorDirection)}</figcaption></figure></div>
      </div></section>` : '';

  const editorial = p.media.editorial ? `<section class="section split"><div class="split__media reveal"><img src="${p.media.editorial}" alt="${esc(p.name)} in a Royal Being ritual grouping"></div>
    <div class="reveal"><p class="eyebrow">In the Ritual</p><h2>${esc(p.name)}</h2><p class="lead">${esc(p.publicDescription)}</p><a class="btn btn-outline" href="/collections/${p.collection}.html">Explore ${esc(c.name)}</a></div></section>` : '';

  const body = `
<section class="section"><div class="wrap">
  <nav class="breadcrumbs" style="margin-bottom:22px"><a href="/">Home</a> / <a href="/collections/${p.collection}.html">${esc(c.name)}</a> / ${esc(p.name)}</nav>
  <div class="pdp">
    <div class="pdp__gallery">
      <div class="pdp__main-img" id="pdp-main-img">${mainImg}</div>
      ${thumbs}
    </div>
    <div class="pdp__info">
      <div class="pdp__coll"><a href="/collections/${p.collection}.html">${esc(c.name)}</a></div>
      <h1>${esc(p.name)}</h1>
      ${st ? `<span class="badge ${st.cls}" style="margin-bottom:10px;display:inline-block">${st.label}</span>` : ''}
      <div class="pdp__price">${money(p.price)}</div>
      <p class="lead" style="font-size:1.05rem">${esc(p.publicDescription)}</p>
      ${buyBox}
      <div class="pdp__meta"><span>Weight · <b>${p.weightOz} oz</b></span><span>SKU · <b>${p.sku || 'Assigned at launch'}</b></span><span>Shape · <b>${p.shape}</b></span></div>
      <p class="note">Handmade &amp; hand-poured in small batches · ${site.brand.madeIn} · Ships to USA, Netherlands &amp; Belgium</p>
      <div class="accordion">
        ${acc('Description', `<p>${esc(p.publicDescription)}</p>`, true)}
        ${acc('Key Ingredients', `<p>${p.keyIngredients.map(esc).join(' · ')}</p>`)}
        ${acc('Full Ingredients', `<p>${esc(p.fullIngredients)}</p>`)}
        ${acc('How to Use', '<p>Work into a rich lather with warm water, massage over skin, and rinse. For best results, store on a draining dish between uses to extend the life of your bar.</p>')}
        ${acc('Care &amp; Storage', '<p>Keep your bar dry between uses on a well-draining soap dish, away from direct streams of water. A dry bar is a long-lasting bar.</p>')}
        ${acc('Shipping &amp; Returns', '<p>Ships to the USA, Netherlands, and Belgium. Because each bar is handmade in small batches, slight natural variation in colour and scent is part of the craft. See our <a href="/shipping-returns.html">shipping &amp; returns</a> policy.</p>')}
      </div>
    </div>
  </div>
</div></section>
${schematic}
${ritualBlock}
${editorial}
<section class="section" style="background:var(--rb-mist)"><div class="wrap">
  <div class="sec-head reveal"><p class="eyebrow">Other Items You May Like</p><h2>More from ${esc(c.name)}</h2></div>
  <div class="product-grid reveal">${related}</div>
</div></section>`;

  const buyBar = canBuy ? `<div class="buy-bar"><div><div style="font-family:var(--font-display);font-size:1.1rem">${esc(p.name)}</div></div><div class="bb-price">${money(p.price)}</div><button class="btn btn-primary btn-sm" data-add="${p.slug}" data-name="${esc(p.name)}" data-price="${p.price}" data-img="${p.media.primary || ''}">Add to Cart</button></div>` : '';
  return { body, buyBar };
}

/* ========================== JOURNAL ========================== */
const journalPosts = [
  { slug: 'why-handmade-soap-lasts-longer', title: 'Why a Well-Made Bar Lasts and Lasts', excerpt: 'The small habits — and the small-batch craft — that make a herbal bar go the distance.', img: '/assets/client/editorial/stacked-bars-2.jpg', tag: 'Ritual' },
  { slug: 'the-art-of-the-evening-ritual', title: 'The Art of the Evening Ritual', excerpt: 'How to turn the last ten minutes of your day into a calm, sensory reset.', img: '/assets/client/lifestyle/woman-2.jpg', tag: 'Ritual' },
  { slug: 'goats-milk-and-your-skin', title: 'Goat’s Milk & Your Skin', excerpt: 'Why this humble ingredient sits at the heart of nearly every Royal Being bar.', img: '/assets/client/editorial/calm-soothe.jpg', tag: 'Ingredients' },
  { slug: 'choosing-a-bar-for-your-skin', title: 'Choosing the Right Bar for Your Skin', excerpt: 'From charcoal to lavender to turmeric — a simple guide to finding your match.', img: '/assets/client/editorial/purify-detox.jpg', tag: 'Guide' },
  { slug: 'inside-a-small-batch-pour', title: 'Inside a Small-Batch Pour', excerpt: 'A look at how a Royal Being bar goes from raw botanical to cured, finished soap.', img: '/assets/client/editorial/gilded-luxury.jpg', tag: 'Process' },
  { slug: 'a-mans-guide-to-the-royal-duke', title: 'A Man’s Guide to the Royal Duke Collection', excerpt: 'Cedar, teakwood, oud and sandalwood — grounded bars for the daily shave-and-shower ritual.', img: '/assets/client/lifestyle/man-2.jpg', tag: 'Guide' },
];
function journalCards() {
  return journalPosts.map((a) => `<article class="pcard"><a class="pcard__media" href="/journal/${a.slug}.html"><img src="${a.img}" alt="${esc(a.title)}"></a>
    <div class="pcard__body"><div class="pcard__coll">${a.tag}</div><h3 class="pcard__name"><a href="/journal/${a.slug}.html">${esc(a.title)}</a></h3>
    <p class="pcard__desc">${esc(a.excerpt)}</p><a href="/journal/${a.slug}.html" class="btn btn-light btn-sm" style="align-self:flex-start">Read</a></div></article>`);
}
function journal() {
  return pageBanner('Notes on Ritual & Skin', 'The Journal', 'Slow reading on ingredients, process, and the art of the daily ritual.', '<a href="/">Home</a> / Journal', '/assets/client/lifestyle/woman-3.jpg') +
    `<section class="section"><div class="wrap"><div class="product-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">${journalCards().join('')}</div></div></section>${newsletter}`;
}
function journalPost(a) {
  return pageBanner(a.tag, a.title, '', `<a href="/">Home</a> / <a href="/journal.html">Journal</a> / ${esc(a.title)}`, a.img) + `
<section class="section"><div class="wrap prose reveal">
  <p class="lead">${esc(a.excerpt)}</p>
  <p>Royal Being began with a simple idea: bringing honest, plant-based, wholesome goodness back to daily self-care. Every article in our journal returns to that thought — that what you put on your body matters just as much as what you put in it.</p>
  <h2>A ritual, not a chore</h2>
  <p>The difference between washing and a ritual is attention. A well-made bar rewards it: a richer lather, a scent that unfolds, and skin that feels genuinely cared for. Our bars are handmade in small batches — in most cases made to order — to guarantee freshness, purity, and longevity.</p>
  <h2>Made with intention</h2>
  <p>We lovingly source pure, raw botanicals and transform them into herbal soaps that nourish without harsh additives. No secrets. No shortcuts. Just complete transparency from nature to your bathroom counter.</p>
  <p class="note">This is a draft editorial article. Final journal copy is owner-reviewable before launch.</p>
  <p><a class="btn btn-outline" href="/journal.html">← Back to the Journal</a></p>
</div></section>`;
}

module.exports = { home, shop, collectionPage, productPage, journal, journalPost, journalPosts, journalCards, pageBanner, newsletter, trust };
