/* Speedrun: sabit sıralı görevler, fare cezası, paylaşılabilir sonuç. */
(function () {
  const { renderShortcut, matches, store, toast, esc, modRecent } = window.KS;
  const SC = Object.fromEntries(window.KS_SHORTCUTS.map(s => [s.id, s]));
  const $ = id => document.getElementById(id);

  // Sıra sabit: herkes aynı parkurda yarışsın
  const TASKS = [
    { t: 'Metnin tamamını seç', sc: 'selectall', focus: 'editor', check: { type: 'combo', combos: ['cmd+a'] } },
    { t: 'Kopyala', sc: 'copy', check: { type: 'combo', combos: ['cmd+c'] } },
    { t: 'Alttaki kutuya geç ve yapıştır', sc: 'paste', hintKeys: [['tab'], ['cmd', 'v']], check: { type: 'paste' } },
    { t: 'Yapıştırdığını geri al', sc: 'undo', check: { type: 'combo', combos: ['cmd+z'] } },
    { t: 'Kutuya bir emoji koy', sc: 'emoji', check: { type: 'emoji' } },
    { t: 'Kutuya @ yaz', sc: 'at', check: { type: 'char', ch: '@' } },
    { t: 'İmleci kutunun en başına al', sc: 'linestart', hintKeys: [['cmd', 'left']], check: { type: 'combo', combos: ['cmd+left', 'ctrl+a', 'cmd+up'] } },
    { t: 'Şimdi en sonuna', sc: 'linestart', hintKeys: [['cmd', 'right']], check: { type: 'combo', combos: ['cmd+right', 'ctrl+e', 'cmd+down'] } },
    { t: '“fare” yaz ve o kelimeyi tek hamlede sil', sc: 'delword', check: { type: 'combo', combos: ['alt+delete', 'cmd+delete'] } },
    { t: 'Sayfada arama aç', sc: 'find', check: { type: 'combo', combos: ['cmd+f'], prevent: true } },
    { t: 'Spotlight’ı aç, esc ile kapat', sc: 'spotlight', check: { type: 'away' } },
    { t: 'Kaydet ve bitir!', sc: 'save', check: { type: 'combo', combos: ['cmd+s'], prevent: true } }
  ];
  $('nTasks').textContent = TASKS.length;

  const RANKS = [
    [22, 'Mac Sihirbazı 🧙'],
    [35, 'Klavye Ninjası 🥷'],
    [55, 'Kısayol Avcısı 🎯'],
    [90, 'Kısayol Çırağı ⌨️'],
    [Infinity, 'Fare Bağımlısı 🐭']
  ];
  const rankOf = s => RANKS.find(r => s < r[0])[1];
  const fmtClock = ms => { const s = Math.max(0, ms) / 1000; return String(Math.floor(s / 60)).padStart(2, '0') + ':' + (s % 60).toFixed(2).padStart(5, '0'); };

  let state = 'intro', t0 = 0, penalty = 0, idx = 0, results = [], raf, hintTimer, mouseHits = 0;
  let cleanups = [];
  const lastMod = { meta: 0 };

  function show(id) { ['intro', 'count', 'game', 'result'].forEach(s => { $(s).hidden = s !== id; }); }

  function bestLine() {
    const b = store.get('best', null);
    $('bestLine').textContent = b ? `En iyi süren: ${b.toFixed(2)} sn — ${rankOf(b)}` : '';
  }
  bestLine();

  // ── Ses (küçük bip) ────────────────────────────────
  let ac;
  function beep(f, d) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(.05, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + (d || .08));
      o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + (d || .08));
    } catch (_) {}
  }

  // ── Akış ───────────────────────────────────────────
  function countdown() {
    state = 'count'; show('count');
    let n = 3;
    const el = $('countNum');
    const tick = () => {
      if (n === 0) return begin();
      el.textContent = n; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
      beep(440, .1); n--; setTimeout(tick, 700);
    };
    tick();
  }

  function begin() {
    state = 'run'; show('game');
    beep(880, .15);
    $('editor').value = 'Kısayol bilen yorulmaz, fareye uzanan kaybeder.';
    $('box').value = '';
    penalty = 0; idx = 0; results = []; mouseHits = 0;
    $('pen').textContent = '+0 sn';
    $('track').innerHTML = TASKS.map(() => '<i></i>').join('');
    t0 = performance.now();
    loop();
    startTask();
  }

  function loop() {
    $('timer').textContent = fmtClock(performance.now() - t0 + penalty * 1000);
    raf = requestAnimationFrame(loop);
  }

  function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); cleanups.push(() => t.removeEventListener(ev, fn, opt)); }

  function startTask() {
    cleanups.forEach(f => f()); cleanups = [];
    clearTimeout(hintTimer);
    const task = TASKS[idx], sc = SC[task.sc];
    $('step').textContent = `${idx + 1}/${TASKS.length}`;
    $('taskN').textContent = `Görev ${idx + 1}`;
    $('taskT').textContent = task.t;
    $('taskHint').classList.remove('on');
    const hk = task.hintKeys ? task.hintKeys.map(k => KS.keyGroup(k)).join('<span class="kc-sep">sonra</span>') : renderShortcut(sc);
    $('taskHint').innerHTML = 'İpucu: ' + hk;
    hintTimer = setTimeout(() => { $('taskHint').classList.add('on'); results[idx] = Object.assign(results[idx] || {}, { hinted: true }); }, 8000);
    [...$('track').children].forEach((el, i) => el.classList.toggle('now', i === idx));
    if (task.focus) $(task.focus).focus();

    const c = task.check, box = $('box');
    if (c.type === 'combo') {
      on(document, 'keydown', e => { if (!e.repeat && c.combos.some(cb => matches(e, cb))) { if (c.prevent) e.preventDefault(); done(); } }, true);
    } else if (c.type === 'paste') {
      on(box, 'paste', () => setTimeout(done, 0));
    } else if (c.type === 'emoji') {
      on(box, 'input', () => { if (/\p{Emoji_Presentation}|\uFE0F/u.test(box.value)) done(); });
    } else if (c.type === 'char') {
      on(box, 'input', () => { if (box.value.includes(c.ch)) done(); });
    } else if (c.type === 'away') {
      let gone = false;
      const leave = () => { if (modRecent(['meta'], 2500)) gone = true; };
      const back = () => { if (gone) done(); };
      on(window, 'blur', leave);
      on(window, 'focus', back);
      on(document, 'visibilitychange', () => (document.hidden ? leave() : back()));
    }
  }

  function done(passed) {
    if (state !== 'run') return;
    results[idx] = Object.assign(results[idx] || {}, { passed: !!passed });
    const el = $('track').children[idx];
    el.classList.remove('now'); el.classList.add(passed ? 'pass' : 'ok');
    if (!passed) { beep(1320, .07); $('taskCard').classList.remove('flash'); void $('taskCard').offsetWidth; $('taskCard').classList.add('flash'); }
    idx++;
    if (idx >= TASKS.length) return finish();
    startTask();
  }

  function addPenalty(sec, msg) {
    penalty += sec;
    const p = $('pen');
    p.textContent = `+${penalty} sn`;
    p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump');
    beep(160, .18);
    toast(msg, 'warn');
  }

  function finish() {
    state = 'result';
    cleanups.forEach(f => f()); cleanups = [];
    cancelAnimationFrame(raf); clearTimeout(hintTimer);
    const total = (performance.now() - t0) / 1000 + penalty;
    const passes = results.filter(r => r && r.passed).length;
    const prevBest = store.get('best', null);
    const record = prevBest == null || total < prevBest;
    if (record) store.set('best', +total.toFixed(2));
    show('result');

    $('rTime').textContent = total.toFixed(2);
    $('rRank').textContent = rankOf(total);
    $('rMeta').textContent = `${TASKS.length} görev · ${mouseHits} fare cezası · ${passes} pas`;
    const grid = TASKS.map((t, i) => { const r = results[i] || {}; return r.passed ? '🟥' : r.hinted ? '🟨' : '🟩'; });
    const gridTxt = grid.slice(0, 6).join('') + '\n' + grid.slice(6).join('');
    $('rGrid').textContent = gridTxt;
    const ri = RANKS.findIndex(r => total < r[0]);
    $('rNext').textContent = ri > 0 ? `${RANKS[ri - 1][1]} rütbesine ${(total - RANKS[ri - 1][0]).toFixed(1)} sn kaldı. ↩ ile tekrar dene.` : 'Zirvedesin. Bunu geçen çıkar mı? 👀';
    lastShare = { total, rank: rankOf(total), grid: gridTxt, mouse: mouseHits, passes };
    $('rRecord').hidden = !(record && prevBest != null);
    $('rHead').textContent = record && prevBest != null ? 'Yeni rekor! 🔥' : passes ? 'Fena değil!' : 'Temiz iş!';
    $('rBest').textContent = prevBest != null ? `Önceki en iyi: ${prevBest.toFixed(2)} sn` : 'İlk denemen. Şimdi bir arkadaşına at.';

    const url = 'https://kisayolcu.gokhanazap.com/speedrun.html';
    const t2 = total.toFixed(2).replace('.', ',');
    const text = `⌨️ Kısayolcu Speedrun: ${t2} sn — ${rankOf(total)}\n${gridTxt}\n${mouseHits ? '🐭 ' + mouseHits + ' kez fareye dokundum' : '🐭 fareye hiç dokunmadım'}\nSen kaç saniyede bitirirsin?`;
    $('shareX').href = 'https://x.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
    $('copy').onclick = async () => {
      try { await navigator.clipboard.writeText(text + '\n' + url); toast('Kopyalandı ✓ ⌘V ile yapıştır', 'ok'); }
      catch (_) { toast('Kopyalanamadı'); }
    };

    // Takıldıkların
    const weak = TASKS.map((t, i) => ({ t, r: results[i] || {} })).filter(x => x.r.passed || x.r.hinted);
    $('missed').innerHTML = weak.length ? '<h3>Bunlara bir göz at</h3><ul>' + weak.map(({ t, r }) => {
      const sc = SC[t.sc];
      const les = (window.KS_LESSONS.find(l => l.sc === t.sc) || {}).id || '';
      return `<li>${renderShortcut(sc)}<span>${esc(sc.ad)}${r.passed ? ' <span class="muted">(pas)</span>' : ''}</span><a href="ogren.html#${les}">Öğren →</a></li>`;
    }).join('') + '</ul>' : '';
    if (record) beep(1760, .25);
  }

  // ── Kartı PNG olarak indir ─────────────────────────
  let lastShare = null;
  function drawCard() {
    const d = lastShare; if (!d) return;
    const W = 1200, H = 630, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    g.fillStyle = '#121110'; g.fillRect(0, 0, W, H);
    const rg = g.createRadialGradient(950, 120, 0, 950, 120, 520);
    rg.addColorStop(0, 'rgba(214,255,61,.16)'); rg.addColorStop(1, 'rgba(214,255,61,0)');
    g.fillStyle = rg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#9a9385'; g.font = '600 30px "JetBrains Mono", monospace';
    g.fillText('⌨️  kısayolcu speedrun', 80, 110);
    g.fillStyle = '#f3eee4'; g.font = '800 190px "Bricolage Grotesque", sans-serif';
    const t = d.total.toFixed(2).replace('.', ',');
    g.fillText(t, 72, 320);
    const tw = g.measureText(t).width;
    g.fillStyle = '#9a9385'; g.font = '700 54px "Bricolage Grotesque", sans-serif';
    g.fillText('sn', 90 + tw, 320);
    g.fillStyle = '#d6ff3d'; g.font = '800 48px "Bricolage Grotesque", sans-serif';
    g.fillText(d.rank, 80, 400);
    g.font = '52px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    d.grid.split('\n').forEach((row, i) => g.fillText(row, 760, 250 + i * 70));
    g.fillStyle = '#9a9385'; g.font = '600 28px "Hanken Grotesk", sans-serif';
    g.fillText(`${TASKS.length} görev · ${d.mouse} fare cezası · ${d.passes} pas`, 80, 470);
    g.fillStyle = '#f3eee4'; g.font = '700 30px "JetBrains Mono", monospace';
    g.fillText('kisayolcu.gokhanazap.com', 80, 560);
    cv.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = `kisayolcu-speedrun-${t.replace(',', '-')}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  }

  function reset() { state = 'intro'; bestLine(); show('intro'); }

  // ── Global dinleyiciler ─────────────────────────────
  document.addEventListener('keydown', e => {
    // Koşu boyunca ⌘F / ⌘S hiç tarayıcıya gitmesin (bulma çubuğu odağı çalıp Spotlight görevini bozar)
    if (state === 'run' && e.metaKey && !e.altKey && /^[fs]$/.test(e.key.toLowerCase())) e.preventDefault();
    if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const onControl = e.target.closest && e.target.closest('a,button,summary');
      if (state === 'intro' && (!onControl || e.target.id === 'start')) { e.preventDefault(); countdown(); }
      else if (state === 'result' && !onControl) { e.preventDefault(); countdown(); }
    }
    if (e.key === 'Escape' && state === 'run') {
      e.preventDefault();
      addPenalty(10, 'Pas! +10 sn');
      done(true);
    }
  }, true);

  document.addEventListener('mousedown', () => {
    if (state !== 'run') return;
    mouseHits++;
    addPenalty(3, '🐭 Fare yasak! +3 sn');
  });

  $('start').addEventListener('click', () => { if (state === 'intro') countdown(); });
  $('again').addEventListener('click', countdown);
  $('download').addEventListener('click', drawCard);
})();
