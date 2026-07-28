/**
 * /llms.txt: the whole site as one markdown document, for AI agents
 * (llmstxt.org convention). Generated at build time from data/picha.ts, so it
 * can never drift from the pages. Regenerates on every push, like the HTML.
 */
import type { APIRoute } from 'astro';
import { weightHistory, currentWeight } from '../data/weights';
import { trainingCourses } from '../data/training';
import {
  identity,
  BIRTH_DATE,
  ageLabel,
  ageInMonths,
  catYears,
  weight,
  weightTarget,
  vet,
  contact,
  microchip,
  clinicalStatus,
  healthTimeline,
  recurringCare,
  dailyChecklist,
  treatment,
  trainingRules,
  food,
  feedingSchedule,
  grooming,
  litter,
  likes,
  dislikes,
  personality,
  lullaby,
  safety,
  toxicItems,
  callVetIf,
  earSignals,
} from '../data/picha';

import { addDays, inDaysLabel } from '../lib/dates';

const SITE = 'https://farzinmirzaie.github.io/picha';
const today = new Date().toISOString().slice(0, 10);

const daysFromToday = (iso: string) =>
  Math.round((Date.parse(iso) - Date.parse(today)) / 86_400_000);

const done = healthTimeline
  .filter((e) => e.date && e.date < today)
  .sort((a, b) => b.date!.localeCompare(a.date!));
const upcoming = [
  ...healthTimeline
    .filter((e) => e.date && e.date >= today)
    .map((e) => ({ ...e, title: e.where ? `${e.title} (${e.where})` : e.title })),
  ...recurringCare
    .filter((r) => r.lastDone || r.nextDue)
    .map((r) => ({
      title: `${r.title} (${r.everyLabel.toLowerCase()}${r.where ? `, ${r.where}` : ''})`,
      detail: r.detail,
      date: r.nextDue ?? addDays(r.lastDone!, r.intervalDays),
    })),
].sort((a, b) => a.date!.localeCompare(b.date!));
const toBook = healthTimeline.filter((e) => !e.date);
const notStarted = recurringCare.filter((r) => !r.lastDone && !r.nextDue);

const item = (title: string, detail: string, date?: string) =>
  `- ${date ? `${date} (${inDaysLabel(daysFromToday(date))}): ` : ''}**${title}**: ${detail}`;

const md = `# Picha

> ${identity.name} is a ${identity.breed} cat (${identity.sex.toLowerCase()}), born ${identity.bornLabel} (${ageLabel()} as of ${today}). This is her personal website: profile, health record, care guide and tools, maintained by her owners, ${contact.ownersLabel}. All dates are ISO (YYYY-MM-DD). The site is statically rebuilt on every update, so this file is always current as of the build date above.

${identity.story}

${identity.looks} Home: ${identity.home}.

## Pages

- [Home](${SITE}/): who she is, story, personality, likes and dislikes
- [Health](${SITE}/health/): vitals, full health record (done, coming up, on the list), emergency contacts
- [Care](${SITE}/care/): daily checklist, care protocol, food, litter, house rules, toxic items, if-found info
- [Tools](${SITE}/tools/): tools in service and the build queue
- [Weight tracker](${SITE}/weight/): weight chart, stats and the weigh-in ledger
- [Cat-years converter](${SITE}/cat-years/): her age in human years, feline life stages, converter for any cat
- [The Royal Academy](${SITE}/training/): training courses with step-by-step curricula and live progress (per-course pages under /training/<slug>/)
- [Reading Picha](${SITE}/body-language/): a body-language field guide to her moods

## Identity

- Name: ${identity.name}
- Species: cat. Breed: ${identity.breed}
- Sex: ${identity.sex}
- Colour: ${identity.colour}
- Born: ${BIRTH_DATE} (${ageLabel()}, ~${Math.round(catYears(ageInMonths()))} in human years by the common veterinary conversion)
- Microchip: ${microchip} (implanted between the shoulders)
- Passport: pending

## Weight

- Current: ${currentWeight.label} (measured ${currentWeight.measuredOn})
- Healthy adult target: ${weight.healthyTarget}. ${weight.note}
- History (oldest first): ${weightHistory.map((w) => `${w.date}: ${w.kg} kg`).join('; ')}
- Target band: ${weightTarget.min}-${weightTarget.max} kg
- Weigh-in cadence: every ${weight.auditEveryDays} days (tracked on the Weight page, not in the health record)

## Health record

Vet status: ${vet.status}. Most recent clinic: ${vet.recentClinic}, phone ${vet.recentPhone}.

Clinical status (one-time facts): ${clinicalStatus.map((c) => `${c.label}: ${c.value} (${c.sub})`).join('; ')}.

${
  treatment.length
    ? `### Doctor's orders (current)

${treatment.map((t) => `- **${t.title}** (${t.cadence ?? 'ongoing'}): ${t.detail}`).join('\n')}
`
    : ''
}
### Done

${done.map((e) => `- ${e.date}: **${e.title}**: ${e.detail}`).join('\n')}

### Coming up

${upcoming.map((e) => item(e.title, e.detail, e.date)).join('\n')}

### On the list (no date yet)

${toBook.map((e) => `- **${e.title}**: ${e.detail}`).join('\n')}
${notStarted.map((r) => `- **${r.title}** (${r.everyLabel.toLowerCase()}, not started yet): ${r.detail}`).join('\n')}

## Training (the Royal Academy)

Progressive desensitisation courses, run by the staff in short daily sessions. A step is passed when she stays relaxed through it on several separate days.

${trainingCourses
  .map((c) => {
    const state =
      c.stepsDone >= c.steps.length
        ? 'graduated'
        : c.startedOn
          ? `in session, step ${c.stepsDone + 1} of ${c.steps.length} ("${c.steps[c.stepsDone].title}")`
          : `not started (${c.steps.length} steps planned)`;
    return `- **${c.title}**: ${state}. ${c.why}`;
  })
  .join('\n')}

Session rules: ${trainingRules.join(' ')}

## Daily care

The staff's daily rounds:
${dailyChecklist.map((c) => `- ${c.label}: ${c.hint}`).join('\n')}

### Food

${food.map((f) => `- **${f.title}**: ${f.detail}`).join('\n')}

Daily feeding schedule (kibble is automatic on the feeder, wet food and treats served by hand):
${feedingSchedule.map((s) => `- **${s.time} — ${s.title}**${s.amount ? ` (${s.amount})` : ''}: ${s.detail}`).join('\n')}

### Grooming

${grooming.map((g) => `- **${g.title}** (${g.cadence ?? 'as needed'}): ${g.detail}`).join('\n')}

### Litter

${litter.map((l) => `- **${l.title}**: ${l.detail}`).join('\n')}

## Body language: reading her ears

How to read her mood from her ears. Tone in brackets is how to treat it (calm = approach freely, alert = engaged, wary = ease off, danger = give space).

${earSignals.map((s) => `- **${s.title}** [${s.tone}] — ${s.mood}: ${s.detail}`).join('\n')}

Also watch for rapid ear-flicking or twitching: usually irritation (or a passing fly); if paired with head-shaking or scratching, check her ears.

## Personality

${personality.map((p) => `- **${p.title}**: ${p.detail}`).join('\n')}

Loves: ${likes.join('; ')}.
Hard pass: ${dislikes.join('; ')}.

${lullaby.title}: ${lullaby.detail} (${lullaby.url})

## Safety

${safety.map((s) => `- **${s.title}**: ${s.detail}`).join('\n')}

Toxic, never within reach: ${toxicItems.join(', ')}.

### Call the vet if

${callVetIf.map((c) => `- ${c}`).join('\n')}

## Contact (public by choice, so the site doubles as an if-found tag)

${contact.owners.map((o) => `- ${o.name}: ${o.phone}`).join('\n')}

## For agents

- Machine-readable sitemap: ${SITE}/sitemap-index.xml
- This file is generated from the site's single data source at build time; the HTML pages render the same content with a playful voice. Facts (dates, doses, weights, contacts) are identical in both.
`;

export const GET: APIRoute = () =>
  new Response(md, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
