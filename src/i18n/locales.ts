// The languages of the website. English lives at the site's root, every other language under its own folder
// (/de/, /bs/). vite.config.ts reads this too, to write each language's pages, so keep it free of imports.
export const LOCALES = ['en', 'de', 'bs'] as const;
export type Locale = (typeof LOCALES)[number];

/** Each language's name in itself, its short label in the switcher, and its Open Graph locale. */
export const LANGUAGE: Record<Locale, { name: string; short: string; og: string }> = {
  en: { name: 'English', short: 'EN', og: 'en_GB' },
  de: { name: 'Deutsch', short: 'DE', og: 'de_DE' },
  bs: { name: 'Bosanski', short: 'BS', og: 'bs_BA' },
};

/** Where a language's pages live, from the site's root: '' for English, 'de/' for German. */
export const prefix = (l: Locale) => (l === 'en' ? '' : `${l}/`);

export const isLocale = (s: string | undefined | null): s is Locale => !!s && (LOCALES as readonly string[]).includes(s);
