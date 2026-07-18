# CLAUDE.md — Picha 🐾

Guide for any AI agent (and human) working on this repo. **Keep this file
updated**: whenever you learn something non-obvious, change the stack, add a
convention, or hit a gotcha, edit this file in the same change. Treat drift
between this doc and reality as a bug.

## What this is

A personal website for **Picha**, a cat. Phase 1 (current) is her **profile**:
who she is, her vet/health records, daily care routine, personality, and safety
notes. Later phases add **care tools** (cat body-language guide, food
calculator, etc.) — so the stack is chosen to not box us in.

Live site: <https://farzinmirzaie.github.io/picha>
Repo: <https://github.com/farzinmirzaie/picha> (public)

## Stack — and why

| Choice | Why |
| --- | --- |
| **[Astro](https://astro.build) 5** (static output) | Content-first, ships zero JS by default → perfect for a fast profile page on GitHub Pages. **Islands** let us drop in React/Svelte/Vue/vanilla for interactive tools later *without a rewrite* — this is the "don't block future tooling" requirement. |
| **Tailwind CSS 4** (via `@tailwindcss/vite`) | CSS-first config in `src/styles/global.css` (`@theme`). Utility classes are easy for an AI to read and edit consistently. |
| **TypeScript (strict)** | Typed data model; catches mistakes at build (`astro check` runs in `pnpm build`). |
| **pnpm** | Package manager. Node 22 (`.nvmrc`). |
| **GitHub Actions → GitHub Pages** | Push to `master` = build + deploy + versioned release, no manual steps. |

If you add interactivity, prefer an Astro island (`client:load` etc.) over
converting the whole site to an SPA. Keep the default static/zero-JS baseline.

## Project structure

Multi-page app with tab navigation — each tab is an Astro page. Future tools
get their own page + one new entry in the nav's `TABS` array.

```
src/
  data/picha.ts        # ⭐ SINGLE SOURCE OF TRUTH — all of Picha's info + copy
  layouts/Layout.astro # <html> shell, fonts, PWA, ClientRouter, shared scripts
  components/
    Nav.astro          # tab nav: desktop pill bar + mobile bottom tab bar (TABS array)
    PageHeader.astro   # sub-page header (mini avatar, kicker, serif title, blurb)
    Footer.astro       # paw divider, "if found" contact, credits
  pages/
    index.astro        # Home — hero, passport dialog, story, get-to-know-her
    health.astro       # Health — status, treatment, timeline (done/next/to-book), emergency
    care.astro         # Care — day rhythm, food menu, litter, house rules, "if found"
    tools.astro        # Tools — future tools land here ("in the workshop" list)
  styles/global.css    # Tailwind @theme (paper/plum/ink/blush/amber) + animations
  assets/
    picha.jpg          # avatar photo (astro:assets; also the source for app icons)
public/favicon.svg     # Phosphor paw-print on a blush tile (photo is mush at 16px)
public/icon-*.png      # PWA icons — cropped from her photo (see § icons)
.github/workflows/deploy.yml  # build + deploy Pages + auto-release
astro.config.mjs       # site + base (GitHub Pages project site)
```

### The golden rule: edit data, not markup

**To update Picha's info, edit [`src/data/picha.ts`](src/data/picha.ts).** The
pages are data-driven — add/adjust fields there and the UI follows. Only touch
pages/components when changing *layout or design*, not content.

- Her **age is computed** from `BIRTH_DATE` (`ageLabel()`), so it never goes
  stale. Don't hardcode age anywhere.
- **`healthTimeline`** is one dated list; `health.astro` splits it at render
  time into *done* (past dates), *coming up* (future, soonest = "Next up"), and
  *still to book* (no date). To record a completed visit or schedule something,
  just add/date an entry — no markup changes.
- `contact.owners` is an array of `{ name, phone }` — both owners are shown
  everywhere contact appears (footer, emergency, if-found).

### Voice & tone (copywriting)

Playful, deadpan "Picha owns the place, the humans are staff" — she grants
cuddles, employs the humans, files complaints about thunder. Keep it in that
voice **everywhere**… except where safety demands clarity: `callVetIf`,
`toxicItems`, `recovery.points` and treatment instructions stay plain and
unambiguous (jokes end where the vet begins). Facts (dates, doses, products)
must stay exact.

## Commands

```bash
pnpm install      # once
pnpm dev          # local dev server (http://localhost:4321/picha)
pnpm build        # astro check (typecheck) + static build → dist/
pnpm preview      # serve the built dist/ locally
```

Note: `base` is `/picha`, so local URLs are under `/picha` (e.g.
`http://localhost:4321/picha`).

## Deployment & releases

`.github/workflows/deploy.yml` runs on every push to `master`:

1. **build** — `pnpm build`, upload `dist/` as the Pages artifact.
2. **deploy** — publish to GitHub Pages.
3. **release** — auto-increment the patch version (`vX.Y.Z`), tag it, and create
   a GitHub Release.

Pages is already enabled (**Settings → Pages → Source: "GitHub Actions"**). This
was a required one-off: the default Actions token can't auto-enable Pages
(`Resource not accessible by integration`), so `enablement: true` was removed
from the workflow — don't add it back.

Versioning is patch-only auto-bump. To cut a minor/major version, push a tag
manually (e.g. `git tag v0.1.0 && git push origin v0.1.0`) — the next auto-bump
continues from the highest existing tag.

## Dynamic dates (client-side)

The site is statically built, so anything relative to "now" would otherwise
freeze at build time. To keep it live, `src/layouts/Layout.astro` runs a shared
client script on every page (re-runs on `astro:page-load` after ClientRouter
swaps):

- `[data-age]` spans → refilled via `ageLabel()` from `src/data/picha.ts`.
- `[data-until="YYYY-MM-DD"]` spans → filled with a relative day-count
  (e.g. " (in 7 days)", " (past the estimate — confirm with the vet)").
- `.reveal` elements → scroll-reveal via IntersectionObserver (stagger with
  inline `--reveal-delay`); skipped under `prefers-reduced-motion`.

The server still renders a build-time value inside those spans as the no-JS
fallback. **Add new relative dates by using these hooks**, not hardcoded text.
(The health timeline's done/upcoming *split* is build-time — fine, since every
push rebuilds — only the countdown chips are client-side.)

## PWA (installable)

The site installs as an app (Add to Home Screen / install icon):

- `public/manifest.webmanifest` — name, icons, `start_url`/`scope` = `/picha/`.
- `public/sw.js` — service worker (network-first pages, cache-first assets).
  Bump `CACHE` (`picha-vN`) when the precache list changes.
- Registration + `<link rel="manifest">` + apple-touch meta live in
  `src/layouts/Layout.astro`. Use the `asset()` helper for base-prefixed URLs
  (BASE_URL already ends in `/` — don't double the slash).
- **Native feel**: scrollbars are hidden under `@media (display-mode:
  standalone)` (global.css), and `Layout.astro` fires `navigator.vibrate(8)` on
  `pointerdown` of any link/button (Android haptics; iOS lacks the API — safe
  no-op). Keep both when adding new interactive UI.
- **Notifications**: local `showNotification()` works while the app is open;
  background/scheduled reminders would need a Web Push backend (Notification
  Triggers API is dead). Planned as a future tool, not built.

### Regenerating icons

App icons are her actual photo, square-cropped with macOS `sips`
(no ImageMagick needed — `sips` also rasterizes SVG if ever needed):

```bash
# square face crop (offset keeps ear tips + collar in frame), then sizes
sips --cropOffset 40 0 -c 989 989 src/assets/picha.jpg --out /tmp/picha-square.jpg
sips -s format png --resampleWidth 512 /tmp/picha-square.jpg --out public/icon-512.png
sips -s format png --resampleWidth 192 /tmp/picha-square.jpg --out public/icon-192.png
sips -s format png --resampleWidth 180 /tmp/picha-square.jpg --out public/apple-touch-icon.png
```

The favicon stays the drawn cat (`public/favicon.svg`) — a photo of a white cat
is unreadable at 16 px. After changing icons, bump the SW `CACHE` version so
installed clients pick them up.

## Conventions

- **Content lives in data**, not JSX/markup (see golden rule above).
- **Dark mode** is automatic via `prefers-color-scheme` (Tailwind `dark:`
  variants). Style both light and dark when adding UI.
- **Comments**: keep them minimal and about *why*, not *what*.
- **Contact info is public on purpose.** The owners chose to publish `contact`
  (Farzin's and Farah's first names + phones) and the `microchip` number so the
  site doubles as an "if found" tag. Only publish what the owners have
  approved — legal full names and anyone else's details stay out.
- **Voice**: playful staff-of-the-cat tone (see § Voice & tone) — but emergency
  and medical instructions stay plain.
- **Icons, not emoji.** UI icons are Phosphor via `astro-icon` (build-time
  inline SVG, zero JS): `<Icon name="ph:paw-print" />` from
  'astro-icon/components'. Data `icon` fields hold the full name (`ph:x`).
  Verify a name exists in `@iconify-json/ph/icons.json` before using it
  (`comb` doesn't — we use `paint-brush`). Emoji only survive in <title> tags.
- **Tabs**: Home / Health / Care / Tools. Safety was folded into Care
  (house rules + toxic list + if-found); `/safety` redirects to `/care` via
  astro.config `redirects` — note the destination must include the `/picha`
  base. New tools: build the page, list it on tools.astro, or give it a TABS
  entry (keep the mobile grid-cols in sync with the tab count).
- **Accessibility**: images have real `alt` (decorative ones use `alt=""`);
  decorative emoji use `aria-hidden`. Keep it that way.
- Run `pnpm build` before committing — it typechecks and must pass clean.

## Avatar photo

The hero + footer avatar is `src/assets/picha.jpg`, rendered through
`astro:assets` `<Image>` (optimized to WebP; needs the `sharp` dependency). It
sits in a circular frame with `object-cover` + `object-position: 50% 22%` to
focus her face. To change the photo, replace that file; adjust `object-position`
if the framing needs it. The favicon is the Phosphor paw-print path inlined in
`public/favicon.svg` on a blush tile — regenerate by pulling the path from
`@iconify-json/ph/icons.json` if the brand icon ever changes.

## Roadmap (not built yet)

Tools phase — each is a good candidate for an Astro island or its own page:
cat body-language guide, food/portion calculator, weight tracker, vet-visit
reminders. Don't build these until asked; Phase 1 is the profile.
