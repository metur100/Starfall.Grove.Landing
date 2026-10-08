// The legal and help pages, each served at its own route in every language (`<site>/privacy/`, `<site>/de/privacy/`
// and so on). vite.config.ts reads this too, to write each route's title, description and canonical link into its
// HTML, so keep it free of imports other than types.
import type { Locale } from '../i18n/locales';

export const legalSlugs = ['privacy', 'terms', 'support', 'imprint'] as const;
export type LegalSlug = (typeof legalSlugs)[number];
type Route = { title: string; description: string };

export const legalRoutes: Record<Locale, Record<LegalSlug, Route>> = {
  en: {
    privacy: { title: 'Privacy policy', description: 'How Starfall Grove and Mini Rift handle your data: the story game collects none; Mini Rift keeps your account and progress. No ads or tracking.' },
    terms: { title: 'Terms of use', description: 'The terms for playing Starfall Grove and Mini Rift in the browser, on Android and on iOS, including fair play and chat rules.' },
    support: { title: 'Support', description: 'Help with Starfall Grove and Mini Rift: saves and backups, accounts and passwords, reporting players, performance and contact.' },
    imprint: { title: 'Imprint', description: 'Legal notice and publisher information for Starfall Grove and Mini Rift, the free storybook games for browser, Android and iOS.' },
  },
  de: {
    privacy: { title: 'Datenschutzerklärung', description: 'Wie Starfall Grove und Mini Rift mit deinen Daten umgehen: das Story-Spiel erhebt keine, Mini Rift speichert Konto und Fortschritt. Ohne Tracking.' },
    terms: { title: 'Nutzungsbedingungen', description: 'Die Bedingungen für Starfall Grove und Mini Rift im Browser, auf Android und auf iOS, mit den Regeln für faires Spiel und Chat.' },
    support: { title: 'Support', description: 'Hilfe zu Starfall Grove und Mini Rift: Spielstände und Sicherungen, Konto und Passwort, Spieler melden, Leistung und Kontakt.' },
    imprint: { title: 'Impressum', description: 'Impressum und Anbieterkennzeichnung von Starfall Grove und Mini Rift, den kostenlosen Bilderbuch-Spielen für Browser, Android und iOS.' },
  },
  bs: {
    privacy: { title: 'Politika privatnosti', description: 'Kako Starfall Grove i Mini Rift postupaju s tvojim podacima: igra s pričom ne prikuplja ništa, Mini Rift čuva račun i napredak. Bez praćenja.' },
    terms: { title: 'Uslovi korištenja', description: 'Uslovi za igranje igara Starfall Grove i Mini Rift u pretraživaču, na Androidu i na iOS-u, s pravilima fer igre i chata.' },
    support: { title: 'Podrška', description: 'Pomoć za Starfall Grove i Mini Rift: snimljene igre i rezervne kopije, račun i lozinka, prijava igrača, performanse i kontakt.' },
    imprint: { title: 'Impresum', description: 'Pravne informacije i podaci o izdavaču igara Starfall Grove i Mini Rift, besplatnih slikovničkih igara za pretraživač, Android i iOS.' },
  },
};
