import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { LANGUAGE, LOCALES, prefix, isLocale, type Locale } from './src/i18n/locales';
import { page as en } from './src/i18n/page.en';
import { page as de } from './src/i18n/page.de';
import { page as bs } from './src/i18n/page.bs';
import { legalRoutes, legalSlugs, type LegalSlug } from './src/legal/routes';

// The Starfall Grove website, a project of its own. It draws the heroes with the game's own paper art: a copy of the
// game's sources in src/game-art/, imported as `@game/…`. Refresh it with `npm run sync-art -- <game repo>`.
// Every page is written once per language: English at the root, the others under /de/ and /bs/.

const readSite = () => JSON.parse(readFileSync(resolve(__dirname, 'site.json'), 'utf8')) as Record<string, string>;
const WORDS: Record<Locale, Record<string, string>> = { en, de, bs };
const NOSCRIPT: Record<Locale, string> = {
  en: 'This page needs JavaScript. You can reach us at',
  de: 'Diese Seite braucht JavaScript. Du erreichst uns unter',
  bs: 'Ova stranica treba JavaScript. Možeš nas kontaktirati na',
};
const LANGUAGE_LABEL: Record<Locale, string> = { en: 'Language', de: 'Sprache', bs: 'Jezik' };

/** Fills `%site.key%` in every page from site.json (developer, contact, store links, game address). */
const site = (): Plugin => ({
  name: 'site-config',
  transformIndexHtml(html) {
    const v = readSite();
    return html.replace(/%site\.(\w+)%/g, (m, k: string) => k in v ? v[k] : m);
  },
});

/** The address of one page (`path` is '' for the home page or '<slug>/') in one language, from the site's root. */
const pathOf = (base: string, l: Locale, path: string) => `${base}${prefix(l)}${path}`;

/** What a page knows about its language: `%page.lang%`, its address, the other languages' copies and the switcher. */
const localeVars = (base: string, l: Locale, path: string): Record<string, string> => {
  const url = (x: Locale) => `${readSite().siteUrl}${prefix(x)}${path}`;
  return {
    lang: l, ogLocale: LANGUAGE[l].og, url: url(l), noscript: NOSCRIPT[l],
    alternates: [...LOCALES.map(x => `    <link rel="alternate" hreflang="${x}" href="${url(x)}" />`), `    <link rel="alternate" hreflang="x-default" href="${url('en')}" />`].join('\n'),
    langSwitch: `<span class="lang-switch" role="group" aria-label="${LANGUAGE_LABEL[l]}">${LOCALES.map(x =>
      `<a href="${pathOf(base, x, path)}" hreflang="${x}" lang="${x}" title="${LANGUAGE[x].name}"${x === l ? ' aria-current="true"' : ''}>${LANGUAGE[x].short}</a>`).join('')}</span>`,
  };
};

/** The home page in one language: its words (`%t.key%`) and what it knows about its language (`%page.key%`). */
const fillHome = (html: string, base: string, l: Locale) => {
  const words = WORDS[l], vars = localeVars(base, l, '');
  return html
    .replace(/%t\.([\w.]+)%/g, (m, k: string) => { if (!(k in words)) throw new Error(`No ${l} words for ${k}`); return words[k]; })
    .replace(/%page\.(\w+)%/g, (m, k: string) => k in vars ? vars[k] : m);
};

/** Writes the home page and each legal page (`<base>[lang/]<slug>/`, all from legal.html) in every language. */
const pages = (base: string): Plugin => {
  const fillLegal = (html: string, l: Locale, slug: LegalSlug) => {
    const vars: Record<string, string> = { slug, ...legalRoutes[l][slug], ...localeVars(base, l, `${slug}/`) };
    return html.replace(/%page\.(\w+)%/g, (m, k: string) => k in vars ? vars[k] : m);
  };
  const shell = resolve(__dirname, 'legal.html');
  const esc = base.replace(/[.]/g, '\\.');
  const legalRoute = new RegExp(`^${esc}(?:(${LOCALES.filter(l => l !== 'en').join('|')})/)?(${legalSlugs.join('|')})/?$`);
  const homeRoute = new RegExp(`^${esc}(?:(${LOCALES.filter(l => l !== 'en').join('|')})/?)?(?:index\\.html)?$`);
  return {
    name: 'pages',
    enforce: 'post',
    // Development: answer each language's home and legal pages, as the build will write them.
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = new URL(req.url ?? '/', 'http://x').pathname;
        const legal = legalRoute.exec(path), home = !legal && homeRoute.exec(path);
        if (!legal && !home) return next();
        try {
          const l: Locale = isLocale((legal ?? home as RegExpExecArray)[1]) ? (legal ?? home as RegExpExecArray)[1] as Locale : 'en';
          const file = legal ? shell : resolve(__dirname, 'index.html');
          const html = await server.transformIndexHtml(req.url!, readFileSync(file, 'utf8'));
          res.setHeader('Content-Type', 'text/html');
          res.end(legal ? fillLegal(html, l, legal[2] as LegalSlug) : fillHome(html, base, l));
        } catch (e) { next(e); }
      });
    },
    // Build: write index.html and legal.html out once per language (and per route), and drop the legal shell itself.
    generateBundle(_, bundle) {
      const home = bundle['index.html'], legal = bundle['legal.html'];
      if (home?.type === 'asset') {
        const src = String(home.source);
        for (const l of LOCALES) if (l !== 'en') this.emitFile({ type: 'asset', fileName: `${prefix(l)}index.html`, source: fillHome(src, base, l) });
        home.source = fillHome(src, base, 'en');
      }
      if (legal?.type === 'asset') {
        for (const l of LOCALES) for (const slug of legalSlugs) this.emitFile({ type: 'asset', fileName: `${prefix(l)}${slug}/index.html`, source: fillLegal(String(legal.source), l, slug) });
        delete bundle['legal.html'];
      }
    },
  };
};

// Every path is built from the site's own address (site.json siteUrl), so it works at a domain root or at a sub-path.
const base = new URL(readSite().siteUrl).pathname;

export default defineConfig({
  base,
  plugins: [react(), site(), pages(base)],
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
