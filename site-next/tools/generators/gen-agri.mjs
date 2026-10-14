// Builds the Agricultural Plant Caretaker case study from the owner's
// "Research Paper Draft 1.2.pdf" (src/content-drafts/projects/agricultural-plant-caretaker/).
// Wording follows the draft; only PDF-extraction spacing errors are corrected.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const SITE = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const require = createRequire(SITE + '/package.json');
const sharp = require('sharp');
const slug = 'agricultural-plant-caretaker';
const esc = (s) => s.replace(/"/g, '&quot;');
let n = 0;
async function fig(file, caption, inGroup = false) {
  const url = `/projects/${slug}/images/${file}`;
  const meta = await sharp(`${SITE}/public${url}`).metadata();
  n++;
  const style = inGroup ? ` style="--ar: ${(meta.width / meta.height).toFixed(4)}"` : '';
  return `<figure className="study-figure"${style}>
  <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open original image: ${esc(caption)}">
    <img src="${url.replace('/images/', '/display/').replace(/\.(jpg|png)$/, '.webp')}" alt="${esc(caption)}" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async" />
  </a>
  <figcaption><span className="figure-number">Fig. ${String(n).padStart(2, '0')}</span> ${caption}</figcaption>
</figure>`;
}
async function group(items) {
  const figs = [];
  let sumAr = 0, minH = Infinity;
  for (const [file, caption] of items) {
    const m = await sharp(`${SITE}/public/projects/${slug}/images/${file}`).metadata();
    sumAr += m.width / m.height; minH = Math.min(minH, m.height);
    figs.push(await fig(file, caption, true));
  }
  // Cap the row so equal-height images are never enlarged beyond their natural size.
  const maxW = Math.round(sumAr * minH + 24 * (items.length - 1));
  return `<div className="figure-group figure-group-${items.length}" style="max-width: min(100%, ${maxW}px)">\n${figs.join('\n')}\n</div>`;
}

const body = [
  ['youtube', 'dwbdpdVoCs8', 121, 'Smart Arduino Rpi based IoT Indoor Farming Project — video by The Blue Dot on YouTube'],
  '## Overview',
  'With a growing population we must produce more food, and conventional agricultural techniques alone are not able to do so. Autonomous Small-Scale Agricultural Plant Caretaker is an attempt to automate agricultural activities with minimum human intervention, suitable for Indian farmers in commercial greenhouses and for domestic use.',
  'It has a drive system like a CNC machine, with a Universal Tool Mount in place of the cutting tool, and currently performs sowing and watering. Users control it through a web interface on the same network. Low power requirements and watering only as much as the moisture sensor calls for make it beneficial over manual labour. A Raspberry Pi acts as the server and bridge to an Arduino Due microcontroller.',

  '## Problem Identification',
  'FarmBot, the most widely used open-source CNC farming machine, costs around Rs. 3,50,000 or more for an Indian customer. Its tool mount has to travel to the end of the machine to pick up a tool for every process — and to pick up every seed, even of the same type — wasting time and making it impractical over long working areas. This design reworks that approach and keeps the cost low enough for middle-class farmers.',

  '## System Definition',
  'The robot is a gantry on tracks for X-axis movement, with similar tracks for the Y axis and a lead screw for the Z axis. Each axis is driven by a DC motor with an encoder, through belt and pulley (X, Y) or a flexible coupling and lead screw (Z). A Universal Tool Mount (UTM) at the end of the Z axis holds all tools in a circular pattern, so the robot changes tools by rotating instead of travelling to the end:',
  `1. Seeding tool connected to a vacuum pump for suction.
2. Watering tool connected to a water pump.
3. Moisture sensing tool.
4. Weeding tool for future scope.`,
  'A rotating seed box with different seeds is mounted on the X axis, and limit switches at the ends of each axis are used for calibration. The working area is 1 m (X) by 0.5 m (Y), with a 3-foot Z axis. On a sowing command, the tool picks the chosen seed, plants it at the given location, and waters it according to the moisture sensor readings.',

  '## Mechanical Hardware',
  'The bed is a precisely machined wooden platform holding the soil, with the gantry fixed to either side. The X-axis gantry uses 20×20 aluminium extrusions of 1.2192 m, and the Y axis a 0.8 m extrusion on a cross slide plate. Belts are fixed with 3D-printed PETG belt clips, followed by limit switches for calibration and safety.',
  ['group', [['x-axis-drive.jpg', 'X axis drive (aluminium extrusion, guiding wheel, belt, acrylic plate)'], ['x-axis-motor.jpg', 'X-axis motor']]],
  'The UTM is mounted on its motor shaft with all four tools in holders; the vacuum and water pumps sit on the Z-axis extrusion and the table, fed by a reservoir near the bed. The seed-box motor is mounted on the gantry with a stopper to fix its movement.',
  ['group', [['universal-tool-mount.jpg', 'UTM (seeder, shower, moisture sensor, weeder)'], ['seed-box-mechanism.jpg', 'Seed box mechanism']]],
  ['fig', 'final-assembly.jpg', 'Final assembly of the system'],

  '## Electronics Hardware',
  'Closed-loop position control of the four encoder DC motors runs on an Arduino Due, chosen because every pin can be a hardware interrupt and for its high clock speed. A custom shield, designed in KiCad, carries all connections and a filtered 3.3 V / 5 V / 12 V supply. A Raspberry Pi 3 B hosts the web server over Wi-Fi and connects to the Arduino by USB, with an LCD showing system status. L298N drivers run the motors, and a 12 V, 10 A supply covers the roughly 9 A peak load.',
  ['fig', 'electronics-interfacing.png', 'Interfacing of electronic components'],

  '## Software',
  '### Arduino Due',
  'The Arduino Due listens for instructions from the Raspberry Pi over serial, in packets holding the values each actuator should take — for example `{X: 100, Y: 100, Z: 2000, WaterPump: 0, VacuumPump: 0, Tool: W, Calibration: 5}`, where 2000 means “no motion” and a calibration value of 5 means “no calibration”.',
  ['fig', 'arduino-due-flowchart.jpg', 'Arduino Due algorithm flowchart'],
  '### Raspberry Pi and web interface',
  'A Flask web app on Raspbian provides a login page and a controls page. The farming area is a canvas mapped to the real bed: clicking places a plant, drawn as a circle sized to its future spread, and planted positions are kept so the same spot is not replanted. A manual-control form calibrates axes, switches the pumps, selects tools, moves each axis and positions the seed box. Commands are posted to the server and processed in Python, with multiprocessing handling web data and Arduino communication together.',
  ['group', [['web-data-flowchart.jpg', 'Web data handling flowchart'], ['farming-activities-flowchart.png', 'Handling farming activities']]],
  'Each activity, such as timed watering or planting a seed, is a function with its own list of packets, which makes new functions easy to add.',
  ['fig', 'plant-function-packets.png', 'Various packets in the Plant function'],

  '## Discussion and Results',
  `| Process | Average time (s) |
| --- | --- |
| X axis calibration | 28 |
| Y axis calibration | 22 |
| Z axis calibration | 15 |
| Tool calibration | 5 |
| Sowing one seed | 160 |`,
  'Calibration times assume the axes start at the extreme ends, so they are the maximum.',
  `| Component | Max power rating (W) |
| --- | --- |
| Vacuum pump | 50 |
| Water pump | 50 |
| Motors | 12 |
| Raspberry Pi | 10 |`,
  'At any time the maximum power draw is around 80 W, low compared to the cost of manual labour.',

  '## Conclusion and Future Scope',
  'The set-up plants seeds according to the user’s preference and waters only as much as the moisture sensor calls for. Low power use and low cost make it economical for Indian farmers and for greenhouse farming, and longer X-axis rails extend it to backyards and larger greenhouses. Commands and data are saved for further study of farming methods. Improvements remain possible in weeding, sowing-tool shape and watering methods.',
  '## Team',
  'Shailesh Chillarge, Pruthviraj Mane, Sachin Aglave, Nilesh Sutar and Hitesh Somnathe, guided by Prof. R.M. Chanmanwar — Department of Mechanical Engineering, Walchand College of Engineering, Sangli.'
];

const out = [];
for (const b of body) {
  if (typeof b === 'string') out.push(b);
  else if (b[0] === 'fig') out.push(await fig(b[1], b[2]));
  else if (b[0] === 'youtube') out.push(`<figure className="study-video study-video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/${b[1]}?start=${b[2]}&rel=0" title="${esc(b[3])}" width="1280" height="720" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  <figcaption>${b[3]} · <a href="https://www.youtube.com/watch?v=${b[1]}&t=${b[2]}s" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></figcaption>
</figure>`);
  else out.push(await group(b[1]));
}
const sections = body.filter((b) => typeof b === 'string' && b.startsWith('## ')).map((b) => b.slice(3));
const front = {
  title: 'Autonomous Agricultural Plant Caretaker',
  studyTitle: 'Design and Development of Autonomous Small-Scale Agricultural Plant Caretaker',
  summary: 'Small-scale prototype for automated sowing, sensing, and watering',
  details: 'Designed and prototyped an autonomous system for sowing, moisture sensing, and watering with rail-based UTM mechanism. Team project for ABU Robocon 2018 (AIR 38/107).',
  kind: 'full', year: 2019, // no status: the owner does not count this paper among the publications
  domain: 'SolidWorks',
  tags: ['SolidWorks', 'Automation', 'Agriculture', 'Robocon'],
  links: [],
  info: { institution: 'Walchand College of Engineering, Sangli' },
  preview: { url: '/thumbs/agricultural-plant-caretaker.webp', alt: 'Autonomous Agricultural Plant Caretaker preview', caption: 'Small-scale prototype for automated sowing, sensing, and watering' },
  lead: 'Designed and prototyped an autonomous system for sowing, moisture sensing, and watering with rail-based UTM mechanism. Team project for ABU Robocon 2018 (AIR 38/107).',
  sections
};
const yaml = Object.entries(front).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
fs.writeFileSync(`${SITE}/src/content/projects/${slug}.mdx`, `---\n${yaml}\n---\n\n${out.join('\n\n')}\n`);
console.log('written', n, 'figures', sections.length, 'sections');
