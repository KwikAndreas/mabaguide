# MabaGuide Revamp: Dokumentasi, Visi, & UI Style Guide

Dokumen ini merangkum visi produk, progres fitur eksisting, evaluasi desain, dan panduan lengkap gaya antarmuka (UI Style Guide) untuk proyek **MabaGuide** — *Website Panduan Untuk Mahasiswa Baru Dalam Mengenali Orientasi Akademik Dan Birokrasi Kampus*.

---

## 1. Pendahuluan & Visi

Masa transisi menjadi mahasiswa baru sering kali membingungkan karena banyaknya istilah birokrasi, sistem akademik (KRS, SKS, batas absen, LM/LA, TUGA/TUH), dan ragam organisasi. MabaGuide hadir sebagai satu portal *cheat-sheet* interaktif yang terpersonalisasi, membantu mahasiswa melewati kebingungan semester pertama dengan cepat, akurat, dan percaya diri.

**Tech Stack Ekosistem:**
- Next.js (App Router)
- Tailwind CSS v3/v4
- TypeScript
- Supabase (Backend as a Service)

---

## 2. Inventarisasi Fitur Eksisting (Progres Berjalan)

Sistem dasar MabaGuide saat ini sudah mencakup 8 pilar utama:
1. **Personalisasi Konten (Onboarding):** Filter prodi/fakultas tersimpan via `localStorage`. Artikel difilter secara dinamis.
2. **Markdown-Based Engine (CMS-less):** Artikel dikelola menggunakan file `.md` berlapis dengan Frontmatter dan dukungan *embed* gambar lokal.
3. **Smart Search:** Sistem pencarian dan kategorisasi artikel cerdas.
4. **Interactive Campus Directory:** Daftar letak fasilitas dan Unit Kegiatan Mahasiswa (UKM).
5. **Responsive & Adaptive Layout:** *Bottom bar* untuk mobile, *Bento Box* & *Sidebar* untuk desktop.
6. **Dynamic Light & Dark Mode:** Adaptasi tema otomatis menyesuaikan preferensi sistem.
7. **Rating & Feedback System:** Terhubung langsung ke Supabase API.
8. **Custom 404 Page:** Halaman khusus *Not Found*.

---

## 3. Diagnosis Masalah Desain: Sindrom "AI-Slop"

Kritik *feedback* terbesar saat ini adalah tampilan yang "AI-Slop" — terasa seperti *template generic* buatan AI (v0, shadcn *default*, atau template SaaS generik).

**Ciri khas AI-Slop yang harus dibuang dari MabaGuide:**
- 🚫 **Bosan dengan Gradien:** Penggunaan gradien *Purple-Cyan-Indigo* yang tidak memiliki makna/kaitan dengan identitas kampus.
- 🚫 **Kurangnya Hierarki Border & Shadow:** Mengandalkan *rounded-2xl* dan *border-white/10* monoton pada mode gelap, membuat tampilan terasa rata, membosankan, dan tidak bernyawa.
- 🚫 **Kaku & Dingin:** Tampilan terlalu mirip *dashboard B2B (Business-to-Business)*, padahal target pasarnya adalah mahasiswa baru (Maba) berusia belasan tahun yang butuh nuansa hangat, *fun*, dan menenangkan (menghilangkan stres birokrasi).
- 🚫 **Floating Blurs / Glowing Orbs:** Lingkaran cahaya buram di latar belakang yang tidak menambah nilai keterbacaan (hanya kosmetik kosong AI).

---

## 4. Konsep Revamp Antarmuka (UI Direction)

Untuk keluar dari jebakan *AI-Slop*, MabaGuide akan menggunakan konsep **"Neo-Utility Campus Guide"** (Campuran antara gaya Editorial/Majalah Akademik modern dan Antarmuka Kartu/Stiker Taktil).

### A. Palet Warna (The New Palette)
Tinggalkan warna abu-abu kebiruan default (*slate*). Beralih ke palet yang lebih berkarakter:
- **Light Mode (Warm & Inviting):**
  - **Background:** *Warm Paper/Bone* (`#FBFBF9` atau `#F5F5F0`). Memberi kesan seperti membaca buku catatan kampus yang nyaman, tidak menyilaukan mata.
  - **Text:** *Soft Charcoal* (`#1C1917` atau `#27272A`).
  - **Borders & Lines:** Garis tegas (1px atau 2px solid `#E5E5E5` atau bahkan `#1C1917` ala *neo-brutalism* tipis).
- **Dark Mode (Midnight Obsidian):**
  - **Background:** *Deep Obsidian/Midnight* (`#0A0A0C` atau `#0D1117`). Sangat pekat dan bersih, bukan abu-abu gelap.
  - **Text:** *Crisp Off-White* (`#FAFAFA`).
  - **Surface/Cards:** Gunakan *Solid Dark Surface* (`#18181B`) dengan *subtle border* (`#27272A`), tanpa efek *glow/blur* murahan.

### B. Sistem Penanda Warna (Faculty & Category Accent System)
Alih-alih gradien, gunakan *Solid Pop Colors* sebagai penanda visual fungsional:
- **Tag Akademik:** *Royal Blue* / *Cobalt*.
- **Tag Birokrasi:** *Terracotta* / *Crimson*.
- **Tag UKM/Organisasi:** *Forest Green* / *Emerald*.
- **Tag Kamus:** *Amber* / *Mustard*.
*Personalisasi Fakultas: Berikan aksen warna ringan (garis bawah judul/icon) yang menyesuaikan warna almamater fakultas (misal: Biru untuk Fakultas X, Merah untuk Fakultas Y).*

### C. Tipografi (The Voice of MabaGuide)
Tipografi yang kuat adalah kunci membasmi AI-Slop.
- **Headings (Display):** Gunakan font berkarakter dan modern seperti **Clash Display**, **Plus Jakarta Sans**, atau **Space Grotesk**. Set dalam *font-weight: 700 / 800*, tight *letter-spacing* (tracking ketat).
- **Body & Paragraf:** Gunakan font yang super legibel untuk membaca panduan panjang seperti **Inter**, **Geist**, atau **Switzer**.
- **Monospace/Cheat-codes:** Gunakan **JetBrains Mono** atau **Geist Mono** untuk istilah portal (seperti kode `LM/LA`, `TUH`, angka SKS).

### D. Bentuk & Komponen Taktil
- **Button & Card Interactions:** Beri efek fisik. Saat tombol diklik, harus ada transisi turun kecil (`active:translate-y-[2px]`) agar terasa seperti ditekan sungguhan, bukan efek transisi *opacity* generik.
- **Bentuk (Border Radius):** Kombinasikan ujung tajam dan lengkung. (Misal: Ujung sudut luar *rounded-2xl*, ujung dalam komponen *rounded-md*).
- **Badges/Chips:** Bentuk seperti "Stempel" atau "Stiker" kampus, dengan *outline* jelas atau *background solid* + teks *bold*.

---

## 5. Implementasi Revamp Per Halaman

Berikut adalah panduan detail rombakan untuk masing-masing halaman:

### 1. Halaman Onboarding & Profil (The ID Card)
- **Desain:** Jangan sekadar form input `select` generik. Buat interaksi memilih fakultas dan prodi menyerupai proses pembuatan "Kartu Mahasiswa Virtual" (KTM).
- **Visual:** Kartu virtual beranimasi (dengan Framer Motion) yang mengonfirmasi identitas maba ("Selamat Datang, Maba [Fakultas]!").

### 2. Halaman Utama (Home - The Bento Revamp)
- **Bento Grid yang Dinamis:** Hindari susunan kotak monoton yang besarnya seragam.
- **Kotak 1 (Hero/Headline):** Ukuran paling besar, *greeting* terpersonalisasi, gambar/ilustrasi doodle (*line-art* atau grafis flat mahasiswa) untuk *call to action* "Mulai Navigasi Akademikmu".
- **Kotak 2 (Progress/Checklist):** Kartu kecil "Hal yang Harus Kamu Lakukan Minggu Ini" (seperti bayar SKS, kumpul KRS).
- **Kotak 3 & 4 (Quick Access):** Jalan pintas ke "Kamus Birokrasi" dan "Portal E-Learning" dengan icon spesifik, bukan icon *lucide* default yang kebesaran.

### 3. Halaman Artikel & Engine Markdown (The Reading Experience)
- **Tipografi Editorial:** Fokus pada pengalaman membaca seperti di *Medium* atau *Substack*. 
- **Callout Box (Tips/Warning):** Ganti blockquote bawaan markdown dengan komponen *Custom Callout*. Misal: Box Peringatan Absensi (2 SKS = 1x bolos) desainnya menyerupai garis polisi/rambu lalu lintas berwarna kuning/hitam agar *eye-catching*.
- **Sticky Table of Content:** Di sisi layar dekstop, daftar isi harus menempel (*sticky*) dan me-highlight bagian yang sedang dibaca.
- **Rating Component:** Letakkan di *footer* artikel. Gunakan UI reaksi berbasis *Emoji* (Bermanfaat 🤩, Kurang Jelas 🤔) alih-alih form 5 bintang (terlalu serius seperti e-commerce). Terhubung mulus ke *Supabase*.

### 4. Halaman Pencarian Cerdas (Smart Search)
- **Instant Search Modal / Command Palette:** Ganti halaman *search* pasif dengan desain ala `Ctrl+K` *Command Menu* khas macOS (seperti Spotlight) atau halaman fokus *search* yang terpisah bersih dengan *Suggestion Tags* instan ("Coba cari: 'Beda LM dan LA'").

### 5. Halaman Direktori Kampus (The Interactive Hub)
- **List/Grid dengan Filter Visual:** Desain *card* UKM atau Lokasi Birokrasi seperti lemari arsip (katalog). Setiap card memiliki label kategori (*Sticker Badge*).
- **Aksi Cepat:** Berikan tombol "Copy Alamat/Info" atau "Kunjungi Instagram UKM" secara jelas pada setiap entri.

### 6. Custom 404 (The Lost Freshman)
- **Desain Tematik:** Daripada "404 Page Not Found" standar AI, gunakan *copywriting* kreatif seperti: *"Waduh, kamu kesasar! Halaman ini sepertinya belum didaftarkan di KRS. Yuk balik ke beranda."*
- **Aksi Cepat:** Sediakan tombol "Cari Bantuan" atau "Kembali ke Basecamp".

---

## 6. Action Plan & Kesimpulan

Tampilan AI-Slop terjadi ketika kita menyerahkan seluruh keputusan tata letak (layout) dan visual pada sistem LLM bawaan atau *copy-paste template*. Dengan menerapkan konsep **Neo-Utility Campus Guide**, kita tidak hanya menaruh data di layar, tetapi **merancang sebuah pengalaman yang mendampingi Maba beradaptasi**. 

**Tahapan Pengerjaan Revamp:**
1. **Langkah 1: Tweak Design Tokens.** Update `tailwind.config.ts`, hapus semua utility *gradient glow/blur*, set *custom colors* (Warm Paper & Obsidian), pasang font utama (misal: Plus Jakarta Sans).
2. **Langkah 2: Rebuild Core Primitives.** Rombak ulang komponen `Card`, `Button`, `Badge` sesuai aturan *Anti AI-Slop* di dokumen `AGENTS.md`.
3. **Langkah 3: Page by Page Refactoring.** Mulai dari *Home (Bento)*, kemudian *Onboarding Profile*, lalu *Article Reader*.
4. **Langkah 4: Polish & Micro-interactions.** Tambahkan *hover state*, *active state*, dan *framer-motion* ringan (page transition/loading skeleton).