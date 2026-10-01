// The legal and help pages, each served at its own route in every language (`<site>/privacy/`, `<site>/de/privacy/`
// and so on). vite.config.ts reads this too, to write each route's title, description and canonical link into its
// HTML, so keep it free of imports other than types.
import type { Locale } from '../i18n/locales';

export const legalSlugs = ['privacy', 'terms', 'support', 'imprint'] as const;
export type LegalSlug = (typeof legalSlugs)[number];
type Route = { title: string; description: string };

export const legalRoutes: Record<Locale, Record<LegalSlug, Route>> = {
  en: {
    privacy: { title: 'Privacy policy', description: 'Starfall Grove collects no personal data. There are no accounts, ads, analytics or tracking, and your progress stays on your device.' },
    terms: { title: 'Terms of use', description: 'The terms for playing Starfall Grove in the browser, on Android and on iOS.' },
    support: { title: 'Support', description: 'Help with Starfall Grove: saves and backups, performance, sound, controls, updates and how to contact us.' },
    imprint: { title: 'Imprint', description: 'Legal notice and publisher information for Starfall Grove.' },
  },
  de: {
    privacy: { title: 'Datenschutzerklärung', description: 'Starfall Grove erhebt keine personenbezogenen Daten. Es gibt keine Konten, keine Werbung, keine Analyse und kein Tracking, und dein Spielstand bleibt auf deinem Gerät.' },
    terms: { title: 'Nutzungsbedingungen', description: 'Die Bedingungen für das Spielen von Starfall Grove im Browser, auf Android und auf iOS.' },
    support: { title: 'Support', description: 'Hilfe zu Starfall Grove: Spielstände und Sicherungen, Leistung, Ton, Steuerung, Updates und Kontakt.' },
    imprint: { title: 'Impressum', description: 'Impressum und Anbieterkennzeichnung von Starfall Grove.' },
  },
  bs: {
    privacy: { title: 'Politika privatnosti', description: 'Starfall Grove ne prikuplja lične podatke. Nema računa, reklama, analitike ni praćenja, a tvoj napredak ostaje na tvom uređaju.' },
    terms: { title: 'Uslovi korištenja', description: 'Uslovi za igranje igre Starfall Grove u pretraživaču, na Androidu i na iOS-u.' },
    support: { title: 'Podrška', description: 'Pomoć za Starfall Grove: snimljene igre i rezervne kopije, performanse, zvuk, kontrole, ažuriranja i kontakt.' },
    imprint: { title: 'Impresum', description: 'Pravne informacije i podaci o izdavaču igre Starfall Grove.' },
  },
};
