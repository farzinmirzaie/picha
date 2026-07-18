# Picha 🐾

A little website for **Picha** the cat — her profile, health records, and daily
care guide. Built to grow into a set of cat-care tools over time.

🔗 **Live:** <https://farzinmirzaie.github.io/picha>

## Tech

[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) +
TypeScript, deployed to GitHub Pages via GitHub Actions.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321/picha
pnpm build      # typecheck + static build
pnpm preview    # preview the build
```

## Updating Picha's info

Everything about Picha lives in
[`src/data/picha.ts`](src/data/picha.ts). Edit that file — the page updates
itself. Her age is calculated automatically from her birth date.

## Deploy

Push to `master`. GitHub Actions builds the site, deploys it to GitHub Pages,
and creates a versioned release automatically.

> First run only: if Pages isn't enabled yet, set **Settings → Pages → Source:
> GitHub Actions** and re-run the workflow.

## For AI agents

See [CLAUDE.md](CLAUDE.md) for architecture, conventions, and the roadmap.
