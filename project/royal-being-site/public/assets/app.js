/* Royal Being — storefront interactions (vanilla, no dependencies) */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const money = (n) => '$' + n.toFixed(2);

  /* ---------- Cart (localStorage) ---------- */
  const CART_KEY = 'rb_cart_v1';
  const readCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
  const writeCart = (c) => { localStorage.setItem(CART_KEY, JSON.stringify(c)); renderCart(); };
  const cartCount = () => readCart().reduce((n, i) => n + i.qty, 0);
  const cartSubtotal = () => readCart().reduce((n, i) => n + i.price * i.qty, 0);

  function addToCart(item) {
    const cart = readCart();
    const key = item.slug + '|' + (item.plan || 'one-time');
    const ex = cart.find((i) => i.key === key);
    if (ex) ex.qty += item.qty || 1;
    else cart.push({ key, slug: item.slug, name: item.name, price: item.price, img: item.img || '', plan: item.plan || 'one-time', qty: item.qty || 1 });
    writeCart(cart);
    openCart();
  }
  function setQty(key, delta) {
    const cart = readCart();
    const it = cart.find((i) => i.key === key);
    if (!it) return;
    it.qty += delta;
    writeCart(it.qty <= 0 ? cart.filter((i) => i.key !== key) : cart);
  }
  function removeLine(key) { writeCart(readCart().filter((i) => i.key !== key)); }

  function renderCart() {
    $$('.cart-count').forEach((el) => { const n = cartCount(); el.textContent = n; el.style.display = n ? 'grid' : 'none'; });
    const wrap = $('#cart-items'); if (!wrap) return;
    const cart = readCart();
    if (!cart.length) {
      wrap.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg><p>Your ritual awaits.</p><a class="btn btn-outline btn-sm" href="/shop.html">Explore Soaps</a></div>';
    } else {
      wrap.innerHTML = cart.map((i) => `
        <div class="cart-line">
          ${i.img ? `<img src="${i.img}" alt="${i.name}">` : '<div class="thumb"></div>'}
          <div>
            <div class="cart-line__name">${i.name}</div>
            <div class="cart-line__meta">${i.plan === 'subscription' ? 'Monthly subscription' : 'One-time'} · ${money(i.price)}</div>
            <div class="qty"><button aria-label="Decrease" data-dec="${i.key}">−</button><span>${i.qty}</span><button aria-label="Increase" data-inc="${i.key}">+</button></div>
            <button class="cart-line__rm" data-rm="${i.key}">Remove</button>
          </div>
          <div class="pcard__price">${money(i.price * i.qty)}</div>
        </div>`).join('');
    }
    const sub = $('#cart-subtotal'); if (sub) sub.textContent = money(cartSubtotal());
    const co = $('#cart-checkout'); if (co) co.style.pointerEvents = cart.length ? 'auto' : 'none', co && (co.style.opacity = cart.length ? '1' : '.5');
  }

  document.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'); if (inc) return setQty(inc.dataset.inc, 1);
    const dec = e.target.closest('[data-dec]'); if (dec) return setQty(dec.dataset.dec, -1);
    const rm = e.target.closest('[data-rm]'); if (rm) return removeLine(rm.dataset.rm);
    const add = e.target.closest('[data-add]');
    if (add) {
      const plan = (document.querySelector('input[name="buyplan"]:checked') || {}).value || 'one-time';
      const qtyEl = $('#pdp-qty');
      addToCart({ slug: add.dataset.add, name: add.dataset.name, price: parseFloat(add.dataset.price), img: add.dataset.img, plan, qty: qtyEl ? parseInt(qtyEl.textContent) : 1 });
    }
  });

  /* ---------- Drawers / nav ---------- */
  function openCart() { $('.cart-drawer') && $('.cart-drawer').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { $('.cart-drawer') && $('.cart-drawer').classList.remove('open'); document.body.style.overflow = ''; }
  window.RB = { addToCart, openCart };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
    if (e.target.closest('[data-close-cart]')) closeCart();
    if (e.target.closest('.cart-drawer__scrim')) closeCart();
    if (e.target.closest('[data-open-nav]')) { $('.mobile-nav').classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (e.target.closest('[data-close-nav]') || e.target.closest('.mobile-nav__scrim')) { $('.mobile-nav').classList.remove('open'); document.body.style.overflow = ''; }
    const macc = e.target.closest('.m-acc>button'); if (macc) macc.parentElement.classList.toggle('open');
    const acc = e.target.closest('.acc>button'); if (acc) acc.parentElement.classList.toggle('open');
    if (e.target.closest('[data-filter-toggle]')) $('.filters').classList.toggle('open');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeCart(); $('.mobile-nav') && $('.mobile-nav').classList.remove('open'); document.body.style.overflow=''; } });

  /* ---------- Header shadow ---------- */
  const header = $('.site-header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });

  /* ---------- Announcement rotate ---------- */
  const track = $('.announce__track');
  if (track && track.dataset.msgs) {
    const msgs = JSON.parse(track.dataset.msgs); let i = 0;
    setInterval(() => { i = (i + 1) % msgs.length; track.style.opacity = 0; setTimeout(() => { track.innerHTML = msgs[i]; track.style.opacity = 1; }, 400); }, 5000);
  }

  /* ---------- PDP gallery + qty + buy options ---------- */
  $$('.pdp__thumbs button').forEach((b) => b.addEventListener('click', () => {
    const main = $('#pdp-main-img'); if (main && b.dataset.img) main.innerHTML = `<img src="${b.dataset.img}" alt="${b.dataset.alt || ''}">`;
    $$('.pdp__thumbs button').forEach((x) => x.classList.remove('active')); b.classList.add('active');
  }));
  const qEl = $('#pdp-qty');
  if (qEl) $$('[data-qty]').forEach((b) => b.addEventListener('click', () => { let v = parseInt(qEl.textContent) + parseInt(b.dataset.qty); qEl.textContent = Math.max(1, v); }));
  $$('.buy-opt').forEach((o) => o.addEventListener('click', () => { $$('.buy-opt').forEach((x) => x.classList.remove('sel')); o.classList.add('sel'); const r = o.querySelector('input'); if (r) r.checked = true; }));

  /* ---------- Video play ---------- */
  $$('.filmstrip__poster').forEach((p) => p.addEventListener('click', () => {
    const v = p.parentElement.querySelector('video'); if (!v) return; p.style.display = 'none'; v.setAttribute('controls', ''); v.play();
  }));

  /* ---------- Wishlist (localStorage) ---------- */
  const WISH = 'rb_wish_v1';
  const wish = () => { try { return JSON.parse(localStorage.getItem(WISH)) || []; } catch { return []; } };
  $$('.pcard__fav').forEach((b) => {
    const slug = b.dataset.fav; if (wish().includes(slug)) b.classList.add('active');
    b.addEventListener('click', (e) => { e.preventDefault(); let w = wish(); w = w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]; localStorage.setItem(WISH, JSON.stringify(w)); b.classList.toggle('active'); });
  });

  /* ---------- Shop sort + filter ---------- */
  const grid = $('#shop-grid');
  if (grid) {
    const cards = () => $$('.pcard', grid);
    const applyFilters = () => {
      const colls = $$('.f-coll:checked').map((c) => c.value);
      const stats = $$('.f-status:checked').map((c) => c.value);
      let shown = 0;
      cards().forEach((c) => {
        const okC = !colls.length || colls.includes(c.dataset.collection);
        const okS = !stats.length || stats.includes(c.dataset.status);
        const vis = okC && okS; c.classList.toggle('hidden', !vis); if (vis) shown++;
      });
      const cnt = $('#shop-count'); if (cnt) cnt.textContent = shown + ' soap' + (shown === 1 ? '' : 's');
    };
    $$('.f-coll,.f-status').forEach((c) => c.addEventListener('change', applyFilters));
    const clear = $('#clear-filters'); if (clear) clear.addEventListener('click', () => { $$('.f-coll,.f-status').forEach((c) => (c.checked = false)); applyFilters(); });
    const sort = $('#shop-sort');
    if (sort) sort.addEventListener('change', () => {
      const arr = cards();
      arr.sort((a, b) => {
        const v = sort.value;
        if (v === 'price-asc') return a.dataset.price - b.dataset.price;
        if (v === 'price-desc') return b.dataset.price - a.dataset.price;
        if (v === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        return a.dataset.order - b.dataset.order;
      });
      arr.forEach((c) => grid.appendChild(c));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- Simple form demo handling ---------- */
  $$('form[data-demo-form]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault(); const msg = f.querySelector('.form-msg');
    if (msg) { msg.textContent = f.dataset.demoForm || 'Thank you — we’ll be in touch soon.'; msg.style.display = 'block'; }
    f.reset();
  }));

  renderCart();
})();
