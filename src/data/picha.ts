/**
 * Single source of truth for everything about Picha.
 *
 * The whole site renders from this file, so updating her profile = editing data
 * here (no need to touch markup). Keep it typed and tidy; add new fields rather
 * than hardcoding values into components.
 */

export interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

export interface CareItem {
  icon: string;
  title: string;
  detail: string;
  /** Optional cadence hint, e.g. "Daily", "Every 2–4 weeks". */
  cadence?: string;
}

export interface HealthRecord {
  icon: string;
  title: string;
  detail: string;
  /** ISO date (YYYY-MM-DD) when this happened, if applicable. */
  date?: string;
}

export interface Reminder {
  icon: string;
  text: string;
  /** ISO date the reminder is due, if known. */
  due?: string;
}

/** Picha's date of birth — age is computed from this so it never goes stale. */
export const BIRTH_DATE = '2025-11-27';

export const identity = {
  name: 'Picha',
  tagline: 'All-white floof · amber eyes · pink-collar royalty',
  breed: 'Persian × Turkish Angora mix',
  sex: 'Female, spayed',
  bornLabel: '27 November 2025',
  looks:
    'All-white long coat, pink ears & nose, amber eyes. Wears a pink collar with a bell.',
  home: 'Apartment in Kuala Lumpur, with Farah & family',
};

export const weight = {
  current: '2.85 kg',
  measuredOn: '18 July 2026',
  healthyTarget: '~3–4.5 kg',
  note: 'Still growing until ~1.5–2 years old.',
};

export const quickFacts: QuickFact[] = [
  { icon: '🐱', label: 'Breed', value: 'Persian × Angora' },
  { icon: '♀️', label: 'Sex', value: 'Female · spayed' },
  { icon: '⚖️', label: 'Weight', value: '2.85 kg' },
  { icon: '🏠', label: 'Home', value: 'Kuala Lumpur' },
];

export const vet = {
  name: 'Dr Thang',
  clinic: 'HP Vet, Kuala Lumpur',
};

/** Completed / scheduled medical history. */
export const healthRecords: HealthRecord[] = [
  {
    icon: '💉',
    title: 'FVRCP vaccine',
    detail: 'Complete — 2 doses (May & June 2026). Next booster due 22 June 2027.',
    date: '2026-06-22',
  },
  {
    icon: '🐛',
    title: 'Parasite control',
    detail: 'Revolution Plus applied 24 June 2026 · dewormed 25 June 2026.',
    date: '2026-06-24',
  },
  {
    icon: '🔪',
    title: 'Spay + microchip',
    detail: 'Both done 11 July 2026.',
    date: '2026-07-11',
  },
];

/** Health tasks still to arrange. */
export const toArrange: Reminder[] = [
  { icon: '💉', text: 'Rabies vaccine' },
  { icon: '🧪', text: 'FeLV vaccine (optional)' },
  { icon: '🪪', text: 'Government Pet Passport + microchip registration' },
  {
    icon: '📋',
    text: 'Next visit: confirm microchip is registered to current contact details',
  },
];

/** Ongoing daily treatment. */
export const treatment: CareItem[] = [
  {
    icon: '👂',
    title: 'Morning ear care',
    cadence: 'Every morning',
    detail:
      "Clean inside the ear with the vet's solution on a cotton bud, apply the prescribed ear medication, then gently massage the base. Ongoing since 11 July — continue for the full course.",
  },
];

export const recovery = {
  headline: 'Recovering from spay (surgery 11 July 2026)',
  clearedByLabel: '~25 July 2026',
  clearedByDate: '2026-07-25',
  points: [
    'Keep the incision area protected.',
    'Limit jumping & climbing until cleared by the vet.',
    'Glance at the incision daily — watch for redness, swelling, or discharge.',
  ],
};

export const food: CareItem[] = [
  {
    icon: '🍽️',
    title: 'What she eats',
    detail:
      'Prefers wet / lickable food. Eats kibble but rarely "crunches" it — just her style, not a dental issue.',
  },
  {
    icon: '⚖️',
    title: 'Measured meals',
    detail:
      'Feed measured portions, not free-feeding — watch her weight now that she is spayed.',
  },
  {
    icon: '🍬',
    title: 'Treats',
    detail: 'A big favourite! Keep them to ≤10% of daily food.',
  },
  {
    icon: '💧',
    title: 'Water',
    detail: 'Fresh water always available — she has a water fountain.',
  },
];

export const grooming: CareItem[] = [
  {
    icon: '🪮',
    title: 'Daily combing',
    cadence: 'Daily',
    detail:
      'Comb with a stainless steel comb — she enjoys it and turns for both sides. Essential for her long coat; prevents mats.',
  },
  {
    icon: '👁️',
    title: 'Eyes & face',
    cadence: 'As needed',
    detail: 'Wipe with pet wipes as needed.',
  },
  {
    icon: '✂️',
    title: 'Nails',
    cadence: 'Every 2–4 weeks',
    detail: 'Not yet trimmed — needs starting. Front paws especially.',
  },
  {
    icon: '🛁',
    title: 'Bathing',
    cadence: 'Rarely',
    detail:
      'Rarely needed thanks to daily combing. Occasional bath or professional groom once fully healed.',
  },
  {
    icon: '🪥',
    title: 'Teeth',
    cadence: 'Building the habit',
    detail: 'Toothbrushing habit being introduced with cat-safe toothpaste.',
  },
];

export const litter: CareItem[] = [
  {
    icon: '🚽',
    title: 'Current setup',
    detail: 'A low, shallow open tray — easy access during recovery.',
  },
  {
    icon: '📦',
    title: 'The plan',
    detail:
      'Move to a large open high-sided box once fully healed. Scoop daily; ideally two boxes.',
  },
];

export const personality: CareItem[] = [
  {
    icon: '🪶',
    title: 'Playful & energetic',
    detail: 'A young cat who loves wand toys and "hunting" play.',
  },
  {
    icon: '💕',
    title: 'Affectionate on her terms',
    detail: 'Bonded to her people; independent when she wants space.',
  },
  {
    icon: '🌩️',
    title: 'Sensitive to loud noises',
    detail:
      'Thunder & storms send her hiding in snug, enclosed spots. Let her retreat — don\'t pull her out. Dark, quiet hiding places + calm energy help.',
  },
  {
    icon: '😴',
    title: 'Lots of rest',
    detail: 'Needs daily play and rest; sleeps 16+ hours a day (normal for her age).',
  },
];

export const safety: CareItem[] = [
  {
    icon: '🪟',
    title: 'Windows & heights',
    detail:
      'Keep only mesh-protected windows open — she\'s a climber. Unscreened windows/balconies are an escape & fall risk.',
  },
  {
    icon: '🚫',
    title: 'Keep away — toxic',
    detail:
      'Lilies, onion/garlic, chocolate, grapes/raisins, paracetamol, essential oils.',
  },
  {
    icon: '🆔',
    title: 'ID',
    detail:
      'Microchipped (registration to be confirmed). A breakaway safety collar is recommended.',
  },
];

/** Red-flag symptoms — call the vet. */
export const callVetIf: string[] = [
  'Not eating for ~24h, or repeated vomiting.',
  'Straining in the litter box, or no urination in a day.',
  'Incision looks red, swollen, open, or has discharge.',
  'Persistent hiding + hunched posture + off food (vs. her normal come-and-go).',
  'Laboured breathing or sudden lethargy.',
];

/**
 * Age in months, computed from BIRTH_DATE at build time so it stays current
 * every time the site is rebuilt.
 */
export function ageInMonths(from: Date = new Date()): number {
  const birth = new Date(BIRTH_DATE);
  let months =
    (from.getFullYear() - birth.getFullYear()) * 12 +
    (from.getMonth() - birth.getMonth());
  if (from.getDate() < birth.getDate()) months -= 1;
  return Math.max(0, months);
}

export function ageLabel(from: Date = new Date()): string {
  const months = ageInMonths(from);
  if (months < 12) return `~${months} months old`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0
    ? `~${years} year${years > 1 ? 's' : ''} old`
    : `~${years}y ${rem}m old`;
}
