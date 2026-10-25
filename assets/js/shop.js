// Verslun alit.is: karfa (geymd í vafranum), körfuskúffa með viðbótum,
// valhnappar á vörusíðum og kassi. Vörulistinn kemur úr data/shop.yaml (window.SHOP).

const SHOP = window.SHOP || { products: {}, groups: {} };
const P = SHOP.products;
const KEY = 'alit-cart-v1';

// ── Hjálparföll ─────────────────────────────────────────────────────────────
const kr = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' kr.';
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ── Karfa ───────────────────────────────────────────────────────────────────
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
cart = cart.filter((i) => P[i.id]);

const listeners = [];
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* einkagluggi o.fl. */ }
  listeners.forEach((fn) => fn());
}
const onChange = (fn) => listeners.push(fn);

function add(id, color, text) {
  const p = P[id];
  if (!p) return;
  color = p.no_color ? '' : (color || (SHOP.colors || [])[0] || '');
  text = text || '';
  const hit = cart.find((i) => i.id === id && i.color === color && i.text === text);
  if (hit) hit.qty += 1; else cart.push({ id, qty: 1, color, text });
  save();
}
function setQty(idx, qty) {
  if (qty <= 0) cart.splice(idx, 1); else cart[idx].qty = qty;
  save();
}
const count = () => cart.reduce((n, i) => n + i.qty, 0);
const inCart = (id) => cart.some((i) => i.id === id);

// Verð með pakkaafslætti (t.d. pílukarusell ódýrara með fullbúnu setti)
function unitPrice(id) {
  const p = P[id];
  if (p.bundle_price && (p.bundle_with || []).some(inCart)) return p.bundle_price;
  return p.price;
}
const total = () => cart.reduce((n, i) => n + unitPrice(i.id) * i.qty, 0);

// Hópur = vörur á sömu vörusíðu; ekki stinga upp á vöru úr hópi sem er þegar í körfu
function groupOf(id) {
  for (const [g, def] of Object.entries(SHOP.groups || {})) if (def.options.includes(id)) return g;
  return id;
}
function upsells() {
  const have = new Set(cart.map((i) => groupOf(i.id)));
  return (SHOP.upsell || []).filter((id) => P[id] && !have.has(groupOf(id)));
}

function priceHtml(id) {
  const now = unitPrice(id), was = P[id].price;
  return now < was ? `<s>${kr(was)}</s> <b>${kr(now)}</b>` : `<b>${kr(now)}</b>`;
}
function bundleHint(id) {
  const p = P[id];
  if (!p.bundle_price || unitPrice(id) === p.bundle_price) return '';
  return `<span class="shop-hint">${kr(p.bundle_price)} með fullbúnu setti</span>`;
}

// ── Línur í körfu (notað í skúffu og á kassa) ───────────────────────────────
function itemsHtml() {
  if (!cart.length) return `<p class="shop-empty">Karfan er tóm. <a href="/verslun/darts/">Skoða vörur →</a></p>`;
  return cart.map((i, idx) => {
    const p = P[i.id];
    const meta = [i.color, i.text && `„${i.text}“`].filter(Boolean).map(esc).join(' · ');
    return `<div class="shop-line">
      <img src="${esc(p.image)}" alt="">
      <div class="shop-line-body">
        <span class="shop-line-name">${esc(p.name)}</span>
        ${meta ? `<span class="shop-line-meta">${meta}</span>` : ''}
        <span class="shop-qty">
          <button type="button" data-qty="${idx}" data-d="-1" aria-label="Fækka">−</button>
          <span>${i.qty}</span>
          <button type="button" data-qty="${idx}" data-d="1" aria-label="Fjölga">+</button>
        </span>
      </div>
      <span class="shop-line-price">${kr(unitPrice(i.id) * i.qty)}</span>
    </div>`;
  }).join('');
}

function upsellHtml(title) {
  const ids = upsells();
  if (!ids.length) return '';
  return `<div class="shop-up"><span class="shop-label">${title}</span>${ids.map((id) => {
    const p = P[id];
    const btn = p.text ? `<a class="shop-add shop-add-sm" href="${esc(p.url)}">Velja</a>`
                       : `<button type="button" class="shop-add shop-add-sm" data-add="${id}">+ Bæta við</button>`;
    return `<div class="shop-line">
      <a href="${esc(p.url)}"><img src="${esc(p.image)}" alt=""></a>
      <div class="shop-line-body"><span class="shop-line-name">${esc(p.name)}</span>
        <span class="shop-line-meta">${priceHtml(id)} ${bundleHint(id)}</span></div>
      ${btn}
    </div>`;
  }).join('')}</div>`;
}

// Smellir á +/− og "Bæta við" hvar sem er á síðunni
document.addEventListener('click', (e) => {
  const q = e.target.closest('[data-qty]');
  if (q) { const idx = +q.dataset.qty; setQty(idx, cart[idx].qty + +q.dataset.d); return; }
  const a = e.target.closest('[data-add]');
  if (a) { add(a.dataset.add); flash(a); openDrawer(); }
});

function flash(btn) {
  btn.classList.add('is-added');
  setTimeout(() => btn.classList.remove('is-added'), 900);
}

// ── Körfuhnappur og skúffa ──────────────────────────────────────────────────
const isCheckout = !!$('.shop-checkout');

const fab = document.createElement('a');
fab.className = 'shop-fab';
fab.href = SHOP.checkout_url;
fab.setAttribute('aria-label', 'Karfa');
fab.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg><span class="shop-fab-n"></span>`;
fab.addEventListener('click', (e) => { if (!isCheckout) { e.preventDefault(); openDrawer(); } });

const drawer = document.createElement('div');
drawer.className = 'shop-drawer';
drawer.innerHTML = `<div class="shop-drawer-bg" data-close></div>
  <aside class="shop-drawer-panel" role="dialog" aria-label="Karfa" aria-modal="true">
    <header><b>Karfan þín</b><button type="button" class="shop-x" data-close aria-label="Loka">×</button></header>
    <div class="shop-drawer-items"></div>
    <div class="shop-drawer-up"></div>
    <footer>
      <div class="shop-sum"><span>Samtals</span><b></b></div>
      <a class="shop-add shop-go" href="${SHOP.checkout_url}">Fara á kassa →</a>
      <button type="button" class="shop-link" data-close>Halda áfram að versla</button>
    </footer>
  </aside>`;
drawer.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeDrawer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

function openDrawer() {
  if (isCheckout) return;
  drawer.classList.add('is-open');
  document.documentElement.classList.add('shop-lock');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  document.documentElement.classList.remove('shop-lock');
}

function renderChrome() {
  const n = count();
  $('.shop-fab-n', fab).textContent = n;
  fab.classList.toggle('is-visible', n > 0 && !isCheckout);
  $('.shop-drawer-items', drawer).innerHTML = itemsHtml();
  $('.shop-drawer-up', drawer).innerHTML = upsellHtml('Bættu við');
  $('.shop-sum b', drawer).textContent = kr(total());
  $('footer', drawer).hidden = !cart.length;
  // Kort sem sýna pakkaverð uppfærast þegar karfan breytist
  $$('[data-price-of]').forEach((el) => { el.innerHTML = priceHtml(el.dataset.priceOf) + bundleHint(el.dataset.priceOf); });
}
onChange(renderChrome);

// ── Val á vörusíðu (shortcode buy) ──────────────────────────────────────────
function initBuy(box) {
  const gid = box.dataset.group;
  const g = SHOP.groups[gid];
  const hero = $('.shop-buy-hero', box);
  const priceEl = $('.shop-add-price', box);
  const colors = $('.shop-colors', box);
  const textWrap = $('.shop-text', box);
  const textIn = $('input', textWrap);
  const parts = $(`.shop-parts[data-group="${gid}"]`);
  const selected = () => $(`input[name="opt-${gid}"]:checked`, box).value;

  function update() {
    const id = selected(), p = P[id];
    hero.src = p.image; hero.alt = p.name;
    priceEl.innerHTML = kr(unitPrice(id));
    colors.hidden = !!p.no_color;
    textWrap.hidden = !p.text;
    if (p.text) {
      $('.shop-label', textWrap).textContent = p.text.label;
      textIn.maxLength = p.text.max || 40;
      textIn.style.textTransform = p.text.upper ? 'uppercase' : '';
      $('small', textWrap).textContent = p.text.hint || '';
    }
    if (parts && g.includes) {
      const inc = g.includes[id] || [];
      $$('.shop-part', parts).forEach((b) => {
        const on = inc.includes(b.dataset.part);
        b.classList.toggle('is-in', on);
        $('.shop-part-tag', b).textContent = on ? '✓ Innifalið' : '+ Bæta við';
      });
    }
  }

  box.addEventListener('change', update);
  onChange(update);

  $('.shop-add', box).addEventListener('click', (e) => {
    const id = selected(), p = P[id];
    let text = p.text ? textIn.value.trim() : '';
    if (p.text && p.text.upper) text = text.toUpperCase();
    if (p.text && !text) { textIn.focus(); textIn.classList.add('is-err'); return; }
    textIn.classList.remove('is-err');
    const c = $(`input[name="color-${gid}"]:checked`, box);
    add(id, c && c.value, text);
    flash(e.currentTarget);
    openDrawer();
  });

  // Myndahnappar: stór mynd + útskýring; ef hluturinn er ekki innifalinn, bjóða ódýrasta valkostinn sem inniheldur hann
  if (parts) parts.addEventListener('click', (e) => {
    const b = e.target.closest('.shop-part');
    if (!b) return;
    const part = b.dataset.part;
    const upgrade = !b.classList.contains('is-in') && g.options.find((o) => (g.includes[o] || []).includes(part) && P[o].price > P[selected()].price);
    showPart(b, upgrade ? {
      label: `Velja ${P[upgrade].name} · +${kr(P[upgrade].price - P[selected()].price)}`,
      run: () => { $(`input[value="${upgrade}"]`, box).checked = true; update(); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); },
    } : null);
  });

  update();
}

const dlg = document.createElement('dialog');
dlg.className = 'shop-dlg';
dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
dlg.addEventListener('close', () => { const v = $('video', dlg); if (v) v.pause(); });

function showPart(btn, upgrade) {
  const name = $('.shop-part-name', btn).textContent;
  const media = btn.dataset.video
    ? `<video src="${esc(btn.dataset.video)}" autoplay muted loop playsinline controls poster="${esc(btn.dataset.full)}"></video>`
    : `<img src="${esc(btn.dataset.full)}" alt="${esc(name)}">`;
  dlg.innerHTML = `<button type="button" class="shop-x" data-close aria-label="Loka">×</button>${media}
    <div class="shop-dlg-body"><b>${esc(name)}</b><p>${esc(btn.dataset.text)}</p>
    ${upgrade ? `<button type="button" class="shop-add shop-dlg-up"></button>` : ''}</div>`;
  if (upgrade) {
    const u = $('.shop-dlg-up', dlg);
    u.textContent = upgrade.label;
    u.addEventListener('click', () => { dlg.close(); upgrade.run(); });
  }
  dlg.showModal();
}

// ── Kassi (shortcode checkout) ──────────────────────────────────────────────
function initCheckout(root) {
  const form = $('.shop-co-form', root);
  const status = $('.form-status', form);
  const btn = $('button[type="submit"]', form);
  const addr = $('.shop-co-addr', form);

  function render() {
    if (!root.contains(form)) return; // takk-skjárinn er kominn í staðinn
    $('.shop-co-items', root).innerHTML = itemsHtml();
    $('.shop-co-upsell', root).innerHTML = upsellHtml('Viltu bæta við?');
    $('.shop-co-total', root).innerHTML = `<span>Samtals</span><b>${kr(total())}</b>`;
    btn.textContent = `Klára kaup · ${kr(total())}`;
    form.hidden = !cart.length;
  }
  onChange(render);
  render();

  form.addEventListener('change', () => { addr.hidden = form.ship.value === 'Sækja'; });

  function show(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
    status.style.display = 'block';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    if (!f.name.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) {
      show('Settu inn nafn og gilt netfang.', false); return;
    }
    if (f.ship.value !== 'Sækja' && !f.address.value.trim()) { show('Settu inn heimilisfang.', false); f.address.focus(); return; }

    // contact-api tekur við: name, email, product, color, handleText, message.
    // Dýrasta varan fer í "product" svo sjálfvirki vörupósturinn fari enn af stað.
    const top = [...cart].sort((a, b) => P[b.id].price - P[a.id].price)[0];
    const lines = cart.map((i) => {
      const meta = [i.color, i.text && `texti: ${i.text}`].filter(Boolean).join(', ');
      return `${i.qty} × ${P[i.id].name}${meta ? ` (${meta})` : ''} — ${kr(unitPrice(i.id) * i.qty)}`;
    });
    const message = [
      'PÖNTUN',
      ...lines,
      `Samtals: ${kr(total())} + sending`,
      '',
      `Afhending: ${f.ship.value}`,
      f.ship.value !== 'Sækja' ? `Heimilisfang: ${f.address.value.trim()}` : '',
      f.phone.value.trim() ? `Sími: ${f.phone.value.trim()}` : '',
      f.note.value.trim() ? `\nAthugasemd: ${f.note.value.trim()}` : '',
    ].filter(Boolean).join('\n');

    const body = new URLSearchParams({
      _honey: f._honey.value,
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      product: P[top.id].legacy || P[top.id].name,
      color: [...new Set(cart.map((i) => i.color).filter(Boolean))].join(', '),
      handleText: cart.map((i) => i.text).filter(Boolean).join(', '),
      message,
    });

    btn.disabled = true; btn.textContent = 'Sendi...';
    fetch(SHOP.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) throw new Error(d.error);
        cart = []; save();
        root.innerHTML = `<div class="shop-done"><b>Takk fyrir kaupin!</b><p>Varan fer nú í framleiðslu. Staðfesting er á leiðinni á ${esc(f.email.value.trim())}, og svo afhendingartími og greiðsluupplýsingar.</p><a class="shop-add" href="/verslun/">Aftur í verslun</a></div>`;
      })
      .catch((err) => show((err && err.message) || 'Nettengingarvilla. Reyndu aftur síðar.', false))
      .finally(() => { btn.disabled = false; btn.textContent = `Klára kaup · ${kr(total())}`; });
  });
}

// ── Ræsing ──────────────────────────────────────────────────────────────────
function boot() {
  document.body.append(fab, drawer, dlg);
  $$('.shop-buy').forEach(initBuy);
  $$('.shop-checkout').forEach(initCheckout);
  renderChrome();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
