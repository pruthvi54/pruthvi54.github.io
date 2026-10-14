import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'chrome' });
let bad = 0;
for (const width of [1440, 1024, 800]) {
  const p = await b.newPage({ viewport: { width, height: 900 } });
  for (const slug of ['aquanav-surface-simulator', 'eroas', 'auv-gazebo-unreal', 'ev-torque-vectoring', 'auv-dynamics-modeling', 'agricultural-plant-caretaker']) {
    await p.goto(`http://127.0.0.1:4321/projects/${slug}/`);
    await p.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }));
    await p.waitForFunction(() => [...document.images].every((i) => i.complete));
    const rows = await p.evaluate(() => [...document.querySelectorAll('.figure-group')].map((g) => [...g.querySelectorAll('img')].map((i) => +i.getBoundingClientRect().height.toFixed(1))));
    for (const r of rows) { const spread = Math.max(...r) - Math.min(...r); if (spread > 1) bad++; console.log(width, slug, r.join(' / '), spread > 1 ? '  <-- MISMATCH' : 'ok'); }
  }
}
await b.close();
console.log(bad ? `${bad} mismatched rows` : 'ALL ROWS EQUAL HEIGHT');
process.exit(0);
