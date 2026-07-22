# MabaGuide - Universitas Bunda Mulia (UBM)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat)
![Status](https://img.shields.io/badge/status-Production_Ready-success?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
> Panduan Terpersonalisasi untuk Akselerasi Orientasi Akademik dan Birokrasi Kampus UBM.

MabaGuide adalah sebuah platform Progressive Web Application (PWA) modern yang dirancang khusus untuk memandu Mahasiswa Baru (Maba) Universitas Bunda Mulia. Platform ini bertujuan untuk memudahkan Maba dalam beradaptasi dengan lingkungan kampus, birokrasi, dan sistem akademik melalui panduan yang disesuaikan (*personalized*) dengan Fakultas dan Program Studi mereka.

Dibangun sebagai bagian dari **Lomba INSPIRE**.

---

## ✨ Fitur Utama

- **Personalized Onboarding**: Pengguna dapat memilih Fakultas dan Program Studi saat pertama kali membuka aplikasi. Konten artikel dan panduan yang muncul akan disesuaikan dengan pilihan tersebut.
- **Sistem Artikel Markdown**: Semua panduan dan FAQ disimpan dalam bentuk Markdown (MD) dengan *YAML Frontmatter*, sehingga sangat mudah untuk ditambahkan, dikelola, dan diperbarui oleh administrator tanpa perlu menyentuh database.
- **Pencarian Cerdas (Smart Search)**: Dilengkapi dengan fitur pencarian yang cepat dan filter kategori (Birokrasi, Fasilitas, Kamus Akademik, dll) untuk mempermudah navigasi.
- **Responsif & Multi-Platform**: Mengadopsi arsitektur *Mobile-First* dengan *Bottom Navigation* yang nyaman di layar HP, namun juga secara otomatis bertransformasi menjadi layout *Sidebar* yang luas dan elegan ketika diakses melalui PC atau Tablet.
- **Dynamic Light & Dark Mode**: Menggunakan sistem *theming* cerdas yang otomatis mengikuti preferensi OS perangkat pengguna, dilengkapi dengan palet warna premium khas identitas UBM.
- **Direktori Kampus**: Informasi lengkap seputar lokasi fasilitas kampus dan Unit Kegiatan Mahasiswa (UKM).

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan arsitektur UI *Custom Minimalist* (tanpa ketergantungan library komponen berat).
- **Theme Engine**: `next-themes` (Dukungan *Dark Mode* otomatis berbasis `oklch`).
- **Markdown Parser**: `gray-matter` (Digunakan untuk mengolah konten statis).
- **Icons**: Custom SVG Icons & Premium Icons.
- **Backend / Database**: [Supabase](https://supabase.com/) (Dipersiapkan untuk fitur *Rating* artikel dan *Feedback* pengguna).

---

## 📂 Struktur Proyek

```text
mabaguide/
├── app/                  # Next.js App Router (Halaman & API Routes)
│   ├── api/              # API Endpoints (contoh: /api/articles)
│   ├── directory/        # Halaman Direktori Kampus
│   ├── faq/              # Halaman Detail Artikel Panduan
│   ├── onboarding/       # Halaman Pemilihan Fakultas & Prodi
│   ├── profile/          # Halaman Profil Pengguna
│   ├── search/           # Halaman Pencarian
│   ├── globals.css       # Konfigurasi Tema (Variabel Warna oklch)
│   ├── layout.tsx        # Layout utama aplikasi
│   └── page.tsx          # Halaman Beranda (Home)
├── components/           # Komponen UI Reusable (HomeHeader, QuickMenu, TopArticles, dll)
├── content/              # Database Artikel Markdown
│   └── faq/              # Kumpulan file .md panduan
├── hooks/                # Custom React Hooks
├── lib/                  # Utility Functions & Konfigurasi (Markdown parser, Supabase client)
└── public/               # Asset statis (Logo UBM, Manifest PWA)
```

---

## 📝 Panduan Penulisan Artikel Baru

Jika Anda (atau AI) ingin menambahkan artikel baru ke dalam web ini, buat file `.md` baru di dalam folder `content/faq/` dengan standar *frontmatter* berikut:

```markdown
---
title: "Judul Artikel Anda"
category: "Birokrasi / Fasilitas / Kamus"
faculty: "Kode Fakultas (Contoh: FTD) atau General"
program: "Nama Prodi atau General"
---

Isi artikel Anda dalam format Markdown dimulai di sini...
```

---

## 🔮 Roadmap Selanjutnya

- [ ] Konfigurasi `next-pwa` untuk memungkinkan pengguna menginstal (Add to Homescreen) web ini secara *offline* di HP mereka.
- [ ] Implementasi integrasi Supabase untuk sistem *Rating / Like* pada artikel.
- [ ] Fitur simpan artikel (Bookmarks) menggunakan `localStorage`.
- [ ] Optimasi *Bundle Size* untuk mencapai skor Lighthouse yang lebih sempurna.

---
*Didesain dan dikembangkan dengan ❤️ oleh tim BITGrow INSPIRE 1.0 2026 UBM.*
