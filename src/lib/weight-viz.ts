/**
 * Weight chart + stats, as pure functions over the ledger. Shared by the
 * build-time render (weight.astro frontmatter) and the client script that
 * re-renders after a live Supabase refresh or a new entry — one source of
 * truth for the markup, no drift. Keep this module dependency-free: it runs
 * in the browser bundle too.
 */
import type { WeightEntry } from '../data/picha';
import { dateLabel, shortLabel } from './dates';

export const CHART = { W: 640, H: 320 };
const PAD = { top: 26, right: 18, bottom: 40, left: 46 };

export function weightStats(history: WeightEntry[]) {
  const entries = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const kgs = entries.map((e) => e.kg);
  const heaviest = entries.reduce((a, b) => (b.kg >= a.kg ? b : a));
  const lightest = entries.reduce((a, b) => (b.kg <= a.kg ? b : a));
  const average = kgs.reduce((sum, k) => sum + k, 0) / kgs.length;
  const latest = entries[entries.length - 1];
  const previous = entries.length > 1 ? entries[entries.length - 2] : undefined;
  const deltaG = previous ? Math.round((latest.kg - previous.kg) * 1000) : 0;
  return { entries, kgs, heaviest, lightest, average, latest, previous, deltaG };
}

/**
 * The full inner markup of the chart <svg>, as a string. The y-domain follows
 * the data but always peeks into the adult band, so the chart tells the
 * growth story without squashing the line.
 */
export function chartSvg(
  history: WeightEntry[],
  target: { min: number; max: number },
): string {
  const { entries, kgs, heaviest, lightest, latest } = weightStats(history);
  const { W, H } = CHART;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const yLo = Math.floor((Math.min(...kgs) - 0.15) * 2) / 2;
  const yHi = Math.ceil(Math.max(Math.max(...kgs) + 0.15, target.min + 0.25) * 2) / 2;
  const tickStep = yHi - yLo <= 1.5 ? 0.25 : 0.5;
  const ticks: number[] = [];
  for (let t = yLo; t <= yHi + 1e-9; t += tickStep) ticks.push(+t.toFixed(2));

  const t0 = Date.parse(entries[0].date);
  const t1 = Date.parse(entries[entries.length - 1].date);
  const x = (iso: string) =>
    t1 === t0
      ? PAD.left + innerW / 2
      : PAD.left + ((Date.parse(iso) - t0) / (t1 - t0)) * innerW;
  const y = (kg: number) => PAD.top + (1 - (kg - yLo) / (yHi - yLo)) * innerH;

  const points = entries.map((e) => ({ ...e, px: x(e.date), py: y(e.kg) }));
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.px.toFixed(1)} ${p.py.toFixed(1)}`)
    .join(' ');
  const areaPath =
    points.length > 1
      ? `${linePath} L${points[points.length - 1].px.toFixed(1)} ${H - PAD.bottom} L${points[0].px.toFixed(1)} ${H - PAD.bottom} Z`
      : '';

  const bandVisible = target.min < yHi;
  const bandTopY = Math.max(y(Math.min(target.max, yHi)), PAD.top);
  const bandBottomY = y(target.min);

  const labelled = new Set([heaviest.date, lightest.date, latest.date]);
  // Date labels under the points, skipping any that would crowd the previous
  // one (keeps clustered weigh-ins readable); many entries → ends only.
  const xCandidates =
    entries.length <= 8 ? points : [points[0], points[points.length - 1]];
  const xLabelled: typeof points = [];
  for (const p of xCandidates) {
    const prev = xLabelled[xLabelled.length - 1];
    if (!prev || p.px - prev.px >= 44) xLabelled.push(p);
  }

  const parts: string[] = [];

  if (bandVisible) {
    parts.push(
      `<rect x="${PAD.left}" y="${bandTopY.toFixed(1)}" width="${innerW}" height="${(bandBottomY - bandTopY).toFixed(1)}" class="fill-amber-300/15 dark:fill-amber-700/15"/>`,
      `<line x1="${PAD.left}" x2="${PAD.left + innerW}" y1="${bandBottomY.toFixed(1)}" y2="${bandBottomY.toFixed(1)}" stroke-dasharray="5 5" stroke-width="1.5" class="stroke-amber-500/70"/>`,
      `<text x="${PAD.left + innerW - 6}" y="${(bandBottomY - 7).toFixed(1)}" text-anchor="end" class="fill-amber-700 text-[10px] font-bold tracking-[0.08em] uppercase dark:fill-amber-300">healthy adult range</text>`,
    );
  }

  for (const t of ticks) {
    parts.push(
      `<line x1="${PAD.left}" x2="${PAD.left + innerW}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" stroke-width="1" class="stroke-paper-300/80 dark:stroke-plum-700/80"/>`,
      `<text x="${PAD.left - 8}" y="${(y(t) + 3.5).toFixed(1)}" text-anchor="end" class="fill-ink-400 text-[10px] font-bold">${t}</text>`,
    );
  }
  parts.push(
    `<text x="${PAD.left - 8}" y="${PAD.top - 10}" text-anchor="end" class="fill-ink-400 text-[10px] font-bold">kg</text>`,
  );

  if (areaPath) {
    parts.push(`<path d="${areaPath}" class="fill-blush-600/10 dark:fill-blush-500/15"/>`);
  }
  parts.push(
    `<path d="${linePath}" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-blush-600 dark:stroke-blush-500"/>`,
  );

  for (const p of points) {
    parts.push(
      `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="5" stroke-width="2.5" class="fill-blush-600 stroke-paper-50 dark:fill-blush-500 dark:stroke-plum-900"/>`,
    );
    if (labelled.has(p.date)) {
      parts.push(
        `<text x="${p.px.toFixed(1)}" y="${(p.py - 12).toFixed(1)}" text-anchor="middle" class="fill-ink-900 text-[11px] font-bold dark:fill-paper-100">${p.kg}</text>`,
      );
    }
  }

  parts.push(
    `<line x1="${PAD.left}" x2="${PAD.left + innerW}" y1="${H - PAD.bottom}" y2="${H - PAD.bottom}" stroke-width="1" class="stroke-paper-300 dark:stroke-plum-700"/>`,
  );
  for (const p of xLabelled) {
    parts.push(
      `<text x="${p.px.toFixed(1)}" y="${H - PAD.bottom + 18}" text-anchor="middle" class="fill-ink-400 text-[10px] font-bold">${shortLabel(p.date)}</text>`,
    );
  }

  return parts.join('');
}

export function chartAriaLabel(history: WeightEntry[]): string {
  const { entries, latest } = weightStats(history);
  return `Line chart of Picha's weight: ${entries.length} weigh-ins from ${dateLabel(entries[0].date)} to ${dateLabel(latest.date)}, currently ${latest.kg} kg. Full figures are in the ledger below.`;
}
