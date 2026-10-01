// The legal and help pages, each served at its own route (`<site>/privacy/` and so on). vite.config.ts reads this too,
// to write each route's title, description and canonical link into its HTML, so keep it free of imports.
export const legalRoutes = {
  privacy: {
    title: 'Privacy policy',
    description: 'Starfall Grove collects no personal data. There are no accounts, ads, analytics or tracking, and your progress stays on your device.',
  },
  terms: {
    title: 'Terms of use',
    description: 'The terms for playing Starfall Grove in the browser, on Android and on iOS.',
  },
  support: {
    title: 'Support',
    description: 'Help with Starfall Grove: saves and backups, performance, sound, controls, updates and how to contact us.',
  },
  imprint: {
    title: 'Imprint',
    description: 'Legal notice and publisher information for Starfall Grove.',
  },
} as const;

export type LegalSlug = keyof typeof legalRoutes;
export const legalSlugs = Object.keys(legalRoutes) as LegalSlug[];
