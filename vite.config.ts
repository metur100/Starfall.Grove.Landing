import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// The Starfall Grove website, a project of its own. It draws the heroes with the game's own paper art: a copy of the
// game's sources in src/game-art/, imported as `@game/…`. Refresh it with `npm run sync-art -- <game repo>`.

/** Fills `%site.key%` in every page from site.json (developer, contact, store links, game address). */
const site = () => ({
  name: 'site-config',
  transformIndexHtml(html: string) {
    const v = JSON.parse(readFileSync(resolve(__dirname, 'site.json'), 'utf8')) as Record<string, string>;
    return html.replace(/%site\.(\w+)%/g, (m, k: string) => k in v ? v[k] : m);
  },
});

export default defineConfig({
  base: './',
  plugins: [react(), site()],
  resolve: { alias: { '@game': resolve(__dirname, 'src/game-art') } },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        support: resolve(__dirname, 'support.html'),
        imprint: resolve(__dirname, 'imprint.html'),
      },
    },
  },
});
