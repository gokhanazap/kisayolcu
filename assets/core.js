/* Kısayolcu — ortak yardımcılar: tuş görselleri, kombinasyon eşleme, depolama, bildirim. */
(function () {
  // İletişim linki (X profili). Değiştirmek için sadece burayı düzenle.
  const CONTACT_URL = 'https://x.com/gokhanazap0';

  // ── Dil ─────────────────────────────────────────────
  // Sayfanın <html lang> değeri belirler. Çeviriler Türkçe metin anahtarıyla aranır; {ad} gibi yer tutucular desteklenir.
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'tr';
  const EN = {
   "sonra": "then",
   "veya": "or",
   "Kısayolcu Mac klavyesi için. Linki Mac’ine gönder, orada dene 💻": "Kısayolcu needs a Mac keyboard. Send the link to your Mac and try it there 💻",
   "Mac kısayollarını deneyerek öğren": "Learn Mac shortcuts by pressing them",
   "Link kopyalandı ✓": "Link copied ✓",
   "Bekleniyor — hadi dene": "Waiting — go on, try it",
   "Algılayamadık mı? Yaptım say": "Didn’t catch it? Mark as done",
   "✓ Bunu daha önce yaptın": "✓ You’ve done this one",
   "Deneme sekmesini aç ↗": "Open the test tab ↗",
   "Görseli buraya yapıştır": "Paste the image here",
   "Ekran görüntüsünü al, sonra <span class=\"kbd-inline\">⌘V</span> ile buraya yapıştır": "Take the screenshot, then paste it here with <span class=\"kbd-inline\">⌘V</span>",
   "→ Bu linke ⌘ basılıyken tıkla": "→ Click this link while holding ⌘",
   "Güzel, devam": "Nice, keep going",
   "Bekleniyor — {n} kez": "Waiting — {n} times",
   "👀 Gittin… şimdi geri dön": "👀 You left… now come back",
   "Önce ↩ ile sekmeyi aç": "First press ↩ to open the tab",
   "Önce ↩ ile sekmeyi aç, sonra ⌘W, sonra ⇧⌘T": "First press ↩ to open the tab, then ⌘W, then ⇧⌘T",
   "Tarayıcı sekmeyi engelledi, tekrar dene": "The browser blocked the tab, try again",
   "Şimdi açılan sekmede ⌘W": "Now press ⌘W in the new tab",
   "Kapandı! Şimdi ⇧⌘T ile geri getir": "Closed! Now bring it back with ⇧⌘T",
   "Panoda görsel yok — önce ⌃⇧⌘4 ile alan seç": "No image on the clipboard — select an area with ⌃⇧⌘4 first",
   "⌘ basılı değildi! Tekrar dene": "⌘ wasn’t held! Try again",
   "Anladım ↩": "Got it ↩",
   "Yaptım ↩": "Done ↩",
   "Bunu tarayıcı göremiyor, dürüstlüğüne güveniyoruz 🤝": "The browser can’t see this one — we trust you 🤝",
   "🎉 “{ad}” tamam! {n}/{n}": "🎉 “{ad}” complete! {n}/{n}",
   "<b>{d}</b> kısayolu denedin, <b>{s}</b> tanesini zaten biliyordun. Toplam {n} alıştırma.": "You tried <b>{d}</b> shortcuts and already knew <b>{s}</b>. {n} exercises in total.",
   "Tüm ilerleme silinsin mi?": "Reset all progress?",
   "<b>Alıştırmalar Mac klavyesiyle çalışıyor.</b> Linki kendine at, Mac’te aç.": "<b>The exercises need a Mac keyboard.</b> Send yourself the link and open it on your Mac.",
   "💻 Linki Mac’ime gönder": "💻 Send link to my Mac",
   "Metnin tamamını seç": "Select all the text",
   "Kopyala": "Copy it",
   "Alttaki kutuya geç ve yapıştır": "Jump to the box below and paste",
   "Yapıştırdığını geri al": "Undo that paste",
   "Kutuya bir emoji koy": "Put an emoji in the box",
   "Kutuya @ yaz": "Type @ in the box",
   "İmleci kutunun en başına al": "Move the cursor to the very start",
   "Şimdi en sonuna": "Now to the very end",
   "“fare” yaz ve o kelimeyi tek hamlede sil": "Type “mouse” and delete that word in one move",
   "Önce kutuya “fare” yaz 🐭": "Type “mouse” in the box first 🐭",
   "Sayfada arama aç": "Open find on page",
   "Spotlight’ı aç, esc ile kapat": "Open Spotlight, close it with esc",
   "Kaydet ve bitir!": "Save and finish!",
   "Mac Sihirbazı 🧙": "Mac Wizard 🧙",
   "Klavye Ninjası 🥷": "Keyboard Ninja 🥷",
   "Kısayol Avcısı 🎯": "Shortcut Hunter 🎯",
   "Kısayol Çırağı ⌨️": "Shortcut Apprentice ⌨️",
   "Fare Bağımlısı 🐭": "Mouse Addict 🐭",
   "En iyi süren: {t} sn — {r}": "Your best: {t}s — {r}",
   "Kısayol bilen yorulmaz, fareye uzanan kaybeder.": "Those who know shortcuts never tire; reach for the mouse and you lose.",
   "sn": "s",
   "Görev {n}": "Task {n}",
   "İpucu: ": "Hint: ",
   "{n} görev · {m} fare cezası · {p} pas": "{n} tasks · {m} mouse penalties · {p} passes",
   "{r} rütbesine {s} sn kaldı. ↩ ile tekrar dene.": "{s}s away from {r}. Press ↩ to try again.",
   "Zirvedesin. Bunu geçen çıkar mı? 👀": "You’re at the top. Can anyone beat this? 👀",
   "Yeni rekor! 🔥": "New record! 🔥",
   "Fena değil!": "Not bad!",
   "Temiz iş!": "Clean run!",
   "Önceki en iyi: {t} sn": "Previous best: {t}s",
   "İlk denemen. Şimdi bir arkadaşına at.": "First run. Now send it to a friend.",
   "Bunlara bir göz at": "Worth another look",
   "(pas)": "(passed)",
   "Öğren →": "Learn →",
   "Kart kopyalandı ✓ ⌘V ile tweet’e yapıştır": "Card copied ✓ Paste it into your post with ⌘V",
   "Kopyalanamadı, “Kartı indir”i dene": "Couldn’t copy — try “Download card”",
   "🏆 Sıralamada {r}. oldum ({n} kişi içinde)": "🏆 Ranked #{r} out of {n}",
   "🐭 {m} kez fareye dokundum": "🐭 touched the mouse {m}×",
   "🐭 fareye hiç dokunmadım": "🐭 never touched the mouse",
   "⌨️ Kısayolcu Speedrun: {t} sn — {r}": "⌨️ Mac shortcut speedrun: {t}s — {r}",
   "Sen kaç saniyede bitirirsin? (yapan: @gokhanazap0)": "How fast can you do it? (by @gokhanazap0)",
   "Kopyalandı ✓ ⌘V ile yapıştır": "Copied ✓ Paste with ⌘V",
   "Kopyalanamadı": "Couldn’t copy",
   "{n} kişi · {r} koşu": "{n} players · {r} runs",
   "Henüz kimse yok. İlk sıra seni bekliyor 👀": "Nobody here yet. First place is waiting for you 👀",
   "Sıralama sunucusuna ulaşılamadı; süren bu cihazda kayıtlı.": "Couldn’t reach the leaderboard; your time is saved on this device.",
   "En az 2 karakterlik bir isim yaz.": "Enter a name with at least 2 characters.",
   "Gönderiliyor…": "Submitting…",
   "Bu isim olmaz 🙂 Başka bir tane dene.": "That name won’t work 🙂 Try another.",
   "Çok hızlısın! Biraz sonra tekrar dene.": "Too many runs! Try again a bit later.",
   "Bu koşu doğrulanamadı. Tekrar dene.": "Couldn’t verify this run. Try again.",
   "Gönderilemedi, tekrar dene.": "Couldn’t submit, try again.",
   "🏆 <b>{name}</b>, sıralaman: <b>{r}.</b> / {n} kişi": "🏆 <b>{name}</b>, you’re <b>#{r}</b> of {n}",
   "(en iyi süren: {t} sn)": "(your best: {t}s)",
   "ismi değiştir": "change name",
   "Sonraki koşuda yeni isim sorulacak.": "We’ll ask for a new name after your next run.",
   "Bağlantı hatası, tekrar dene.": "Connection error, try again.",
   "⚔️ Arkadaşın {t} sn yaptı. Geçebilir misin?": "⚔️ Your friend did it in {t}s. Can you beat that?",
   "⚔️ Arkadaşını {d} sn farkla geçtin! ": "⚔️ You beat your friend by {d}s! ",
   "⚔️ Arkadaşının {d} sn gerisinde kaldın. ": "⚔️ You were {d}s behind your friend. ",
   "Speedrun Mac klavyesiyle oynanıyor. Linki kendine at, Mac’te aç; o sırada aşağıdan sıralamaya bakabilirsin.": "The speedrun needs a Mac keyboard. Send yourself the link and open it on your Mac; meanwhile, check the leaderboard below.",
   "Pas! +10 sn": "Passed! +10s",
   "🐭 Fare yasak! +3 sn": "🐭 No mouse! +3s",
   "Bir tuş daha ekle.": "Add one more key.",
   "Bunu listemizde bulamadık 🤔": "Not on our list 🤔",
   "Belki bir uygulamaya özeldir. <a href=\"{u}\">Tüm listeye</a> göz at.": "Maybe it’s app-specific. Browse <a href=\"{u}\">the full list</a>.",
   "Bu sadece bir tuş 🙂": "That’s just a key 🙂",
   "Bir kısayol dene: ⌘ ya da ⌥ ile birlikte bas.": "Try a shortcut: hold ⌘ or ⌥ and press something.",
   "Spotlight’ı mı açtın? 😉": "Did you just open Spotlight? 😉",
   "Ya da ⌘Tab ile kaçtın. macOS bu ikisini tarayıcıdan önce yakalar — biz de sonucundan anlıyoruz. <b>Öğren</b> bölümünde hepsi var.": "Or you escaped with ⌘Tab. macOS grabs those before the browser does — we figure it out from the result. They’re all in <b>Learn</b>.",
   "“Macbook’ta emoji koymak için tarayıcıdan emojiyi aramanıza gerek yok… 1 saat bununla uğraşıyor millet.”": "“You don’t have to google an emoji to copy-paste it on a MacBook… people waste ages on this.”",
   ", bu sitenin doğduğu tweet": ", the tweet that started this site",
   "alıştırma": "exercises",
   "🏆 Şu an en hızlılar · {n} kişi yarıştı": "🏆 Fastest right now · {n} players",
   "✓ İşte böyle. Daha {n} tane var → <a href=\"{u}\">Öğrenmeye başla</a>": "✓ That’s it. {n} more to go → <a href=\"{u}\">Start learning</a>",
   "Harf harf değil, kelime kelime: ⌥ basılıyken ⌫ 😉": "Not letter by letter — whole word: hold ⌥ and press ⌫ 😉",
   "Listeye göz at": "Browse the list",
   "Alıştırmalar Mac klavyesiyle çalışıyor. Telefondaysan linki kendine at, Mac’te aç.": "The exercises need a Mac keyboard. On your phone? Send yourself the link and open it on your Mac.",
   "Harika!": "Great!",
   "İşte bu!": "That’s it!",
   "Tam isabet!": "Bullseye!",
   "Parmakların hızlı!": "Fast fingers!",
   "Ustalaşıyorsun!": "You’re getting good!",
   "Fare ağlıyor 🐭": "The mouse is crying 🐭",
   "Mükemmel!": "Perfect!"
  };
  function t(s, v) {
    let o = LANG === 'en' ? (s in EN ? EN[s] : (console.warn('[i18n] eksik:', s), s)) : s;
    if (v) for (const k in v) o = o.split('{' + k + '}').join(v[k]);
    return o;
  }
  const PATHS = LANG === 'en'
    ? { home: './', learn: 'learn', run: 'speedrun', list: 'shortcuts', helper: '../kapat.html?l=en&', site: 'https://kisayolcu.gokhanazap.com/en/' }
    : { home: './', learn: 'ogren', run: 'speedrun', list: 'kisayollar', helper: 'kapat.html?', site: 'https://kisayolcu.gokhanazap.com/' };

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
    vol: { s: '🔊', l: LANG === 'en' ? 'vol' : 'ses' },
    click: { s: '🖱', l: LANG === 'en' ? 'click' : 'tık', w: 'mod' },
    f2: { s: 'F2' }, f5: { s: 'F5' },
    power: { s: '⏻', l: LANG === 'en' ? 'power' : 'güç', w: 'mod' }
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
    if (sc.then) h += `<span class="kc-sep">${t('sonra')}</span>` + keyGroup(sc.then);
    (sc.alt || []).forEach(a => { h += `<span class="kc-sep">${sc.alt.length > 1 || isPair(sc) ? '/' : t('veya')}</span>` + keyGroup(a); });
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
    b.innerHTML = t('Kısayolcu Mac klavyesi için. Linki Mac’ine gönder, orada dene 💻');
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
      if (navigator.share) { await navigator.share({ title: 'Kısayolcu', text: t('Mac kısayollarını deneyerek öğren'), url }); return; }
      await navigator.clipboard.writeText(url); toast(t('Link kopyalandı ✓'), 'ok');
    } catch (_) {}
  }

  // Dil linkleri: seçimi çereze yaz ki sunucu bir daha ülkeye göre yönlendirmesin
  function wireLang() {
    document.querySelectorAll('[data-lang]').forEach(a => a.addEventListener('click', () => {
      document.cookie = 'lang=' + a.dataset.lang + '; path=/; max-age=31536000; samesite=lax';
    }));
  }
  document.addEventListener('DOMContentLoaded', () => { wireContact(); wireLang(); macBanner(); });

  window.KS = { LANG, t, PATHS, KEYS, keycap, keyGroup, renderShortcut, prettyText, esc, keyNames, parseCombo, matches, lookup, comboId, store, toast, isMac, CONTACT_URL, modRecent, beep, reduceMotion, sendToMac };
})();
