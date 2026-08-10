/**
 * Per-locale Home-page copy. English REFERENCES picha.ts (single source of
 * truth for facts + the English voice); other locales carry translated prose.
 * Facts that never translate (icons, phone numbers, the lullaby URL) stay in
 * picha.ts and are read directly by the page — only prose lives here.
 *
 * Personality entries align 1:1 with `personality` in picha.ts (same order),
 * so the page zips each translated {title, detail} with that item's icon.
 */
import { identity, personality, lullaby, humanAgeLine } from '../data/picha';

export interface HomeCopy {
  tagline: string;
  story: string;
  looks: string;
  getToKnow: string;
  share: string;
  personality: { title: string; detail: string }[];
  lullaby: { title: string; detail: string; cta: string };
  ifFound: string;
  call: string; // verb before an owner's name, e.g. "Call Daddy"
}

const en: HomeCopy = {
  tagline: identity.tagline,
  story: identity.story,
  looks: identity.looks,
  getToKnow: 'Get to know her',
  share: 'Share',
  personality: personality.map((p) => ({ title: p.title, detail: p.detail })),
  lullaby: { title: lullaby.title, detail: lullaby.detail, cta: lullaby.cta },
  ifFound:
    'Spotted her on an unauthorised solo adventure? Her staff would like a word:',
  call: 'Call',
};

const ms: HomeCopy = {
  tagline: 'Gebu putih salji · mata amber · berkolar merah jambu',
  story:
    'Picha memiliki sebuah apartmen di Kuala Lumpur, tempat dia mengambil dua orang manusia, Farah & Farzin, sebagai kakitangan sepenuh masa. Tugas mereka termasuk mengendalikan tongkat mainan, menggaru dagu atas permintaan, dan membuka paket snek pada frekuensi tepat mengikut ngiauannya. Bayarannya: dengkuran, sundulan kepala, dan penghormatan untuk berada di sisinya. Urusan ini tidak adil. Tiada siapa merungut.',
  looks:
    'Bulu panjang serba putih, telinga & hidung merah jambu, mata amber. Memakai kolar merah jambu berloceng supaya kakitangan sentiasa tahu di mana pihak pengurusan berada.',
  getToKnow: 'Kenali si bos',
  share: 'Kongsi',
  personality: [
    {
      title: 'Pemburu profesional',
      detail:
        'Tongkat mainan menggeletar apabila mendengar namanya. Sesi memburu setiap hari adalah wajib dan tidak boleh dirunding; dia yang buat peraturan.',
    },
    {
      title: 'Atlet tidur',
      detail:
        '16+ jam sehari. Ini bukan malas, ini latihan, dan memang normal untuk usianya.',
    },
    {
      title: 'Pengkritik guruh',
      detail:
        'Ribut mendapat sifar bintang dan pengunduran serta-merta ke kubu rahsia. Biarkan dia: tempat sembunyi yang gelap dan senyap serta suasana tenang menyelesaikan segalanya. Jangan sekali-kali tarik dia keluar.',
    },
    {
      title: 'Sentiasa terurus rapi',
      detail:
        'Menjaga diri ialah operasi 24 jam. Bulu putih kekal putih hasil usaha peribadi tanpa henti; kakitangan sekadar membantu.',
    },
    {
      title: 'Ketua Pegawai Tuntutan',
      detail:
        'Perhatian tidak diminta, ia dipanggil. Mengabaikannya secara teknikalnya mungkin, untuk kira-kira sebelas saat.',
    },
    {
      title: 'Penjaga tempat kegemaran',
      detail:
        'Dia mengekalkan giliran tempat kegemaran rasmi. Jika dia "hilang", dia berada di salah satu daripadanya, tepat di tempat yang dia mahu.',
    },
    {
      title: 'Rapat, tapi berjarak',
      detail:
        'Mahu orangnya berdekatan, bukan melekat padanya. Duduk atau baring di sebelahnya, kekalkan jarak yang sopan, dan anggaplah diri anda bertuah.',
    },
    {
      title: 'Ketua pemeriksa',
      detail:
        'Apa sahaja yang baru diperiksa sebaik tiba. Barang runcit tidak boleh digunakan sehingga setiap beg lulus audit hidungnya.',
    },
    {
      title: 'Manja (dengan temujanji)',
      detail:
        'Pelukan dikurniakan, bukan diminta. Amat rapat dengan kakitangannya; amat berdikari sebaik sahaja ia menyenangkan hatinya.',
    },
    {
      title: 'Jaguh sorok-sorok',
      detail:
        'Kakitangan lari dan bersembunyi; dia yang menjumpai mereka. Setiap kali. Tiada siapa pernah berjaya bersembunyi daripadanya, dan tiada siapa akan berjaya.',
    },
    {
      title: 'Ambil balik, ikut syaratnya',
      detail:
        'Bola locengnya ialah permata mahkota: dia menyepaknya, mengejar dan menangkapnya, kemudian membawanya kembali ke tangan kakitangan dan menunggu lontaran. Pulangkan, dan dia pulangkan semula. Perlawanan kejohanan diadakan di bilik tidur ketika waktu tidur, dengan kuat, dan tiada siapa yang memintanya.',
    },
  ],
  lullaby: {
    title: 'Lagu tidurnya',
    detail:
      'Ada satu lagu khusus, dan dia lena sebelum lagu itu tamat. Kakitangan sentiasa menyediakannya untuk waktu tidur; kesannya sungguh mencurigakan. Apabila dia enggan diam, inilah kod tipunya.',
    cta: 'Mainkan lagu tidurnya',
  },
  ifFound:
    'Ternampak dia dalam pengembaraan solo tanpa kebenaran? Kakitangannya ingin bercakap sepatah dua:',
  call: 'Hubungi',
};

export const homeCopy: Record<string, HomeCopy> = { en, ms };
export const getHomeCopy = (locale?: string): HomeCopy => homeCopy[locale ?? 'en'] ?? en;

// ---------------------------------------------------------------------------
// Footer (the "built by the staff" credit line)
// ---------------------------------------------------------------------------
export const footerCopy: Record<string, string> = {
  en: 'Built by the staff, under close supervision. Approved with a slow blink.',
  ms: 'Dibina oleh kakitangan, di bawah penyeliaan rapi. Diluluskan dengan kenyitan mata perlahan.',
};

// ---------------------------------------------------------------------------
// 404 page
// ---------------------------------------------------------------------------
export interface NotFoundCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  heading: string;
  body: string;
}
export const notFoundCopy: Record<string, NotFoundCopy> = {
  en: {
    metaTitle: 'Lost · Picha 🐾',
    metaDescription: 'This page has wandered off.',
    kicker: '404 · Not found',
    heading: 'This page has wandered off',
    body: 'Even the hide-and-seek grandmaster cannot find it. It may have been moved, renamed, or batted off a shelf.',
  },
  ms: {
    metaTitle: 'Sesat · Picha 🐾',
    metaDescription: 'Halaman ini telah merayau entah ke mana.',
    kicker: '404 · Tidak dijumpai',
    heading: 'Halaman ini telah merayau entah ke mana',
    body: 'Jaguh sorok-sorok pun tidak dapat mencarinya. Mungkin ia telah dipindahkan, ditukar nama, atau ditepis jatuh dari rak.',
  },
};
export const getNotFoundCopy = (locale?: string): NotFoundCopy =>
  notFoundCopy[locale ?? 'en'] ?? notFoundCopy.en;

// ---------------------------------------------------------------------------
// Tools page (the "royal workshop"). Icons + hrefs are facts (in tools.astro);
// only titles/details live here. Order matches the page's `inService` list.
// ---------------------------------------------------------------------------
export interface ToolsCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  blurb: string;
  inServiceLabel: string;
  passport: { title: string; detail: string };
  cards: { title: string; detail: string }[];
  note: string;
}
export const toolsCopy: Record<string, ToolsCopy> = {
  en: {
    metaTitle: 'Tools · Picha 🐾',
    metaDescription:
      "Picha's toolbox: pet passport, weight tracker, cat-years converter, the Royal Academy and a body-language reader.",
    kicker: 'Her gadgets',
    title: 'The royal workshop',
    blurb:
      'Gadgets invented by the staff to serve Her Fluffiness better. Each one enters service only after passing her personal inspection.',
    inServiceLabel: 'In service',
    passport: {
      title: 'Pet Passport',
      detail: "Her official document: particulars, microchip and the registrar's paw.",
    },
    cards: [
      {
        title: 'Staff room',
        detail: 'Where the humans keep the treats and the registrar PIN. Members only.',
      },
      {
        title: 'Weight tracker',
        detail: 'Every weigh-in, charted, so the royal waistline never sneaks up on anyone.',
      },
      {
        title: 'Cat-years converter',
        detail: 'Her age in human years, plus the maths for any cat you know.',
      },
      {
        title: 'The Royal Academy',
        detail: 'Where the staff earn their stripes in cat cooperation, one course at a time.',
      },
      {
        title: 'Reading Picha',
        detail: 'A field guide to her moods and what she is telling you.',
      },
    ],
    note: 'More gadgets are in the works. Ideas are reviewed nightly, during the 3 a.m. zoomies, and prioritised by Her Fluffiness.',
  },
  ms: {
    metaTitle: 'Alatan · Picha 🐾',
    metaDescription:
      'Kotak alatan Picha: pasport haiwan, penjejak berat, penukar tahun kucing, Akademi Diraja dan pembaca bahasa badan.',
    kicker: 'Alatan dia',
    title: 'Bengkel diraja',
    blurb:
      'Alatan yang direka oleh kakitangan untuk melayan Tuan Puteri Gebu dengan lebih baik. Setiap satu hanya mula bertugas selepas lulus pemeriksaan peribadinya.',
    inServiceLabel: 'Sedang bertugas',
    passport: {
      title: 'Pasport Haiwan',
      detail: 'Dokumen rasminya: butiran diri, mikrocip dan tapak kaki pendaftar.',
    },
    cards: [
      {
        title: 'Bilik kakitangan',
        detail: 'Tempat manusia menyimpan snek dan PIN pendaftar. Ahli sahaja.',
      },
      {
        title: 'Penjejak berat',
        detail: 'Setiap timbangan, dicarta, supaya ukur lilit pinggang diraja tidak menyelinap naik tanpa disedari.',
      },
      {
        title: 'Penukar tahun kucing',
        detail: 'Usianya dalam tahun manusia, berserta kiraan untuk mana-mana kucing yang anda kenal.',
      },
      {
        title: 'Akademi Diraja',
        detail: 'Tempat kakitangan menimba kepakaran dalam kerjasama kucing, satu kursus pada satu masa.',
      },
      {
        title: 'Membaca Picha',
        detail: 'Panduan lapangan tentang perasaannya dan apa yang dia cuba sampaikan kepada anda.',
      },
    ],
    note: 'Lebih banyak alatan sedang dalam pembikinan. Idea disemak setiap malam, ketika zoomies pukul 3 pagi, dan diutamakan oleh Tuan Puteri Gebu.',
  },
};
export const getToolsCopy = (locale?: string): ToolsCopy => toolsCopy[locale ?? 'en'] ?? toolsCopy.en;

// ---------------------------------------------------------------------------
// Cat-years converter. Facts (the maths in catYears(), month bounds) stay in
// picha.ts; prose lives here. Used at build AND by the client script, so it
// must not pull server-only modules (it doesn't — content.ts is client-safe).
// ---------------------------------------------------------------------------
export interface CatYearsCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  blurb: string;
  officialConversion: string;
  humanYearsOld: string;
  /** "{age} in cat time, which makes {name} {line}." — split around the parts. */
  inCatTimePre: string; // between the age and the name, incl. leading space
  inCatTimePost: string; // trailing punctuation after the human-age line
  stagesLabel: string;
  stages: { name: string; range: string; blurb: string }[];
  sheIsHere: string;
  stagesFootnote: string;
  convertLabel: string;
  convertHint: string;
  presetLabels: string[]; // aligns with the months in cat-years.astro
  pichaNow: string;
  catTime: string;
  humanTime: string;
  years: string; // unit shown after the converter's human number ("years")
  thatCatIsPre: string; // "That cat is " prefix
  thatCatIsPost: string;
  converterFootnote: string;
  /** cat-age units for the client formatter (singular/plural). */
  unit: { month: string; months: string; year: string; years: string };
}

// Malay human-age lines mirror the English thresholds in picha.ts humanAgeLine.
function humanAgeLineMs(y: number): string {
  if (y < 1) return 'bayi sebesar riba';
  if (y < 5) return 'kanak-kanak kecil bercakar';
  if (y < 10) return 'budak sekolah rendah dengan jadual tidur yang ketat';
  if (y < 13) return 'budak sekolah menengah rendah yang berpendirian tegas tentang waktu tidur';
  if (y < 18) return 'seorang remaja (ini menjelaskan banyak perkara)';
  if (y < 26) return 'dewasa muda yang membiarkan semua orang tergantung';
  if (y < 40) return 'dewasa dengan rancangan tidur lima tahun';
  if (y < 60) return 'setengah umur yang selesa dan tidak mahu lagi karenah';
  return 'warga emas terhormat yang telah melihat segala-galanya';
}

/** Locale-aware human-age line (English from picha.ts, others translated). */
export function humanAgeLineI18n(years: number, locale?: string): string {
  return locale === 'ms' ? humanAgeLineMs(years) : humanAgeLine(years);
}

export const catYearsCopy: Record<string, CatYearsCopy> = {
  en: {
    metaTitle: 'Cat years · Picha 🐾',
    metaDescription:
      'How old is Picha in human years? Live conversion, feline life stages and a converter for any cat.',
    kicker: 'Tools · In service',
    title: 'The cat-years converter',
    blurb:
      'Cat time runs fast at first, then settles to about four human years per birthday. Here is where Her Fluffiness stands, plus a converter for any cat you know.',
    officialConversion: '· Official conversion ·',
    humanYearsOld: 'human years old',
    inCatTimePre: ' in cat time, which makes ',
    inCatTimePost: '.',
    stagesLabel: 'The nine-lives itinerary',
    stages: [
      { name: 'Kitten', range: '0 to 6 months', blurb: 'Chaos in its purest form. Everything is prey, including feet.' },
      { name: 'Junior', range: '6 months to 2 years', blurb: 'Full size, teenage judgement. Every house rule gets tested twice.' },
      { name: 'Prime', range: '2 to 6 years', blurb: 'Peak cat: maximum glamour, minimum tolerance.' },
      { name: 'Mature', range: '6 to 10 years', blurb: 'The executive years. Naps are meetings; meetings are naps.' },
      { name: 'Senior', range: '10 to 14 years', blurb: 'Gracefully unbothered. The staff remain on duty.' },
      { name: 'Super senior', range: '14 years and up', blurb: 'Legendary status. Every sunbeam in the house is reserved.' },
    ],
    sheIsHere: 'she is here',
    stagesFootnote:
      'The official route for life number one. The other eight are expected to reuse the itinerary.',
    convertLabel: 'Convert any cat',
    convertHint: 'Slide to their age in cat time',
    presetLabels: ['2 m', '6 m', '1 y', '5 y', '10 y', '15 y'],
    pichaNow: 'Picha, now',
    catTime: 'Cat time',
    humanTime: 'Human time',
    years: 'years',
    thatCatIsPre: 'That cat is ',
    thatCatIsPost: '.',
    converterFootnote:
      'The common veterinary rule of thumb: year one counts as 15, year two brings it to 24, and every year after adds about four. Kitten months are interpolated from the standard chart. For bragging rights, not for medical decisions.',
    unit: { month: 'month', months: 'months', year: 'year', years: 'years' },
  },
  ms: {
    metaTitle: 'Tahun kucing · Picha 🐾',
    metaDescription:
      'Berapa umur Picha dalam tahun manusia? Penukaran langsung, peringkat hidup kucing dan penukar untuk mana-mana kucing.',
    kicker: 'Alatan · Sedang bertugas',
    title: 'Penukar tahun kucing',
    blurb:
      'Masa kucing berlalu pantas pada mulanya, kemudian menetap kira-kira empat tahun manusia setiap hari lahir. Inilah kedudukan Tuan Puteri Gebu, berserta penukar untuk mana-mana kucing yang anda kenal.',
    officialConversion: '· Penukaran rasmi ·',
    humanYearsOld: 'tahun manusia',
    inCatTimePre: ' dalam masa kucing, menjadikan ',
    inCatTimePost: '.',
    stagesLabel: 'Jadual perjalanan sembilan nyawa',
    stages: [
      { name: 'Anak kucing', range: '0 hingga 6 bulan', blurb: 'Kekacauan dalam bentuk paling tulen. Semuanya mangsa buruan, termasuk kaki.' },
      { name: 'Remaja awal', range: '6 bulan hingga 2 tahun', blurb: 'Saiz penuh, pertimbangan budak remaja. Setiap peraturan rumah diuji dua kali.' },
      { name: 'Kemuncak', range: '2 hingga 6 tahun', blurb: 'Kucing terbaik: paling anggun, paling kurang bertolak ansur.' },
      { name: 'Matang', range: '6 hingga 10 tahun', blurb: 'Tahun-tahun eksekutif. Tidur ialah mesyuarat; mesyuarat ialah tidur.' },
      { name: 'Warga tua', range: '10 hingga 14 tahun', blurb: 'Tenang tanpa gusar. Kakitangan kekal bertugas.' },
      { name: 'Warga sangat tua', range: '14 tahun ke atas', blurb: 'Taraf legenda. Setiap pancaran matahari dalam rumah telah ditempah.' },
    ],
    sheIsHere: 'dia di sini',
    stagesFootnote:
      'Laluan rasmi untuk nyawa pertama. Lapan yang lain dijangka menggunakan semula jadual perjalanan ini.',
    convertLabel: 'Tukar mana-mana kucing',
    convertHint: 'Luncurkan ke usia mereka dalam masa kucing',
    presetLabels: ['2 bln', '6 bln', '1 thn', '5 thn', '10 thn', '15 thn'],
    pichaNow: 'Picha, sekarang',
    catTime: 'Masa kucing',
    humanTime: 'Masa manusia',
    years: 'tahun',
    thatCatIsPre: 'Kucing itu ',
    thatCatIsPost: '.',
    converterFootnote:
      'Petua umum veterinar: tahun pertama dikira sebagai 15, tahun kedua menjadikannya 24, dan setiap tahun selepas itu menambah kira-kira empat. Bulan anak kucing diinterpolasi daripada carta standard. Untuk berbangga, bukan untuk keputusan perubatan.',
    unit: { month: 'bulan', months: 'bulan', year: 'tahun', years: 'tahun' },
  },
};
export const getCatYearsCopy = (locale?: string): CatYearsCopy =>
  catYearsCopy[locale ?? 'en'] ?? catYearsCopy.en;
