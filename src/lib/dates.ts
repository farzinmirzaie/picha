/** Shared date helpers (safe for both build-time and client code). */

// Map our locale codes to BCP-47 tags for Intl. Node 22 ships full ICU, so
// Malay month names ("Julai", "Jul") come for free.
const intlTag = (locale?: string) =>
  locale === 'ms' ? 'ms-MY' : locale === 'zh' ? 'zh-CN' : 'en-GB';

// Cache one formatter per (kind, locale) — Intl formatters are not free.
const longCache: Record<string, Intl.DateTimeFormat> = {};
const shortCache: Record<string, Intl.DateTimeFormat> = {};
const longFmt = (locale?: string) =>
  (longCache[locale ?? 'en'] ??= new Intl.DateTimeFormat(intlTag(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }));
const shortFmt = (locale?: string) =>
  (shortCache[locale ?? 'en'] ??= new Intl.DateTimeFormat(intlTag(locale), {
    day: 'numeric',
    month: 'short',
  }));

/** "19 July 2026" (English) / "19 Julai 2026" (Malay) */
export const dateLabel = (iso: string, locale?: string) => longFmt(locale).format(new Date(iso));

/** "19 Jul" */
export const shortLabel = (iso: string, locale?: string) => shortFmt(locale).format(new Date(iso));

/** ISO date `days` after `iso`. */
export const addDays = (iso: string, days: number) =>
  new Date(Date.parse(iso) + days * 86_400_000).toISOString().slice(0, 10);

/**
 * Human label for a day count relative to today, kept readable at any size:
 * "today", "tomorrow", "in 12 days", "in 2 months and 4 days". Shared by the
 * [data-until] client script and any build-time countdown copy.
 */
export function inDaysLabel(days: number, locale?: string): string {
  const abs = Math.abs(days);
  const months = Math.floor(abs / 30);
  const rem = abs % 30;
  if (locale === 'zh') {
    if (days === 0) return '今天';
    if (days === 1) return '明天';
    if (days === -1) return '昨天';
    const span = months >= 1 ? `${months}个月${rem ? `零${rem}天` : ''}` : `${abs}天`;
    return days > 0 ? `${span}后` : `${span}前`;
  }
  if (locale === 'ms') {
    if (days === 0) return 'hari ini';
    if (days === 1) return 'esok';
    if (days === -1) return 'semalam';
    const span =
      months >= 1
        ? `${months} bulan${rem ? ` dan ${rem} hari` : ''}`
        : `${abs} hari`;
    return days > 0 ? `dalam ${span}` : `${span} lalu`;
  }
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  const span =
    months >= 1
      ? `${months} month${months > 1 ? 's' : ''}${
          rem ? ` and ${rem} day${rem > 1 ? 's' : ''}` : ''
        }`
      : `${abs} days`;
  return days > 0 ? `in ${span}` : `${span} ago`;
}
