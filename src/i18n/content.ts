/**
 * Per-locale Home-page copy. English REFERENCES picha.ts (single source of
 * truth for facts + the English voice); other locales carry translated prose.
 * Facts that never translate (icons, phone numbers, the lullaby URL) stay in
 * picha.ts and are read directly by the page — only prose lives here.
 *
 * Personality entries align 1:1 with `personality` in picha.ts (same order),
 * so the page zips each translated {title, detail} with that item's icon.
 */
import { identity, personality, lullaby } from '../data/picha';

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
