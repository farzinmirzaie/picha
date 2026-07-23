/** Shared date helpers (safe for both build-time and client code). */

const fmtLong = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const fmtShort = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

/** "19 July 2026" */
export const dateLabel = (iso: string) => fmtLong.format(new Date(iso));

/** "19 Jul" */
export const shortLabel = (iso: string) => fmtShort.format(new Date(iso));

/** ISO date `days` after `iso`. */
export const addDays = (iso: string, days: number) =>
  new Date(Date.parse(iso) + days * 86_400_000).toISOString().slice(0, 10);

/**
 * Human label for a day count relative to today, kept readable at any size:
 * "today", "tomorrow", "in 12 days", "in 2 months and 4 days". Shared by the
 * [data-until] client script and any build-time countdown copy.
 */
export function inDaysLabel(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  const abs = Math.abs(days);
  const months = Math.floor(abs / 30);
  const rem = abs % 30;
  const span =
    months >= 1
      ? `${months} month${months > 1 ? 's' : ''}${
          rem ? ` and ${rem} day${rem > 1 ? 's' : ''}` : ''
        }`
      : `${abs} days`;
  return days > 0 ? `in ${span}` : `${span} ago`;
}
