/**
 * /llms.txt: the whole site as one markdown document, for AI agents
 * (llmstxt.org convention). Generated at build time from data/picha.ts, so it
 * can never drift from the pages. Regenerates on every push, like the HTML.
 */
import type { APIRoute } from 'astro';
import { weightHistory, currentWeight } from '../data/weights';
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
  healthTimeline,
  recurringCare,
  dailyChecklist,
  treatment,
  trainingCourses,
  trainingRules,
  food,
  grooming,
  litter,
  likes,
  dislikes,
  personality,
  safety,
  toxicItems,
  callVetIf,
  inDaysLabel,
} from '../data/picha';

const SITE = 'https://farzinmirzaie.github.io/picha';
const today = new Date().toISOString().slice(0, 10);

const addDays = (iso: string, days: number) =>
  new Date(Date.parse(iso) + days * 86_400_000).toISOString().slice(0, 10);
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

### Ongoing treatment

${treatment.map((t) => `- **${t.title}** (${t.cadence ?? 'ongoing'}): ${t.detail}`).join('\n')}

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

### Grooming

${grooming.map((g) => `- **${g.title}** (${g.cadence ?? 'as needed'}): ${g.detail}`).join('\n')}

### Litter

${litter.map((l) => `- **${l.title}**: ${l.detail}`).join('\n')}

## Personality

${personality.map((p) => `- **${p.title}**: ${p.detail}`).join('\n')}

Loves: ${likes.join('; ')}.
Hard pass: ${dislikes.join('; ')}.

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
