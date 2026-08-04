# Daftar Perubahan & Modifikasi (Changes-Development4826)

Tanggal: 4 Agustus 2026

Dokumen ini berisi daftar lengkap pembaruan, modifikasi, dan perbaikan (UI/UX maupun Sistem) yang dilakukan selama sesi pengembangan hari ini.

## 1. Perombakan Total UI/UX (Desain Visual)
* **Penghapusan Gaya "Neo-Brutalism":** Menghapus semua garis tepi tebal hitam, bayangan (*shadow*) tebal, font berukuran terlalu besar yang serba kapital (*uppercase*), dan warna latar yang terlalu mencolok karena terkesan seperti "AI-Slop" dan mengganggu kenyamanan mata (terutama untuk audiens Gen-Z).
* **Penerapan Gaya "Clean Minimalist / SaaS":** Mengganti gaya desain menjadi jauh lebih elegan, bersih, dan profesional. Menggunakan bayangan lembut (*soft shadow*), sudut melengkung halus (*rounded corners*), dan ruang kosong (*whitespace*) yang lapang agar antarmuka tidak terasa sesak.
* **Implementasi Dark Mode Otomatis:** Mengatur pewarnaan situs (palet warna) agar dapat merespons secara otomatis mengikuti pengaturan tema gelap/terang (*Dark/Light Mode*) dari perangkat sistem pengguna (OS), tanpa perlu tombol *switch* manual.
* **Tipografi & Responsivitas Mobile:** Memperbaiki ukuran font dan margin teks (terutama pada halaman bacaan artikel FAQ) agar tulisan tidak "mentok" ke tepi kanan layar ketika dibuka di ponsel.

## 2. Modifikasi Komponen per Halaman
* **Beranda (Home):** 
  * Mengubah *header* menjadi gaya *glassmorphism* (efek kaca buram).
  * Mengubah kotak menu cepat (Kamus, Panduan, dll) menjadi gaya *Bento Grid*.
  * Membatasi daftar "Top Panduan" hanya menampilkan 3 artikel teratas, ditambah tombol "Lihat Semua" (*dropdown*).
* **Halaman Kamus Akademik & Search:** 
  * Desain direktori kamus diubah menjadi layout berjejer abjad yang rapi, ringan, dan tidak berisik.
  * Memodifikasi bar pencarian (*search bar*) menjadi *input field* modern dengan kerangka yang minimalis.
* **Halaman Direktori & Detail Direktori (UKM/Fasilitas):** Merapikan grid foto fasilitas, mengelompokkan kategori, dan merapikan tampilan deksripsinya.
* **Halaman Bacaan FAQ (Artikel):** 
  * Mengubah tampilan artikel layaknya platform *Medium* atau *Substack*. Didesain khusus untuk membaca panjang (*editorial style*) dengan struktur *heading* dan paragraf yang proporsional.
  * Merapikan ulang bentuk *Pie Chart* (grafik) untuk menghilangkan garis-garis kasar.