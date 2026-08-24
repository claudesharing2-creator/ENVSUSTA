# Arah Desain EnvSusta

## Tiga arah eksplorasi

### 1. Field Guide yang Tenang
**Very Brief Intro:** Produk terasa seperti panduan lapangan modern untuk memahami jejak lingkungan secara bertahap. Nuansanya hangat, membumi, dan membantu pengguna baru tanpa mengintimidasi.

**Probability:** 0.07

### 2. Climate Operations Desk
**Very Brief Intro:** Interface menyerupai meja kerja operasional untuk tim sustainability dengan data yang ringkas, presisi, dan modular. Arah ini lebih padat dan cocok untuk pengguna profesional yang sudah matang.

**Probability:** 0.04

### 3. Regenerative Learning Atlas
**Very Brief Intro:** Pengalaman visual seperti atlas interaktif yang menghubungkan carbon, energi, air, limbah, dan nature. Arah ini lebih ekspresif dan bersifat edukatif.

**Probability:** 0.09

---

## Arah terpilih: Field Guide yang Tenang

### Design Movement
**Contemporary field-journal interface** yang memadukan kejelasan produk digital B2B dengan kehangatan editorial ilmu lingkungan. Sistem ini sengaja menjauhi visual hijau-klise dan dashboard gelap-neon; pengguna diarahkan melalui satu tugas kecil yang bermakna pada satu waktu.

### Core Principles
1. **Mulai dari tindakan, bukan jargon.** Setiap layar menjawab langkah apa yang dapat dilakukan pengguna berikutnya.
2. **Informasi bertingkat.** Ringkasan cukup untuk pemula; detail metodologi muncul ketika pengguna memilih untuk mempelajarinya.
3. **Kepercayaan melalui keterlacakan.** Status data, asumsi, dan sumber faktor terlihat tanpa mengacaukan layar utama.
4. **Ritme yang membumi.** Ruang kosong, kartu bertepi lembut, dan hirarki tipografi menciptakan rasa tenang ketika topik terasa kompleks.

### Color Philosophy
Basis warna memakai **paper sand** terang untuk membuat tools terasa seperti workspace yang terbuka, dipadukan dengan charcoal hangat untuk keterbacaan. Satu aksen teal-hijau digunakan hanya untuk tindakan, progres, dan informasi positif—bukan sebagai dekorasi yang berlebihan. Aprikot lembut dipakai pada alert pembelajaran atau risiko untuk memberi kontras manusiawi tanpa alarmisme.

### Layout Paradigm
Desktop memakai **rail navigasi sempit + workspace asimetris**: kolom utama untuk konteks kerja saat ini dan kolom samping sebagai “field notes” berisi insight, status, atau langkah berikutnya. Mobile memprioritaskan jalur “Hari ini” dan berubah menjadi tab bawah yang jelas, bukan sidebar yang diperkecil.

### Signature Elements
1. **Progress trail:** indikator kecil berbentuk jalur bertitik untuk merepresentasikan perjalanan sustainability.
2. **Field note cards:** kartu catatan dengan label metode, kepercayaan data, dan sumber, terinspirasi lembar observasi.
3. **Orbit meter:** visual lingkaran sederhana untuk footprint dan target gap, bukan gauge generik.

### Interaction Philosophy
Interaksi harus memberi orientasi: setiap CTA membuka langkah kecil yang spesifik, bukan modal generik. Kalkulator menunjukkan asumsi secara langsung dan memberi penjelasan singkat ketika pengguna memilih data estimasi. Draft tersimpan secara lokal di perangkat sebagai pilihan awal yang menjaga privasi.

### Animation
Gunakan transisi singkat 160–240 ms dengan easing yang tegas. Kartu dan panel hanya berpindah melalui opacity/transform. Progress trail dianimasikan sekali ketika langkah selesai; tidak ada animasi berulang. Semua motion non-esensial dinonaktifkan pada `prefers-reduced-motion`.

### Typography System
Gunakan **Manrope** untuk display dan body agar antarmuka terasa humanis, rapi, dan modern; gunakan **IBM Plex Mono** untuk angka, unit, faktor emisi, status metodologi, serta label audit. Headline memakai bobot 700–800 dengan tracking rapat; body memakai 450–500 dan line-height lapang.

### Brand Essence
**EnvSusta adalah teman kerja environmental sustainability untuk tim dan individu yang ingin memulai dari data sehari-hari, lalu beralih ke tindakan yang dapat dibuktikan.**

**Personality:** jernih, membumi, dapat dipercaya.

### Brand Voice
Nada komunikasi ringkas, mengajak, dan tanpa rasa menghakimi. Hindari jargon sebelum konteksnya tersedia.

Contoh:

> “Mulai dari data yang sudah Anda punya. Detail bisa menyusul.”

> “Angka ini adalah estimasi awal—jadikan titik mulai, bukan titik akhir.”

### Wordmark & Logo
Mark berbentuk **jejak orbit yang terbuka**: tiga lengkung organik yang mengitari titik pusat, menyerupai daun, siklus material, dan pengukuran tanpa menggunakan ikon daun literal. Mark berdiri sendiri sebagai favicon dan pendamping wordmark EnvSusta.

### Signature Brand Color
**Canopy Teal — `#0E766E`**. Hijau-teal dalam yang stabil dan dewasa, digunakan sebagai warna tindakan serta elemen progres.

## Style Decisions

- Hindari hero generik yang sepenuhnya terpusat, gradien ungu, dan kartu dashboard seragam.
- Gunakan sudut 18–22 px hanya pada kartu besar; kontrol kecil memakai radius 10–12 px.
- Pastikan semua teks kontras terhadap background aktualnya; background terang memakai teks charcoal.
- Setiap halaman/komponen yang dibuat mencantumkan komentar singkat tentang filosofi Field Guide yang Tenang di bagian atas file.
- Peta topik selalu menampilkan jalur baca aktif yang menautkan filter, topik terpilih, sumber, dan langkah berikutnya; katalog kartu yang seragam dihindari.
- Canopy Teal digunakan terutama untuk aksi, seleksi, progres, dan status yang terpercaya; panel pembelajaran mengutamakan paper-sand, charcoal, serta aksen aprikot seperlunya.
- Mark orbit terbuka diulang sebagai penanda rute baca dan konteks metode, bukan hanya sebagai dekorasi logo.
- Jalur baca aktif menghubungkan pilihan filter, spesimen topik, konteks metode/sumber, dan langkah terapan melalui penanda orbit serta titik-titik rute yang terlihat.
- Topik aktif diperlakukan sebagai spesimen lapangan dengan hierarki, metadata, dan cue metode yang lebih kuat daripada kartu katalog lain.

## Landing Page EnvSusta

**Design Read:** Landing page literatur sustainability untuk pengguna pemula hingga praktisi, dengan bahasa editorial yang tenang dan sistem contemporary field-journal.

**Design dials:** `DESIGN_VARIANCE: 5`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 4`.

Landing page memakai urutan rute: nilai produk → tujuan pengguna → konteks membaca → peta topik → metode opsional → CTA. Rute kepatuhan PROPER, efisiensi sumber daya, dan pengungkapan dibuat sebagai titik masuk asimetris yang membuka filter nyata, bukan sekadar klaim fitur. Aset hero dan atlas yang telah ada digunakan sebagai konteks visual utama; kartu hanya dipakai untuk titik keputusan yang dapat diklik.

- Jalur baca ditampilkan secara eksplisit di antara tujuan, peta topik, sumber/metode, dan praktik melalui garis titik serta orbit terbuka.
- Karbon diperlakukan sebagai spesimen lapangan awal yang menunjukkan cue metode dan sumber, sementara domain lain berfungsi sebagai waypoint pendukung.
- Setiap bagian utama memakai bahasa rute yang fungsional: tujuan → spesimen aktif → pengecekan metode → praktik. Penanda titik dan orbit tidak dipakai sebagai dekorasi tanpa fungsi.
- Canopy Teal dipertahankan untuk CTA, status rute aktif, kemajuan, dan cue kepercayaan; permukaan pendukung menggunakan sand, moss, apricot, dan biru pudar.
