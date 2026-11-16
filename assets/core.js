/* Kısayolcu — ortak yardımcılar: tuş görselleri, kombinasyon eşleme, depolama, bildirim. */
(function () {
  // İletişim linki (X profili). Değiştirmek için sadece burayı düzenle.
  const CONTACT_URL = 'https://x.com/gokhanazap0';

  const KEYS = {
    cmd: { s: '⌘', l: 'command', w: 'mod' },
    opt: { s: '⌥', l: 'option', w: 'mod' },
    ctrl: { s: '⌃', l: 'control', w: 'mod' },
    shift: { s: '⇧', l: 'shift', w: 'mod' },
    fn: { s: '🌐', l: 'fn', w: 'mod' },
    space: { s: '', l: 'space', w: 'space' },
    tab: { s: '⇥', l: 'tab', w: 'mod' },
    esc: { s: '', l: 'esc', w: 'mod' },
    delete: { s: '⌫', l: 'delete', w: 'mod' },
    return: { s: '↩', l: 'return', w: 'mod' },
    up: { s: '↑' }, down: { s: '↓' }, left: { s: '←' }, right: { s: '→' },
    vol: { s: '🔊', l: 'ses' },
    click: { s: '🖱', l: 'tık', w: 'mod' },
    f2: { s: 'F2' }, f5: { s: 'F5' },
    power: { s: '⏻', l: 'güç', w: 'mod' }
  };

  function esc(t) {
    return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function keycap(k) {
    const def = KEYS[k];
    if (!def) return `<kbd class="kc" data-k="${esc(k)}"><span class="kc-s">${esc(k.toUpperCase())}</span></kbd>`;
    const cls = def.w ? ` kc-${def.w}` : '';
    const lbl = def.l ? `<span class="kc-l">${def.l}</span>` : '';
    const sym = def.s ? `<span class="kc-s">${def.s}</span>` : '';
    return `<kbd class="kc${cls}" data-k="${k}">${sym}${lbl}</kbd>`;
  }

  function keyGroup(keys) {
    return `<span class="kc-group">${keys.map(keycap).join('')}</span>`;
  }

  /** Bir kısayolun tüm tuş varyantlarını HTML olarak verir. */
  function renderShortcut(sc) {
    let h = keyGroup(sc.keys);
    if (sc.then) h += `<span class="kc-sep">sonra</span>` + keyGroup(sc.then);
    (sc.alt || []).forEach(a => { h += `<span class="kc-sep">${sc.alt.length > 1 || isPair(sc) ? '/' : 'veya'}</span>` + keyGroup(a); });
    return `<span class="kc-row">${h}</span>`;
  }
  function isPair(sc) { return sc.alt && sc.alt.length === 1 && sc.alt[0].length === sc.keys.length && sc.alt[0][0] === sc.keys[0]; }

  /** Metin içindeki ⌘⌥⌃⇧ sembollerini küçük tuş görünümüne çevirir. */
  function prettyText(t) {
    return esc(t).replace(/([⌃⌥⇧⌘]+[^\s,.)…;:!?’'“”]*)/g, '<span class="kbd-inline">$1</span>');
  }

  // ── Kombinasyon eşleme ──────────────────────────────
  const CODE_MAP = {
    Space: 'space', Tab: 'tab', Escape: 'esc', Enter: 'return', Backspace: 'delete', Delete: 'fwddelete',
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    Backquote: '`', IntlBackslash: '`', Comma: ',', Period: '.', Slash: '/', Semicolon: ';', Quote: "'",
    BracketLeft: '[', BracketRight: ']', Minus: '-', Equal: '=', Backslash: '\\'
  };
  const KEY_MAP = {
    ' ': 'space', Tab: 'tab', Escape: 'esc', Enter: 'return', Backspace: 'delete', Delete: 'fwddelete',
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right'
  };

  function keyNames(e) {
    const out = new Set();
    if (KEY_MAP[e.key]) out.add(KEY_MAP[e.key]);
    else if (e.key && e.key.length === 1) out.add(e.key.toLocaleLowerCase('en-US'));
    const c = e.code || '';
    if (CODE_MAP[c]) out.add(CODE_MAP[c]);
    else if (/^Key[A-Z]$/.test(c)) out.add(c.slice(3).toLowerCase());
    else if (/^Digit\d$/.test(c)) out.add(c.slice(5));
    if (out.has('=')) out.add('+');
    return out;
  }

  function parseCombo(str) {
    const parts = str.split('+').filter(Boolean);
    const c = { meta: false, ctrl: false, alt: false, shift: false, key: '' };
    parts.forEach(p => {
      if (p === 'cmd' || p === 'meta') c.meta = true;
      else if (p === 'ctrl') c.ctrl = true;
      else if (p === 'alt' || p === 'opt') c.alt = true;
      else if (p === 'shift') c.shift = true;
      else c.key = p;
    });
    if (str.endsWith('++')) c.key = '+';
    return c;
  }

  function matches(e, comboStr) {
    const c = parseCombo(comboStr);
    if (e.metaKey !== c.meta || e.ctrlKey !== c.ctrl || e.altKey !== c.alt) return false;
    // shift: '+' gibi karakterlerde esnek davran
    if (c.key !== '+' && e.shiftKey !== c.shift) return false;
    return keyNames(e).has(c.key);
  }

  /** Olaydan okunabilir kombinasyon kimliği: "ctrl+alt+shift+cmd+k" */
  function comboId(mods, key) {
    const p = [];
    if (mods.ctrl) p.push('ctrl');
    if (mods.alt) p.push('opt');
    if (mods.shift) p.push('shift');
    if (mods.meta) p.push('cmd');
    if (key) p.push(key);
    return p.join('+');
  }

  // Veri setinden kombinasyon → kısayol dizini (canlı tanıma için)
  let INDEX = null;
  function buildIndex() {
    INDEX = new Map();
    (window.KS_SHORTCUTS || []).forEach(sc => {
      [sc.keys].concat(sc.alt || []).forEach(keys => {
        if (keys.includes('fn') || keys.includes('vol') || keys.includes('click') || sc.then) return;
        const mods = { ctrl: keys.includes('ctrl'), alt: keys.includes('opt'), shift: keys.includes('shift'), meta: keys.includes('cmd') };
        const key = keys.filter(k => !['ctrl', 'opt', 'shift', 'cmd'].includes(k))[0];
        if (!key) return;
        const id = comboId(mods, key);
        if (!INDEX.has(id)) INDEX.set(id, []);
        INDEX.get(id).push(sc);
      });
    });
  }
  function lookup(e) {
    if (!INDEX) buildIndex();
    const mods = { ctrl: e.ctrlKey, alt: e.altKey, shift: e.shiftKey, meta: e.metaKey };
    for (const k of keyNames(e)) {
      const hit = INDEX.get(comboId(mods, k));
      if (hit) return hit;
    }
    return null;
  }

  // ── Depolama (gizli pencerede bozulmasın) ───────────
  const store = {
    get(k, d) { try { const v = localStorage.getItem('kisayolcu.' + k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem('kisayolcu.' + k, JSON.stringify(v)); } catch (_) {} }
  };

  // ── Bildirim ────────────────────────────────────────
  function toast(msg, kind) {
    let wrap = document.querySelector('.toasts');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toasts'; wrap.setAttribute('role', 'status'); document.body.appendChild(wrap); }
    const t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast-' + kind : '');
    t.innerHTML = msg;
    wrap.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2200);
    setTimeout(() => t.remove(), 2700);
  }

  function isMac() {
    const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent;
    return /mac/i.test(p);
  }

  /** Mac değilse nazik bir uyarı bandı göster. */
  function macBanner() {
    if (isMac()) return;
    const b = document.createElement('div');
    b.className = 'mac-banner';
    b.innerHTML = 'Kısayolcu Mac klavyesi için. Linki Mac’ine gönder, orada dene 💻';
    document.body.prepend(b);
  }

  function wireContact() {
    document.querySelectorAll('[data-contact]').forEach(a => { a.href = CONTACT_URL; a.target = '_blank'; a.rel = 'noopener'; });
  }

  // ── Değiştirici tuş takibi (OS kısayollarını sonucundan anlamak için) ──
  // ⌘Tab’de sayfa odağı ⌘ bırakılınca kaybolur; bu yüzden "basılı mı" bilgisini de tutuyoruz.
  const MODK = { Meta: 'meta', Control: 'ctrl', Alt: 'alt', Shift: 'shift' };
  const lastMod = { meta: 0, ctrl: 0, alt: 0, shift: 0 };
  const held = { meta: false, ctrl: false, alt: false, shift: false };
  document.addEventListener('keydown', e => {
    const now = performance.now();
    if (MODK[e.key]) { lastMod[MODK[e.key]] = now; held[MODK[e.key]] = true; }
    if (e.metaKey) lastMod.meta = now;
    if (e.ctrlKey) lastMod.ctrl = now;
    if (e.altKey) lastMod.alt = now;
  }, true);
  document.addEventListener('keyup', e => { if (MODK[e.key]) held[MODK[e.key]] = false; }, true);
  window.addEventListener('focus', () => { for (const k in held) held[k] = false; });
  /** mods içindeki herhangi biri şu an basılı mı ya da son ms içinde basıldı mı? */
  function modRecent(mods, ms) { return mods.some(m => held[m] || performance.now() - lastMod[m] < ms); }

  // ── Küçük ses efekti ───────────────────────────────
  let ac;
  function beep(f, d, vol) {
    if (store.get('mute', false)) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(vol || .04, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + (d || .08));
      o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + (d || .08));
    } catch (_) {}
  }

  const reduceMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Mac değilse: linki Mac’e göndermek için paylaş / kopyala */
  async function sendToMac() {
    const url = location.href.split('#')[0];
    try {
      if (navigator.share) { await navigator.share({ title: 'Kısayolcu', text: 'Mac kısayollarını deneyerek öğren', url }); return; }
      await navigator.clipboard.writeText(url); toast('Link kopyalandı ✓', 'ok');
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', () => { wireContact(); macBanner(); });

  window.KS = { KEYS, keycap, keyGroup, renderShortcut, prettyText, esc, keyNames, parseCombo, matches, lookup, comboId, store, toast, isMac, CONTACT_URL, modRecent, beep, reduceMotion, sendToMac };
})();
