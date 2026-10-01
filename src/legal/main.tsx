// The entry point of the legal and help pages. Every route (/privacy/, /terms/, /support/, /imprint/) is a copy of
// legal.html with its own title and `data-page`; this renders the page that names.
import ReactDOM from 'react-dom/client';
import type { ComponentType } from 'react';
import { Layout } from './Layout';
import type { LegalSlug } from './routes';
import Imprint from './Imprint';
import Privacy from './Privacy';
import Support from './Support';
import Terms from './Terms';

const pages: Record<LegalSlug, ComponentType> = { privacy: Privacy, terms: Terms, support: Support, imprint: Imprint };

const named = document.body.dataset.page ?? '';
const slug: LegalSlug = named in pages ? named as LegalSlug : 'privacy';
const Page = pages[slug];
ReactDOM.createRoot(document.getElementById('root')!).render(<Layout slug={slug}><Page /></Layout>);
