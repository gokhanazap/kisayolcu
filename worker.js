// Kısayolcu — Speedrun liderlik tablosu API'si (Cloudflare Worker + D1).
// Statik dosyalar ASSETS üzerinden servis edilir; bu dosya sadece /api/* isteklerini karşılar.
//
//   POST /api/start   → { token }                      koşu başlarken alınır (sunucu saati damgası, imzalı)
//   POST /api/scores  → { ok, rank, total, best }      koşu bitince: { token, name, ms, raw, mouse, passes, hints, grid }
//   GET  /api/scores  → { top: [...], total }          her ismin en iyi süresi, ilk 50
//
// Hile önleme "yeterince iyi" seviyesinde: süre sunucu saatiyle tutarlı olmalı, token tek kullanımlık,
// IP başına saatlik limit var. Kararlı bir hilekârı durdurmaz; curl ile 1 sn yazmayı durdurur.

const MIN_RAW_MS = 8000;          // 12 görev bundan hızlı bitmez
const MAX_MS = 15 * 60 * 1000;
const TASKS = 12;
const enc = new TextEncoder();
const EN_PATH = { '/': '/en/', '/index': '/en/', '/ogren': '/en/learn', '/speedrun': '/en/speedrun', '/kisayollar': '/en/shortcuts' };

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function cleanName(raw) {
  let n = String(raw || '').normalize('NFKC').replace(/[\u0000-\u001f\u007f<>"'`&\\\u200b-\u200f\u202a-\u202e\u2060-\u2064\u3164\ufeff]/g, '').replace(/\s+/g, ' ').trim();
  if (n.startsWith('@')) n = '@' + n.slice(1).replace(/[^A-Za-z0-9_]/g, '');
  return [...n].slice(0, 20).join('');
}

const BAD = /orospu|s[iı]kt[iı]r|s[iı]ker[iı]m|yarra[kğ]|ibne|kahpe|fuck|nigg|hitler|(^|[^a-zçğıöşü])(amk|aq|pi[cç]|g[oö]t[uü]?|s[iı]k|shit)($|[^a-zçğıöşü])/;
const keyOf = name => name.startsWith('@') ? name.toLowerCase() : name.toLocaleLowerCase('tr');

async function top(db) {
  // best tablosu: isim başına tek satır (en iyi süre). Sorgular indeks üzerinden, tablo taraması yok.
  const { results } = await db.prepare('SELECT name, ms, runs FROM best ORDER BY ms ASC LIMIT 50').all();
  const total = await db.prepare('SELECT COUNT(*) AS players, COALESCE(SUM(runs), 0) AS runs FROM best').first();
  return { top: results, players: total.players, runs: total.runs };
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith('/api/')) {
      // Dil: Türkiye dışından gelen ve dil seçmemiş ziyaretçiyi İngilizce sayfaya yönlendir.
      const to = EN_PATH[url.pathname.replace(/\.html$/, '')];
      if (to && req.method === 'GET') {
        const cookie = req.headers.get('cookie') || '';
        const country = (req.cf && req.cf.country) || 'TR';
        const bot = /bot|crawl|spider|slurp|facebookexternalhit|preview|embed|whatsapp|telegram|slack|discord/i.test(req.headers.get('user-agent') || '');
        if (!/(^|;\s*)lang=/.test(cookie) && country !== 'TR' && !bot) {
          return new Response(null, { status: 302, headers: { location: to + url.search, 'cache-control': 'no-store', vary: 'cookie' } });
        }
      }
      return env.ASSETS.fetch(req);
    }

    try {
      const ip = req.headers.get('cf-connecting-ip') || '0';
      const ipHash = (await hmac(env.SCORE_SECRET, 'ip:' + ip)).slice(0, 16);

      if (url.pathname === '/api/start' && req.method === 'POST') {
        const ts = Date.now(), nonce = crypto.randomUUID().replace(/-/g, '');
        const sig = await hmac(env.SCORE_SECRET, `${ts}.${nonce}`);
        return json({ token: `${ts}.${nonce}.${sig}` });
      }

      if (url.pathname === '/api/scores' && req.method === 'GET') {
        // Kenar önbelleği: yoğun trafikte veritabanına 20 saniyede bir gidilir
        const ck = new Request(url.origin + '/api/scores');
        let res = await caches.default.match(ck);
        if (!res) {
          res = json(await top(env.DB), 200, { 'cache-control': 'public, max-age=0, s-maxage=10' });
          ctx.waitUntil(caches.default.put(ck, res.clone()));
        }
        return res;
      }

      if (url.pathname === '/api/scores' && req.method === 'POST') {
        // Sadece kendi sitemizden
        const origin = req.headers.get('origin') || '';
        if (origin && origin !== url.origin) return json({ error: 'origin' }, 403);

        const b = await req.json().catch(() => null);
        if (!b || typeof b !== 'object') return json({ error: 'bad_request' }, 400);

        const name = cleanName(b.name);
        if ([...name].length < 2) return json({ error: 'name', message: 'İsim en az 2 karakter olmalı.' }, 400);
        if (BAD.test(name.toLocaleLowerCase('tr'))) return json({ error: 'name', message: 'Bu isim olmaz 🙂 Başka bir tane dene.' }, 400);

        const ms = Math.round(Number(b.ms)), raw = Math.round(Number(b.raw));
        const mouse = Math.max(0, Math.min(999, Number(b.mouse) | 0));
        const passes = Math.max(0, Math.min(TASKS, Number(b.passes) | 0));
        const hints = Math.max(0, Math.min(TASKS, Number(b.hints) | 0));
        const grid = String(b.grid || '').slice(0, 40);
        if (passes > 3) return json({ error: 'time', message: 'Çok fazla pas var; sıralama için en fazla 3 pas.' }, 400);
        if (!Number.isFinite(ms) || !Number.isFinite(raw) || raw < MIN_RAW_MS || ms > MAX_MS) return json({ error: 'time' }, 400);
        // Toplam süre = ham süre + cezalar (3 sn fare, 10 sn pas)
        if (Math.abs(ms - (raw + mouse * 3000 + passes * 10000)) > 50) return json({ error: 'time' }, 400);
        if (!/^[🟩🟨🟥\n]*$/u.test(grid)) return json({ error: 'grid' }, 400);

        // Token: imza + sunucu saatiyle tutarlılık + tek kullanım
        const [tsS, nonce, sig] = String(b.token || '').split('.');
        const ts = Number(tsS);
        if (!ts || !nonce || !sig || sig !== await hmac(env.SCORE_SECRET, `${ts}.${nonce}`)) return json({ error: 'token' }, 400);
        const elapsed = Date.now() - ts;
        // Alt sınır hileyi durdurur; üst sınır geniş (ismini geç yazan olabilir)
        if (raw > elapsed + 5000 || elapsed > raw + 900000) return json({ error: 'time' }, 400);

        const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM scores WHERE ip_hash = ? AND created_at > ?').bind(ipHash, Date.now() - 3600e3).first();
        if (recent.n >= 120) return json({ error: 'rate', message: 'Çok hızlısın! Biraz sonra tekrar dene.' }, 429);

        const key = keyOf(name);
        try {
          await env.DB.batch([
            env.DB.prepare('INSERT INTO scores (name, name_key, ms, raw, mouse, passes, hints, grid, nonce, ip_hash, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)')
              .bind(name, key, ms, raw, mouse, passes, hints, grid, nonce, ipHash, Date.now()),
            env.DB.prepare('INSERT INTO best (name_key, name, ms, runs) VALUES (?,?,?,1) ON CONFLICT(name_key) DO UPDATE SET ms = MIN(ms, excluded.ms), runs = runs + 1, name = excluded.name')
              .bind(key, name, ms)
          ]);
        } catch (e) {
          if (String(e).includes('UNIQUE')) return json({ error: 'token' }, 409);
          throw e;
        }

        const best = await env.DB.prepare('SELECT ms FROM best WHERE name_key = ?').bind(key).first();
        const ahead = await env.DB.prepare('SELECT COUNT(*) AS n FROM best WHERE ms < ?').bind(best.ms).first();
        const board = await top(env.DB);
        ctx.waitUntil(caches.default.delete(new Request(url.origin + '/api/scores')));
        return json({ ok: true, name, rank: ahead.n + 1, best: best.ms, ...board });
      }

      return json({ error: 'not_found' }, 404);
    } catch (e) {
      return json({ error: 'server' }, 500);
    }
  }
};
