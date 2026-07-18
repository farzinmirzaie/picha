# Picha 🐾

A little website for **Picha** the cat — her profile, health file, daily care
protocol and safety notes, maintained by her staff. Installable as an app on
your phone, and built to grow extra care tools over time.

🔗 **Live:** <https://farzinmirzaie.github.io/picha>

## Tech

[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) +
TypeScript. Multi-page with app-style tab navigation (Home / Health / Care /
Safety), PWA (installable + offline), deployed to GitHub Pages on every push to
`master`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321/picha
pnpm build      # typecheck + static build
pnpm preview    # preview the build
```

## Updating Picha's info

Everything about Picha lives in
[`src/data/picha.ts`](src/data/picha.ts). Edit that file — the pages update
themselves. Her age is calculated from her birth date on the visitor's device,
and the health timeline sorts itself into done / coming up / still to book from
the entry dates.

## For AI agents

See [CLAUDE.md](CLAUDE.md) for architecture, conventions (including the site's
voice), and the roadmap.
