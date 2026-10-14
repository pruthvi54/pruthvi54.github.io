// Background: a simulated AUV heads for a goal that keeps moving to new places. Small fish drift
// through the water, anemones release more fish when hovered, and the visitor's cursor is an
// obstacle too; a control barrier function (CBF) safety filter keeps the vehicle clear of all of them.
//
// Vehicle: unicycle  ẋ = v cos ψ,  ẏ = v sin ψ,  ψ̇ = ω,  with forward speed v ≥ 0 and a minimum
// turning radius R_turn (|ω| ≤ v / R_turn). Control is applied to a look-ahead point
//   p_l = p + L [cos ψ, sin ψ],   ṗ_l = u,   v = e_ψ·u,   ω = e_⊥·u / L,
// which behaves exactly like a single integrator, so the CBF on p_l is exact.
// One barrier per obstacle i (radius padded by the hull so the whole body stays clear):
//   h_i = ‖p_l − c_i‖² − (R_i + PAD)²,  a_i = 2(p_l − c_i),  a_i·u ≥ b_i = −α h_i + a_i·ċ_i
// Turning-radius limit, also linear in u:   (L / R_turn) (e_ψ·u) ± (e_⊥·u) ≥ 0
// CBF-QP:  min ‖u − u_nom‖²  subject to all of the above. In 2D the optimum has at most two
// active constraints, so it is solved exactly by checking u_nom, each single projection and
// each pairwise intersection.
// Pauses while the tab is hidden; reduced motion gets a still frame.

const CRUISE = 46;           // px/s
const MAX_SPEED = 150;       // px/s cap while evading
const REVERSE_SPEED = 22;    // px/s: slowest-gear reverse used to back away
const TURN_RADIUS = 45;      // px: tightest turn the vehicle can make
const LOOKAHEAD = 12;        // px: control point ahead of the hull centre
const PAD = 22;              // px added to every safety radius so the whole hull (nose to fins) stays outside
const MARGIN = 70;           // px from the viewport's side and bottom edges
const TOP = 150;             // px kept clear at the top for the header
const CURSOR_RADIUS = 70;    // px safety radius around the cursor
const FISH_RADIUS = 20;      // px safety radius around each fish
const FISH_DENSITY = 1 / 90000;  // resident fish per px² of viewport
const MIN_FISH = 5;
const MAX_EXTRA_FISH = 20;   // fish hatched from generators, on top of the residents
const GENERATOR_RADIUS = 24; // px: hover area of each anemone, and its safety radius for the AUV
const HATCH_FIRST = 1000;    // ms of hovering before the first fish comes out
const HATCH_NEXT = 3000;     // ms between further fish while still hovering
// Generator positions as fractions of the viewport (side margins and lower area, away from the text column).
const GENERATORS: Point[] = [{ x: 0.045, y: 0.62 }, { x: 0.955, y: 0.4 }, { x: 0.82, y: 0.9 }];
const ALPHA = 1.4;           // CBF class-K gain (1/s); lower reacts earlier, which a turn-limited vehicle needs
const TRAIL_SECONDS = 22;    // how long the wake lingers
const GOAL_TIMEOUT = 45000;  // ms before an unreachable goal is moved
const IDLE_RELEASE = 8000;   // ms without pointer movement before the cursor stops being an obstacle
const FADE = 0.68;           // overall strength of the background drawing

type Point = { x: number; y: number };
type Obstacle = { x: number; y: number; vx: number; vy: number; r: number; fish: boolean };
type Generator = { x: number; y: number; hoverSince: number; hatched: number; phase: number };
type Fish = { x: number; y: number; heading: number; speed: number; turn: number; size: number; phase: number };
type Constraint = { ax: number; ay: number; b: number };

const canvas = document.querySelector<HTMLCanvasElement>('.backdrop');
const context = canvas?.getContext('2d');

// Largest amount by which u misses any constraint (0 when u satisfies them all).
function violationOf(u: Point, constraints: Constraint[]): number {
  return constraints.reduce((worst, c) => Math.max(worst, c.b - (c.ax * u.x + c.ay * u.y)), 0);
}

// Exact solution of min ‖u − u0‖² s.t. a_i·u ≥ b_i (2D). Falls back to the least-violating candidate.
function safeControl(u0: Point, constraints: Constraint[]): Point {
  const violation = (u: Point) => violationOf(u, constraints);
  if (violation(u0) <= 1e-6) return u0;
  const candidates: Point[] = [{ x: 0, y: 0 }];
  for (const c of constraints) {
    const norm = c.ax * c.ax + c.ay * c.ay;
    if (norm < 1e-9) continue;
    const gap = (c.b - (c.ax * u0.x + c.ay * u0.y)) / norm;
    if (gap > 0) candidates.push({ x: u0.x + gap * c.ax, y: u0.y + gap * c.ay });
  }
  for (let i = 0; i < constraints.length; i++) {
    for (let j = i + 1; j < constraints.length; j++) {
      const p = constraints[i];
      const q = constraints[j];
      const det = p.ax * q.ay - p.ay * q.ax;
      if (Math.abs(det) < 1e-9) continue;
      candidates.push({ x: (p.b * q.ay - p.ay * q.b) / det, y: (p.ax * q.b - p.b * q.ax) / det });
    }
  }
  let best: Point | null = null;
  let bestCost = Infinity;
  let fallback = u0;
  let fallbackViolation = violation(u0);
  for (const u of candidates) {
    const v = violation(u);
    const cost = (u.x - u0.x) ** 2 + (u.y - u0.y) ** 2;
    if (v <= 1e-6 && cost < bestCost) { best = u; bestCost = cost; }
    if (v < fallbackViolation) { fallback = u; fallbackViolation = v; }
  }
  return best ?? fallback;
}

if (canvas && context) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const styles = getComputedStyle(document.documentElement);
  const colour = styles.getPropertyValue('--trace').trim() || '#426358';
  const metaFont = styles.getPropertyValue('--font-meta').trim() || 'monospace';
  const debug = new URLSearchParams(location.search).has('cbf-debug');

  let width = 0;
  let height = 0;
  const auv = { x: 0, y: 0, heading: 0, speed: 0, turnRate: 0 };
  let goal: Point = { x: 0, y: 0 };
  let goalSince = 0;
  let goalsReached = 0;
  let arrival = 0;           // eased pulse when a goal is reached
  let arrivalAt: Point = { x: 0, y: 0 };
  let fish: Fish[] = [];
  let residents = 0;          // default population; hatched fish come on top and are not replaced
  let generators: Generator[] = [];
  let hatchedTotal = 0;
  const trail: { x: number; y: number; t: number }[] = [];
  let cursor: Point | null = null;
  let cursorVelocity: Point = { x: 0, y: 0 };
  let lastMove = 0;
  let active: Obstacle[] = [];   // obstacles constraining the vehicle this frame
  let filterActive = 0;
  let sidestep = 0;
  let detourSide = 0;            // ±1 while following an obstacle's edge
  let reverseUntil = 0;          // reverse gear is held until this time
  let reverseTurn = 1;
  let minClearance = Infinity;   // debug: smallest hull-centre distance minus safety radius
  let minClearanceInfo = '';     // debug: when and against what it happened
  let tightestTurn = Infinity;   // debug: smallest turning radius actually flown (px)
  let frame = 0;
  let lastTime = 0;

  const random = (min: number, max: number) => min + Math.random() * (max - min);
  const top = () => Math.min(TOP, height * 0.3);
  const nose = () => ({ x: auv.x + LOOKAHEAD * Math.cos(auv.heading), y: auv.y + LOOKAHEAD * Math.sin(auv.heading) });

  const newGoal = (time: number) => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const candidate = { x: random(MARGIN, width - MARGIN), y: random(top(), height - MARGIN) };
      const clearOfRocks = generators.every((g) => Math.hypot(candidate.x - g.x, candidate.y - g.y) > GENERATOR_RADIUS + PAD + 30 + 2 * TURN_RADIUS);
      if ((clearOfRocks && Math.hypot(candidate.x - auv.x, candidate.y - auv.y) > Math.min(width, height) * 0.45) || attempt === 29) {
        goal = candidate;
        break;
      }
    }
    goalSince = time;
  };

  const spawnFish = (anywhere: boolean): Fish => {
    const size = random(7, 12);
    const speed = random(10, 22);
    if (anywhere) {
      // Initial placement: anywhere in the water, but never on top of the vehicle or an anemone.
      let x = 0;
      let y = 0;
      for (let attempt = 0; attempt < 40; attempt++) {
        x = random(0, width);
        y = random(top(), height);
        const clear = Math.hypot(x - auv.x, y - auv.y) > FISH_RADIUS + PAD + 90
          && generators.every((g) => Math.hypot(x - g.x, y - g.y) > GENERATOR_RADIUS + 20);
        if (clear) break;
      }
      return { x, y, heading: random(-Math.PI, Math.PI), speed, turn: 0, size, phase: random(0, 6.28) };
    }
    const fromLeft = Math.random() < 0.5;
    return {
      x: fromLeft ? -20 : width + 20,
      y: random(top(), height - 20),
      heading: (fromLeft ? 0 : Math.PI) + random(-0.35, 0.35),
      speed, turn: 0, size, phase: random(0, 6.28)
    };
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    generators = GENERATORS.map((g, i) => ({
      x: Math.round(g.x * width),
      y: Math.round(Math.max(top() + 30, g.y * height)),
      hoverSince: generators[i]?.hoverSince ?? 0,
      hatched: generators[i]?.hatched ?? 0,
      phase: generators[i]?.phase ?? random(0, 6.28)
    }));
    const extra = Math.max(0, fish.length - residents);
    residents = Math.max(MIN_FISH, Math.round(width * height * FISH_DENSITY));
    while (fish.length < residents + extra) fish.push(spawnFish(true));
    fish = fish.slice(0, residents + extra);
    auv.x = Math.min(Math.max(auv.x, MARGIN), width - MARGIN);
    auv.y = Math.min(Math.max(auv.y, top()), height - MARGIN);
    goal = { x: Math.min(goal.x, width - MARGIN), y: Math.min(Math.max(goal.y, top()), height - MARGIN) };
    draw(performance.now());
  };

  // Fish and anemones are both drawn with a ring while they bind (fish: true); the cursor has its own ring.
  const obstacles = (): Obstacle[] => {
    const list: Obstacle[] = fish.map((f) => ({
      x: f.x, y: f.y, vx: Math.cos(f.heading) * f.speed, vy: Math.sin(f.heading) * f.speed, r: FISH_RADIUS, fish: true
    }));
    for (const g of generators) list.push({ x: g.x, y: g.y, vx: 0, vy: 0, r: GENERATOR_RADIUS, fish: true });
    if (cursor) list.push({ x: cursor.x, y: cursor.y, vx: cursorVelocity.x, vy: cursorVelocity.y, r: CURSOR_RADIUS, fish: false });
    return list;
  };

  const hatch = (g: Generator) => {
    if (fish.length - residents >= MAX_EXTRA_FISH) return;
    // Never release a fish on top of the vehicle; it will come out a moment later instead.
    if (Math.hypot(auv.x - g.x, auv.y - g.y) < FISH_RADIUS + PAD + 12) return;
    // Swim out towards the middle of the screen, with some spread.
    const heading = Math.atan2(height / 2 - g.y, width / 2 - g.x) + random(-0.7, 0.7);
    fish.push({ x: g.x, y: g.y, heading, speed: random(14, 24), turn: 0, size: random(7, 11), phase: random(0, 6.28) });
    g.hatched++;
    hatchedTotal++;
  };

  // Hover over an anemone: first fish after HATCH_FIRST, then one every HATCH_NEXT while the cursor stays.
  const stepGenerators = (time: number) => {
    for (const g of generators) {
      const over = cursor && Math.hypot(cursor.x - g.x, cursor.y - g.y) < GENERATOR_RADIUS;
      if (!over) { g.hoverSince = 0; g.hatched = 0; continue; }
      if (!g.hoverSince) g.hoverSince = time;
      const due = HATCH_FIRST + g.hatched * HATCH_NEXT;
      if (time - g.hoverSince >= due) hatch(g);
    }
  };

  // Progress of the current hatch (0–1) for the hover ring.
  const hatchProgress = (g: Generator, time: number) => {
    if (!g.hoverSince) return 0;
    const elapsed = time - g.hoverSince;
    if (g.hatched === 0) return Math.min(1, elapsed / HATCH_FIRST);
    return Math.min(1, (elapsed - HATCH_FIRST - (g.hatched - 1) * HATCH_NEXT) / HATCH_NEXT);
  };

  const stepFish = (dt: number, time: number) => {
    for (let i = 0; i < fish.length; i++) {
      const f = fish[i];
      // Slow wandering: the turn rate drifts smoothly.
      f.turn += random(-1, 1) * dt * 0.8;
      f.turn *= 0.98;
      f.heading += f.turn * dt + Math.sin(time / 1500 + f.phase) * 0.15 * dt;
      // Fish shy away from the vehicle when it comes close.
      const dx = f.x - auv.x;
      const dy = f.y - auv.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 110) {
        let away = Math.atan2(dy, dx) - f.heading;
        away = Math.atan2(Math.sin(away), Math.cos(away));
        f.heading += away * Math.min(1, dt * 2.5) * (1 - distance / 110);
      }
      f.x += Math.cos(f.heading) * f.speed * dt;
      f.y += Math.sin(f.heading) * f.speed * dt;
      // Keep them in the water below the header.
      if (f.y < top()) f.heading += (Math.sin(f.heading) < 0 ? 1 : 0) * dt * 1.5;
      if (f.y > height - 10) f.heading -= (Math.sin(f.heading) > 0 ? 1 : 0) * dt * 1.5;
      if (f.x < -40 || f.x > width + 40 || f.y < -40 || f.y > height + 40) {
        // Residents are replaced by a newcomer; hatched extras simply leave.
        if (fish.length > residents) { fish.splice(i, 1); i--; } else fish[i] = spawnFish(false);
      }
    }
  };

  const step = (dt: number, time: number) => {
    if (cursor && time - lastMove > IDLE_RELEASE) cursor = null;
    stepFish(dt, time);
    stepGenerators(time);
    arrival = Math.max(0, arrival - dt * 0.8);

    const forward = { x: Math.cos(auv.heading), y: Math.sin(auv.heading) };
    const side = { x: -forward.y, y: forward.x };
    const p = nose();
    const gx = goal.x - p.x;
    const gy = goal.y - p.y;
    const toGoal = Math.hypot(gx, gy);
    if (toGoal < 12 || time - goalSince > GOAL_TIMEOUT) {
      if (toGoal < 12) { goalsReached++; arrival = 1; arrivalAt = { ...goal }; }
      newGoal(time);
    }

    const all = obstacles();

    // Detour: if the straight line to the goal runs through a nearby safety circle, follow that
    // circle's edge (on a consistent side) until the way is clear, instead of pushing head-on.
    let desired = { x: gx, y: gy };
    let blocker: Obstacle | null = null;
    let blockerDistance = Infinity;
    for (const o of all) {
      // Plan around the cursor and anemones; small moving fish are left to the safety filter
      // (they also swerve away from the vehicle), otherwise every passing fish would cause a detour.
      if (o.fish && o.r !== GENERATOR_RADIUS) continue;
      const radius = o.r + PAD + 30;
      const ox = o.x - p.x;
      const oy = o.y - p.y;
      const distance = Math.hypot(ox, oy);
      if (distance > radius + 200 || distance > toGoal) continue;
      const t = Math.max(0, Math.min(1, (ox * gx + oy * gy) / (toGoal * toGoal)));
      if (Math.hypot(ox - t * gx, oy - t * gy) < radius && distance < blockerDistance) { blocker = o; blockerDistance = distance; }
    }
    if (blocker) {
      // Aim along the tangent line to the circle; on (or inside) the circle that is its edge direction.
      const radius = blocker.r + PAD + 30;
      const dx = (blocker.x - p.x) / blockerDistance;
      const dy = (blocker.y - p.y) / blockerDistance;
      const beta = Math.asin(Math.min(1, radius / blockerDistance));
      const rotate = (sign: number) => ({
        x: dx * Math.cos(sign * beta) - dy * Math.sin(sign * beta),
        y: dx * Math.sin(sign * beta) + dy * Math.cos(sign * beta)
      });
      if (!detourSide) {
        const left = rotate(1);
        const right = rotate(-1);
        detourSide = left.x * gx + left.y * gy >= right.x * gx + right.y * gy ? 1 : -1;
      }
      const outward = Math.max(0, (radius - blockerDistance) / radius); // drift outwards if inside the band
      const tangent = rotate(detourSide);
      desired = { x: tangent.x - dx * outward * 2, y: tangent.y - dy * outward * 2 };
    } else {
      detourSide = 0;
    }

    // Nominal control: turn towards the desired direction at the tightest allowed rate, then cruise straight.
    // If the goal sits inside the turning circle behind us, run straight to open the distance first.
    const bearing = Math.atan2(desired.x * side.x + desired.y * side.y, desired.x * forward.x + desired.y * forward.y);
    const cone = LOOKAHEAD / TURN_RADIUS;            // max |lateral| / forward ratio
    const cruise = CRUISE * Math.min(1, 0.45 + toGoal / 200);
    let lateral = Math.max(-cone, Math.min(cone, Math.tan(Math.max(-1.2, Math.min(1.2, bearing)))));
    // A goal inside the circle the nose would trace at full turn can never be reached by turning:
    // run straight until it is outside that circle, then turn in.
    if (!blocker) {
      const turnSign = bearing >= 0 ? 1 : -1;
      const centreX = p.x + side.x * turnSign * (TURN_RADIUS + LOOKAHEAD);
      const centreY = p.y + side.y * turnSign * (TURN_RADIUS + LOOKAHEAD);
      if (Math.hypot(goal.x - centreX, goal.y - centreY) < TURN_RADIUS + LOOKAHEAD + 4) lateral = 0;
    }
    let nominal = {
      x: cruise * (forward.x + lateral * side.x),
      y: cruise * (forward.y + lateral * side.y)
    };

    const constraints: Constraint[] = [
      // Turning-radius limit (and no reversing): cone·(e_ψ·u) ± (e_⊥·u) ≥ 0.
      { ax: cone * forward.x + side.x, ay: cone * forward.y + side.y, b: 0 },
      { ax: cone * forward.x - side.x, ay: cone * forward.y - side.y, b: 0 }
    ];
    active = [];
    let closest: Obstacle | null = null;
    let closestH = Infinity;
    for (const o of all) {
      const centreDistance = Math.hypot(auv.x - o.x, auv.y - o.y);
      if (debug && centreDistance - o.r < minClearance) {
        minClearance = centreDistance - o.r;
        minClearanceInfo = `${o.fish ? (o.r === GENERATOR_RADIUS ? 'anemone' : 'fish') : 'cursor'} at ${Math.round(time)}ms, engaged ${filterActive.toFixed(2)}`;
      }
      const distance = Math.hypot(p.x - o.x, p.y - o.y);
      const radius = o.r + PAD;
      if (distance > radius * 3 + 80) continue; // far away: the constraint cannot bind
      const ax = 2 * (p.x - o.x);
      const ay = 2 * (p.y - o.y);
      const h = distance ** 2 - radius ** 2;
      constraints.push({ ax, ay, b: -ALPHA * h + ax * o.vx + ay * o.vy });
      if (h < closestH) { closestH = h; closest = o; }
    }
    let u = safeControl(nominal, constraints);
    const engaged = u !== nominal;
    // Head-on stall: steer to one side of the nearest obstacle at the tightest turn, then re-filter.
    if (engaged && closest && Math.hypot(u.x, u.y) < CRUISE * 0.3) {
      if (!sidestep) sidestep = ((p.x - closest.x) * gy - (p.y - closest.y) * gx) >= 0 ? 1 : -1;
      nominal = { x: CRUISE * 0.6 * (forward.x + sidestep * cone * side.x), y: CRUISE * 0.6 * (forward.y + sidestep * cone * side.y) };
      u = safeControl(nominal, constraints);
    }
    if (!engaged) sidestep = 0;

    // Reverse gear. Going forward can be impossible: pinned at a boundary with the nose angled in, or
    // the cursor dropped right in front so its circle already encloses the vehicle. Then also solve
    // the same QP for reverse (turning limit mirrored, speed ≥ −REVERSE_SPEED) and back off while
    // turning towards the way round, holding reverse briefly so it does not dither.
    const reverseConstraints: Constraint[] = [
      { ax: -cone * forward.x + side.x, ay: -cone * forward.y + side.y, b: 0 },
      { ax: -cone * forward.x - side.x, ay: -cone * forward.y - side.y, b: 0 },
      { ax: forward.x, ay: forward.y, b: -REVERSE_SPEED },
      ...constraints.slice(2)
    ];
    // Decide on what would actually happen: forward speed is clamped at 0, so a forward command
    // pointing backwards (common when no command is fully safe) would leave the vehicle stopped.
    const forwardStuck = u.x * forward.x + u.y * forward.y < 2;
    if (time < reverseUntil || (engaged && forwardStuck)) {
      if (time >= reverseUntil) reverseTurn = bearing >= 0 ? 1 : -1; // ψ̇ = ω, so turn towards the target side
      const back = {
        x: REVERSE_SPEED * (-forward.x + reverseTurn * cone * side.x),
        y: REVERSE_SPEED * (-forward.y + reverseTurn * cone * side.y)
      };
      const reverse = safeControl(back, reverseConstraints);
      const reverseSpeed = reverse.x * forward.x + reverse.y * forward.y;
      if (time < reverseUntil || reverseSpeed < -2) {
        if (time >= reverseUntil) reverseUntil = time + 1200;
        u = reverse;
      }
    }

    if (engaged) {
      for (const o of all) {
        if (!o.fish && !cursor) continue;
        const radius = o.r + PAD;
        const ax = 2 * (p.x - o.x);
        const ay = 2 * (p.y - o.y);
        const h = (p.x - o.x) ** 2 + (p.y - o.y) ** 2 - radius ** 2;
        if (ax * u.x + ay * u.y <= -ALPHA * h + ax * o.vx + ay * o.vy + 1) active.push(o);
      }
    }
    filterActive += ((engaged ? 1 : 0) - filterActive) * Math.min(1, dt * 4);

    // Map the look-ahead velocity to forward speed and turn rate, then integrate the unicycle.
    let speed = u.x * forward.x + u.y * forward.y;
    let turnRate = (u.x * side.x + u.y * side.y) / LOOKAHEAD;
    speed = Math.max(time < reverseUntil ? -REVERSE_SPEED : 0, Math.min(MAX_SPEED, speed));
    const maxTurn = Math.abs(speed) / TURN_RADIUS;
    turnRate = Math.max(-maxTurn, Math.min(maxTurn, turnRate));
    // Smooth the commands a little so the hull does not jitter.
    auv.speed += (speed - auv.speed) * Math.min(1, dt * 8);
    auv.turnRate += (turnRate - auv.turnRate) * Math.min(1, dt * 8);
    const turnLimit = Math.abs(auv.speed) / TURN_RADIUS;
    auv.turnRate = Math.max(-turnLimit, Math.min(turnLimit, auv.turnRate));
    if (debug && Math.abs(auv.turnRate) > 1e-3 && Math.abs(auv.speed) > 5) tightestTurn = Math.min(tightestTurn, Math.abs(auv.speed) / Math.abs(auv.turnRate));
    auv.heading += auv.turnRate * dt;
    auv.x += auv.speed * Math.cos(auv.heading) * dt;
    auv.y += auv.speed * Math.sin(auv.heading) * dt;

    const last = trail[trail.length - 1];
    if (!last || Math.hypot(auv.x - last.x, auv.y - last.y) > 3) trail.push({ x: auv.x, y: auv.y, t: time });
    while (trail.length && time - trail[0].t > TRAIL_SECONDS * 1000) trail.shift();
  };

  const drawFish = (f: Fish, time: number) => {
    context.save();
    context.translate(f.x, f.y);
    context.rotate(f.heading);
    const wag = Math.sin(time / 180 + f.phase) * 0.35;
    context.globalAlpha = 0.26 * FADE;
    context.beginPath();
    context.ellipse(0, 0, f.size * 0.55, f.size * 0.22, 0, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(-f.size * 0.45, 0);
    context.lineTo(-f.size * 0.9, -f.size * 0.25 + wag * 2);
    context.lineTo(-f.size * 0.9, f.size * 0.25 + wag * 2);
    context.closePath();
    context.fill();
    context.restore();
  };

  // Anemone: a small mound with swaying tentacles; a ring fills while it is about to release a fish.
  const drawGenerator = (g: Generator, time: number) => {
    context.save();
    context.translate(g.x, g.y);
    const progress = hatchProgress(g, time);
    context.save();
    context.scale(1.3, 1.3);
    const hovered = g.hoverSince > 0;
    context.globalAlpha = (hovered ? 0.4 : 0.24) * FADE;
    context.lineWidth = 1.2;
    for (let i = 0; i < 7; i++) {
      const base = -Math.PI / 2 + (i - 3) * 0.36;
      const sway = Math.sin(time / 900 + g.phase + i * 0.7) * 0.25;
      const length = 11 + (i % 3) * 3;
      const bx = Math.cos(base) * 5;
      const by = Math.sin(base) * 5 + 4;
      context.beginPath();
      context.moveTo(bx, by);
      context.quadraticCurveTo(
        bx + Math.cos(base + sway) * length * 0.6, by + Math.sin(base + sway) * length * 0.6,
        bx + Math.cos(base + sway * 2) * length, by + Math.sin(base + sway * 2) * length
      );
      context.stroke();
    }
    context.beginPath();
    context.ellipse(0, 5, 8, 4, 0, Math.PI, 0);
    context.fill();
    context.restore();
    if (progress > 0) {
      context.globalAlpha = 0.35 * FADE;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(0, 0, GENERATOR_RADIUS - 2, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
      context.stroke();
    }
    context.restore();
  };

  const draw = (time: number) => {
    context.clearRect(0, 0, width, height);
    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineCap = 'round';
    context.lineWidth = 1;

    // Goal: a small crosshair with a slowly breathing ring; dashed line from the vehicle.
    context.setLineDash([3, 7]);
    context.globalAlpha = 0.09 * FADE;
    context.beginPath();
    context.moveTo(auv.x, auv.y);
    context.lineTo(goal.x, goal.y);
    context.stroke();
    context.setLineDash([]);
    const breathe = 7 + Math.sin(time / 600) * 1.5;
    context.globalAlpha = 0.3 * FADE;
    context.beginPath();
    context.arc(goal.x, goal.y, breathe, 0, Math.PI * 2);
    context.moveTo(goal.x - 4, goal.y); context.lineTo(goal.x + 4, goal.y);
    context.moveTo(goal.x, goal.y - 4); context.lineTo(goal.x, goal.y + 4);
    context.stroke();
    if (arrival > 0) {
      context.globalAlpha = 0.3 * FADE * arrival;
      context.beginPath();
      context.arc(arrivalAt.x, arrivalAt.y, 8 + (1 - arrival) * 26, 0, Math.PI * 2);
      context.stroke();
    }

    // Wake.
    context.lineWidth = 1.2;
    for (let i = 1; i < trail.length; i++) {
      const age = (time - trail[i].t) / (TRAIL_SECONDS * 1000);
      context.globalAlpha = 0.2 * FADE * (1 - age);
      context.beginPath();
      context.moveTo(trail[i - 1].x, trail[i - 1].y);
      context.lineTo(trail[i].x, trail[i].y);
      context.stroke();
    }
    context.lineWidth = 1;

    for (const g of generators) drawGenerator(g, time);
    for (const f of fish) drawFish(f, time);

    // Safety sets: the cursor's ring shows as the vehicle approaches; any obstacle's ring shows while it binds.
    context.setLineDash([2, 5]);
    if (cursor) {
      const distance = Math.hypot(auv.x - cursor.x, auv.y - cursor.y);
      const near = Math.max(0, Math.min(1, (CURSOR_RADIUS * 2.6 - distance) / (CURSOR_RADIUS * 1.4)));
      const binding = active.some((o) => !o.fish) ? filterActive : 0;
      const ring = Math.max(near * 0.6, binding);
      if (ring > 0.01) {
        context.globalAlpha = 0.22 * FADE * ring;
        context.beginPath();
        context.arc(cursor.x, cursor.y, CURSOR_RADIUS, 0, Math.PI * 2);
        context.stroke();
      }
    }
    for (const o of active) {
      if (!o.fish) continue;
      context.globalAlpha = 0.2 * FADE * filterActive;
      context.beginPath();
      context.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      context.stroke();
    }
    context.setLineDash([]);
    if (filterActive > 0.05) {
      context.globalAlpha = 0.4 * FADE * filterActive;
      context.font = `400 10px ${metaFont}`;
      context.fillText('CBF ACTIVE · h(x) ≥ 0', auv.x + 14, auv.y < 40 ? auv.y + 20 : auv.y - 12);
    }

    // Vehicle: forward-looking sonar cone, hull and tail fins.
    context.save();
    context.translate(auv.x, auv.y);
    context.rotate(auv.heading);
    const sweep = Math.sin(time / 700) * 0.12;
    context.globalAlpha = 0.045 * FADE;
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 92, -0.42 + sweep, 0.42 + sweep);
    context.closePath();
    context.fill();
    context.globalAlpha = 0.42 * FADE;
    context.beginPath();
    context.ellipse(0, 0, 8, 2.6, 0, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(-8, 0); context.lineTo(-11, -3.2);
    context.moveTo(-8, 0); context.lineTo(-11, 3.2);
    context.stroke();
    context.restore();
    context.globalAlpha = 1;
  };

  const tick = (time: number) => {
    const dt = Math.min(0.05, (time - (lastTime || time)) / 1000);
    lastTime = time;
    step(dt, time);
    draw(time);
    frame = requestAnimationFrame(tick);
  };
  const start = () => { if (!frame && !still && !document.hidden) { lastTime = 0; frame = requestAnimationFrame(tick); } };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };

  let previous: { x: number; y: number; t: number } | null = null;
  const aim = (x: number, y: number) => {
    const now = performance.now();
    if (previous && now > previous.t) {
      const dt = (now - previous.t) / 1000;
      // Smoothed cursor velocity feeds the moving-obstacle term a·ċ.
      cursorVelocity = {
        x: cursorVelocity.x * 0.7 + ((x - previous.x) / dt) * 0.3,
        y: cursorVelocity.y * 0.7 + ((y - previous.y) / dt) * 0.3
      };
    }
    previous = { x, y, t: now };
    cursor = { x, y };
    lastMove = now;
  };
  const release = () => { cursor = null; previous = null; cursorVelocity = { x: 0, y: 0 }; };
  window.addEventListener('pointermove', (event) => { if (event.pointerType === 'mouse') aim(event.clientX, event.clientY); }, { passive: true });
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    // Touch: tapping an anemone releases a fish straight away; anywhere else places the obstacle.
    const tapped = generators.find((g) => Math.hypot(event.clientX - g.x, event.clientY - g.y) < GENERATOR_RADIUS + 8);
    if (tapped) { hatch(tapped); return; }
    previous = null;
    aim(event.clientX, event.clientY);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', release);
  window.addEventListener('blur', release);
  // A resting cursor is a static obstacle: drop its velocity once the mouse stops.
  window.setInterval(() => { if (performance.now() - lastMove > 120) cursorVelocity = { x: 0, y: 0 }; }, 150);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  window.addEventListener('resize', resize);

  // Test hook (only with ?cbf-debug): lets the browser tests read the vehicle state.
  if (debug) {
    (window as unknown as { __auv: () => unknown }).__auv = () => ({
      x: auv.x, y: auv.y, heading: auv.heading, goal: { ...goal }, goalsReached, engaged: filterActive, fish: fish.length, residents,
      hatchedTotal, generators: generators.map((g) => ({ x: g.x, y: g.y })), minClearance, minClearanceInfo, tightestTurn, reversing: performance.now() < reverseUntil
    });
  }

  width = window.innerWidth;
  height = window.innerHeight;
  auv.x = width * 0.3;
  auv.y = top() + 40;
  resize();
  newGoal(performance.now());
  auv.heading = Math.atan2(goal.y - auv.y, goal.x - auv.x);
  start();
}

export {};
