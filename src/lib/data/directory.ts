export interface DirectoryItem {
  id: string;
  name: string;
  category: "Fasilitas Kampus" | "Unit Kegiatan Mahasiswa (UKM)" | "Unit Kegiatan Rohani (UKR)";
  description: string;
  locations?: string[];
  image?: string;
  logo?: string;
  socialMedia?: string;
  contactPerson?: string;
}

export const directoryData: DirectoryItem[] = [
  // Fasilitas Kampus
  {
    id: "perpustakaan",
    name: "Perpustakaan",
    category: "Fasilitas Kampus",
    description: "Perpustakaan pusat UBM menyediakan ribuan referensi buku cetak, e-book, jurnal internasional, dan area diskusi yang nyaman untuk belajar bersama.",
    locations: ["Lantai 2, Gedung A"],
    image: "/fasilitas/perpus.webp",
  },
  {
    id: "lab-komputer",
    name: "Lab Komputer",
    category: "Fasilitas Kampus",
    description: "Laboratorium komputer dengan spesifikasi tinggi yang mendukung kegiatan praktikum mahasiswa, seperti pemrograman, desain grafis, dan pemrosesan data.",
    locations: [
      "Lab A-D - Lantai 4",
    ],
    image: "/fasilitas/lab_jarkom.webp",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    category: "Fasilitas Kampus",
    description: "Kitchen hospar untuk kegiatan praktikum mahasiswa hospitaliti dan pariwisata",
    locations: [
      "Lantai 2",
    ],
    image: "/fasilitas/kitchen.webp",
  },
  {
    id: "plaza",
    name: "UBM Plaza (TUPA)",
    category: "Fasilitas Kampus",
    description: "UBM Plaza menyediakan fasilitas yang lengkap untuk kebutuhan mahasiswa, ATM, dan area istirahat.",
    locations: [
      "Lantai 1",
    ],
    image: "/fasilitas/plaza.webp",
  },
  {
    id: "tuh",
    name: "The UBM Hall (TUH)",
    category: "Fasilitas Kampus",
    description: "The UBM Hall (TUH) ",
    locations: [
      "Lantai 8",
    ],
    image: "/fasilitas/tuh.webp",
  },
  {
    id: "tuga",
    name: "The UBM Grand Auditorium (TUGA)",
    category: "Fasilitas Kampus",
    description: "The UBM Hall (TUH) ",
    locations: [
      "Lantai 8",
    ],
    image: "/fasilitas/tuga.webp",
  },
  // {
  //   id: "klinik-icare",
  //   name: "Klinik ICare",
  //   category: "Fasilitas Kampus",
  //   description: "Klinik kesehatan yang melayani pertolongan pertama pada kecelakaan (P3K) dan pemeriksaan kesehatan dasar secara gratis bagi sivitas akademika.",
  //   locations: ["Lantai 3, dekat TURLA"],
  //   image: "/fasilitas/klinik.webp",
  // },
  
  // Unit Kegiatan Mahasiswa (UKM)
  {
    id: "muay-thai",
    name: "Muay Thai",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "UKM Muay Thai, merupakan salah satu UKM bela diri yang ada di Universitas Bunda Mulia yang mempelajari gerakan bela diri dari Thailand sebagai Self Defense. Sejarah singkatnya, Muay Thai atau dikenal dengan istilah Thai Boxing sudah lama dipraktikan di seluruh daratan Asia Tenggara. Berdasarkan praktisi Muay Thai mengklaim bahwa Muay Thai sudah ada selama dua ribu tahun dan merupakan kombinasi gerakan bela diri Cina dan India. ",
    socialMedia: "https://www.instagram.com/ubm_muaythai/",
    contactPerson: "",
    image: "/ukm/muaythai.webp",
  },
  {
    id: "tartra",
    name: "Tartra",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Bidang kemahasiswaan UBM memfasilitasi minat dan bakat mahasiswa di bidang seni secara khusus dalam bidang Tari Tradisional, melalui Unit Kegiatan Mahasiswa (UKM) Tartra. Dalam UKM ini, mahasiswa mengembangkan minatnya di bidang tari melalui sejumlah kegiatan, seperti Pelatihan rutin dan kompetisi. Kegiatan latihan dilaksanakan secara rutin setiap hari Sabtu.",
    socialMedia: "https://www.instagram.com/ubm_tartra_ancol/",
    contactPerson: "",
    image: "/ukm/tartra.webp",
  },
  {
    id: "prodcine",
    name: "Prodcine",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Unit Kegiatan Mahasiswa (UKM) Production and Cinematography adalah unit kegiatan mahasiswa  yang bergerak dibidang Cinematography. Unit kegiatan mahasiswa ini dibentuk untuk mewadahi minat dan potensi para mahasiswa Universitas dalam bidang produksi dan sinematografi. ",
    socialMedia: "https://www.instagram.com/ubm_prodcine/",
    contactPerson: "LINE: @608adykp",
    image: "/ukm/prodcine.webp",
  },
  {
    id: "the-vou",
    name: "The VOU",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "The Voice of UBM atau biasa disebut dengan The VOU, merupakan unit kegiatan mahasiswa dibidang musik dan tarik suara. Sampai tahun ini, anggota The VOU sudah memiliki delapan generasi. Di The Vou terdapat beberapa kategori yaitu Vocal, Band, Vocal Group, dan Choir. Untuk mengasah kemampuan para anggotanya, The Vou memiliki pelatih dan mentor disetiap kategorinya. Kegiatan yang dilakukan oleh The Vou seperti: latihan rutin, monthly performance, vtc, big event, mengisi acara di kegiatan seminar atau cafe-cafe, dan berbagai kegiatan menarik lainnya. Bukan sekedar UKM untuk mengasah kemampuan dibidang musik, tapi The Vou juga menjadi tempat untuk belajar berorganisasi.",
    socialMedia: "https://www.instagram.com/ubm_vou_ancol/",
    contactPerson: "",
    image: "/ukm/the_vou.webp",
  },
  {
    id: "esport",
    name: "ESport",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "UKM Esport Universitas Bunda Mulia adalah Unit Kegiatan Mahasiswa yang secara khusus bergerak dalam Olahraga Esport dan Manajemen Esport sejak 2019 dan resmi menjadi Unit Kegiatan Mahasiswa sejak 2022. Membina seluruh mahasiswa Universitas Bunda Mulia dalam cabang kompetisi seperti DOTA 2 , Mobile Legend, Valorant, PUBG dll.",
    socialMedia: "https://www.instagram.com/ubm_esports/",
    contactPerson: "",
    image: "/ukm/esport.webp",
  },
  {
    id: "badminton",
    name: "Badminton",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Dalam rangka memfasilitasi minat dan mengembangkan talenta mahasiswa dalam olahraga badminton, Universitas Bunda Mulia memberikan kesempatan kepada mahasiswa untuk mengembangkan diri melalui Unit Kegiatan Mahasiswa (UKM) badminton. Hingga saat ini, UKM Badminton telah berhasil mendapatkan prestasi yang membanggakan, salah satunya adalah Juara untuk Ganda Campuran dan Tunggal Putra di DV Badminton 2018-2019. Pelatihan UKM ini secara rutin diadakan di lapangan bulu tangkis Universitas Bunda Mulia kampus Ancol setiap hari Senin dan Kamis, tepatnya pukul 17:00 hingga pukul 19:00.",
    socialMedia: "https://www.instagram.com/ubm_bmbc/",
    contactPerson: "",
    image: "/ukm/badminton.webp",
  },
  {
    id: "talent",
    name: "Talent",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Dalam upaya pengembangan di bidang non-akademik, Bidang Kemahasiswaan UBM memberi wadah dalam memfasilitasi mahasiswa untuk mengembangkan bakat dan keterampilan yang dimiliki. Sehingga nantinya dapat memberi dampak pada kualitas akademik mahasiswa. ",
    socialMedia: "https://www.instagram.com/ubm_mcu_ancol/",
    contactPerson: "",
    image: "/ukm/talent.webp",
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "TaeKwonDo adalah seni bela diri asal Korea yang juga merupakan olahraga nasional Korea dan merupakan salah satu seni beladiri populer di dunia yang dipertandingkan dalam Olimpiade. Dalam seni bela diri ini juga terdapat beragam sebutan dalam bahasa asing yaitu bahasa Korea seperti Dojang yang merupakan istilah yang digunakan dalam seni bela diri Korea (Taekwondo, Tang Soo Do, Kuk Sool Won, dan hapkido) dan mengacu pada ruang pelatihan formal / unit pelatihan / klub. Selain Dojang sebutan yang wajib diketahui oleh para TaeKwonDoIn (TaeKwonDo Indonesia) ialah Sabeum Nim di singkat SaNim (Kepala Instruktur/Pelatih), Sabeum (Instruktur/Pelatih), Gashuku (Ujian Kenaikan Sabuk), Geup (tingkatan/level sabuk, tiap warna dan strip memiliki tingkatan yang berbeda), dan teknik – teknik yang ada di dalam TaeKwonDo itu sendiri. ",
    socialMedia: "https://www.instagram.com/ubm_taekwondo/",
    contactPerson: "",
    image: "/ukm/taekwondo.webp",
  },
  {
    id: "icare",
    name: "iCare",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "iCare merupakan organisasi non-profit yang berada di bawah naungan Universitas Bunda Mulia yang sudah berdiri sejak 23 Juli 2007. iCare bergerak dengan tiga pilar dasar yakni Sosial, Lingkungan dan Kesehatan. ",
    socialMedia: "https://www.instagram.com/ubm_icare_ancol/",
    contactPerson: "",
    image: "",
  },
  {
    id: "futsal",
    name: "Futsal",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Unit Kegiatan Mahasiswa Futsal ini merupakan salah satu kegiatan non-akademik yang dapat dijalani oleh mahasiswa. Karena banyaknya minat mahasiswa di bidang olahraga seperti futsal maka Kemahasiswaan UBM juga memfasilitasi minat mahasiswa dibidang ini melalui Unit Kegiatan Mahasiswa Futsal (UKM Futsal). Pada latihan futsal kita bukan hanya belajar bagaimana tekniknya saja, di UKM ini kita juga belajar kekeluargaan. ",
    socialMedia: "https://www.instagram.com/ubm_futsal_ancol/",
    contactPerson: "",
    image: "/ukm/futsal.webp",
  },
  {
    id: "wushu",
    name: "Wushu",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Wushu berasal dari dua kata yaitu “Wu” artinya ilmu perang sedangkan kata “Shu” artinya seni. Jadi dapat diartikan wushu adalah seni untuk berperang. Yang mana didalamnya mengandung aspek seni, olahraga, kesehatan, beladiri dan juga mental.",
    socialMedia: "https://www.instagram.com/ubm_wushu/",
    contactPerson: "",
    image: "/ukm/wushu.webp",
  },
  {
    id: "biefindc",
    name: "Biefindc (Dance)",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "BIEFINDC atau Biemers Fusion in Dance Community merupakan unit kegiatan mahasiswa yang  bergerak dalam bidang seni tari modern. BIEFINDC membantu para mahasiswa mengembangkan bakat menari dengan memberikan pengalaman baru, membangun leadership dan kerjasama tim, dan mengikuti perlombaan.",
    socialMedia: "https://www.instagram.com/ubm_biefindc_ancol/",
    contactPerson: "",
    image: "/ukm/dance.webp",
  },
  {
    id: "teater",
    name: "Teater",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Berawal dari kemauan para biemers untuk terus mengembangkan kemampuan mereka dalam bidang seni akting dan teatrikal, Biems Theater UBM hadir untuk membantu mereka mengepakkan sayapnya  menjadi lebih tinggi lagi. Biems Theater UBM merupakan suatu Unit Kegiatan Mahasiswa yang berfokus kepada seni Teater dimana merupakan jenis kesenian pertunjukkan drama yang dipentaskan di sebuah panggung.",
    socialMedia: "https://www.instagram.com/ubm_biemstheater_ancol/",
    contactPerson: "",
    image: "/ukm/teater.webp",
  },
  {
    id: "basket",
    name: "Basket",
    category: "Unit Kegiatan Mahasiswa (UKM)",
    description: "Universitas Bunda Mulia memfasilitasi mahasiswa di bidang olahraga basket melalui UKM Basketball.  UKM Basketball memiliki kegiatan seperti latihan rutin dan kompetisi yang bisa diikuti oleh  mahasiswa UBM. Salah satu prestasi yang pernah di raih adalah Tim Basket UBM pernah menjadi  juara di Liga Basket Mahasiswa (LIBAMA).",
    socialMedia: "https://www.instagram.com/ubm_basketball_ancol/",
    contactPerson: "",
    image: "/ukm/basket.webp",
  },

  // Unit Kegiatan Rohani
  // Template dibawah
  // {
  //   id: "",
  //   name: "",
  //   category: "Unit Kegiatan Rohani (UKR)",
  //   description: "",
  //   locations: [""],
  //   socialMedia: "",
  //   contactPerson: "",
  //   image: "",
  // },
  {
    id: "budha",
    name: "Keluarga Mahasiswa Buddhis (KMB)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Keluarga Mahasiswa Buddhis (KMB) Dhammamitta merupakan Unit Kegiatan Rohani Agama Buddha yang dimiliki oleh Universitas Bunda Mulia. KMB Dhammamitta didirikan pada 29 September 2006. Saat ini KMB Dhammamitta sudah ada di 2 kampus, Kampus Ancol dan Kampus Serpong.",
    socialMedia: "https://www.instagram.com/ubm_kmbdhammamitta/",
    contactPerson: "Whatsapp: 0895810982050 (Ancol)",
    image: "/ukr/buddha.webp",
  },
  {
    id: "islam",
    name: "IKATAN MAHASISWA ISLAM UBM (IKAMI)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Unit Kegiatan Rohani IKAMI Universitas Bunda Mulia merupakan organisasi rohani yang mencakup mahasiswa dan mahasiswi muslim UBM baik kampus Ancol maupun Serpong. Kegiatan yang dilakukan diantaranya mengadakan ibadah rutin berupa kajian setiap minggu, melakukan santunan kepada anak yatim dilaksanakan rutin setiap tahunnya demi menumbuhkan rasa peduli dan kasih sayang kepada mereka, tafakur alam yang merupakan suatu kegiatan gabungan untuk mempererat silaturahmi dan keagamaan antara kampus Ancol dan Serpong, memperingati setiap hari besar islam dengan doa bersama, melakukan berbagai seminar tentang keagamaan yang dihadiri oleh narasumber berpengalaman, dan juga kami mensosialisasikan semua kegiatan IKAMI melalui sosial media Instagram kami yaitu @ikami_ubm , dalam akun tersebut kami berbagi berbagai pengalaman yang kami lakukan dan juga sharing terkait reminder sebagai seorang muslim.",
    socialMedia: "https://www.instagram.com/ubm_ikami/",
    contactPerson: "Email: ubm.ukrikami@gmail.com",
    image: "/ukr/islam.webp",
  },
  {
    id: "katolik",
    name: "Keluarga Mahasiswa Katolik UBM (KMK)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "Hai! Kami dari Unit Kegiatan Rohani agama Katolik yaitu Keluarga Mahasiswa Katolik (KMK) Universitas Bunda Mulia. Hadir disini untuk sama – sama melayani juga mengembangkan iman serta menjalin hubungan dalam kasih Tuhan dengan mengadakan kegitan rohani bersama. ",
    socialMedia: "https://www.instagram.com/ubm_kmk_ancol/",
    contactPerson: "",
    image: "/ukr/katolik.webp",
  },
  {
    id: "kristen",
    name: "Jesus in My Campus (JIC)",
    category: "Unit Kegiatan Rohani (UKR)",
    description: "JIC (Jesus in My Campus) adalah Unit Kegiatan Rohani “Kristen” yang telah berdiri di Universitas Bunda Mulia sejak tahun 2008. Baik di kampus Ancol maupun kampus Serpong, keduanya aktif dan rutin mengadakan berbagai pelayanan ibadah, persekutuan, hingga hari raya Kekristenan secara meriah.",
    socialMedia: "https://www.instagram.com/ubm_jic_ancol/",
    contactPerson: "",
    image: "/ukr/kristen.webp",
  },
  
];

export function getDirectoryItems() {
  return directoryData;
}

export function getDirectoryItemById(id: string) {
  return directoryData.find(item => item.id === id);
}
