/**
 * "Today's rounds" reminder: if any daily-checklist items are still pending for
 * the current care day, send one nudge listing what's left. Returns [] when the
 * list is already clear, so nothing is sent. The item catalogue is imported
 * straight from the single source of truth (picha.ts), so it never drifts from
 * what the Care page shows.
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
    const remaining = dailyChecklist.filter((item) => !done.has(item.id));
    if (remaining.length === 0) return [];

    // Repeats (e.g. two "Wet food service") collapse to one label in the preview.
    const labels = [...new Set(remaining.map((i) => i.label))];
    const preview = labels.slice(0, 3).join(', ') + (labels.length > 3 ? ', and more' : '');
    const n = remaining.length;
    return [
      {
        title: `${n} round${n === 1 ? '' : 's'} still pending`,
        body: `Picha is waiting on: ${preview}. Management is keeping score.`,
        url: '/picha/care/',
        tag: 'daily-checklist',
      },
    ];
  },
};
