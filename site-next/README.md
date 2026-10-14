# Professional portfolio

This is the new local website. It follows the selected editorial direction in `../professional-handoff/`. The source application at the repository root has not been replaced.

## Preview

Use Node 24 LTS. From `site-next/`:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:4321/`. The production-style check is `npm run check`, `npm run build`, then `npm run test:e2e`. The browser tests use Google Chrome installed on this Mac.

For this session, a checksum-verified Node 24 runtime is available temporarily at `/private/tmp/portfolio-node/bin`. If `node` and `npm` are not yet in your PATH, run the same commands with `PATH=/private/tmp/portfolio-node/bin:$PATH` before each command. That temporary runtime may disappear after a system cleanup; installing Node 24 normally will make `npm` available in future sessions.

[Actual desktop and mobile captures](review/OPEN-ME.html) are saved for review. The captures are generated from the built pages, not design mockups.

## Editing content

- Every project has one editable file in `src/content/projects/<slug>.mdx`. Four of them contain complete studies; the other twelve have a concise public page grounded in the existing site.
- Each of those twelve projects also has a private source folder at `src/content-drafts/projects/<slug>/`. Put future text, evidence, figures, and links there. Its README says what information will make a full case study possible. Then edit the public MDX file when ready.
- Each existing publication has a private folder at `src/content-drafts/papers/<id>/` for a technical note or corrected citation. `src/content-drafts/papers/_new-paper/` is for a future paper with no verified citation yet. Nothing in these draft folders appears on the public site automatically.
- Edit professional biography, contact links, publication records, and technical-note records in `src/data/content.json`.
- Keep original images and videos under `public/projects/`. The four small `public/thumbs/` files are optimized previews; the original figures remain available at full size.

The content draft folders contain prompts for you to fill in, not invented achievements. There is no public “coming soon” page.

## Book a call (Cal.com)

The “Book a call” button (header, homepage, About, footer) opens an on-site window with 30-minute slots from Cal.com. To connect it:

1. Create a free account at cal.com and connect your Google or Outlook calendar (Settings → Calendars). Busy times there are hidden automatically.
2. Set your open hours in **Availability** (time zone Asia/Tokyo).
3. Create an event type of **30 minutes**. In its **Advanced** tab turn on **Requires confirmation**, so each request waits until you accept or reject it (by email or in Cal.com → Bookings → Unconfirmed).
4. Put the event path in `src/data/content.json` → `profile.booking.calLink`, e.g. `"pruthviraj-mane/30min"`, then rebuild.

While `calLink` is empty, the window offers email instead, so the button never leads nowhere. The Cal.com script loads only when a visitor opens the window.

## Structure

The site is statically built with Astro and MDX. Shared visual rules live in `src/styles/`, the four top-level pages in `src/pages/`, project pages in the content collection, and the two small interactions in `src/scripts/`. Compatibility URLs generate real static redirect pages. `VERIFICATION.md` records the checks completed in this workspace.
