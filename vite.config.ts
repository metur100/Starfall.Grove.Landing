import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { legalRoutes, legalSlugs, type LegalSlug } from './src/legal/routes';

// The Starfall Grove website, a project of its own. It draws the heroes with the game's own paper art: a copy of the
// game's sources in src/game-art/, imported as `@game/…`. Refresh it with `npm run sync-art -- <game repo>`.

const readSite = () => JSON.parse(readFileSync(resolve(__dirname, 'site.json'), 'utf8')) as Record<string, string>;

/** Fills `%site.key%` in every page from site.json (developer, contact, store links, game address). */
const site = (): Plugin => ({
  name: 'site-config',
  transformIndexHtml(html) {
    const v = readSite();
    return html.replace(/%site\.(\w+)%/g, (m, k: string) => k in v ? v[k] : m);
  },
});

/** Gives each legal page its own route, `<base><slug>/`, all from legal.html with the route's title and description. */
const legalPages = (base: string): Plugin => {
  const fill = (html: string, slug: LegalSlug) => {
    const page: Record<string, string> = { slug, ...legalRoutes[slug] };
    return html.replace(/%page\.(\w+)%/g, (m, k: string) => k in page ? page[k] : m);
  };
  const shell = resolve(__dirname, 'legal.html');
  const routeOf = new RegExp(`^${base.replace(/[.]/g, '\\.')}(${legalSlugs.join('|')})/?$`);
  return {
    name: 'legal-pages',
    enforce: 'post',
    // Development: answer /privacy/ and friends with the shell, as the build will.
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const slug = routeOf.exec(new URL(req.url ?? '/', 'http://x').pathname)?.[1] as LegalSlug | undefined;
        if (!slug) return next();
        try {
          const html = await server.transformIndexHtml(req.url!, readFileSync(shell, 'utf8'));
          res.setHeader('Content-Type', 'text/html'); res.end(fill(html, slug));
        } catch (e) { next(e); }
      });
    },
    // Build: write the shell out once per route as <slug>/index.html, and drop the shell itself.
    generateBundle(_, bundle) {
      const out = bundle['legal.html'];
      if (out?.type !== 'asset') return;
      for (const slug of legalSlugs) this.emitFile({ type: 'asset', fileName: `${slug}/index.html`, source: fill(String(out.source), slug) });
      delete bundle['legal.html'];
    },
  };
};

// Every path is built from the site's own address (site.json siteUrl), so it works at a domain root or at a sub-path.
const base = new URL(readSite().siteUrl).pathname;

export default defineConfig({
  base,
  plugins: [react(), site(), legalPages(base)],
  resolve: { alias: { '@game': resolve(__dirname, 'src/game-art') } },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
});
