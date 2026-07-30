/* Royal Being — Shopify theme interactions */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const money = (cents, currency) => {
    try {
      return (cents / 100).toLocaleString(undefined, { style: 'currency', currency: currency || (window.Shopify && Shopify.currency && Shopify.currency.active) || 'USD' });
    } catch {
      return '$' + (cents / 100).toFixed(2);
    }
  };

  async function fetchCart() {
    const res = await fetch('/cart.js', { credentials: 'same-origin' });
    return res.json();
  }

  function renderCart(cart) {
    $$('[data-cart-count]').forEach((el) => {
      const n = cart.item_count || 0;
      el.textContent = n;
      el.hidden = n === 0;
      el.style.display = n ? 'grid' : 'none';
    });
    const wrap = $('#cart-items');
    if (!wrap) return;
    if (!cart.items || !cart.items.length) {
      wrap.innerHTML = '<div class="cart-empty"><p>Your ritual awaits.</p><a class="btn btn-outline btn-sm" href="/collections/all">Explore Soaps</a></div>';
    } else {
      wrap.innerHTML = cart.items.map((i) => `
        <div class="cart-line" data-key="${i.key}">
          ${i.image ? `<img src="${i.image}" alt="${i.product_title}">` : '<div class="thumb"></div>'}
          <div>
            <div class="cart-line__name"><a href="${i.url}">${i.product_title}</a></div>
            <div class="cart-line__meta">${i.variant_title && i.variant_title !== 'Default Title' ? i.variant_title + ' · ' : ''}${money(i.final_price)}</div>
            <div class="qty">
              <button type="button" aria-label="Decrease" data-qty-change="${i.key}" data-delta="-1">−</button>
              <span>${i.quantity}</span>
              <button type="button" aria-label="Increase" data-qty-change="${i.key}" data-delta="1">+</button>
            </div>
            <button class="cart-line__rm" type="button" data-remove="${i.key}">Remove</button>
          </div>
          <div class="pcard__price">${money(i.final_line_price)}</div>
        </div>`).join('');
    }
    const sub = $('#cart-subtotal');
    if (sub) sub.textContent = money(cart.total_price);
    const co = $('#cart-checkout');
    if (co) {
      co.style.opacity = cart.item_count ? '1' : '.5';
      co.style.pointerEvents = cart.item_count ? 'auto' : 'none';
    }
  }

  async function refreshCart() {
    try { renderCart(await fetchCart()); } catch (e) { console.error(e); }
  }

  async function changeQty(key, quantity) {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity }),
      credentials: 'same-origin',
    });
    renderCart(await res.json());
  }

  async function addToCart(id, quantity) {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(id), quantity: Number(quantity) || 1 }] }),
      credentials: 'same-origin',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.description || err.message || 'Could not add to cart');
      return;
    }
    await refreshCart();
    openCart();
  }

  function openCart() { $('.cart-drawer') && $('.cart-drawer').classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { $('.cart-drawer') && $('.cart-drawer').classList.remove('open'); document.body.style.overflow = ''; }
  window.RB = { addToCart, openCart, refreshCart };

  document.addEventListener('click', async (e) => {
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
    if (e.target.closest('[data-close-cart]') || e.target.closest('.cart-drawer__scrim')) closeCart();
    if (e.target.closest('[data-open-nav]')) { $('.mobile-nav') && $('.mobile-nav').classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (e.target.closest('[data-close-nav]') || e.target.closest('.mobile-nav__scrim')) { $('.mobile-nav') && $('.mobile-nav').classList.remove('open'); document.body.style.overflow = ''; }
    const macc = e.target.closest('.m-acc>button'); if (macc) macc.parentElement.classList.toggle('open');
    const acc = e.target.closest('.acc>button'); if (acc) acc.parentElement.classList.toggle('open');
    if (e.target.closest('[data-filter-toggle]')) $('.filters') && $('.filters').classList.toggle('open');

    const add = e.target.closest('[data-add-variant]');
    if (add) {
      e.preventDefault();
      const qtyEl = $('#pdp-qty');
      addToCart(add.dataset.addVariant, qtyEl ? parseInt(qtyEl.textContent, 10) : 1);
    }
    const change = e.target.closest('[data-qty-change]');
    if (change) {
      const line = change.closest('.cart-line');
      const span = line.querySelector('.qty span');
      const next = Math.max(0, parseInt(span.textContent, 10) + parseInt(change.dataset.delta, 10));
      await changeQty(change.dataset.qtyChange, next);
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) await changeQty(rm.dataset.remove, 0);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCart(); $('.mobile-nav') && $('.mobile-nav').classList.remove('open'); document.body.style.overflow = ''; }
  });

  const header = $('.site-header');
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });

  const track = $('.announce__track');
  if (track && track.dataset.msgs) {
    try {
      const msgs = JSON.parse(track.dataset.msgs).filter((m) => m && String(m).trim());
      let i = 0;
      if (msgs.length > 1) {
        setInterval(() => {
          i = (i + 1) % msgs.length;
          track.style.opacity = 0;
          setTimeout(() => { track.textContent = msgs[i]; track.style.opacity = 1; }, 400);
        }, 5000);
      }
    } catch (_) {}
  }

  /* Hero slider */
  $$('[data-hero-slider]').forEach((root) => {
    const slides = $$('[data-slide]', root);
    const dots = $$('[data-hero-dot]', root);
    if (slides.length < 2) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = Number(root.dataset.interval) || 5500;
    const tr = Number(root.dataset.transition) || 600;
    root.style.setProperty('--hero-tr', tr + 'ms');
    let i = 0;
    let timer = null;
    let startX = 0;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, idx) => {
        const on = idx === i;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((d, idx) => {
        const on = idx === i;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    }
    function next() { go(i + 1); }
    function prev() { go(i - 1); }
    function pause() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (reduce) return;
      pause();
      timer = setInterval(next, interval);
    }
    function userGo(fn) {
      pause();
      fn();
      start();
    }

    root.querySelector('[data-hero-next]')?.addEventListener('click', () => userGo(next));
    root.querySelector('[data-hero-prev]')?.addEventListener('click', () => userGo(prev));
    dots.forEach((d) => d.addEventListener('click', () => userGo(() => go(Number(d.dataset.heroDot)))));

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') userGo(next);
      if (e.key === 'ArrowLeft') userGo(prev);
    });
    root.setAttribute('tabindex', '0');

    root.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      userGo(() => { if (dx < 0) next(); else prev(); });
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause();
      else start();
    });
    start();
  });

  /* Accordion a11y */
  $$('.acc>button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.parentElement.classList.contains('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  const qEl = $('#pdp-qty');
  if (qEl) $$('[data-qty]').forEach((b) => b.addEventListener('click', () => {
    qEl.textContent = Math.max(1, parseInt(qEl.textContent, 10) + parseInt(b.dataset.qty, 10));
  }));

  $$('.buy-opt').forEach((o) => o.addEventListener('click', () => {
    $$('.buy-opt').forEach((x) => x.classList.remove('sel'));
    o.classList.add('sel');
    const r = o.querySelector('input'); if (r) r.checked = true;
  }));

  $$('.filmstrip__poster').forEach((p) => p.addEventListener('click', () => {
    const v = p.parentElement.querySelector('video'); if (!v) return;
    p.style.display = 'none'; v.setAttribute('controls', ''); v.play();
  }));

  /* Brand film: play on hover (muted), pause on leave; tap toggle on touch */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('[data-hover-video]').forEach((wrap) => {
    const v = wrap.querySelector('video');
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = () => {
      if (reduceMotion) return;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      wrap.classList.add('is-playing');
    };
    const pause = () => {
      v.pause();
      wrap.classList.remove('is-playing');
    };
    wrap.addEventListener('mouseenter', play);
    wrap.addEventListener('mouseleave', pause);
    wrap.addEventListener('focusin', play);
    wrap.addEventListener('focusout', pause);
    wrap.addEventListener('click', () => {
      if (v.paused) play(); else pause();
    });
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('aria-label', 'Play promotional film');
  });

  /* Featured product carousel */
  $$('[data-product-carousel]').forEach((root) => {
    const track = root.querySelector('[data-pcar-track]');
    const viewport = root.querySelector('.pcar__viewport');
    const slides = $$('[data-pcar-slide]', root);
    const dotsWrap = root.querySelector('[data-pcar-dots]');
    const prevBtn = root.querySelector('[data-pcar-prev]');
    const nextBtn = root.querySelector('[data-pcar-next]');
    if (!track || !viewport || slides.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = Number(root.dataset.interval) || 5000;
    let page = 0;
    let timer = null;
    let paused = false;

    function perView() {
      const w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 860) return 2;
      if (w <= 1024) return 3;
      return 4;
    }

    function pageCount() {
      return Math.max(1, Math.ceil(slides.length / perView()));
    }

    function layout() {
      const pv = perView();
      const slideW = viewport.clientWidth / pv;
      slides.forEach((s) => {
        s.style.flex = '0 0 ' + slideW + 'px';
        s.style.width = slideW + 'px';
      });
    }

    function renderDots() {
      if (!dotsWrap) return;
      const n = pageCount();
      dotsWrap.innerHTML = '';
      for (let i = 0; i < n; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pcar__dot' + (i === page ? ' is-active' : '');
        b.setAttribute('aria-label', 'Go to products page ' + (i + 1));
        b.setAttribute('aria-selected', i === page ? 'true' : 'false');
        b.addEventListener('click', () => { stop(); go(i); });
        dotsWrap.appendChild(b);
      }
    }

    function go(p) {
      const max = pageCount() - 1;
      page = ((p % (max + 1)) + (max + 1)) % (max + 1);
      track.style.transform = 'translateX(-' + (page * viewport.clientWidth) + 'px)';
      $$('.pcar__dot', root).forEach((d, i) => {
        d.classList.toggle('is-active', i === page);
        d.setAttribute('aria-selected', i === page ? 'true' : 'false');
      });
    }

    function next() { go(page + 1); }
    function prev() { go(page - 1); }
    function stop() { paused = true; if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (reduce || paused || pageCount() < 2) return;
      if (timer) clearInterval(timer);
      timer = setInterval(next, interval);
    }

    function refresh() {
      layout();
      if (page > pageCount() - 1) page = pageCount() - 1;
      renderDots();
      go(page);
    }

    prevBtn && prevBtn.addEventListener('click', () => { stop(); prev(); });
    nextBtn && nextBtn.addEventListener('click', () => { stop(); next(); });
    root.addEventListener('mouseenter', () => { if (timer) { clearInterval(timer); timer = null; } });
    root.addEventListener('mouseleave', () => { if (!paused) start(); });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });

    refresh();
    start();
  });

  $$('.pdp__thumbs button').forEach((b) => b.addEventListener('click', () => {
    const main = $('#pdp-main-img');
    if (main && b.dataset.img) main.innerHTML = `<img src="${b.dataset.img}" alt="${b.dataset.alt || ''}">`;
    $$('.pdp__thumbs button').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
  }));

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));

  refreshCart();
})();
