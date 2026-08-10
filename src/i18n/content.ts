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
import type { BodySignal, TrainingCourse } from '../data/picha';
import { dateLabel } from '../lib/dates';

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

// ---------------------------------------------------------------------------
// Body-language reader ("Reading Picha"). Signal facts (id, num, tone, image
// key) stay in picha.ts; the prose (title, mood, detail) is translated here,
// keyed "<part>-<id>". English prose stays in picha.ts (the signals are passed
// through untouched for `en`).
//
// SAFETY NOTE: the `danger`-tone states and the eye health tells (unequal
// pupils, "call the vet") are behavioural/medical guidance — the Malay here is
// kept plain and unambiguous and is FLAGGED FOR OWNER VERIFICATION before it
// should be trusted as final.
// ---------------------------------------------------------------------------
type SignalText = { title: string; mood: string; detail: string };

const signalMs: Record<string, SignalText> = {
  // Ears
  'ear-forward': { title: 'Ke hadapan', mood: 'Ingin tahu & mesra', detail: 'Telinga tegak dan condong ke hadapan. Dia berminat dan fokus; masa yang baik untuk menegurnya.' },
  'ear-neutral': { title: 'Santai / biasa', mood: 'Tenang & puas hati', detail: 'Telinga tegak dan longgar, menghala longgar ke hadapan. Semuanya baik di dalam kerajaan: selesa, tenang dan senang hati.' },
  'ear-swiveling': { title: 'Berpusing', mood: 'Sedang mendengar', detail: 'Telinga berputar seperti piring satelit kecil untuk menjejak bunyi. Waspada dan meneliti keadaan, bukan marah.' },
  'ear-sideways': { title: 'Ke tepi (mod kapal terbang)', mood: 'Terlebih rangsangan', detail: 'Telinga terkeluar ke sisi seperti sayap kecil. Ragu-ragu, kesal atau sudah cukup; tanda halus untuk berundur sedikit.' },
  'ear-slightly-back': { title: 'Sedikit ke belakang', mood: 'Terganggu', detail: 'Telinga terjungkit sedikit ke belakang. Berhati-hati dan agak terganggu, sedang menimbang sama ada mahu bertindak balas. Beri dia seketika.' },
  'ear-flat': { title: 'Merapat ke kepala', mood: 'Beri dia ruang', detail: 'Telinga dirapatkan rata ke kepala untuk melindunginya. Takut atau agresif secara bertahan ketika benar-benar tertekan. Jangan hulur tangan; biar dia bertenang sendiri.' },
  'ear-one-ear-back': { title: 'Sebelah telinga ke belakang', mood: 'Buat banyak kerja serentak', detail: 'Satu telinga ke hadapan, satu lagi ke belakang, menjejak dua perkara serentak (selalunya sesuatu di belakangnya). Berjaga-jaga sedikit.' },
  'ear-high-tall': { title: 'Tinggi & tegak', mood: 'Berjaga-jaga sepenuhnya', detail: 'Telinga tegak setinggi mungkin, lurus ke atas. Sangat waspada dan bersedia, terkunci pada sesuatu yang dia anggap penting.' },
  'ear-low-wide': { title: 'Rendah & terkembang', mood: 'Cemas', detail: 'Telinga direndahkan dan terkembang luas. Bimbang dan berasa terancam, tetapi tidak mahu bergaduh. Tenangkan dia, jangan sesak.' },
  'ear-predatory': { title: 'Fokus memburu', mood: 'Sedang memburu', detail: 'Telinga ke hadapan dan terkunci, seluruh wajah tertumpu. Mod memburu penuh: tumpuan sengit, bersedia menerkam (pada mainan, sebaik-baiknya).' },
  'ear-sleepy': { title: 'Puas & mengantuk', mood: 'Terlena bahagia', detail: 'Telinga longgar dan sedikit berputar ketika dia terlelap. Sangat santai, selesa dan selamat. Kemuncak kepuasan.' },
  'ear-hissing': { title: 'Agresif / mendesis', mood: 'Berundur', detail: 'Mulut terbuka, telinga ke belakang, amaran dikeluarkan. Dia berasa terancam dan menyuruh anda menjauh. Hormati dan beri dia ruang.' },
  // Eyes
  'eye-neutral': { title: 'Santai / biasa', mood: 'Tenang & puas hati', detail: 'Mata terbuka dan tenang, anak mata bujur normal. Semuanya baik: selesa, puas hati dan senang. Masa yang baik untuk menegurnya.' },
  'eye-sleepy': { title: 'Lembut / mengantuk', mood: 'Mengantuk & selamat', detail: 'Kelopak rendah dan lembut, mata separuh tertutup ketika berehat. Sangat santai dan berasa selamat. Biar dia terlelap; ini kepercayaan sejati.' },
  'eye-dilated': { title: 'Membesar / teruja', mood: 'Teruja / terangsang', detail: 'Anak mata membesar bulat. Teruja, suka bermain atau terangsang, walaupun anak mata besar juga boleh bermakna takut, jadi baca telinga dan badannya sekali. Elok untuk bermain selagi suasananya ringan.' },
  'eye-alert': { title: 'Berminat / waspada', mood: 'Ingin tahu & fokus', detail: 'Mata terbuka, anak mata sederhana, pandangan tertumpu pada sesuatu. Ingin tahu dan fokus secara mental, menyerap segalanya.' },
  'eye-narrowed': { title: 'Menyempit / tajam', mood: 'Terkunci fokus', detail: 'Anak mata mengecil menjadi garis fokus, renungan mantap. Tekad dan yakin ketika dia menilai keadaan. Biar dia fikirkannya.' },
  'eye-very-narrow': { title: 'Sangat sempit / resah', mood: 'Terlebih rangsangan', detail: 'Anak mata mengecil menjadi celahan nipis. Kesal, terlebih rangsangan, atau hanya berada dalam cahaya terang. Jika suasananya tegang, kurangkan gangguan dan beri dia ruang bernafas.' },
  'eye-suspicious': { title: 'Curiga / berhati-hati', mood: 'Berwaspada & memerhati', detail: 'Mata separuh menyempit, memerhati dengan teliti. Tidak pasti dan sedang menyemak sama ada keadaan selamat. Bergerak perlahan dan biar dia buat keputusan.' },
  'eye-round': { title: 'Bulat / terkejut', mood: 'Tersentak', detail: 'Mata tiba-tiba terbeliak bulat. Sesuatu yang mengejut menangkapnya lengah dan dia kini berjaga-jaga. Beri dia seketika untuk melihat ia tiada apa-apa.' },
  'eye-unequal': { title: 'Anak mata tidak sama', mood: 'Periksa keadaannya', detail: 'Satu anak mata lebih besar daripada yang lain. Ia boleh jadi normal dalam cahaya malap atau berubah-ubah, tetapi jika ia berterusan, atau disertai mata terpicing, mengiris mata dengan kaki, atau dia kelihatan tidak sihat, hubungi doktor haiwan.' },
  'eye-slow-blink': { title: 'Kelip perlahan', mood: 'Saya percaya awak', detail: 'Kelipan perlahan dan malas yang ditahan seketika. Caranya berkata dia mempercayai anda dan berasa selamat. Balas kelipan perlahan; ia pujian tertinggi yang seekor kucing berikan.' },
  'eye-wide-eyed': { title: 'Terbeliak / ketakutan', mood: 'Takut', detail: 'Mata terbeliak luas, biasanya dengan anak mata besar, badan berkejang. Takut dan berasa terancam, mencari jalan keluar. Jangan sesak atau kepung dia; beri dia ruang dan laluan keluar yang jelas.' },
  'eye-closed': { title: 'Kelip / mata tertutup', mood: 'Sangat santai', detail: 'Mata tertutup, wajah lembut dan tenang. Sangat santai dan mempercayai, atau melupakan dunia untuk berehat. Biarkan dia.' },
  // Tail
  'tail-held-high': { title: 'Diangkat tinggi', mood: 'Yakin', detail: 'Ekor lurus ke atas seperti tiang bendera. Yakin, gembira dan berpuas hati dengan dunia. Masa yang baik untuk menegurnya.' },
  'tail-upright-curved': { title: 'Tegak dengan hujung melengkung', mood: 'Sapaan mesra', detail: 'Ekor ke atas dengan sedikit cangkuk di hujungnya, tanda soal mesra. Sapaannya yang paling mesra: dia gembira melihat anda.' },
  'tail-gentle-curve': { title: 'Lengkungan lembut', mood: 'Puas hati', detail: 'Ekor ke atas dalam lengkungan lembut dan tenang. Puas hati dan selesa, meredah hari dengan santai.' },
  'tail-horizontal': { title: 'Mendatar', mood: 'Ingin tahu', detail: 'Ekor terjulur lurus ke belakang. Waspada dan ingin tahu, menilai sesuatu sebelum bertindak.' },
  'tail-low-relaxed': { title: 'Rendah / santai', mood: 'Senang hati', detail: 'Ekor dibawa rendah dan longgar. Tenang dan neutral. Ekor rendah juga boleh bermakna berhati-hati, jadi baca bersama telinga dan badannya.' },
  'tail-tucked': { title: 'Diselitkan', mood: 'Tidak selamat', detail: 'Ekor melengkung ke bawah dan diselitkan rapat. Cemas, tidak pasti atau berasa kecil. Jangan sesak dia; bergerak perlahan dan biar dia bertenang.' },
  'tail-puffed-up': { title: 'Menggembung', mood: 'Terperanjat', detail: 'Ekor menggembung seperti berus botol. Takut dan cuba kelihatan lebih besar. Sesuatu memperanjatkannya; beri dia ruang sehingga dia tenang.' },
  'tail-puffed-curve': { title: 'Menggembung dengan lengkung', mood: 'Bertahan', detail: 'Ekor berus botol di atas belakang yang melengkung, gaya kucing Halloween. Sangat terangsang dan bertahan. Berundur dan biar saat itu berlalu.' },
  'tail-flicking': { title: 'Melibas', mood: 'Terganggu', detail: 'Ekor melibas ke kiri dan kanan. Kesal, terganggu atau sudah cukup. Tanda jelas untuk berundur sebelum dia benar-benar hilang sabar.' },
  'tail-tip-twitching': { title: 'Hujung bergerak', mood: 'Fokus', detail: 'Hanya hujung ekor melibas sementara selebihnya diam. Fokus dan menumpu, selalunya di tengah-tengah memburu. Bersungguh, bukan marah.' },
  'tail-wrapped': { title: 'Dililit', mood: 'Selesa', detail: 'Ekor dililit kemas mengelilingi dirinya. Santai dan selesa, menjaga kehangatan dan berdikari. Kemuncak kepuasan.' },
  'tail-thumping': { title: 'Menghentak', mood: 'Berundur', detail: 'Ekor menghentak lantai. Sangat kesal dan memberi amaran supaya anda berundur. Berhenti, dan beri dia ruang.' },
};

/** Return a signal with prose in the active locale (English passes through). */
export function localizeSignal(part: string, s: BodySignal, locale?: string): BodySignal {
  if (locale !== 'ms') return s;
  const o = signalMs[`${part}-${s.id}`];
  return o ? { ...s, ...o } : s;
}

export interface BodyLanguageCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  blurb: string;
  bodyPartLabel: string;
  segments: {
    id: string;
    label: string;
    noun: string; // for alt text ("Picha's <noun>: ...")
    notes: string[]; // aligned with the tone/icon list in body-language.astro
  }[];
}
export const bodyLanguageCopy: Record<string, BodyLanguageCopy> = {
  en: {
    metaTitle: 'Reading Picha · Picha 🐾',
    metaDescription:
      "A field guide to Picha's body language: what her signals mean and how to answer.",
    kicker: 'Cat to human',
    title: 'Reading Picha',
    blurb:
      'She says plenty without a sound. Here is how to read Her Fluffiness, and how to answer before she has to repeat herself.',
    bodyPartLabel: 'Body part',
    segments: [
      {
        id: 'ears',
        label: 'Ears',
        noun: 'ears',
        notes: [
          "One a photo can't hold: quick ear-flicking or twitching. Usually plain irritation (or a passing fly); if it comes with head-shaking or scratching, check her ears.",
          'When the signals say ease off or give space, the kind move is exactly that: no reaching, no scooping. Let her come back to you.',
        ],
      },
      {
        id: 'eyes',
        label: 'Eyes',
        noun: 'eyes',
        notes: [
          "Two things a still can't show: a hard, unblinking stare (a challenge, so look away and don't stare back) and the third eyelid sliding across the inner corner (often tiredness, sometimes illness).",
          'Eyes are also health tells. Unequal pupils that do not settle, a suddenly cloudy, red or weepy eye, constant squinting, or pawing at one eye are a vet call, not a mood.',
        ],
      },
      {
        id: 'tails',
        label: 'Tail',
        noun: 'tail',
        notes: [
          'A still cannot show the motion, and motion is half the message: a fast lash means far more than a slow sway. A low tail can read as calm or cautious, so always check it against her ears, eyes and posture.',
          'When her tail says back off (puffed, thumping, a hard flick), take it at its word: stop what you are doing, give her space, and let her reset.',
        ],
      },
    ],
  },
  ms: {
    metaTitle: 'Membaca Picha · Picha 🐾',
    metaDescription:
      'Panduan lapangan tentang bahasa badan Picha: apa maksud isyaratnya dan cara membalasnya.',
    kicker: 'Kucing kepada manusia',
    title: 'Membaca Picha',
    blurb:
      'Dia banyak berkata tanpa sepatah bunyi. Inilah cara membaca Tuan Puteri Gebu, dan cara membalas sebelum dia terpaksa mengulanginya.',
    bodyPartLabel: 'Bahagian badan',
    segments: [
      {
        id: 'ears',
        label: 'Telinga',
        noun: 'telinga',
        notes: [
          'Satu yang foto tidak dapat rakam: telinga melibas atau berkedut pantas. Biasanya sekadar terganggu (atau ada lalat lalu); jika ia disertai menggeleng kepala atau menggaru, periksa telinganya.',
          'Apabila isyaratnya berkata berundur atau beri ruang, tindakan yang baik adalah tepat itu: jangan hulur tangan, jangan angkat dia. Biar dia datang semula kepada anda.',
        ],
      },
      {
        id: 'eyes',
        label: 'Mata',
        noun: 'mata',
        notes: [
          'Dua perkara yang gambar pegun tidak dapat tunjukkan: renungan tajam tanpa kelip (satu cabaran, jadi alih pandangan dan jangan balas merenung) dan kelopak mata ketiga yang melintasi sudut dalam mata (selalunya keletihan, kadangkala penyakit).',
          'Mata juga petanda kesihatan. Anak mata yang tidak sama besar dan tidak pulih, mata yang tiba-tiba berkabus, merah atau berair, mata terpicing berterusan, atau mengiris sebelah mata dengan kaki adalah panggilan doktor haiwan, bukan sekadar perasaan.',
        ],
      },
      {
        id: 'tails',
        label: 'Ekor',
        noun: 'ekor',
        notes: [
          'Gambar pegun tidak dapat menunjukkan pergerakan, dan pergerakan ialah separuh daripada mesejnya: libasan pantas bermakna jauh lebih daripada ayunan perlahan. Ekor rendah boleh dibaca sebagai tenang atau berhati-hati, jadi sentiasa semaknya bersama telinga, mata dan postur badannya.',
          'Apabila ekornya berkata berundur (menggembung, menghentak, libasan keras), terimalah seadanya: berhenti apa yang anda lakukan, beri dia ruang, dan biar dia bertenang semula.',
        ],
      },
    ],
  },
};
export const getBodyLanguageCopy = (locale?: string): BodyLanguageCopy =>
  bodyLanguageCopy[locale ?? 'en'] ?? bodyLanguageCopy.en;

// ---------------------------------------------------------------------------
// Care page. Facts (checklist ids + icons, meal times/portions/auto flag,
// grooming icons, product names) stay in picha.ts; prose lives here. The
// `notes` block feeds the client-side checklist script (read via html lang).
// ---------------------------------------------------------------------------
export interface CareCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  blurb: string;
  roundsLabel: string;
  praise: string;
  checklist: Record<string, { label: string; hint: string }>;
  menuLabel: string;
  feeder: string; // chip: "{amount} · {feeder}"
  byHand: string; // chip for hand-served meals
  meals: { title: string; detail: string }[]; // aligned with feedingSchedule
  groomingLabel: string;
  grooming: { title: string; cadence: string; detail: string }[]; // aligned with grooming
  notes: {
    loading: string;
    offline: string;
    resetsNightly: string;
    sharedResets: string;
    staffOnlyPre: string;
    signIn: string;
    staffOnlyPost: string;
    pinRejected: string;
    savedLocal: string;
  };
}
const careEn: CareCopy = {
  metaTitle: 'Care · Picha 🐾',
  metaDescription: "Picha's daily care guide: her rounds and grooming.",
  kicker: 'Daily Care',
  title: 'A day with Picha',
  blurb:
    'Serving Picha is a full-time position: no weekends off, benefits paid in purrs. Work through today’s rounds top to bottom; she is keeping score.',
  roundsLabel: "Today's rounds",
  praise: 'All rounds complete. Management is pleased and will nap accordingly.',
  checklist: {
    water: { label: 'Top up the fountain', hint: 'Refill the reservoir; the fountain runs itself' },
    'meals-1': { label: 'Wet food service', hint: 'First course, around 10am; mix in any kibble she left' },
    'litter-1': { label: 'Scoop the litter', hint: 'Morning pass; she has standards' },
    combing: { label: 'The daily combing', hint: 'Both sides; she will rotate herself' },
    eyes: { label: 'Eye & face wipe', hint: 'Pet wipe around the eyes and chin' },
    'play-hunt': { label: 'Hunt session', hint: '10–15 min of wand-toy duty' },
    academy: { label: 'Academy session', hint: 'One short training rep; see the Royal Academy' },
    'litter-mid': { label: 'Scoop the litter', hint: 'Midday check, only if there is anything to clear' },
    treat: { label: 'A treat, if earned', hint: 'Around 4pm, only when earned; capped at 10% of her food' },
    'meals-2': { label: 'Wet food service', hint: 'Second course, around 9:30pm before lights-out' },
    'play-ball': { label: 'Ball session', hint: 'Toss the ball; let her chase and pounce' },
    'litter-2': { label: 'Scoop the litter', hint: 'Evening pass to keep it five-star' },
    cuddle: { label: 'Lap & cuddle time', hint: 'Mandatory affection audit; she decides when it ends' },
    lockup: { label: 'Nightly lock-up', hint: 'Windows and balcony shut, nothing risky left out' },
  },
  menuLabel: 'The menu',
  feeder: 'feeder',
  byHand: 'By hand',
  meals: [
    { title: 'Morning kibble', detail: 'The feeder drops her first course on schedule; she nibbles at it when the mood strikes.' },
    { title: 'Wet food, first course', detail: 'Her five-star course, served by hand. Any kibble she left from the morning gets mixed in.' },
    { title: 'Midday kibble', detail: 'The second automatic drop, keeping the day evenly fed.' },
    { title: 'Snack or treat', detail: 'The afternoon negotiation, kept within the 10% treat cap no matter how convincing the eyes get.' },
    { title: 'Evening kibble', detail: 'The last automatic drop of the day.' },
    { title: 'Wet food, second course', detail: 'The nightcap, served before lights-out. Nothing after, she sleeps it off.' },
  ],
  groomingLabel: 'Grooming',
  grooming: [
    { title: 'The daily combing', cadence: 'Daily', detail: 'The tool of record is a stainless steel comb, worked through both sides while she rotates herself like a rotisserie. The long coat depends on it: it prevents mats and sustains the glamour.' },
    { title: 'Face touch-ups', cadence: 'As needed', detail: 'Pet wipes for the eyes and face, kept within reach for whenever the look needs refreshing.' },
    { title: 'Spot cleaning', cadence: 'As needed', detail: 'YEGBONG Pet Dry Cleaning Mousse (waterless), worked into the fur and brushed through, mainly under the chin and any spots that dared get dirty.' },
    { title: 'Bathing', cadence: 'Rarely', detail: 'Rarely required; the daily combing does the heavy lifting. An occasional bath or a professional spa day, by appointment.' },
    { title: 'Nails', cadence: 'Every 2–4 weeks', detail: 'A manicure every 2–4 weeks with cat clippers: front paws first, back paws as she permits. Best conducted while she is drowsy and least inclined to file a complaint.' },
    { title: 'Teeth', cadence: 'Daily', detail: 'A daily brush with Histo Tree cat-safe dental gel (beef flavour), worked along the gumline a few seconds a side. Tolerated, barely, in exchange for the treat that follows.' },
  ],
  notes: {
    loading: 'Loading today’s rounds…',
    offline: 'Offline: showing this device’s saved rounds.',
    resetsNightly: 'Ticks reset each night at midnight.',
    sharedResets: "Shared across the staff's devices; resets each night at midnight.",
    staffOnlyPre: 'The rounds are staff-only. ',
    signIn: 'Sign in as staff',
    staffOnlyPost: ' to check them off.',
    pinRejected: 'That PIN was rejected. Open the Staff room to re-enter.',
    savedLocal: 'Saved on this device; the cloud did not answer.',
  },
};
const careMs: CareCopy = {
  metaTitle: 'Penjagaan · Picha 🐾',
  metaDescription: 'Panduan penjagaan harian Picha: pusingan tugas dan dandanannya.',
  kicker: 'Penjagaan Harian',
  title: 'Sehari bersama Picha',
  blurb:
    'Melayan Picha ialah jawatan sepenuh masa: tiada cuti hujung minggu, faedah dibayar dengan dengkuran. Selesaikan pusingan hari ini dari atas ke bawah; dia sedang mengira markah.',
  roundsLabel: 'Pusingan hari ini',
  praise: 'Semua pusingan selesai. Pihak pengurusan berpuas hati dan akan tidur sewajarnya.',
  checklist: {
    water: { label: 'Isi semula pancutan air', hint: 'Isi semula takungan; pancutan berjalan sendiri' },
    'meals-1': { label: 'Hidang makanan basah', hint: 'Hidangan pertama, sekitar 10 pagi; gaul sekali kibble yang ditinggalkannya' },
    'litter-1': { label: 'Cedok pasir kucing', hint: 'Pusingan pagi; dia ada standard' },
    combing: { label: 'Sikatan harian', hint: 'Kedua-dua belah; dia akan pusing sendiri' },
    eyes: { label: 'Lap mata & muka', hint: 'Tisu haiwan di sekeliling mata dan dagu' },
    'play-hunt': { label: 'Sesi memburu', hint: '10–15 minit bertugas dengan tongkat mainan' },
    academy: { label: 'Sesi akademi', hint: 'Satu ulangan latihan ringkas; lihat Akademi Diraja' },
    'litter-mid': { label: 'Cedok pasir kucing', hint: 'Semakan tengah hari, hanya jika ada apa-apa untuk dibersihkan' },
    treat: { label: 'Snek, jika berhak', hint: 'Sekitar 4 petang, hanya apabila berhak; dihadkan pada 10% daripada makanannya' },
    'meals-2': { label: 'Hidang makanan basah', hint: 'Hidangan kedua, sekitar 9:30 malam sebelum tidur' },
    'play-ball': { label: 'Sesi bola', hint: 'Baling bola; biar dia mengejar dan menerkam' },
    'litter-2': { label: 'Cedok pasir kucing', hint: 'Pusingan petang untuk kekalkan taraf lima bintang' },
    cuddle: { label: 'Masa riba & manja', hint: 'Audit kasih sayang wajib; dia yang tentukan bila ia tamat' },
    lockup: { label: 'Kunci malam', hint: 'Tingkap dan balkoni ditutup, tiada benda berisiko dibiarkan terdedah' },
  },
  menuLabel: 'Menu',
  feeder: 'pengumpan',
  byHand: 'Dengan tangan',
  meals: [
    { title: 'Kibble pagi', detail: 'Pengumpan menjatuhkan hidangan pertamanya mengikut jadual; dia menggigitnya bila terasa hati.' },
    { title: 'Makanan basah, hidangan pertama', detail: 'Hidangan lima bintangnya, dihidang dengan tangan. Kibble yang ditinggalkannya dari pagi digaul sekali.' },
    { title: 'Kibble tengah hari', detail: 'Jatuhan automatik kedua, memastikan pemakanan sekata sepanjang hari.' },
    { title: 'Snek atau ganjaran', detail: 'Rundingan petang, dikekalkan dalam had snek 10% tidak kira sehebat mana renungan matanya.' },
    { title: 'Kibble petang', detail: 'Jatuhan automatik terakhir hari itu.' },
    { title: 'Makanan basah, hidangan kedua', detail: 'Hidangan penutup, dihidang sebelum tidur. Tiada apa-apa selepas itu, dia tidur lena.' },
  ],
  groomingLabel: 'Dandanan',
  grooming: [
    { title: 'Sikatan harian', cadence: 'Harian', detail: 'Alat rasminya ialah sikat keluli tahan karat, disikat di kedua-dua belah sambil dia berpusing seperti panggangan. Bulu panjangnya bergantung padanya: ia mencegah kekusutan dan mengekalkan kegemilangan.' },
    { title: 'Solekan muka', cadence: 'Bila perlu', detail: 'Tisu haiwan untuk mata dan muka, disimpan berdekatan untuk bila-bila penampilan perlu disegarkan.' },
    { title: 'Pembersihan setempat', cadence: 'Bila perlu', detail: 'YEGBONG Pet Dry Cleaning Mousse (tanpa air), disapu ke bulu dan disikat, terutamanya di bawah dagu dan mana-mana tompok yang berani menjadi kotor.' },
    { title: 'Mandi', cadence: 'Jarang', detail: 'Jarang diperlukan; sikatan harian memikul tugas berat. Sesekali mandi atau hari spa profesional, dengan temu janji.' },
    { title: 'Kuku', cadence: 'Setiap 2–4 minggu', detail: 'Manikur setiap 2–4 minggu dengan pemotong kuku kucing: kaki depan dahulu, kaki belakang jika dia izinkan. Paling baik dilakukan ketika dia mengantuk dan kurang berminat untuk membuat aduan.' },
    { title: 'Gigi', cadence: 'Harian', detail: 'Berus harian dengan gel gigi selamat kucing Histo Tree (perisa daging), disapu di sepanjang garisan gusi beberapa saat sebelah. Diterima, nyaris-nyaris, sebagai pertukaran untuk ganjaran yang menyusul.' },
  ],
  notes: {
    loading: 'Memuatkan pusingan hari ini…',
    offline: 'Luar talian: menunjukkan pusingan tersimpan peranti ini.',
    resetsNightly: 'Tanda ditetap semula setiap malam pada tengah malam.',
    sharedResets: 'Dikongsi merentas peranti kakitangan; ditetap semula setiap malam pada tengah malam.',
    staffOnlyPre: 'Pusingan ini untuk kakitangan sahaja. ',
    signIn: 'Log masuk sebagai kakitangan',
    staffOnlyPost: ' untuk menandakannya.',
    pinRejected: 'PIN itu ditolak. Buka Bilik Kakitangan untuk masukkan semula.',
    savedLocal: 'Disimpan pada peranti ini; awan tidak menjawab.',
  },
};
export const careCopy: Record<string, CareCopy> = { en: careEn, ms: careMs };
export const getCareCopy = (locale?: string): CareCopy => careCopy[locale ?? 'en'] ?? careEn;

// ---------------------------------------------------------------------------
// Health page. The heaviest medical/safety surface. Facts (dates, doses,
// product names, phone numbers, kg targets, intervals) stay in picha.ts;
// prose is translated here.
//
// ⚠️ OWNER VERIFICATION REQUIRED: the Malay for `callVetIf` (red-flag
// symptoms), the parasite/deworming/vaccine timeline + recurring details, and
// the clinical-status lines is medical/safety copy. It has been translated
// carefully and kept plain, but MUST be confirmed by the owners before it is
// treated as final ("jokes end where the vet begins", in every language).
// ---------------------------------------------------------------------------
export interface HealthCopy {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  blurb: string;
  nextDue: string;
  weight: string;
  targetPrefix: string; // "target" → "target ~3–4.5 kg"
  age: string;
  ageSub: string;
  doctorsOrders: string;
  dueSoon: string;
  dueApprox: string; // "due ~" before a date
  overdue: string; // also used as the [data-overdue] value
  segments: { upcoming: string; done: string; tobook: string };
  timelineFilter: string;
  nextUp: string;
  notStarted: string;
  callVetIfTitle: string;
  recentClinic: string;
  directions: string;
  recentCarePre: string; // "Recent care: " (clinic name is a fact)
  vetStatus: string;
  callVetIf: string[]; // aligned with picha.ts callVetIf
  clinicalStatus: Record<string, { label: string; value: string; sub: string }>; // keyed by EN label
}
export const healthCopy: Record<string, HealthCopy> = {
  en: {
    metaTitle: 'Health · Picha 🐾',
    metaDescription:
      "Picha's health record: vitals, vaccinations, vet visits and what is coming up.",
    kicker: 'Vet & Health',
    title: 'The royal health record',
    blurb:
      'From birthday to boosters: every jab, weigh-in and vet visit, filed with obsessive care by the staff. Management reviews the paperwork; management does not do the paperwork.',
    nextDue: 'Next due',
    weight: 'Weight',
    targetPrefix: 'target',
    age: 'Age',
    ageSub: 'adult at ~1.5–2 years',
    doctorsOrders: "Doctor's orders",
    dueSoon: 'Due soon',
    dueApprox: 'due ~',
    overdue: 'overdue',
    segments: { upcoming: 'Coming up', done: 'The record', tobook: 'On the list' },
    timelineFilter: 'Timeline filter',
    nextUp: 'Next up',
    notStarted: 'not started yet',
    callVetIfTitle: 'Call the vet if…',
    recentClinic: 'Recent clinic',
    directions: 'Directions to the clinic',
    recentCarePre: 'Recent care: ',
    vetStatus: 'Auditioning vets; no permanent hire yet',
    callVetIf: [
      'Not eating for ~24h, or repeated vomiting.',
      'Straining in the litter box, or no urination in a day.',
      'Persistent hiding + hunched posture + off food (vs. her normal come-and-go).',
      'Laboured breathing or sudden lethargy.',
    ],
    clinicalStatus: {
      Spayed: { label: 'Spayed', value: 'Yes', sub: '11 Jul 2026' },
      Microchip: { label: 'Microchip', value: 'Yes', sub: '11 Jul 2026' },
      'Core vaccines': { label: 'Core vaccines', value: 'FVRCP', sub: 'series complete' },
    },
  },
  ms: {
    metaTitle: 'Kesihatan · Picha 🐾',
    metaDescription:
      'Rekod kesihatan Picha: tanda vital, vaksinasi, lawatan doktor haiwan dan apa yang mendatang.',
    kicker: 'Doktor & Kesihatan',
    title: 'Rekod kesihatan diraja',
    blurb:
      'Dari hari lahir hingga suntikan penggalak: setiap suntikan, timbangan dan lawatan doktor haiwan, difailkan dengan teliti oleh kakitangan. Pihak pengurusan menyemak dokumen; pihak pengurusan tidak membuat dokumen.',
    nextDue: 'Seterusnya',
    weight: 'Berat',
    targetPrefix: 'sasaran',
    age: 'Umur',
    ageSub: 'dewasa pada ~1.5–2 tahun',
    doctorsOrders: 'Arahan doktor',
    dueSoon: 'Hampir tiba tempoh',
    dueApprox: 'dijangka ~',
    overdue: 'lewat tempoh',
    segments: { upcoming: 'Akan datang', done: 'Rekod', tobook: 'Dalam senarai' },
    timelineFilter: 'Penapis garis masa',
    nextUp: 'Seterusnya',
    notStarted: 'belum bermula',
    callVetIfTitle: 'Hubungi doktor haiwan jika…',
    recentClinic: 'Klinik terkini',
    directions: 'Arah ke klinik',
    recentCarePre: 'Penjagaan terkini: ',
    vetStatus: 'Sedang menemuduga doktor haiwan; belum ada lantikan tetap',
    callVetIf: [
      'Tidak makan selama ~24 jam, atau muntah berulang kali.',
      'Meneran di dalam bekas pasir, atau tidak kencing dalam sehari.',
      'Terus-menerus bersembunyi + badan meringkuk + hilang selera (berbanding kebiasaannya yang keluar-masuk).',
      'Sukar bernafas atau tiba-tiba lesu.',
    ],
    clinicalStatus: {
      Spayed: { label: 'Dikembiri', value: 'Ya', sub: '11 Jul 2026' },
      Microchip: { label: 'Mikrocip', value: 'Ya', sub: '11 Jul 2026' },
      'Core vaccines': { label: 'Vaksin teras', value: 'FVRCP', sub: 'siri lengkap' },
    },
  },
};
export const getHealthCopy = (locale?: string): HealthCopy =>
  healthCopy[locale ?? 'en'] ?? healthCopy.en;

// Malay prose for timeline + recurring items, keyed by the English `detail`
// (unique across both lists). everyLabel/where use small finite maps.
const healthTextMs: Record<string, { title: string; detail: string }> = {
  'One tiny white cloud arrives, opens her amber eyes, and starts planning her staff structure.':
    { title: 'Sebuah bintang dilahirkan', detail: 'Seketul awan putih kecil tiba, membuka mata ambernya, dan mula merancang struktur kakitangannya.' },
  'Felocell 4, first dose. Taken like a champ (allegedly).':
    { title: 'Vaksin FVRCP, dos 1', detail: 'Felocell 4, dos pertama. Diterima seperti juara (kononnya).' },
  'Felocell 4, second dose. Series complete.':
    { title: 'Vaksin FVRCP, dos 2', detail: 'Felocell 4, dos kedua. Siri lengkap.' },
  'Interviewed Farah & Farzin at the pet shop and hired both on the spot. No probation period; she does not do trial runs.':
    { title: 'Pengambilan kakitangan agung', detail: 'Menemuduga Farah & Farzin di kedai haiwan dan mengambil kedua-duanya serta-merta. Tiada tempoh percubaan; dia tidak buat uji lari.' },
  'Revolution Plus applied. Fleas, ticks and worms: evicted.':
    { title: 'Kawalan parasit', detail: 'Revolution Plus disapu. Kutu, sengkenit dan cacing: dihalau keluar.' },
  'Interior pest control, completed.':
    { title: 'Nyahcacing', detail: 'Kawalan perosak dalaman, selesai.' },
  'Both done in one visit. She billed the recovery time as spa leave.':
    { title: 'Kembiri + mikrocip', detail: 'Kedua-duanya selesai dalam satu lawatan. Dia mengira masa pemulihan sebagai cuti spa.' },
  'The daily ORI-EAR + Oridermyl routine begins. Tolerated with visible disapproval.':
    { title: 'Kursus rawatan telinga bermula', detail: 'Rutin harian ORI-EAR + Oridermyl bermula. Diterima dengan rasa tidak setuju yang ketara.' },
  'Full ORI-EAR + Oridermyl course done; ears cleared. Daily disapproval may now cease.':
    { title: 'Kursus rawatan telinga selesai', detail: 'Kursus penuh ORI-EAR + Oridermyl selesai; telinga pulih. Rasa tidak setuju harian kini boleh dihentikan.' },
  'NexGard Combo spot-on applied at the base of the skull, her new monthly flea and tick guard. Revolution Plus retired.':
    { title: 'Kawalan parasit', detail: 'NexGard Combo spot-on disapu di pangkal tengkorak, pelindung kutu dan sengkenit bulanannya yang baharu. Revolution Plus dihentikan.' },
  'Required before any travel plans Her Fluffiness may approve.':
    { title: 'Vaksin rabies', detail: 'Diperlukan sebelum sebarang rancangan perjalanan yang Tuan Puteri Gebu luluskan.' },
  'Optional. To discuss with whichever vet wins the job.':
    { title: 'Vaksin FeLV', detail: 'Pilihan. Untuk dibincangkan dengan doktor haiwan yang memenangi jawatan.' },
  'The official pet passport, still to be sorted for any future travel.':
    { title: 'Pasport haiwan', detail: 'Pasport haiwan rasmi, masih perlu diuruskan untuk sebarang perjalanan masa depan.' },
  // recurringCare
  'NexGard Combo spot-on, parted onto the skin at the base of the skull (the back of the head), where she cannot lick it off. Fleas, ticks and ear mites, evicted. Monthly with a few days of grace, but never sooner than a month apart; a bit late is fine, too early risks a double dose.':
    { title: 'Kawalan parasit', detail: 'NexGard Combo spot-on, dibelah ke kulit di pangkal tengkorak (belakang kepala), di tempat dia tidak boleh menjilatnya. Kutu, sengkenit dan hama telinga, dihalau keluar. Setiap bulan dengan beberapa hari kelonggaran, tetapi jangan sekali-kali kurang daripada sebulan; lewat sedikit tidak mengapa, terlalu awal berisiko dos berganda.' },
  'A separate dewormer on the standard adult schedule (the spot-on does not replace it): a pill, smuggled in inside something delicious and served without ceremony.':
    { title: 'Nyahcacing', detail: 'Ubat cacing berasingan mengikut jadual dewasa standard (spot-on tidak menggantikannya): sebiji pil, diselitkan di dalam sesuatu yang lazat dan dihidang tanpa upacara.' },
  'The full salon treatment: bath, blow-dry and a top-to-tail tidy-up, so the resident cloud stays soft and photogenic.':
    { title: 'Dandanan & hari spa', detail: 'Rawatan salun penuh: mandi, keringkan dan kemas dari kepala ke ekor, supaya awan penghuni kekal lembut dan cantik bergambar.' },
  'A full scrub and a complete change of litter; the royal facilities restored to five stars.':
    { title: 'Cucian mendalam bekas pasir', detail: 'Berus penuh dan tukar pasir sepenuhnya; kemudahan diraja dipulihkan ke taraf lima bintang.' },
  'The once-a-year, nose-to-tail service: full exam, weight check and an audience with the royal teeth.':
    { title: 'Pemeriksaan tahunan penuh', detail: 'Servis sekali setahun, dari hidung ke ekor: pemeriksaan penuh, semakan berat dan pertemuan dengan gigi diraja.' },
  'Felocell 4, the yearly top-up that keeps the core feline viruses on their side of the palace gates.':
    { title: 'Penggalak FVRCP', detail: 'Felocell 4, suntikan tahunan yang mengekalkan virus teras kucing di sebelah pintu istana mereka.' },
  'Front paws first, back paws only with royal consent. Management files a formal complaint every time, then submits to the clippers.':
    { title: 'Potong kuku', detail: 'Kaki depan dahulu, kaki belakang hanya dengan keizinan diraja. Pihak pengurusan memfailkan aduan rasmi setiap kali, kemudian menyerah kepada pemotong kuku.' },
};
const everyLabelMs: Record<string, string> = {
  'Every month': 'Setiap bulan',
  'Every 3 months': 'Setiap 3 bulan',
  'Every 2 months': 'Setiap 2 bulan',
  'Every year': 'Setiap tahun',
  'Every 2–4 weeks': 'Setiap 2–4 minggu',
};
const whereMs: Record<string, string> = {
  'at home': 'di rumah',
  'at the vet': 'di klinik',
  'at the salon': 'di salun',
};

/** Localize a timeline / upcoming item's prose (English passes through). */
export function localizeHealthItem<
  T extends { title: string; detail: string; everyLabel?: string; where?: string },
>(item: T, locale?: string): T {
  if (locale !== 'ms') return item;
  const o = healthTextMs[item.detail];
  return {
    ...item,
    ...(o ? { title: o.title, detail: o.detail } : {}),
    ...(item.everyLabel ? { everyLabel: everyLabelMs[item.everyLabel] ?? item.everyLabel } : {}),
    ...(item.where ? { where: whereMs[item.where] ?? item.where } : {}),
  };
}

// ---------------------------------------------------------------------------
// Weight tracker. Facts (kg values, dates, targets) stay in picha.ts /
// weights.ts; prose here. Small fragments compose the templated stat subs +
// ledger rows in both build and client (see the helpers below). The chart
// string labels live in lib/weight-viz (kept dependency-free).
// ---------------------------------------------------------------------------
export interface WeightCopy {
  metaTitle: string;
  metaDescription: string;
  appTitle: string;
  kicker: string;
  title: string;
  blurb: string; // note appended by the page
  note: string; // "Still growing until ~1.5–2 years old."
  statCurrent: string;
  statHeaviest: string;
  statLightest: string;
  statAverage: string;
  weighedPre: string; // "weighed {date}"
  peakFloofPre: string; // "peak floof, {date}"
  featherweightPre: string; // "featherweight, {date}"
  acrossPre: string; // "across {n} audit(s)"
  auditWord: string;
  auditWordPlural: string;
  trend: string;
  bandFootnotePre: string; // "The amber band is the healthy adult range ("
  bandFootnotePost: string; // ")."
  bandNote: { under: string; in: string; over: string };
  ledgerLabel: string;
  auditNoPre: string; // "audit no. {NN}"
  latest: string; // " · latest"
  logWeighIn: string;
  staffOnly: string;
  form: {
    date: string;
    weightKg: string;
    record: string;
    sameDateNote: string;
    filing: string;
    recorded: string;
    signExpired: string;
    couldNotRecord: string;
  };
}
export const weightCopy: Record<string, WeightCopy> = {
  en: {
    metaTitle: 'Weight · Picha 🐾',
    metaDescription:
      "Picha's weight tracker: every weigh-in charted, with stats and the full ledger.",
    appTitle: 'Weight',
    kicker: 'Tools · In service',
    title: 'The royal waistline',
    blurb:
      'Every audit on the books, charted. Measured meals keep the trend honest; this page keeps the staff honest.',
    note: 'Still growing until ~1.5–2 years old.',
    statCurrent: 'Current',
    statHeaviest: 'Heaviest',
    statLightest: 'Lightest',
    statAverage: 'Average',
    weighedPre: 'weighed',
    peakFloofPre: 'peak floof,',
    featherweightPre: 'featherweight,',
    acrossPre: 'across',
    auditWord: 'audit',
    auditWordPlural: 'audits',
    trend: 'The trend',
    bandFootnotePre: 'The amber band is the healthy adult range (',
    bandFootnotePost: ').',
    bandNote: {
      under: 'Sitting under it, for now, is entirely by design.',
      in: 'She has arrived. The waistline committee is satisfied.',
      over: 'She is above it; the portion policy is under formal review.',
    },
    ledgerLabel: 'The ledger',
    auditNoPre: 'audit no.',
    latest: 'latest',
    logWeighIn: 'Log a weigh-in',
    staffOnly: 'staff only',
    form: {
      date: 'Date',
      weightKg: 'Weight (kg)',
      record: 'Record audit',
      sameDateNote: 'Same-date entries update the existing row.',
      filing: 'Filing the paperwork…',
      recorded: 'Recorded. Management has been weighed.',
      signExpired: 'Sign-in expired. Re-enter the PIN in the Staff room.',
      couldNotRecord: 'Could not record it. Check the connection and try again.',
    },
  },
  ms: {
    metaTitle: 'Berat · Picha 🐾',
    metaDescription:
      'Penjejak berat Picha: setiap timbangan dicarta, dengan statistik dan lejar penuh.',
    appTitle: 'Berat',
    kicker: 'Alatan · Sedang bertugas',
    title: 'Ukur lilit pinggang diraja',
    blurb:
      'Setiap audit direkod, dicarta. Hidangan bersukat memastikan trend jujur; halaman ini memastikan kakitangan jujur.',
    note: 'Masih membesar sehingga ~1.5–2 tahun.',
    statCurrent: 'Semasa',
    statHeaviest: 'Terberat',
    statLightest: 'Teringan',
    statAverage: 'Purata',
    weighedPre: 'ditimbang',
    peakFloofPre: 'gebu puncak,',
    featherweightPre: 'ringan bulu,',
    acrossPre: 'merentas',
    auditWord: 'audit',
    auditWordPlural: 'audit',
    trend: 'Trend',
    bandFootnotePre: 'Jalur amber ialah julat dewasa sihat (',
    bandFootnotePost: ').',
    bandNote: {
      under: 'Berada di bawahnya, buat masa ini, memang dirancang.',
      in: 'Dia telah sampai. Jawatankuasa ukur lilit pinggang berpuas hati.',
      over: 'Dia di atasnya; polisi bahagian makanan sedang disemak rasmi.',
    },
    ledgerLabel: 'Lejar',
    auditNoPre: 'audit no.',
    latest: 'terkini',
    logWeighIn: 'Catat timbangan',
    staffOnly: 'kakitangan sahaja',
    form: {
      date: 'Tarikh',
      weightKg: 'Berat (kg)',
      record: 'Rekod audit',
      sameDateNote: 'Catatan tarikh sama mengemas kini baris sedia ada.',
      filing: 'Memfailkan dokumen…',
      recorded: 'Direkod. Pihak pengurusan telah ditimbang.',
      signExpired: 'Log masuk tamat tempoh. Masukkan semula PIN di Bilik Kakitangan.',
      couldNotRecord: 'Tidak dapat merekodnya. Semak sambungan dan cuba lagi.',
    },
  },
};
export const getWeightCopy = (locale?: string): WeightCopy => weightCopy[locale ?? 'en'] ?? weightCopy.en;

// ---------------------------------------------------------------------------
// Royal Academy (training hub + course pages). Facts (slug, icon, resistance,
// step counts, dates) stay in picha.ts/training.ts; prose here. Course content
// (title/tagline/why/steps) is translated per slug and applied by
// localizeCourse(). The compose helpers build the templated status strings for
// both build and client.
// ---------------------------------------------------------------------------
export interface TrainingCopy {
  metaTitle: string;
  metaDescription: string;
  appTitle: string;
  kicker: string;
  title: string;
  blurb: string;
  staffProgress: string;
  stepsWord: string; // "{done}/{total} steps"
  groups: { active: string; syllabus: string; graduated: string };
  inSessionWord: string; // caption "{a} in session"
  graduatedWord: string;
  onSyllabusWord: string;
  stepWord: string; // "step {x} of {y}"
  ofWord: string;
  allWord: string; // "all {n} steps passed"
  passedWord: string;
  notStarted: string; // "{n} steps · not started"
  registrarNoteHub: string;
  // course page
  allCourses: string;
  statusGraduated: string;
  statusActive: string;
  statusSyllabus: string;
  inSessionSincePre: string; // "In session since {date}"
  gradBanner: string;
  resistanceWord: string;
  upNext: string;
  curriculum: string;
  registrarControls: string;
  begin: string;
  markStepPre: string; // "Mark step {x} passed"
  markStepPost: string;
  graduatedBtn: string;
  undo: string;
  registrarNoteCourse: string;
  practiceMark: string;
  practiceDone: string;
  filing: string;
  gradRecorded: string;
  recorded: string;
  signExpired: string;
  couldNotRecord: string;
  rulesLabel: string;
  rules: string[];
}
export const trainingCopy: Record<string, TrainingCopy> = {
  en: {
    metaTitle: 'Training · Picha 🐾',
    metaDescription:
      "The Royal Academy: Picha's training courses with step-by-step curricula and live progress.",
    appTitle: 'Academy',
    kicker: 'Tools · In service',
    title: 'The Royal Academy',
    blurb:
      'Courses in advanced cat cooperation. Officially it is the staff being trained and certified; Her Fluffiness merely grades the coursework.',
    staffProgress: 'Staff progress',
    stepsWord: 'steps',
    groups: { active: 'In session', syllabus: 'The syllabus', graduated: 'Graduated' },
    inSessionWord: 'in session',
    graduatedWord: 'graduated',
    onSyllabusWord: 'on the syllabus',
    stepWord: 'step',
    ofWord: 'of',
    allWord: 'all',
    passedWord: 'steps passed',
    notStarted: 'not started',
    registrarNoteHub:
      'Milestones are recorded on each course page by PIN-carrying staff and land straight in her cloud file.',
    allCourses: 'All courses',
    statusGraduated: 'Graduated',
    statusActive: 'In session',
    statusSyllabus: 'On the syllabus',
    inSessionSincePre: 'In session since',
    gradBanner: 'Graduated with honours. The staff are officially certified.',
    resistanceWord: 'resistance',
    upNext: 'up next',
    curriculum: 'The curriculum',
    registrarControls: 'Registrar controls',
    begin: 'Begin the course',
    markStepPre: 'Mark step',
    markStepPost: 'passed',
    graduatedBtn: 'Graduated',
    undo: 'undo',
    registrarNoteCourse:
      'Milestones are recorded to her cloud file. A step counts as passed when she stays relaxed through it on several separate days.',
    practiceMark: "Mark today's session done",
    practiceDone: 'Session logged for today',
    filing: 'Filing the paperwork…',
    gradRecorded: 'Graduated. The academy is very proud.',
    recorded: 'Recorded in her file.',
    signExpired: 'Sign-in expired. Re-enter the PIN in the Staff room.',
    couldNotRecord: 'Could not record it. Check the connection and try again.',
    rulesLabel: 'Session rules',
    rules: [
      'Short sessions: 2–5 minutes, once or twice a day.',
      'Always end on a success, even a tiny one.',
      'Treats are the salary; keep them within the daily 10% budget.',
      'Never force it. If she leaves, class is dismissed.',
      'One step at a time; repeat a step for days before moving on.',
    ],
  },
  ms: {
    metaTitle: 'Latihan · Picha 🐾',
    metaDescription:
      'Akademi Diraja: kursus latihan Picha dengan kurikulum langkah demi langkah dan kemajuan langsung.',
    appTitle: 'Akademi',
    kicker: 'Alatan · Sedang bertugas',
    title: 'Akademi Diraja',
    blurb:
      'Kursus dalam kerjasama kucing lanjutan. Secara rasmi, kakitangan yang dilatih dan diperakui; Tuan Puteri Gebu sekadar menggredkan tugasan.',
    staffProgress: 'Kemajuan kakitangan',
    stepsWord: 'langkah',
    groups: { active: 'Dalam sesi', syllabus: 'Silibus', graduated: 'Bergraduat' },
    inSessionWord: 'dalam sesi',
    graduatedWord: 'bergraduat',
    onSyllabusWord: 'dalam silibus',
    stepWord: 'langkah',
    ofWord: 'daripada',
    allWord: 'semua',
    passedWord: 'langkah lulus',
    notStarted: 'belum bermula',
    registrarNoteHub:
      'Pencapaian direkodkan di setiap halaman kursus oleh kakitangan berPIN dan terus masuk ke fail awannya.',
    allCourses: 'Semua kursus',
    statusGraduated: 'Bergraduat',
    statusActive: 'Dalam sesi',
    statusSyllabus: 'Dalam silibus',
    inSessionSincePre: 'Dalam sesi sejak',
    gradBanner: 'Bergraduat dengan kepujian. Kakitangan kini diperakui secara rasmi.',
    resistanceWord: 'rintangan',
    upNext: 'seterusnya',
    curriculum: 'Kurikulum',
    registrarControls: 'Kawalan pendaftar',
    begin: 'Mulakan kursus',
    markStepPre: 'Tandakan langkah',
    markStepPost: 'lulus',
    graduatedBtn: 'Bergraduat',
    undo: 'buat asal',
    registrarNoteCourse:
      'Pencapaian direkodkan ke fail awannya. Satu langkah dikira lulus apabila dia kekal tenang melaluinya pada beberapa hari berasingan.',
    practiceMark: 'Tandakan sesi hari ini selesai',
    practiceDone: 'Sesi direkod untuk hari ini',
    filing: 'Memfailkan dokumen…',
    gradRecorded: 'Bergraduat. Akademi sangat berbangga.',
    recorded: 'Direkod dalam failnya.',
    signExpired: 'Log masuk tamat tempoh. Masukkan semula PIN di Bilik Kakitangan.',
    couldNotRecord: 'Tidak dapat merekodnya. Semak sambungan dan cuba lagi.',
    rulesLabel: 'Peraturan sesi',
    rules: [
      'Sesi pendek: 2–5 minit, sekali atau dua kali sehari.',
      'Sentiasa akhiri dengan kejayaan, walau sekecil mana pun.',
      'Ganjaran ialah gajinya; kekalkan dalam bajet harian 10%.',
      'Jangan sekali-kali paksa. Jika dia beredar, kelas tamat.',
      'Satu langkah pada satu masa; ulang satu langkah beberapa hari sebelum meneruskan.',
    ],
  },
};
export const getTrainingCopy = (locale?: string): TrainingCopy =>
  trainingCopy[locale ?? 'en'] ?? trainingCopy.en;

// Composed status strings (shared by build + client). ---------------------
export function stepOfLabel(done: number, total: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${c.stepWord} ${done + 1} ${c.ofWord} ${total}`;
}
export function allStepsPassedLabel(total: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${c.allWord} ${total} ${c.passedWord}`;
}
export function stepsNotStartedLabel(total: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${total} ${c.stepsWord} · ${c.notStarted}`;
}
export function stepsCountLabel(done: number, total: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${done}/${total} ${c.stepsWord}`;
}
export function academyCaption(a: number, g: number, s: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${a} ${c.inSessionWord} · ${g} ${c.graduatedWord} · ${s} ${c.onSyllabusWord}`;
}
export function inSessionSinceLabel(iso: string, locale?: string): string {
  return `${getTrainingCopy(locale).inSessionSincePre} ${dateLabel(iso, locale)}`;
}
export function markStepPassedLabel(done: number, locale?: string): string {
  const c = getTrainingCopy(locale);
  return `${c.markStepPre} ${done + 1} ${c.markStepPost}`;
}

// Course content translations, keyed by slug. --------------------------------
type CourseText = { title: string; tagline: string; why: string; steps: { title: string; detail: string }[] };
const courseMs: Record<string, CourseText> = {
  toothbrushing: {
    title: 'Berus Gigi 101',
    tagline: 'Era berus gigi bermula, tertakluk kepada kelulusan rasminya.',
    why: 'Kucing menyembunyikan penyakit gigi sehingga ia menyakitkan. Berus setiap hari ialah pencegahan terbaik, dan gel Histo Tree perisa daging sudah pun dibeli.',
    steps: [
      { title: 'Ujian rasa', detail: 'Secalit gel gigi pada jari, ditawarkan sebagai ganjaran. Ulang beberapa hari sehingga dia menganggapnya makanan.' },
      { title: 'Dagu dan pipi', detail: 'Sementara dia menjilat gel, sentuh bibir dan pipinya. Beberapa saat sahaja, kemudian lepaskan dan puji.' },
      { title: 'Jari pada gusi', detail: 'Gel pada jari, digosok lembut di sepanjang gigi hadapan dan garisan gusi. Berhenti sebelum dia membantah.' },
      { title: 'Masuknya berus', detail: 'Berus gigi kucing muncul. Dia menghidunya dan menjilat gel darinya. Belum berus lagi.' },
      { title: 'Sapuan pertama', detail: 'Beberapa saat berus sebenar pada gigi hadapan, satu sisi. Akhiri dengan ganjaran.' },
      { title: 'Rutin penuh', detail: 'Kedua-dua sisi dan gigi belakang, bawah seminit, setiap hari. Bergraduat.' },
    ],
  },
  manicure: {
    title: 'Program Manikur',
    tagline: 'Kaki depan dahulu. Pihak pengurusan telah dimaklumkan.',
    why: 'Kuku dalaman tumbuh melebihi dan tersangkut. Potong berkala melindungi kakinya, perabot dan kakitangan.',
    steps: [
      { title: 'Diplomasi kaki', detail: 'Semasa dakapan santai, pegang sebelah kaki selama satu saat, lepaskan, ganjari. Tingkatkan sehingga picitan lembut.' },
      { title: 'Tekanan', detail: 'Tekan lembut tapak jari supaya satu kuku terjulur, kagumi, lepaskan, ganjari.' },
      { title: 'Berkenalan dengan pemotong', detail: 'Pemotong kuku diletakkan berdekatan semasa dakapan dan berbunyi klik di udara. Tiada apa berlaku kepadanya. Ganjaran mencurah.' },
      { title: 'Satu kuku sahaja', detail: 'Potong hujung satu kuku depan ketika dia tenang. Berhenti serta-merta dan raikan.' },
      { title: 'Satu kaki setiap sesi', detail: 'Beberapa kuku setiap sesi, kaki depan dahulu, setiap 2–4 minggu. Bergraduat.' },
    ],
  },
  carrier: {
    title: 'Diplomasi Bekas Bawa',
    tagline: 'Dari penjara mudah alih ke kabin kelas pertama.',
    why: 'Setiap lawatan doktor haiwan bermula dengan bekas bawa. Kucing yang masuk secara sukarela menjadikan setiap perjalanan lebih tenang dan pantas.',
    steps: [
      { title: 'Taraf perabot', detail: 'Bekas bawa dibiar terbuka di ruang tamu dengan selimut lembut di dalamnya, seolah-olah ia sentiasa di situ.' },
      { title: 'Lokasi snek', detail: 'Ganjaran dan sesekali hidangan muncul berhampiran bekas bawa, kemudian di dalam pintu, kemudian di belakang.' },
      { title: 'Permainan pintu', detail: 'Pintu ditutup beberapa saat sementara dia makan snek di dalam, dan dibuka sebelum dia peduli.' },
      { title: 'Bawaan pendek', detail: 'Dibawa sebentar di sekeliling apartmen, kemudian dilepaskan dan durian runtuh ganjaran.' },
      { title: 'Ujian percubaan', detail: 'Turun ke lobi atau pemanduan singkat dan terus pulang. Tiada doktor haiwan di hujungnya. Bergraduat.' },
    ],
  },
  holding: {
    title: 'Toleransi Pegangan Lanjutan',
    tagline: 'Sepuluh saat tenang dalam dakapan kakitangan dikira satu kejayaan diplomatik.',
    why: 'Pemeriksaan doktor haiwan, dandanan dan sesekali penyelamatan dari rak semuanya lebih lancar untuk kucing yang tahan dipegang.',
    steps: [
      { title: 'Tangan, tanpa angkat', detail: 'Kedua-dua tangan diletakkan di sisinya seketika semasa dakapan, kemudian lepaskan, kemudian ganjari.' },
      { title: 'Angkatan sepuluh saat', detail: 'Angkatan pendek dan rendah. Kaki kembali ke tanah sebelum dia terfikir untuk meronta.' },
      { title: 'Mendarat di riba', detail: 'Angkat dan letakkan dia di riba; kebebasan diberi serta-merta. Riba menjadi destinasi yang baik.' },
      { title: 'Setengah minit', detail: 'Pegangan santai 30 saat dengan usapan perlahan, berakhir sebelum dia meminta.' },
      { title: 'Gaya klinik', detail: 'Pegangan gaya doktor haiwan yang lembut sehingga seminit, tenang sepanjang masa. Bergraduat.' },
    ],
  },
  recall: {
    title: 'Panggilan, Dengan Temu Janji',
    tagline: 'Dia datang bila dipanggil. Bila dia bersetuju dengan premisnya.',
    why: 'Tindak balas nama yang boleh diharap mencari kucing yang bersembunyi dengan pantas, yang penting apabila ada jaguh sorok-sorok di dalam rumah.',
    steps: [
      { title: 'Nama sama dengan ganjaran', detail: 'Sebut "Picha", ganjaran tiba. Ulang beberapa hari sehingga kepalanya berpaling pantas mendengar perkataan itu.' },
      { title: 'Panggilan rentas bilik', detail: 'Panggil dia dari seberang bilik dan ganjari ketibaannya, setiap kali.' },
      { title: 'Panggilan luar pandangan', detail: 'Panggil dari bilik lain. Ketibaan memperoleh durian runtuh.' },
      { title: 'Latihan rawak', detail: 'Panggilan pada saat rawak setiap hari; ganjaran berbeza antara makanan, permainan dan kasih sayang. Bergraduat.' },
    ],
  },
  'talking-buttons': {
    title: 'Butang Bercakap',
    tagline: 'Empat butang, seekor kucing, dan permulaan tuntutan yang boleh anda dengar.',
    why: 'Butang bunyi boleh rakam membolehkan dia meminta sesuatu dengan sengaja dan bukannya teka-teki biasa. Dilakukan dengan betul (kakitangan menunjuk cara menekan, tiada siapa memaksa kakinya, dan ganjaran tiba serta-merta) ia pengayaan sebenar dan saluran komunikasi yang tulen. Mulakan dengan satu butang dan tambah selebihnya hanya apabila dia memahaminya.',
    steps: [
      { title: 'Rakam dan letak satu', detail: 'Rakam satu perkataan yang jelas dan bernilai tinggi yang sudah dia sukai; "main" atau "snek" jadi perkataan pertama yang baik. Letak butang itu di tempat bendanya berada: butang main di sisi mainan, butang snek di sisi balang.' },
      { title: 'Tunjuk cara, setiap kali', detail: 'Sebelum benda itu berlaku, seorang kakitangan menekan butang, sebut perkataannya, kemudian sampaikan serta-merta. Kedua-dua kakitangan, perkataan yang sama, banyak kali sehari. Jangan sekali-kali tekan kakinya untuknya; dia belajar dengan memerhati.' },
      { title: 'Raikan tekanan pertama', detail: 'Ganjari sebarang hiduan atau kaki berhampiran butang, dan sebaik sahaja dia menekannya sendiri, sampaikan bendanya serta-merta, walaupun masanya teruk. Tekanan pertama yang sebenar boleh mengambil masa berminggu. Anggap ia seperti bergraduat.' },
      { title: 'Tambah butang kedua', detail: 'Setelah dia menekan butang satu dengan sengaja, tambah butang kedua dengan perkataan yang jelas berbeza ("makan" atau "air" sesuai), diletakkan sedikit jauh supaya kedua-duanya tidak bercampur. Terus tunjuk cara kedua-duanya.' },
      { title: 'Tambah yang ketiga', detail: 'Bawa masuk perkataan ketiga apabila dia dapat membezakan dua yang pertama mengikut konteks dan bukan sekadar menekan sesuka hati. Perkataan sosial seperti "belai" ialah pilihan yang baik. Ganjari tekanan yang benar-benar masuk akal.' },
      { title: 'Papan bunyi penuh', detail: 'Tambah butang keempat dan tetapkan keempat-empatnya pada pad anti-gelincir. Dia kini mempunyai perbendaharaan kata yang berfungsi dan boleh membuat permintaan secara rasmi. Bergraduat, dan permulaan rundingan sepanjang hayat.' },
    ],
  },
  'party-tricks': {
    title: 'Helah Pesta',
    tagline: 'Tepuk kaki, pusingan, dan cara lain untuk membuat kakitangan bertepuk tangan.',
    why: 'Helah ialah pengayaan tulen: ia mengasah otaknya, membakar tenaga dan menjadikan latihan satu permainan yang seisi rumah nikmati. Ia juga membina fokus dan kerjasama yang menjadi sandaran setiap kursus lain. Umpan dan ganjari, jangan sekali-kali aturkan gayanya dengan tangan.',
    steps: [
      { title: 'Penanda dan sasaran', detail: 'Pilih satu penanda (pengeklik, atau sebutan "ya" yang tegas) dan pasangkannya dengan ganjaran sehingga bunyi itu sendiri bermaksud "syabas". Kemudian ajar sentuhan hidung: hulurkan jari dan ganjari sebaik sahaja dia menyentuhnya. Satu kemahiran ini menggerakkan setiap helah.' },
      { title: 'Duduk', detail: 'Pegang ganjaran di hidungnya dan luncurkannya ke atas dan ke belakang kepalanya; sambil hidungnya mengikut dan punggungnya turun, tanda dan ganjari. Setelah lancar, tambah perkataan "duduk" sebelum dia melakukannya.' },
      { title: 'Tepuk kaki', detail: 'Pegang ganjaran dalam genggaman longgar berhampiran dadanya. Sebaik sahaja kaki terangkat untuk menyiasat, tanda dan ganjari. Bentuk ia lebih tinggi selama beberapa sesi sehingga kaki bertemu tapak tangan terbuka anda, kemudian namakannya "tepuk kaki".' },
      { title: 'Pusing', detail: 'Pandu hidungnya dengan ganjaran dalam bulatan perlahan supaya dia berpusing di tempatnya; tanda pusingan penuh dan ganjari. Kecilkan bulatan setiap hari, ciutkannya kepada pusingan jari, dan tambah perkataan "pusing".' },
      { title: 'Pudarkan umpan', detail: 'Kini buat gerakan tangan yang sama tanpa ganjaran di dalamnya, dan bayar dari tangan yang satu lagi setelah dia melakukannya. Sebut isyarat sekali, beri dia seketika, dan ganjari isyarat itu dan bukan makanan yang dipegang di hidungnya.' },
      { title: 'Kemuncak', detail: 'Tambah satu aksi hebat (gaya merayu "duduk cantik", atau lompatan melalui gelung yang dipegang), kemudian rangkaikan dua helah menjadi rutin kecil atas isyarat. Dia kini beraksi untuk penonton seisi rumah atas permintaan. Bergraduat, dan tepukan gemuruh.' },
    ],
  },
  harness: {
    title: 'Abah-abah & Tali (Pilihan)',
    tagline: 'Untuk ekspedisi masa depan hipotetikal yang Tuan Puteri Gebu mungkin tugaskan.',
    why: 'Pilihan. Berguna hanya jika perjalanan atau masa luar berpengawasan pernah menjadi agenda, jadi ia menunggu di belakang silibus.',
    steps: [
      { title: 'Abah-abah wujud', detail: 'Ia terletak di lantai untuk dihidu. Ganjaran berlaku berhampirannya.' },
      { title: 'Dipakai, tidak dikancing', detail: 'Disidai di bahunya beberapa saat setiap kali, diikuti ganjaran.' },
      { title: 'Dikancing di dalam rumah', detail: 'Dikancing beberapa minit sementara permainan mengalihkan perhatiannya daripada pakaian itu.' },
      { title: 'Mengekori tali', detail: 'Tali dipasang, dia merayau di apartmen, kakitangan mengikut seperti pegawai istana.' },
      { title: 'Ekspedisi koridor', detail: 'Berjalan singkat berpengiring di luar pintu hadapan. Bergraduat.' },
    ],
  },
};

/** Return a course with prose in the active locale (English passes through). */
export function localizeCourse(course: TrainingCourse, locale?: string): TrainingCourse {
  if (locale !== 'ms') return course;
  const o = courseMs[course.slug];
  if (!o) return course;
  return {
    ...course,
    title: o.title,
    tagline: o.tagline,
    why: o.why,
    steps: course.steps.map((s, i) => ({ ...s, ...(o.steps[i] ?? {}) })),
  };
}

// ---------------------------------------------------------------------------
// Staff room (PIN gate + staff-only controls). Server + client strings.
// ---------------------------------------------------------------------------
export interface StaffCopy {
  metaTitle: string;
  metaDescription: string;
  appTitle: string;
  kicker: string;
  title: string;
  blurb: string;
  staffOnly: string;
  pinPrompt: string;
  pinLabel: string;
  pinPlaceholder: string;
  unlock: string;
  checking: string;
  pinNotRecognised: string;
  unlockedBanner: string;
  remindersLabel: string;
  reminderTitle: string;
  reminderSub: string;
  on: string;
  off: string;
  deviceLabel: string;
  forgetTitle: string;
  forgetSub: string;
  moreControlsNote: string;
  push: {
    unsupported: string;
    denied: string;
    subscribed: string;
    off: string;
    working: string;
    pinRejected: string;
    cloudNotConfigured: string;
    signInFirst: string;
    couldNotUpdate: string;
  };
}
export const staffCopy: Record<string, StaffCopy> = {
  en: {
    metaTitle: 'Staff · Picha 🐾',
    metaDescription: 'Staff quarters: the registrar PIN lives here, for the humans on payroll.',
    appTitle: 'Staff',
    kicker: 'Members only',
    title: 'The staff room',
    blurb:
      'Where the humans keep the treats, the coffee and the registrar PIN. Sign in to reach the staff-only controls management would never hand to just anyone.',
    staffOnly: 'Staff only',
    pinPrompt:
      'Registrar PIN, please. The treat cupboard is staff only. Enter it once and this device remembers you.',
    pinLabel: 'Registrar PIN',
    pinPlaceholder: 'staff PIN',
    unlock: 'Unlock',
    checking: 'Checking…',
    pinNotRecognised: 'That PIN was not recognised. Try again.',
    unlockedBanner:
      "You're in; treats are in the top drawer. This device can now log weigh-ins, Academy progress and daily rounds.",
    remindersLabel: 'Reminders',
    reminderTitle: 'Reminders on this device',
    reminderSub: 'A nudge every few hours while daily rounds are still pending.',
    on: 'On',
    off: 'Off',
    deviceLabel: 'This device',
    forgetTitle: 'Forget the PIN on this device',
    forgetSub:
      'Clears the saved PIN here. Other devices are untouched, and the PIN itself never changes.',
    moreControlsNote:
      "More staff controls will move in over time. For now it's mostly a treat jar, a kettle and a coat rack.",
    push: {
      unsupported: "This browser can't deliver reminders while the app is closed.",
      denied:
        'Notifications are blocked for this site. Turn them on in your browser settings, then tap again.',
      subscribed:
        'On. A nudge every few hours while rounds are pending (quiet overnight); silent once the list is clear.',
      off: 'Off. Tap to get a nudge while daily rounds are still pending.',
      working: 'Working…',
      pinRejected: 'That PIN was rejected. Sign out and back in, then try again.',
      cloudNotConfigured: 'The cloud is not configured.',
      signInFirst: 'Sign in first.',
      couldNotUpdate: 'Could not update reminders.',
    },
  },
  ms: {
    metaTitle: 'Kakitangan · Picha 🐾',
    metaDescription:
      'Kuarters kakitangan: PIN pendaftar disimpan di sini, untuk manusia yang bergaji.',
    appTitle: 'Kakitangan',
    kicker: 'Ahli sahaja',
    title: 'Bilik kakitangan',
    blurb:
      'Tempat manusia menyimpan snek, kopi dan PIN pendaftar. Log masuk untuk mencapai kawalan khas kakitangan yang pihak pengurusan takkan serahkan kepada sebarang orang.',
    staffOnly: 'Kakitangan sahaja',
    pinPrompt:
      'PIN pendaftar, sila. Almari snek untuk kakitangan sahaja. Masukkan sekali dan peranti ini akan mengingati anda.',
    pinLabel: 'PIN pendaftar',
    pinPlaceholder: 'PIN kakitangan',
    unlock: 'Buka kunci',
    checking: 'Menyemak…',
    pinNotRecognised: 'PIN itu tidak dikenali. Cuba lagi.',
    unlockedBanner:
      'Anda berjaya masuk; snek ada dalam laci atas. Peranti ini kini boleh mencatat timbangan, kemajuan Akademi dan pusingan harian.',
    remindersLabel: 'Peringatan',
    reminderTitle: 'Peringatan pada peranti ini',
    reminderSub: 'Satu peringatan setiap beberapa jam sementara pusingan harian masih tertunggak.',
    on: 'Hidup',
    off: 'Mati',
    deviceLabel: 'Peranti ini',
    forgetTitle: 'Lupakan PIN pada peranti ini',
    forgetSub:
      'Membersihkan PIN tersimpan di sini. Peranti lain tidak terjejas, dan PIN itu sendiri tidak berubah.',
    moreControlsNote:
      'Lebih banyak kawalan kakitangan akan masuk dari masa ke masa. Buat masa ini, kebanyakannya balang snek, cerek dan penyangkut kot.',
    push: {
      unsupported: 'Pelayar ini tidak dapat menghantar peringatan semasa aplikasi ditutup.',
      denied:
        'Pemberitahuan disekat untuk laman ini. Hidupkannya dalam tetapan pelayar anda, kemudian ketik lagi.',
      subscribed:
        'Hidup. Satu peringatan setiap beberapa jam sementara pusingan tertunggak (senyap pada waktu malam); senyap sebaik senarai kosong.',
      off: 'Mati. Ketik untuk mendapat peringatan sementara pusingan harian masih tertunggak.',
      working: 'Sedang berfungsi…',
      pinRejected: 'PIN itu ditolak. Log keluar dan masuk semula, kemudian cuba lagi.',
      cloudNotConfigured: 'Awan tidak dikonfigurasikan.',
      signInFirst: 'Log masuk dahulu.',
      couldNotUpdate: 'Tidak dapat mengemas kini peringatan.',
    },
  },
};
export const getStaffCopy = (locale?: string): StaffCopy => staffCopy[locale ?? 'en'] ?? staffCopy.en;

// ---------------------------------------------------------------------------
// Passport dialog + Share dialog (both included on multiple pages).
// ---------------------------------------------------------------------------
export interface PassportCopy {
  sheetTitle: string;
  closeLabel: string;
  particularsHeading: string;
  identityHeading: string;
  labels: {
    name: string;
    species: string;
    breed: string;
    sex: string;
    neutered: string;
    colour: string;
    dob: string;
    passportNo: string;
  };
  species: string; // "Feline"
  sexFemale: string;
  yes: string;
  pending: string;
  household: string; // stamp
  signature: string; // stamp
  microchipNo: string;
  siteOfImplant: string;
  betweenShoulders: string;
  registeredAt: string;
  petPhoto: string;
}
export const passportCopy: Record<string, PassportCopy> = {
  en: {
    sheetTitle: 'Pet Passport',
    closeLabel: 'Close passport',
    particularsHeading: "Pet's Particulars",
    identityHeading: 'Pet Identity',
    labels: {
      name: "Pet's Name",
      species: 'Species',
      breed: 'Breed',
      sex: 'Sex',
      neutered: 'Neutered',
      colour: 'Colour',
      dob: 'Date of Birth',
      passportNo: 'Passport No.',
    },
    species: 'Feline',
    sexFemale: 'Female',
    yes: 'Yes',
    pending: 'Pending',
    household: 'Royal Household of Picha',
    signature: 'Signature: paw on file',
    microchipNo: 'Microchip No.',
    siteOfImplant: 'Site of Implant',
    betweenShoulders: 'Between shoulders',
    registeredAt: 'Registered at',
    petPhoto: 'Pet Photo',
  },
  ms: {
    sheetTitle: 'Pasport Haiwan',
    closeLabel: 'Tutup pasport',
    particularsHeading: 'Butiran Haiwan',
    identityHeading: 'Identiti Haiwan',
    labels: {
      name: 'Nama Haiwan',
      species: 'Spesies',
      breed: 'Baka',
      sex: 'Jantina',
      neutered: 'Dikembiri',
      colour: 'Warna',
      dob: 'Tarikh Lahir',
      passportNo: 'No. Pasport',
    },
    species: 'Kucing',
    sexFemale: 'Betina',
    yes: 'Ya',
    pending: 'Belum selesai',
    household: 'Istana Diraja Picha',
    signature: 'Tandatangan: tapak kaki dalam fail',
    microchipNo: 'No. Mikrocip',
    siteOfImplant: 'Tapak Implan',
    betweenShoulders: 'Antara bahu',
    registeredAt: 'Didaftarkan di',
    petPhoto: 'Foto Haiwan',
  },
};
export const getPassportCopy = (locale?: string): PassportCopy =>
  passportCopy[locale ?? 'en'] ?? passportCopy.en;

export interface ShareCopy {
  sheetTitle: string;
  closeLabel: string;
  blurb: string;
  share: string;
  copyLink: string;
  copied: string;
  shareText: string; // native-share body
}
export const shareCopy: Record<string, ShareCopy> = {
  en: {
    sheetTitle: 'Share her profile',
    closeLabel: 'Close share sheet',
    blurb:
      'For the vet, the day care, the family: scan the code or send the link. Everything about Picha, one page.',
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Copied',
    shareText: 'Picha the cat: profile, health record and care guide.',
  },
  ms: {
    sheetTitle: 'Kongsi profilnya',
    closeLabel: 'Tutup helaian kongsi',
    blurb:
      'Untuk doktor haiwan, taska, keluarga: imbas kod atau hantar pautan. Segala tentang Picha, satu halaman.',
    share: 'Kongsi',
    copyLink: 'Salin pautan',
    copied: 'Disalin',
    shareText: 'Picha si kucing: profil, rekod kesihatan dan panduan penjagaan.',
  },
};
export const getShareCopy = (locale?: string): ShareCopy => shareCopy[locale ?? 'en'] ?? shareCopy.en;
