/**
 * Single source of truth for everything about Picha.
 *
 * The whole site renders from this file, so updating her profile = editing data
 * here (no need to touch markup). Keep it typed and tidy; add new fields rather
 * than hardcoding values into components.
 *
 * Voice: playful — Picha owns the place, the humans are staff. Keep medical
 * facts and emergency copy clear and unambiguous (jokes end where the vet
 * begins).
 */

export interface CareItem {
  icon: string;
  title: string;
  detail: string;
  /** Optional cadence hint, e.g. "Daily", "Every 2–4 weeks". */
  cadence?: string;
}

export interface TimelineEntry {
  icon: string;
  title: string;
  detail: string;
  /** ISO date (YYYY-MM-DD). Omit when it isn't scheduled yet ("to book"). */
  date?: string;
}

/** Picha's date of birth — age is computed from this so it never goes stale. */
export const BIRTH_DATE = '2025-11-27';

export const identity = {
  name: 'Picha',
  tagline: 'All-white floof · amber eyes · pink-collar',
  breed: 'Persian × Turkish Angora mix',
  sex: 'Female, spayed',
  colour: 'White',
  bornLabel: '27 November 2025',
  looks:
    'All-white long coat, pink ears & nose, amber eyes. Wears a pink collar with a bell so the staff always know where management is.',
  home: 'An apartment in Kuala Lumpur, staffed by Farah & Farzin',
  story:
    'Picha owns an apartment in Kuala Lumpur, where she keeps two humans — Farah & Farzin — as full-time staff. Their duties include wand-toy operation, chin scratches on demand, and opening treat packets at the precise frequency of her meow. She pays in purrs, head-boops, and the honour of her company. It is not a fair arrangement. Nobody is complaining.',
};

export const weight = {
  current: '2.85 kg',
  measuredOn: '18 July 2026',
  healthyTarget: '~3–4.5 kg',
  note: 'Still growing until ~1.5–2 years old.',
};

export const vet = {
  // No regular vet chosen yet — the position remains open.
  status: 'Auditioning vets — no permanent hire yet',
  recentClinic: 'HP Vet (Pusat Veterinar Healing Pets), Damansara Utama, PJ',
  recentPhone: '03-7732 8878',
};

/** Owner contact — shown publicly so the page doubles as a "if found" tag. */
export const contact = {
  ownersLabel: 'Farah & Farzin',
  owners: [
    { name: 'Daddy', phone: '+60 14 238 1951' },
    { name: 'Mommy', phone: '+60 17 331 2512' },
  ],
};

/** Microchip ID (shown to help reunite her if lost). */
export const microchip = '458098500319352';

/**
 * Her health history and future in one list. Entries with a past date render
 * as "done", future dates as "coming up" (the soonest is highlighted), and
 * entries without a date land in "to book".
 */
export const healthTimeline: TimelineEntry[] = [
  {
    icon: 'ph:syringe',
    title: 'FVRCP vaccine — dose 1',
    detail: 'Felocell 4, first dose. Taken like a champ (allegedly).',
    date: '2026-05-10',
  },
  {
    icon: 'ph:syringe',
    title: 'FVRCP vaccine — dose 2',
    detail: 'Felocell 4, second dose. Series complete.',
    date: '2026-06-22',
  },
  {
    icon: 'ph:bug',
    title: 'Parasite control',
    detail: 'Revolution Plus applied — fleas, ticks and worms evicted.',
    date: '2026-06-24',
  },
  {
    icon: 'ph:pill',
    title: 'Dewormed',
    detail: 'Interior pest control, completed.',
    date: '2026-06-25',
  },
  {
    icon: 'ph:first-aid',
    title: 'Spay + microchip',
    detail: 'Both done in one visit. She billed the recovery time as spa leave.',
    date: '2026-07-11',
  },
  {
    icon: 'ph:bandaids',
    title: 'Spay recovery check',
    detail:
      'Target date for the all-clear — jumping and climbing privileges to be reinstated by the vet.',
    date: '2026-07-25',
  },
  {
    icon: 'ph:syringe',
    title: 'FVRCP booster',
    detail: 'Felocell 4 annual booster due.',
    date: '2027-06-22',
  },
  {
    icon: 'ph:syringe',
    title: 'Rabies vaccine',
    detail: 'Required before any travel plans Her Fluffiness may approve.',
  },
  {
    icon: 'ph:test-tube',
    title: 'FeLV vaccine',
    detail: 'Optional — to discuss with whichever vet wins the job.',
  },
  {
    icon: 'ph:identification-card',
    title: 'Pet Passport + microchip registration',
    detail:
      'Government paperwork: register the microchip and confirm it points at current contact details.',
  },
  {
    icon: 'ph:scissors',
    title: 'Start the nail-trim routine',
    detail: 'First manicure pending. Front paws first, every 2–4 weeks after.',
  },
];

/** Ongoing daily treatment. Keep instructions exact — this one is medical. */
export const treatment: CareItem[] = [
  {
    icon: 'ph:ear',
    title: 'Morning ear care',
    cadence: 'Every morning',
    detail:
      'Clean inside the ear with ORI-EAR cleaner on a cotton bud, apply Oridermyl ear ointment (Vetoquinol), then gently massage the base. Ongoing since 11 July — continue for the full course. She tolerates this with visible disapproval.',
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
    icon: 'ph:fork-knife',
    title: 'Her palate',
    detail:
      'Wet and lickable food: five stars, licked clean. Kibble gets politely nibbled, rarely crunched — a lifestyle choice, the vet confirms, not a dental issue.',
  },
  {
    icon: 'ph:bowl-food',
    title: 'Portion control',
    detail:
      'Measured meals only — the buffet is closed. Post-spay royalty gains weight easily, and the waistline is under active management.',
  },
  {
    icon: 'ph:cookie',
    title: 'Treats',
    detail:
      'Her love language and primary negotiation tool. Capped at ≤10% of daily food, no matter how convincing the eyes get.',
  },
  {
    icon: 'ph:drop',
    title: 'The fountain',
    detail:
      'Fresh running water 24/7 from her personal drinking fountain. Still water is beneath her.',
  },
];

export const grooming: CareItem[] = [
  {
    icon: 'ph:paint-brush',
    title: 'The daily combing',
    cadence: 'Daily',
    detail:
      'Stainless steel comb, once a day. She rotates herself like a rotisserie to present each side. Essential for the long coat — prevents mats, sustains the glamour.',
  },
  {
    icon: 'ph:sparkle',
    title: 'Face touch-ups',
    cadence: 'As needed',
    detail: 'Pet wipes for the eyes and face, whenever the look needs refreshing.',
  },
  {
    icon: 'ph:scissors',
    title: 'Nails',
    cadence: 'Every 2–4 weeks',
    detail:
      'The manicure programme has not started yet — front paws first, then every 2–4 weeks. Management has not yet been informed.',
  },
  {
    icon: 'ph:spray-bottle',
    title: 'Spot cleaning',
    cadence: 'As needed',
    detail:
      'YEGBONG Pet Dry Cleaning Mousse (waterless) — worked into the fur and brushed through, mainly under the chin and any spots that dared get dirty.',
  },
  {
    icon: 'ph:bathtub',
    title: 'Bathing',
    cadence: 'Rarely',
    detail:
      'Rarely required — the daily combing does the heavy lifting. An occasional bath or professional spa day once she is fully healed.',
  },
  {
    icon: 'ph:tooth',
    title: 'Teeth',
    cadence: 'In training',
    detail:
      'The toothbrushing era approaches: Histo Tree cat-safe dental gel (beef flavour) has been purchased and awaits her formal approval.',
  },
];

export const litter: CareItem[] = [
  {
    icon: 'ph:toilet',
    title: 'Current facilities',
    detail: 'A low, shallow open tray — easy access while she recovers from surgery.',
  },
  {
    icon: 'ph:package',
    title: 'Planned upgrade',
    detail:
      'A large, high-sided open box once she is fully healed. Scooped daily; ideally two boxes. She has standards.',
  },
];

/**
 * Quick "get to know her" chips. Deliberately no overlap with `personality`
 * (hunting, affection, storms and sleep live there) — these are the extras.
 */
export const likes: string[] = [
  'Treats (obviously)',
  'Her bell ball — shoot, chase, repeat',
  'The daily combing',
  'Snug hideouts',
];

export const dislikes: string[] = [
  'Being retrieved from a hideout',
  'Being held for too long',
  'Portion-control discussions',
];

export const personality: CareItem[] = [
  {
    icon: 'ph:feather',
    title: 'Professional huntress',
    detail:
      'Wand toys tremble at her name. Daily hunts are mandatory and non-negotiable — she does make the rules.',
  },
  {
    icon: 'ph:heart',
    title: 'Affectionate (by appointment)',
    detail:
      'Cuddles are granted, never requested. Deeply bonded to her staff; profoundly independent the moment it suits her.',
  },
  {
    icon: 'ph:cloud-lightning',
    title: 'Thunder critic',
    detail:
      'Storms receive zero stars and an immediate retreat to a secret bunker. Let her be — dark, quiet hideouts and calm energy fix everything. Never pull her out.',
  },
  {
    icon: 'ph:moon-stars',
    title: 'Sleep athlete',
    detail:
      '16+ hours a day. It is not laziness — it is training, and completely normal for her age.',
  },
];

export const safety: CareItem[] = [
  {
    icon: 'ph:shield-warning',
    title: 'Windows & heights',
    detail:
      'A confident climber with zero fear and zero wings. Only mesh-protected windows open — unscreened windows and balconies are a hard no.',
  },
  {
    icon: 'ph:cloud-lightning',
    title: 'Storm protocol',
    detail:
      'Thunder sends her to snug hiding spots. Let her retreat — dark, quiet places and calm energy help. Never pull her out.',
  },
  {
    icon: 'ph:identification-badge',
    title: 'ID & collar',
    detail:
      'Microchipped — public registration to current contact details still to be confirmed. A breakaway safety collar is recommended for climbing royalty.',
  },
];

/** Household items that are toxic to her — no jokes here, keep it exact. */
export const toxicItems: string[] = [
  'Lilies',
  'Onion & garlic',
  'Chocolate',
  'Grapes & raisins',
  'Paracetamol',
  'Essential oils',
];

/** Red-flag symptoms — call the vet. Serious copy on purpose. */
export const callVetIf: string[] = [
  'Not eating for ~24h, or repeated vomiting.',
  'Straining in the litter box, or no urination in a day.',
  'Incision looks red, swollen, open, or has discharge.',
  'Persistent hiding + hunched posture + off food (vs. her normal come-and-go).',
  'Laboured breathing or sudden lethargy.',
];

/**
 * Age in months, computed from BIRTH_DATE at render time so it stays current
 * on the visitor's device.
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
