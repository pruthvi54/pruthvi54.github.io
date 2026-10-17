import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const data = JSON.parse(fs.readFileSync(new URL('../src/data/content.json', import.meta.url), 'utf8')) as {
  projectOrder: string[];
  compatibility: { from: string; to: string }[];
};

const core = ['/', '/projects/', '/publications/', '/experience/', '/about/'];
// Projects marked `hidden: true` in their frontmatter are commented out: no page, not listed.
const isHidden = (slug: string) => /^hidden: true/m.test(fs.readFileSync(new URL(`../src/content/projects/${slug}.mdx`, import.meta.url), 'utf8').split('\n---')[0]);
const visibleOrder = data.projectOrder.filter((slug) => !isHidden(slug));
const hiddenProjects = data.projectOrder.filter(isHidden);
const allProjects = visibleOrder.map((slug) => `/projects/${slug}/`);
const screenshots = path.resolve('review');

test('every canonical page has a direct static route and one heading', async ({ page }) => {
  for (const route of [...core, ...allProjects]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical!).pathname).toBe(route);
  }
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore projects →' })).toBeVisible();
  await expect(page.locator('main')).not.toContainText('AquaNav');
  await page.goto('/projects/');
  // Projects appear in the owner's original timeline order, grouped by year (newest first).
  const hrefs = await page.locator('.project-row').evaluateAll((rows) => rows.map((row) => row.getAttribute('href')));
  expect(hrefs).toEqual(visibleOrder.map((slug) => `/projects/${slug}/`));
  await expect(page.locator('.timeline-label')).toHaveText(['2025', '2024', '2023', '2022', '2019']);
  // Commented-out projects are neither listed nor published.
  expect(hiddenProjects.length).toBe(7);
  for (const slug of hiddenProjects) {
    expect(hrefs).not.toContain(`/projects/${slug}/`);
    expect((await page.request.get(`/projects/${slug}/`)).status()).toBe(404);
  }
  await expect(page.locator('.project-row.has-study')).toHaveCount(9);
  await page.goto('/publications/');
  await expect(page.locator('.publication-row')).toHaveCount(5);
  await expect(page.locator('.technical-note')).toHaveCount(2);
});

test('navigation, keyboard, citation and browser history work', async ({ page, context }) => {
  await page.goto('/projects/');
  await page.locator('.project-row[href="/projects/eroas/"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/projects\/eroas\/$/);
  await expect(page.locator('main h1')).toHaveText('EROAS: Forward-Looking Sonar Based AUV Obstacle Avoidance');
  await expect(page.locator('.study-pagination')).toContainText('← AquaNav Surface Vehicle Simulator');
  await expect(page.locator('.study-pagination')).toContainText('MPC-CBF Framework for AUV Obstacle Avoidance →');
  await page.goBack();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projects\/eroas\/$/);
  await page.goBack();
  await page.getByRole('link', { name: 'Research' }).click();
  await expect(page).toHaveURL(/\/publications\/$/);
  await page.locator('.abstract summary').first().click();
  await expect(page.locator('.abstract').first()).toHaveAttribute('open', '');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.locator('.publication-row').first().getByRole('button', { name: 'Copy citation' }).click();
  await expect(page.locator('.publication-row').first().getByRole('status')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('EROAS: 3-D Efficient Reactive Obstacle Avoidance System');
  await page.goBack();
  await expect(page).toHaveURL(/\/projects\/$/);
});

test('responsive pages keep readable text and no horizontal overflow', async ({ page }) => {
  fs.mkdirSync(screenshots, { recursive: true });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 800 ? 844 : 900 });
    const routes = width === 320 ? ['/', '/experience/'] : width === 768 ? ['/projects/'] : ['/', '/projects/', '/publications/', '/experience/', '/about/', '/projects/eroas/'];
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('main h1')).toBeVisible();
      const metrics = await page.evaluate(() => ({
        excess: document.documentElement.scrollWidth - window.innerWidth,
        heavy: [...document.querySelectorAll('h1,h2,h3,p,a,button,summary,span')]
          .filter((el) => Number.parseInt(getComputedStyle(el).fontWeight, 10) > 400)
          .length
      }));
      expect(metrics.excess, `${route} at ${width}px has overflow`).toBeLessThanOrEqual(1);
      expect(metrics.heavy, `${route} at ${width}px has heavy type`).toBe(0);
      if (width === 390 || width === 1440) {
        const name = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
        await page.locator('img[loading="lazy"]').evaluateAll((images) => images.forEach((image) => {
          (image as HTMLImageElement).loading = 'eager';
        }));
        await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
        await page.screenshot({ path: path.join(screenshots, `${name}-${width}.png`), fullPage: route !== '/projects/eroas/' });
      }
    }
  }
});

test('content and links survive without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/projects/');
  await expect(page.locator('.project-row')).toHaveCount(visibleOrder.length);
  await expect(page.locator('.project-thumb').first()).toBeVisible();
  await page.locator('.project-row').first().click();
  await expect(page).toHaveURL(/\/projects\/aquanav-surface-simulator\/$/);
  await expect(page.locator('.study-figure')).toHaveCount(6);
  await context.close();
});

test('legacy routes lead to their canonical destinations', async ({ page }) => {
  for (const route of data.compatibility) {
    await page.goto(route.from);
    await expect(page).toHaveURL(new RegExp(route.to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'));
  }
});

test('all original study figures load when read and copy failure remains usable', async ({ page }) => {
  // Counts match the figures shown on the original legacy study pages.
  for (const [slug, count] of [
    ['aquanav-surface-simulator', 6], ['eroas', 8],
    ['auv-gazebo-unreal', 3], ['ev-torque-vectoring', 11],
    ['auv-dynamics-modeling', 15], ['agricultural-plant-caretaker', 10]
  ] as const) {
    await page.goto(`/projects/${slug}/`);
    const figures = page.locator('.study-figure img');
    await expect(figures).toHaveCount(count);
    for (const href of await page.locator('.study-toc a').evaluateAll((links) => links.map((link) => link.getAttribute('href')!))) {
      await expect(page.locator(`[id="${decodeURIComponent(href.slice(1))}"]`), `${slug} ${href}`).toHaveCount(1);
    }
    for (const image of await figures.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    if (!['ev-torque-vectoring', 'auv-dynamics-modeling', 'agricultural-plant-caretaker'].includes(slug)) {
      const video = page.locator('video');
      await expect(video).toHaveAttribute('preload', 'none');
      // The poster and the playing video must occupy the same 16:9 box (no jump on play).
      await video.scrollIntoViewIfNeeded();
      const before = await video.evaluate((element) => element.getBoundingClientRect().height);
      await video.evaluate(async (element) => {
        const v = element as HTMLVideoElement; v.muted = true;
        await new Promise((resolve) => { v.addEventListener('loadedmetadata', resolve, { once: true }); v.load(); });
      });
      const after = await video.evaluate((element) => element.getBoundingClientRect().height);
      expect(Math.abs(after - before), `${slug} video height changed on load`).toBeLessThanOrEqual(1);
    }
  }
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) }
  }));
  await page.locator('.site-footer').getByRole('button', { name: 'Copy' }).click();
  await expect(page.locator('.site-footer .copy-status')).toHaveText('Select and copy');
  await expect(page.locator('.site-footer .copy-fallback')).toBeVisible();
  const missing = await page.goto('/a-route-that-does-not-exist/');
  expect(missing?.status()).toBe(404);
  await expect(page.locator('main h1')).toHaveText('Page not found');
});

test('the selected typefaces load locally: Charter headings, JetBrains Mono text', async ({ page }) => {
  const fontRequests: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'font') fontRequests.push(request.url());
  });
  await page.goto('/');
  const result = await page.evaluate(async () => {
    await document.fonts.ready;
    return {
      loaded: [...document.fonts].filter((face) => face.status === 'loaded')
        .map((face) => ({ family: face.family, weight: face.weight })),
      heading: getComputedStyle(document.querySelector('main h1')!).fontFamily,
      body: getComputedStyle(document.body).fontFamily
    };
  });
  expect(result.heading.startsWith('Charter')).toBeTruthy();
  expect(result.heading).toContain('Charis SIL');
  expect(result.body.startsWith('"JetBrains Mono"')).toBeTruthy();
  expect(result.loaded.some((face) => face.family === 'JetBrains Mono' && face.weight === '400')).toBeTruthy();
  expect(fontRequests.length).toBeGreaterThan(0);
  expect(fontRequests.every((url) => new URL(url).hostname === '127.0.0.1')).toBeTruthy();
});

test('book-a-call window opens, closes with Escape, and returns focus to its trigger', async ({ page }) => {
  await page.goto('/about/');
  const dialog = page.locator('#book-call');
  await expect(dialog).not.toBeVisible();
  await page.locator('.header-book').click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('h2')).toHaveText('Book a 30-minute call');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('.header-book')).toBeFocused();
  // The Close button must only close the window, not trigger Cal.com's own pop-up (it hooks data-cal-link).
  await expect(page.locator('[data-cal-link]')).toHaveCount(0);
  await page.locator('.header-book').click();
  await dialog.locator('[data-book-close]').click();
  await expect(dialog).not.toBeVisible();
  await page.waitForTimeout(1500);
  await expect(page.locator('cal-modal-box')).toHaveCount(0);
  // Every page offers the booking link, and without JavaScript it still leads somewhere useful.
  for (const route of ['/', '/projects/eroas/']) {
    await page.goto(route);
    const href = await page.locator('.header-book').getAttribute('href');
    expect(href).toMatch(/^(https:\/\/cal\.com\/|mailto:)/);
  }
});

test('background AUV: the CBF filter keeps it clear of the cursor and the fish, it respects its turning radius, and it still reaches goals', async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?cbf-debug');
  type State = { x: number; y: number; goal: { x: number; y: number }; goalsReached: number; engaged: number; fish: number; minClearance: number; tightestTurn: number };
  const read = () => page.evaluate(() => (window as unknown as { __auv: () => State }).__auv());
  const radius = 70;
  const turnRadius = 45;
  const start = await read();
  expect(start.fish).toBeGreaterThan(2);
  // Park the cursor halfway between the vehicle and its goal, squarely in the way.
  const obstacle = { x: Math.round((start.x + start.goal.x) / 2), y: Math.round((start.y + start.goal.y) / 2) };
  let closest = Infinity;
  let state = start;
  // Up to 75 s: a goal not reached within 45 s is moved by design, so this allows one relocation.
  for (let i = 0; i < 300 && state.goalsReached < 1; i++) {
    await page.mouse.move(obstacle.x + (i % 2), obstacle.y);
    await page.waitForTimeout(250);
    state = await read();
    closest = Math.min(closest, Math.hypot(state.x - obstacle.x, state.y - obstacle.y));
  }
  expect(closest).toBeGreaterThan(radius);                   // hull centre never inside the cursor's circle
  expect(state.minClearance).toBeGreaterThan(0);              // nor inside any fish's or anemone's circle
  expect(state.tightestTurn).toBeGreaterThan(turnRadius - 1); // no turn tighter than the vehicle can make
  expect(state.goalsReached).toBeGreaterThanOrEqual(1);
});

test('background anemones: hovering releases a fish after 1 s, then one every 3 s', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?cbf-debug');
  type State = { hatchedTotal: number; residents: number; generators: { x: number; y: number }[] };
  const read = () => page.evaluate(() => (window as unknown as { __auv: () => State }).__auv());
  const start = await read();
  expect(start.residents).toBeGreaterThanOrEqual(12);
  expect(start.generators.length).toBe(3);
  const anemone = start.generators[0];
  await page.mouse.move(anemone.x, anemone.y);
  await page.waitForTimeout(600);
  expect((await read()).hatchedTotal).toBe(0);
  await page.waitForTimeout(700);
  expect((await read()).hatchedTotal).toBe(1);
  await page.waitForTimeout(3200);
  expect((await read()).hatchedTotal).toBe(2);
  await page.mouse.move(720, 450);
  await page.waitForTimeout(3500);
  expect((await read()).hatchedTotal).toBe(2);
});

test('background AUV: a cursor dropped right in front of it does not freeze it; it backs off and carries on', async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?cbf-debug');
  type State = { x: number; y: number; heading: number; reversing: boolean };
  const read = () => page.evaluate(() => (window as unknown as { __auv: () => State }).__auv());
  await page.waitForTimeout(3000);
  const start = await read();
  const cursor = { x: Math.round(start.x + Math.cos(start.heading) * 40), y: Math.round(start.y + Math.sin(start.heading) * 40) };
  let reversed = false;
  let state = start;
  for (let i = 0; i < 48; i++) {
    await page.mouse.move(cursor.x + (i % 2), cursor.y);
    await page.waitForTimeout(250);
    state = await read();
    reversed ||= state.reversing;
  }
  expect(reversed).toBeTruthy();
  expect(Math.hypot(state.x - start.x, state.y - start.y)).toBeGreaterThan(80); // it got going again
});

test('a figure on its own is centred at its real width, with the caption wrapping to the image', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of ['mpc-cbf-auv', 'auv-dynamics-modeling']) {
      await page.goto(`/projects/${slug}/`);
      const figures = await page.evaluate(() => {
        const column = document.querySelector('.study-article')!.getBoundingClientRect();
        return [...document.querySelectorAll('.study-article > .study-figure')].map((figure) => {
          const image = figure.querySelector('img')!;
          const box = image.getBoundingClientRect();
          const caption = figure.querySelector('figcaption')!.getBoundingClientRect();
          return {
            width: box.width,
            expected: Math.min(Number(image.getAttribute('width')), column.width),
            offCentre: Math.abs((box.left + box.right) / 2 - (column.left + column.right) / 2),
            captionDiff: Math.abs(caption.width - box.width)
          };
        });
      });
      expect(figures.length).toBeGreaterThan(0);
      for (const f of figures) {
        expect(Math.abs(f.width - f.expected)).toBeLessThan(2); // never collapsed, never wider than the column
        expect(f.offCentre).toBeLessThan(2);
        expect(f.captionDiff).toBeLessThan(2);
      }
    }
  }
});
