/* Landing: canlı klavye, kısayol tanıma, sayaçlar, kartlar. */
(function () {
  const { keycap, renderShortcut, keyGroup, lookup, esc, prettyText, isMac, sendToMac, reduceMotion, matches, beep } = window.KS;
  const SC = window.KS_SHORTCUTS, CH = window.KS_CHAPTERS, LS = window.KS_LESSONS, CATS = window.KS_CATS;
  const byId = Object.fromEntries(SC.map(s => [s.id, s]));
  const $ = s => document.querySelector(s);

  // ── Sayaçlar ───────────────────────────────────────
  const counts = { shortcuts: SC.length, lessons: LS.length, chapters: CH.length };
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = counts[el.dataset.count];
    if (reduceMotion()) { el.textContent = target; return; }
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / 1100);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  // ── Türkçe Q klavye ────────────────────────────────
  const ROWS = [
    [['IntlBackslash', '"'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'], ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'], ['Digit0', '0'], ['Minus', '*'], ['Equal', '-'], ['Backspace', 'delete', 1.6, '⌫']],
    [['Tab', 'tab', 1.5, '⇥'], ['KeyQ', 'Q'], ['KeyW', 'W'], ['KeyE', 'E'], ['KeyR', 'R'], ['KeyT', 'T'], ['KeyY', 'Y'], ['KeyU', 'U'], ['KeyI', 'I'], ['KeyO', 'O'], ['KeyP', 'P'], ['BracketLeft', 'Ğ'], ['BracketRight', 'Ü'], ['Backslash', ',', 1.1]],
    [['CapsLock', 'caps', 1.8], ['KeyA', 'A'], ['KeyS', 'S'], ['KeyD', 'D'], ['KeyF', 'F'], ['KeyG', 'G'], ['KeyH', 'H'], ['KeyJ', 'J'], ['KeyK', 'K'], ['KeyL', 'L'], ['Semicolon', 'Ş'], ['Quote', 'İ'], ['Enter', 'return', 1.8, '↩']],
    [['ShiftLeft', 'shift', 1.3, '⇧'], ['Backquote', '<'], ['KeyZ', 'Z'], ['KeyX', 'X'], ['KeyC', 'C'], ['KeyV', 'V'], ['KeyB', 'B'], ['KeyN', 'N'], ['KeyM', 'M'], ['Comma', 'Ö'], ['Period', 'Ç'], ['Slash', '.'], ['ShiftRight', 'shift', 2.3, '⇧']],
    [['Fn', 'fn', 1, '🌐'], ['ControlLeft', 'control', 1.1, '⌃'], ['AltLeft', 'option', 1.1, '⌥'], ['MetaLeft', 'command', 1.4, '⌘'], ['Space', 'space', 5.2], ['MetaRight', 'command', 1.4, '⌘'], ['AltRight', 'option', 1.1, '⌥'], ['ArrowLeft', '', 1, '←'], ['ArrowUp', '', 1, '↑'], ['ArrowDown', '', 1, '↓'], ['ArrowRight', '', 1, '→']]
  ];
  const kb = $('#kb');
  kb.innerHTML = ROWS.map(row => '<div class="kb-row">' + row.map(([code, label, w, sym]) => {
    const style = w ? ` style="--w:${w}"` : '';
    if (sym) return `<kbd class="kc" data-code="${code}"${style}><span class="kc-s">${sym}</span>${label && label.length > 1 ? `<span class="kc-l">${label}</span>` : ''}</kbd>`;
    if (label.length > 1) return `<kbd class="kc" data-code="${code}"${style}><span class="kc-l">${label}</span></kbd>`;
    return `<kbd class="kc" data-code="${code}"${style}><span class="kc-s">${esc(label)}</span></kbd>`;
  }).join('') + '</div>').join('');
  const keyEl = code => kb.querySelector(`[data-code="${code}"]`);

  // ── Okuma kutusu ────────────────────────────────────
  const ro = $('#readout'), roKeys = $('#roKeys'), roName = $('#roName'), roDesc = $('#roDesc');
  const catName = id => (CATS.find(c => c.id === id) || {}).ad || '';
  function show(keysHtml, name, desc) {
    roKeys.innerHTML = keysHtml;
    roName.textContent = name;
    roDesc.innerHTML = desc || '';
    ro.classList.remove('pop'); void ro.offsetWidth; ro.classList.add('pop');
  }
  function showShortcut(list, pressedKeys) {
    const sc = list[0];
    let desc = esc(sc.d);
    const others = list.slice(1).filter(o => o.ad !== sc.ad);
    if (others.length) desc += `<br><span class="muted">${esc(catName(others[0].cat))}’da: ${esc(others[0].ad)}</span>`;
    show(keyGroup(pressedKeys || sc.keys), sc.ad, desc);
  }

  // ── Demo döngüsü (kullanıcı basana kadar) ────────────
  const DEMO = ['emoji', 'spotlight', 'at', 'ssclip', 'reopentab', 'delword', 'tileleft', 'hidden'];
  let demoOn = true, demoI = 0, demoTimer;
  const CODE_OF = { cmd: 'MetaLeft', opt: 'AltLeft', ctrl: 'ControlLeft', shift: 'ShiftLeft', fn: 'Fn', space: 'Space', delete: 'Backspace', left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', tab: 'Tab', return: 'Enter', '.': 'Slash' };
  const codeFor = k => CODE_OF[k] || (/^[a-z]$/.test(k) ? 'Key' + k.toUpperCase() : /^\d$/.test(k) ? 'Digit' + k : null);
  function demoStep() {
    if (!demoOn) return;
    const sc = byId[DEMO[demoI++ % DEMO.length]];
    showShortcut([sc]);
    const els = sc.keys.map(codeFor).filter(Boolean).map(keyEl).filter(Boolean);
    els.forEach((el, i) => setTimeout(() => demoOn && el.classList.add('down'), i * 140));
    setTimeout(() => els.forEach(el => el.classList.remove('down')), 1500);
    demoTimer = setTimeout(demoStep, 2600);
  }
  demoStep();
  function stopDemo() {
    if (!demoOn) return;
    demoOn = false; clearTimeout(demoTimer);
    ro.setAttribute('aria-live', 'polite');
    kb.querySelectorAll('.down').forEach(el => el.classList.remove('down'));
  }

  // ── Gerçek tuşlar ──────────────────────────────────
  const PREVENT = new Set(['s', 'p', 'o', 'd', 'f', 'g', 'y', 'b', 'i', 'u', 'k', 'j', 'e', 'h']);
  const MOD_CODES = ['MetaLeft', 'MetaRight', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight'];
  const MOD_KEY = { Meta: 'cmd', Alt: 'opt', Control: 'ctrl', Shift: 'shift' };
  let lastMetaDown = 0, lastNonMod = 0;

  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      if (!e.target.closest('a,button,summary')) location.href = 'ogren.html';
      return;
    }
    stopDemo();
    const el = keyEl(e.code); if (el) el.classList.add('down');

    if (MOD_KEY[e.key]) {
      if (e.key === 'Meta') lastMetaDown = performance.now();
      const mods = [e.ctrlKey && 'ctrl', e.altKey && 'opt', e.shiftKey && 'shift', e.metaKey && 'cmd'].filter(Boolean);
      show(keyGroup(mods), '…', 'Bir tuş daha ekle.');
      return;
    }
    lastNonMod = performance.now();
    const hit = lookup(e);
    const names = [...KS.keyNames(e)];
    const keyName = names.find(n => n.length > 1 || /[a-z0-9]/.test(n)) || names[0] || e.key;
    const mods = [e.ctrlKey && 'ctrl', e.altKey && 'opt', e.shiftKey && 'shift', e.metaKey && 'cmd'].filter(Boolean);
    const pressed = mods.concat([keyName]);
    if (hit) {
      if ((e.metaKey || e.ctrlKey) && names.some(n => PREVENT.has(n))) e.preventDefault();
      showShortcut(hit, pressed);
    } else if (mods.length && !(mods.length === 1 && mods[0] === 'shift')) {
      show(keyGroup(pressed), 'Bunu listemizde bulamadık 🤔', 'Belki bir uygulamaya özeldir. <a href="kisayollar.html">Tüm listeye</a> göz at.');
    } else {
      show(keyGroup(pressed), 'Bu sadece bir tuş 🙂', 'Bir kısayol dene: ⌘ ya da ⌥ ile birlikte bas.');
    }
  });

  document.addEventListener('keyup', e => {
    const el = keyEl(e.code); if (el) el.classList.remove('down');
    // ⌘ basılıyken macOS diğer tuşların keyup’ını yutar: ⌘ bırakılınca hepsini temizle
    if (e.key === 'Meta') kb.querySelectorAll('.down').forEach(k => k.classList.remove('down'));
  });

  window.addEventListener('blur', () => {
    kb.querySelectorAll('.down').forEach(k => k.classList.remove('down'));
    const now = performance.now();
    if (now - lastMetaDown < 900 && lastNonMod < lastMetaDown) {
      stopDemo();
      show(keyGroup(['cmd', 'space']), 'Spotlight’ı mı açtın? 😉', 'Ya da ⌘Tab ile kaçtın. macOS bu ikisini tarayıcıdan önce yakalar — biz de sonucundan anlıyoruz. <b>Öğren</b> bölümünde hepsi var.');
    }
  });

  // ── Ticker ─────────────────────────────────────────
  const tickIds = ['copy', 'emoji', 'spotlight', 'cmdtab', 'at', 'ssclip', 'quicklook', 'reopentab', 'delword', 'tileleft', 'lock', 'hidden', 'forcequit', 'move'];
  const sym = k => (window.KS.KEYS[k] && window.KS.KEYS[k].s) || k.toUpperCase();
  const tickHtml = tickIds.map(id => byId[id]).map(s => `<span><b>${s.keys.map(sym).join('')}</b>${esc(s.ad)}</span>`).join('');
  $('#ticker').innerHTML = tickHtml + tickHtml;

  // ── Gizli cevherler ────────────────────────────────
  const GEMS = [
    { id: 'emoji', feature: true, quote: '“Macbook’ta emoji koymak için tarayıcıdan emojiyi aramanıza gerek yok… 1 saat bununla uğraşıyor millet.”', cite: '— <a href="https://x.com/gokhanazap0" target="_blank" rel="noopener">@gokhanazap0</a>, bu sitenin doğduğu tweet' },
    { id: 'at' }, { id: 'ssclip' }, { id: 'quicklook' }, { id: 'hidden' }, { id: 'tileleft' }, { id: 'reopentab' }, { id: 'delword' }, { id: 'move' }, { id: 'spotlight' }, { id: 'lock' }
  ];
  $('#gems').innerHTML = GEMS.map(g => {
    const s = byId[g.id];
    return `<article class="gem card${g.feature ? ' feature' : ''}">
      <div>${renderShortcut(s)}</div>
      <h3>${esc(s.ad)}</h3>
      ${g.quote ? `<blockquote>${esc(g.quote)}<cite>${g.cite}</cite></blockquote>` : ''}
      <p>${esc(s.d)}${s.tr ? ' <b>' + esc(s.tr) + '</b>' : ''}</p>
    </article>`;
  }).join('');

  // ── Bölümler ───────────────────────────────────────
  $('#chapters').innerHTML = CH.map((c, i) => {
    const n = LS.filter(l => l.ch === c.id).length;
    return `<a class="chap card" href="ogren.html#${c.id}"><span class="chap-n">${i + 1}</span><div><h3>${esc(c.ad)}</h3><p>${esc(c.alt)} · ${n} alıştırma</p></div></a>`;
  }).join('');

  // ── LCD sayaç (görünür olunca) ─────────────────────
  const lcd = $('#lcd');
  let lcdT0 = null;
  const fmt = ms => { const s = ms / 1000; const m = Math.floor(s / 60); return String(m).padStart(2, '0') + ':' + (s % 60).toFixed(2).padStart(5, '0'); };
  function lcdLoop(now) {
    if (lcdT0 == null) lcdT0 = now;
    const el = (now - lcdT0) % 24000;
    lcd.textContent = fmt(Math.min(el, 18420));
    requestAnimationFrame(lcdLoop);
  }
  if (reduceMotion()) lcd.textContent = '00:18.42';
  else new IntersectionObserver((ents, obs) => { if (ents[0].isIntersecting) { requestAnimationFrame(lcdLoop); obs.disconnect(); } }).observe(lcd);

  // ── Canlı mini demo: ⌥⌫ ───────────────────────────
  const demo = $('#demo'), din = $('#demoInput'), dst = $('#demoStatus');
  din.addEventListener('focus', () => requestAnimationFrame(() => din.setSelectionRange(din.value.length, din.value.length)));
  din.addEventListener('keydown', e => {
    if (demo.classList.contains('ok')) return;
    if (matches(e, 'alt+delete')) {
      setTimeout(() => {
        demo.classList.add('ok'); beep(1320, .07);
        dst.innerHTML = '✓ İşte böyle. Daha ' + (LS.length - 1) + ' tane var → <a href="ogren.html">Öğrenmeye başla</a>';
      }, 0);
    } else if (e.key === 'Backspace' && !e.altKey && !e.metaKey) {
      dst.textContent = 'Harf harf değil, kelime kelime: ⌥ basılıyken ⌫ 😉';
    }
  });

  // ── Mac değilse: linki Mac’e gönder ────────────────
  if (!isMac()) {
    $('#heroCta').innerHTML = '<button class="btn btn-primary" type="button" id="toMac">💻 Linki Mac’ime gönder</button><a class="btn" href="kisayollar.html">Listeye göz at</a><p class="note">Alıştırmalar Mac klavyesiyle çalışıyor. Telefondaysan linki kendine at, Mac’te aç.</p>';
    $('#toMac').addEventListener('click', sendToMac);
  }
})();
