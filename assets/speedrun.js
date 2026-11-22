/* Speedrun: sabit sıralı görevler, fare cezası, paylaşılabilir sonuç. */
(function () {
  const { renderShortcut, matches, store, toast, esc, modRecent } = window.KS;
  const { t, PATHS, LANG } = window.KS;
  const num = (x, d) => LANG === 'en' ? x.toFixed(d) : x.toFixed(d).replace('.', ',');
  const SC = Object.fromEntries(window.KS_SHORTCUTS.map(s => [s.id, s]));
  const $ = id => document.getElementById(id);

  // Sıra sabit: herkes aynı parkurda yarışsın
  const TASKS = [
    { t: t('Metnin tamamını seç'), sc: 'selectall', focus: 'editor', check: { type: 'combo', combos: ['cmd+a'] } },
    { t: t('Kopyala'), sc: 'copy', check: { type: 'combo', combos: ['cmd+c'] } },
    { t: t('Alttaki kutuya geç ve yapıştır'), sc: 'paste', hintKeys: [['tab'], ['cmd', 'v']], check: { type: 'paste' } },
    { t: t('Yapıştırdığını geri al'), sc: 'undo', check: { type: 'combo', combos: ['cmd+z'] } },
    { t: t('Kutuya bir emoji koy'), sc: 'emoji', check: { type: 'emoji' } },
    { t: t('Kutuya @ yaz'), sc: 'at', check: { type: 'char', ch: '@' } },
    { t: t('İmleci kutunun en başına al'), sc: 'linestart', hintKeys: [['cmd', 'left']], check: { type: 'combo', combos: ['cmd+left', 'ctrl+a', 'cmd+up'] } },
    { t: t('Şimdi en sonuna'), sc: 'linestart', hintKeys: [['cmd', 'right']], check: { type: 'combo', combos: ['cmd+right', 'ctrl+e', 'cmd+down'] } },
    { t: t('“fare” yaz ve o kelimeyi tek hamlede sil'), sc: 'delword', check: { type: 'combo', combos: ['alt+delete', 'cmd+delete'], need: LANG === 'en' ? /mouse\s*$/i : /fare\s*$/i, needMsg: t('Önce kutuya “fare” yaz 🐭') } },
    { t: t('Sayfada arama aç'), sc: 'find', check: { type: 'combo', combos: ['cmd+f'], prevent: true } },
    { t: t('Spotlight’ı aç, esc ile kapat'), sc: 'spotlight', check: { type: 'away' } },
    { t: t('Kaydet ve bitir!'), sc: 'save', check: { type: 'combo', combos: ['cmd+s'], prevent: true } }
  ];
  $('nTasks').textContent = TASKS.length;

  const RANKS = [
    [22, t('Mac Sihirbazı 🧙')],
    [35, t('Klavye Ninjası 🥷')],
    [55, t('Kısayol Avcısı 🎯')],
    [90, t('Kısayol Çırağı ⌨️')],
    [Infinity, t('Fare Bağımlısı 🐭')]
  ];
  const rankOf = s => RANKS.find(r => s < r[0])[1];
  const fmtClock = ms => { const s = Math.max(0, ms) / 1000; return String(Math.floor(s / 60)).padStart(2, '0') + ':' + (s % 60).toFixed(2).padStart(5, '0'); };

  let state = 'intro', t0 = 0, penalty = 0, idx = 0, results = [], raf, hintTimer, mouseHits = 0;
  let cleanups = [];
  let taskT0 = 0;
  const lastMod = { meta: 0 };

  function show(id) {
    ['intro', 'count', 'game', 'result'].forEach(s => { $(s).hidden = s !== id; });
    document.querySelector('main.run').classList.toggle('is-intro', id === 'intro');
    const bw = document.getElementById('boardWrap');
    if (bw && (id === 'count' || id === 'game')) bw.hidden = true;
  }

  function bestLine() {
    const b = store.get('best', null);
    $('bestLine').textContent = b ? t('En iyi süren: {t} sn — {r}', { t: num(b, 2), r: rankOf(b) }) : '';
  }
  bestLine();

  // ── Ses (küçük bip) ────────────────────────────────
  const beep = (f, d) => window.KS.beep(f, d, .05);

  // ── Akış ───────────────────────────────────────────
  function countdown() {
    if (noMac || state === 'count' || state === 'run') return;
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
    $('editor').value = t('Kısayol bilen yorulmaz, fareye uzanan kaybeder.');
    $('box').value = '';
    penalty = 0; idx = 0; results = []; mouseHits = 0;
    $('pen').textContent = '+0 ' + t('sn');
    $('track').innerHTML = TASKS.map(() => '<i></i>').join('');
    t0 = performance.now();
    runToken = null;
    fetch('/api/start', { method: 'POST' }).then(r => r.json()).then(j => { runToken = j.token || null; }).catch(() => {});
    $('boardWrap').hidden = true;
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
    taskT0 = performance.now();
    $('step').textContent = `${idx + 1}/${TASKS.length}`;
    $('taskN').textContent = t('Görev {n}', { n: idx + 1 });
    $('taskT').textContent = task.t;
    $('taskHint').classList.remove('on');
    const hk = task.hintKeys ? task.hintKeys.map(k => KS.keyGroup(k)).join('<span class="kc-sep">sonra</span>') : renderShortcut(sc);
    $('taskHint').innerHTML = t('İpucu: ') + hk;
    hintTimer = setTimeout(() => { $('taskHint').classList.add('on'); results[idx] = Object.assign(results[idx] || {}, { hinted: true }); }, 8000);
    [...$('track').children].forEach((el, i) => el.classList.toggle('now', i === idx));
    if (task.focus) $(task.focus).focus();

    const c = task.check, box = $('box');
    if (c.type === 'combo') {
      on(document, 'keydown', e => {
        if (e.repeat || !c.combos.some(cb => matches(e, cb))) return;
        if (c.prevent) e.preventDefault();
        if (c.need && !c.need.test(box.value)) { e.preventDefault(); toast(c.needMsg, 'warn'); return; }
        done();
      }, true);
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
    p.textContent = `+${penalty} ${t('sn')}`;
    p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump');
    beep(160, .18);
    toast(msg, 'warn');
  }

  function finish() {
    state = 'result';
    cleanups.forEach(f => f()); cleanups = [];
    cancelAnimationFrame(raf); clearTimeout(hintTimer);
    const rawMs = Math.round(performance.now() - t0);
    const total = (rawMs + penalty * 1000) / 1000;
    const passes = results.filter(r => r && r.passed).length;
    const hints = results.filter(r => r && r.hinted && !r.passed).length;
    const prevBest = store.get('best', null);
    const record = prevBest == null || total < prevBest;
    if (record) store.set('best', +total.toFixed(2));
    show('result');

    $('rTime').textContent = num(total, 2);
    $('rRank').textContent = rankOf(total);
    $('rMeta').textContent = t('{n} görev · {m} fare cezası · {p} pas', { n: TASKS.length, m: mouseHits, p: passes });
    const grid = TASKS.map((t, i) => { const r = results[i] || {}; return r.passed ? '🟥' : r.hinted ? '🟨' : '🟩'; });
    const gridTxt = grid.slice(0, 6).join('') + '\n' + grid.slice(6).join('');
    $('rGrid').textContent = gridTxt;
    const ri = RANKS.findIndex(r => total < r[0]);
    $('rNext').textContent = ri > 0 ? t('{r} rütbesine {s} sn kaldı. ↩ ile tekrar dene.', { r: RANKS[ri - 1][1], s: num(total - RANKS[ri - 1][0], 1) }) : t('Zirvedesin. Bunu geçen çıkar mı? 👀');
    lastShare = { total, rank: rankOf(total), grid: gridTxt, mouse: mouseHits, passes };
    lastRun = { token: runToken, ms: rawMs + penalty * 1000, raw: rawMs, mouse: mouseHits, passes, hints, grid: gridTxt };
    shareBase = { t2: num(total, 2), gridTxt };
    setupSubmit();
    $('rRecord').hidden = !(record && prevBest != null);
    $('rHead').textContent = record && prevBest != null ? t('Yeni rekor! 🔥') : passes ? t('Fena değil!') : t('Temiz iş!');
    $('rBest').textContent = rivalResult(total) + (prevBest != null ? t('Önceki en iyi: {t} sn', { t: num(prevBest, 2) }) : t('İlk denemen. Şimdi bir arkadaşına at.'));

    buildShare(null);

    // Takıldıkların
    const seen = new Set();
    const weak = TASKS.map((t, i) => ({ t, r: results[i] || {} })).filter(x => (x.r.passed || x.r.hinted) && !seen.has(x.t.sc) && seen.add(x.t.sc));
    $('missed').innerHTML = weak.length ? '<h3>' + t('Bunlara bir göz at') + '</h3><ul>' + weak.map(({ t, r }) => {
      const sc = SC[t.sc];
      const les = (window.KS_LESSONS.find(l => l.sc === t.sc) || {}).id || '';
      return `<li>${renderShortcut(sc)}<span>${esc(sc.ad)}${r.passed ? ' <span class="muted">' + t('(pas)') + '</span>' : ''}</span><a href="${PATHS.learn}#${les}">${t('Öğren →')}</a></li>`;
    }).join('') + '</ul>' : '';
    if (record) beep(1760, .25);
  }

  // ── Kartı PNG olarak indir ─────────────────────────
  let lastShare = null;
  function drawCard(copy) {
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
    const tt = num(d.total, 2);
    g.fillText(tt, 72, 320);
    const tw = g.measureText(tt).width;
    g.fillStyle = '#9a9385'; g.font = '700 54px "Bricolage Grotesque", sans-serif';
    g.fillText(t('sn'), 90 + tw, 320);
    g.fillStyle = '#d6ff3d'; g.font = '800 48px "Bricolage Grotesque", sans-serif';
    g.fillText(d.rank, 80, 400);
    g.font = '52px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    d.grid.split('\n').forEach((row, i) => g.fillText(row, 760, 250 + i * 70));
    g.fillStyle = '#9a9385'; g.font = '600 28px "Hanken Grotesk", sans-serif';
    g.fillText(t('{n} görev · {m} fare cezası · {p} pas', { n: TASKS.length, m: d.mouse, p: d.passes }), 80, 470);
    g.fillStyle = '#f3eee4'; g.font = '700 30px "JetBrains Mono", monospace';
    g.fillText('kisayolcu.gokhanazap.com' + (LANG === 'en' ? '/en' : ''), 80, 560);
    cv.toBlob(async b => {
      if (copy) {
        try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]); toast(t('Kart kopyalandı ✓ ⌘V ile tweet’e yapıştır'), 'ok'); }
        catch (_) { toast(t('Kopyalanamadı, “Kartı indir”i dene')); }
        return;
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = `kisayolcu-speedrun-${tt.replace(/[.,]/, '-')}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  }

  // ── Paylaşım metni (sıralama gelince güncellenir) ───
  let shareBase = null;
  function buildShare(place) {
    const d = lastShare, b = shareBase; if (!d || !b) return;
    const url = PATHS.site + 'speedrun?t=' + d.total.toFixed(2);
    const line2 = place ? t('🏆 Sıralamada {r}. oldum ({n} kişi içinde)', { r: place.rank, n: place.players }) : (d.mouse ? t('🐭 {m} kez fareye dokundum', { m: d.mouse }) : t('🐭 fareye hiç dokunmadım'));
    const text = t('⌨️ Kısayolcu Speedrun: {t} sn — {r}', { t: b.t2, r: d.rank }) + `\n${b.gridTxt}\n${line2}\n` + t('Sen kaç saniyede bitirirsin? (yapan: @gokhanazap0)');
    $('shareX').href = 'https://x.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
    $('copy').onclick = async () => {
      try { await navigator.clipboard.writeText(text + '\n' + url); toast(t('Kopyalandı ✓ ⌘V ile yapıştır'), 'ok'); }
      catch (_) { toast(t('Kopyalanamadı')); }
    };
  }

  // ── Liderlik tablosu ───────────────────────────────
  let runToken = null, lastRun = null, submitted = false;
  const fmtS = ms => num(ms / 1000, 2);
  const medal = i => ['🥇', '🥈', '🥉'][i] || String(i + 1);
  function renderBoard(data, me) {
    const wrap = $('boardWrap'), list = $('board');
    if (!data || !data.top) { wrap.hidden = true; return; }
    wrap.hidden = state === 'run' || state === 'count';
    $('boardMeta').textContent = data.players ? t('{n} kişi · {r} koşu', { n: data.players, r: data.runs }) : '';
    if (!data.top.length) { list.innerHTML = '<li class="empty">' + t('Henüz kimse yok. İlk sıra seni bekliyor 👀') + '</li>'; return; }
    const key = me ? me.toLocaleLowerCase('tr') : null;
    const rows = data.top.map((r, i) => ({ r, i }));
    const shown = boardAll ? rows : rows.slice(0, 10);
    list.innerHTML = shown.map(({ r, i }) =>
      `<li class="${key && r.name.toLocaleLowerCase('tr') === key ? 'me' : ''}"><span class="pos">${medal(i)}</span><span class="nm">${esc(r.name)}</span><span class="rk">${esc(rankOf(r.ms / 1000))}</span><span class="tm">${fmtS(r.ms)} ${t('sn')}</span></li>`).join('');
    $('boardMore').hidden = boardAll || rows.length <= 10;
  }
  let boardAll = false, boardData = null;
  function loadBoard() {
    fetch('/api/scores').then(r => r.json()).then(d => { boardData = d; renderBoard(d, store.get('name', '')); if (location.hash === '#board' && state === 'intro') focusBoard(); }).catch(() => { $('boardWrap').hidden = true; });
  }
  function focusBoard() {
    if (!boardData || state === 'run' || state === 'count') return;
    boardAll = true; renderBoard(boardData, store.get('name', ''));
    const w = $('boardWrap');
    // Yerleşim otursun diye bir kare bekle (Safari), sonra kaydır ve vurgula
    requestAnimationFrame(() => setTimeout(() => {
      w.scrollIntoView({ block: 'start' });
      w.classList.remove('flash'); void w.offsetWidth; w.classList.add('flash');
    }, 60));
  }
  window.addEventListener('hashchange', () => { if (location.hash === '#board') focusBoard(); });
  $('boardMore').addEventListener('click', () => { boardAll = true; renderBoard(boardData, store.get('name', '')); });

  function setupSubmit() {
    submitted = false;
    const saved = store.get('name', '');
    $('lbName').value = saved;
    $('lbForm').hidden = false;
    $('lbMsg').textContent = '';
    $('boardWrap').hidden = !boardData;
    if (!lastRun.token) { $('lbForm').hidden = true; $('lbMsg').textContent = t('Sıralama sunucusuna ulaşılamadı; süren bu cihazda kayıtlı.'); return; }
    if (saved) submitScore();            // ismin kayıtlıysa otomatik gönder
    else setTimeout(() => $('lbName').focus(), 60);
  }
  async function submitScore() {
    if (submitted || !lastRun) return;
    const name = $('lbName').value.trim();
    if ([...name].length < 2) { $('lbMsg').textContent = t('En az 2 karakterlik bir isim yaz.'); $('lbName').focus(); return; }
    submitted = true; $('lbBtn').disabled = true; $('lbMsg').textContent = t('Gönderiliyor…');
    try {
      const r = await fetch('/api/scores', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...lastRun, name }) });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        submitted = j.error !== 'name' && j.error !== 'rate' && j.error !== 'server';
        $('lbMsg').textContent = (LANG === 'tr' && j.message) || (j.error === 'name' ? t('Bu isim olmaz 🙂 Başka bir tane dene.') : j.error === 'rate' ? t('Çok hızlısın! Biraz sonra tekrar dene.') : j.error === 'token' || j.error === 'time' ? t('Bu koşu doğrulanamadı. Tekrar dene.') : t('Gönderilemedi, tekrar dene.'));
        return;
      }
      store.set('name', j.name);
      $('lbForm').hidden = true;
      const isBest = j.best === lastRun.ms;
      $('lbMsg').innerHTML = t('🏆 <b>{name}</b>, sıralaman: <b>{r}.</b> / {n} kişi', { name: esc(j.name), r: j.rank, n: j.players }) + (isBest ? '' : ' <span class="muted">' + t('(en iyi süren: {t} sn)', { t: fmtS(j.best) }) + '</span>') + ' · <button type="button" class="linkbtn" id="lbRename">' + t('ismi değiştir') + '</button>';
      $('lbRename').onclick = () => { store.set('name', ''); $('lbMsg').textContent = t('Sonraki koşuda yeni isim sorulacak.'); };
      boardData = j; renderBoard(j, j.name);
      buildShare(isBest ? { rank: j.rank, players: j.players } : null);
    } catch (_) {
      submitted = false; $('lbMsg').textContent = t('Bağlantı hatası, tekrar dene.');
    } finally { $('lbBtn').disabled = false; }
  }
  $('lbForm').addEventListener('submit', e => { e.preventDefault(); submitScore(); });
  loadBoard();

  // ── Meydan okuma linki: ?t=21.73 ───────────────────
  const rival = parseFloat(new URLSearchParams(location.search).get('t'));
  const hasRival = Number.isFinite(rival) && rival > 5 && rival < 900;
  if (hasRival) { $('rivalLine').hidden = false; $('rivalLine').textContent = t('⚔️ Arkadaşın {t} sn yaptı. Geçebilir misin?', { t: num(rival, 2) }); }
  function rivalResult(total) {
    if (!hasRival) return '';
    const d = num(Math.abs(total - rival), 2);
    return total < rival ? t('⚔️ Arkadaşını {d} sn farkla geçtin! ', { d }) : t('⚔️ Arkadaşının {d} sn gerisinde kaldın. ', { d });
  }

  // ── Mac değilse koşu başlatma: linki Mac'e gönder ──
  const noMac = !window.KS.isMac();
  if (noMac) {
    $('start').outerHTML = '<button class="btn btn-primary go" id="start" type="button">' + t('💻 Linki Mac’ime gönder') + '</button><p class="muted" style="margin-top:14px">' + t('Speedrun Mac klavyesiyle oynanıyor. Linki kendine at, Mac’te aç; o sırada aşağıdan sıralamaya bakabilirsin.') + '</p>';
    $('start').addEventListener('click', window.KS.sendToMac);
  }

  function reset() { state = 'intro'; bestLine(); show('intro'); }

  // ── Global dinleyiciler ─────────────────────────────
  document.addEventListener('keydown', e => {
    // Koşu boyunca ⌘F / ⌘S hiç tarayıcıya gitmesin (bulma çubuğu odağı çalıp Spotlight görevini bozar)
    if (state === 'run' && e.metaKey && !e.altKey && /^[fs]$/.test(e.key.toLowerCase())) e.preventDefault();
    if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const onControl = e.target.closest && e.target.closest('a,button,summary,#lbForm');
      if (state === 'intro' && (!onControl || e.target.id === 'start')) { e.preventDefault(); countdown(); }
      else if (state === 'result' && (!onControl || (e.target.id === 'lbName' && !e.target.value.trim()))) { e.preventDefault(); countdown(); }
    }
    if (e.key === 'Escape' && state === 'run') {
      e.preventDefault();
      if (performance.now() - taskT0 < 1200) return;
      addPenalty(10, t('Pas! +10 sn'));
      done(true);
    }
  }, true);

  document.addEventListener('mousedown', () => {
    if (state !== 'run') return;
    mouseHits++;
    addPenalty(3, t('🐭 Fare yasak! +3 sn'));
  });

  if (!noMac) $('start').addEventListener('click', () => { if (state === 'intro') countdown(); });
  $('again').addEventListener('click', countdown);
  $('download').addEventListener('click', () => drawCard(false));
  $('copyCard').addEventListener('click', () => drawCard(true));
})();
