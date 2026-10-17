// Builds the MPC-CBF case study from the owner's paper
// "SNATUS: Safe Navigation with Accurate Tracking for Underactuated Slender-body Autonomous Underwater Vehicles"
// (2025 Eleventh Indian Control Conference, pp. 376–381), kept privately in
// src/content-drafts/projects/mpc-cbf-auv/. Figures were extracted from that PDF (extracted-Im*.{jpg,png}).
// Text and numbers follow the paper; list title/summary/tags/year are the owner's originals.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const SITE = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const require = createRequire(SITE + '/package.json');
const sharp = require('sharp');
const slug = 'mpc-cbf-auv';
const drafts = `${SITE}/src/content-drafts/projects/${slug}`;
const pub = `${SITE}/public/projects/${slug}`;
const esc = (s) => s.replace(/"/g, '&quot;');

// PDF image name → figure file. Only the essential figures are used (owner, 2026-10-16): the architecture,
// tracking, avoidance, and avoidance in a current. The speed/yaw plots (Figs. 3, 5, 7, 9) and the
// current lawn-mower run (Fig. 6) are left out; their key numbers are quoted in the text.
const figures = {
  'Im1.jpg': 'fig1-architecture',
  'Im2.png': 'fig2-lawn-mowing',
  'Im4.png': 'fig4-three-obstacles',
  'Im8.png': 'fig8-obstacle-current'
};fs.mkdirSync(`${pub}/images`, { recursive: true });
fs.mkdirSync(`${pub}/display`, { recursive: true });
for (const [source, name] of Object.entries(figures)) {
  await sharp(`${drafts}/extracted-${source}`).flatten({ background: '#ffffff' }).png().toFile(`${pub}/images/${name}.png`);
  await sharp(`${pub}/images/${name}.png`).webp({ quality: 88 }).toFile(`${pub}/display/${name}.webp`);
}
// List thumbnail (same size as the other studies): the three-obstacle run.
await sharp(`${pub}/images/fig4-three-obstacles.png`).extract({ left: 260, top: 230, width: 1440, height: 951 })
  .resize(1120, 740).webp({ quality: 82 }).toFile(`${SITE}/public/thumbs/${slug}.webp`);

let n = 0;
async function fig(file, caption, inGroup = false) {
  const url = `/projects/${slug}/images/${file}`;
  const meta = await sharp(`${SITE}/public${url}`).metadata();
  n++;
  const style = inGroup ? ` style="--ar: ${(meta.width / meta.height).toFixed(4)}"` : '';
  return `<figure className="study-figure"${style}>
  <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open original image: ${esc(caption)}">
    <img src="${url.replace('/images/', '/display/').replace(/\.png$/, '.webp')}" alt="${esc(caption)}" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async" />
  </a>
  <figcaption><span className="figure-number">Fig. ${String(n).padStart(2, '0')}</span> ${caption}</figcaption>
</figure>`;
}
async function group(items) {
  const figs = [];
  for (const [file, caption] of items) figs.push(await fig(file, caption, true));
  return `<div className="figure-group figure-group-${items.length}">\n${figs.join('\n')}\n</div>`;
}

const body = [
  '## Overview',
  'Slender-body AUVs are efficient and agile but **underactuated**: heading changes only through the rudder and propeller, both with hard limits. SNATUS (Safe Navigation with Accurate Tracking for Underactuated Slender-body AUVs) splits the problem in two. A **Nonlinear Model Predictive Controller (NMPC)** tracks the trajectory within the actuator limits, using the prediction and constraint handling that PID, sliding-mode, adaptive and fuzzy controllers lack, and a **higher-order Control Barrier Function (CBF)** filters its commands to guarantee collision avoidance. The paper describes this as the first use of NMPC with higher-order CBFs on slender-body AUVs.',

  '## Vehicle Model',
  String.raw`The horizontal-plane (3-DoF) subsystem of the [6-DoF vehicle model](/projects/auv-dynamics-modeling/) is used, with propeller speed and rudder angle as inputs:`,
  String.raw`$$
x = \begin{bmatrix} u & v & r & x & y & \psi \end{bmatrix}^{T},
\qquad
\mathbf{u} = \begin{bmatrix} n_{\text{prop}} & \delta_r \end{bmatrix}^{T},
\qquad
\dot{x} = f(x) + g(x)\,\mathbf{u}
$$`,
  String.raw`$f(x)$ holds the nonlinear hydrodynamics (drag, damping and surge–sway–yaw coupling) and $g(x)$ maps propeller thrust and rudder force onto the states. Ocean currents of speed $U_c$ and sideslip $\beta_c$ enter through relative velocities $u_r = u - u_c$, $v_r = v - v_c$, adding a disturbance term $g_2(x,\mathbf{u})\,w$ with $w = [\,u_c \;\; v_c\,]^T$.`,

  '## SNATUS Architecture',
  'Reference speed and heading go to the NMPC. Its rudder and propeller commands pass through the CBF filter, which changes them only when a collision is possible, and the vehicle states feed back to both.',
  ['fig', 'fig1-architecture.png', 'SNATUS architecture: NMPC for tracking, followed by the CBF safety filter'],

  '## NMPC for Tracking',
  String.raw`Over a horizon $N_p$, the NMPC minimises tracking error (speed, heading and yaw rate), control effort and changes in the controls, within the actuator limits:`,
  String.raw`$$
J = \sum_{i=0}^{N_p-1}\Big( e_{x,i}^{T} W_x\, e_{x,i} + \mathbf{u}_i^{T} W_u\, \mathbf{u}_i + \Delta\mathbf{u}_i^{T} W_{sm}\, \Delta\mathbf{u}_i \Big),
\qquad
-0.5 \le \delta_{r} \le 0.5\ \text{rad},\quad 0 \le n \le 1550\ \text{RPM}
$$`,
  String.raw`The smoothness term $\Delta\mathbf{u}_i$ discourages abrupt rudder and propeller changes. My reading: for an underactuated vehicle it matters as much as tracking, since a jittery rudder wastes energy and excites the coupled sway–yaw dynamics.`,

  '## Higher-Order CBF for Safety',
  String.raw`For an obstacle at $(x_{\text{obs}}, y_{\text{obs}})$ and safety radius $\delta_{\text{safe}}$, the vehicle is safe while $h(x) \ge 0$; keeping this set forward invariant means it never comes closer than $\delta_{\text{safe}}$:`,
  String.raw`$$
h(x) = (x - x_{\text{obs}})^2 + (y - y_{\text{obs}})^2 - \delta_{\text{safe}}^2
$$`,
  String.raw`The inputs do not appear in $\dot h$ (relative degree 2), so a higher-order CBF chains two conditions with gains $K_1, K_2 > 0$, giving a constraint linear in the inputs:`,
  String.raw`$$
\psi_1 = \dot{h} + K_1 h,\quad \dot{\psi}_1 + K_2\,\psi_1 \ge 0
\;\;\Longrightarrow\;\;
L_f^2 h + L_g L_f h\,\mathbf{u} + (K_1 + K_2)\,L_f h + K_1 K_2\, h \ge 0
$$`,
  'The applied command is the one closest to the NMPC’s that satisfies this constraint and the actuator limits:',
  String.raw`$$
\mathbf{u}^{*} = \arg\min_{\mathbf{u}} \big\lVert \mathbf{u} - \mathbf{u}_{\text{NMPC}} \big\rVert^{2}
\quad \text{s.t. the HOCBF constraint and actuator limits}
$$`,
  String.raw`With currents, the constraint gains the term $L_{g_2} L_f h \cdot w$.`,

  '## Simulation Setup',
  String.raw`Simulated in Python (NumPy, SciPy) with the hydrodynamic coefficients of the [AUV dynamics study](/projects/auv-dynamics-modeling/), a reference speed of 2 m/s, obstacles of radius 3 m with $\delta_{\text{safe}} = 10$ m (positions assumed from a forward-looking sonar, as in [EROAS](/projects/eroas/)), and a constant current $U_c = 0.1$ m/s at $\beta_c = 170^\circ$.`,

  '## Results',
  '**Tracking.** The lawn-mower path is followed with smooth turns. The vehicle reaches and holds the 2 m/s reference speed, even through the turns, with a speed error of about 0.009 m/s.',
  '**Obstacles.** The AUV swerves smoothly around three obstacles in turn, keeps the safety distance and realigns with the reference after each, with heading changes free of abrupt jumps.',
  '**Ocean current.** Under the 0.1 m/s current, tracking deviates only slightly (speed error about 0.015 m/s), and a single obstacle is still avoided with the safety buffer intact. The avoidance path differs slightly from the no-current case, and the surge speed stays close to nominal.',
  ['group', [
    ['fig2-lawn-mowing.png', 'Lawn-mower tracking: reference (dashed) and AUV (solid)'],
    ['fig4-three-obstacles.png', 'Avoiding three obstacles in sequence'],
    ['fig8-obstacle-current.png', 'Avoiding an obstacle in a 0.1 m/s current']
  ]],

  '## Takeaways and Limits',
  `- **Tracking and safety, separated.** The NMPC handles prediction, actuator limits and smoothness; the higher-order CBF intervenes only near obstacles, and minimally.
- **Relative degree handled properly.** A first-order CBF cannot act on the rudder and propeller directly; the higher-order form is what makes the guarantee apply to this vehicle.
- **Scope (my reading).** A 3-DoF model, known obstacle positions, a constant current and simulation only. The paper’s next step is full 6-DoF, three-dimensional avoidance under time-varying currents.`
];

const out = [];
for (const b of body) {
  if (typeof b === 'string') out.push(b);
  else if (b[0] === 'fig') out.push(await fig(b[1], b[2]));
  else out.push(await group(b[1]));
}
const sections = body.filter((b) => typeof b === 'string' && b.startsWith('## ')).map((b) => b.slice(3));
const front = {
  title: 'MPC-CBF Framework for AUV Obstacle Avoidance',
  studyTitle: 'SNATUS: Safe Navigation with Accurate Tracking for Underactuated Slender-body Autonomous Underwater Vehicles',
  summary: 'Model Predictive Control with Control Barrier Functions for safe navigation',
  kind: 'full', year: 2024, status: 'Published',
  domain: 'MPC',
  tags: ['MPC', 'CBF', 'Safety', 'Control Theory'],
  links: [{ label: 'Paper (ICC 2025)', url: 'https://doi.org/10.1109/ICC69100.2025.11372255' }],
  info: { institution: 'Indian Institute of Science (IISc), Bengaluru' },
  relatedWork: [{ title: 'Abhishek Nair, Rajini Makam, Pruthviraj Mane, Rudrashis Majumder, Suresh Sundaram — SNATUS: Safe Navigation with Accurate Tracking for Underactuated Slender-body Autonomous Underwater Vehicles. 2025 Eleventh Indian Control Conference (ICC), pp. 376–381', url: 'https://doi.org/10.1109/ICC69100.2025.11372255' }],
  preview: { url: `/thumbs/${slug}.webp`, alt: 'MPC-CBF Framework for AUV Obstacle Avoidance preview', caption: 'Model Predictive Control with Control Barrier Functions for safe navigation' },
  lead: 'Developed a hybrid MPC-CBF control framework ensuring safe obstacle avoidance while maintaining optimal trajectory for underwater vehicles.',
  sections
};
const yaml = Object.entries(front).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
fs.writeFileSync(`${SITE}/src/content/projects/${slug}.mdx`, `---\n${yaml}\n---\n\n${out.join('\n\n')}\n`);
console.log('written', n, 'figures', sections.length, 'sections');
