# Local verification — professional portfolio

Checked in this workspace on 2026-09-24. The new site is staged in `site-next/` and has not been connected to the repository's existing GitHub Pages workflow.

## Build and source integrity

- Installed Node v24.21.0 in `/private/tmp/portfolio-node/` for this build and verified its archive against the official SHA-256 file. It is temporary, not a global Mac installation.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed. Astro generated 28 pages: 20 canonical pages, seven static compatibility pages, and a real 404 page. The sitemap contains exactly the 20 canonical URLs.
- The build emitted nonfatal Rolldown `MODULE_LEVEL_DIRECTIVE` warnings for Astro's generated MDX asset modules. Browser checks below confirmed the rendered content and figures. This is a toolchain warning, not a publication error in the verified pages.
- The repository's existing tracked application files and deployment workflow were not modified.

## Browser checks

`npm run test:e2e`: **7 passed** in locally installed Google Chrome against the static preview.

The tests directly opened all 20 canonical routes, checked one H1 and the canonical URL, followed all seven compatibility redirects, and verified the 404 response for an unknown address. They checked the sixteen project entries, four publication entries, two technical notes, project preview by keyboard, first-press Enter navigation, citation copy, native abstract disclosure, and Back/Forward navigation.

Responsive checks covered 320, 390, 768, and 1440 px. No horizontal overflow or computed font weight above 400 was found on the inspected pages. The Home, Projects, Research, About, and EROAS study were captured at desktop and mobile widths in [review/OPEN-ME.html](review/OPEN-ME.html).

Navigation and study figures remained usable with JavaScript disabled. All 34 original figures across the four full studies loaded when scrolled into view. Study videos are set to `preload="none"`. Clipboard failure displayed selectable text and a truthful message. Newsreader 300 italic, Geist 400, and JetBrains Mono 400 loaded from local site assets.

## Content decisions and next editing steps

- Four source-backed studies are complete enough to present: AquaNav, EROAS, Gazebo × Unreal, and EV torque vectoring.
- The other twelve project routes are concise, finished pages based on available source facts. Their `src/content-drafts/projects/<slug>/` folders hold future materials and publishing prompts.
- Four papers have source-backed bibliography records; their `src/content-drafts/papers/<id>/` folders are for later supporting content. An uncited future paper stays only in the private `_new-paper/` folder.
- Conflicting historical job titles, exact QibiTech start date, unverified measurements, and a missing fifth citation were not invented for public pages. Current QibiTech/Tokyo wording follows the owner's update.
- Publishing to GitHub Pages or a future custom domain is a separate step. The original deployment workflow still builds the legacy root application.
