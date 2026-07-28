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
  /** Not part of the routine yet (planned / in training) — tones its chip amber. */
  planned?: boolean;
}

export interface TimelineEntry {
  icon: string;
  title: string;
  detail: string;
  /** ISO date (YYYY-MM-DD). Omit when it isn't scheduled yet ("on the list"). */
  date?: string;
  /** Where it happens, shown as a chip: "at home", "at the vet", "at the salon". */
  where?: string;
}

export interface RecurringItem {
  icon: string;
  title: string;
  detail: string;
  /** Human cadence label, e.g. "Every month". */
  everyLabel: string;
  /** Days between occurrences — used to compute the next due date. */
  intervalDays: number;
  /** ISO date it was last done. Omit if the routine hasn't started yet. */
  lastDone?: string;
  /**
   * Explicit next due date (ISO). Overrides lastDone + intervalDays — use it
   * to anchor a first appointment; after doing it, set lastDone and drop this.
   */
  nextDue?: string;
  /** Where it happens, shown as a chip: "at home", "at the vet", "at the salon". */
  where?: string;
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
    'Picha owns an apartment in Kuala Lumpur, where she keeps two humans, Farah & Farzin, as full-time staff. Their duties include wand-toy operation, chin scratches on demand, and opening treat packets at the precise frequency of her meow. She pays in purrs, head-boops, and the honour of her company. It is not a fair arrangement. Nobody is complaining.',
};

export interface WeightEntry {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  kg: number;
}

/**
 * SEED weight ledger — the offline fallback only. The live ledger is the
 * Supabase table `picha_weights` (supabase/schema.sql), fetched at build time
 * by src/data/weights.ts; every page reads from there. This list is used when
 * the Supabase env vars are missing (local dev) or the fetch fails. **To log a
 * weigh-in, insert a row in Supabase** (Table Editor), not here.
 */
export const weightHistory: WeightEntry[] = [
  { date: '2026-07-18', kg: 2.85 },
  { date: '2026-07-19', kg: 2.7 },
];

/** Healthy adult range in kg (the shaded band on the weight chart). */
export const weightTarget = { min: 3, max: 4.5 };

/** Static weight facts; the current weight itself comes from weights.ts. */
export const weight = {
  healthyTarget: `~${weightTarget.min}–${weightTarget.max} kg`,
  note: 'Still growing until ~1.5–2 years old.',
  /** Weigh-in cadence (informational; surfaced in llms.txt). */
  auditEveryDays: 30,
};

export const vet = {
  // No regular vet chosen yet — the position remains open.
  status: 'Auditioning vets; no permanent hire yet',
  recentClinic: 'HP Vet (Pusat Veterinar Healing Pets), Damansara Utama, PJ',
  recentPhone: '03-7732 8878',
  /** Query for the maps directions link (clinic name + area). */
  mapsQuery: 'Pusat Veterinar Healing Pets, Damansara Utama',
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
 * One-time clinical status: the facts a vet wants at a glance and that rarely
 * change (desexed, chipped, core-vaccine series). Rendered as vitals tiles on
 * Health and echoed in llms.txt. Update here when one changes.
 */
export const clinicalStatus = [
  {
    icon: 'ph:first-aid',
    label: 'Spayed',
    value: 'Yes',
    sub: '11 Jul 2026',
  },
  {
    icon: 'ph:identification-card',
    label: 'Microchip',
    value: 'Yes',
    sub: '11 Jul 2026',
  },
  {
    icon: 'ph:syringe',
    label: 'Core vaccines',
    value: 'FVRCP',
    sub: 'series complete',
  },
];

/**
 * Her life milestones + health history and future in one list. Entries with a
 * past date render as "done", future dates as "coming up" (the soonest is
 * highlighted), and entries without a date land in "to book".
 */
export const healthTimeline: TimelineEntry[] = [
  {
    icon: 'ph:cake',
    title: 'A star is born',
    detail:
      'One tiny white cloud arrives, opens her amber eyes, and starts planning her staff structure.',
    date: BIRTH_DATE,
  },
  {
    icon: 'ph:syringe',
    title: 'FVRCP vaccine, dose 1',
    detail: 'Felocell 4, first dose. Taken like a champ (allegedly).',
    date: '2026-05-10',
  },
  {
    icon: 'ph:syringe',
    title: 'FVRCP vaccine, dose 2',
    detail: 'Felocell 4, second dose. Series complete.',
    date: '2026-06-22',
  },
  {
    icon: 'ph:house-line',
    title: 'The great staff hiring',
    detail:
      'Interviewed Farah & Farzin at the pet shop and hired both on the spot. No probation period; she does not do trial runs.',
    date: '2026-06-24',
  },
  {
    icon: 'ph:bug',
    title: 'Parasite control',
    detail: 'Revolution Plus applied. Fleas, ticks and worms: evicted.',
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
    icon: 'ph:ear',
    title: 'Ear treatment course started',
    detail:
      'The daily ORI-EAR + Oridermyl routine begins. Tolerated with visible disapproval.',
    date: '2026-07-12',
  },
  {
    icon: 'ph:ear',
    title: 'Ear treatment course completed',
    detail:
      'Full ORI-EAR + Oridermyl course done; ears cleared. Daily disapproval may now cease.',
    date: '2026-07-21',
  },
  {
    icon: 'ph:syringe',
    title: 'Rabies vaccine',
    detail: 'Required before any travel plans Her Fluffiness may approve.',
  },
  {
    icon: 'ph:test-tube',
    title: 'FeLV vaccine',
    detail: 'Optional. To discuss with whichever vet wins the job.',
  },
  {
    icon: 'ph:tooth',
    title: 'Dental check',
    detail:
      'A first professional look at the royal teeth; the toothbrushing training programme deserves expert oversight.',
  },
  {
    icon: 'ph:identification-card',
    title: 'Pet Passport + microchip registration',
    detail:
      'Government paperwork: register the microchip and confirm it points at current contact details.',
  },
];

/**
 * Recurring health upkeep — merged into the Health "Coming up" list with a
 * computed next-due date (lastDone + intervalDays). Cadences follow the
 * product labels / common guidance and are to be confirmed with the vet.
 * After doing one, just update its `lastDone`.
 */
export const recurringCare: RecurringItem[] = [
  {
    icon: 'ph:bug',
    title: 'Parasite control',
    detail:
      'Revolution Plus spot-on between the shoulder blades, applied by the staff. Fleas, ticks and worms are served their eviction notice.',
    everyLabel: 'Every month',
    intervalDays: 30,
    lastDone: '2026-06-24',
    nextDue: '2026-07-31',
    where: 'at home',
  },
  {
    icon: 'ph:pill',
    title: 'Deworming',
    detail:
      'Interior pest patrol on the standard adult schedule: a pill, smuggled in inside something delicious and served without ceremony.',
    everyLabel: 'Every 3 months',
    intervalDays: 90,
    lastDone: '2026-06-25',
    where: 'at home',
  },
  {
    icon: 'ph:sparkle',
    title: 'Grooming & spa day',
    detail:
      'The full salon treatment: bath, blow-dry and a top-to-tail tidy-up, so the resident cloud stays soft and photogenic.',
    everyLabel: 'Every 2 months',
    intervalDays: 60,
    lastDone: '2026-07-24',
    where: 'at the salon',
  },
  {
    icon: 'ph:broom',
    title: 'Litter box deep clean',
    detail:
      'A full scrub and a complete change of litter; the royal facilities restored to five stars.',
    everyLabel: 'Every 3 months',
    intervalDays: 90,
    lastDone: '2026-07-11',
    where: 'at home',
  },
  {
    icon: 'ph:stethoscope',
    title: 'Full annual checkup',
    detail:
      'The once-a-year, nose-to-tail service: full exam, weight check and an audience with the royal teeth.',
    everyLabel: 'Every year',
    intervalDays: 365,
    lastDone: '2026-07-11',
    where: 'at the vet',
  },
  {
    icon: 'ph:syringe',
    title: 'FVRCP booster',
    detail:
      'Felocell 4, the yearly top-up that keeps the core feline viruses on their side of the palace gates.',
    everyLabel: 'Every year',
    intervalDays: 365,
    lastDone: '2026-06-22',
    where: 'at the vet',
  },
  {
    icon: 'ph:scissors',
    title: 'Nail trim',
    detail:
      'Front paws first, back paws only with royal consent. Management files a formal complaint every time, then submits to the clippers.',
    everyLabel: 'Every 2–4 weeks',
    intervalDays: 21,
    lastDone: '2026-07-24',
    where: 'at home',
  },
];

/**
 * The staff's daily to-dos — rendered as an interactive checklist on the Care
 * page, in the order they happen across the day (no time-of-day labels; the
 * sequence says it). A task that happens more than once (wet food, litter,
 * play) simply appears more than once with its own id. The fountain and dry
 * feeder are automatic, so those items are about topping up, not measuring.
 * Completion is shared across the staff's devices via Supabase
 * (`picha_rounds`, keyed by date) with a localStorage fallback; both roll over
 * at midnight MYT. Items are defined here only — add/remove/reorder freely,
 * the store just tracks ids. Keep ids stable: they're the storage keys.
 */
export const dailyChecklist = [
  {
    id: 'water',
    icon: 'ph:drop',
    label: 'Top up the fountain',
    hint: 'Refill the reservoir; the fountain runs itself',
  },
  {
    id: 'meals-1',
    icon: 'ph:bowl-food',
    label: 'Wet food service',
    hint: 'First course, around 10am; mix in any kibble she left',
  },
  {
    id: 'litter-1',
    icon: 'ph:toilet',
    label: 'Scoop the litter',
    hint: 'First pass; she has standards',
  },
  {
    id: 'combing',
    icon: 'ph:paint-brush',
    label: 'The daily combing',
    hint: 'Both sides; she will rotate herself',
  },
  {
    id: 'eyes',
    icon: 'ph:sparkle',
    label: 'Eye & face wipe',
    hint: 'Pet wipe around the eyes and chin',
  },
  {
    id: 'play-hunt',
    icon: 'ph:feather',
    label: 'Hunt session',
    hint: '10–15 min of wand-toy duty',
  },
  {
    id: 'academy',
    icon: 'ph:graduation-cap',
    label: 'Academy session',
    hint: 'One short training rep; see the Royal Academy',
  },
  {
    id: 'treat',
    icon: 'ph:cookie',
    label: 'A treat, if earned',
    hint: 'Around 4pm, only when earned; capped at 10% of her food',
  },
  {
    id: 'meals-2',
    icon: 'ph:bowl-food',
    label: 'Wet food service',
    hint: 'Second course, around 9:30pm before lights-out',
  },
  {
    id: 'play-ball',
    icon: 'ph:tennis-ball',
    label: 'Ball session',
    hint: 'Toss the ball; let her chase and pounce',
  },
  {
    id: 'litter-2',
    icon: 'ph:toilet',
    label: 'Scoop the litter',
    hint: 'Second pass to keep it five-star',
  },
  {
    id: 'cuddle',
    icon: 'ph:hand-heart',
    label: 'Lap & cuddle time',
    hint: 'Mandatory affection audit; she decides when it ends',
  },
  {
    id: 'lockup',
    icon: 'ph:moon-stars',
    label: 'Nightly lock-up',
    hint: 'Windows and balcony shut, nothing risky left out',
  },
];

/* ---------- body language (the "Reading Picha" tool) ---------- */

export interface EarSignal {
  /** Asset key: src/assets/ears/ear-<id>.png. */
  id: string;
  /** Number in the field guide (matches the reference chart). */
  num: number;
  /** The ear position. */
  title: string;
  /** One-line read, shown as a chip. */
  mood: string;
  /**
   * How to treat it: calm (approach freely), alert (engaged, not upset),
   * wary (ease off), danger (give her space). Drives the card's colour.
   */
  tone: 'calm' | 'alert' | 'wary' | 'danger';
  detail: string;
}

/**
 * Ear positions — the first chapter of the body-language reader
 * (/body-language). Photos are cropped from the reference chart; eyes, tail and
 * paws come later as their own signal sets. Descriptions follow standard feline
 * body-language guidance; the two `danger` states stay plain and unambiguous.
 */
export const earSignals: EarSignal[] = [
  {
    id: 'forward',
    num: 1,
    title: 'Forward',
    mood: 'Curious & friendly',
    tone: 'calm',
    detail:
      'Ears up and swung forward. She is engaged and interested; a good moment to say hello.',
  },
  {
    id: 'neutral',
    num: 2,
    title: 'Relaxed / neutral',
    mood: 'Calm & content',
    tone: 'calm',
    detail:
      'Ears upright and easy, facing loosely forward. All is well in the kingdom: comfortable, calm and at ease.',
  },
  {
    id: 'swiveling',
    num: 3,
    title: 'Swiveling',
    mood: 'Listening',
    tone: 'alert',
    detail:
      'Ears rotating like little satellite dishes to track a sound. Alert and reading the room, not upset.',
  },
  {
    id: 'sideways',
    num: 4,
    title: 'Sideways (airplane mode)',
    mood: 'Overstimulated',
    tone: 'wary',
    detail:
      'Ears turned out to the sides like little wings. Uncertain, annoyed or over it; a gentle sign to ease off.',
  },
  {
    id: 'slightly-back',
    num: 5,
    title: 'Slightly back',
    mood: 'Irritated',
    tone: 'wary',
    detail:
      'Ears tipped back a touch. Cautious and a little annoyed, weighing whether to react. Give her a moment.',
  },
  {
    id: 'flat',
    num: 6,
    title: 'Flat against head',
    mood: 'Give her space',
    tone: 'danger',
    detail:
      'Ears pinned flat to the head to protect them. Fear or defensive aggression under real stress. Do not reach in; let her calm down on her own.',
  },
  {
    id: 'one-ear-back',
    num: 7,
    title: 'One ear back',
    mood: 'Multitasking',
    tone: 'alert',
    detail:
      'One ear forward, one swung back, tracking two things at once (often something behind her). Mildly on guard.',
  },
  {
    id: 'high-tall',
    num: 8,
    title: 'High & tall',
    mood: 'On high alert',
    tone: 'alert',
    detail:
      'Ears at full height, straight up. Very alert and keyed up, locked onto something she has decided is important.',
  },
  {
    id: 'low-wide',
    num: 9,
    title: 'Low & wide',
    mood: 'Anxious',
    tone: 'wary',
    detail:
      'Ears held low and splayed wide. Worried and feeling threatened, but not looking for a fight. Reassure her, do not crowd.',
  },
  {
    id: 'predatory',
    num: 10,
    title: 'Predatory focus',
    mood: 'Hunting',
    tone: 'alert',
    detail:
      'Ears forward and locked, the whole face focused. Full hunting mode: intense concentration, ready to pounce (on a toy, ideally).',
  },
  {
    id: 'sleepy',
    num: 11,
    title: 'Content & sleepy',
    mood: 'Blissed out',
    tone: 'calm',
    detail:
      'Ears loose and slightly rotated as she dozes. Deeply relaxed, comfortable and safe. Peak contentment.',
  },
  {
    id: 'hissing',
    num: 12,
    title: 'Aggressive / hissing',
    mood: 'Back off',
    tone: 'danger',
    detail:
      'Mouth open, ears back, warning issued. She feels threatened and is telling you to stay away. Respect it and give her room.',
  },
];

/* ---------- the Royal Academy (training tool) ---------- */

export interface TrainingStep {
  title: string;
  detail: string;
}

export interface TrainingCourse {
  /** URL slug — /training/<slug>/. Keep stable once published. */
  slug: string;
  icon: string;
  title: string;
  /** One-liner for the hub card. */
  tagline: string;
  /** Why the course exists — plainer voice, the practical reason. */
  why: string;
  /** Management resistance level, 1–3 (rendered as paw icons). */
  resistance: 1 | 2 | 3;
  steps: TrainingStep[];
  /**
   * Milestones passed — the first `stepsDone` steps are complete and the next
   * one is the current step. **Advance this after she truly passes a step.**
   */
  stepsDone: number;
  /** ISO date the course started. Set it to move from syllabus to in session. */
  startedOn?: string;
}

/** Session rules — shown with every course. Keep these plain and exact. */
export const trainingRules: string[] = [
  'Short sessions: 2–5 minutes, once or twice a day.',
  'Always end on a success, even a tiny one.',
  'Treats are the salary; keep them within the daily 10% budget.',
  'Never force it. If she leaves, class is dismissed.',
  'One step at a time; repeat a step for days before moving on.',
];

/**
 * The course catalogue — content only. PROGRESS (`stepsDone`, `startedOn`)
 * lives in the Supabase table `picha_training` and is merged in at build time
 * by src/data/training.ts; the values here are just the offline seed. Record
 * milestones with the registrar controls on each course page (or the Supabase
 * dashboard), not by editing this file. New courses: add them here with
 * stepsDone 0; their progress rows appear on the first write.
 */
export const trainingCourses: TrainingCourse[] = [
  {
    slug: 'toothbrushing',
    icon: 'ph:tooth',
    title: 'Toothbrushing 101',
    tagline: 'The toothbrushing era begins, pending her formal approval.',
    why: 'Cats hide dental disease until it hurts. A daily brush is the single best prevention, and the beef-flavour Histo Tree gel has already been purchased.',
    resistance: 3,
    stepsDone: 0,
    steps: [
      {
        title: 'The taste test',
        detail: 'A dab of dental gel on a finger, offered as a treat. Repeat for a few days until she considers it food.',
      },
      {
        title: 'Chin and cheek',
        detail: 'While she licks the gel, touch her lips and cheeks. Seconds only, then release and praise.',
      },
      {
        title: 'Finger on gums',
        detail: 'Gel on a finger, gently rubbed along the front teeth and gumline. Stop before she objects.',
      },
      {
        title: 'Enter the brush',
        detail: 'The cat toothbrush appears. She sniffs it and licks gel off it. No brushing yet.',
      },
      {
        title: 'First strokes',
        detail: 'A few seconds of actual brushing on the front teeth, one side. End on a treat.',
      },
      {
        title: 'The full routine',
        detail: 'Both sides and the back teeth, under a minute, daily. Graduation.',
      },
    ],
  },
  {
    slug: 'manicure',
    icon: 'ph:scissors',
    title: 'The Manicure Programme',
    tagline: 'Front paws first. Management has now been informed.',
    why: 'Indoor claws overgrow and snag. Regular trims protect her paws, the furniture and the staff.',
    resistance: 2,
    stepsDone: 0,
    steps: [
      {
        title: 'Paw diplomacy',
        detail: 'During relaxed cuddles, hold a paw for one second, release, treat. Work up to a gentle squeeze.',
      },
      {
        title: 'The press',
        detail: 'Softly press a toe pad so one claw extends, admire it, release, treat.',
      },
      {
        title: 'Meet the clippers',
        detail: 'Clippers sit nearby during cuddles and click in the air. Nothing happens to her. Treats rain.',
      },
      {
        title: 'One single claw',
        detail: 'Clip the tip of one front claw while she is calm. Stop immediately and celebrate.',
      },
      {
        title: 'A paw per sitting',
        detail: 'A few claws per session, front paws first, every 2–4 weeks. Graduation.',
      },
    ],
  },
  {
    slug: 'carrier',
    icon: 'ph:suitcase',
    title: 'Carrier Diplomacy',
    tagline: 'From portable dungeon to first-class cabin.',
    why: 'Every vet visit starts with the carrier. A cat who enters it voluntarily makes every trip calmer and faster.',
    resistance: 3,
    stepsDone: 0,
    steps: [
      {
        title: 'Furniture status',
        detail: 'The carrier lives open in the living room with a soft blanket inside, like it has always been there.',
      },
      {
        title: 'Snack venue',
        detail: 'Treats and the occasional meal appear near the carrier, then just inside the door, then at the back.',
      },
      {
        title: 'Door games',
        detail: 'The door closes for a few seconds while she snacks inside, and opens before she cares.',
      },
      {
        title: 'The short haul',
        detail: 'A brief carry around the apartment, then release and a jackpot of treats.',
      },
      {
        title: 'The dry run',
        detail: 'Down to the lobby or a short drive and straight home. No vet at the end. Graduation.',
      },
    ],
  },
  {
    slug: 'holding',
    icon: 'ph:hand-palm',
    title: 'Advanced Holding Tolerance',
    tagline: 'Ten calm seconds in staff arms counts as a diplomatic breakthrough.',
    why: 'Vet exams, grooming and the occasional shelf rescue all go better for a cat who tolerates being held.',
    resistance: 3,
    stepsDone: 0,
    steps: [
      {
        title: 'Hands, no lift',
        detail: 'Both hands rest on her sides for a moment during cuddles, then release, then treat.',
      },
      {
        title: 'The ten-second lift',
        detail: 'A brief, low lift. Feet back on the ground before she thinks about wriggling.',
      },
      {
        title: 'Lap landing',
        detail: 'Lift and place her on a lap; freedom granted immediately. The lap becomes a fine destination.',
      },
      {
        title: 'The half-minute',
        detail: 'A relaxed 30-second hold with slow strokes, ending before she asks.',
      },
      {
        title: 'Clinic style',
        detail: 'A gentle vet-style hold for up to a minute, calm throughout. Graduation.',
      },
    ],
  },
  {
    slug: 'recall',
    icon: 'ph:megaphone',
    title: 'Recall, By Appointment',
    tagline: 'She comes when called. When she agrees with the premise.',
    why: 'A reliable name response finds a hidden cat fast, which matters with a hide-and-seek grandmaster in the house.',
    resistance: 1,
    stepsDone: 0,
    steps: [
      {
        title: 'Name equals treats',
        detail: 'Say "Picha", a treat lands. Repeat over days until her head whips around on the word.',
      },
      {
        title: 'Cross-room recall',
        detail: 'Call her from across the room and reward the arrival, every single time.',
      },
      {
        title: 'Out-of-sight recall',
        detail: 'Call from another room. Arrival earns a jackpot.',
      },
      {
        title: 'Random drills',
        detail: 'Recall at random moments daily; rewards vary between food, play and affection. Graduation.',
      },
    ],
  },
  {
    slug: 'harness',
    icon: 'ph:person-simple-walk',
    title: 'Harness & Leash (Elective)',
    tagline: 'For hypothetical future expeditions Her Fluffiness may commission.',
    why: 'Elective. Useful only if travel or supervised outdoor time is ever on the agenda, so it waits at the back of the syllabus.',
    resistance: 3,
    stepsDone: 0,
    steps: [
      {
        title: 'The harness exists',
        detail: 'It lies on the floor being sniffed. Treats happen near it.',
      },
      {
        title: 'Worn, unfastened',
        detail: 'Draped over her shoulders for seconds at a time, followed by treats.',
      },
      {
        title: 'Fastened indoors',
        detail: 'Clipped on for a few minutes while play distracts her from the outfit.',
      },
      {
        title: 'Leash shadowing',
        detail: 'Leash attached, she wanders the apartment, the staff follow like courtiers.',
      },
      {
        title: 'Corridor expedition',
        detail: 'A short, escorted walk outside the front door. Graduation.',
      },
    ],
  },
];

/**
 * Doctor's orders — the standing slot on the Health page for anything the vet
 * prescribes: medication courses, post-op instructions, special routines.
 * Add an entry when the vet orders it; DELETE it when the course ends — the
 * section (and its llms.txt block) hides itself when this list is empty.
 * Entries also merge into the Care page's protocol list. Keep instructions
 * exact — this one is medical.
 */
export const treatment: CareItem[] = [];

export const food: CareItem[] = [
  {
    icon: 'ph:fork-knife',
    title: 'Her palate',
    detail:
      'Wet and lickable food: five stars, licked clean. Kibble gets politely nibbled, rarely crunched. A lifestyle choice, the vet confirms, not a dental issue.',
  },
  {
    icon: 'ph:bowl-food',
    title: 'Portion control',
    detail:
      'Measured meals only; the buffet is closed. Three 20 g kibble drops from the feeder (60 g a day), plus two hand-served wet courses and one afternoon treat. Post-spay royalty gains weight easily, and the waistline is under active management.',
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

/**
 * Her daily feeding timetable. Kibble is automatic (`auto`) on the feeder's
 * three timed drops (20 g each, 60 g a day); the wet courses and the afternoon
 * treat are served by the staff. `time` is display-only, kept in day order.
 * Approximate hand-served times are prefixed with "~".
 */
export interface MealSlot {
  time: string;
  icon: string;
  title: string;
  /** Portion, when fixed (kibble). */
  amount?: string;
  /** Dispensed by the automatic feeder rather than served by the staff. */
  auto?: boolean;
  detail: string;
}

export const feedingSchedule: MealSlot[] = [
  {
    time: '7:00 AM',
    icon: 'ph:bowl-food',
    title: 'Morning kibble',
    amount: '20 g',
    auto: true,
    detail: 'The feeder drops her first course on schedule; she nibbles at it when the mood strikes.',
  },
  {
    time: '~10:00 AM',
    icon: 'ph:fork-knife',
    title: 'Wet food, first course',
    detail: 'Her five-star course, served by hand. Any kibble she left from the morning gets mixed in.',
  },
  {
    time: '1:00 PM',
    icon: 'ph:bowl-food',
    title: 'Midday kibble',
    amount: '20 g',
    auto: true,
    detail: 'The second automatic drop, keeping the day evenly fed.',
  },
  {
    time: '~4:00 PM',
    icon: 'ph:cookie',
    title: 'Snack or treat',
    detail: 'The afternoon negotiation, kept within the 10% treat cap no matter how convincing the eyes get.',
  },
  {
    time: '7:00 PM',
    icon: 'ph:bowl-food',
    title: 'Evening kibble',
    amount: '20 g',
    auto: true,
    detail: 'The last automatic drop of the day.',
  },
  {
    time: '~9:30 PM',
    icon: 'ph:fork-knife',
    title: 'Wet food, second course',
    detail: 'The nightcap, served before lights-out. Nothing after, she sleeps it off.',
  },
];

// Active routines first (by how often they happen), then the planned ones —
// `planned` tones their cadence chip amber so "coming soon" reads at a glance.
export const grooming: CareItem[] = [
  {
    icon: 'ph:paint-brush',
    title: 'The daily combing',
    cadence: 'Daily',
    detail:
      'The tool of record is a stainless steel comb, worked through both sides while she rotates herself like a rotisserie. The long coat depends on it: it prevents mats and sustains the glamour.',
  },
  {
    icon: 'ph:sparkle',
    title: 'Face touch-ups',
    cadence: 'As needed',
    detail:
      'Pet wipes for the eyes and face, kept within reach for whenever the look needs refreshing.',
  },
  {
    icon: 'ph:spray-bottle',
    title: 'Spot cleaning',
    cadence: 'As needed',
    detail:
      'YEGBONG Pet Dry Cleaning Mousse (waterless), worked into the fur and brushed through, mainly under the chin and any spots that dared get dirty.',
  },
  {
    icon: 'ph:bathtub',
    title: 'Bathing',
    cadence: 'Rarely',
    detail:
      'Rarely required; the daily combing does the heavy lifting. An occasional bath or a professional spa day, by appointment.',
  },
  {
    icon: 'ph:scissors',
    title: 'Nails',
    cadence: 'Every 2–4 weeks',
    detail:
      'A manicure every 2–4 weeks with cat clippers: front paws first, back paws as she permits. Best conducted while she is drowsy and least inclined to file a complaint.',
  },
  {
    icon: 'ph:tooth',
    title: 'Teeth',
    cadence: 'In training',
    planned: true,
    detail:
      'Toothbrushing with Histo Tree cat-safe dental gel (beef flavour), building from a finger on the gums up to a full daily brush. A work in progress, conducted entirely at her pace.',
  },
];

export const litter: CareItem[] = [
  {
    icon: 'ph:toilet',
    title: 'Current facilities',
    detail: 'A low, shallow open tray. The starter facilities: easy in, easy out.',
  },
  {
    icon: 'ph:package',
    title: 'Planned upgrade',
    detail:
      'A large, high-sided open box, next on the procurement list. Scooped daily; ideally two boxes. She has standards.',
  },
];

/**
 * Quick likes/dislikes — no longer rendered on the site (the personality
 * list carries the depth) but still published for agents via llms.txt.
 */
export const likes: string[] = [
  'Treats (obviously)',
  'Her bell ball: shoot, chase, repeat',
  'The daily combing',
  'A freshly scooped litter box',
];

export const dislikes: string[] = [
  'Being retrieved from a hideout',
  'Being held for too long',
  'Closed doors',
  'Portion-control discussions',
];

export const personality: CareItem[] = [
  {
    icon: 'ph:feather',
    title: 'Professional huntress',
    detail:
      'Wand toys tremble at her name. Daily hunts are mandatory and non-negotiable; she does make the rules.',
  },
  {
    icon: 'ph:moon-stars',
    title: 'Sleep athlete',
    detail:
      '16+ hours a day. It is not laziness, it is training, and completely normal for her age.',
  },
  {
    icon: 'ph:cloud-lightning',
    title: 'Thunder critic',
    detail:
      'Storms receive zero stars and an immediate retreat to a secret bunker. Let her be: dark, quiet hideouts and calm energy fix everything. Never pull her out.',
  },
  {
    icon: 'ph:sparkle',
    title: 'Impeccably groomed',
    detail:
      'Self-grooming is a round-the-clock operation. The white coat stays white through relentless personal effort; the staff merely assist.',
  },
  {
    icon: 'ph:megaphone',
    title: 'Chief demands officer',
    detail:
      'Attention is not requested, it is summoned. Ignoring her is technically possible, for about eleven seconds.',
  },
  {
    icon: 'ph:map-pin',
    title: 'Keeper of the spots',
    detail:
      'She maintains a rotation of official favourite spots. If she is "missing", she is at one of them, precisely where she intends to be.',
  },
  {
    icon: 'ph:couch',
    title: 'Professional proximity',
    detail:
      'Wants her people near, never on top of her. Sit or lie beside her, keep a respectful gap, and consider yourself honoured.',
  },
  {
    icon: 'ph:magnifying-glass',
    title: 'Chief inspector',
    detail:
      'Anything new is inspected on arrival. Groceries do not enter service until every single bag has passed her sniff audit.',
  },
  {
    icon: 'ph:heart',
    title: 'Affectionate (by appointment)',
    detail:
      'Cuddles are granted, never requested. Deeply bonded to her staff; profoundly independent the moment it suits her.',
  },
  {
    icon: 'ph:binoculars',
    title: 'Hide-and-seek grandmaster',
    detail:
      'The staff run and hide; she finds them. Every time. No one has ever successfully hidden from her, and no one ever will.',
  },
  {
    icon: 'ph:tennis-ball',
    title: 'Fetch, on her terms',
    detail:
      'Her bell ball is the crown jewel: she shoots it, chases it down and catches it, then carries it back to a staff hand and waits for the throw. Return it and she returns it right back. Championship matches are staged in the bedroom at lights-out, at full volume, and no one asked for them.',
  },
];

/**
 * Her one song. Play it and she is asleep before it finishes — a genuinely
 * useful trick for the staff (and any stand-in) at lights-out.
 */
export const lullaby = {
  title: 'Her lullaby',
  detail:
    'There is one specific song, and she is unconscious before it ends. The staff keep it cued for lights-out; the effect is frankly suspicious. When she will not settle, this is the cheat code.',
  cta: 'Play her lullaby',
  videoId: 'dN8MQpcW_P4',
  url: 'https://www.youtube.com/watch?v=dN8MQpcW_P4',
};

export const safety: CareItem[] = [
  {
    icon: 'ph:shield-warning',
    title: 'Windows & heights',
    detail:
      'A confident climber with zero fear and zero wings. Only mesh-protected windows open; unscreened windows and balconies are a hard no.',
  },
  {
    icon: 'ph:cloud-lightning',
    title: 'Storm protocol',
    detail:
      'Thunder sends her to snug hiding spots. Let her retreat: dark, quiet places and calm energy help. Never pull her out.',
  },
  {
    icon: 'ph:identification-badge',
    title: 'ID & collar',
    detail:
      'Microchipped; public registration to current contact details still to be confirmed. A breakaway safety collar is recommended for climbing royalty.',
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
  'Persistent hiding + hunched posture + off food (vs. her normal come-and-go).',
  'Laboured breathing or sudden lethargy.',
];

/**
 * Age in months (fractional), computed from BIRTH_DATE at render time so it
 * stays current on the visitor's device. The fraction is the progress through
 * the current month-of-age (7.7 = seven months and ~three weeks).
 */
export function ageInMonths(from: Date = new Date()): number {
  const birth = new Date(BIRTH_DATE);
  let whole =
    (from.getFullYear() - birth.getFullYear()) * 12 +
    (from.getMonth() - birth.getMonth());
  if (from.getDate() < birth.getDate()) whole -= 1;
  if (whole < 0) return 0;
  const anchor = new Date(birth);
  anchor.setMonth(anchor.getMonth() + whole);
  const next = new Date(birth);
  next.setMonth(next.getMonth() + whole + 1);
  const frac =
    (from.getTime() - anchor.getTime()) / (next.getTime() - anchor.getTime());
  return whole + Math.min(Math.max(frac, 0), 0.99);
}

export function ageLabel(from: Date = new Date()): string {
  const months = Math.round(ageInMonths(from) * 10) / 10;
  if (months < 12) {
    const label = Number.isInteger(months) ? String(months) : months.toFixed(1);
    return `~${label} months old`;
  }
  const years = Math.floor(months / 12);
  const rem = Math.floor(months % 12);
  const yearsLabel = `${years} year${years > 1 ? 's' : ''}`;
  return rem === 0
    ? `~${yearsLabel} old`
    : `~${yearsLabel} ${rem} month${rem > 1 ? 's' : ''} old`;
}

/* ---------- cat-years converter (Tools) ---------- */

/**
 * Cat age → human-equivalent years, per the common veterinary rule of thumb:
 * dense kitten months first (interpolated between chart anchors), ~15 at one
 * year, 24 at two, then about four human years per cat year.
 */
const CAT_YEAR_ANCHORS: Array<[number, number]> = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 4],
  [4, 6],
  [5, 8],
  [6, 10],
  [7, 12],
  [12, 15],
  [18, 21],
  [24, 24],
];

export function catYears(months: number): number {
  const m = Math.max(0, months);
  if (m >= 24) return 24 + ((m - 24) / 12) * 4;
  for (let i = 1; i < CAT_YEAR_ANCHORS.length; i++) {
    const [m1, h1] = CAT_YEAR_ANCHORS[i - 1];
    const [m2, h2] = CAT_YEAR_ANCHORS[i];
    if (m <= m2) return h1 + ((m - m1) / (m2 - m1)) * (h2 - h1);
  }
  return 24;
}

/** What that human age amounts to, in the site's voice. */
export function humanAgeLine(humanYears: number): string {
  if (humanYears < 1) return 'a lap-sized infant';
  if (humanYears < 5) return 'a toddler with claws';
  if (humanYears < 10) return 'a primary schooler with a strict nap schedule';
  if (humanYears < 13) return 'a middle schooler with strong opinions about bedtime';
  if (humanYears < 18) return 'a teenager (this explains a great deal)';
  if (humanYears < 26) return 'a young adult who leaves everyone on read';
  if (humanYears < 40) return 'an adult with a five-year napping plan';
  if (humanYears < 60) return 'comfortably middle-aged and done with nonsense';
  return 'a distinguished senior who has seen everything';
}

/** Feline life stages (the classic six-stage scheme), in months, no gaps. */
export const felineStages = [
  {
    name: 'Kitten',
    range: '0 to 6 months',
    minMonths: 0,
    maxMonths: 6,
    blurb: 'Chaos in its purest form. Everything is prey, including feet.',
  },
  {
    name: 'Junior',
    range: '6 months to 2 years',
    minMonths: 6,
    maxMonths: 24,
    blurb: 'Full size, teenage judgement. Every house rule gets tested twice.',
  },
  {
    name: 'Prime',
    range: '2 to 6 years',
    minMonths: 24,
    maxMonths: 72,
    blurb: 'Peak cat: maximum glamour, minimum tolerance.',
  },
  {
    name: 'Mature',
    range: '6 to 10 years',
    minMonths: 72,
    maxMonths: 120,
    blurb: 'The executive years. Naps are meetings; meetings are naps.',
  },
  {
    name: 'Senior',
    range: '10 to 14 years',
    minMonths: 120,
    maxMonths: 168,
    blurb: 'Gracefully unbothered. The staff remain on duty.',
  },
  {
    name: 'Super senior',
    range: '14 years and up',
    minMonths: 168,
    maxMonths: 9999,
    blurb: 'Legendary status. Every sunbeam in the house is reserved.',
  },
];
