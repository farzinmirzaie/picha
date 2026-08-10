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
  // Multilingual: English at the root, other locales prefixed (/picha/ms/…).
  // `fallback` auto-generates locale routes from the default for pages not yet
  // translated, so nothing 404s during the rollout.
  i18n: {
    locales: ['en', 'ms'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false, fallbackType: 'rewrite' },
    fallback: { ms: 'en' },
  },
  integrations: [
    icon(),
    // the 404 page is for lost visitors, not for crawlers
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
