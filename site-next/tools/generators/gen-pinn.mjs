// Builds the short PINN case study from the owner's paper
// "Safe Navigation of Autonomous Underwater Vehicles Using Physics-informed Neural Networks" (OCEANS 2024 Singapore),
// kept privately in src/content-drafts/projects/pinn-obstacle-avoidance/. Figures were extracted from that PDF.
// Text and numbers follow the paper; list title/summary/tags/year/status are the owner's originals.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const SITE = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const require = createRequire(SITE + '/package.json');
const sharp = require('sharp');
const slug = 'pinn-obstacle-avoidance';
const drafts = `${SITE}/src/content-drafts/projects/${slug}`;
const pub = `${SITE}/public/projects/${slug}`;
const esc = (s) => s.replace(/"/g, '&quot;');

// Originals (flattened onto white, as printed in the paper) and display WebP copies.
fs.mkdirSync(`${pub}/images`, { recursive: true });
fs.mkdirSync(`${pub}/display`, { recursive: true });
for (const f of fs.readdirSync(drafts).filter((f) => f.startsWith('extracted-'))) {
  const name = f.replace(/^extracted-/, '').replace(/\.(png|jpg)$/, '');
  await sharp(`${drafts}/${f}`).flatten({ background: '#ffffff' }).png().toFile(`${pub}/images/${name}.png`);
  await sharp(`${pub}/images/${name}.png`).webp({ quality: 88 }).toFile(`${pub}/display/${name}.webp`);
}
// List thumbnail (same size as the other studies).
await sharp(`${pub}/images/fig5-two-obstacles.png`).extract({ left: 20, top: 145, width: 640, height: 423 })
  .resize(1120, 740).webp({ quality: 82 }).toFile(`${SITE}/public/thumbs/${slug}.webp`);

let n = 0;
async function fig(file, caption, inGroup = false) {
  const url = `/projects/${slug}/images/${file}`;
  const meta = await sharp(`${SITE}/public${url}`).metadata();
  n++;
  const style = inGroup ? ` style="--ar: ${(meta.width / meta.height).toFixed(4)}"` : '';
  return `<figure className="study-figure"${style}>
  <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open original image: ${esc(caption)}">
    <img src="${url.replace('/images/', '/display/').replace(/\.(png|jpg)$/, '.webp')}" alt="${esc(caption)}" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async" />
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
  'Obstacle avoidance is a paramount concern for autonomous underwater vehicles (AUVs): visibility is limited, there is no GPS, and sonar suffers from noise and blind spots. Methods such as artificial potential fields and collision cones struggle in uncertain environments, and model predictive control is computationally heavy and gives no formal safety guarantee. A Control Barrier Function (CBF) does give that guarantee, but enforcing it usually means solving an optimisation problem at every control step.',
  'This work keeps the CBF’s safety guarantee and moves the heavy computation offline. The CBF-constrained optimisation is rewritten as a partial differential equation, and a Physics-Informed Neural Network (PINN), named **USAAPINN** (underwater sense-and-avoid PINN), learns its solution. At run time the controller only evaluates the trained network, which keeps the computation light when the environment is cluttered. The method targets the depth plane, where the AUV dives, holds depth and resurfaces while avoiding obstacles in its path.',

  '## Vehicle Model and Safe Set',
  'The AUV is treated as a point mass whose velocity is the control input. With position $x = [p_x, p_y, p_z]^T$ and velocity $u = [u_x, u_y, u_z]^T$, the model is the holonomic first-order system',
  String.raw`$$
\dot{x}(t) = u(t)
$$`,
  'Motion is restricted to the $x$–$z$ (depth) plane, so the $y$ component is dropped. For an obstacle point $(p_{xo}, p_{zo})$ detected by the onboard sensors, the barrier function is the distance to that point minus a tolerance $R$, set by how sharply the vehicle can manoeuvre:',
  String.raw`$$
b(x) = \sqrt{(p_x - p_{xo})^2 + (p_z - p_{zo})^2} \; - \; R
$$`,
  String.raw`The safe set is $\mathcal{C} = \{x : b(x) \ge 0\}$. The vehicle stays safe for all time if $b$ is never allowed to decrease faster than a class-$\mathcal{K}$ function of itself. The paper takes the simplest choice, a constant gain $\kappa$:`,
  String.raw`$$
\dot{b}(x) \;\ge\; -\kappa\, b(x)
$$`,
  'Far from the obstacle, where $b$ is large, the constraint is loose. As the vehicle approaches the boundary, where $b \\to 0$, it forces $b$ to stop decreasing, so the vehicle cannot cross into the obstacle.',

  '## From Optimisation to a PDE',
  'The control is chosen to use the least effort while respecting the safety constraint, a quadratic program (QP):',
  String.raw`$$
\begin{gathered}
\min_{u \in \mathcal{U}} \; \frac{1}{2}\int_0^{\infty} u^T u \, dt \\
\text{subject to} \quad \dot{x} = u, \quad \dot{b}(x) \ge -\kappa\, b(x)
\end{gathered}
$$`,
  String.raw`Instead of solving this QP online, it is posed as an optimal-control problem. The value function $V(x) = \inf_{u} J$ (the minimum cost-to-go) satisfies the Hamilton–Jacobi–Bellman (HJB) equation, with the barrier constraint added through a Lagrange multiplier $\alpha$:`,
  String.raw`$$
\sup_{u \in \mathcal{U}} \left[ -\frac{\partial V}{\partial x}\, u \;-\; \frac{1}{2} u^T u \;+\; \alpha\left(\dot{b} + \kappa b\right) \right] = 0
$$`,
  'Setting the derivative of the Hamiltonian with respect to $u$ to zero gives the optimal control directly from the value function:',
  String.raw`$$
\frac{\partial H}{\partial u} = -\left(\frac{\partial V}{\partial x}\right)^{T} - u^* = 0
\quad \Longrightarrow \quad
u^* = -\left(\frac{\partial V}{\partial x}\right)^{T}
$$`,
  'Substituting $u^*$ back leaves a PDE in $V$ alone, which is what USAAPINN solves:',
  String.raw`$$
\frac{1}{2}\left\lVert \frac{\partial V}{\partial x} \right\rVert^2 \;+\; \alpha\left(\dot{b} + \kappa b\right) = 0
$$`,
  'My reading of why this helps: once $V$ is learned, the control at any state is just the gradient of the network output, $u_x^* = -\\partial V/\\partial p_x$ and $u_z^* = -\\partial V/\\partial p_z$, obtained by automatic differentiation. There is no optimiser in the loop at run time, and the cost does not grow with every new constraint the way an online QP does.',

  '## Network Inputs and Architecture',
  String.raw`USAAPINN takes six inputs that describe the vehicle and its surroundings in the $x$–$z$ plane:`,
  String.raw`$$
\big[\, p_x,\; p_z,\; r_{\text{goal}},\; \theta_{\text{goal}},\; r_{\text{obs}},\; \theta_{\text{obs}} \,\big]
$$`,
  'the current position, and the range and bearing to the goal and to the obstacle. A fully connected network maps them to a single output, the value function $V(x)$, with a tanh activation on the output layer. The control inputs are the partial derivatives of $V$ with respect to the position inputs.',
  ['fig', 'fig3-architecture.png', 'USAAPINN architecture: six inputs, the value function V(x) as output, and the control inputs as its partial derivatives'],

  '## Training: Collocation Points and Losses',
  'A PINN does not need a labelled dataset. It is trained on **collocation points**, sampled states at which the PDE must hold. Here 4000 points were drawn with Latin-hypercube sampling (LHS), which spreads samples evenly across every input dimension. They cover possible obstacle locations and obstacle sizes, with the vehicle, obstacle and goal collinear, which is the case where the vehicle is heading straight at an obstacle.',
  'Two losses are minimised. The **physics loss** is the residual of the HJB PDE at the collocation points, computed from the network’s own gradients:',
  String.raw`$$
\mathcal{L}_{\text{HJB}} = \frac{1}{N}\sum_{i=1}^{N}\left[\frac{1}{2}\left\lVert \frac{\partial V}{\partial x}(x_i) \right\rVert^2 + \alpha\left(\dot{b}(x_i) + \kappa\, b(x_i)\right)\right]^2
$$`,
  'A **pitch loss** adds a second layer of safety. It pushes the vehicle’s pitch angle to the negative of the obstacle bearing:',
  String.raw`$$
\mathcal{L}_{\text{pitch}} = \sum_{t=0}^{N}\left(\theta_{\text{obs}} + \theta_{\text{AUV}}\right)^2,
\qquad
\theta_{\text{AUV}} = \arctan\!\left(\frac{u_z}{u_x}\right)
$$`,
  String.raw`When $\theta_{\text{AUV}} = -\theta_{\text{obs}}$, the vehicle pitches away from the obstacle point, so it always passes **below** the obstacle. My reading: this resolves the ambiguity of a head-on encounter (going over or under both look equally good to a distance-based barrier), making the manoeuvre consistent from run to run.`,
  'The network was built in PyTorch and trained for 3000 epochs with a learning rate of 0.0002.',

  '## Switching Controller',
  'The mission path takes the vehicle down to a set depth, holds that depth while moving forward for monitoring, and returns it to the surface. A PID controller tracks this path: its input is the error between the desired pitch angle, computed from the waypoints, and the vehicle’s current pitch, and its output is the velocity needed to reach the next waypoint. When the sensors detect an obstacle within range, control switches to USAAPINN; once the obstacle is cleared, it switches back to PID and the vehicle rejoins the reference trajectory.',
  ['fig', 'fig2-schematic.png', 'Switching between PID control (no obstacle) and the PINN (obstacle detected)'],

  '## Results',
  'In simulation the AUV surges forward, dives to 40 m, holds that depth and resurfaces, with motion along the $y$-axis constrained. Three environments were tested:',
  `- **Single obstacle:** a smooth convex obstacle on the path. The vehicle leaves the reference, passes below it and returns.
- **Two obstacles:** two convex obstacles avoided one after the other, with PID control resuming in between.
- **Uneven obstacle:** a non-convex obstacle with an irregular surface, avoided with the same trained network.`,
  ['group', [
    ['fig4-single-obstacle.png', 'Single obstacle'],
    ['fig5-two-obstacles.png', 'Two obstacles'],
    ['fig6-uneven-obstacle.png', 'Obstacle with an uneven shape']
  ]],
  'In each case the PID controller tracks the reference trajectory, and control shifts to USAAPINN only while an obstacle is within range.',

  '## Takeaways and Limits',
  `- **Safety with little computation.** The CBF provides the guarantee, and the PINN turns enforcing it into a single network evaluation.
- **No training data required.** The network learns from the governing equation at sampled points rather than from recorded trajectories.
- **Scope (my reading).** The work uses a point-mass kinematic model in the depth plane and is validated in simulation. The paper states that it handles static or slow-moving obstacles, convex or non-convex. Full vehicle dynamics, 3D avoidance and field trials are natural next steps.`
];

const out = [];
for (const b of body) {
  if (typeof b === 'string') out.push(b);
  else if (b[0] === 'fig') out.push(await fig(b[1], b[2]));
  else out.push(await group(b[1]));
}
const sections = body.filter((b) => typeof b === 'string' && b.startsWith('## ')).map((b) => b.slice(3));
const front = {
  title: 'PINN for Underwater Obstacle Avoidance',
  studyTitle: 'Safe Navigation of Autonomous Underwater Vehicles Using Physics-Informed Neural Networks',
  summary: 'Physics-Informed Neural Networks for real-time obstacle detection and avoidance',
  kind: 'full', year: 2024, status: 'Completed',
  domain: 'Deep Learning',
  tags: ['Deep Learning', 'PINN', 'Obstacle Avoidance', 'AI'],
  links: [{ label: 'Paper (OCEANS 2024)', url: 'https://doi.org/10.1109/OCEANS51537.2024.10682406' }, { label: 'Code', url: 'https://github.com/AIRLabIISc/Vertical_PINN' }],
  info: { institution: 'Indian Institute of Science (IISc), Bengaluru' },
  relatedWork: [{ title: 'Rudrashis Majumder, Rajini Makam, Pruthviraj Mane, Bharathwaj K S, Suresh Sundaram — Safe Navigation of Autonomous Underwater Vehicles Using Physics-informed Neural Networks. OCEANS 2024 Singapore', url: 'https://doi.org/10.1109/OCEANS51537.2024.10682406' }],
  preview: { url: `/thumbs/${slug}.webp`, alt: 'PINN for Underwater Obstacle Avoidance preview', caption: 'Physics-Informed Neural Networks for real-time obstacle detection and avoidance' },
  lead: 'Novel application of Physics-Informed Neural Networks for learning-based obstacle avoidance in underwater environments.',
  sections
};
const yaml = Object.entries(front).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
fs.writeFileSync(`${SITE}/src/content/projects/${slug}.mdx`, `---\n${yaml}\n---\n\n${out.join('\n\n')}\n`);
console.log('written', n, 'figures', sections.length, 'sections');
