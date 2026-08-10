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
import type { BodySignal } from '../data/picha';

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
