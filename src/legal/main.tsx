// The entry point of the legal and help pages. Every route (/privacy/, /de/privacy/, …) is a copy of legal.html with
// its own title, language and `data-page`; this loads that language's pages and renders the one it names.
import ReactDOM from 'react-dom/client';
import type { ComponentType } from 'react';
import { LOCALE } from '../i18n';
import type { Locale } from '../i18n/locales';
import { Layout } from './Layout';
import { legalSlugs, type LegalSlug } from './routes';

type Pages = { pages: Record<LegalSlug, ComponentType> };
const load: Record<Locale, () => Promise<Pages>> = { en: () => import('./en'), de: () => import('./de'), bs: () => import('./bs') };

const named = document.body.dataset.page ?? '';
const slug: LegalSlug = (legalSlugs as readonly string[]).includes(named) ? named as LegalSlug : 'privacy';
load[LOCALE]().then(({ pages }) => {
  const Page = pages[slug];
  ReactDOM.createRoot(document.getElementById('root')!).render(<Layout slug={slug}><Page /></Layout>);
});
