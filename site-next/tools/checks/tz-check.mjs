import { chromium } from '@playwright/test';
import fs from 'node:fs';
const S = 'review/tz';
fs.mkdirSync(S, { recursive: true });
const b = await chromium.launch({ channel: 'chrome' });
for (const tz of ['Asia/Tokyo', 'America/New_York', 'Europe/Berlin']) {
  const ctx = await b.newContext({ timezoneId: tz, locale: 'en-US', viewport: { width: 1440, height: 1000 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:4321/about/');
  await p.locator('.header-book').click();
  const f = p.frameLocator('#book-call-embed iframe');
  await f.locator('[data-testid="time"]').first().waitFor({ timeout: 30000 }).catch(() => {});
  await p.waitForTimeout(2500);
  const info = await f.locator('body').evaluate(() => {
    const times = [...document.querySelectorAll('[data-testid="time"]')].map((e) => e.textContent.trim());
    const tzLabel = [...document.querySelectorAll('button, span, div')].map((e) => e.textContent.trim()).find((t) => /^[A-Z][a-z]+\/[A-Za-z_]+$/.test(t));
    return { tzLabel, count: times.length, first: times[0], last: times[times.length - 1] };
  }).catch((e) => ({ error: e.message }));
  console.log(tz.padEnd(18), JSON.stringify(info));
  await p.screenshot({ path: `${S}/tz-${tz.replace('/', '-')}.png` });
  await ctx.close();
}
await b.close();
process.exit(0);
