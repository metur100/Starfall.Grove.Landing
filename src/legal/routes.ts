// The legal and help pages, each served at its own route in every language (`<site>/privacy/`, `<site>/de/privacy/`
// and so on). vite.config.ts reads this too, to write each route's title, description and canonical link into its
// HTML, so keep it free of imports other than types.
import type { Locale } from '../i18n/locales';

// 'minirift/privacy' is Mini Rift's own privacy policy, at <site>/minirift/privacy/.
export const legalSlugs = ['privacy', 'minirift/privacy', 'terms', 'support', 'imprint'] as const;
export type LegalSlug = (typeof legalSlugs)[number];
type Route = { title: string; description: string };

export const legalRoutes: Record<Locale, Record<LegalSlug, Route>> = {
  en: {
    privacy: { title: 'Privacy policy', description: 'Starfall Grove collects no personal data: your saves stay on your device, with no accounts, ads, analytics or tracking. Read the full policy.' },
    'minirift/privacy': { title: 'Mini Rift privacy policy', description: 'What Mini Rift stores for your account, progress, friends and matches, what stays on your device, and how to delete it. No ads or tracking.' },
    terms: { title: 'Terms of use', description: 'The terms for playing Starfall Grove and Mini Rift in the browser, on Android and on iOS, including fair play and chat rules.' },
    support: { title: 'Support', description: 'Help with Starfall Grove and Mini Rift: saves and backups, accounts and passwords, reporting players, performance and contact.' },
    imprint: { title: 'Imprint', description: 'Legal notice and publisher information for Starfall Grove and Mini Rift, the free storybook games for browser, Android and iOS.' },
  },
  de: {
    privacy: { title: 'Datenschutzerklärung', description: 'Starfall Grove erhebt keine personenbezogenen Daten: Spielstände bleiben auf deinem Gerät, ohne Konto, Werbung, Analyse oder Tracking.' },
    'minirift/privacy': { title: 'Datenschutzerklärung Mini Rift', description: 'Was Mini Rift für Konto, Fortschritt, Freunde und Matches speichert, was auf deinem Gerät bleibt und wie du alles löschst. Ohne Werbung.' },
    terms: { title: 'Nutzungsbedingungen', description: 'Die Bedingungen für Starfall Grove und Mini Rift im Browser, auf Android und auf iOS, mit den Regeln für faires Spiel und Chat.' },
    support: { title: 'Support', description: 'Hilfe zu Starfall Grove und Mini Rift: Spielstände und Sicherungen, Konto und Passwort, Spieler melden, Leistung und Kontakt.' },
    imprint: { title: 'Impressum', description: 'Impressum und Anbieterkennzeichnung von Starfall Grove und Mini Rift, den kostenlosen Bilderbuch-Spielen für Browser, Android und iOS.' },
  },
  bs: {
    privacy: { title: 'Politika privatnosti', description: 'Starfall Grove ne prikuplja lične podatke: snimljene igre ostaju na tvom uređaju, bez računa, reklama, analitike i praćenja.' },
    'minirift/privacy': { title: 'Politika privatnosti Mini Rift', description: 'Šta Mini Rift čuva za račun, napredak, prijatelje i mečeve, šta ostaje na tvom uređaju i kako sve izbrisati. Bez reklama i praćenja.' },
    terms: { title: 'Uslovi korištenja', description: 'Uslovi za igranje igara Starfall Grove i Mini Rift u pretraživaču, na Androidu i na iOS-u, s pravilima fer igre i chata.' },
    support: { title: 'Podrška', description: 'Pomoć za Starfall Grove i Mini Rift: snimljene igre i rezervne kopije, račun i lozinka, prijava igrača, performanse i kontakt.' },
    imprint: { title: 'Impresum', description: 'Pravne informacije i podaci o izdavaču igara Starfall Grove i Mini Rift, besplatnih slikovničkih igara za pretraživač, Android i iOS.' },
  },
};
