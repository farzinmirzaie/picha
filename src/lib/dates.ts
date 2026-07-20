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
