// The legal and help pages drawn to HTML at build time (vite.config.ts), so search engines and visitors without
// JavaScript get the whole page; src/legal/main.tsx then takes it over in the browser. The page's language comes from
// <html lang> as in the browser: the build sets a stand-in `document` for each language before loading this.
import { renderToString } from 'react-dom/server';
import { LOCALE } from '../i18n';
import { Layout } from './Layout';
import type { LegalSlug } from './routes';
import { pages as en } from './en';
import { pages as de } from './de';
import { pages as bs } from './bs';

export function render(slug: LegalSlug) {
  const Page = { en, de, bs }[LOCALE][slug];
  return renderToString(<Layout slug={slug}><Page /></Layout>);
}
