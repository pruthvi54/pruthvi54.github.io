// ARCHIVED (2026-10-02): the faint bubble-game background, replaced by the AUV + CBF survey. To restore,
// copy this over src/scripts/backdrop.ts and re-add the .bubble-count styles. It reads the --trace colour token.
// Faint bubble backdrop with a small game: bubbles rise and wobble, drift towards the cursor
// (or the last tap on touch screens), and pop when they reach it. A quiet counter tallies pops.
// Pauses while the tab is hidden; visitors who prefer reduced motion get a still frame.

const DENSITY = 1 / 34000;   // bubbles per px² of viewport
const MAX_BUBBLES = 55;
const PULL = 1.6;            // strength of the cursor's attraction
const PULL_RANGE = 520;      // px; bubbles further away barely feel it
const POP_DISTANCE = 10;     // px from the cursor at which a bubble pops
const STROKE_ALPHA = 0.11;   // bubble outline opacity
const FILL_ALPHA = 0.018;   // bubble body opacity
const IDLE_RELEASE = 6000;   // ms without pointer movement before bubbles are released

type Bubble = { x: number; y: number; vx: number; vy: number; r: number; rise: number; phase: number };
type Ring = { x: number; y: number; r: number; age: number };

const canvas = document.querySelector<HTMLCanvasElement>('.backdrop');
const context = canvas?.getContext('2d');

if (canvas && context) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--trace').trim() || '#426358';

  let width = 0;
  let height = 0;
  let bubbles: Bubble[] = [];
  const rings: Ring[] = [];
  let target: { x: number; y: number } | null = null;
  let lastMove = 0;
  let frame = 0;
  let popped = 0;

  const counter = document.createElement('div');
  counter.className = 'bubble-count';
  counter.setAttribute('aria-hidden', 'true');
  document.body.append(counter);
  let counterTimer = 0;

  const random = (min: number, max: number) => min + Math.random() * (max - min);
  const spawn = (fromBottom: boolean): Bubble => ({
    x: random(0, width),
    y: fromBottom ? height + random(10, 80) : random(0, height),
    vx: 0,
    vy: 0,
    r: random(2.5, 8),
    rise: random(0.15, 0.5),
    phase: random(0, Math.PI * 2)
  });

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(MAX_BUBBLES, Math.round(width * height * DENSITY));
    while (bubbles.length < count) bubbles.push(spawn(false));
    bubbles = bubbles.slice(0, count);
    draw();
  };

  const pop = (bubble: Bubble) => {
    rings.push({ x: bubble.x, y: bubble.y, r: bubble.r, age: 0 });
    Object.assign(bubble, spawn(true));
    popped++;
    counter.textContent = `${popped} popped`;
    counter.classList.add('visible');
    clearTimeout(counterTimer);
    counterTimer = window.setTimeout(() => counter.classList.remove('visible'), 2500);
  };

  const step = (time: number) => {
    if (target && time - lastMove > IDLE_RELEASE) target = null;
    for (const bubble of bubbles) {
      // Buoyancy and a gentle side-to-side wobble.
      bubble.vy -= bubble.rise * 0.02;
      bubble.vx += Math.sin(time / 900 + bubble.phase) * 0.006;
      if (target) {
        const dx = target.x - bubble.x;
        const dy = target.y - bubble.y;
        const distance = Math.hypot(dx, dy);
        if (distance < POP_DISTANCE + bubble.r) { pop(bubble); continue; }
        const strength = PULL * Math.min(1, PULL_RANGE / (distance + 60)) * 0.02;
        bubble.vx += (dx / distance) * strength;
        bubble.vy += (dy / distance) * strength;
      }
      // Water drag keeps everything slow and smooth.
      bubble.vx *= 0.96;
      bubble.vy *= 0.96;
      bubble.x += bubble.vx;
      bubble.y += bubble.vy;
      if (bubble.y < -20 || bubble.x < -40 || bubble.x > width + 40) Object.assign(bubble, spawn(true));
    }
    for (const ring of rings) ring.age += 1;
    while (rings.length && rings[0].age > 28) rings.shift();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.strokeStyle = accent;
    context.fillStyle = accent;
    context.lineWidth = 1;
    for (const bubble of bubbles) {
      context.beginPath();
      context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
      context.globalAlpha = FILL_ALPHA;
      context.fill();
      context.globalAlpha = STROKE_ALPHA;
      context.stroke();
      // Small highlight so they read as bubbles rather than dots.
      context.beginPath();
      context.arc(bubble.x - bubble.r * 0.35, bubble.y - bubble.r * 0.35, Math.max(0.6, bubble.r * 0.18), 0, Math.PI * 2);
      context.globalAlpha = STROKE_ALPHA * 0.9;
      context.fill();
    }
    for (const ring of rings) {
      const progress = ring.age / 28;
      context.beginPath();
      context.arc(ring.x, ring.y, ring.r + progress * 9, 0, Math.PI * 2);
      context.globalAlpha = STROKE_ALPHA * (1 - progress);
      context.stroke();
    }
    context.globalAlpha = 1;
  };

  const tick = (time: number) => {
    step(time);
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => { if (!frame && !still && !document.hidden) frame = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };

  const aim = (x: number, y: number) => { target = { x, y }; lastMove = performance.now(); };
  window.addEventListener('pointermove', (event) => { if (event.pointerType === 'mouse') aim(event.clientX, event.clientY); }, { passive: true });
  window.addEventListener('pointerdown', (event) => { if (event.pointerType !== 'mouse') aim(event.clientX, event.clientY); }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { target = null; });
  window.addEventListener('blur', () => { target = null; });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  window.addEventListener('resize', resize);

  resize();
  start();
}

export {};
