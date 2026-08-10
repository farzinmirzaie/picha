/**
 * Per-locale Home-page copy. English REFERENCES picha.ts (single source of
 * truth for facts + the English voice); other locales carry translated prose.
 * Facts that never translate (icons, phone numbers, the lullaby URL) stay in
 * picha.ts and are read directly by the page — only prose lives here.
 *
 * Personality entries align 1:1 with `personality` in picha.ts (same order),
 * so the page zips each translated {title, detail} with that item's icon.
 */
import { identity, personality, lullaby, humanAgeLine, ageInMonths, ageLabel } from '../data/picha';
import type { BodySignal, TrainingCourse } from '../data/picha';
import { dateLabel, faDigits } from '../lib/dates';

/**
 * Locale-aware age label ("~7.7 months old"). English delegates to picha.ts;
 * ms/zh are translated. Facts (the month maths) stay in picha.ts. Used at
 * build time and by the Layout [data-age] client script (reads html lang).
 */
export function ageLabelI18n(locale?: string, from: Date = new Date()): string {
  if (!locale || locale === 'en') return ageLabel(from);
  const months = Math.round(ageInMonths(from) * 10) / 10;
  const whole = Math.floor(months / 12);
  const rem = Math.floor(months % 12);
  const m = Number.isInteger(months) ? String(months) : months.toFixed(1);
  if (locale === 'zh') {
    if (months < 12) return `约 ${m} 个月大`;
    return rem === 0 ? `约 ${whole} 岁大` : `约 ${whole} 岁 ${rem} 个月大`;
  }
  if (locale === 'fa') {
    if (months < 12) return `حدود ${faDigits(m)} ماهه`;
    return rem === 0
      ? `حدود ${faDigits(whole)} ساله`
      : `حدود ${faDigits(whole)} ساله و ${faDigits(rem)} ماه`;
  }
  // ms
  if (months < 12) return `~${m} bulan`;
  return rem === 0 ? `~${whole} tahun` : `~${whole} tahun ${rem} bulan`;
}

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

const zh: HomeCopy = {
  tagline: '雪白绒毛 · 琥珀色眼睛 · 粉红项圈',
  story:
    'Picha 在吉隆坡拥有一间公寓，在那里她雇用了两名人类，Farah 和 Farzin，担任全职员工。他们的职责包括操作逗猫棒、随传随到的下巴挠痒，以及按她喵叫的精确频率拆开零食包装。报酬是：呼噜声、头顶蹭蹭，以及陪伴在她身边的荣幸。这并不是一份公平的安排。没有人有怨言。',
  looks:
    '一身雪白长毛，粉红的耳朵和鼻子，琥珀色的眼睛。戴着一个系铃铛的粉红项圈，好让员工随时知道管理层在哪里。',
  getToKnow: '认识她',
  share: '分享',
  personality: [
    { title: '专业猎手', detail: '一听到自己的名字，逗猫棒就会颤抖。每天的狩猎时段必不可少、不容商量；规矩由她来定。' },
    { title: '睡眠运动员', detail: '每天 16 小时以上。这不是懒惰，是训练，而且对她这个年纪来说完全正常。' },
    { title: '雷声评论家', detail: '暴风雨得零分，并立即撤退到秘密堡垒。随她去：黑暗安静的藏身处加上平和的气氛就能解决一切。千万别把她拽出来。' },
    { title: '永远一丝不苟', detail: '打理仪容是一项 24 小时的工程。雪白的毛发靠她自己不停努力保持洁白；员工只是打下手。' },
    { title: '首席索求官', detail: '关注不是请求来的，是召唤来的。理论上可以忽略她，大约能撑十一秒。' },
    { title: '据点守护者', detail: '她轮流守着几个官方指定的最爱据点。如果她“不见了”，她就在其中之一，正好待在她想待的地方。' },
    { title: '亲近，但有距离', detail: '想要人在身边，而不是黏着她。坐或躺在她旁边，保持礼貌的距离，就当自己走运了。' },
    { title: '首席检查官', detail: '任何新东西一到就得检查。杂货在每个袋子通过她鼻子的审核之前都不得动用。' },
    { title: '撒娇（需预约）', detail: '拥抱是恩赐，不是有求必应。她和员工极为亲近；一旦心满意足，又极为独立。' },
    { title: '捉迷藏冠军', detail: '员工跑去躲起来；她来找他们。每一次都如此。从来没有人成功躲过她，将来也不会有。' },
    { title: '衔回，按她的条件', detail: '她的铃铛球是镇店之宝：她把它踢开、追上并叼住，然后带回员工手中，等着再扔。你还回去，她就再衔回来。锦标赛在睡前于卧室举行，声势浩大，而且没有人要求过。' },
  ],
  lullaby: {
    title: '她的摇篮曲',
    detail:
      '有一首特定的歌，她还没听完就睡着了。员工总在睡前备好它；效果好得可疑。当她怎么都不肯安静时，这就是作弊密码。',
    cta: '播放她的摇篮曲',
  },
  ifFound: '发现她在未经授权的独自冒险？她的员工想跟你说两句：',
  call: '致电',
};

const fa: HomeCopy = {
  tagline: 'پشمالوی سفیدبرفی · چشمان کهربایی · قلاده صورتی',
  story:
    'پیچا صاحب یک آپارتمان در کوالالامپور است، جایی که دو انسان، فرح و فرزین، را به‌عنوان کارکنان تمام‌وقت استخدام کرده. وظایف آن‌ها شامل کار با اسباب‌بازی چوبی، خاراندن چانه به‌محض درخواست، و باز کردن بسته‌های تنقلات با فرکانس دقیق میو کردن اوست. دستمزد: خرخر، سُر دادن سر، و افتخار بودن در کنار او. این معامله‌ی منصفانه‌ای نیست. هیچ‌کس شکایتی ندارد.',
  looks:
    'پوشش بلند و کاملاً سفید، گوش‌ها و بینی صورتی، چشمان کهربایی. قلاده‌ای صورتی با زنگوله می‌بندد تا کارکنان همیشه بدانند مدیریت کجاست.',
  getToKnow: 'با او آشنا شوید',
  share: 'هم‌رسانی',
  personality: [
    { title: 'شکارچی حرفه‌ای', detail: 'اسباب‌بازی چوبی با شنیدن نامش می‌لرزد. جلسه‌ی روزانه‌ی شکار الزامی و غیرقابل‌مذاکره است؛ قوانین را او می‌گذارد.' },
    { title: 'ورزشکار خواب', detail: 'بیش از ۱۶ ساعت در روز. این تنبلی نیست، تمرین است، و برای سنش کاملاً طبیعی.' },
    { title: 'منتقد رعدوبرق', detail: 'طوفان صفر ستاره می‌گیرد و باعث عقب‌نشینی فوری به دژ مخفی می‌شود. بگذارید باشد: پناهگاهی تاریک و ساکت به‌همراه فضایی آرام همه‌چیز را حل می‌کند. هرگز او را بیرون نکشید.' },
    { title: 'همیشه آراسته', detail: 'مرتب بودن یک عملیات ۲۴ساعته است. پوشش سفید با تلاش شخصی بی‌وقفه‌ی او سفید می‌ماند؛ کارکنان فقط کمک می‌کنند.' },
    { title: 'مدیر ارشد مطالبات', detail: 'توجه درخواست نمی‌شود، احضار می‌شود. نادیده گرفتنش از نظر فنی ممکن است، برای حدود یازده ثانیه.' },
    { title: 'نگهبان جاهای موردعلاقه', detail: 'او به‌نوبت از چند مکان رسمیِ موردعلاقه نگهبانی می‌کند. اگر «گم» شده، در یکی از آن‌هاست، دقیقاً همان‌جا که می‌خواهد.' },
    { title: 'نزدیک، اما با فاصله', detail: 'آدم‌هایش را نزدیک می‌خواهد، نه چسبیده. کنارش بنشینید یا دراز بکشید، فاصله‌ی مؤدبانه را حفظ کنید، و خود را خوش‌شانس بدانید.' },
    { title: 'بازرس ارشد', detail: 'هر چیز تازه به‌محض رسیدن بازرسی می‌شود. خرید تا وقتی هر کیسه از ممیزیِ بینی او رد نشود قابل‌استفاده نیست.' },
    { title: 'نازپرورده (با وقت قبلی)', detail: 'بغل عطا می‌شود، درخواست نمی‌شود. با کارکنانش بی‌نهایت نزدیک؛ به‌محض رضایت، بی‌نهایت مستقل.' },
    { title: 'قهرمان قایم‌باشک', detail: 'کارکنان فرار می‌کنند و قایم می‌شوند؛ او پیدایشان می‌کند. هر بار. هیچ‌کس تا به حال موفق نشده از او پنهان شود، و نخواهد شد.' },
    { title: 'برگردان، به شرط او', detail: 'توپ زنگوله‌دارش جواهر تاج است: شوتش می‌کند، دنبالش می‌دود و می‌گیردش، بعد به دست کارکنان برمی‌گرداند و منتظر پرتاب می‌ماند. برگردانید، او هم برمی‌گرداند. مسابقات قهرمانی موقع خواب در اتاق‌خواب برگزار می‌شود، با صدای بلند، و هیچ‌کس درخواستش نکرده.' },
  ],
  lullaby: {
    title: 'لالایی‌اش',
    detail:
      'یک آهنگ خاص هست، و او پیش از تمام شدنش خوابش می‌برد. کارکنان همیشه آن را برای وقت خواب آماده دارند؛ اثرش مشکوک است. وقتی به‌هیچ‌وجه ساکت نمی‌شود، این رمز تقلب است.',
    cta: 'پخش لالایی‌اش',
  },
  ifFound: 'او را در یک ماجراجویی انفرادیِ بدون اجازه دیدید؟ کارکنانش می‌خواهند چند کلمه با شما حرف بزنند:',
  call: 'تماس با',
};

export const homeCopy: Record<string, HomeCopy> = { en, ms, zh, fa };
export const getHomeCopy = (locale?: string): HomeCopy => homeCopy[locale ?? 'en'] ?? en;

// ---------------------------------------------------------------------------
// Footer (the "built by the staff" credit line)
// ---------------------------------------------------------------------------
export const footerCopy: Record<string, string> = {
  en: 'Built by the staff, under close supervision. Approved with a slow blink.',
  ms: 'Dibina oleh kakitangan, di bawah penyeliaan rapi. Diluluskan dengan kenyitan mata perlahan.',
  zh: '由员工在严密监督下打造。以一个缓慢的眨眼获得批准。',
  fa: 'ساخته‌ی کارکنان، زیر نظارت دقیق. با یک پلک آهسته تأیید شد.',
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
  zh: {
    metaTitle: '迷路了 · Picha 🐾',
    metaDescription: '这个页面走丢了。',
    kicker: '404 · 找不到',
    heading: '这个页面走丢了',
    body: '连捉迷藏冠军都找不到它。它可能被移动、改名，或从架子上被拍了下去。',
  },
  fa: {
    metaTitle: 'گم شد · Picha 🐾',
    metaDescription: 'این صفحه سرگردان شده و رفته.',
    kicker: '۴۰۴ · پیدا نشد',
    heading: 'این صفحه سرگردان شده و رفته',
    body: 'حتی استاد بزرگ قایم‌باشک هم نمی‌تواند پیدایش کند. شاید جابه‌جا، تغییرِ نام، یا از روی قفسه به پایین پرت شده باشد.',
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
  zh: {
    metaTitle: '工具 · Picha 🐾',
    metaDescription: 'Picha 的工具箱：宠物护照、体重追踪器、猫龄换算器、皇家学院和肢体语言解读器。',
    kicker: '她的小装置',
    title: '皇家工坊',
    blurb: '由员工发明、用来更好地服侍绒毛殿下的小装置。每一件只有通过她的亲自检验后才能投入使用。',
    inServiceLabel: '使用中',
    passport: {
      title: '宠物护照',
      detail: '她的官方证件：个人资料、芯片，以及登记员的爪印。',
    },
    cards: [
      { title: '员工室', detail: '人类存放零食和登记员 PIN 的地方。仅限会员。' },
      { title: '体重追踪器', detail: '每一次称重都绘成图表，让皇家腰围永远不会悄悄失控。' },
      { title: '猫龄换算器', detail: '她换算成人类年龄的岁数，外加适用于你认识的任何猫的算法。' },
      { title: '皇家学院', detail: '员工在这里一门课一门课地修炼猫咪合作之道。' },
      { title: '解读 Picha', detail: '一份关于她情绪以及她想告诉你什么的实地指南。' },
    ],
    note: '更多小装置正在筹备中。点子每晚在凌晨 3 点的暴冲时段接受审阅，并由绒毛殿下排定优先次序。',
  },
  fa: {
    metaTitle: 'ابزارها · Picha 🐾',
    metaDescription: 'جعبه‌ابزار Picha: پاسپورت حیوان، ردیاب وزن، مبدل سال گربه، آکادمی سلطنتی و بازخوان زبان بدن.',
    kicker: 'ابزارهای او',
    title: 'کارگاه سلطنتی',
    blurb: 'ابزارهایی که کارکنان اختراع کرده‌اند تا بهتر به علیاحضرت پشمالو خدمت کنند. هر کدام تنها پس از گذراندن بازرسی شخصی او وارد خدمت می‌شود.',
    inServiceLabel: 'در حال خدمت',
    passport: {
      title: 'پاسپورت حیوان',
      detail: 'سند رسمی او: مشخصات، میکروچیپ و پنجه‌ی ثبت‌کننده.',
    },
    cards: [
      { title: 'اتاق کارکنان', detail: 'جایی که انسان‌ها تنقلات و پینِ ثبت‌کننده را نگه می‌دارند. فقط اعضا.' },
      { title: 'ردیاب وزن', detail: 'هر وزن‌کشی، روی نمودار، تا دور کمر سلطنتی هرگز بی‌خبر بالا نرود.' },
      { title: 'مبدل سال گربه', detail: 'سن او به سال انسانی، به‌همراه محاسبه برای هر گربه‌ای که می‌شناسید.' },
      { title: 'آکادمی سلطنتی', detail: 'جایی که کارکنان در همکاری گربه‌ای خبره می‌شوند، یک دوره در هر بار.' },
      { title: 'خواندنِ Picha', detail: 'راهنمای میدانیِ حال‌وهوای او و اینکه چه چیزی به شما می‌گوید.' },
    ],
    note: 'ابزارهای بیشتری در دست ساخت است. ایده‌ها هر شب، هنگام زومی‌های ساعت ۳ بامداد، بررسی و توسط علیاحضرت پشمالو اولویت‌بندی می‌شوند.',
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

// Chinese lines are phrased to follow a copula-less prefix ("这只猫" / name),
// so each begins with 是.
function humanAgeLineZh(y: number): string {
  if (y < 1) return '是一个巴掌大的婴儿';
  if (y < 5) return '是一个带爪子的幼儿';
  if (y < 10) return '是一个作息严格的小学生';
  if (y < 13) return '是一个对就寝时间很有主见的初中生';
  if (y < 18) return '是一个青少年（这解释了很多事情）';
  if (y < 26) return '是一个把大家已读不回的年轻人';
  if (y < 40) return '是一个有着五年小睡计划的成年人';
  if (y < 60) return '是一个安然步入中年、不再容忍胡闹的人';
  return '是一位见多识广的尊贵长者';
}

// Persian lines are noun phrases; the copula (است) is supplied by the copy's
// trailing part (inCatTimePost / thatCatIsPost), matching the English "makes X …".
function humanAgeLineFa(y: number): string {
  if (y < 1) return 'یک نوزاد به‌اندازهٔ بغل';
  if (y < 5) return 'یک نوپای پنجه‌دار';
  if (y < 10) return 'یک بچه‌دبستانی با برنامهٔ چرت سخت‌گیرانه';
  if (y < 13) return 'یک دانش‌آموز راهنمایی با عقاید محکم دربارهٔ وقت خواب';
  if (y < 18) return 'یک نوجوان (این خیلی چیزها را توضیح می‌دهد)';
  if (y < 26) return 'یک جوان که پیام‌ها را بی‌جواب می‌گذارد';
  if (y < 40) return 'یک بزرگسال با برنامهٔ پنج‌سالهٔ چرت زدن';
  if (y < 60) return 'یک میان‌سال راحت که دیگر حوصلهٔ مزخرفات را ندارد';
  return 'یک سالمند محترم که همه‌چیز را دیده';
}

// Proper names + owner nicknames. English/Malay/Chinese keep the Latin names
// (fall through to the passed-in value); Persian renders them in Persian
// script. Owner decision per language: nicknames were kept English for ms/zh,
// but Persian pages read better with بابا / مامان etc.
const nameTr: Record<string, Record<string, string>> = {
  fa: { Picha: 'پیچا', Farah: 'فرح', Farzin: 'فرزین', Daddy: 'بابا', Mommy: 'مامان' },
};
export function localizeName(name: string, locale?: string): string {
  return (locale ? nameTr[locale]?.[name] : undefined) ?? name;
}

/** Locale-aware human-age line (English from picha.ts, others translated). */
export function humanAgeLineI18n(years: number, locale?: string): string {
  if (locale === 'ms') return humanAgeLineMs(years);
  if (locale === 'zh') return humanAgeLineZh(years);
  if (locale === 'fa') return humanAgeLineFa(years);
  return humanAgeLine(years);
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
  zh: {
    metaTitle: '猫龄 · Picha 🐾',
    metaDescription: 'Picha 换算成人类年龄是几岁？实时换算、猫咪生命阶段，以及适用于任何猫的换算器。',
    kicker: '工具 · 使用中',
    title: '猫龄换算器',
    blurb: '猫的时间起初过得飞快，之后稳定在每个生日约四个人类年。这是绒毛殿下目前所处的位置，外加一个适用于你认识的任何猫的换算器。',
    officialConversion: '· 官方换算 ·',
    humanYearsOld: '岁（人类年龄）',
    inCatTimePre: '（换算成猫龄），也就是说 ',
    inCatTimePost: '。',
    stagesLabel: '九条命行程表',
    stages: [
      { name: '幼猫', range: '0 至 6 个月', blurb: '最纯粹形态的混乱。一切都是猎物，包括脚。' },
      { name: '少年', range: '6 个月至 2 岁', blurb: '体型已成年，判断力却像青少年。每条家规都要被试探两遍。' },
      { name: '壮年', range: '2 至 6 岁', blurb: '猫生巅峰：魅力最大，忍耐最少。' },
      { name: '成熟', range: '6 至 10 岁', blurb: '高管岁月。小睡就是开会；开会就是小睡。' },
      { name: '年长', range: '10 至 14 岁', blurb: '优雅而不为所动。员工继续待命。' },
      { name: '高龄', range: '14 岁以上', blurb: '传奇级别。家里的每一缕阳光都已被预订。' },
    ],
    sheIsHere: '她在这里',
    stagesFootnote: '这是第一条命的官方路线。其余八条预计沿用同一份行程表。',
    convertLabel: '换算任意猫',
    convertHint: '滑动到它的猫龄',
    presetLabels: ['2个月', '6个月', '1岁', '5岁', '10岁', '15岁'],
    pichaNow: 'Picha，现在',
    catTime: '猫的时间',
    humanTime: '人类时间',
    years: '岁',
    thatCatIsPre: '这只猫',
    thatCatIsPost: '。',
    converterFootnote:
      '常见的兽医经验法则：第一年算 15，第二年到 24，之后每年增加约四。幼猫的月份是根据标准图表插值得出的。仅供炫耀，不作医疗决定之用。',
    unit: { month: '个月', months: '个月', year: '岁', years: '岁' },
  },
  fa: {
    metaTitle: 'سال گربه · Picha 🐾',
    metaDescription: 'Picha به سال انسانی چند ساله است؟ تبدیل زنده، مراحل زندگی گربه، و مبدلی برای هر گربه.',
    kicker: 'ابزارها · در حال خدمت',
    title: 'مبدل سال گربه',
    blurb: 'زمان گربه اول سریع می‌گذرد، بعد روی حدود چهار سال انسانی در هر تولد ثابت می‌شود. اینجا جایگاه علیاحضرت پشمالوست، به‌همراه مبدلی برای هر گربه‌ای که می‌شناسید.',
    officialConversion: '· تبدیل رسمی ·',
    humanYearsOld: 'ساله (به سال انسانی)',
    inCatTimePre: '؛ یعنی ',
    inCatTimePost: ' است.',
    stagesLabel: 'برنامه‌ی سفرِ نه‌جان',
    stages: [
      { name: 'بچه‌گربه', range: '۰ تا ۶ ماه', blurb: 'آشوب در ناب‌ترین شکلش. همه‌چیز طعمه است، از جمله پاها.' },
      { name: 'نوجوان', range: '۶ ماه تا ۲ سال', blurb: 'اندازه‌ی کامل، قضاوت نوجوانانه. هر قانون خانه دو بار آزمایش می‌شود.' },
      { name: 'اوج', range: '۲ تا ۶ سال', blurb: 'گربه در اوج: بیشترین جذابیت، کمترین تحمل.' },
      { name: 'پخته', range: '۶ تا ۱۰ سال', blurb: 'سال‌های مدیریتی. چرت‌ها جلسه‌اند؛ جلسه‌ها چرت.' },
      { name: 'سالخورده', range: '۱۰ تا ۱۴ سال', blurb: 'باوقار و بی‌خیال. کارکنان همچنان در خدمت‌اند.' },
      { name: 'کهنسال', range: '۱۴ سال به بالا', blurb: 'در حد افسانه. هر نور آفتابِ خانه رزرو شده است.' },
    ],
    sheIsHere: 'او اینجاست',
    stagesFootnote: 'مسیر رسمی برای جانِ اول. انتظار می‌رود هشت جانِ دیگر از همین برنامه استفاده کنند.',
    convertLabel: 'تبدیل هر گربه',
    convertHint: 'برای سنِ او به سال گربه بلغزانید',
    presetLabels: ['۲ ماه', '۶ ماه', '۱ سال', '۵ سال', '۱۰ سال', '۱۵ سال'],
    pichaNow: 'پیچا، اکنون',
    catTime: 'زمان گربه',
    humanTime: 'زمان انسان',
    years: 'سال',
    thatCatIsPre: 'این گربه ',
    thatCatIsPost: ' است.',
    converterFootnote:
      'قاعده‌ی سرانگشتیِ رایج دامپزشکی: سال اول ۱۵ حساب می‌شود، سال دوم به ۲۴ می‌رسد، و هر سال بعد حدود چهار اضافه می‌کند. ماه‌های بچه‌گربگی از روی نمودار استاندارد درون‌یابی می‌شود. برای فخرفروشی، نه برای تصمیم‌های پزشکی.',
    unit: { month: 'ماه', months: 'ماه', year: 'سال', years: 'سال' },
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

const signalZh: Record<string, SignalText> = {
  // Ears
  'ear-forward': { title: '朝前', mood: '好奇又友好', detail: '耳朵竖起并朝前转。她投入而感兴趣；正是打招呼的好时机。' },
  'ear-neutral': { title: '放松／自然', mood: '平静又满足', detail: '耳朵直立放松，松松地朝前。王国一切安好：舒适、平静、自在。' },
  'ear-swiveling': { title: '转动', mood: '正在聆听', detail: '耳朵像小卫星天线一样转动，追踪声音。警觉地观察四周，并非不悦。' },
  'ear-sideways': { title: '侧向（飞机模式）', mood: '过度刺激', detail: '耳朵朝两侧转开，像小翅膀。不确定、恼火或受够了；温和的信号，该退一步了。' },
  'ear-slightly-back': { title: '略微后倒', mood: '被惹恼', detail: '耳朵稍稍后倒。谨慎且有点恼火，正在权衡要不要反应。给她一点时间。' },
  'ear-flat': { title: '紧贴头部', mood: '给她空间', detail: '耳朵紧贴头部以保护它们。真正压力下的恐惧或防御性攻击。别伸手过去；让她自己冷静下来。' },
  'ear-one-ear-back': { title: '一只耳朵后转', mood: '一心多用', detail: '一只耳朵朝前，一只后转，同时追踪两件事（常是她身后的动静）。略微戒备。' },
  'ear-high-tall': { title: '又高又直', mood: '高度警戒', detail: '耳朵竖到最高，笔直向上。非常警觉、紧绷，锁定在她认定重要的东西上。' },
  'ear-low-wide': { title: '低而外张', mood: '焦虑', detail: '耳朵放低并向两侧张开。担忧、感到受威胁，但并不想打架。安抚她，别围堵。' },
  'ear-predatory': { title: '猎手专注', mood: '正在狩猎', detail: '耳朵朝前锁定，整张脸都在专注。全狩猎模式：高度集中，随时准备扑（最好扑向玩具）。' },
  'ear-sleepy': { title: '满足又困倦', mood: '幸福陶醉', detail: '打盹时耳朵松弛、微微转动。深度放松、舒适又安全。满足的巅峰。' },
  'ear-hissing': { title: '攻击性／嘶叫', mood: '退后', detail: '张着嘴，耳朵后倒，警告已发出。她感到受威胁，正叫你走开。尊重它，给她空间。' },
  // Eyes
  'eye-neutral': { title: '放松／自然', mood: '平静又满足', detail: '眼睛睁开放松，瞳孔是正常的杏仁形。一切安好：舒适、满足、自在。打招呼的好时机。' },
  'eye-sleepy': { title: '柔和／困倦', mood: '困倦又安心', detail: '眼皮低垂柔和，休息时半闭。深度放松并感到安全。让她慢慢睡去；这是真正的信任。' },
  'eye-dilated': { title: '瞳孔放大／兴奋', mood: '兴奋／亢奋', detail: '瞳孔又大又圆。兴奋、爱玩或亢奋，不过瞳孔放大也可能表示害怕，所以也要看她的耳朵和身体。只要气氛轻松，玩耍无妨。' },
  'eye-alert': { title: '感兴趣／警觉', mood: '好奇又投入', detail: '眼睛睁开，瞳孔中等大小，目光盯着某物。好奇且全神贯注，把一切都收入眼底。' },
  'eye-narrowed': { title: '眯起／专注', mood: '锁定专注', detail: '瞳孔收成专注的一条线，目光稳定。在权衡局势时坚定而自信。让她自己想清楚。' },
  'eye-very-narrow': { title: '非常细／烦躁', mood: '过度刺激', detail: '瞳孔收成细缝。恼火、过度刺激，或者只是身处强光下。若气氛紧张，就少些打扰，给她喘息的空间。' },
  'eye-suspicious': { title: '怀疑／谨慎', mood: '警惕观察', detail: '眼睛半眯，仔细观察。不确定，正在确认是否安全。慢慢来，让她自己拿主意。' },
  'eye-round': { title: '圆睁／惊讶', mood: '受惊', detail: '眼睛突然睁得又大又圆。有突发状况让她措手不及，现在处于警戒。给她一点时间看清没事。' },
  'eye-unequal': { title: '瞳孔不等大', mood: '留意她', detail: '一只瞳孔比另一只大。在昏暗或变化的光线下可能正常，但若持续，或伴随眯眼、用爪抓眼，或她看起来不对劲，请联系兽医。' },
  'eye-slow-blink': { title: '缓慢眨眼', mood: '我信任你', detail: '一个缓慢慵懒、停顿片刻的眨眼。她在表示信任你、感到安全。回她一个缓慢眨眼；这是猫给出的最高赞美。' },
  'eye-wide-eyed': { title: '睁大／恐惧', mood: '害怕', detail: '眼睛睁得极大，通常瞳孔放大，身体紧绷。害怕、感到受威胁，在找出路。别围堵或逼到角落；给她空间和一条明确的退路。' },
  'eye-closed': { title: '眨眼／闭眼', mood: '深度放松', detail: '眼睛闭上，脸部柔和平顺。非常放松而信任，或在把世界屏蔽掉休息。别打扰她。' },
  // Tail
  'tail-held-high': { title: '高高竖起', mood: '自信', detail: '尾巴像旗杆一样笔直竖起。自信、快乐、对世界很满意。打招呼的好时机。' },
  'tail-upright-curved': { title: '竖起而尖端弯曲', mood: '友好问候', detail: '尾巴竖起，尖端带一个小钩，就像友好的问号。她最热情的问候：她很高兴见到你。' },
  'tail-gentle-curve': { title: '轻柔弯曲', mood: '满足', detail: '尾巴竖起，呈柔和轻松的弧线。满足又舒适，悠闲地度过一天。' },
  'tail-horizontal': { title: '水平', mood: '好奇', detail: '尾巴笔直伸在身后。警觉又好奇，在决定行动前先掂量一下。' },
  'tail-low-relaxed': { title: '低垂／放松', mood: '自在', detail: '尾巴放得低而松。平静而中性。尾巴低垂也可能表示谨慎，所以要结合她的耳朵和身体一起看。' },
  'tail-tucked': { title: '收拢', mood: '不安', detail: '尾巴向下卷起、紧紧收拢。焦虑、不确定或感到渺小。别围堵她；慢慢来，让她安定下来。' },
  'tail-puffed-up': { title: '炸毛', mood: '受惊', detail: '尾巴炸成瓶刷状。害怕并试图让自己显得更大。有东西惊吓了她；给她空间直到她冷静。' },
  'tail-puffed-curve': { title: '炸毛并弓背', mood: '防御', detail: '瓶刷尾配上拱起的背，就是万圣节猫的姿势。高度亢奋且防御。退后，让这一刻过去。' },
  'tail-flicking': { title: '甩动', mood: '被惹恼', detail: '尾巴左右摆动。恼火、被惹恼或受够了。明确的信号，在她真正受不了之前退一步。' },
  'tail-tip-twitching': { title: '尖端抽动', mood: '专注', detail: '只有尾尖抽动，其余保持不动。专注而集中，常在狩猎中。投入，并非不悦。' },
  'tail-wrapped': { title: '缠绕身体', mood: '惬意', detail: '尾巴整齐地缠绕在自己身上。放松又惬意，保暖且自成一体。满足的巅峰。' },
  'tail-thumping': { title: '拍打', mood: '退后', detail: '尾巴拍打地面。非常恼火，警告你退后。停下，给她空间。' },
};

const signalFa: Record<string, SignalText> = {
  // Ears
  'ear-forward': { title: 'رو به جلو', mood: 'کنجکاو و دوستانه', detail: 'گوش‌ها بالا و رو به جلو چرخیده. درگیر و علاقه‌مند است؛ لحظه‌ی خوبی برای سلام.' },
  'ear-neutral': { title: 'آرام / معمولی', mood: 'آرام و راضی', detail: 'گوش‌ها راست و رها، شل رو به جلو. در قلمرو همه‌چیز خوب است: راحت، آرام و آسوده.' },
  'ear-swiveling': { title: 'در حال چرخش', mood: 'در حال گوش دادن', detail: 'گوش‌ها مثل بشقاب‌های ماهواره‌ی کوچک می‌چرخند تا صدایی را دنبال کنند. هوشیار و در حال رصد، نه ناراحت.' },
  'ear-sideways': { title: 'به پهلو (حالت هواپیما)', mood: 'بیش‌ازحد تحریک‌شده', detail: 'گوش‌ها مثل بال‌های کوچک به طرفین چرخیده. مردد، دلخور یا خسته؛ نشانه‌ای ملایم برای عقب کشیدن.' },
  'ear-slightly-back': { title: 'کمی به عقب', mood: 'دلخور', detail: 'گوش‌ها کمی به عقب خم شده. محتاط و کمی دلخور، در حال سنجش واکنش. کمی به او مهلت دهید.' },
  'ear-flat': { title: 'صاف چسبیده به سر', mood: 'به او فضا بدهید', detail: 'گوش‌ها برای محافظت صاف به سر چسبیده‌اند. ترس یا پرخاشگری تدافعی زیر فشار واقعی. دست نزنید؛ بگذارید خودش آرام شود.' },
  'ear-one-ear-back': { title: 'یک گوش به عقب', mood: 'چندکاره', detail: 'یک گوش جلو، یک گوش به عقب، هم‌زمان دو چیز را دنبال می‌کند (اغلب چیزی پشت سرش). کمی گوش‌به‌زنگ.' },
  'ear-high-tall': { title: 'بلند و راست', mood: 'کاملاً گوش‌به‌زنگ', detail: 'گوش‌ها در بیشترین ارتفاع، کاملاً راست. بسیار هوشیار و تیز، قفل‌شده روی چیزی که مهم تشخیص داده.' },
  'ear-low-wide': { title: 'پایین و باز', mood: 'مضطرب', detail: 'گوش‌ها پایین و به طرفین باز. نگران و احساس تهدید، اما دنبال دعوا نیست. آرامش دهید، شلوغ نکنید.' },
  'ear-predatory': { title: 'تمرکز شکاری', mood: 'در حال شکار', detail: 'گوش‌ها جلو و قفل، تمام صورت متمرکز. حالت شکار کامل: تمرکز شدید، آماده‌ی پرش (ترجیحاً روی اسباب‌بازی).' },
  'ear-sleepy': { title: 'راضی و خواب‌آلود', mood: 'غرق در سعادت', detail: 'گوش‌ها هنگام چرت رها و کمی چرخیده. عمیقاً آرام، راحت و امن. اوج رضایت.' },
  'ear-hissing': { title: 'پرخاشگر / فش‌فش', mood: 'عقب بایست', detail: 'دهان باز، گوش‌ها به عقب، هشدار صادر شد. احساس تهدید می‌کند و می‌گوید دور بمان. احترام بگذارید و فضا بدهید.' },
  // Eyes
  'eye-neutral': { title: 'آرام / معمولی', mood: 'آرام و راضی', detail: 'چشم‌ها باز و رها، مردمک به‌شکل بادامی عادی. همه‌چیز خوب است: راحت، راضی و آسوده. لحظه‌ی خوبی برای سلام.' },
  'eye-sleepy': { title: 'نرم / خواب‌آلود', mood: 'خواب‌آلود و امن', detail: 'پلک‌ها پایین و نرم، چشم‌ها هنگام استراحت نیمه‌بسته. عمیقاً آرام و در امنیت. بگذارید بخوابد؛ این اعتماد واقعی است.' },
  'eye-dilated': { title: 'گشاد / هیجان‌زده', mood: 'هیجان‌زده / برانگیخته', detail: 'مردمک‌ها کاملاً گشاد و گرد. هیجان‌زده، بازیگوش یا برانگیخته، هرچند مردمک گشاد می‌تواند نشان ترس هم باشد، پس گوش‌ها و بدنش را هم بخوانید. تا وقتی حال‌وهوا سبک است، بازی اشکالی ندارد.' },
  'eye-alert': { title: 'علاقه‌مند / هوشیار', mood: 'کنجکاو و درگیر', detail: 'چشم‌ها باز، مردمک متوسط، نگاه خیره روی چیزی. کنجکاو و ذهناً درگیر، همه‌چیز را می‌گیرد.' },
  'eye-narrowed': { title: 'باریک / متمرکز', mood: 'قفل روی هدف', detail: 'مردمک‌ها به خطی متمرکز کشیده، نگاه ثابت. مصمم و مطمئن در حین سنجش. بگذارید خودش حلش کند.' },
  'eye-very-narrow': { title: 'بسیار باریک / بی‌قرار', mood: 'بیش‌ازحد تحریک‌شده', detail: 'مردمک‌ها به شکافی نازک. دلخور، بیش‌ازحد تحریک‌شده، یا فقط زیر نور شدید. اگر حال‌وهوا تنش دارد، از سروصدا کم کنید و به او فرصت نفس دهید.' },
  'eye-suspicious': { title: 'مشکوک / محتاط', mood: 'محتاط و در حال تماشا', detail: 'چشم‌ها نیمه‌باریک، با دقت تماشا می‌کند. مطمئن نیست و در حال بررسیِ امن بودن اوضاع. آهسته حرکت کنید و بگذارید خودش تصمیم بگیرد.' },
  'eye-round': { title: 'گرد / غافلگیر', mood: 'یکه‌خورده', detail: 'چشم‌ها ناگهان گشاد و گرد. چیزی ناگهانی غافلگیرش کرده و حالا گوش‌به‌زنگ است. کمی مهلت دهید تا ببیند چیزی نیست.' },
  'eye-unequal': { title: 'مردمک‌های نابرابر', mood: 'حواستان به او باشد', detail: 'یک مردمک بزرگ‌تر از دیگری. در نور کم یا در حال تغییر می‌تواند طبیعی باشد، اما اگر ادامه یافت، یا با تنگی چشم، پنجه کشیدن به چشم، یا بدحالی همراه شد، با دامپزشک تماس بگیرید.' },
  'eye-slow-blink': { title: 'پلک آهسته', mood: 'به تو اعتماد دارم', detail: 'یک پلک آهسته و تنبل که لحظه‌ای نگه‌داشته می‌شود. طرز گفتنش که به شما اعتماد دارد و احساس امنیت می‌کند. با پلک آهسته پاسخ دهید؛ بالاترین تعریفی است که یک گربه می‌کند.' },
  'eye-wide-eyed': { title: 'چشم‌گشاد / ترسیده', mood: 'ترسیده', detail: 'چشم‌ها کاملاً گشاد، معمولاً با مردمک بزرگ، بدن منقبض. ترسیده و احساس تهدید، دنبال راه فرار. شلوغش نکنید و در تنگنا قرارش ندهید؛ فضا و یک راه خروجِ روشن بدهید.' },
  'eye-closed': { title: 'پلک / چشم بسته', mood: 'عمیقاً آرام', detail: 'چشم‌ها بسته، صورت نرم و آرام. بسیار آرام و بااعتماد، یا در حال کنار گذاشتن دنیا برای استراحت. تنهایش بگذارید.' },
  // Tail
  'tail-held-high': { title: 'بالا نگه‌داشته', mood: 'مطمئن', detail: 'دم مثل میله‌ی پرچم صاف بالا. مطمئن، شاد و راضی از دنیا. لحظه‌ی خوبی برای سلام.' },
  'tail-upright-curved': { title: 'راست با نوکِ خمیده', mood: 'سلام دوستانه', detail: 'دم بالا با قلابی کوچک در نوک، علامت سؤالِ دوستانه. گرم‌ترین سلامش: از دیدن شما خوشحال است.' },
  'tail-gentle-curve': { title: 'خمِ ملایم', mood: 'راضی', detail: 'دم بالا در قوسی نرم و آرام. راضی و راحت، در حال گذراندن روزش.' },
  'tail-horizontal': { title: 'افقی', mood: 'کنجکاو', detail: 'دم صاف پشت سرش کشیده. هوشیار و کنجکاو، پیش از اقدام در حال سنجش.' },
  'tail-low-relaxed': { title: 'پایین / آرام', mood: 'آسوده', detail: 'دم پایین و رها. آرام و خنثی. دمِ پایین می‌تواند احتیاط هم باشد، پس با گوش‌ها و بدنش بخوانید.' },
  'tail-tucked': { title: 'جمع‌شده', mood: 'ناامن', detail: 'دم به پایین خمیده و محکم جمع‌شده. مضطرب، مردد یا احساس کوچکی. شلوغش نکنید؛ آهسته پیش بروید و بگذارید آرام بگیرد.' },
  'tail-puffed-up': { title: 'باد‌کرده', mood: 'وحشت‌زده', detail: 'دم مثل بُرسِ شیشه باد کرده. ترسیده و در تلاش برای بزرگ‌تر دیده شدن. چیزی ترساندش؛ تا آرام شود فضا بدهید.' },
  'tail-puffed-curve': { title: 'باد‌کرده با قوس', mood: 'تدافعی', detail: 'دمِ بُرس‌مانند روی پشتِ قوس‌دار، ژست گربه‌ی هالووین. به‌شدت برانگیخته و تدافعی. عقب بکشید و بگذارید این لحظه بگذرد.' },
  'tail-flicking': { title: 'تکان تند', mood: 'دلخور', detail: 'دم از این‌طرف به آن‌طرف تکان می‌خورد. دلخور، عصبی یا خسته. نشانه‌ای روشن برای عقب کشیدن پیش از آنکه واقعاً تمام کند.' },
  'tail-tip-twitching': { title: 'لرزشِ نوک', mood: 'متمرکز', detail: 'فقط نوک دم می‌جنبد و بقیه بی‌حرکت است. متمرکز و در حال تمرکز، اغلب وسط شکار. درگیر، نه ناراحت.' },
  'tail-wrapped': { title: 'پیچیده دورِ خود', mood: 'دنج', detail: 'دم مرتب دور خودش پیچیده. آرام و دنج، گرم و خودکفا. اوج رضایت.' },
  'tail-thumping': { title: 'کوبیدن', mood: 'عقب بایست', detail: 'دم به زمین می‌کوبد. بسیار دلخور و هشدار می‌دهد که عقب بکشید. بایستید و به او فضا بدهید.' },
};

const signalTr: Record<string, Record<string, SignalText>> = { ms: signalMs, zh: signalZh, fa: signalFa };

/** Return a signal with prose in the active locale (English passes through). */
export function localizeSignal(part: string, s: BodySignal, locale?: string): BodySignal {
  const o = locale ? signalTr[locale]?.[`${part}-${s.id}`] : undefined;
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
  zh: {
    metaTitle: '解读 Picha · Picha 🐾',
    metaDescription: 'Picha 肢体语言实地指南：她的信号意味着什么，以及该如何回应。',
    kicker: '猫对人',
    title: '解读 Picha',
    blurb: '她不出声也能说很多。这里教你如何解读绒毛殿下，以及如何在她不得不重复之前就回应。',
    bodyPartLabel: '身体部位',
    segments: [
      {
        id: 'ears',
        label: '耳朵',
        noun: '耳朵',
        notes: [
          '一张照片留不住的：耳朵快速抖动或抽动。通常只是单纯的烦躁（或有只苍蝇飞过）；若伴随甩头或抓挠，检查一下她的耳朵。',
          '当信号说该退一步或给她空间时，善意的做法正是如此：不伸手、不抱起。让她自己回到你身边。',
        ],
      },
      {
        id: 'eyes',
        label: '眼睛',
        noun: '眼睛',
        notes: [
          '两件静态照片无法呈现的：坚定不眨的凝视（一种挑战，所以移开视线，别回瞪）以及第三眼睑滑过内眼角（常是疲倦，有时是生病）。',
          '眼睛也是健康的信号。瞳孔不等大且无法恢复、突然浑浊、发红或流泪的眼睛、持续眯眼，或用爪抓某只眼睛，这些要看兽医，而不是情绪。',
        ],
      },
      {
        id: 'tails',
        label: '尾巴',
        noun: '尾巴',
        notes: [
          '静态照片无法呈现动作，而动作是信息的一半：快速抽打的含义远超缓慢摆动。尾巴低垂可以理解为平静或谨慎，所以务必结合她的耳朵、眼睛和姿势一起看。',
          '当她的尾巴说退后（炸毛、拍打、用力甩动），就照字面理解：停下手中的动作，给她空间，让她重新平复。',
        ],
      },
    ],
  },
  fa: {
    metaTitle: 'خواندنِ Picha · Picha 🐾',
    metaDescription: 'راهنمای میدانیِ زبان بدن Picha: نشانه‌هایش چه معنایی دارند و چطور پاسخ دهید.',
    kicker: 'گربه به انسان',
    title: 'خواندنِ Picha',
    blurb: 'او بی هیچ صدایی حرف‌های زیادی می‌زند. اینجا یاد می‌گیرید چطور علیاحضرت پشمالو را بخوانید، و چطور پیش از آنکه مجبور به تکرار شود پاسخ دهید.',
    bodyPartLabel: 'بخش بدن',
    segments: [
      {
        id: 'ears',
        label: 'گوش‌ها',
        noun: 'گوش‌ها',
        notes: [
          'چیزی که عکس ثبتش نمی‌کند: تکان یا لرزش سریع گوش. معمولاً فقط کلافگی است (یا مگسی که رد می‌شود)؛ اگر با تکان دادن سر یا خاراندن همراه شد، گوش‌هایش را بررسی کنید.',
          'وقتی نشانه‌ها می‌گویند عقب بکش یا فضا بده، کار مهربانانه دقیقاً همان است: دست نزنید، بغل نکنید. بگذارید خودش به‌سویتان برگردد.',
        ],
      },
      {
        id: 'eyes',
        label: 'چشم‌ها',
        noun: 'چشم‌ها',
        notes: [
          'دو چیزی که عکس ثابت نشان نمی‌دهد: خیره‌ی سفت و بی‌پلک (یک چالش، پس نگاه بردارید و متقابلاً خیره نشوید) و پلک سوم که از گوشه‌ی داخلی چشم رد می‌شود (اغلب خستگی، گاهی بیماری).',
          'چشم‌ها نشانه‌ی سلامت هم هستند. مردمک‌های نابرابر که برطرف نمی‌شوند، چشمِ ناگهان کدر، قرمز یا اشک‌ریز، تنگیِ مداوم چشم، یا پنجه کشیدن به یک چشم یعنی تماس با دامپزشک، نه یک حال‌وهوا.',
        ],
      },
      {
        id: 'tails',
        label: 'دم',
        noun: 'دم',
        notes: [
          'عکس ثابت حرکت را نشان نمی‌دهد، و حرکت نیمی از پیام است: تکانِ تند بسیار بیشتر از تابِ آهسته معنا دارد. دمِ پایین می‌تواند آرام یا محتاط خوانده شود، پس همیشه آن را با گوش‌ها، چشم‌ها و حالت بدنش بسنجید.',
          'وقتی دمش می‌گوید عقب بایست (باد‌کرده، کوبیدن، تکانِ محکم)، همان را باور کنید: کاری که می‌کنید متوقف کنید، فضا بدهید، و بگذارید دوباره آرام بگیرد.',
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
const careZh: CareCopy = {
  metaTitle: '照护 · Picha 🐾',
  metaDescription: 'Picha 的日常照护指南：她的例行任务和梳理。',
  kicker: '日常照护',
  title: '与 Picha 的一天',
  blurb:
    '服侍 Picha 是一份全职工作：周末无休，福利以呼噜声支付。从上到下完成今天的例行任务；她在记分。',
  roundsLabel: '今日例行',
  praise: '所有例行任务已完成。管理层很满意，将据此安排小睡。',
  checklist: {
    water: { label: '加满饮水机', hint: '添满水箱；饮水机会自己运转' },
    'meals-1': { label: '湿粮服务', hint: '第一餐，约上午 10 点；把她剩下的猫粮拌进去' },
    'litter-1': { label: '铲猫砂', hint: '早班；她有她的标准' },
    combing: { label: '每日梳毛', hint: '两侧都要；她会自己转身' },
    eyes: { label: '擦眼睛和脸', hint: '用宠物湿巾擦拭眼睛和下巴周围' },
    'play-hunt': { label: '狩猎时段', hint: '10–15 分钟逗猫棒值勤' },
    academy: { label: '学院时段', hint: '一次简短的训练练习；见皇家学院' },
    'litter-mid': { label: '铲猫砂', hint: '午间检查，只有在有东西要清理时才做' },
    treat: { label: '零食，如果她赢得了', hint: '约下午 4 点，只有在赢得时才给；上限为她食物的 10%' },
    'meals-2': { label: '湿粮服务', hint: '第二餐，约晚上 9:30 熄灯前' },
    'play-ball': { label: '球类时段', hint: '扔球；让她追逐和扑抓' },
    'litter-2': { label: '铲猫砂', hint: '晚班，保持五星水准' },
    cuddle: { label: '腿上撒娇时间', hint: '强制性的关爱审核；何时结束由她决定' },
    lockup: { label: '夜间锁门', hint: '关好窗户和阳台，别留下任何危险物品' },
  },
  menuLabel: '菜单',
  feeder: '喂食器',
  byHand: '手喂',
  meals: [
    { title: '早晨猫粮', detail: '喂食器按时投放她的第一餐；她看心情慢慢吃。' },
    { title: '湿粮，第一餐', detail: '她的五星大餐，手工奉上。早上剩下的猫粮会拌进去。' },
    { title: '午间猫粮', detail: '第二次自动投放，让一天的进食均匀。' },
    { title: '零食或奖励', detail: '下午的谈判，无论那双眼睛多有说服力，都控制在 10% 零食上限内。' },
    { title: '傍晚猫粮', detail: '一天中最后一次自动投放。' },
    { title: '湿粮，第二餐', detail: '睡前的宵夜，熄灯前奉上。之后不再进食，她睡个好觉。' },
  ],
  groomingLabel: '梳理',
  grooming: [
    { title: '每日梳毛', cadence: '每日', detail: '记录在案的工具是一把不锈钢梳，两侧都梳一遍，她像烤肉一样自己转身。长毛全靠它：防止打结，维持华丽。' },
    { title: '面部修整', cadence: '按需', detail: '用于眼睛和脸部的宠物湿巾，放在触手可及处，随时刷新造型。' },
    { title: '局部清洁', cadence: '按需', detail: 'YEGBONG 宠物干洗慕斯（免水），揉进毛发再刷开，主要用于下巴下方和任何胆敢弄脏的地方。' },
    { title: '洗澡', cadence: '很少', detail: '很少需要；每日梳毛已挑起大梁。偶尔洗一次澡或做一次专业水疗，需预约。' },
    { title: '指甲', cadence: '每 2–4 周', detail: '每 2–4 周用猫用指甲剪修一次：先前爪，后爪看她允许。最好趁她昏昏欲睡、最不想提出投诉时进行。' },
    { title: '牙齿', cadence: '每日', detail: '每天用 Histo Tree 猫用安全牙膏（牛肉味）刷一次，沿牙龈线每侧刷几秒。勉强被接受，换来随后的奖励。' },
  ],
  notes: {
    loading: '正在载入今天的例行任务…',
    offline: '离线：显示此设备保存的例行任务。',
    resetsNightly: '勾选每晚午夜重置。',
    sharedResets: '在员工的设备间共享；每晚午夜重置。',
    staffOnlyPre: '例行任务仅限员工。',
    signIn: '以员工身份登录',
    staffOnlyPost: '后即可勾选。',
    pinRejected: 'PIN 被拒绝。打开员工室重新输入。',
    savedLocal: '已保存在此设备；云端未响应。',
  },
};
const careFa: CareCopy = {
  metaTitle: 'مراقبت · Picha 🐾',
  metaDescription: 'راهنمای مراقبت روزانه‌ی Picha: کارهای روزمره و آراستنش.',
  kicker: 'مراقبت روزانه',
  title: 'یک روز با Picha',
  blurb:
    'خدمت به Picha یک شغل تمام‌وقت است: بدون تعطیلی آخر هفته، مزایا با خرخر پرداخت می‌شود. کارهای امروز را از بالا به پایین انجام دهید؛ او در حال امتیازدهی است.',
  roundsLabel: 'کارهای امروز',
  praise: 'همه‌ی کارها تمام شد. مدیریت راضی است و طبق آن چرت خواهد زد.',
  checklist: {
    water: { label: 'پر کردن آبشخور', hint: 'مخزن را پر کنید؛ آبشخور خودش کار می‌کند' },
    'meals-1': { label: 'سرو غذای مرطوب', hint: 'وعده‌ی اول، حدود ۱۰ صبح؛ هر خشکباری که مانده را مخلوط کنید' },
    'litter-1': { label: 'تمیز کردن خاک‌گربه', hint: 'نوبت صبح؛ او استانداردهایی دارد' },
    combing: { label: 'شانه‌ی روزانه', hint: 'هر دو طرف؛ خودش می‌چرخد' },
    eyes: { label: 'تمیز کردن چشم و صورت', hint: 'دستمال مرطوب حیوان دور چشم‌ها و چانه' },
    'play-hunt': { label: 'جلسه‌ی شکار', hint: '۱۰ تا ۱۵ دقیقه کار با اسباب‌بازی چوبی' },
    academy: { label: 'جلسه‌ی آکادمی', hint: 'یک تمرین کوتاه؛ به آکادمی سلطنتی مراجعه کنید' },
    'litter-mid': { label: 'تمیز کردن خاک‌گربه', hint: 'بررسی ظهر، فقط اگر چیزی برای تمیز کردن هست' },
    treat: { label: 'تنقلات، در صورت استحقاق', hint: 'حدود ۴ عصر، فقط وقتی سزاوار شد؛ سقف ۱۰٪ غذایش' },
    'meals-2': { label: 'سرو غذای مرطوب', hint: 'وعده‌ی دوم، حدود ۹:۳۰ شب پیش از خاموشیِ چراغ‌ها' },
    'play-ball': { label: 'جلسه‌ی توپ', hint: 'توپ را پرتاب کنید؛ بگذارید دنبال کند و بپرد' },
    'litter-2': { label: 'تمیز کردن خاک‌گربه', hint: 'نوبت شب برای حفظ کیفیت پنج‌ستاره' },
    cuddle: { label: 'وقتِ بغل و نوازش', hint: 'ممیزیِ اجباریِ محبت؛ پایانش را او تعیین می‌کند' },
    lockup: { label: 'قفل شبانه', hint: 'پنجره‌ها و بالکن بسته، هیچ چیز خطرناکی بیرون نمانده' },
  },
  menuLabel: 'منو',
  feeder: 'خودکار',
  byHand: 'با دست',
  meals: [
    { title: 'خشکبارِ صبح', detail: 'دستگاه وعده‌ی اولش را سرِ وقت می‌ریزد؛ هر وقت دلش خواست کم‌کم می‌خورد.' },
    { title: 'غذای مرطوب، وعده‌ی اول', detail: 'وعده‌ی پنج‌ستاره‌اش، با دست سرو می‌شود. هر خشکباری که از صبح مانده مخلوط می‌شود.' },
    { title: 'خشکبارِ ظهر', detail: 'دومین ریزشِ خودکار، که روز را یکنواخت سیر نگه می‌دارد.' },
    { title: 'تنقلات یا جایزه', detail: 'چانه‌زنیِ بعدازظهر، که هرچقدر آن چشم‌ها متقاعدکننده باشند در سقف ۱۰٪ تنقلات می‌ماند.' },
    { title: 'خشکبارِ عصر', detail: 'آخرین ریزشِ خودکارِ روز.' },
    { title: 'غذای مرطوب، وعده‌ی دوم', detail: 'آخرین وعده، پیش از خاموشیِ چراغ‌ها سرو می‌شود. بعد از آن چیزی نیست، می‌خوابد.' },
  ],
  groomingLabel: 'آراستن',
  grooming: [
    { title: 'شانه‌ی روزانه', cadence: 'روزانه', detail: 'ابزار رسمی یک شانه‌ی فولاد ضدزنگ است که هر دو طرف کشیده می‌شود در حالی که او مثل کباب می‌چرخد. پوشش بلندش به آن وابسته است: از گره جلوگیری می‌کند و شکوه را حفظ.' },
    { title: 'اصلاح صورت', cadence: 'در صورت نیاز', detail: 'دستمال مرطوب حیوان برای چشم‌ها و صورت، در دسترس برای هر وقت که ظاهر نیاز به تازگی داشت.' },
    { title: 'تمیزکاری موضعی', cadence: 'در صورت نیاز', detail: 'موس خشکشوییِ حیوان YEGBONG (بدون آب)، به پوست مالیده و شانه می‌شود، عمدتاً زیر چانه و هر جایی که جرئت کرده کثیف شود.' },
    { title: 'حمام', cadence: 'به‌ندرت', detail: 'به‌ندرت لازم است؛ شانه‌ی روزانه بار اصلی را می‌کشد. گاهی یک حمام یا یک روز اسپای حرفه‌ای، با وقت قبلی.' },
    { title: 'ناخن‌ها', cadence: 'هر ۲ تا ۴ هفته', detail: 'مانیکور هر ۲ تا ۴ هفته با ناخن‌گیر گربه: اول پنجه‌های جلو، پنجه‌های عقب به‌اندازه‌ای که اجازه دهد. بهترین زمان وقتی است که خواب‌آلود است و کمترین تمایل به ثبت شکایت را دارد.' },
    { title: 'دندان‌ها', cadence: 'روزانه', detail: 'مسواک روزانه با ژل دندان مخصوص گربه‌ی Histo Tree (طعم گوشت گاو)، چند ثانیه در هر طرف در امتداد خط لثه. به‌زور تحمل می‌شود، در ازای جایزه‌ای که در پی می‌آید.' },
  ],
  notes: {
    loading: 'در حال بارگذاری کارهای امروز…',
    offline: 'آفلاین: کارهای ذخیره‌شده‌ی این دستگاه نمایش داده می‌شود.',
    resetsNightly: 'تیک‌ها هر شب نیمه‌شب بازنشانی می‌شوند.',
    sharedResets: 'میان دستگاه‌های کارکنان به‌اشتراک گذاشته می‌شود؛ هر شب نیمه‌شب بازنشانی می‌شود.',
    staffOnlyPre: 'کارهای روزانه فقط برای کارکنان است. ',
    signIn: 'به‌عنوان کارمند وارد شوید',
    staffOnlyPost: ' تا آن‌ها را تیک بزنید.',
    pinRejected: 'آن پین رد شد. اتاق کارکنان را باز کنید و دوباره وارد کنید.',
    savedLocal: 'روی این دستگاه ذخیره شد؛ ابر پاسخ نداد.',
  },
};
export const careCopy: Record<string, CareCopy> = { en: careEn, ms: careMs, zh: careZh, fa: careFa };
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
  zh: {
    metaTitle: '健康 · Picha 🐾',
    metaDescription: 'Picha 的健康档案：体征、疫苗、看诊记录以及即将进行的事项。',
    kicker: '兽医与健康',
    title: '皇家健康档案',
    blurb:
      '从生日到加强针：每一次注射、称重和看诊，都由员工以强迫症般的细心归档。管理层审阅文书；管理层不做文书。',
    nextDue: '下一项',
    weight: '体重',
    targetPrefix: '目标',
    age: '年龄',
    ageSub: '约 1.5–2 岁成年',
    doctorsOrders: '医嘱',
    dueSoon: '即将到期',
    dueApprox: '预计 ~',
    overdue: '已逾期',
    segments: { upcoming: '即将进行', done: '记录', tobook: '待办清单' },
    timelineFilter: '时间线筛选',
    nextUp: '下一个',
    notStarted: '尚未开始',
    callVetIfTitle: '出现以下情况请联系兽医…',
    recentClinic: '最近的诊所',
    directions: '前往诊所的路线',
    recentCarePre: '最近的护理：',
    vetStatus: '正在面试兽医；尚未正式录用',
    callVetIf: [
      '约 24 小时不进食，或反复呕吐。',
      '在猫砂盆里用力却排不出，或一整天没有排尿。',
      '持续躲藏 + 弓背姿势 + 不吃东西（相对于她平时的进进出出）。',
      '呼吸费力或突然萎靡。',
    ],
    clinicalStatus: {
      Spayed: { label: '已绝育', value: '是', sub: '11 Jul 2026' },
      Microchip: { label: '芯片', value: '是', sub: '11 Jul 2026' },
      'Core vaccines': { label: '核心疫苗', value: 'FVRCP', sub: '系列已完成' },
    },
  },
  fa: {
    metaTitle: 'سلامتی · Picha 🐾',
    metaDescription: 'پرونده‌ی سلامت Picha: علائم حیاتی، واکسن‌ها، ویزیت‌های دامپزشکی و آنچه در پیش است.',
    kicker: 'دامپزشک و سلامت',
    title: 'پرونده‌ی سلامت سلطنتی',
    blurb:
      'از تولد تا واکسن‌های یادآور: هر تزریق، وزن‌کشی و ویزیت، با وسواس توسط کارکنان بایگانی شده. مدیریت کاغذبازی را بازبینی می‌کند؛ مدیریت کاغذبازی نمی‌کند.',
    nextDue: 'بعدی',
    weight: 'وزن',
    targetPrefix: 'هدف',
    age: 'سن',
    ageSub: 'بلوغ حدود ۱.۵ تا ۲ سالگی',
    doctorsOrders: 'دستور دکتر',
    dueSoon: 'به‌زودی موعد',
    dueApprox: 'حدود ',
    overdue: 'عقب‌افتاده',
    segments: { upcoming: 'در پیش', done: 'سوابق', tobook: 'فهرست کارها' },
    timelineFilter: 'فیلتر خط زمانی',
    nextUp: 'بعدی',
    notStarted: 'هنوز شروع نشده',
    callVetIfTitle: 'در این موارد با دامپزشک تماس بگیرید…',
    recentClinic: 'کلینیک اخیر',
    directions: 'مسیر به کلینیک',
    recentCarePre: 'مراقبت اخیر: ',
    vetStatus: 'در حال مصاحبه با دامپزشکان؛ هنوز استخدام دائم نشده',
    callVetIf: [
      'حدود ۲۴ ساعت غذا نخوردن، یا استفراغ مکرر.',
      'زور زدن در جعبه‌ی خاک، یا نبودِ ادرار در یک روز.',
      'پنهان شدنِ مداوم + حالتِ قوزکرده + بی‌اشتهایی (در مقایسه با رفت‌وآمد عادی‌اش).',
      'تنفس دشوار یا بی‌حالیِ ناگهانی.',
    ],
    clinicalStatus: {
      Spayed: { label: 'عقیم‌شده', value: 'بله', sub: '11 Jul 2026' },
      Microchip: { label: 'میکروچیپ', value: 'بله', sub: '11 Jul 2026' },
      'Core vaccines': { label: 'واکسن‌های اصلی', value: 'FVRCP', sub: 'سری کامل' },
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

const healthTextZh: Record<string, { title: string; detail: string }> = {
  'One tiny white cloud arrives, opens her amber eyes, and starts planning her staff structure.':
    { title: '一颗星诞生', detail: '一小朵白云降临，睁开她的琥珀色眼睛，开始筹划她的员工架构。' },
  'Felocell 4, first dose. Taken like a champ (allegedly).':
    { title: 'FVRCP 疫苗，第 1 剂', detail: 'Felocell 4，第一剂。据称打得像个冠军。' },
  'Felocell 4, second dose. Series complete.':
    { title: 'FVRCP 疫苗，第 2 剂', detail: 'Felocell 4，第二剂。系列完成。' },
  'Interviewed Farah & Farzin at the pet shop and hired both on the spot. No probation period; she does not do trial runs.':
    { title: '盛大的员工招聘', detail: '在宠物店面试了 Farah 和 Farzin，当场录用两人。没有试用期；她不搞试运行。' },
  'Revolution Plus applied. Fleas, ticks and worms: evicted.':
    { title: '寄生虫防治', detail: '已使用 Revolution Plus。跳蚤、蜱虫和蠕虫：驱逐出境。' },
  'Interior pest control, completed.':
    { title: '已驱虫', detail: '内部害虫防治，完成。' },
  'Both done in one visit. She billed the recovery time as spa leave.':
    { title: '绝育 + 芯片', detail: '一次看诊全部完成。她把恢复期记作水疗假。' },
  'The daily ORI-EAR + Oridermyl routine begins. Tolerated with visible disapproval.':
    { title: '耳部疗程开始', detail: '每日 ORI-EAR + Oridermyl 的常规开始。被接受了，但明显不满。' },
  'Full ORI-EAR + Oridermyl course done; ears cleared. Daily disapproval may now cease.':
    { title: '耳部疗程完成', detail: '完整的 ORI-EAR + Oridermyl 疗程结束；耳朵已康复。每日的不满现在可以停止了。' },
  'NexGard Combo spot-on applied at the base of the skull, her new monthly flea and tick guard. Revolution Plus retired.':
    { title: '寄生虫防治', detail: 'NexGard Combo 滴剂已滴于颅骨底部，是她新的每月跳蚤和蜱虫防护。Revolution Plus 已退役。' },
  'Required before any travel plans Her Fluffiness may approve.':
    { title: '狂犬病疫苗', detail: '在绒毛殿下可能批准的任何旅行计划之前都需要。' },
  'Optional. To discuss with whichever vet wins the job.':
    { title: 'FeLV 疫苗', detail: '可选。待与最终获聘的兽医讨论。' },
  'The official pet passport, still to be sorted for any future travel.':
    { title: '宠物护照', detail: '正式的宠物护照，仍待为将来的旅行办理。' },
  'NexGard Combo spot-on, parted onto the skin at the base of the skull (the back of the head), where she cannot lick it off. Fleas, ticks and ear mites, evicted. Monthly with a few days of grace, but never sooner than a month apart; a bit late is fine, too early risks a double dose.':
    { title: '寄生虫防治', detail: 'NexGard Combo 滴剂，拨开毛发滴在颅骨底部（后脑勺）的皮肤上，那里她舔不到。跳蚤、蜱虫和耳螨，驱逐出境。每月一次，可宽限几天，但绝不早于一个月；稍晚无妨，太早有双倍剂量的风险。' },
  'A separate dewormer on the standard adult schedule (the spot-on does not replace it): a pill, smuggled in inside something delicious and served without ceremony.':
    { title: '驱虫', detail: '按标准成年计划单独驱虫（滴剂不能替代它）：一粒药丸，藏在某种美味里，不动声色地奉上。' },
  'The full salon treatment: bath, blow-dry and a top-to-tail tidy-up, so the resident cloud stays soft and photogenic.':
    { title: '梳理与水疗日', detail: '全套沙龙护理：洗澡、吹干和从头到尾的整理，让这朵常驻的云保持柔软上镜。' },
  'A full scrub and a complete change of litter; the royal facilities restored to five stars.':
    { title: '猫砂盆深度清洁', detail: '彻底刷洗并全部更换猫砂；皇家设施恢复五星水准。' },
  'The once-a-year, nose-to-tail service: full exam, weight check and an audience with the royal teeth.':
    { title: '年度全面检查', detail: '一年一度、从鼻到尾的服务：全面检查、称重，以及觐见皇家牙齿。' },
  'Felocell 4, the yearly top-up that keeps the core feline viruses on their side of the palace gates.':
    { title: 'FVRCP 加强针', detail: 'Felocell 4，每年一次的补充，把核心猫病毒挡在宫门之外。' },
  'Front paws first, back paws only with royal consent. Management files a formal complaint every time, then submits to the clippers.':
    { title: '修剪指甲', detail: '先前爪，后爪只有在获得皇家同意时。管理层每次都正式投诉，然后向指甲剪屈服。' },
};
const everyLabelZh: Record<string, string> = {
  'Every month': '每月',
  'Every 3 months': '每 3 个月',
  'Every 2 months': '每 2 个月',
  'Every year': '每年',
  'Every 2–4 weeks': '每 2–4 周',
};
const whereZh: Record<string, string> = {
  'at home': '在家',
  'at the vet': '在诊所',
  'at the salon': '在美容院',
};

const healthTextFa: Record<string, { title: string; detail: string }> = {
  'One tiny white cloud arrives, opens her amber eyes, and starts planning her staff structure.':
    { title: 'یک ستاره متولد شد', detail: 'یک ابر کوچک سفید از راه می‌رسد، چشمان کهربایی‌اش را باز می‌کند، و شروع به برنامه‌ریزیِ ساختار کارکنانش می‌کند.' },
  'Felocell 4, first dose. Taken like a champ (allegedly).':
    { title: 'واکسن FVRCP، دوز ۱', detail: 'Felocell 4، دوز اول. مثل یک قهرمان تحمل کرد (ظاهراً).' },
  'Felocell 4, second dose. Series complete.':
    { title: 'واکسن FVRCP، دوز ۲', detail: 'Felocell 4، دوز دوم. سری کامل شد.' },
  'Interviewed Farah & Farzin at the pet shop and hired both on the spot. No probation period; she does not do trial runs.':
    { title: 'استخدام بزرگِ کارکنان', detail: 'در فروشگاه حیوانات با فرح و فرزین مصاحبه کرد و هر دو را همان‌جا استخدام کرد. بدون دوره‌ی آزمایشی؛ او دوره‌ی آزمایشی ندارد.' },
  'Revolution Plus applied. Fleas, ticks and worms: evicted.':
    { title: 'کنترل انگل', detail: 'Revolution Plus استفاده شد. کک، کنه و کرم‌ها: اخراج شدند.' },
  'Interior pest control, completed.':
    { title: 'کرم‌زدایی شد', detail: 'کنترل آفات داخلی، انجام شد.' },
  'Both done in one visit. She billed the recovery time as spa leave.':
    { title: 'عقیم‌سازی + میکروچیپ', detail: 'هر دو در یک ویزیت انجام شد. او زمان بهبودی را به‌عنوان مرخصیِ اسپا حساب کرد.' },
  'The daily ORI-EAR + Oridermyl routine begins. Tolerated with visible disapproval.':
    { title: 'شروع دوره‌ی درمان گوش', detail: 'روال روزانه‌ی ORI-EAR + Oridermyl آغاز می‌شود. با نارضایتیِ آشکار تحمل شد.' },
  'Full ORI-EAR + Oridermyl course done; ears cleared. Daily disapproval may now cease.':
    { title: 'پایان دوره‌ی درمان گوش', detail: 'دوره‌ی کامل ORI-EAR + Oridermyl تمام شد؛ گوش‌ها بهبود یافت. نارضایتیِ روزانه اکنون می‌تواند متوقف شود.' },
  'NexGard Combo spot-on applied at the base of the skull, her new monthly flea and tick guard. Revolution Plus retired.':
    { title: 'کنترل انگل', detail: 'قطره‌ی موضعی NexGard Combo روی پایه‌ی جمجمه استفاده شد، محافظِ ماهانه‌ی جدیدِ کک و کنه‌اش. Revolution Plus بازنشسته شد.' },
  'Required before any travel plans Her Fluffiness may approve.':
    { title: 'واکسن هاری', detail: 'پیش از هر برنامه‌ی سفری که علیاحضرت پشمالو تأیید کند لازم است.' },
  'Optional. To discuss with whichever vet wins the job.':
    { title: 'واکسن FeLV', detail: 'اختیاری. برای بحث با دامپزشکی که کار را می‌گیرد.' },
  'The official pet passport, still to be sorted for any future travel.':
    { title: 'پاسپورت حیوان', detail: 'پاسپورت رسمیِ حیوان، هنوز برای هر سفرِ آینده باید سروسامان بگیرد.' },
  'NexGard Combo spot-on, parted onto the skin at the base of the skull (the back of the head), where she cannot lick it off. Fleas, ticks and ear mites, evicted. Monthly with a few days of grace, but never sooner than a month apart; a bit late is fine, too early risks a double dose.':
    { title: 'کنترل انگل', detail: 'قطره‌ی موضعی NexGard Combo، روی پوستِ پایه‌ی جمجمه (پشت سر) که نمی‌تواند بلیسدش، جدا و مالیده می‌شود. کک، کنه و جربِ گوش، اخراج. ماهانه با چند روز ارفاق، اما هرگز زودتر از یک ماه؛ کمی دیر اشکالی ندارد، خیلی زود خطرِ دوز مضاعف دارد.' },
  'A separate dewormer on the standard adult schedule (the spot-on does not replace it): a pill, smuggled in inside something delicious and served without ceremony.':
    { title: 'کرم‌زدایی', detail: 'یک کرم‌زدای جداگانه طبق برنامه‌ی استاندارد بزرگسال (قطره‌ی موضعی جایگزینش نمی‌شود): یک قرص، پنهان‌شده داخل چیزی خوشمزه و بی‌سروصدا سرو می‌شود.' },
  'The full salon treatment: bath, blow-dry and a top-to-tail tidy-up, so the resident cloud stays soft and photogenic.':
    { title: 'آراستن و روز اسپا', detail: 'درمان کامل سالن: حمام، سشوار و مرتب‌سازی از سر تا دم، تا ابرِ ساکن نرم و عکاسی‌پسند بماند.' },
  'A full scrub and a complete change of litter; the royal facilities restored to five stars.':
    { title: 'نظافت کاملِ جعبه‌ی خاک', detail: 'شست‌وشوی کامل و تعویض کاملِ خاک؛ تأسیسات سلطنتی به پنج ستاره بازگردانده می‌شود.' },
  'The once-a-year, nose-to-tail service: full exam, weight check and an audience with the royal teeth.':
    { title: 'معاینه‌ی کاملِ سالانه', detail: 'سرویسِ سالی‌یک‌بار، از سر تا دم: معاینه‌ی کامل، وزن‌کشی و ملاقات با دندان‌های سلطنتی.' },
  'Felocell 4, the yearly top-up that keeps the core feline viruses on their side of the palace gates.':
    { title: 'یادآورِ FVRCP', detail: 'Felocell 4، تقویتِ سالانه که ویروس‌های اصلیِ گربه را پشت دروازه‌های قصر نگه می‌دارد.' },
  'Front paws first, back paws only with royal consent. Management files a formal complaint every time, then submits to the clippers.':
    { title: 'کوتاه کردن ناخن', detail: 'اول پنجه‌های جلو، پنجه‌های عقب فقط با رضایتِ سلطنتی. مدیریت هر بار شکایتی رسمی ثبت می‌کند، سپس تسلیم ناخن‌گیر می‌شود.' },
};
const everyLabelFa: Record<string, string> = {
  'Every month': 'هر ماه',
  'Every 3 months': 'هر ۳ ماه',
  'Every 2 months': 'هر ۲ ماه',
  'Every year': 'هر سال',
  'Every 2–4 weeks': 'هر ۲ تا ۴ هفته',
};
const whereFa: Record<string, string> = {
  'at home': 'در خانه',
  'at the vet': 'در کلینیک',
  'at the salon': 'در سالن',
};

const healthTextTr: Record<string, Record<string, { title: string; detail: string }>> = {
  ms: healthTextMs,
  zh: healthTextZh,
  fa: healthTextFa,
};
const everyLabelTr: Record<string, Record<string, string>> = {
  ms: everyLabelMs,
  zh: everyLabelZh,
  fa: everyLabelFa,
};
const whereTr: Record<string, Record<string, string>> = { ms: whereMs, zh: whereZh, fa: whereFa };

/** Localize a timeline / upcoming item's prose (English passes through). */
export function localizeHealthItem<
  T extends { title: string; detail: string; everyLabel?: string; where?: string },
>(item: T, locale?: string): T {
  if (!locale || locale === 'en') return item;
  const o = healthTextTr[locale]?.[item.detail];
  const el = everyLabelTr[locale] ?? {};
  const wh = whereTr[locale] ?? {};
  return {
    ...item,
    ...(o ? { title: o.title, detail: o.detail } : {}),
    ...(item.everyLabel ? { everyLabel: el[item.everyLabel] ?? item.everyLabel } : {}),
    ...(item.where ? { where: wh[item.where] ?? item.where } : {}),
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
  zh: {
    metaTitle: '体重 · Picha 🐾',
    metaDescription: 'Picha 的体重追踪器：每一次称重都绘成图表，附带统计数据和完整记录。',
    appTitle: '体重',
    kicker: '工具 · 使用中',
    title: '皇家腰围',
    blurb: '账上的每一次审核，都绘成图表。计量的饭食让趋势诚实；这个页面让员工诚实。',
    note: '约 1.5–2 岁前仍在成长。',
    statCurrent: '当前',
    statHeaviest: '最重',
    statLightest: '最轻',
    statAverage: '平均',
    weighedPre: '称重于',
    peakFloofPre: '绒毛巅峰，',
    featherweightPre: '轻如鸿毛，',
    acrossPre: '横跨',
    auditWord: '次审核',
    auditWordPlural: '次审核',
    trend: '趋势',
    bandFootnotePre: '琥珀色区间是健康成猫范围（',
    bandFootnotePost: '）。',
    bandNote: {
      under: '目前处于其下方，完全是有意为之。',
      in: '她已达标。腰围委员会很满意。',
      over: '她高于此范围；食量政策正在正式审查中。',
    },
    ledgerLabel: '记录',
    auditNoPre: '审核编号',
    latest: '最新',
    logWeighIn: '记录一次称重',
    staffOnly: '仅限员工',
    form: {
      date: '日期',
      weightKg: '体重（kg）',
      record: '记录审核',
      sameDateNote: '同一日期的记录会更新现有条目。',
      filing: '正在归档…',
      recorded: '已记录。管理层已被称重。',
      signExpired: '登录已过期。请在员工室重新输入 PIN。',
      couldNotRecord: '无法记录。请检查连接后重试。',
    },
  },
  fa: {
    metaTitle: 'وزن · Picha 🐾',
    metaDescription: 'ردیاب وزن Picha: هر وزن‌کشی روی نمودار، به‌همراه آمار و دفترِ کامل.',
    appTitle: 'وزن',
    kicker: 'ابزارها · در حال خدمت',
    title: 'دور کمرِ سلطنتی',
    blurb: 'هر ممیزیِ ثبت‌شده، روی نمودار. وعده‌های اندازه‌گیری‌شده روند را صادق نگه می‌دارند؛ این صفحه کارکنان را صادق نگه می‌دارد.',
    note: 'تا حدود ۱.۵ تا ۲ سالگی هنوز در حال رشد است.',
    statCurrent: 'فعلی',
    statHeaviest: 'سنگین‌ترین',
    statLightest: 'سبک‌ترین',
    statAverage: 'میانگین',
    weighedPre: 'وزن‌کشی در',
    peakFloofPre: 'اوجِ پشمالویی،',
    featherweightPre: 'پرِ کاه،',
    acrossPre: 'در طولِ',
    auditWord: 'ممیزی',
    auditWordPlural: 'ممیزی',
    trend: 'روند',
    bandFootnotePre: 'نوار کهربایی محدوده‌ی سالمِ بلوغ است (',
    bandFootnotePost: ').',
    bandNote: {
      under: 'اینکه فعلاً زیرِ آن است، کاملاً طبق برنامه است.',
      in: 'او رسیده. کمیته‌ی دور کمر راضی است.',
      over: 'او بالای آن است؛ سیاستِ اندازه‌ی وعده‌ها در حال بازبینیِ رسمی است.',
    },
    ledgerLabel: 'دفتر',
    auditNoPre: 'ممیزی شماره',
    latest: 'آخرین',
    logWeighIn: 'ثبت وزن‌کشی',
    staffOnly: 'فقط کارکنان',
    form: {
      date: 'تاریخ',
      weightKg: 'وزن (kg)',
      record: 'ثبت ممیزی',
      sameDateNote: 'ثبت‌های با تاریخِ یکسان ردیف موجود را به‌روزرسانی می‌کنند.',
      filing: 'در حال بایگانی…',
      recorded: 'ثبت شد. مدیریت وزن شد.',
      signExpired: 'ورود منقضی شد. پین را در اتاق کارکنان دوباره وارد کنید.',
      couldNotRecord: 'ثبت نشد. اتصال را بررسی و دوباره تلاش کنید.',
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
  zh: {
    metaTitle: '训练 · Picha 🐾',
    metaDescription: '皇家学院：Picha 的训练课程，附带分步课程大纲和实时进度。',
    appTitle: '学院',
    kicker: '工具 · 使用中',
    title: '皇家学院',
    blurb: '高阶猫咪合作课程。官方说法是员工在接受训练与认证；绒毛殿下只是负责给课业打分。',
    staffProgress: '员工进度',
    stepsWord: '步',
    groups: { active: '进行中', syllabus: '课程大纲', graduated: '已毕业' },
    inSessionWord: '进行中',
    graduatedWord: '已毕业',
    onSyllabusWord: '在大纲中',
    stepWord: '第',
    ofWord: '／共',
    allWord: '全部',
    passedWord: '步已通过',
    notStarted: '未开始',
    registrarNoteHub: '各项里程碑由持 PIN 的员工在每门课程页面上记录，直接存入她的云端档案。',
    allCourses: '所有课程',
    statusGraduated: '已毕业',
    statusActive: '进行中',
    statusSyllabus: '在课程大纲中',
    inSessionSincePre: '自',
    gradBanner: '以优异成绩毕业。员工正式获得认证。',
    resistanceWord: '抗拒度',
    upNext: '下一步',
    curriculum: '课程大纲',
    registrarControls: '登记员控制',
    begin: '开始课程',
    markStepPre: '标记第',
    markStepPost: '步通过',
    graduatedBtn: '已毕业',
    undo: '撤销',
    registrarNoteCourse: '里程碑会记录到她的云端档案。当她在多个不同日子里都能保持放松地完成某一步时，该步才算通过。',
    practiceMark: '标记今天的训练已完成',
    practiceDone: '今天的训练已记录',
    filing: '正在归档…',
    gradRecorded: '毕业了。学院深感自豪。',
    recorded: '已记录到她的档案。',
    signExpired: '登录已过期。请在员工室重新输入 PIN。',
    couldNotRecord: '无法记录。请检查连接后重试。',
    rulesLabel: '训练守则',
    rules: [
      '短时段：2–5 分钟，每天一到两次。',
      '始终以成功收尾，哪怕只是微小的成功。',
      '零食就是薪水；控制在每天 10% 的预算内。',
      '绝不强迫。如果她走开，下课。',
      '一次只练一步；一步重复练几天再进入下一步。',
    ],
  },
  fa: {
    metaTitle: 'آموزش · Picha 🐾',
    metaDescription: 'آکادمی سلطنتی: دوره‌های آموزشی Picha با برنامه‌ی درسیِ گام‌به‌گام و پیشرفتِ زنده.',
    appTitle: 'آکادمی',
    kicker: 'ابزارها · در حال خدمت',
    title: 'آکادمی سلطنتی',
    blurb: 'دوره‌هایی در همکاریِ پیشرفته‌ی گربه‌ای. رسماً این کارکنان‌اند که آموزش می‌بینند و گواهی می‌گیرند؛ علیاحضرت پشمالو صرفاً تکالیف را نمره می‌دهد.',
    staffProgress: 'پیشرفتِ کارکنان',
    stepsWord: 'مرحله',
    groups: { active: 'در حال انجام', syllabus: 'برنامه‌ی درسی', graduated: 'فارغ‌التحصیل' },
    inSessionWord: 'در حال انجام',
    graduatedWord: 'فارغ‌التحصیل',
    onSyllabusWord: 'در برنامه',
    stepWord: 'مرحله',
    ofWord: 'از',
    allWord: 'همه',
    passedWord: 'مرحله گذرانده شد',
    notStarted: 'شروع‌نشده',
    registrarNoteHub: 'نقاط عطف در هر صفحه‌ی دوره توسط کارکنانِ دارای پین ثبت می‌شود و مستقیم در پرونده‌ی ابری‌اش می‌نشیند.',
    allCourses: 'همه‌ی دوره‌ها',
    statusGraduated: 'فارغ‌التحصیل',
    statusActive: 'در حال انجام',
    statusSyllabus: 'در برنامه‌ی درسی',
    inSessionSincePre: 'در جلسه از',
    gradBanner: 'با افتخار فارغ‌التحصیل شد. کارکنان رسماً گواهی گرفتند.',
    resistanceWord: 'مقاومت',
    upNext: 'بعدی',
    curriculum: 'برنامه‌ی درسی',
    registrarControls: 'کنترل‌های ثبت‌کننده',
    begin: 'شروع دوره',
    markStepPre: 'ثبت قبولی مرحله',
    markStepPost: '',
    graduatedBtn: 'فارغ‌التحصیل',
    undo: 'واگرد',
    registrarNoteCourse: 'نقاط عطف در پرونده‌ی ابری‌اش ثبت می‌شود. یک مرحله وقتی گذرانده حساب می‌شود که او در چند روزِ جداگانه آرام از پسش برآید.',
    practiceMark: 'ثبت تمرین امروز',
    practiceDone: 'تمرین امروز ثبت شد',
    filing: 'در حال بایگانی…',
    gradRecorded: 'فارغ‌التحصیل شد. آکادمی بسیار افتخار می‌کند.',
    recorded: 'در پرونده‌اش ثبت شد.',
    signExpired: 'ورود منقضی شد. پین را در اتاق کارکنان دوباره وارد کنید.',
    couldNotRecord: 'ثبت نشد. اتصال را بررسی و دوباره تلاش کنید.',
    rulesLabel: 'قواعد جلسه',
    rules: [
      'جلسات کوتاه: ۲ تا ۵ دقیقه، روزی یک یا دو بار.',
      'همیشه با یک موفقیت تمام کنید، حتی کوچک.',
      'تنقلات حقوق اوست؛ در بودجه‌ی روزانه‌ی ۱۰٪ نگه دارید.',
      'هرگز اجبار نکنید. اگر رفت، کلاس تمام است.',
      'یک مرحله در هر بار؛ یک مرحله را چند روز تکرار کنید و بعد جلو بروید.',
    ],
  },
};
export const getTrainingCopy = (locale?: string): TrainingCopy =>
  trainingCopy[locale ?? 'en'] ?? trainingCopy.en;

// Composed status strings (shared by build + client). Chinese grammar differs
// enough from the en/ms fragment order that it gets its own branch.
export function stepOfLabel(done: number, total: number, locale?: string): string {
  if (locale === 'zh') return `第 ${done + 1} 步／共 ${total} 步`;
  if (locale === 'fa') return `مرحلهٔ ${faDigits(done + 1)} از ${faDigits(total)}`;
  const c = getTrainingCopy(locale);
  return `${c.stepWord} ${done + 1} ${c.ofWord} ${total}`;
}
export function allStepsPassedLabel(total: number, locale?: string): string {
  if (locale === 'zh') return `全部 ${total} 步已通过`;
  if (locale === 'fa') return `همهٔ ${faDigits(total)} مرحله گذرانده شد`;
  const c = getTrainingCopy(locale);
  return `${c.allWord} ${total} ${c.passedWord}`;
}
export function stepsNotStartedLabel(total: number, locale?: string): string {
  if (locale === 'zh') return `${total} 步 · 未开始`;
  if (locale === 'fa') return `${faDigits(total)} مرحله · شروع‌نشده`;
  const c = getTrainingCopy(locale);
  return `${total} ${c.stepsWord} · ${c.notStarted}`;
}
export function stepsCountLabel(done: number, total: number, locale?: string): string {
  if (locale === 'zh') return `${done}/${total} 步`;
  if (locale === 'fa') return `${faDigits(done)}/${faDigits(total)} مرحله`;
  const c = getTrainingCopy(locale);
  return `${done}/${total} ${c.stepsWord}`;
}
export function academyCaption(a: number, g: number, s: number, locale?: string): string {
  if (locale === 'zh') return `${a} 进行中 · ${g} 已毕业 · ${s} 在大纲中`;
  if (locale === 'fa')
    return `${faDigits(a)} در حال انجام · ${faDigits(g)} فارغ‌التحصیل · ${faDigits(s)} در برنامه`;
  const c = getTrainingCopy(locale);
  return `${a} ${c.inSessionWord} · ${g} ${c.graduatedWord} · ${s} ${c.onSyllabusWord}`;
}
export function inSessionSinceLabel(iso: string, locale?: string): string {
  if (locale === 'zh') return `自 ${dateLabel(iso, locale)} 起进行中`;
  if (locale === 'fa') return `در جلسه از ${dateLabel(iso, locale)}`;
  return `${getTrainingCopy(locale).inSessionSincePre} ${dateLabel(iso, locale)}`;
}
export function markStepPassedLabel(done: number, locale?: string): string {
  if (locale === 'zh') return `标记第 ${done + 1} 步通过`;
  if (locale === 'fa') return `ثبت قبولی مرحلهٔ ${faDigits(done + 1)}`;
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

const courseZh: Record<string, CourseText> = {
  toothbrushing: {
    title: '刷牙 101',
    tagline: '刷牙时代开启，尚待她的正式批准。',
    why: '猫会把牙病藏到疼起来为止。每天刷牙是最好的单一预防措施，而牛肉味的 Histo Tree 牙膏已经买好了。',
    steps: [
      { title: '试味', detail: '在手指上蘸一点牙膏，当作零食递上。连续几天，直到她把它当成食物。' },
      { title: '下巴和脸颊', detail: '趁她舔牙膏时，碰碰她的嘴唇和脸颊。只需几秒，然后松手并表扬。' },
      { title: '手指碰牙龈', detail: '手指蘸牙膏，轻轻沿门牙和牙龈线摩擦。在她抗议之前停下。' },
      { title: '牙刷登场', detail: '猫牙刷出现。她闻一闻并舔掉上面的牙膏。暂不刷牙。' },
      { title: '第一次刷', detail: '在门牙一侧实际刷几秒。以一份零食收尾。' },
      { title: '完整流程', detail: '两侧加后牙，不到一分钟，每天进行。毕业。' },
    ],
  },
  manicure: {
    title: '修甲计划',
    tagline: '先从前爪开始。管理层现已获悉。',
    why: '室内猫的爪子会长过头并勾住东西。定期修剪能保护她的爪子、家具和员工。',
    steps: [
      { title: '爪子外交', detail: '在轻松的拥抱中，握住一只爪子一秒，松开，给零食。逐步过渡到轻轻一捏。' },
      { title: '轻按', detail: '轻轻按压一个趾垫让一只爪子伸出，欣赏一下，松开，给零食。' },
      { title: '认识指甲剪', detail: '拥抱时把指甲剪放在旁边，在空中咔哒作响。她什么事也没有。零食如雨。' },
      { title: '只剪一只指甲', detail: '趁她平静时剪掉一只前爪的尖端。立刻停下并庆祝。' },
      { title: '一次一只爪', detail: '每次剪几只指甲，先前爪，每 2–4 周一次。毕业。' },
    ],
  },
  carrier: {
    title: '猫包外交',
    tagline: '从便携地牢到头等舱。',
    why: '每次看诊都从猫包开始。愿意自愿进包的猫会让每次出行都更平静、更快捷。',
    steps: [
      { title: '家具身份', detail: '猫包敞开放在客厅里，里面铺一条柔软的毯子，仿佛一直都在那儿。' },
      { title: '零食场所', detail: '零食和偶尔的一餐出现在猫包附近，然后是门口内侧，然后是最里面。' },
      { title: '关门游戏', detail: '在她于包内吃零食时把门关上几秒，并在她在意之前打开。' },
      { title: '短途搬运', detail: '在公寓里短暂地抱着走一圈，然后放下并给一大堆零食。' },
      { title: '预演', detail: '下到大堂或短程驾车后直接回家。终点没有兽医。毕业。' },
    ],
  },
  holding: {
    title: '进阶抱持耐受',
    tagline: '在员工怀里平静十秒，就算一次外交突破。',
    why: '兽医检查、梳理和偶尔的从架上解救，对能耐受被抱的猫都会更顺利。',
    steps: [
      { title: '双手，不抱起', detail: '拥抱时双手在她身侧停一会儿，然后松开，再给零食。' },
      { title: '十秒抱起', detail: '短暂、低幅度地抱起。在她想扭动之前把她的脚放回地面。' },
      { title: '落到腿上', detail: '抱起并放到腿上；立即给予自由。腿于是成了一个不错的去处。' },
      { title: '半分钟', detail: '轻松地抱 30 秒并缓慢抚摸，在她开口之前结束。' },
      { title: '诊所式', detail: '以温和的兽医式抱姿抱最多一分钟，全程平静。毕业。' },
    ],
  },
  recall: {
    title: '召唤，需预约',
    tagline: '叫她她就来。前提是她认同这个前提。',
    why: '可靠的名字反应能迅速找到躲起来的猫，这在家里有位捉迷藏冠军时尤其重要。',
    steps: [
      { title: '名字等于零食', detail: '说“Picha”，一份零食就落下。连续几天，直到一听到这个词她的头就猛地转过来。' },
      { title: '跨房间召唤', detail: '从房间另一头叫她，并奖励她的到来，每一次都如此。' },
      { title: '视线外召唤', detail: '从另一个房间叫她。到来即得大奖。' },
      { title: '随机演练', detail: '每天在随机时刻召唤；奖励在食物、玩耍和爱抚之间变化。毕业。' },
    ],
  },
  'talking-buttons': {
    title: '会说话的按钮',
    tagline: '四个按钮、一只猫，以及你听得见的诉求就此开始。',
    why: '可录音的发声按钮让她能有意识地提出要求，而不是照旧靠猜。做法得当（员工示范按压、没有人掰她的爪子、奖励立即到位）时，它是真正的丰容，也是一条真实的沟通渠道。先从一个按钮开始，等她掌握了再逐步添加其余的。',
    steps: [
      { title: '录制并放置一个', detail: '录一个她已经喜爱、清晰而高价值的词；“玩”或“零食”都是不错的第一个词。把那个按钮放在对应事物所在之处：玩耍按钮放在玩具旁，零食按钮放在罐子旁。' },
      { title: '每一次都示范', detail: '在事情发生之前，一名员工按下按钮、说出那个词，然后立即兑现。两名员工，同一个词，每天多次。绝不替她按爪子；她靠观察学习。' },
      { title: '尊重第一次按压', detail: '奖励任何在按钮附近的嗅闻或触碰，而她一旦自己按下，就立即兑现，哪怕时机糟糕透顶。第一次真正的按压可能要好几周。把它当作一次毕业来对待。' },
      { title: '加入第二个按钮', detail: '当她有意识地按下第一个按钮后，加入第二个明显不同的词（“吃饭”或“喝水”都很合适），放得稍远一些，好让两者不会混淆。继续示范两者。' },
      { title: '加入第三个', detail: '当她能在情境中区分前两个、而不只是乱按时，再引入第三个词。像“抚摸”这样的社交词是不错的选择。奖励那些真正合乎情理的按压。' },
      { title: '完整发声板', detail: '加入第四个按钮，并把四个都固定在防滑垫上。她现在拥有一套可用的词汇，能正式提出请求。毕业，也是一场终生谈判的开始。' },
    ],
  },
  'party-tricks': {
    title: '派对才艺',
    tagline: '击掌、转圈，以及其他让员工鼓掌的方式。',
    why: '才艺是纯粹的丰容：动脑、消耗精力，把训练变成全家都乐在其中的游戏。它们还能培养其他每门课程都依赖的专注与合作。用引诱和奖励，绝不用手摆姿势。',
    steps: [
      { title: '标记与目标', detail: '选一个标记（响片，或干脆利落的一声“好”），把它和零食配对，直到这个声音本身就意味着“做得好”。然后教鼻子触碰：伸出一根手指，她一碰就立刻奖励。这一项技能是每个才艺的动力。' },
      { title: '坐下', detail: '把零食举在她鼻子前，向上并越过她头顶往后滑；当她的鼻子跟随、屁股落下时，标记并奖励。熟练后，在她做出动作前加上“坐”这个词。' },
      { title: '击掌', detail: '把零食松松地攥在拳里，靠近她的胸口。爪子一抬起来查看，就标记并奖励。用几个训练时段逐步抬高，直到爪子碰到你摊开的手掌，然后命名为“击掌”。' },
      { title: '转圈', detail: '用零食引着她的鼻子画一个慢圈，让她原地转身；标记整圈并奖励。每天把圈画小一点，缩到用手指一转，并加上“转圈”这个词。' },
      { title: '淡出引诱', detail: '现在做同样的手势，但手里不拿零食，等她完成后用另一只手给奖励。口令说一次，给她一点时间，奖励的是口令，而不是举在她鼻子前的食物。' },
      { title: '压轴', detail: '加一个惊艳动作（“作揖”坐姿，或跳过手持的呼啦圈），然后把两个才艺串成一个小套路，听口令表演。她现在应邀为全家观众表演。毕业，全场起立鼓掌。' },
    ],
  },
  harness: {
    title: '胸背带与牵绳（选修）',
    tagline: '为绒毛殿下可能委派的假想未来远征做准备。',
    why: '选修。只有在将来打算旅行或有人看管的户外时间时才有用，所以它排在课程大纲的最后。',
    steps: [
      { title: '胸背带的存在', detail: '它躺在地上被嗅探。零食在它附近发生。' },
      { title: '穿上，不扣紧', detail: '每次搭在她肩上几秒，随后给零食。' },
      { title: '室内扣紧', detail: '扣上几分钟，同时用玩耍分散她对这身装备的注意。' },
      { title: '牵绳跟随', detail: '牵绳系上，她在公寓里游荡，员工像侍臣一样跟随。' },
      { title: '走廊远征', detail: '在前门外做一次简短的、有陪同的散步。毕业。' },
    ],
  },
};

const courseFa: Record<string, CourseText> = {
  toothbrushing: {
    title: 'مسواک ۱۰۱',
    tagline: 'عصرِ مسواک آغاز می‌شود، به‌شرطِ تأیید رسمیِ او.',
    why: 'گربه‌ها بیماریِ دندان را تا وقتی درد بگیرد پنهان می‌کنند. مسواکِ روزانه بهترین پیشگیریِ یگانه است، و ژلِ طعم‌گوشتِ Histo Tree هم قبلاً خریده شده.',
    steps: [
      { title: 'آزمونِ مزه', detail: 'کمی ژل دندان روی انگشت، به‌عنوان تنقلات تعارف می‌شود. چند روز تکرار کنید تا آن را غذا بداند.' },
      { title: 'چانه و گونه', detail: 'وقتی ژل را می‌لیسد، لب‌ها و گونه‌هایش را لمس کنید. فقط چند ثانیه، بعد رها کنید و تعریف.' },
      { title: 'انگشت روی لثه', detail: 'ژل روی انگشت، به‌آرامی در امتداد دندان‌های جلو و خط لثه مالیده می‌شود. پیش از اعتراض متوقف شوید.' },
      { title: 'ورودِ مسواک', detail: 'مسواکِ گربه ظاهر می‌شود. آن را بو می‌کند و ژلش را می‌لیسد. هنوز مسواک نه.' },
      { title: 'اولین حرکت‌ها', detail: 'چند ثانیه مسواکِ واقعی روی دندان‌های جلو، یک طرف. با یک تنقلات تمام کنید.' },
      { title: 'روالِ کامل', detail: 'هر دو طرف و دندان‌های عقب، زیرِ یک دقیقه، روزانه. فارغ‌التحصیلی.' },
    ],
  },
  manicure: {
    title: 'برنامه‌ی مانیکور',
    tagline: 'اول پنجه‌های جلو. مدیریت اکنون مطلع شد.',
    why: 'ناخنِ گربه‌ی خانگی بیش‌ازحد رشد می‌کند و گیر می‌کند. کوتاه کردنِ منظم پنجه‌ها، مبلمان و کارکنان را حفظ می‌کند.',
    steps: [
      { title: 'دیپلماسیِ پنجه', detail: 'در بغل‌های آرام، یک پنجه را یک ثانیه بگیرید، رها کنید، تنقلات. کم‌کم تا یک فشارِ ملایم پیش بروید.' },
      { title: 'فشار', detail: 'به‌آرامی یک بالشتکِ انگشت را فشار دهید تا یک ناخن بیرون بیاید، تحسینش کنید، رها کنید، تنقلات.' },
      { title: 'آشنایی با ناخن‌گیر', detail: 'ناخن‌گیر هنگام بغل نزدیک است و در هوا کلیک می‌کند. اتفاقی برایش نمی‌افتد. تنقلات می‌بارد.' },
      { title: 'فقط یک ناخن', detail: 'نوکِ یک ناخنِ جلو را وقتی آرام است بگیرید. فوراً متوقف شوید و جشن بگیرید.' },
      { title: 'هر جلسه یک پنجه', detail: 'چند ناخن در هر جلسه، اول پنجه‌های جلو، هر ۲ تا ۴ هفته. فارغ‌التحصیلی.' },
    ],
  },
  carrier: {
    title: 'دیپلماسیِ باکس',
    tagline: 'از سیاه‌چالِ قابل‌حمل تا کابینِ درجه‌یک.',
    why: 'هر ویزیتِ دامپزشکی با باکس شروع می‌شود. گربه‌ای که داوطلبانه واردش می‌شود هر سفر را آرام‌تر و سریع‌تر می‌کند.',
    steps: [
      { title: 'وضعیتِ مبلمان', detail: 'باکسِ باز در پذیرایی می‌ماند با یک پتوی نرم داخلش، انگار همیشه آنجا بوده.' },
      { title: 'محلِ تنقلات', detail: 'تنقلات و گاهی یک وعده نزدیکِ باکس ظاهر می‌شود، بعد درست داخلِ در، بعد تهِ باکس.' },
      { title: 'بازیِ در', detail: 'در چند ثانیه بسته می‌شود در حالی که داخل تنقلات می‌خورد، و پیش از آنکه اهمیت دهد باز می‌شود.' },
      { title: 'حملِ کوتاه', detail: 'یک حملِ کوتاه دورِ آپارتمان، بعد رها کردن و جایزه‌ی بزرگِ تنقلات.' },
      { title: 'پیش‌آزمایش', detail: 'تا لابی یا یک رانندگیِ کوتاه و مستقیم به خانه. آخرش دامپزشک نیست. فارغ‌التحصیلی.' },
    ],
  },
  holding: {
    title: 'تحملِ پیشرفته‌ی بغل',
    tagline: 'ده ثانیه آرامش در آغوشِ کارکنان یک پیشرفتِ دیپلماتیک حساب می‌شود.',
    why: 'معاینه‌ی دامپزشکی، آراستن و گاه نجات از روی قفسه، همه برای گربه‌ای که تحملِ بغل دارد بهتر پیش می‌رود.',
    steps: [
      { title: 'دست‌ها، بدون بلند کردن', detail: 'هر دو دست هنگام بغل لحظه‌ای روی پهلوهایش می‌ماند، بعد رها، بعد تنقلات.' },
      { title: 'بلند کردنِ ده‌ثانیه‌ای', detail: 'یک بلند کردنِ کوتاه و کم‌ارتفاع. پیش از آنکه به وول خوردن فکر کند، پاها روی زمین.' },
      { title: 'فرود روی پا', detail: 'بلندش کنید و روی پا بگذارید؛ آزادی فوراً داده می‌شود. پا به مقصدی خوب تبدیل می‌شود.' },
      { title: 'نیم‌دقیقه', detail: 'یک بغلِ آرامِ ۳۰ثانیه‌ای با نوازشِ آهسته، پیش از آنکه بخواهد تمام می‌شود.' },
      { title: 'به‌سبکِ کلینیک', detail: 'یک بغلِ ملایمِ سبکِ دامپزشکی تا یک دقیقه، تمام‌مدت آرام. فارغ‌التحصیلی.' },
    ],
  },
  recall: {
    title: 'فراخوان، با وقتِ قبلی',
    tagline: 'وقتی صدایش کنی می‌آید. وقتی با اصلِ ماجرا موافق باشد.',
    why: 'واکنشِ قابل‌اعتماد به نام، گربه‌ی پنهان‌شده را سریع پیدا می‌کند، که با یک استاد بزرگِ قایم‌باشک در خانه مهم است.',
    steps: [
      { title: 'نام یعنی تنقلات', detail: '«Picha» بگویید، یک تنقلات فرود می‌آید. چند روز تکرار کنید تا با شنیدنِ کلمه سرش سریع بچرخد.' },
      { title: 'فراخوانِ آن‌سرِ اتاق', detail: 'از آن‌سرِ اتاق صدایش کنید و ورودش را پاداش دهید، هر بار بدون استثنا.' },
      { title: 'فراخوانِ خارج از دید', detail: 'از اتاقی دیگر صدا کنید. ورود، جایزه‌ی بزرگ می‌گیرد.' },
      { title: 'تمرین‌های تصادفی', detail: 'فراخوان در لحظه‌های تصادفیِ روزانه؛ پاداش بین غذا، بازی و محبت متغیر است. فارغ‌التحصیلی.' },
    ],
  },
  'talking-buttons': {
    title: 'دکمه‌های سخنگو',
    tagline: 'چهار دکمه، یک گربه، و طلوعِ درخواست‌هایی که می‌توانی بشنوی.',
    why: 'دکمه‌های صوتیِ قابل‌ضبط به او اجازه می‌دهند به‌عمد چیزی بخواهد به‌جای بازیِ حدس‌زدنِ همیشگی. اگر درست انجام شود (کارکنان فشردن را نشان دهند، کسی پنجه‌اش را مجبور نکند، و پاداش فوراً برسد) یک غنی‌سازیِ واقعی و خطِ ارتباطیِ اصیل است. با یک دکمه شروع کنید و بقیه را فقط وقتی یاد گرفت اضافه کنید.',
    steps: [
      { title: 'ضبط و گذاشتنِ یکی', detail: 'یک کلمه‌ی روشن و پرارزش که همین حالا دوستش دارد ضبط کنید؛ «بازی» یا «تنقلات» کلمه‌های اولِ خوبی‌اند. آن دکمه را جایی بگذارید که آن چیز هست: دکمه‌ی بازی کنارِ اسباب‌بازی‌ها، دکمه‌ی تنقلات کنارِ شیشه.' },
      { title: 'هر بار نشان دهید', detail: 'درست پیش از آنکه اتفاق بیفتد، یک کارمند دکمه را می‌فشارد، کلمه را می‌گوید، و بلافاصله تحویلش می‌دهد. هر دو کارمند، همان کلمه، روزی چند بار. هرگز پنجه‌اش را به‌جایش نفشارید؛ او با تماشا یاد می‌گیرد.' },
      { title: 'اولین فشار را ارج بگذارید', detail: 'هر بو کشیدن یا پنجه‌ی نزدیکِ دکمه را پاداش دهید، و لحظه‌ای که خودش فشارش داد، فوراً تحویل دهید، حتی اگر زمان‌بندی افتضاح باشد. اولین فشارِ واقعی ممکن است هفته‌ها طول بکشد. مثل یک فارغ‌التحصیلی با آن رفتار کنید.' },
      { title: 'افزودنِ دکمه‌ی دوم', detail: 'وقتی دکمه‌ی اول را به‌عمد فشار داد، یک دکمه‌ی دوم با کلمه‌ای واضحاً متفاوت («غذا» یا «آب» خوب‌اند) کمی دورتر بگذارید تا دو تا قاطی نشوند. نشان دادنِ هر دو را ادامه دهید.' },
      { title: 'افزودنِ سومی', detail: 'وقتی دو تای اول را در بافت از هم تشخیص داد نه فقط بی‌هدف زد، کلمه‌ی سوم را بیاورید. یک کلمه‌ی اجتماعی مثل «نوازش» انتخابِ خوبی است. فشارهایی را که واقعاً معنا دارند پاداش دهید.' },
      { title: 'تخته‌صدای کامل', detail: 'دکمه‌ی چهارم را اضافه کنید و هر چهار را روی پدِ ضدلغزش ثابت کنید. او حالا واژگانی کاربردی دارد و می‌تواند رسماً درخواست ثبت کند. فارغ‌التحصیلی، و آغازِ یک مذاکره‌ی مادام‌العمر.' },
    ],
  },
  'party-tricks': {
    title: 'نمایش‌های مهمانی',
    tagline: 'های‌فایو، چرخش، و راه‌های دیگرِ به‌تشویق‌واداشتنِ کارکنان.',
    why: 'نمایش‌ها غنی‌سازیِ ناب‌اند: مغزش را به کار می‌گیرند، انرژی می‌سوزانند و آموزش را به بازی‌ای تبدیل می‌کنند که کلِ خانه از آن لذت می‌برد. تمرکز و همکاری‌ای را هم می‌سازند که هر دوره‌ی دیگر به آن تکیه دارد. با طعمه و پاداش، نه با دست ژست دادن.',
    steps: [
      { title: 'نشانگر و هدف', detail: 'یک نشانگر (کلیکر یا یک «آفرینِ» قاطع) انتخاب کنید و آن را با تنقلات جفت کنید تا خودِ صدا یعنی «آفرین». بعد لمسِ بینی را یاد دهید: انگشتی جلو بگیرید و لحظه‌ای که زد پاداش دهید. همین یک مهارت موتورِ هر نمایش است.' },
      { title: 'نشستن', detail: 'تنقلات را جلوِ بینی‌اش بگیرید و بالا و به‌عقب روی سرش بلغزانید؛ همین‌که بینی دنبال کرد و باسن پایین آمد، نشانه بزنید و پاداش دهید. وقتی روان شد، درست پیش از انجامش کلمه‌ی «بشین» را اضافه کنید.' },
      { title: 'های‌فایو', detail: 'تنقلات را در مشتی شل نزدیکِ سینه‌اش نگه دارید. لحظه‌ای که پنجه برای بررسی بالا آمد، نشانه بزنید و پاداش دهید. طیِ چند جلسه بالاتر ببرید تا پنجه به کفِ دستِ بازِ شما برسد، بعد نامش را «های‌فایو» بگذارید.' },
      { title: 'چرخش', detail: 'بینی‌اش را با تنقلات در دایره‌ای آهسته هدایت کنید تا در جا بچرخد؛ چرخشِ کامل را نشانه بزنید و پاداش دهید. هر روز دایره را کوچک‌تر کنید، تا یک چرخشِ انگشت کوچکش کنید، و کلمه‌ی «بچرخ» را اضافه کنید.' },
      { title: 'محوِ طعمه', detail: 'حالا همان حرکتِ دست را بدونِ تنقلات انجام دهید، و بعد از اجرا با دستِ دیگر پاداش دهید. اشاره را یک بار بگویید، لحظه‌ای مهلت دهید، و به‌جای غذایِ جلوِ بینی، خودِ اشاره را پاداش دهید.' },
      { title: 'فینال', detail: 'یک حرکتِ چشمگیر اضافه کنید (ژستِ «تعظیمِ نشسته»، یا پرش از داخلِ حلقه‌ی نگه‌داشته)، بعد دو نمایش را به یک روالِ کوچک روی اشاره وصل کنید. او حالا برای تماشاگرانِ خانه به‌درخواست اجرا می‌کند. فارغ‌التحصیلی، و یک تشویقِ ایستاده.' },
    ],
  },
  harness: {
    title: 'قلاده و بند (اختیاری)',
    tagline: 'برای اکتشاف‌های فرضیِ آینده که علیاحضرت پشمالو شاید سفارش دهد.',
    why: 'اختیاری. فقط اگر روزی سفر یا وقتِ بیرونِ زیرِنظر در برنامه باشد به کار می‌آید، پس تهِ برنامه‌ی درسی منتظر می‌ماند.',
    steps: [
      { title: 'قلاده وجود دارد', detail: 'روی زمین می‌افتد و بو می‌شود. تنقلات نزدیکش رخ می‌دهد.' },
      { title: 'پوشیده، بی‌بست', detail: 'چند ثانیه روی شانه‌هایش انداخته می‌شود، بعد تنقلات.' },
      { title: 'بسته، در خانه', detail: 'چند دقیقه بسته می‌شود در حالی که بازی حواسش را از لباس پرت می‌کند.' },
      { title: 'سایه‌به‌سایه با بند', detail: 'بند وصل، او در آپارتمان می‌گردد، کارکنان مثل درباریان دنبال می‌کنند.' },
      { title: 'اکتشافِ راهرو', detail: 'یک قدم‌زنیِ کوتاهِ همراهی‌شده بیرونِ درِ ورودی. فارغ‌التحصیلی.' },
    ],
  },
};

const courseTr: Record<string, Record<string, CourseText>> = { ms: courseMs, zh: courseZh, fa: courseFa };

/** Return a course with prose in the active locale (English passes through). */
export function localizeCourse(course: TrainingCourse, locale?: string): TrainingCourse {
  const o = locale ? courseTr[locale]?.[course.slug] : undefined;
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
  zh: {
    metaTitle: '员工 · Picha 🐾',
    metaDescription: '员工宿舍：登记员 PIN 存放在这里，供在编的人类使用。',
    appTitle: '员工',
    kicker: '仅限会员',
    title: '员工室',
    blurb: '人类存放零食、咖啡和登记员 PIN 的地方。登录以进入管理层绝不会随便交给外人的员工专用控制。',
    staffOnly: '仅限员工',
    pinPrompt: '请输入登记员 PIN。零食柜仅限员工。输入一次，本设备就会记住你。',
    pinLabel: '登记员 PIN',
    pinPlaceholder: '员工 PIN',
    unlock: '解锁',
    checking: '正在检查…',
    pinNotRecognised: '未能识别该 PIN。请重试。',
    unlockedBanner: '你进来了；零食在最上面的抽屉里。本设备现在可以记录称重、学院进度和每日例行任务。',
    remindersLabel: '提醒',
    reminderTitle: '本设备上的提醒',
    reminderSub: '在每日例行任务尚未完成时，每隔几小时提醒一次。',
    on: '开',
    off: '关',
    deviceLabel: '本设备',
    forgetTitle: '忘记本设备上的 PIN',
    forgetSub: '清除此处保存的 PIN。其他设备不受影响，PIN 本身也不会改变。',
    moreControlsNote: '更多员工控制会陆续加入。目前主要是一个零食罐、一个水壶和一个衣帽架。',
    push: {
      unsupported: '此浏览器无法在应用关闭时发送提醒。',
      denied: '本站点的通知已被屏蔽。请在浏览器设置中开启，然后再点一次。',
      subscribed: '开。在例行任务尚未完成时每隔几小时提醒一次（夜间静默）；清单一旦清空即静默。',
      off: '关。点击即可在每日例行任务尚未完成时获得提醒。',
      working: '处理中…',
      pinRejected: 'PIN 被拒绝。请退出后重新登录，然后再试。',
      cloudNotConfigured: '云端未配置。',
      signInFirst: '请先登录。',
      couldNotUpdate: '无法更新提醒。',
    },
  },
  fa: {
    metaTitle: 'کارکنان · Picha 🐾',
    metaDescription: 'خوابگاهِ کارکنان: پینِ ثبت‌کننده اینجاست، برای انسان‌های استخدامی.',
    appTitle: 'کارکنان',
    kicker: 'فقط اعضا',
    title: 'اتاق کارکنان',
    blurb: 'جایی که انسان‌ها تنقلات، قهوه و پینِ ثبت‌کننده را نگه می‌دارند. وارد شوید تا به کنترل‌های ویژه‌ی کارکنان برسید که مدیریت هرگز به هر کسی نمی‌سپارد.',
    staffOnly: 'فقط کارکنان',
    pinPrompt: 'پینِ ثبت‌کننده، لطفاً. کمدِ تنقلات فقط برای کارکنان است. یک بار واردش کنید و این دستگاه شما را به‌خاطر می‌سپارد.',
    pinLabel: 'پینِ ثبت‌کننده',
    pinPlaceholder: 'پینِ کارکنان',
    unlock: 'باز کردن',
    checking: 'در حال بررسی…',
    pinNotRecognised: 'آن پین شناخته نشد. دوباره تلاش کنید.',
    unlockedBanner: 'وارد شدید؛ تنقلات در کشوی بالاست. این دستگاه اکنون می‌تواند وزن‌کشی، پیشرفتِ آکادمی و کارهای روزانه را ثبت کند.',
    remindersLabel: 'یادآورها',
    reminderTitle: 'یادآورها روی این دستگاه',
    reminderSub: 'هر چند ساعت یک تلنگر، تا وقتی کارهای روزانه هنوز مانده.',
    on: 'روشن',
    off: 'خاموش',
    deviceLabel: 'این دستگاه',
    forgetTitle: 'فراموش کردنِ پین روی این دستگاه',
    forgetSub: 'پینِ ذخیره‌شده در اینجا را پاک می‌کند. دستگاه‌های دیگر دست‌نخورده می‌مانند، و خودِ پین هرگز تغییر نمی‌کند.',
    moreControlsNote: 'کنترل‌های بیشترِ کارکنان به‌مرور اضافه می‌شوند. فعلاً بیشتر یک شیشه‌ی تنقلات، یک کتری و یک جالباسی است.',
    push: {
      unsupported: 'این مرورگر نمی‌تواند وقتی اپ بسته است یادآور بفرستد.',
      denied: 'اعلان‌ها برای این سایت مسدود شده‌اند. آن‌ها را در تنظیمات مرورگر روشن کنید، بعد دوباره بزنید.',
      subscribed: 'روشن. هر چند ساعت یک تلنگر تا وقتی کارها مانده (شب‌ها ساکت)؛ به‌محضِ خالی شدنِ فهرست، ساکت.',
      off: 'خاموش. برای گرفتنِ تلنگر تا وقتی کارهای روزانه مانده، بزنید.',
      working: 'در حال انجام…',
      pinRejected: 'آن پین رد شد. خارج شوید و دوباره وارد شوید، بعد امتحان کنید.',
      cloudNotConfigured: 'ابر پیکربندی نشده.',
      signInFirst: 'اول وارد شوید.',
      couldNotUpdate: 'به‌روزرسانیِ یادآورها ناموفق بود.',
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
  zh: {
    sheetTitle: '宠物护照',
    closeLabel: '关闭护照',
    particularsHeading: '宠物资料',
    identityHeading: '宠物身份',
    labels: {
      name: '宠物姓名',
      species: '物种',
      breed: '品种',
      sex: '性别',
      neutered: '已绝育',
      colour: '颜色',
      dob: '出生日期',
      passportNo: '护照编号',
    },
    species: '猫',
    sexFemale: '雌性',
    yes: '是',
    pending: '待定',
    household: 'Picha 皇家宅邸',
    signature: '签名：爪印在案',
    microchipNo: '芯片编号',
    siteOfImplant: '植入部位',
    betweenShoulders: '两肩之间',
    registeredAt: '登记于',
    petPhoto: '宠物照片',
  },
  fa: {
    sheetTitle: 'پاسپورت حیوان',
    closeLabel: 'بستن پاسپورت',
    particularsHeading: 'مشخصاتِ حیوان',
    identityHeading: 'هویتِ حیوان',
    labels: {
      name: 'نامِ حیوان',
      species: 'گونه',
      breed: 'نژاد',
      sex: 'جنسیت',
      neutered: 'عقیم‌شده',
      colour: 'رنگ',
      dob: 'تاریخ تولد',
      passportNo: 'شماره‌ی پاسپورت',
    },
    species: 'گربه',
    sexFemale: 'ماده',
    yes: 'بله',
    pending: 'در انتظار',
    household: 'دربارِ سلطنتیِ پیچا',
    signature: 'امضا: پنجه در پرونده',
    microchipNo: 'شماره‌ی میکروچیپ',
    siteOfImplant: 'محلِ کاشت',
    betweenShoulders: 'میانِ شانه‌ها',
    registeredAt: 'ثبت‌شده در',
    petPhoto: 'عکسِ حیوان',
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
  zh: {
    sheetTitle: '分享她的档案',
    closeLabel: '关闭分享面板',
    blurb: '给兽医、日托、家人：扫码或发送链接。关于 Picha 的一切，一页搞定。',
    share: '分享',
    copyLink: '复制链接',
    copied: '已复制',
    shareText: 'Picha 这只猫：档案、健康记录和照护指南。',
  },
  fa: {
    sheetTitle: 'هم‌رسانیِ پرونده‌اش',
    closeLabel: 'بستنِ برگه‌ی هم‌رسانی',
    blurb: 'برای دامپزشک، مهدِ روزانه، خانواده: کد را اسکن کنید یا لینک را بفرستید. همه‌چیز درباره‌ی Picha، در یک صفحه.',
    share: 'هم‌رسانی',
    copyLink: 'کپیِ لینک',
    copied: 'کپی شد',
    shareText: 'پیچا گربه: پروفایل، پرونده‌ی سلامت و راهنمای مراقبت.',
  },
};
export const getShareCopy = (locale?: string): ShareCopy => shareCopy[locale ?? 'en'] ?? shareCopy.en;

// ---------------------------------------------------------------------------
// Push-notification copy. Consumed by the scheduled sender (scripts/notify,
// Node/tsx) — NOT by the browser — so it must stay Node-safe (content.ts only
// pulls picha facts + lib/dates, which it already does). Each device's locale
// is stored on its push_subscriptions row; the sender builds one message set
// per distinct locale.
// ---------------------------------------------------------------------------

/** Locale-prefixed site path for a notification's click-through URL. */
export function notifyUrl(page: string, locale?: string): string {
  const base = '/picha';
  return locale && locale !== 'en' ? `${base}/${locale}/${page}/` : `${base}/${page}/`;
}

/** Daily-checklist reminder title + body in the given locale. */
export function notifyChecklistMessage(
  remaining: number,
  locale?: string,
): { title: string; body: string } {
  if (locale === 'zh') {
    return {
      title: `Picha 已提出 ${remaining} 项投诉`,
      body: 'Picha 注意到有些例行任务还没完成。她很失望，但并不意外。',
    };
  }
  if (locale === 'fa') {
    return {
      title: `Picha ${faDigits(remaining)} شکایت ثبت کرده`,
      body: 'Picha متوجه شده چند کار روزانه هنوز انجام نشده. ناامید است، اما تعجب نکرده.',
    };
  }
  if (locale === 'ms') {
    return {
      title: `Picha telah memfailkan ${remaining} aduan`,
      body: 'Picha perasan beberapa pusingan masih belum siap. Dia kecewa tetapi tidak terkejut.',
    };
  }
  return {
    title: `Picha has filed ${remaining} complaint${remaining === 1 ? '' : 's'}`,
    body: 'Picha has noticed some rounds are still undone. She is disappointed but not surprised.',
  };
}

/** Due-soon reminder title ("Due today: <item>", etc.) in the given locale. */
export function dueSoonTitle(itemTitle: string, days: number, locale?: string): string {
  if (locale === 'zh') {
    if (days < 0) return `已逾期：${itemTitle}`;
    if (days === 0) return `今天到期：${itemTitle}`;
    if (days === 1) return `明天到期：${itemTitle}`;
    return `${days} 天后到期：${itemTitle}`;
  }
  if (locale === 'fa') {
    if (days < 0) return `عقب‌افتاده: ${itemTitle}`;
    if (days === 0) return `امروز موعد: ${itemTitle}`;
    if (days === 1) return `فردا موعد: ${itemTitle}`;
    return `${faDigits(days)} روز دیگر موعد: ${itemTitle}`;
  }
  if (locale === 'ms') {
    if (days < 0) return `Lewat tempoh: ${itemTitle}`;
    if (days === 0) return `Perlu hari ini: ${itemTitle}`;
    if (days === 1) return `Perlu esok: ${itemTitle}`;
    return `Perlu dalam ${days} hari: ${itemTitle}`;
  }
  if (days < 0) return `Overdue: ${itemTitle}`;
  if (days === 0) return `Due today: ${itemTitle}`;
  if (days === 1) return `Due tomorrow: ${itemTitle}`;
  return `Due in ${days} days: ${itemTitle}`;
}
