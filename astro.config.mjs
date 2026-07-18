// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site: https://farzinmirzaie.github.io/picha
// `site` + `base` must match the repo so asset URLs resolve correctly.
// If this ever moves to a custom domain, set `site` to that domain and `base` to '/'.
export default defineConfig({
  site: 'https://farzinmirzaie.github.io',
  base: '/picha',
  vite: {
    plugins: [tailwindcss()],
  },
});
