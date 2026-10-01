// The language of the page being shown (from <html lang>, which vite.config.ts writes for every page) and its words.
import { isLocale, prefix, type Locale } from './locales';
import { ui as en } from './ui.en';
import { ui as de } from './ui.de';
import { ui as bs } from './ui.bs';

export const LOCALE: Locale = isLocale(document.documentElement.lang) ? document.documentElement.lang : 'en';
export const ui = { en, de, bs }[LOCALE];
/** A page of the site in this language, from the site's root: `localHref('support/')` → `/de/support/` on a German page. */
export const localHref = (path: string, l: Locale = LOCALE) => `${import.meta.env.BASE_URL}${prefix(l)}${path}`;
