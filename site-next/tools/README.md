# Tools

Run everything from `site-next/`, with the preview server running (`npx astro preview --host 127.0.0.1 --port 4321`) and after `npm run build`.

## Checks (`tools/checks/`)

| Script | What it checks |
| --- | --- |
| `node tools/checks/audit.mjs` | Every page at 320–1440 px: console errors, failed requests, horizontal overflow, missing alt text, heading order, duplicate ids, dead anchors, tap targets under 40 px, video box ratio, broken internal links. Prints `NO ISSUES` when clean. (A `thead` "past right edge" on phones is expected: wide tables scroll inside their own box.) |
| `node tools/checks/justify-check.mjs` | Every multi-line text block is justified (owner requirement). Captions under very narrow figures are intentionally left-aligned. |
| `node tools/checks/group-check.mjs` | Side-by-side images in every case study have equal heights. |
| `node tools/checks/tz-check.mjs` | Opens the Book-a-call window as visitors in Tokyo, New York and Berlin and prints the slots each sees (needs internet). |

## Generators (`tools/generators/`)

`gen-auv.mjs` and `gen-agri.mjs` wrote `src/content/projects/auv-dynamics-modeling.mdx` and `agricultural-plant-caretaker.mdx` from the owner's papers. The MDX files are now the source of truth — edit them directly; re-running a generator overwrites manual edits. They are kept as a pattern for building future case studies from a paper (text + figures + tables, equal-height figure rows capped at natural size).
