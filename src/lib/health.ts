/**
 * Shared health-timeline derivations. The timeline split and the *initial*
 * (no-JS / first-paint) "due soon" state come from here at build time. The
 * live decision is made on the client (Layout's applyDueSoon) against the
 * visitor's own clock, off the soonest due-date stamped on <body
 * data-health-next> — so the Due soon card, the Nav tab badge and the PWA app
 * badge flip at the right moment without waiting for a rebuild. Dates are ISO;
 * the default `today` here is the build date.
 */
import { healthTimeline, recurringCare } from '../data/picha';
import { addDays } from './dates';

/** An item in "Coming up": a future one-time visit or a recurring due date. */
export interface UpcomingEntry {
  icon: string;
  title: string;
  detail: string;
  date?: string;
  everyLabel?: string;
  where?: string;
}

/** How near (in days) an item must be to raise the "due soon" alert + badges. */
export const DUE_SOON_DAYS = 2;

const buildToday = () => new Date().toISOString().slice(0, 10);

/** One-time future visits + recurring upkeep, merged and sorted by due date. */
export function upcomingHealth(today: string = buildToday()): UpcomingEntry[] {
  const onceUpcoming = healthTimeline
    .filter((e) => e.date && e.date >= today)
    .sort((a, b) => a.date!.localeCompare(b.date!));
  return [
    ...onceUpcoming,
    ...recurringCare.map((r) => ({
      icon: r.icon,
      title: r.title,
      detail: r.detail,
      date: r.nextDue ?? (r.lastDone ? addDays(r.lastDone, r.intervalDays) : undefined),
      everyLabel: r.everyLabel,
      where: r.where,
    })),
  ].sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));
}

/** The soonest dated item + days until due (negative = overdue), or null. */
export function nextDueHealth(
  today: string = buildToday(),
): { item: UpcomingEntry; days: number } | null {
  const item = upcomingHealth(today).find((e) => e.date);
  if (!item?.date) return null;
  const days = Math.round((Date.parse(item.date) - Date.parse(today)) / 86_400_000);
  return { item, days };
}

/** True when the next item is due within DUE_SOON_DAYS, or already overdue. */
export function isHealthDueSoon(today: string = buildToday()): boolean {
  const n = nextDueHealth(today);
  return n !== null && n.days <= DUE_SOON_DAYS;
}
