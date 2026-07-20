// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Deployed as a GitHub Pages *project* site: https://farzinmirzaie.github.io/picha
// `site` + `base` must match the repo so asset URLs resolve correctly.
// If this ever moves to a custom domain, set `site` to that domain and `base` to '/'.
export default defineConfig({
  site: 'https://farzinmirzaie.github.io',
  base: '/picha',
  integrations: [
    icon(),
    // the 404 page is for lost visitors, not for crawlers
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  // The Safety tab was folded into Care; keep old links working.
  // NOTE: destination must include the base — Astro doesn't prepend it here.
  redirects: { '/safety': '/picha/care/' },
  vite: {
    plugins: [tailwindcss()],
  },
});
