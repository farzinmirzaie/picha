/**
 * i18n UI-string dictionary — short chrome strings (nav labels, buttons, the
 * language picker). Longer prose lives in i18n/content.ts.
 *
 * HOW IT WORKS: Astro native i18n serves locale-prefixed static routes (`/` =
 * English, `/ms/` = Malay). Components read `Astro.currentLocale` and call
 * `t(locale, key)` to render the active locale's string at build time (no
 * client swap, SEO-friendly). The picker (components/LangPicker.astro) links
 * between the locale routes.
 *
 * TO ADD A LANGUAGE (e.g. Chinese): add its code to LOCALES, an endonym to
 * localeLabels, a block to `ui` with the SAME keys, and the matching locale in
 * astro.config `i18n`. Keep the playful "staff of the cat" voice in every
 * language; a literal translation that loses the humour is wrong.
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

/** Look up a UI string for a locale, falling back to the default locale. */
export function t(locale: string | undefined, key: string): string {
  return ui[locale ?? DEFAULT_LOCALE]?.[key] ?? ui[DEFAULT_LOCALE][key] ?? key;
}

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
    'date.confirmVet': 'past the estimate, confirm with the vet',
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
    'date.confirmVet': 'melepasi anggaran, sahkan dengan doktor haiwan',
  },
};
