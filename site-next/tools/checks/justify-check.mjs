import { chromium } from '@playwright/test';
import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('src/data/content.json', 'utf8'));
const routes = ['/', '/projects/', '/publications/', '/experience/', '/about/', ...data.projectOrder.map((s) => `/projects/${s}/`)];
const b = await chromium.launch({ channel: 'chrome' });
const found = new Set();
for (const width of [1440, 390]) {
  const p = await b.newPage({ viewport: { width, height: 900 } });
  for (const r of routes) {
    await p.goto('http://127.0.0.1:4321' + r);
    const res = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('main *')) {
        if (el.closest('nav, button, summary, .meta-label, .study-toc, .study-toc-mobile, table')) continue;
        // Captions under narrow figures (<= 360 px) are intentionally left-aligned.
        if (el.tagName === 'FIGCAPTION' && el.closest('.study-figure') && el.closest('.study-figure').getBoundingClientRect().width <= 360) continue;
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 20);
        if (!hasText) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.display.startsWith('inline')) continue;
        const lines = Math.round(el.getBoundingClientRect().height / parseFloat(cs.lineHeight || '20'));
        if (lines >= 2 && cs.textAlign !== 'justify') out.push(`<${el.tagName.toLowerCase()} class="${el.className}"> align=${cs.textAlign}: "${el.textContent.trim().slice(0, 50)}"`);
      }
      return out;
    });
    res.forEach((x) => found.add(`[${width}] ${r} ${x}`));
  }
}
await b.close();
console.log([...found].join('\n') || 'ALL MULTI-LINE TEXT JUSTIFIED');
