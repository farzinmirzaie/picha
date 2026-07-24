/**
 * "Today's rounds" reminder: if any daily-checklist items are still pending for
 * the current care day, send one nudge. The title carries the count; the body
 * is a fixed deadpan line. Returns [] when the list is already clear, so
 * nothing is sent. The item catalogue is imported straight from the single
 * source of truth (picha.ts), so the count never drifts from the Care page.
 */
import { dailyChecklist } from '../../../src/data/picha';
import { careDayKey, type ReminderProvider } from '../lib';

export const dailyChecklistProvider: ReminderProvider = {
  id: 'daily-checklist',
  async build({ now, sbSelect }) {
    const rows = await sbSelect<Array<{ done: string[] }>>(
      `picha_rounds?select=done&date=eq.${careDayKey(now)}`,
    );
    const done = new Set(rows[0]?.done ?? []);
    const remaining = dailyChecklist.filter((item) => !done.has(item.id)).length;
    if (remaining === 0) return [];

    return [
      {
        title: `Picha has filed ${remaining} complaint${remaining === 1 ? '' : 's'}`,
        body: 'Picha has noticed some rounds are still undone. She is disappointed but not surprised.',
        url: '/picha/care/',
        tag: 'daily-checklist',
      },
    ];
  },
};
