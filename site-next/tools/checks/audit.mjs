import { chromium } from '@playwright/test';
import fs from 'node:fs';
const base = 'http://127.0.0.1:4321';
const data = JSON.parse(fs.readFileSync('src/data/content.json', 'utf8'));
// Projects marked `hidden: true` in their frontmatter are commented out: no page, not listed.
const visibleOrder = data.projectOrder.filter((s) => !/^hidden: true/m.test(fs.readFileSync(`src/content/projects/${s}.mdx`, 'utf8').split('\n---')[0]));
const routes = ['/', '/projects/', '/publications/', '/blogs/', '/experience/', '/about/', '/404.html', ...visibleOrder.map((s) => `/projects/${s}/`)];
const b = await chromium.launch({ channel: 'chrome' });
const issues = [];
const seenLinks = new Set();
for (const width of [320, 390, 768, 1024, 1440]) {
  const ctx = await b.newContext({ viewport: { width, height: 900 }, hasTouch: width < 800 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') issues.push(`[${width}] console ${m.type()} on ${page.url()}: ${m.text()}`); });
  page.on('pageerror', (e) => issues.push(`[${width}] JS error on ${page.url()}: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('404.html')) issues.push(`[${width}] HTTP ${r.status()} ${r.url()} (from ${page.url()})`); });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const r = await page.evaluate((width) => {
      const out = [];
      const doc = document.documentElement;
      if (doc.scrollWidth > doc.clientWidth + 1) out.push(`horizontal overflow ${doc.scrollWidth}>${doc.clientWidth}`);
      for (const el of document.querySelectorAll('main *, header *, footer *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('.katex')) continue; // KaTeX clips its own hidden MathML and stretchy SVG delimiters
        const rect = el.getBoundingClientRect();
        if (rect.width && rect.right > doc.clientWidth + 1) { out.push(`element past right edge: <${el.tagName.toLowerCase()} class="${el.className}"> right=${Math.round(rect.right)}`); break; }
      }
      for (const img of document.querySelectorAll('img')) if (!img.hasAttribute('alt')) out.push(`img without alt: ${img.src}`);
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
      const dup = ids.filter((id, i) => ids.indexOf(id) !== i); if (dup.length) out.push(`duplicate ids: ${dup}`);
      let last = 0;
      for (const h of document.querySelectorAll('main h1, main h2, main h3, main h4')) {
        const lvl = +h.tagName[1]; if (last && lvl > last + 1) out.push(`heading skip h${last}->h${lvl}: "${h.textContent.trim().slice(0, 40)}"`); last = lvl;
      }
      for (const a of document.querySelectorAll('a[href^="#"]')) { const id = decodeURIComponent(a.getAttribute('href').slice(1)); if (id && !document.getElementById(id)) out.push(`dead anchor ${a.getAttribute('href')}`); }
      if (width < 800) for (const el of document.querySelectorAll('a, button, summary')) {
        const cs = getComputedStyle(el); if (cs.display === 'none' || el.closest('[hidden]') || el.classList.contains('skip-link')) continue;
        // WCAG 2.2 (2.5.8) exempts links inside running text: their size is set by the line of text.
        if (el.tagName === 'A' && cs.display === 'inline' && el.parentElement?.closest('.study-article p, .study-article li')) continue;
        const rc = el.getBoundingClientRect(); if (rc.width && rc.height < 40) out.push(`small tap target (${Math.round(rc.height)}px): "${el.textContent.trim().slice(0, 30)}" <${el.tagName.toLowerCase()} class="${el.className}">`);
      }
      // Each video box must match its own video's shape (width/height attributes), so there are no bars.
      for (const v of document.querySelectorAll('video')) { const rc = v.getBoundingClientRect(); const ratio = rc.width / rc.height; const own = Number(v.getAttribute('width')) / Number(v.getAttribute('height')); if (Math.abs(ratio - own) > 0.02) out.push(`video box ratio ${ratio.toFixed(2)} vs video ${own.toFixed(2)}`); }
      for (const el of document.querySelectorAll('p, li, h1, h2, h3, a, dd')) if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') out.push(`clipped text: "${el.textContent.trim().slice(0, 30)}"`);
      const links = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]);
      return { out, links };
    }, width);
    for (const o of new Set(r.out)) issues.push(`[${width}] ${route}: ${o}`);
    r.links.forEach((l) => seenLinks.add(l));
  }
  await ctx.close();
}
const ctx = await b.newContext(); const p = await ctx.newPage();
for (const l of seenLinks) { const res = await p.request.get(base + l); if (res.status() >= 400) issues.push(`broken internal link ${l} -> ${res.status()}`); }
await b.close();
console.log([...new Set(issues)].join('\n') || 'NO ISSUES');
