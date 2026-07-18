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

```
src/
  data/picha.ts        # ⭐ SINGLE SOURCE OF TRUTH — all of Picha's info lives here
  layouts/Layout.astro # <html> shell, <head>, background, dark mode
  components/
    CatAvatar.astro    # illustrated SVG stand-in (replace with a real photo later)
    Section.astro      # titled section wrapper
    InfoCard.astro     # soft rounded card for one care/health item
  pages/index.astro    # the profile page — renders entirely from data/picha.ts
  styles/global.css    # Tailwind import + @theme palette (cream/blush/amber)
public/favicon.svg     # cat-face favicon
.github/workflows/deploy.yml  # build + deploy Pages + auto-release
astro.config.mjs       # site + base (GitHub Pages project site)
```

### The golden rule: edit data, not markup

**To update Picha's info, edit [`src/data/picha.ts`](src/data/picha.ts).** The
page is data-driven — add/adjust fields there and the UI follows. Only touch
`index.astro`/components when changing *layout or design*, not content.

- Her **age is computed** from `BIRTH_DATE` (`ageLabel()`), so it never goes
  stale. Don't hardcode age anywhere.
- Add new content types by extending the typed arrays (`healthRecords`,
  `grooming`, etc.) — keep them typed.

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
freeze at build time. To keep it live, `src/pages/index.astro` has a client
`<script>` that recomputes on the **visitor's** date:

- `[data-age]` spans → refilled via `ageLabel()` from `src/data/picha.ts`.
- `[data-until="YYYY-MM-DD"]` spans → filled with a relative day-count
  (e.g. " (in 7 days)", " (past the estimate — confirm with the vet)").

The server still renders a build-time value inside those spans as the no-JS
fallback. **Add new relative dates by using these hooks**, not hardcoded text.

## PWA (installable)

The site installs as an app (Add to Home Screen / install icon):

- `public/manifest.webmanifest` — name, icons, `start_url`/`scope` = `/picha/`.
- `public/sw.js` — service worker (network-first pages, cache-first assets).
  Bump `CACHE` (`picha-vN`) when the precache list changes.
- Registration + `<link rel="manifest">` + apple-touch meta live in
  `src/layouts/Layout.astro`. Use the `asset()` helper for base-prefixed URLs
  (BASE_URL already ends in `/` — don't double the slash).

### Regenerating icons

Icons are rasterized from `src/assets/icon-source.svg` with macOS `sips`
(no ImageMagick needed):

```bash
sips -s format png --resampleWidth 512 src/assets/icon-source.svg --out public/icon-512.png
sips -s format png --resampleWidth 192 src/assets/icon-source.svg --out public/icon-192.png
sips -s format png --resampleWidth 180 src/assets/icon-source.svg --out public/apple-touch-icon.png
```

`sips` can rasterize SVG → PNG directly. To base icons on a real photo instead,
point the source at the cropped photo and re-run.

## Conventions

- **Content lives in data**, not JSX/markup (see golden rule above).
- **Dark mode** is automatic via `prefers-color-scheme` (Tailwind `dark:`
  variants). Style both light and dark when adding UI.
- **Comments**: keep them minimal and about *why*, not *what*. No PII beyond
  what's already public about a house cat.
- **Accessibility**: SVGs have `role="img"` + `aria-label`; decorative emoji use
  `aria-hidden`. Keep it that way.
- Run `pnpm build` before committing — it typechecks and must pass clean.

## Replacing the avatar with a real photo

`CatAvatar.astro` is a drawing. To use a photo: add the image to `public/` (or
`src/assets/` + Astro `<Image>`), then swap the `<CatAvatar />` usages in
`index.astro`. Keep the rounded/haloed hero framing for consistency.

## Roadmap (not built yet)

Tools phase — each is a good candidate for an Astro island or its own page:
cat body-language guide, food/portion calculator, weight tracker, vet-visit
reminders. Don't build these until asked; Phase 1 is the profile.
