// The frame every legal and help page shares: the bar at the top, the parchment page and the footer.
import { useEffect, type ReactNode } from 'react';
import site from '../../site.json';
import { setupPage } from '../site-page';
import { legalRoutes, legalSlugs, type LegalSlug } from './routes';

/** A page of the site, from the site's root (works under any sub-path the site is hosted on). */
export const href = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const route = (slug: LegalSlug) => href(`${slug}/`);

/** The publisher's email as a link (site.json `email`). */
export const Email = ({ subject }: { subject?: string }) => (
  <a href={`mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>{site.email}</a>
);

/** The publisher's postal address card (site.json). */
export const Address = ({ email }: { email?: boolean }) => (
  <address className="contact-card">
    <strong>{site.developer}</strong><br />
    {site.addressLine1}<br />
    {site.addressLine2}<br />
    {site.country}
    {email && <><br />Email: <Email /></>}
  </address>
);

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
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className="site-nav">
        <a className="brand" href={href('')} aria-label="Starfall Grove home">
          <BrandStar />
          <span>Starfall Grove</span>
        </a>
        <nav className="nav-links" aria-label="Site">
          <a href={href('#story')}>Story</a>
          <a href={href('#heroes')}>Heroes</a>
          <a href={href('#world')}>World</a>
          <a href={route('support')} aria-current={slug === 'support' ? 'page' : undefined}>Support</a>
        </nav>
        <button className="nav-toggle" type="button" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
      </header>

      <main id="content">
        <article className="legal page">
          <small className="page-eyebrow">Starfall Grove</small>
          <h1>{legalRoutes[slug].title}</h1>
          {children}
        </article>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-grid">
          <div className="foot-brand"><strong>Starfall Grove</strong><p>A pop-up storybook action RPG for browser, Android and iOS.</p></div>
          <nav aria-label="Legal and help">
            {legalSlugs.map(s => (
              <a key={s} href={route(s)} aria-current={s === slug ? 'page' : undefined}>{legalRoutes[s].title}</a>
            ))}
          </nav>
          <p className="foot-copy">© {new Date().getFullYear()} {site.developer}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
