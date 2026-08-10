/**
 * i18n dictionary for the "Reading Picha" site (proof of concept).
 *
 * HOW IT WORKS (for now): the pages render in English at build time; a small
 * client engine (see components/LangPicker.astro) swaps every element tagged
 * `data-i18n="<key>"` to the visitor's chosen language and sets <html lang>.
 * The choice lives in localStorage (`picha-lang`); a picker is shown on every
 * visit (later: first visit only, then the globe switcher takes over).
 *
 * TO ADD A LANGUAGE (e.g. Chinese): add its code to LOCALES, an endonym to
 * localeLabels, and a block to `ui` with the SAME keys. Nothing else changes.
 * Keep the playful "staff of the cat" voice in every language.
 *
 * NOTE: this is the POC delivery mechanism. For production/SEO the same
 * dictionaries drop into Astro's native i18n (locale-prefixed static routes);
 * only the swap engine would be replaced.
 */
export const LOCALES = ['en', 'ms'] as const; // 'zh' coming next
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Endonyms: each language named in its own language, shown in the picker. */
export const localeLabels: Record<string, string> = {
  en: 'English',
  ms: 'Bahasa Malaysia',
  // zh: '中文',
};

type Dict = Record<string, string>;

export const ui: Record<string, Dict> = {
  en: {
    'nav.home': 'Home',
    'nav.health': 'Health',
    'nav.care': 'Care',
    'nav.tools': 'Tools',
    'hero.tagline': 'All-white floof · amber eyes · pink-collar',
    'hero.share': 'Share',
    'home.getToKnow': 'Get to know her',
    'lang.title': 'Choose your language',
    'lang.sub': 'You can switch anytime from the globe in the menu.',
    'lang.action': 'Language',
  },
  ms: {
    'nav.home': 'Utama',
    'nav.health': 'Kesihatan',
    'nav.care': 'Jagaan',
    'nav.tools': 'Alatan',
    'hero.tagline': 'Gebu putih salji · mata amber · berkolar merah jambu',
    'hero.share': 'Kongsi',
    'home.getToKnow': 'Kenali si bos',
    'lang.title': 'Pilih bahasa anda',
    'lang.sub': 'Boleh tukar bila-bila melalui ikon glob dalam menu.',
    'lang.action': 'Bahasa',
  },
};
