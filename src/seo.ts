// What search engines and link previews read: the structured data (JSON-LD) of every page, the sitemap, robots.txt,
// the web manifest and the 404 page. vite.config.ts writes them at build time from site.json and each language's words,
// so keep this free of imports other than types.
import type { Locale } from './i18n/locales';

export type Site = Record<string, string>;
type Words = Record<string, string>;

/** The heroes and lands of the game, for the game's structured data. Their names are the game's own in every language. */
const HEROES: Array<[string, string]> = [['Mira', 'mira'], ['Kael', 'kael'], ['Lyra', 'lyra'], ['Riven', 'riven'], ['Wren', 'wren']];
const LANDS = ['Sunpetal Meadow', 'Whisperroot Woods', 'Starfall Summit', 'The Ember Wastes'];
/** The link-preview image (public/og-image.png). */
export const OG_IMAGE = { path: 'og-image.png', width: 1024, height: 1024, type: 'image/png' };

/** Words without their HTML, for places that only take plain text. */
export const plain = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
/** Text for an HTML attribute. */
export const attr = (s: string) => plain(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
/** JSON for a <script> tag: nothing in it can close the tag early. */
const script = (data: unknown) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const ids = (site: Site) => ({ website: `${site.siteUrl}#website`, publisher: `${site.siteUrl}#publisher`, game: `${site.siteUrl}#game`, image: `${site.siteUrl}#image` });

/** The home page in one language: the site, its publisher, the game itself, the page, its FAQ and its intro film. */
export function homeLd(site: Site, l: Locale, url: string, w: Words, locales: readonly string[]) {
  const id = ids(site), image = `${site.siteUrl}${OG_IMAGE.path}`;
  const stores = [site.playStoreUrl, site.appStoreUrl].filter(Boolean);
  const faq = Object.keys(w).filter(k => /^faq\.q\d+$/.test(k)).sort().map(k => ({
    '@type': 'Question', name: plain(w[k]), acceptedAnswer: { '@type': 'Answer', text: plain(w[k.replace('.q', '.a')] || '') },
  }));
  const graph = [
    { '@type': 'WebSite', '@id': id.website, url: site.siteUrl, name: site.name, inLanguage: locales, publisher: { '@id': id.publisher } },
    { '@type': 'Person', '@id': id.publisher, name: site.developer, email: `mailto:${site.email}`, url: site.siteUrl },
    { '@type': 'ImageObject', '@id': id.image, url: image, contentUrl: image, width: OG_IMAGE.width, height: OG_IMAGE.height, caption: plain(w['meta.imageAlt']) },
    {
      '@type': ['VideoGame', 'SoftwareApplication'], '@id': id.game, name: site.name, alternateName: plain(w['meta.title']),
      description: plain(w['meta.ldDescription']), url: site.gameUrl, image: { '@id': id.image },
      genre: ['Action RPG', 'Adventure', 'Role-playing game'], gamePlatform: ['Web browser', 'Android', 'iOS'],
      operatingSystem: 'Web browser, Android, iOS', applicationCategory: 'GameApplication', applicationSubCategory: 'Role-playing game',
      playMode: 'SinglePlayer', numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 1 },
      inLanguage: 'en', isAccessibleForFree: true, keywords: plain(w['meta.keywords']),
      author: { '@id': id.publisher }, publisher: { '@id': id.publisher }, creator: { '@id': id.publisher },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: site.gameUrl },
      character: HEROES.map(([name, key]) => ({ '@type': 'Person', name, jobTitle: plain(w[`title.${key}`] || '') })),
      gameLocation: LANDS.map(name => ({ '@type': 'Place', name })),
      trailer: { '@type': 'VideoObject', name: `${site.name} · ${plain(w['hero.watch'] || 'Intro')}`, description: plain(w['meta.ogDescription']), thumbnailUrl: image, contentUrl: `${site.siteUrl}Intro.mp4`, uploadDate: site.updated, inLanguage: 'en' },
      ...(stores.length ? { sameAs: stores } : {}),
    },
    {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: plain(w['meta.title']), description: plain(w['meta.description']), inLanguage: l,
      isPartOf: { '@id': id.website }, about: { '@id': id.game }, primaryImageOfPage: { '@id': id.image }, dateModified: site.updated,
    },
    ...(faq.length ? [{ '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: l, mainEntity: faq }] : []),
  ];
  return script({ '@context': 'https://schema.org', '@graph': graph });
}

/** A legal or help page: the page itself, and the breadcrumb back to the home page in its language. */
export function legalLd(site: Site, l: Locale, url: string, home: string, homeName: string, title: string, description: string) {
  const id = ids(site);
  return script({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: `${title} · ${site.name}`, description, inLanguage: l, isPartOf: { '@id': id.website }, about: { '@id': id.game }, publisher: { '@id': id.publisher }, dateModified: site.updated, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeName, item: home },
        { '@type': 'ListItem', position: 2, name: title, item: url },
      ] },
    ],
  });
}

/** `<meta property="og:locale:alternate">` for every language but this one. */
export const ogAlternates = (og: Record<string, string>, l: Locale) =>
  Object.entries(og).filter(([k]) => k !== l).map(([, v]) => `    <meta property="og:locale:alternate" content="${v}" />`).join('\n');

/** The sitemap: every page in every language, each with links to its other languages. */
export function sitemap(site: Site, pages: string[], locales: readonly Locale[], prefix: (l: Locale) => string) {
  const at = (l: Locale, p: string) => `${site.siteUrl}${prefix(l)}${p}`;
  const urls = pages.flatMap(p => locales.map(l => [
    '  <url>',
    `    <loc>${at(l, p)}</loc>`,
    `    <lastmod>${site.updated}</lastmod>`,
    `    <changefreq>${p ? 'yearly' : 'weekly'}</changefreq>`,
    `    <priority>${p ? '0.3' : l === 'en' ? '1.0' : '0.9'}</priority>`,
    ...locales.map(x => `    <xhtml:link rel="alternate" hreflang="${x}" href="${at(x, p)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${at('en', p)}" />`,
    ...(p ? [] : [`    <image:image><image:loc>${site.siteUrl}${OG_IMAGE.path}</image:loc></image:image>`]),
    '  </url>',
  ].join('\n')));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`;
}

export const robots = (site: Site) => `# Every page of the Starfall Grove website may be indexed.\nUser-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}sitemap.xml\n`;

/** The web manifest, so a phone that saves the site to its home screen gets the game's name and icon. */
export const manifest = (site: Site, base: string, description: string) => JSON.stringify({
  name: site.name, short_name: site.name, description, start_url: base, scope: base, display: 'browser', lang: 'en',
  background_color: '#1d1520', theme_color: '#1d1520',
  icons: [{ src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png' }, { src: `${base}apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
}, null, 2) + '\n';

/** GitHub Pages serves 404.html for any address that doesn't exist: a short page that points home and isn't indexed. */
export const notFound = (site: Site, base: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <meta name="theme-color" content="#1d1520" />
    <title>Page not found · ${site.name}</title>
    <link rel="icon" type="image/png" href="${base}icon-192.png" />
    <style>
      :root { color-scheme: dark; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1d1520; color: #fff4de; font: 18px/1.5 system-ui, sans-serif; text-align: center; padding: 24px; box-sizing: border-box; }
      h1 { font-size: 30px; margin: 0 0 8px; } a { color: #f5c14a; font-weight: 700; } p { margin: 6px 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>This page fell off the map</h1>
      <p>The page you were looking for isn't here.</p>
      <p><a href="${base}">Back to Starfall Grove</a> · <a href="${site.gameUrl}">Play the game</a></p>
      <p lang="de"><a href="${base}de/">Zur Startseite</a> · <span lang="bs"><a href="${base}bs/">Na početnu</a></span></p>
    </main>
  </body>
</html>
`;
