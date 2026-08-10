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
  data/supabase.ts     # shared Supabase env/config + fetch helper — server-only
  data/weights.ts      # build-time loader: weight ledger from Supabase
                       # (picha_weights) with seed fallback — server-only import
  data/training.ts     # build-time loader: training progress from Supabase
                       # (picha_training) merged into the picha.ts catalogue
  lib/dates.ts         # shared date helpers (dateLabel/shortLabel/addDays/inDaysLabel)
  lib/health.ts        # health-timeline derivations (upcoming / next / isDueSoon)
                       # — one source for the Health page, the Nav "due soon"
                       # tab badge, and the PWA app-icon badge
  lib/weight-viz.ts    # weight chart/stats renderers (build + client, no drift)
  lib/sb.ts            # Supabase REST/RPC helpers for client scripts
  i18n/ui.ts           # i18n POC dictionary: LOCALES + per-language strings
                       # keyed for the client swap engine. See § Languages
  layouts/Layout.astro # <html> shell, fonts, PWA, ClientRouter, shared scripts
  components/          # feature blocks + page chrome (design primitives in ui/)
    Nav.astro          # tab nav: desktop pill bar + mobile bottom tab bar (TABS array)
    PageHeader.astro   # sub-page header (kicker, serif title, blurb; avatar md+ only)
    PassportDialog.astro # the pet-passport <dialog> + opener script — include once
                       # per page; any [data-passport-open] element opens it (Tools)
    LangPicker.astro   # i18n POC: language picker (shown every visit) + the
                       # client swap engine; any [data-lang-open] opens it. See
                       # § Languages. Include once (already in Layout)
    ShareDialog.astro  # share sheet: custom QR image (assets/qr.png) + Web Share /
                       # copy-link; any [data-share-open] element opens it (Home)
    TrainingRules.astro # the Academy's session-rules card (hub + course pages)
    SignalCard.astro   # one body-language signal card (photo + mood chip above
                       # the title + read) for /body-language; shared across
                       # every body part (ears, eyes, future) so cards match
    ToolCard.astro     # one "In service" card on Tools (icon + title + blurb +
                       # caret); href → <a>, else <button> (the passport opener)
    WeighInForm.astro  # the weigh-in entry form — rendered twice on /weight
                       # (desktop accordion after the ledger + mobile dialog
                       # opened from the app-bar action)
    Footer.astro       # paw divider + credits — desktop-only unless `showOnMobile`
    ui/                # reusable design primitives — reach for these first
      Button.astro     # the pill / form button. variant solid|outline, `block`
                       # for a full-width form button, optional icon, href → <a>
                       # else <button>; extra attrs (data-*, type) pass through.
      IconButton.astro # round icon-only action (app-bar). icon + label (a11y);
                       # href → <a> else <button>; extra attrs pass through.
      SectionLabel.astro # the uppercase "eyebrow" heading above nearly every
                       # section. Slot = text; tone blush|red|amber; optional
                       # icon; tag h2|h3|p|span; spacing/reveal via `class`.
      IconBadge.astro  # the round icon circle that leads a row/card/callout.
                       # size sm|md|lg, tone blush|amber|red.
      Chip.astro       # small pill/badge (status or meta tag). tone
                       # neutral|amber|blushSolid, optional leading icon.
                       # (JS-toggled chips stay inline — see the component.)
      SheetHeader.astro # the sticky blush title bar + close button inside a
                       # dialog.sheet (Share/Passport/weigh-in dialogs).
      StatStrip.astro  # snap-scroll stat-tile carousel (Health vitals + Weight
                       # stats): edge fade gradients that show only when there's
                       # more to scroll, and reveals as one unit so every tile
                       # (incl. off-screen) is loaded, not popping in on scroll.
      StatTile.astro   # one tile inside a StatStrip. Dynamic tiles pass client
                       # hooks via valueAttrs/subAttrs (data-age, data-stat, …),
                       # never hand-written markup. DON'T add `.reveal`.
      SegmentedTabs.astro # the sliding-thumb pill tab control + switching
                       # script. Render it, then sibling [data-seg-panel={id}]
                       # panels (Health timeline filter, Reading-Picha parts).
  pages/
    index.astro        # Home — hero, share dialog (QR), story, get-to-know-her
    health.astro       # Health — vitals strip, segmented timeline, emergency
    care.astro         # Care — two zones: "Today's rounds" checklist (the daily
                       # tool) + "The care manual" (grooming, menu, litter, house
                       # rules, toxic list). If-found/contact lives on Home + Health.
    tools.astro        # Tools — in-service list (passport, weight) + 3am note
    weight.astro       # Weight tracker — build-time SVG chart + stats + ledger,
                       # all rendered from weightHistory (current="tools")
    cat-years.astro    # Cat-years converter — her age in human years + slider
                       # converter + life stages; logic (catYears, humanAgeLine,
                       # felineStages) lives in picha.ts (current="tools")
    training/index.astro   # Royal Academy hub — courses grouped by status
    training/[slug].astro  # one page per course: step ladder, rules, practice tick
    body-language.astro    # "Reading Picha" — body-language field guide; ears,
                       # eyes + tail (earSignals/eyeSignals/tailSignals, one
                       # segment each, via the shared SignalCard); paws later
                       # (current="tools")
  styles/global.css    # Tailwind @theme (paper/plum/ink/blush/amber) + animations
  assets/
    picha.jpg          # avatar photo (astro:assets; also the source for app icons)
    ears/ear-*.png     # body-language ear crops, keyed by earSignals[].id
    eyes/eye-*.png     # body-language eye crops, keyed by eyeSignals[].id
    tails/tail-*.png   # body-language tail crops, keyed by tailSignals[].id
public/favicon.svg     # Phosphor paw-print on a blush tile (photo is mush at 16px)
public/icon-*.png      # PWA icons — the paw tile (favicon art at app size)
public/notification-icon.png # push large-icon: her face (must differ from the
                       # paw badge, or Android shows the same image twice)
  pages/llms.txt.ts    # /llms.txt — whole site as markdown for AI agents,
                       # generated from picha.ts at build (llmstxt.org)
public/robots.txt      # points at sitemap-index.xml + llms.txt
public/sw.js           # service worker: SWR pages, cache-first assets, Web Push
  lib/push.ts          # client Web Push opt-in (subscribe/unsubscribe/state)
scripts/notify/        # scheduled reminder sender (Node/tsx; Web Push)
  index.ts             # orchestrator: read subs → run providers → push → prune
  lib.ts               # service-role Supabase helpers + MYT date math + types
  providers/           # one module per reminder type (add here to extend)
supabase/schema.sql    # weights/training/rounds + push_subscriptions + RLS/RPCs
.mcp.json              # Supabase MCP for Claude Code (authenticate via /mcp)
.env.example           # SUPABASE_URL/ANON_KEY + PUBLIC_VAPID_KEY for local builds
.github/workflows/deploy.yml  # build + deploy Pages + auto-release + nightly cron
.github/workflows/notify.yml  # push reminders cron (every 3h, 09:00–21:00 MYT)
docs/notifications.md  # Web Push setup, secrets + how to add a reminder
astro.config.mjs       # site + base (GitHub Pages project site) + sitemap
```

### Reusable components (reach for these first)

Before hand-writing markup, check whether a component already covers it — the
UI is built from a small set of primitives, and consistency depends on reusing
them. If you find yourself repeating a class string across pages, that's the
signal to extract a new component (and document it here), not copy-paste.

- **`Button`** — every pill / form button (share, call, lullaby CTA, form
  submits, registrar actions). `variant` solid|outline, `block` for full-width
  forms, optional `icon`, `href` for links. Don't re-type the button classes.
- **`IconButton`** — the round icon-only app-bar action (share, weigh-in).
- **`SheetHeader`** — the title bar + close button inside a `dialog.sheet`.
- **`SectionLabel`** — every uppercase eyebrow heading ("Grooming", "The
  ledger", "House rules"). Never hand-write the `text-[11px] … tracking-[0.24em]
  … uppercase` string again.
- **`IconBadge`** — the round icon circle leading a row/card/callout
  (`sm`/`md`/`lg`, `blush`/`amber`/`red`).
- **`Chip`** — a small status/meta pill. (A chip whose look is toggled by a
  client script stays inline with its own `class:list` — the component is for
  static ones.)
- **`StatStrip` + `StatTile`** — the snap-scroll stat carousel and its tiles
  (Health vitals, Weight stats). Dynamic tiles get client hooks via
  `valueAttrs`/`subAttrs`; never re-hand-roll a tile or the strip.
- **`SegmentedTabs`** — the sliding-thumb pill tab control. Pass `tabs`, then
  add sibling `[data-seg-panel={id}]` panels (first shown, rest `hidden`); the
  component's script wires the switching. Used by the Health timeline filter and
  the Reading-Picha body parts.
- **`PageHeader`, `Footer`, `Nav`** — page chrome. **`TrainingRules`,
  `WeighInForm`, `PassportDialog`, `ShareDialog`** — feature blocks.
- **Dialogs**: use `dialog.sheet` + `bindDialog()` (lib/dialog.ts), never a
  bespoke modal (see § PWA native patterns).

Gotcha: don't name an Astro component prop `as` — it silently breaks Astro's
`Props` typing (use `tag`, as `SectionLabel` does).

### Supabase (cloud data)

The weight ledger lives in Supabase (`picha_weights` table; schema + RLS +
seed + the `log_weight` RPC in `supabase/schema.sql`). `src/data/weights.ts`
fetches it **at build time** over PostgREST using `SUPABASE_URL` +
`SUPABASE_ANON_KEY` (GitHub Actions secrets; `.env` locally — accepts the URL
with or without a `/rest/v1/` suffix) and falls back to the seed list in
picha.ts when they're missing or the fetch fails — builds never break. Never
import weights.ts from client scripts.

On top of the build-time render, the weight page is **live**: its client
script re-fetches the ledger on every visit (on load, on ClientRouter
`astro:page-load`, and when the tab/app returns to the foreground —
`visibilitychange`/`pageshow`, so a weigh-in logged elsewhere shows up without
a manual reload) and re-renders chart + stats + ledger via the shared
`src/lib/weight-viz.ts` module (pure string/DOM renderers used by both build
and client — keep them in sync by construction, don't fork the markup). The
Health weight tile and the Training hub/course pages revalidate the same way. The anon key is embedded in the page on purpose: RLS
allows `select` only. **Writes** go through the entry form on the weight
page, which calls the `log_weight` RPC — a SECURITY DEFINER function that
checks a staff PIN stored in the `private` schema (set it once in SQL; see
schema.sql). Same-date entries update the existing row. The PIN is remembered
per device (localStorage `picha-staff-pin`, shared with training). The Health
vitals weight tile also refreshes client-side from the ledger. The daily
rebuild (noon MYT / 04:00 UTC) keeps the static fallback + llms.txt current.

**Training progress** works the same way: content (steps, copy) stays in
`trainingCourses` in picha.ts; progress (`steps_done`, `started_on`) lives in
the `picha_training` table keyed by slug, merged at build time by
`src/data/training.ts` and re-fetched client-side on the hub + course pages.
Writes go through the `log_training` RPC (same registrar PIN) via the
"Registrar controls" on each course page: begin course, mark step passed,
undo. Rows are created on first write, so new courses only need a picha.ts
entry. The values in picha.ts are the offline seed only.

**Daily rounds** (the Care checklist) are shared across the staff's devices:
the `picha_rounds` table holds one row per day of completed item ids, read
client-side on load + refocus + `pageshow`, toggled through the `set_round`
RPC (same registrar PIN). Item definitions live in `dailyChecklist` in
picha.ts, listed in the order they happen across a day (no time-of-day labels)
— a task done more than once (meals, play) just appears more than once with
its own id. The store only tracks ids, so add/remove/reorder items freely
without touching the DB. A localStorage cache (`picha-rounds`) backs it for
offline/optimistic use. The checklist shows a sync-state note with a "Turn on
sync" action linking to the Staff room (the one place the registrar PIN is
entered now). It handles loading + error states: the first shared pull dims and
pulses the list with a "Loading…" note (bounded by an 8s timeout so a stalled
network can't spin forever), a failed pull falls back to the cache with an amber
"Offline" note, and each write pulses its own tickbox while in flight and
surfaces PIN/cloud errors instead of failing silently. A device without the PIN
just stays local. The list rolls over at **midnight MYT** (the
`careDayKey()` adds 8h to `now` → the UTC date = the MYT calendar date, so the
boundary is 00:00 MYT on every device regardless of its own timezone); the
reset is entirely this date key (a new day queries a date with no row), not
the build.

**Push subscriptions** live in `push_subscriptions` (endpoint + keys). Unlike
the other tables it has **no anon read** (subscriptions are device secrets):
the client writes via the PIN-gated `save_push_subscription` /
`delete_push_subscription` RPCs, and the reminder sender reads it with the
`service_role` key (which bypasses RLS). See § PWA notifications and
`docs/notifications.md`.

### AI-friendly surface

The site is meant to be readable by agents as well as humans:

- **`/llms.txt`** (src/pages/llms.txt.ts) renders the entire profile as one
  markdown document straight from `picha.ts` — same facts as the HTML, plain
  voice. It's linked from every page's `<head>` (`rel="alternate"`) and from
  robots.txt. New data added to picha.ts should be added there too.
- **`@astrojs/sitemap`** emits `sitemap-index.xml` (linked in `<head>` via
  `rel="sitemap"` and robots.txt).

### The golden rule: edit data, not markup

**To update Picha's info, edit [`src/data/picha.ts`](src/data/picha.ts).** The
pages are data-driven — add/adjust fields there and the UI follows. Only touch
pages/components when changing *layout or design*, not content.

- Her **age is computed** from `BIRTH_DATE` (`ageLabel()`), so it never goes
  stale. Don't hardcode age anywhere.
- **`healthTimeline`** is one dated list; `health.astro` splits it at render
  time into *done* (past dates), *coming up* (future), and *on the list*
  (no date). To record a completed visit or schedule something, just add/date
  an entry — no markup changes.
- **`treatment`** is the standing "Doctor's orders" slot on Health: add an
  entry whenever the vet prescribes a medication or routine, delete it when
  the course ends. The section (and its llms.txt block) hides when the list
  is empty. Doctor's orders lives on Health only (not duplicated on Care).
- **`recurringCare`** holds repeating upkeep (`intervalDays` + `lastDone` →
  computed next-due; an explicit `nextDue` overrides the computation — use it
  to anchor a first appointment, then set `lastDone` and drop it). It merges
  into "Coming up" sorted by due date, with "every X" and `where` chips
  (at home / at the vet / at the salon); entries without `lastDone`/`nextDue`
  show "not started yet" at the end. If a due date passes before the next
  rebuild, the client-side countdown chip shows "(overdue)". **After doing a
  recurring task, update its `lastDone`** — the next due date and the
  "Next due" vitals tile follow automatically.
- **`trainingCourses`** holds course CONTENT for the Royal Academy
  (/training); PROGRESS lives in Supabase (see § Supabase). Status is
  derived: `startedOn` set → in session; `stepsDone >= steps.length` →
  graduated; else on the syllabus. **Record milestones with the registrar
  controls on the course page**, not by editing picha.ts. The "practiced
  today" tick on course pages is localStorage (`picha-training`,
  `{date, done[slug]}`, daily reset) — milestones are cloud data, daily
  practice is on-device.
- **Weight ledger lives in Supabase** (`picha_weights`; see § Supabase). All
  weight UI (Weight tracker chart/stats/ledger, Health vitals tile,
  llms.txt) reads from `src/data/weights.ts` at build time. **To log a
  weigh-in, insert a row in the Supabase Table Editor** (date + kg); it
  deploys on the next push/nightly rebuild. `weightHistory` in picha.ts is
  only the offline seed fallback — don't log real weigh-ins there.
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

`.github/workflows/deploy.yml` runs on every push to `master` (plus a daily
noon-MYT / 04:00 UTC rebuild and manual dispatch, which redeploy but skip the
release):

1. **build** — `pnpm build` (with `SUPABASE_URL`/`SUPABASE_ANON_KEY` secrets
   for the weight-ledger fetch), upload `dist/` as the Pages artifact.
2. **deploy** — publish to GitHub Pages.
3. **release** — auto-increment the patch version (`vX.Y.Z`), tag it, and create
   a GitHub Release (push events only).

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

- `[data-age]` spans → refilled via `ageLabel()` from `src/data/picha.ts`
  (fractional months to one decimal, e.g. "~7.7 months old").
- `[data-until="YYYY-MM-DD"]` spans → filled with `inDaysLabel()` (in
  `lib/dates.ts`): "today"/"tomorrow"/"in 12 days", and month+day phrasing past 30
  days ("in 2 months and 4 days"). Dates more than ~2 months out get no
  countdown at all. Past dates show the `data-overdue` text if set, else the
  confirm-with-the-vet note.
- `.reveal` elements → scroll-reveal via IntersectionObserver (elements in
  the same intersection batch get a short capped stagger, assigned by the
  script); skipped under `prefers-reduced-motion`.
- **"Due soon"** (Health `[data-due-soon]` card + the Nav Health tab badge +
  the PWA app-icon badge) → decided live by `applyDueSoon()` in Layout against
  the visitor's clock, off the soonest due-date on `<body data-health-next>`
  (threshold: `DUE_SOON_DAYS` = within 2 days / overdue). Runs on load,
  `astro:page-load` and `visibilitychange`, so it flips across midnight / on
  refocus without a rebuild. The card is always in the DOM (hidden), so it must
  NOT use `.reveal`; its build-time state is the no-JS fallback.

The server still renders a build-time value inside those spans as the no-JS
fallback. **Add new relative dates by using these hooks**, not hardcoded text.
(The health timeline's done/upcoming *split* is build-time — fine, since every
push rebuilds.)

## PWA (installable)

The site installs as an app (Add to Home Screen / install icon):

- `public/manifest.webmanifest` — name, icons, `start_url`/`scope` = `/picha/`.
- `public/sw.js` — service worker. Pages/HTML use **stale-while-revalidate**
  (serve the cached shell instantly, refresh the cache in the background) so
  in-app ClientRouter navigations — which are NOT `mode:'navigate'` and would
  otherwise hit the cache-first path and go stale — stay current without a
  manual reload; hashed assets are cache-first; cross-origin (Supabase) is never
  cached, so live data is always fresh. Bump `CACHE` (`picha-vN`) when the
  precache list OR the fetch strategy changes.
- Registration + `<link rel="manifest">` + apple-touch meta live in
  `src/layouts/Layout.astro`. Use the `asset()` helper for base-prefixed URLs
  (BASE_URL already ends in `/` — don't double the slash).
- **Native feel**: scrollbars are hidden under `@media (display-mode:
  standalone)` (global.css), and `Layout.astro` fires `navigator.vibrate(8)` on
  `pointerdown` of any link/button (Android haptics; iOS lacks the API — safe
  no-op). Keep both when adding new interactive UI.
- **Mobile chrome**: sticky app bar (tab label + optional right-side action,
  in `Layout.astro`, `md:hidden`) on top + bottom tab bar. The footer is
  desktop-only except on Tools (`<Footer showOnMobile />`); body bottom padding
  (`pb-20 md:pb-0`) clears the tab bar. **New pages: no mobile footer** — use
  plain `<Footer />` (desktop-only), and give the last section its own
  `pb-10 md:pb-0` so the content has a little breathing room above the tab bar
  on mobile (see body-language.astro).
- **Native UI patterns in use** (reuse these before inventing new ones):
  snap-scroll stat tiles (the `StatStrip.astro` component — Health vitals +
  Weight stats), segmented
  control with sliding thumb (`[data-seg]`, Health timeline), grouped inset
  lists (rounded card + `divide-y` rows, Care/emergency), modal dialogs
  (`dialog.sheet` + `bindDialog()` from lib/dialog.ts: centred card on
  desktop, slide-up bottom sheet on mobile — give new dialogs `class="sheet"`
  and `max-md:rounded-b-none` on the inner card), and the "Today's rounds"
  checklist (Supabase `picha_rounds` shared across devices + `picha-rounds`
  localStorage cache; item ids come from `dailyChecklist` in picha.ts — keep
  them stable). Content inside initially-hidden panels must NOT use `.reveal`
  (the observer never fires for them).
- **Notifications**: Web Push is built (background reminders that fire while
  the app is closed; Android/Chrome mainly, installed iOS 16.4+). Devices
  opt in via the **Reminders** toggle in the Staff room (PIN-gated); the
  `push` / `notificationclick` handlers in `public/sw.js` render a generic
  `{title, body, url, tag, setBadge}` payload (`setBadge` lights the app-icon
  badge from the SW while closed); the scheduled sender (`scripts/notify/`, run
  by `.github/workflows/notify.yml` every 3h, 09:00–21:00 MYT) reads
  subscriptions and pushes. Two providers today: `daily-checklist` (every tick;
  pending Care rounds) and `due-soon` (once a day / manual; soonest health item
  within `DUE_SOON_DAYS`, also sets the badge — reuses `lib/health`). **Extend
  it by adding a provider** in `scripts/notify/providers/` — no client/SW
  changes. Full setup, secrets and the extension guide: `docs/notifications.md`.
  (Local scheduled notifications without a server aren't possible — the
  Notification Triggers API is dead.)

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

## Languages (i18n) — how to handle translation

The site is going **fully multilingual**. Treat i18n as a first-class concern
in every change from now on.

**Standing rules (apply to all new work):**

- **No hardcoded user-facing English in markup.** Every string a visitor can
  read is a keyed entry with one block per locale; components render the active
  locale's string. If you add copy, add the key to **every** locale block in
  the same change (an English-only addition is a bug).
- **Facts vs copy.** Keep language-neutral facts (dates, weights in kg, phone
  numbers, doses, product names, ids, icons, `intervalDays`) single-source; only
  **prose** is per-locale. So a weight/date/product change is still made once,
  and translations never drift from the facts. When you touch `picha.ts`, move
  the prose into the locale dictionaries and leave the facts in place.
- **Translate the voice, not the words.** Keep the playful "staff of the cat"
  register in every language (Malay, Chinese, …); a literal translation that
  loses the humour is wrong.
- **Safety/medical copy stays exact and gets owner-verified.** `toxicItems`,
  `callVetIf`, `treatment`, doses, `recovery`, and anything medical must be
  translated carefully and **confirmed by the owners** before shipping — the
  "jokes end where the vet begins" rule holds in every language. Flag these for
  review rather than assuming a translation is safe.
- **Languages:** English (default), Bahasa Malaysia; Chinese (`zh`) planned.
  Add one by adding its code to `LOCALES`, an endonym to `localeLabels`, and a
  full locale block with the same keys; the picker/switcher (`LangPicker`) picks
  it up automatically.

**Mechanism.** Target is **Astro native i18n**: locale-prefixed static routes
(`/picha/`, `/picha/ms/`, …) via `astro.config` `i18n`, `Astro.currentLocale`,
SEO-friendly, English served with no JS. Locale choice is remembered
(localStorage `picha-lang`) and the picker/switcher navigate between locale
routes. Dictionaries live in `src/i18n/`. (Migration from the earlier
client-swap POC is in progress — update this line as pages move over.)

## Conventions

- **Git workflow**: always `git pull origin master` before starting, then
  commit and **push directly to `master`** (owner's standing instruction —
  every push deploys). Main development happens on Claude desktop; mobile
  sessions make small tweaks, so syncing first avoids clobbering each other.
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
- **No em dashes (—) in site copy** (owner's rule; they read as AI-written).
  Use commas, semicolons, colons, periods or parentheses instead. En dashes in
  numeric ranges (2–4 weeks, 3–4.5 kg) are fine. Applies to everything
  rendered on the site, not to code comments or this file.
- **Icons, not emoji.** UI icons are Phosphor via `astro-icon` (build-time
  inline SVG, zero JS): `<Icon name="ph:paw-print" />` from
  'astro-icon/components'. Data `icon` fields hold the full name (`ph:x`).
  Verify a name exists in `@iconify-json/ph/icons.json` before using it
  (`comb` doesn't — we use `paint-brush`). Emoji only survive in <title> tags.
- **Tabs**: Home / Health / Care / Tools. Safety was folded into Care
  (house rules + toxic list + if-found). New tools: build the page, list it on
  tools.astro, or give it a TABS entry (keep the mobile grid-cols in sync with
  the tab count).
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
