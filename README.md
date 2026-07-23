# Picha 🐾

The official website of **Picha**, a small white cat who owns an apartment in
Kuala Lumpur and employs two humans as full-time staff. This is her profile,
her health file, her daily care protocol, and a growing drawer of tools the
staff built to serve her better. She has not reviewed the code. She has
reviewed the staff.

🔗 **Live:** <https://farzinmirzaie.github.io/picha> · installable as an app
(Add to Home Screen) and works offline.

## Tech

[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) +
TypeScript, with [Supabase](https://supabase.com) for the live bits (weight
ledger, training progress, shared daily rounds). Multi-page with app-style tab
navigation (Home / Health / Care / Tools), PWA, and a fresh build shipped to
GitHub Pages on every push to `master`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321/picha
pnpm build      # typecheck + static build
pnpm preview    # preview the build
```

Live data is optional locally: without Supabase keys the build falls back to
the seed data, so it never breaks. Copy [`.env.example`](.env.example) to
`.env` if you want the real cloud data.

## Updating Picha's info

Almost everything about Picha lives in one file,
[`src/data/picha.ts`](src/data/picha.ts). Edit the data and the pages follow —
you rarely touch markup. Her age is computed from her birthday on the visitor's
device (so it never goes stale), and the health timeline sorts itself into
done / coming up / still to book from the entry dates. The weight ledger,
training progress and daily rounds are the exception: those are shared cloud
data (Supabase), logged through the Staff room, not the repo.

## For AI agents (and humans building here)

Read [CLAUDE.md](CLAUDE.md) first — it's the source of truth for the
architecture, the reusable component library, the site's voice, the Supabase
setup, and the roadmap. There's also a machine-readable
[`/llms.txt`](https://farzinmirzaie.github.io/picha/llms.txt) that renders the
whole profile as plain markdown.
