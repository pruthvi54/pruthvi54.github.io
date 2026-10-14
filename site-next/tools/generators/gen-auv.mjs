// Builds the AUV Dynamics Modeling case study from the paper
// "A Comprehensive Study on Modelling and Control of Autonomous Underwater Vehicle" (arXiv:2312.02690v3).
// Text and numbers follow the paper; list title/summary/tags/year/status are the owner's originals.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const SITE = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const require = createRequire(SITE + '/package.json');
const sharp = require('sharp');
const slug = 'auv-dynamics-modeling';
const esc = (s) => s.replace(/"/g, '&quot;');
let n = 0;
async function fig(file, caption, inGroup = false) {
  const url = `/projects/${slug}/images/${file}`;
  const meta = await sharp(`${SITE}/public${url}`).metadata();
  n++;
  const style = inGroup ? ` style="--ar: ${(meta.width / meta.height).toFixed(4)}"` : '';
  return `<figure className="study-figure"${style}>
  <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open original image: ${esc(caption)}">
    <img src="${url.replace('/images/', '/display/').replace(/\.jpg$/, '.webp')}" alt="${esc(caption)}" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async" />
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
  'Autonomous underwater vehicles (AUV) have become the de facto vehicle for remote operations involving oceanography, inspection, and monitoring tasks. These vehicles operate in different and often challenging environments; hence, the design and development of the AUV involving hydrodynamics and control systems need to be designed in detail.',
  'This work presents a study on the modelling and robust control of a research vehicle in the presence of uncertainties. The vehicle’s dynamic behaviour is modelled using a 6-degree-of-freedom approach, considering the effect of ocean currents. The level flight requirements for different speeds are derived, and the resulting model is decomposed into horizontal and vertical subsystems for linear analysis.',
  'The simulation results focus on the efficacy of linear controllers within three key subsystems: depth, yaw, and speed. Level-flight outcomes are demonstrated for a speed of 4 knots. The nonlinear control strategies encompass conventional and sliding-mode control (SMC), designed against ocean currents, parameter uncertainty, CG (centre of gravity) deviation and buoyancy variation, and compared in a lawn-mowing manoeuvre.',

  '## Research Vehicle',
  'The hull profile of the research vehicle is based on the Myring hull profile, designed for a minimal drag coefficient at the required length-to-diameter ratio. The profile is defined by the nose, mid-hull and tail section lengths, the maximum diameter, the included tail angle and a shape parameter. The moments of inertia are taken about the centre of buoyancy (CB), located 0.611 m from the vehicle’s nose.',
  `| Parameter | Unit | Value |
| --- | --- | --- |
| Vehicle mass (m) | kg | 30.5 |
| Seawater density (ρ) | kg/m³ | 1030 |
| Vehicle buoyancy (B) | N | 306 |
| MOI about x-axis (Ixx) | kg·m² | 0.177 |
| MOI about z-axis (Izz) | kg·m² | 3.45 |
| Centre of gravity w.r.t. CB (x, y, z) | m | 0, 0, 0.0192 |`,

  '## 6-DoF Mathematical Model',
  'Following SNAME (Society of Naval Architects and Marine Engineers) conventions, the AUV is modelled in two coordinate systems: a body-fixed reference frame and an earth-fixed North-East-Down frame. The body-fixed velocities are the surge, sway and heave velocities (u, v, w) and the roll, pitch and yaw rates (p, q, r); the earth-fixed position and orientation are (x, y, z, ϕ, θ, ψ).',
  'The dynamics consist of kinematics, which defines the vehicle’s motion in terms of position, orientation and velocity, and kinetics, which defines the six degrees of freedom with the forces and torques acting on the AUV — hydrodynamic effects, buoyancy, thrust forces and external disturbances. The equations of motion are derived with the Newton–Euler formulation, and the effect of ocean currents is included in the vehicle’s dynamic behaviour.',

  '## Level Flight Dynamics',
  'Level flight, also known as the trim condition, is where a constant set of inputs is given to the vehicle without any disturbances and the vehicle maintains fixed velocity and orientation. All forces and moments must balance, giving zero acceleration and zero rates of rotation about all three axes. Using the two sterns and two rudders independently, the roll motion is nullified, which leaves five control inputs for level flight: four control-surface settings and a single propeller RPM.',
  'The nonlinear model was linearized at an operating speed of U = 4 knots. The estimated level-flight values for the research vehicle are:',
  `| Variable | Symbol | Units | Value |
| --- | --- | --- | --- |
| Body-frame surge velocity | u | m/s | 2.0577 |
| Body-frame sway velocity | v | m/s | 0.001 |
| Body-frame heave velocity | w | m/s | −0.011 |
| Earth-frame roll | ϕ | deg | −2.5941 |
| Earth-frame pitch | θ | deg | −0.72 |
| Propeller rotation rate | n | rpm | 1413 |
| Angle of attack | α | deg | −0.72 |
| Angle of sideslip | β | deg | −0.0276 |
| Propeller inflow rate | uₚ | m/s | 1.2936 |
| Stern angle 1 / 2 | δs1 / δs2 | deg | −1.4 |
| Rudder angle 1 / 2 | δr1 / δr2 | deg | −0.05 |`,
  'With these values as initial conditions and constant control inputs, the AUV sustains constant velocities, moves steadily along the x-direction with no variation along y and z, and keeps all angular velocities at zero. The roll angle stays at −2.594° and the pitch at −0.72°, while yaw remains at 0°.',
  ['group', [['fig09a-linear-velocities.jpg', 'Body-frame linear velocities u, v and w at trim'], ['fig09b-earth-frame-motion.jpg', 'AUV motion in the earth-fixed frame']]],
  ['group', [['fig10a-angular-velocities.jpg', 'Body-frame angular velocities p, q and r'], ['fig10b-angular-positions.jpg', 'Earth-frame angular positions ϕ, θ and ψ']]],

  '## Linear Controllers',
  'The linearized model is split into the vertical (depth–pitch), horizontal (yaw) and speed subsystems, each with its own controller.',
  '### Depth–pitch subsystem',
  'The depth control system has an outer depth loop and an inner pitch loop. The depth command is smoothed by a first-order low-pass filter; a PD controller on the depth error gives the desired pitch angle, and a second PD controller on the pitch error gives the stern-angle command. Because the depth changes are small, the maximum required stern angle remains around 5 degrees.',
  ['fig', 'fig03-depth-pitch-controller.jpg', 'Schematic of the depth–pitch subsystem with controller'],
  ['fig', 'fig04-depth-pitch-response.jpg', 'Depth, pitch and stern angle of the depth subsystem'],
  '### Yaw subsystem',
  'The yaw controller follows the same architecture, with an inner yaw loop and an outer lateral-position loop. For a demand of zero to 20 metres in around one minute at a constant speed of 3 knots, a maximum yaw angle of 15 degrees is required and followed accurately.',
  ['fig', 'fig05-yaw-controller.jpg', 'Schematic of the yaw subsystem with controller'],
  ['fig', 'fig06-yaw-response.jpg', 'Lateral position, yaw and rudder angle of the yaw subsystem'],
  '### Speed subsystem',
  'The error between the desired and actual speed is fed to a PD controller, which generates the propeller RPM needed to reach the specified speed. The required RPM shows the control effort exerted on the propulsion system.',
  ['fig', 'fig07-speed-controller.jpg', 'Schematic of the speed subsystem'],
  ['fig', 'fig08-speed-rpm.jpg', 'Speed and RPM of the vehicle'],

  '## Nonlinear Control',
  'The nonlinear model is implemented in MATLAB-Simulink. A references block provides the desired speed, y-position, z-position and roll angle; a controller block with four independent controllers computes the control commands; and the AUV dynamics block combines them with state feedback to estimate the next state. The controller block is either the conventional controller or SMC.',
  ['fig', 'fig11-nonlinear-model-block-diagram.jpg', 'Block diagram of the nonlinear AUV model'],
  '### Centre-of-gravity variation',
  'The conventional controller was compared with and without a shift in the CG location (xcg = 8 mm), for references of 4 knots speed and 60 m depth. The stern and rudder commands are combined to nullify roll: the roll angle moves from its initial −2.59° to zero after a minor undershoot, and the vehicle reaches the desired depth and speed in both cases.',
  ['fig', 'fig12-cg-variation.jpg', 'Conventional controller performance with and without variation in CG location'],
  '### Ocean currents',
  'An ocean-current model was added to the same simulation. The current starts at 0.5 m/s and settles at 0.25 m/s; after a brief transient, the controller maintains the desired speed and the depth follows the command.',
  ['fig', 'fig13-ocean-currents.jpg', 'Simulation results with ocean currents'],

  '## SMC vs Conventional: Lawn-Mowing Manoeuvre',
  'Sliding mode controllers are used for the inner pitch and yaw loops, with a saturation function in the control law to reduce chattering; the conventional controller architecture is unchanged and serves as the benchmark. A classical lawn-mowing manoeuvre — used for underwater object detection, search and rescue and environmental surveys — is run at 4 knots and a depth of 60 m. Both controllers execute the planned manoeuvre.',
  ['fig', 'fig14-lawn-mowing.jpg', 'Lawn mowing in the XY plane with SMC and conventional controller'],
  'Varying one parameter at a time, the root-mean-square error (RMSE) in the y-direction was recorded:',
  `| Controller | Xu\\|u\\| −25% | 0% | +25% | Muw −25% | 0% | +25% | Zuw −25% | 0% | +25% |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Conventional | 0.506 | 0.504 | 0.504 | 0.502 | 0.504 | 0.507 | 0.503 | 0.504 | 0.507 |
| SMC | 1.600 | 1.614 | 1.623 | 1.613 | 1.614 | 1.611 | 1.600 | 1.614 | 1.611 |`,
  `| Controller | (B−W)/g = 100 g | 340 g | 650 g | 1000 g |
| --- | --- | --- | --- | --- |
| Conventional | 0.513 | 0.505 | 0.495 | 0.483 |
| SMC | 1.613 | 1.614 | 1.612 | 1.613 |`,
  'The error with the conventional controller is lower, but with SMC the change in error under parameter variation is minimal.',
  'With several disturbances applied together — a CG shift (xcg = 8 mm), a 50% change in the axial drag coefficient Xu|u| and a constant ocean current of 0.1 m/s at a side-slip angle of 20° — the conventional controller deviates noticeably from the second cycle onward, while the SMC trajectory stays close to the intended path. The RMSE values are **3.694** for the conventional controller and **1.632** for SMC.',
  ['fig', 'fig15-lawn-mowing-parameter-variations.jpg', 'Lawn mowing in the XY plane of SMC and conventional controller with parameter variations'],

  '## Conclusions',
  'The dynamic behaviour of the vehicle was represented with a 6-DoF model accounting for ocean currents; level-flight requirements were derived, and the model was decomposed into horizontal and vertical subsystems for linear analysis. Linear depth, yaw and speed controllers were demonstrated, including level flight at 4 knots.',
  'Conventional and sliding-mode nonlinear controllers were designed against ocean currents, parameter fluctuations, CG deviations and buoyancy variations. The lawn-mowing comparison showed SMC’s enhanced robustness against disturbances and parameter uncertainties, at the cost of added complexity in its design and implementation, including the management of chattering.'
];

const out = [];
for (const b of body) {
  if (typeof b === 'string') out.push(b);
  else if (b[0] === 'fig') out.push(await fig(b[1], b[2]));
  else out.push(await group(b[1]));
}
const sections = body.filter((b) => typeof b === 'string' && b.startsWith('## ')).map((b) => b.slice(3));
const front = {
  title: 'AUV Dynamics Modeling',
  studyTitle: 'A Comprehensive Study on Modelling and Control of Autonomous Underwater Vehicle',
  summary: 'Complete 6-DoF dynamics modeling in MATLAB/Simulink',
  details: 'Comprehensive mathematical modeling of AUV dynamics including hydrodynamic coefficients, added mass, and environmental disturbances using MATLAB/Simulink.',
  kind: 'full', year: 2023, status: 'Completed',
  domain: 'MATLAB',
  tags: ['MATLAB', 'Simulink', 'Dynamics', 'Modeling'],
  links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2312.02690' }],
  info: { institution: 'Indian Institute of Science (IISc), Bengaluru' },
  relatedWork: [{ title: 'Rajini Makam, Pruthviraj Mane, Suresh Sundaram, P.B. Sujit — A Comprehensive Study on Modelling and Control of Autonomous Underwater Vehicle (arXiv:2312.02690)', url: 'https://arxiv.org/abs/2312.02690' }],
  preview: { url: '/thumbs/auv-dynamics-modeling.webp', alt: 'AUV Dynamics Modeling preview', caption: 'Complete 6-DoF dynamics modeling in MATLAB/Simulink' },
  lead: 'Comprehensive mathematical modeling of AUV dynamics including hydrodynamic coefficients, added mass, and environmental disturbances using MATLAB/Simulink.',
  sections
};
const yaml = Object.entries(front).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
fs.writeFileSync(`${SITE}/src/content/projects/${slug}.mdx`, `---\n${yaml}\n---\n\n${out.join('\n\n')}\n`);
console.log('written', n, 'figures', sections.length, 'sections');
