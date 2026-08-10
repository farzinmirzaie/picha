/**
 * "Today's rounds" reminder: if any daily-checklist items are still pending for
 * the current care day, send one nudge. The title carries the count; the body
 * is a fixed deadpan line. Returns [] when the list is already clear, so
 * nothing is sent. The item catalogue is imported straight from the single
 * source of truth (picha.ts), so the count never drifts from the Care page.
 */
import { dailyChecklist } from '../../../src/data/picha';
import { notifyChecklistMessage, notifyUrl } from '../../../src/i18n/content';
import { careDayKey, type ReminderProvider } from '../lib';

export const dailyChecklistProvider: ReminderProvider = {
  id: 'daily-checklist',
  async build({ now, sbSelect }, locale) {
    const rows = await sbSelect<Array<{ done: string[] }>>(
      `picha_rounds?select=done&date=eq.${careDayKey(now)}`,
    );
    const done = new Set(rows[0]?.done ?? []);
    const remaining = dailyChecklist.filter((item) => !done.has(item.id)).length;
    if (remaining === 0) return [];

    const { title, body } = notifyChecklistMessage(remaining, locale);
    return [
      {
        title,
        body,
        url: notifyUrl('care', locale),
        tag: 'daily-checklist',
      },
    ];
  },
};
