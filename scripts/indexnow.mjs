// Notifies IndexNow (Bing, Yandex, Seznam, Naver; Bing also feeds DuckDuckGo and Yahoo)
// that the URLs in the live sitemap changed. Run after a production deploy: npm run indexnow
const HOST = 'www.zummitpayments.com';
const KEY = '2af282ec7ae382ddeac7fda9236e90bf';

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned ${r.status}`);
  return r.text();
});
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);
