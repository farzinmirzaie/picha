/**
 * "Due soon" health reminder: when the soonest health item (a vaccine, a
 * checkup, a recurring upkeep task) falls within DUE_SOON_DAYS or is overdue,
 * send one nudge and set the PWA app-icon badge. Uses the same
 * nextDueHealth/DUE_SOON_DAYS logic as the site (src/lib/health.ts), so it can
 * never disagree with the Health page's own "Due soon" state.
 *
 * Cadence: once a day (the 09:00 MYT slot), not every 3 hours — a vet date two
 * days out doesn't need nagging. A manual workflow_dispatch run fires it
 * regardless, for on-demand testing.
 */
import { nextDueHealth, DUE_SOON_DAYS } from '../../../src/lib/health';
import { localizeHealthItem, dueSoonTitle, notifyUrl } from '../../../src/i18n/content';
import { careDayKey, mytHour, type ReminderProvider } from '../lib';

export const dueSoonProvider: ReminderProvider = {
  id: 'due-soon',
  async build({ now, manual }, locale) {
    if (!manual && mytHour(now) !== 9) return [];

    const next = nextDueHealth(careDayKey(now)); // MYT calendar date
    if (!next || next.days > DUE_SOON_DAYS) return [];

    const { days } = next;
    // Translate the item's title/detail into the target locale (facts stay put).
    const item = localizeHealthItem(next.item, locale);

    return [
      {
        title: dueSoonTitle(item.title, days, locale),
        body: item.detail,
        url: notifyUrl('health', locale),
        tag: 'health-due-soon',
        setBadge: true,
      },
    ];
  },
};
