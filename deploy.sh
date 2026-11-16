#!/bin/sh
# Siteyi Cloudflare'e yayınlar: sadece site dosyalarını public/ içine kopyalar, sonra deploy eder.
set -e
cd "$(dirname "$0")"
node tools/prerender.js .
rm -rf public && mkdir public
cp -R index.html ogren.html speedrun.html kisayollar.html kapat.html 404.html favicon.svg favicon.png robots.txt sitemap.xml assets public/
npx --yes wrangler@latest deploy
