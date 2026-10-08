// The frame every legal and help page shares, in the page's language: the bar at the top with the language switcher,
// the parchment page and the footer.
import { useEffect, type ReactNode } from 'react';
import site from '../../site.json';
import { setupPage } from '../site-page';
import { LOCALE, localHref, ui } from '../i18n';
import { LANGUAGE, LOCALES } from '../i18n/locales';
import { legalRoutes, legalSlugs, type LegalSlug } from './routes';

/** A page of the site in this language (works under any sub-path the site is hosted on). */
export const href = (path: string) => localHref(path);
export const route = (slug: LegalSlug) => href(`${slug}/`);

/** The publisher's email as a link (site.json `email`). */
export const Email = ({ subject }: { subject?: string }) => (
  <a href={`mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>{site.email}</a>
);

const MONTHS: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  bs: ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'],
};
/** The date the legal pages last changed (site.json `updated`, as YYYY-MM-DD), written the way this language writes
 *  dates. Spelled out here rather than with toLocaleDateString: browsers without Bosnian would write it differently
 *  from the build, and the page would no longer match what was prerendered. */
export const updated = () => {
  const [y, m, d] = site.updated.split('-').map(Number), month = (MONTHS[LOCALE] ?? MONTHS.en)[m - 1];
  return LOCALE === 'en' ? `${d} ${month} ${y}` : `${d}. ${month} ${y}.`.replace(/.$/, LOCALE === 'de' ? '' : '.');
};

/** The publisher's name and email. */
export const Publisher = () => (
  <address className="contact-card"><strong>{site.developer}</strong><br />{ui.legal.email}: <Email /></address>
);

/** The publisher's postal address card (site.json). Lines left empty there are left out. */
export const Address = ({ email, country }: { email?: boolean; country?: string }) => {
  const lines = [site.addressLine1, site.addressLine2, country ?? site.country].filter(Boolean);
  return (
    <address className="contact-card">
      <strong>{site.developer}</strong>
      {lines.map(l => <span key={l}><br />{l}</span>)}
      {email && <><br />{ui.legal.email}: <Email /></>}
    </address>
  );
};

export function BrandStar() {
  const star = 'M32 5 L38 26 L59 32 L38 38 L32 59 L26 38 L5 32 L26 26 Z';
  return (
    <svg className="brand-star" viewBox="0 0 64 64" aria-hidden="true">
      <path d={star} fill="#2f2330" stroke="#2f2330" strokeWidth="10" strokeLinejoin="round" />
      <path d={star} fill="#fff4de" stroke="#fff4de" strokeWidth="6" strokeLinejoin="round" />
      <path d={star} fill="#f5c14a" />
      <circle cx="32" cy="32" r="5" fill="#fff" />
    </svg>
  );
}

export function Layout({ slug, children }: { slug: LegalSlug; children: ReactNode }) {
  useEffect(() => setupPage(), []);
  const t = ui.legal, routes = legalRoutes[LOCALE];
  return (
    <>
      <a className="skip" href="#content">{t.skip}</a>
      <header className="site-nav">
        <a className="brand" href={href('')} aria-label={t.home}>
          <BrandStar />
          <span>Starfall Grove</span>
        </a>
        <nav className="nav-links" aria-label={t.site}>
          <a href={href('#story')}>{t.story}</a>
          <a href={href('#heroes')}>{t.heroes}</a>
          <a href={href('#world')}>{t.world}</a>
          <a href={route('support')} aria-current={slug === 'support' ? 'page' : undefined}>{t.support}</a>
          <span className="lang-switch" role="group" aria-label={t.languages}>
            {LOCALES.map(l => <a key={l} href={localHref(`${slug}/`, l)} hrefLang={l} lang={l} title={LANGUAGE[l].name} aria-current={l === LOCALE ? 'true' : undefined}>{LANGUAGE[l].short}</a>)}
          </span>
        </nav>
        <button className="nav-toggle" type="button" aria-label={t.menu} aria-expanded="false"><i></i><i></i><i></i></button>
      </header>

      <main id="content">
        <article className="legal page">
          <small className="page-eyebrow">{slug.startsWith('minirift') ? 'Mini Rift' : 'Starfall Grove'}</small>
          <h1>{routes[slug].title}</h1>
          {children}
        </article>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-grid">
          <div className="foot-brand"><strong>Starfall Grove</strong><p>{t.tagline}</p></div>
          <nav aria-label={t.legalNav}>
            {legalSlugs.map(s => (
              <a key={s} href={route(s)} aria-current={s === slug ? 'page' : undefined}>{routes[s].title}</a>
            ))}
          </nav>
          <p className="foot-copy">© {new Date().getFullYear()} {site.developer}. {t.rights}</p>
        </div>
      </footer>
    </>
  );
}
