// Kullanım: node tools/prerender.js . — kısayol listelerini (TR + EN) statik HTML olarak üretir (SEO için)
const fs = require('fs'), path = require('path');
const dir = path.resolve(process.argv[2] || '.');
function build(dataFile, htmlFile, lang, learn, pill, tryTxt, flag) {
  for (const k of Object.keys(require.cache)) delete require.cache[k];
  global.window = { addEventListener() {} };
  global.document = { addEventListener() {}, querySelector() { return null; }, documentElement: { lang } };
  global.navigator = { platform: 'MacIntel' }; global.performance = { now: () => 0 };
  global.localStorage = { getItem() { return null; }, setItem() {} };
  require(path.join(dir, 'assets', dataFile)); require(path.join(dir, 'assets/core.js'));
  const { renderShortcut, esc } = window.KS;
  const lessonBySc = {}; window.KS_LESSONS.forEach(l => { if (!lessonBySc[l.sc]) lessonBySc[l.sc] = l; });
  let html = '';
  window.KS_CATS.forEach(c => {
    const rows = window.KS_SHORTCUTS.filter(s => s.cat === c.id);
    html += `<section class="cat" id="${c.id}"><h2>${c.ikon} ${esc(c.ad)} <small>${rows.length}</small></h2><p>${esc(c.aciklama)}</p><div class="rows">` +
      rows.map(s => { const l = lessonBySc[s.id];
        return `<article class="r card"><div>${renderShortcut(s)}</div><div><h3>${esc(s.ad)}${s.pop ? `<span class="pill pill-hot">${pill}</span>` : ''}</h3><p>${esc(s.d)}${s.tr ? ` <span class="trn">${flag} ${esc(s.tr)}</span>` : ''}</p></div>` + (l ? `<a class="try" href="${learn}#${l.id}">${tryTxt}</a>` : '<span></span>') + '</article>'; }).join('') + '</div></section>';
  });
  const f = path.join(dir, htmlFile);
  let s = fs.readFileSync(f, 'utf8');
  const out = s.replace(/<div class="wrap" id="list">[\s\S]*?<\/div>\n<\/main>/, () => `<div class="wrap" id="list"><!--LIST-->${html}<!--/LIST--></div>\n</main>`);
  if (out === s && !s.includes(html)) throw new Error('liste alanı bulunamadı: ' + htmlFile);
  fs.writeFileSync(f, out);
  console.log(htmlFile, 'rows', window.KS_SHORTCUTS.length);
}
build('data.js', 'kisayollar.html', 'tr', 'ogren', '⭐ önemli', 'Dene →', '🇹🇷');
build('data-en.js', 'en/shortcuts.html', 'en', 'learn', '⭐ essential', 'Try →', '⌨️');
