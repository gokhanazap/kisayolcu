/* Öğren: adım adım alıştırma motoru. */
(function () {
  const { renderShortcut, keyGroup, prettyText, esc, matches, keyNames, store, toast, modRecent, beep, reduceMotion } = window.KS;
  const { t, PATHS } = window.KS;
  const SC = Object.fromEntries(window.KS_SHORTCUTS.map(s => [s.id, s]));
  const CH = window.KS_CHAPTERS;
  // Bölüm sırasına göre dersler
  const LESSONS = CH.flatMap(c => window.KS_LESSONS.filter(l => l.ch === c.id));
  const $ = s => document.getElementById(s);

  const prog = store.get('progress', { done: {}, skip: {} });
  let cur = Math.min(store.get('cur', 0), LESSONS.length - 1);
  let solved = false;
  let cleanups = [];
  let lessonT0 = 0;
  const openCh = new Set();
  const save = () => { store.set('progress', prog); store.set('cur', cur); };

  // Hash ile bölüme atla (#emoji gibi)
  function fromHash() {
    if (!location.hash) return -1;
    const h = decodeURIComponent(location.hash.slice(1));
    const k = LESSONS.findIndex(l => l.id === h);
    const i = LESSONS.findIndex(l => l.ch === h && !prog.done[l.id]);
    const j = k >= 0 ? k : i >= 0 ? i : LESSONS.findIndex(l => l.ch === h);
    history.replaceState(null, '', location.pathname);
    return j;
  }
  { const j = fromHash(); if (j >= 0) cur = j; }
  window.addEventListener('hashchange', () => { const j = fromHash(); if (j >= 0) go(j); });

  // Değiştirici tuş takibi core.js’te (KS.modRecent). Burada sadece canlı tuş çubuğu.
  const MODK = { Meta: 'meta', Control: 'ctrl', Alt: 'alt', Shift: 'shift' };
  document.addEventListener('keydown', e => live(e), true);

  // ── Canlı tuş çubuğu ───────────────────────────────
  let liveTimer;
  function live(e) {
    const mods = [e.ctrlKey && 'ctrl', e.altKey && 'opt', e.shiftKey && 'shift', e.metaKey && 'cmd'].filter(Boolean);
    let keys = mods;
    if (!MODK[e.key]) {
      const n = [...keyNames(e)];
      let k = n.find(x => x.length > 1) || n.find(x => /[a-z0-9]/.test(x)) || n[0] || e.key;
      if (k === 'fwddelete') { keys = ['fn'].concat(mods); k = 'delete'; }
      keys = keys.concat([k]);
    }
    $('live').innerHTML = keyGroup(keys);
    clearTimeout(liveTimer);
    liveTimer = setTimeout(() => { $('live').innerHTML = '<span class="muted">—</span>'; }, 1600);
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); cleanups.push(() => t.removeEventListener(ev, fn, opt)); }
  function later(fn, ms) { const id = setTimeout(fn, ms); cleanups.push(() => clearTimeout(id)); }
  function every(fn, ms) { const id = setInterval(fn, ms); cleanups.push(() => clearInterval(id)); }

  // ── Sidebar ────────────────────────────────────────
  function renderSide() {
    const html = CH.map(c => {
      const ls = LESSONS.map((l, i) => ({ l, i })).filter(x => x.l.ch === c.id);
      const done = ls.filter(x => prog.done[x.l.id]).length;
      const open = c.id === LESSONS[cur].ch || openCh.has(c.id);
      return `<div class="side-ch${open ? ' open' : ''}"><h4><button type="button" class="ch-toggle" data-ch="${c.id}" aria-expanded="${open}"><span>${esc(c.ad)}</span><span>${done}/${ls.length}</span></button></h4><ol>` +
        ls.map(({ l, i }) => {
          const st = prog.done[l.id] ? 'done' : prog.skip[l.id] ? 'skip' : '';
          const mark = st === 'done' ? '✓' : st === 'skip' ? '↷' : '';
          return `<li><button type="button" data-i="${i}" class="${st}${i === cur ? ' cur' : ''}"><span class="dot">${mark}</span>${esc(SC[l.sc].ad)}</button></li>`;
        }).join('') + '</ol></div>';
    }).join('');
    $('sideList').innerHTML = html;
    const n = LESSONS.filter(l => prog.done[l.id]).length;
    $('pDone').textContent = n;
    $('pTotal').textContent = LESSONS.length;
    $('pBar').style.width = (n / LESSONS.length * 100) + '%';
    const curBtn = $('sideList').querySelector('.cur');
    if (curBtn && window.innerWidth > 900) curBtn.scrollIntoView({ block: 'nearest' });
  }
  $('sideList').addEventListener('click', e => {
    const t = e.target.closest('.ch-toggle');
    if (t) { const id = t.dataset.ch; openCh.has(id) ? openCh.delete(id) : openCh.add(id); renderSide(); return; }
    const b = e.target.closest('button[data-i]');
    if (b) { go(+b.dataset.i); $('side').classList.remove('open'); $('sideToggle').setAttribute('aria-expanded', 'false'); }
  });
  $('sideToggle').addEventListener('click', () => {
    const o = $('side').classList.toggle('open');
    $('sideToggle').setAttribute('aria-expanded', String(o));
  });

  // ── Durum satırı ───────────────────────────────────
  function setStatus(html) { $('status').innerHTML = html; }
  function waiting(msg) { setStatus(`<span class="wait">${msg || t('Bekleniyor — hadi dene')}</span>`); }
  function addFallback(ms) {
    later(() => {
      if (solved) return;
      const b = document.createElement('button');
      b.className = 'fallback'; b.type = 'button';
      b.textContent = t('Algılayamadık mı? Yaptım say');
      b.onclick = () => success(true);
      $('status').appendChild(b);
    }, ms);
  }

  // ── Ders çiz ───────────────────────────────────────
  function render() {
    cleanups.forEach(f => f()); cleanups = [];
    solved = false; lessonT0 = performance.now();
    const l = LESSONS[cur], sc = SC[l.sc], ch = CH.find(c => c.id === l.ch);
    $('finish').hidden = true; $('stage').hidden = false;
    $('stage').classList.remove('solved');
    $('chapName').textContent = ch.ad;
    $('lessonCount').textContent = `${cur + 1} / ${LESSONS.length}`;
    renderDots();
    $('bigKeys').innerHTML = renderShortcut(sc);
    $('title').textContent = sc.ad;
    $('desc').textContent = sc.d;
    let pad = document.getElementById('padNote');
    if (!pad) { pad = document.createElement('p'); pad.id = 'padNote'; pad.className = 'pad-note'; $('bigKeys').after(pad); }
    pad.hidden = !sc.pad;
    pad.innerHTML = sc.pad ? '<span class="pad-ic">🖐</span> <b>' + t('Trackpad’le:') + '</b> ' + esc(sc.pad) : '';
    $('trNote').hidden = !sc.tr;
    $('trNote').textContent = sc.tr ? (window.KS.LANG === 'en' ? '⌨️ ' : '🇹🇷 ') + sc.tr : '';
    $('task').innerHTML = prettyText(l.gorev);
    $('next').hidden = true;
    $('skip').hidden = false;
    $('prev').disabled = cur === 0;
    renderSide();
    save();
    const field = buildPractice(l);
    startCheck(l, field);
    if (prog.done[l.id]) $('status').insertAdjacentHTML('afterbegin', '<span class="pill pill-ok">' + t('✓ Bunu daha önce yaptın') + '</span>');
  }

  function renderDots() {
    const l = LESSONS[cur];
    const ls = LESSONS.map((x, i) => ({ x, i })).filter(o => o.x.ch === l.ch);
    $('chDots').innerHTML = ls.map(({ x, i }) => `<i class="${prog.done[x.id] ? 'd' : prog.skip[x.id] ? 's' : ''}${i === cur ? ' c' : ''}"></i>`).join('');
  }

  function buildPractice(l) {
    const p = l.practice || { kind: 'none' };
    const box = $('practice');
    box.innerHTML = '';
    let field = null;
    if (p.kind === 'input' || p.kind === 'textarea') {
      field = document.createElement(p.kind);
      if (p.kind === 'input') field.type = 'text';
      field.value = p.value || '';
      field.placeholder = p.placeholder || '';
      field.spellcheck = false;
      field.autocomplete = 'off';
      field.setAttribute('autocapitalize', 'off');
      box.appendChild(field);
      const L = field.value.length;
      requestAnimationFrame(() => {
        field.focus({ preventScroll: true });
        if (p.select === 'all') field.select();
        else if (p.select === 'start') field.setSelectionRange(0, 0);
        else if (p.select === 'middle') { const m = field.value.indexOf(' ', Math.floor(L / 2)); field.setSelectionRange(m, m); }
        else if (Array.isArray(p.select)) field.setSelectionRange(p.select[0], p.select[1]);
        else field.setSelectionRange(L, L);
      });
    } else if (p.kind === 'tab') {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn btn-sm'; b.id = 'openTab';
      b.textContent = t('Deneme sekmesini aç ↗');
      box.appendChild(b);
      requestAnimationFrame(() => b.focus({ preventScroll: true }));
    } else if (p.kind === 'paste') {
      field = document.createElement('div');
      field.className = 'paste-box'; field.tabIndex = 0;
      field.contentEditable = 'true';
      field.setAttribute('aria-label', t('Görseli buraya yapıştır'));
      field.addEventListener('beforeinput', e => e.preventDefault());
      field.innerHTML = '<span>' + t('Ekran görüntüsünü al, sonra <span class="kbd-inline">⌘V</span> ile buraya yapıştır') + '</span>';
      box.appendChild(field);
      requestAnimationFrame(() => field.focus({ preventScroll: true }));
      window.addEventListener('focus', () => { if (document.body.contains(field)) field.focus({ preventScroll: true }); }, { once: true });
    } else if (p.kind === 'link') {
      const a = document.createElement('a');
      a.href = PATHS.helper + 'm=link'; a.target = '_blank'; a.className = 'trylink'; a.id = 'tryLink';
      a.textContent = t('→ Bu linke ⌘ basılıyken tıkla');
      box.appendChild(a);
    }
    if (!field) requestAnimationFrame(() => { if (document.activeElement === document.body || !document.activeElement) $('stage').focus?.(); });
    return field;
  }

  // ── Kontrol motoru ─────────────────────────────────
  function startCheck(l, field) {
    const c = l.check;
    const need = c.times || 1;
    let count = 0;
    const hit = () => {
      if (solved) return;
      count++;
      if (count >= need) success();
      else setStatus(`<span class="count">${count}/${need}</span><span class="wait">${t('Güzel, devam')}</span>`);
    };

    switch (c.type) {
      case 'combo':
        waiting(need > 1 ? t('Bekleniyor — {n} kez', { n: need }) : null);
        on(document, 'keydown', e => {
          if (!c.combos.some(cb => matches(e, cb))) return;
          if (c.prevent) e.preventDefault();   // çözüldükten sonra da ⌘S/⌘F tarayıcıya gitmesin
          if (solved || e.repeat) return;
          hit();
        }, true);
        break;

      case 'emoji':
        waiting();
        on(field, 'input', () => { if (/\p{Emoji_Presentation}|\uFE0F/u.test(field.value)) success(); });
        addFallback(15000);
        break;

      case 'char':
        waiting();
        on(field, 'input', () => { if (c.chars.some(ch => field.value.includes(ch))) success(); });
        addFallback(15000);
        break;

      case 'away': {
        waiting();
        let gone = false;
        const leave = () => {
          if (solved || gone) return;
          if (modRecent(c.mods || ['meta'], 2500)) { gone = true; setStatus('<span class="away">' + t('👀 Gittin… şimdi geri dön') + '</span>'); }
        };
        const back = () => { if (gone && !solved) success(); };
        on(window, 'blur', leave);
        on(document, 'visibilitychange', () => (document.hidden ? leave() : back()));
        on(window, 'focus', back);
        addFallback(9000);
        break;
      }

      case 'resize': {
        waiting();
        const w0 = innerWidth, h0 = innerHeight;
        on(window, 'resize', () => {
          if (solved) return;
          if ((Math.abs(innerWidth - w0) > 20 || Math.abs(innerHeight - h0) > 20) && modRecent(c.mods || ['meta'], 4000)) hit();
        });
        if (c.combos) on(document, 'keydown', e => { if (c.combos.some(cb => matches(e, cb))) later(() => hit(), 900); }, true);
        addFallback(9000);
        break;
      }

      case 'tabClose':
      case 'tabReopen': {
        waiting(c.type === 'tabClose' ? t('Önce ↩ ile sekmeyi aç') : t('Önce ↩ ile sekmeyi aç, sonra ⌘W, sonra ⇧⌘T'));
        let w = null, closed = false;
        const bc = channel();
        $('openTab').addEventListener('click', () => {
          w = window.open(PATHS.helper + 'm=' + (c.type === 'tabClose' ? 'close' : 'reopen'), '_blank');
          if (!w) { toast(t('Tarayıcı sekmeyi engelledi, tekrar dene')); return; }
          waiting(t('Şimdi açılan sekmede ⌘W'));
        });
        every(() => {
          if (solved || !w || closed) return;
          if (w.closed) {
            closed = true;
            if (c.type === 'tabClose') success();
            else waiting(t('Kapandı! Şimdi ⇧⌘T ile geri getir'));
          }
        }, 300);
        if (bc) {
          const fn = ev => {
            if (c.type !== 'tabReopen' || solved) return;
            if (ev.data === 'open' && closed) success();
          };
          bc.addEventListener('message', fn);
          cleanups.push(() => { bc.removeEventListener('message', fn); bc.close(); });
        }
        addFallback(15000);
        break;
      }

      case 'reload': {
        waiting();
        try { sessionStorage.setItem('ks-reload', l.id); } catch (_) {}
        cleanups.push(() => { try { sessionStorage.removeItem('ks-reload'); } catch (_) {} });
        // Eski usul: önceki yüklemeden kalan işaret
        if (reloadedInto === l.id) { reloadedInto = null; later(() => success(), 250); }
        // ⌘R’yi engellemiyoruz; sayfa yenilenince yeni yüklemede tamamlanır
        break;
      }

      case 'imagePaste':
        waiting();
        on(document, 'paste', e => {
          const items = [...(e.clipboardData?.items || [])];
          const img = items.find(it => it.type.startsWith('image/'));
          if (!img) { toast(t('Panoda görsel yok — önce ⌃⇧⌘4 ile alan seç')); return; }
          e.preventDefault();
          const f = img.getAsFile();
          if (f && field) { const u = URL.createObjectURL(f); field.innerHTML = `<img alt="" src="${u}">`; cleanups.push(() => URL.revokeObjectURL(u)); }
          success();
        });
        addFallback(20000);
        break;

      case 'metaClick':
        waiting();
        on($('tryLink'), 'click', e => {
          if (e.metaKey || e.ctrlKey) { success(); }
          else { e.preventDefault(); toast(t('⌘ basılı değildi! Tekrar dene'), 'warn'); }
        });
        break;

      case 'manual':
      case 'info': {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'btn btn-sm btn-dark';
        b.innerHTML = (c.type === 'info' ? t('Anladım') : t('Yaptım')) + ' <span class="kbd-hint">space</span>';
        requestAnimationFrame(() => b.focus({ preventScroll: true }));
        b.onclick = () => success(true);
        setStatus(c.type === 'manual' ? '<span class="muted">' + t('Bunu tarayıcı göremiyor, dürüstlüğüne güveniyoruz 🤝') + '</span>' : '');
        $('status').prepend(b);
        break;
      }
    }
  }

  function channel() { try { return new BroadcastChannel('kisayolcu'); } catch (_) { return null; } }

  const PRAISE = ['Harika!', 'İşte bu!', 'Tam isabet!', 'Parmakların hızlı!', 'Ustalaşıyorsun!', 'Fare ağlıyor 🐭', 'Mükemmel!'].map(x => t(x));
  function success(manual) {
    if (solved) return;
    solved = true;
    const l = LESSONS[cur];
    prog.done[l.id] = 1; delete prog.skip[l.id];
    save();
    $('stage').classList.add('solved');
    beep(1320, .06); setTimeout(() => beep(1760, .08), 70);
    renderDots();
    const chLs = LESSONS.filter(x => x.ch === l.ch);
    if (chLs.every(x => prog.done[x.id])) {
      const ch = CH.find(c => c.id === l.ch);
      toast(t('🎉 “{ad}” tamam! {n}/{n}', { ad: esc(ch.ad), n: chLs.length }), 'ok');
    }
    const msg = manual ? '✓' : '✓ ' + PRAISE[Math.floor(Math.random() * PRAISE.length)];
    setStatus(`<span class="ok">${msg}</span>`);
    // Otomatik geçiş: doğru yapınca kısa bir kutlamadan sonra sıradaki derse geç
    later(() => { if (solved) go(nextIndex()); }, manual ? 120 : 320);
    $('skip').hidden = true;
    $('next').hidden = false;
    renderSide();
    // Alanlar Enter’ı yutmasın diye odağı Devam’a ver (metin işlerinde kullanıcı izlesin diye biraz bekle)
    setTimeout(() => { if (solved) $('next').focus({ preventScroll: true }); }, 350);
  }

  function go(i) {
    if (i >= LESSONS.length) return finish();
    cur = Math.max(0, i);
    render();
    if (window.innerWidth <= 900) $('stage').scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  }
  function nextIndex() {
    for (let i = cur + 1; i < LESSONS.length; i++) if (!prog.done[LESSONS[i].id]) return i;
    for (let i = 0; i < LESSONS.length; i++) if (!prog.done[LESSONS[i].id] && !prog.skip[LESSONS[i].id] && i !== cur) return i;
    return cur + 1 < LESSONS.length ? cur + 1 : LESSONS.length;
  }

  function finish() {
    cleanups.forEach(f => f()); cleanups = [];
    solved = false;
    $('stage').hidden = true; $('finish').hidden = false;
    const d = LESSONS.filter(l => prog.done[l.id]).length, s = LESSONS.filter(l => prog.skip[l.id] && !prog.done[l.id]).length;
    $('finishStats').innerHTML = t('<b>{d}</b> kısayolu denedin, <b>{s}</b> tanesini zaten biliyordun. Toplam {n} alıştırma.', { d, s, n: LESSONS.length });
    renderSide();
  }

  $('next').addEventListener('click', () => go(nextIndex()));
  $('skip').addEventListener('click', () => {
    const l = LESSONS[cur];
    if (!prog.done[l.id]) prog.skip[l.id] = 1;
    save();
    go(cur + 1);
  });
  $('prev').addEventListener('click', () => go(cur - 1));
  function resetAll() {
    if (!confirm(t('Tüm ilerleme silinsin mi?'))) return;
    prog.done = {}; prog.skip = {}; cur = 0; save(); render();
  }
  $('reset').addEventListener('click', resetAll);
  $('reset2').addEventListener('click', resetAll);

  // Esc = geç, Enter = devam
  document.addEventListener('keydown', e => {
    if ($('stage').hidden || e.metaKey || e.altKey || e.ctrlKey) return;
    // Space: doğrulanamayan derste "Yaptım", diğerlerinde "geç" (yazı alanı ya da buton odaktaysa dokunma)
    if (e.key === ' ' && !solved && !e.shiftKey && !e.repeat && !e.target.closest('input,textarea,[contenteditable],a,button,summary,select')) {
      e.preventDefault();
      if (performance.now() - lessonT0 < 300) return;
      const ty = LESSONS[cur].check.type;
      if (ty === 'manual' || ty === 'info') success(true); else $('skip').click();
      return;
    }
    if (e.key === 'Escape' && !solved) { e.preventDefault(); if (performance.now() - lessonT0 > 300) $('skip').click(); return; }
    if (e.key === 'Enter' && solved && !e.shiftKey) {
      // Linkler, butonlar ve deneme alanı dışındaki form öğeleri Enter’ı kendisi kullansın
      if (e.target.closest('a,button,summary,select') || (e.target.closest('input,textarea') && !e.target.closest('.practice'))) return;
      e.preventDefault(); $('next').click();
    }
  });

  // ⌘R dersi: yenilemeden döndüysek tamamla
  let reloadedInto = null;
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    const flag = sessionStorage.getItem('ks-reload');
    if (flag && nav && nav.type === 'reload') reloadedInto = flag;
    sessionStorage.removeItem('ks-reload');
  } catch (_) {}

  if (!window.KS.isMac()) {
    const n = document.createElement('div');
    n.className = 'nomac card';
    n.innerHTML = t('<b>Alıştırmalar Mac klavyesiyle çalışıyor.</b> Linki kendine at, Mac’te aç.') + ' <button class="btn btn-primary btn-sm" type="button">' + t('💻 Linki Mac’ime gönder') + '</button>';
    n.querySelector('button').addEventListener('click', window.KS.sendToMac);
    $('stage').before(n);
  }
  $('stage').tabIndex = -1;
  render();
})();
