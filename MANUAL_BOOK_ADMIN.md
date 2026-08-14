# 📘 Manual Book & Panduan Penggunaan Panel Admin (Psikolog)
## Platform "Kenali Dirimu" — Interactive Psychological Workbook & Self-Talk Journal Remaja

Selamat datang di Panduan Penggunaan Administrator untuk platform **Kenali Dirimu**. Dokumen ini dirancang sebagai panduan operasional resmi bagi **Psikolog / Guru BK / Administrator** dalam mengelola peserta remaja, menginspeksi refleksi, serta menyusun dan mengatur booklet workbook interaktif.

---

## 📑 Daftar Isi
1. [Pendahuluan & Akses Masuk](#1-pendahuluan--akses-masuk)
2. [Modul 1: Ringkasan Analitik & Demografi](#2-modul-1-ringkasan-analitik--demografi)
3. [Modul 2: Pengelolaan Peserta Remaja (CRUD)](#3-modul-2-pengelolaan-peserta-remaja-crud)
4. [Modul 3: Inspeksi Jawaban & Refleksi Peserta](#4-modul-3-inspeksi-jawaban--refleksi-peserta)
5. [Modul 4: Pengelolaan Workbook & Editor Pertanyaan](#5-modul-4-pengelolaan-workbook--editor-pertanyaan)
6. [Tipe-Tipe Pertanyaan & Cara Penggunaannya](#6-tipe-tipe-pertanyaan--cara-penggunaannya)
7. [SOP & Etika Pengelolaan Data Psikologis](#7-sop--etika-pengelolaan-data-psikologis)
8. [Troubleshooting & Solusi Kendala](#8-troubleshooting--solusi-kendala)

---

## 1. Pendahuluan & Akses Masuk

### 🎯 Tujuan Platform
Platform ini berfungsi sebagai ruang refleksi diri non-diagnostik bagi remaja untuk mengekspresikan emosi, mengenali diri sendiri, dan melakukan *self-talk* positif secara aman. Administrator berperan memantau partisipasi, menginspeksi respon emosional, serta menyesuaikan isi pertanyaan sesuai kebutuhan perkembangan remaja.

### 🔑 Cara Login Administrator
1. Buka aplikasi di browser (misal: `http://localhost:3000` atau URL domain publik).
2. Klik tombol **`Masuk / Buat PIN`** di sudut kanan atas navigasi.
3. Pilih tab **`Psikolog / Admin`**.
4. Masukkan **PIN Administrator** yang telah dikonfigurasi.
5. Klik **`Masuk ke Panel Admin`**.
6. Setelah berhasil, Anda akan langsung diarahkan ke **Panel Admin**.

---

## 2. Modul 1: Ringkasan Analitik & Demografi

Di tab **Overview (Ringkasan)**, Anda dapat memantau aktivitas platform secara real-time melalui kartu statistik dan grafik demografi.

### 📊 Kartu Statistik Utama
- **Total Peserta Remaja**: Jumlah peserta terdaftar di dalam sistem.
- **Rata-rata Usia**: Usia rata-rata dari seluruh remaja yang terdaftar (misal: 15.4 tahun).
- **Refleksi Selesai**: Jumlah sesi refleksi yang telah diselesaikan 100%.
- **Sedang Berlangsung**: Jumlah sesi yang masih aktif diisi oleh peserta.

### 🎂 Breakdown Demografi Usia
Sistem secara otomatis mengelompokkan peserta berdasarkan kategori usia perkembangan remaja:
- **10 - 14 Tahun (Remaja Awal / SMP)**: Fokus pada pengenalan emosi dasar & adaptasi sekolah.
- **15 - 17 Tahun (Remaja Tengah / SMA)**: Fokus pada dinamika krisis identitas & hubungan sosial.
- **18+ Tahun (Remaja Akhir / Kuliah)**: Fokus pada kemandirian & perencanaan masa depan.

---

## 3. Modul 2: Pengelolaan Peserta Remaja (CRUD)

Di tab **`Daftar Peserta Remaja`**, Anda memiliki akses penuh untuk mengelola akun peserta.

### ➕ 1. Menambah Peserta Baru (Create)
1. Klik tombol **`+ Tambah Peserta`** di kanan atas tabel peserta.
2. Masukkan **Nama Panggilan** (contoh: *Budi*).
3. Masukkan **Usia** (contoh: *15*).
4. Masukkan **4-Digit PIN Akses** awal (contoh: *1234*).
5. Klik **`Simpan Peserta`**. Peserta dapat langsung login dengan nama & PIN tersebut.

### 👁️ 2. Melihat Data & Status (Read)
Tabel peserta menampilkan:
- Nama Panggilan & Usia
- PIN Hash
- Tanggal Pendaftaran
- Status Pengerjaan Workbook (Misal: *1/1 Selesai*)

### ✏️ 3. Mengubah Data Peserta (Update)
1. Klik tombol **`Edit`** (ikon pensil) pada baris peserta yang dituju.
2. Anda dapat memperbarui:
   - Nama Panggilan
   - Usia
   - PIN 4-Digit baru (kosongkan jika tidak ingin meriset PIN)
3. Klik **`Simpan Perubahan`**.

### 🗑️ 4. Menghapus Peserta (Delete)
1. Klik tombol **`Hapus`** (ikon tempat sampah merah).
2. Konfirmasi penghapusan pada modal dialog.
3. **Catatan**: Menghapus peserta akan menghapus akun beserta **seluruh riwayat jawaban** peserta tersebut secara permanen.

---

## 4. Modul 3: Inspeksi Jawaban & Refleksi Peserta

Fitur ini memungkinkan Psikolog/Admin meninjau isi refleksi peserta secara mendalam.

### 🔍 Cara Melakukan Inspeksi Jawaban:
1. Di tab **Daftar Peserta Remaja**, cari nama peserta.
2. Klik tombol **`Lihat Jawaban`** (ikon mata 👁️).
3. Modal **Inspeksi Jawaban Peserta** akan terbuka, menampilkan:
   - **Filter Workbook**: Memilih workbook spesifik yang ingin diperiksa.
   - **Status Sesi**: Menampilkan waktu mulai & waktu penyelesaian.
   - **Daftar Pertanyaan & Jawaban**: Menampilkan setiap soal beserta jawaban persis yang diisikan peserta (pilihan ganda, teks jurnal, emoji, skala likert, rating).
   - **Ringkasan Emosi**: Menampilkan emosi yang paling sering dipilih oleh peserta.

---

## 5. Modul 4: Pengelolaan Workbook & Editor Pertanyaan

Di tab **`Kelola Workbook`**, Anda dapat membuat, mempublikasikan, dan menyunting kurikulum refleksi.

### 📚 1. Mengatur Status Workbook
- **`Aktif (Published)`**: Workbook dapat dilihat dan dikerjakan oleh remaja di beranda depan.
- **`Sembunyi (Draft)`**: Workbook disimpan sebagai draf dan hanya bisa dilihat oleh Admin.

### ✏️ 2. Menyunting Workbook & Section
1. Klik tombol **`Edit Isi Workbook`** pada card workbook.
2. Di form editor, Anda dapat mengubah:
   - **Judul Workbook** & **Deskripsi Utama**
   - **Status Publikasi**
3. Mengatur **Section (Bagian)**:
   - Setiap workbook dapat memiliki beberapa Section (misal: *Bagian 1: Perasaanku Hari Ini*, *Bagian 2: Harapan Masa Depan*).
   - Anda dapat menambah judul & deskripsi di setiap section.

### ➕ 3. Menambah Pertanyaan Baru
- Untuk menambah pertanyaan di dalam section tertentu: Klik tombol **`+ Tambah Pertanyaan`** yang berada di **bagian paling bawah** daftar soal di section tersebut.
- Untuk menambah section baru: Klik tombol **`+ Tambah Section Baru`** di **bagian paling bawah** editor.

---

## 6. Tipe-Tipe Pertanyaan & Cara Penggunaannya

Sistem mendukung **8 tipe pertanyaan** yang dapat disesuaikan dengan kebutuhan asesmen:

| Tipe Pertanyaan | Kegunaan & Karakteristik |
|---|---|
| **`short_text`** (Teks Singkat) | Untuk jawaban singkat 1 kalimat (misal: *"Apa warna favoritmu hari ini?"*). |
| **`long_text`** (Jurnal Refleksi / Teks Panjang) | Untuk menulis cerita/curhat bebas tanpa batasan karakter. Sangat cocok untuk *self-talk* emosional. |
| **`single_choice`** (Pilihan Ganda - 1 Jawaban) | Memilih 1 opsi dari daftar yang tersedia. |
| **`multiple_choice`** (Pilihan Ganda - Banyak Jawaban) | Memilih lebih dari 1 opsi sekaligus. |
| **`emoji_selector`** (Pilih Emoji Emosi) | Menampilkan kartu emoji interaktif untuk mengekspresikan suasana hati (misal: 😃, 😔, 😡, 🥺). |
| **`likert_scale`** (Skala 1 - 5) | Pengukuran tingkat intensitas emosi/gejala dari skala 1 (sangat ringan) hingga 5 (sangat berat). |
| **`rating`** (Rating Bintang 1 - 5) | Penilaian bintang interaktif. |
| **`yes_no`** (Ya / Tidak) | Pertanyaan konfirmasi sederhana. |

### 🖼️ Menambahkan Ilustrasi Gambar & Teks Bantuan (*Helper Text*)
- **Helper Text**: Petunjuk tambahan yang muncul di bawah soal untuk memandu remaja.
- **URL Gambar**: Masukkan path gambar ilustrasi sketsa (contoh: `/assets/teen_emotions_moods.png`) untuk menghidupkan kartu pertanyaan.

---

## 7. SOP & Etika Pengelolaan Data Psikologis

Sebagai pengelola platform, harap memperhatikan standar operasional berikut:

1. **Kerahasiaan Data (Confidentiality)**:
   - Data refleksi remaja bersifat sensitif. Jangan membagikan respon pribadi peserta kepada pihak luar tanpa izin.
   - Gunakan nama panggilan atau inisial jika mendiskusikan studi kasus.
2. **Prinsip Non-Diagnostik**:
   - Hasil refleksi di aplikasi ini **bukan merupakan diagnosis medis**. Gunakan hasil refleksi sebagai bahan awal untuk sesi konseling tatap muka jika diperlukan.
3. **Penanganan Kasus Risiko (Helpline)**:
   - Jika ditemukan respon peserta yang mengindikasikan bahaya diri atau trauma berat pada jawaban `long_text`, segera tindak lanjuti melalui sesi konseling langsung atau hubungi kontak layanan bantuan/hotline yang terdaftar.

---

## 8. Troubleshooting & Solusi Kendala

| Kendala | Penyebab | Solusi |
|---|---|---|
| Lupa PIN Admin | PIN belum disesuaikan di source code | Cek nilai PIN di `src/context/AppContext.tsx` pada fungsi `loginAdmin`. |
| Peserta Lupa PIN | Peserta tidak ingat 4 digit PIN miliknya | Masuk ke Panel Admin → Tab **Daftar Peserta Remaja** → Klik **Edit** pada nama peserta → Masukkan PIN baru → Klik **Simpan**. |
| Workbook tidak muncul di Halaman Depan | Status workbook masih *Draft* | Masuk ke Panel Admin → Tab **Kelola Workbook** → Ubah status menjadi **Aktif (Published)**. |
| Gambar Ilustrasi Tidak Muncul | Path URL gambar salah | Pastikan file gambar tersimpan di folder `public/assets/` dan path diawali dengan `/assets/nama_file.png`. |

---

<p align="center">
  <strong>Dokumen Manual Book Admin — Kenali Dirimu Platform © 2026</strong>
</p>
