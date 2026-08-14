# 📓 Kenali Dirimu — Interactive Psychological Workbook & Self-Talk Journal Remaja

> Platform web interaktif berbasis jurnal refleksi diri untuk remaja, dirancang oleh psikolog sebagai alat bantu edukatif psikologis non-diagnostik.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Cloud-3FCF8E?logo=supabase&logoColor=white)

---

## ✨ Tentang Proyek

**Kenali Dirimu** adalah aplikasi web interaktif yang menyediakan ruang aman dan privat bagi remaja untuk melakukan **refleksi diri** melalui workbook psikologis. Aplikasi ini dirancang dengan pendekatan:

- **Privasi & Keamanan**: Tanpa email — cukup nama panggilan & PIN 4-digit
- **Edukatif, Bukan Diagnostik**: Bukan alat diagnosis, melainkan alat bantu refleksi emosional
- **Desain Jurnal Handwritten**: Tampilan layaknya buku tulis & jurnal pribadi yang hangat

---

## 🎯 Fitur Utama

### 👤 Sisi Remaja / Peserta
| Fitur | Deskripsi |
|---|---|
| **Login Aman** | Masuk hanya dengan Nama Panggilan, Umur, dan PIN 4-digit |
| **Workbook Interaktif** | 8 jenis pertanyaan: teks singkat, jurnal panjang, pilihan ganda, emoji selector, likert scale, rating bintang, dan ya/tidak |
| **Auto-Save Real-time** | Jawaban tersimpan otomatis setiap kali diketik |
| **Ringkasan Refleksi Pribadi** | Rangkuman emosi, catatan refleksi, dan pesan apresiasi setelah menyelesaikan workbook |
| **Cetak / Simpan PDF** | Ringkasan refleksi bisa dicetak atau disimpan sebagai PDF |

### 🛡️ Sisi Psikolog / Admin
| Fitur | Deskripsi |
|---|---|
| **Dashboard Analitik** | Statistik total peserta, rata-rata usia, sesi selesai, dan sesi berlangsung |
| **Demografi Usia** | Analisis kelompok usia: Remaja Awal (10-14), Tengah (15-17), Akhir (18+) |
| **CRUD Peserta** | Tambah, edit (nama, umur, PIN), dan hapus peserta remaja |
| **Inspeksi Jawaban** | Lihat seluruh isian jawaban setiap peserta per workbook dan per soal |
| **Visual Workbook Editor** | Buat dan edit workbook, section, dan pertanyaan langsung dari browser |
| **Multi-Tipe Soal** | Dukung 8 tipe pertanyaan dengan opsi kustom dan ilustrasi gambar |

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|---|---|
| **React 19** + **TypeScript** | Frontend framework & type safety |
| **Vite 6** | Build tool & dev server |
| **TailwindCSS 3** | Utility-first CSS styling |
| **Supabase** | Backend-as-a-Service (database PostgreSQL cloud) |
| **Lucide React** | Icon library |
| **Canvas Confetti** | Efek confetti saat menyelesaikan sesi |
| **LocalStorage** | Offline fallback data persistence |

---

## 🚀 Instalasi & Menjalankan Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18+ 
- npm atau yarn

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/kenali-dirimu.git
cd kenali-dirimu

# 2. Install dependencies
npm install

# 3. Salin file environment
cp .env.example .env

# 4. Isi kredensial Supabase di file .env
#    VITE_SUPABASE_URL=https://your-project.supabase.co
#    VITE_SUPABASE_ANON_KEY=your-anon-key

# 5. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Produksi

```bash
npm run build
npm run preview
```

---

## 🗄️ Setup Database Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** di dashboard Supabase
3. Jalankan isi file [`supabase_schema.sql`](./supabase_schema.sql) untuk membuat semua tabel
4. Salin **Project URL** dan **Anon Key** ke file `.env`

### Struktur Tabel Database

| Tabel | Deskripsi |
|---|---|
| `users` | Data peserta (nama, umur, PIN hash, role) |
| `workbooks` | Metadata workbook refleksi |
| `sections` | Section/bagian dalam workbook |
| `questions` | Pertanyaan refleksi per section |
| `sessions` | Sesi pengerjaan peserta |
| `responses` | Isian jawaban peserta per pertanyaan |

---

## 📁 Struktur Proyek

```
kenali-dirimu/
├── public/
│   └── assets/              # Ilustrasi gambar workbook
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx    # Dashboard admin & psikolog
│   │   ├── AuthModal.tsx         # Modal login peserta & admin
│   │   ├── HelplineModal.tsx     # Modal kontak layanan konseling
│   │   ├── Navbar.tsx            # Navigasi atas responsive
│   │   ├── PersonalSummary.tsx   # Ringkasan refleksi pribadi
│   │   ├── QuestionCard.tsx      # Kartu input pertanyaan (8 tipe)
│   │   ├── SafetyDisclaimerModal.tsx  # Disclaimer keamanan
│   │   └── WorkbookSession.tsx   # Sesi pengerjaan workbook
│   ├── context/
│   │   └── AppContext.tsx        # State management global
│   ├── data/
│   │   └── initialData.ts       # Data workbook awal (seed)
│   ├── lib/
│   │   └── supabase.ts          # Konfigurasi Supabase client
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces & types
│   ├── App.tsx                   # Root component & landing page
│   ├── index.css                 # Global styles & design system
│   └── main.tsx                  # Entry point
├── .env                          # Environment variables (jangan commit!)
├── .gitignore
├── index.html
├── package.json
├── supabase_schema.sql           # SQL schema untuk setup database
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔐 Akses Demo

| Role | Cara Masuk |
|---|---|
| **Remaja / Peserta** | Tab "Akses Remaja" → Masukkan Nama Panggilan, Umur, dan PIN 4-digit |
| **Psikolog / Admin** | Tab "Psikolog / Admin" → PIN Admin: `9999` |

---

## 🎨 Desain & Estetika

Aplikasi ini menggunakan konsep desain **jurnal handwritten** dengan elemen visual:

- 🖊️ **Font tulisan tangan** (Caveat, Patrick Hand) untuk kesan personal
- 📎 **Selotip kertas** (masking tape) sebagai dekorasi
- 📓 **Spiral notebook binding** pada kartu pertanyaan
- 🎨 **Palet warna hangat** (krem, cokelat muda, slate) yang menenangkan
- ✨ **Micro-animations** untuk interaksi yang hidup

---

## ⚠️ Disclaimer

> Aplikasi ini adalah **alat bantu refleksi diri edukatif** dan **bukan merupakan alat diagnosis psikologis medis**. Jika kamu atau seseorang yang kamu kenal membutuhkan bantuan profesional, silakan hubungi layanan konseling yang tersedia melalui fitur "Layanan Bantuan" di dalam aplikasi.

---

## 📄 Lisensi

MIT License — Silakan digunakan, dimodifikasi, dan dikembangkan.

---

<p align="center">
  <strong>Dibuat dengan ♡ untuk kesehatan mental remaja Indonesia</strong>
</p>
