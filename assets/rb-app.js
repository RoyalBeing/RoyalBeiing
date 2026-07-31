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

  /* Google reviews carousel + modal */
  $$('[data-google-reviews]').forEach((root) => {
    const dataEl = root.querySelector('[data-grev-data]');
    let reviews = [];
    try { reviews = JSON.parse((dataEl && dataEl.textContent) || '[]'); } catch (e) { reviews = []; }
    if (!Array.isArray(reviews)) reviews = [];

    const modal = root.querySelector('[data-grev-modal]');
    const dialog = root.querySelector('[data-grev-dialog]');
    const body = root.querySelector('[data-grev-modal-body]');
    const viewLink = root.querySelector('[data-grev-view-google]');
    const openAllBtn = root.querySelector('[data-grev-open-all]');
    let lastFocus = null;
    let focusables = [];

    function stars(n) {
      const r = Math.max(0, Math.min(5, Number(n) || 0));
      let html = '';
      for (let i = 1; i <= 5; i++) html += '<span class="grev-star' + (i > r ? ' grev-star--empty' : '') + '" aria-hidden="true">★</span>';
      return html;
    }

    function avatarHtml(r, tone) {
      if (r.avatar) {
        return '<span class="grev-avatar" aria-hidden="true"><img src="' + r.avatar + '" alt="" width="48" height="48"><span class="grev-avatar__g">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></span></span>';
      }
      const t = tone != null ? tone : 0;
      return '<span class="grev-avatar" aria-hidden="true"><span class="grev-avatar__initial" data-tone="' + (t % 5) + '">' +
        (r.initial || '?') + '</span><span class="grev-avatar__g"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></span></span>';
    }

    function escapeHtml(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function itemHtml(r, idx) {
      const verified = r.verified
        ? '<span class="grev-verified" title="Verified Google review" aria-label="Verified"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><path fill="#fff" d="M6.7 10.85 4.4 8.55l.9-.9 1.4 1.4 3.6-3.6.9.9z"/></svg></span>'
        : '';
      let reply = '';
      if (r.reply) {
        reply = '<div class="grev-modal__reply"><div class="grev-modal__reply-head"><span>Royal Being</span>' +
          '<span class="grev-modal__reply-badge">' + escapeHtml(r.reply_label || 'OWNER REPLY') + '</span></div>' +
          '<p>' + escapeHtml(r.reply) + '</p></div>';
      }
      return '<article class="grev-modal__item">' +
        '<div class="grev-modal__who">' + avatarHtml(r, idx) +
        '<span class="grev-card__meta"><span class="grev-card__name">' + escapeHtml(r.name) + ' ' + verified + '</span>' +
        (r.date ? '<span class="grev-card__date">' + escapeHtml(r.date) + '</span>' : '') +
        '</span></div>' +
        '<div class="grev-modal__stars-row" aria-label="' + (r.rating || 5) + ' out of 5 stars">' + stars(r.rating) + '</div>' +
        '<p class="grev-modal__text">' + escapeHtml(r.body) + '</p>' + reply +
        '</article>';
    }

    function getFocusables() {
      if (!dialog) return [];
      return $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', dialog)
        .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    }

    function openModal(list, focusReviewUrl) {
      if (!modal || !body || !list.length) return;
      lastFocus = document.activeElement;
      body.innerHTML = list.map((r, i) => itemHtml(r, i)).join('');
      if (viewLink) {
        const url = focusReviewUrl || viewLink.getAttribute('href');
        if (url) {
          viewLink.href = url;
          viewLink.hidden = false;
        } else {
          viewLink.hidden = true;
        }
      }
      modal.hidden = false;
      document.body.classList.add('grev-lock');
      focusables = getFocusables();
      (dialog || modal).focus();
    }

    function closeModal() {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('grev-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function findReview(id) {
      return reviews.find((r) => String(r.id) === String(id));
    }

    $$('[data-grev-open]', root).forEach((el) => {
      el.addEventListener('click', () => {
        const rid = el.getAttribute('data-grev-id');
        const r = findReview(rid);
        if (r) openModal([r], r.google_url || null);
      });
    });

    openAllBtn && openAllBtn.addEventListener('click', () => openModal(reviews, null));

    $$('[data-grev-close]', root).forEach((el) => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e) => {
      if (modal && !modal.hidden && e.key === 'Escape') closeModal();
      if (!modal || modal.hidden || e.key !== 'Tab' || !dialog) return;
      focusables = getFocusables();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    /* Carousel */
    const carousel = root.querySelector('[data-grev-carousel]');
    if (!carousel) return;
    const track = carousel.querySelector('[data-grev-track]');
    const viewport = carousel.querySelector('.grev__viewport');
    const slides = $$('[data-grev-slide]', carousel);
    const dotsWrap = root.querySelector('[data-grev-dots]');
    const prevBtn = carousel.querySelector('[data-grev-prev]');
    const nextBtn = carousel.querySelector('[data-grev-next]');
    if (!track || !viewport || !slides.length) return;

    let page = 0;
    let startX = 0;

    function perView() {
      const w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 860) return 2;
      if (w <= 1100) return 3;
      return 4;
    }
    function pageCount() { return Math.max(1, Math.ceil(slides.length / perView())); }
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
        b.className = 'grev__dot' + (i === page ? ' is-active' : '');
        b.setAttribute('aria-label', 'Go to reviews page ' + (i + 1));
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
      }
    }
    function go(p) {
      const max = pageCount() - 1;
      page = ((p % (max + 1)) + (max + 1)) % (max + 1);
      track.style.transform = 'translateX(-' + (page * viewport.clientWidth) + 'px)';
      $$('.grev__dot', root).forEach((d, i) => d.classList.toggle('is-active', i === page));
    }
    function refresh() {
      layout();
      if (page > pageCount() - 1) page = pageCount() - 1;
      renderDots();
      go(page);
    }

    prevBtn && prevBtn.addEventListener('click', () => go(page - 1));
    nextBtn && nextBtn.addEventListener('click', () => go(page + 1));
    carousel.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) go(page + 1); else go(page - 1);
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });
    refresh();
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
