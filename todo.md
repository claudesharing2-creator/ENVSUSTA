# Checklist Audit Akhir Deployment

- [x] Verifikasi workflow GitHub Pages terbaru berstatus sukses.
- [x] Verifikasi URL publik repository mengembalikan aplikasi EnvSusta.
- [x] Verifikasi aset hero, kalkulator, pembelajaran, dan logo termuat dari deployment.
- [x] Verifikasi navigasi dan kalkulator pada halaman publik.
- [x] Konfirmasi repository bersih dan dokumentasi deployment tersedia.

# Checklist Otomasi hingga 23.59

- [x] Mengaktifkan eksekusi berjadwal untuk audit EnvSusta hingga 23.59 WIB.
- [x] Menjalankan audit pertama dan memperbaiki temuan yang terverifikasi.
- [ ] Memeriksa build, deployment, dan UX publik di setiap siklus.
- [ ] Menutup jadwal setelah batas waktu dan menyampaikan ringkasan akhir.

# Penutupan untuk Review

- [x] Membatalkan workflow quality loop yang sedang berjalan.
- [x] Menghapus workflow sementara dari repository agar tidak berjalan kembali.
- [x] Memverifikasi deployment publik dan commit review terakhir.

# Revamp Sustainability Workspace

- [x] Inventarisasi semua tombol dan menu yang masih menghasilkan placeholder.
- [x] Memperbaiki field input agar pengetikan multi-digit tidak mereset nilai.
- [x] Memperluas dashboard menjadi domain sustainability menyeluruh.
- [x] Mengimplementasikan modul material, energi, air, limbah, nature, dan carbon market.
- [ ] Menguji alur baru pada desktop dan mobile, lalu memperbaiki temuan audit.

# Playbook Rencana Aksi

- [x] Memetakan kebutuhan materi penerapan untuk delapan domain sustainability.
- [x] Menambahkan tujuan, langkah kerja, bukti, output, dan indikator selesai per domain.
- [x] Mengubah tampilan Rencana aksi menjadi playbook yang dapat dipilih dan ditandai progresnya.
- [x] Menguji alur playbook di desktop dan mobile serta memperbarui deployment review.

# Penyelarasan Materi Sustainability

- [x] Mengekstrak kerangka dan praktik utama dari seluruh PPTX serta PDF unggahan.
- [x] Memetakan PROPER Beyond Compliance, SML/SME, LCA, SDA, dan kehati ke domain EnvSusta.
- [x] Memperbarui materi Belajar dan Playbook dengan langkah penerapan yang sesuai.
- [x] Menguji dan menerbitkan versi EnvSusta yang telah diselaraskan.

# Repositioning Literatur-First

- [x] Menginventarisasi label data, indikator, dan CTA yang membuat EnvSusta tampak sebagai tools analitik.
- [x] Mengubah struktur utama menjadi literatur, metodologi, evidence, contoh output, dan playbook.
- [x] Menempatkan E-Calc sebagai metode hitung opsional di dalam materi karbon.
- [x] Menguji narasi dan navigasi baru pada desktop serta mobile lalu memperbarui deployment.

> Verifikasi 24 Agustus 2026: Tampilan desktop dan mobile menampilkan Topik, Literatur, Panduan terapan, serta Metode hitung sebagai alur yang berbeda. Tidak ada label “data tersedia”; E-Calc dijelaskan sebagai contoh metode opsional dan modul Literatur menyediakan rujukan primer per topik.

# Pencarian dan Filter Literatur

- [x] Menambahkan metadata standar/metode, sektor, dan tingkat kesulitan pada setiap topik.
- [x] Menerapkan pencarian teks dan filter kombinasi pada Peta Topik.
- [x] Menyediakan status hasil, tombol reset, serta kondisi tanpa hasil.
- [x] Memvalidasi interaksi desktop/mobile, build, dan deployment publik.

> Audit visual: panel filter terbaca pada desktop dan mobile; susunan mobile menumpuk menjadi satu kolom, sedangkan topik aktif mendapatkan jalur baca orbit dan ritme kartu yang lebih editorial.

> Verifikasi publik: deployment GitHub Pages untuk commit `44ed2ef` sukses. Versi publik menampilkan input pencarian, tiga filter, metadata per topik, status jumlah hasil, dan jalur baca aktif.

# Filter Tujuan Pengguna

- [x] Memetakan tujuan kepatuhan PROPER, efisiensi sumber daya, dan pengungkapan ke topik literatur.
- [x] Menambahkan filter tujuan yang bekerja secara gabungan dengan seluruh filter yang sudah ada.
- [x] Memperlihatkan tujuan pada metadata topik dan menguji kondisi hasil gabungan.
- [x] Memvalidasi build, responsivitas, serta deployment publik.

> Audit visual: filter Tujuan pengguna tampil sebagai kontrol mandiri di desktop dan mobile. Jalur orbit aktif menghubungkan filter, kartu spesimen, metadata tujuan, sumber/metode, dan aksi penerapan tanpa mengurangi keterbacaan pada layar sempit.

> Verifikasi publik: workflow GitHub Pages untuk commit `4e79a38` sukses. Situs publik memuat filter Tujuan pengguna serta label tujuan pada kartu dan detail topik.

# Landing Page EnvSusta

- [x] Menetapkan narasi dan struktur landing page literatur-first.
- [x] Membuat hero, jalur tujuan, ringkasan domain, cara kerja, dan CTA menuju tools.
- [x] Menguji landing page penuh pada desktop dan mobile.
- [x] Memvalidasi build dan menerbitkan pembaruan GitHub Pages.

> Audit visual: landing page mempertahankan komposisi Field Guide pada desktop dan mobile. Rute tujuan, peta domain, spesimen karbon, konteks metode, E-Calc opsional, serta CTA terbaca tanpa overflow pada layar sempit.

> Verifikasi publik: deployment GitHub Pages untuk commit `802e0be` sukses. Landing page publik memuat hero, tiga titik masuk tujuan, peta domain, konteks metode E-Calc, dan CTA menuju tools.

# Landing Page Mandiri

- [x] Memisahkan shell landing page dari rail/sidebar dan navigasi mobile workspace.
- [x] Menjaga CTA landing page agar tetap membuka Topik, Literatur, Panduan, atau E-Calc dengan benar.
- [x] Memvalidasi desktop dan mobile tanpa sidebar sebelum menerbitkan pembaruan.

> Audit visual: desktop dan mobile kini membuka landing page secara mandiri—tanpa rail/sidebar, topbar, maupun bottom navigation workspace. Hero dan CTA tetap terbaca penuh pada kedua ukuran layar.

> Verifikasi publik: deployment GitHub Pages untuk commit `1448c44` sukses. Halaman Mulai publik tampil tanpa rail sidebar dan tanpa navigasi workspace sebelum pengunjung masuk melalui CTA.

# Alur Landing ke Workspace

- [x] Menambahkan header landing ringkas dengan logo dan anchor section.
- [x] Menambahkan tombol kembali ke beranda pada workspace tools.
- [x] Menambahkan transisi navigasi yang ringan serta menguji desktop/mobile.
- [x] Memvalidasi build dan menerbitkan alur pengguna yang diperbarui.

> Audit visual: header landing ringkas dan CTA masuk tools tetap terbaca pada desktop/mobile. Spesimen Karbon tampil sebagai titik mulai dengan cue metode, sementara domain lain menjadi waypoint; rute titik dan orbit menghubungkan tujuan, topik, metode, dan praktik.

> Verifikasi publik: workflow GitHub Pages untuk commit `5f342a8` sukses. Landing publik memuat header ringkas, anchor Tujuan/Topik/Metode, cue rute atlas, serta CTA masuk tools.

# Indikator Anchor Aktif

- [x] Menetapkan section yang dipantau untuk Tujuan, Topik, dan Metode.
- [x] Menambahkan pelacakan scroll dan status anchor aktif pada header landing.
- [x] Memvalidasi indikator desktop/mobile serta build dan deployment publik.

> Uji interaksi: saat viewport memasuki bagian Tujuan, indikator Tujuan pada header berubah aktif. Anchor menggunakan IntersectionObserver dengan root margin yang mengutamakan section di area baca pengguna.

> Uji scroll lanjutan: indikator berpindah ke Topik saat peta domain mendominasi viewport dan ke Metode saat section E-Calc menjadi konteks baca utama. Header tetap sticky sehingga status dapat dibaca sepanjang rute.

> Verifikasi mobile: navigasi anchor berubah menjadi status ringkas dengan titik Canopy Teal dan nama section aktif; tampilan ini tidak mengganggu CTA Masuk tools pada layar sempit.

> Verifikasi publik: workflow GitHub Pages untuk commit `d2970c5` sukses. Landing publik menampilkan anchor Tujuan, Topik, dan Metode dengan indikator aktif berbasis section yang terlihat.

# Transisi Anchor Halus

- [x] Menentukan perilaku scroll anchor beserta fallback reduced motion.
- [x] Menerapkan transisi scroll, update URL, dan umpan balik visual anchor.
- [x] Memvalidasi navigasi anchor pada desktop/mobile serta build dan deployment publik.

> Verifikasi interaksi: klik anchor kini melakukan `scrollIntoView` dengan perilaku smooth, memperbarui hash rute, dan memicu pulse singkat pada status aktif. Pada reduced motion, perpindahan dibuat instan tanpa animasi rute.

> Verifikasi mobile: status section, CTA, dan header sticky tetap termuat rapi setelah umpan balik rute ditambahkan.

> Verifikasi publik: workflow GitHub Pages untuk commit `9783290` sukses. Landing publik memuat transisi anchor terkontrol, pembaruan hash rute, offset header sticky, dan fallback reduced motion.

# Navigasi, Progress, dan Referensi Primer

- [x] Memetakan shortcut panah yang aman untuk anchor serta kondisi ketika shortcut tidak aktif.
- [x] Menambahkan tombol Kembali ke Atas dan progress bar membaca pada landing page.
- [x] Memperkaya referensi primer untuk domain sustainability dan meninjau validitas tautannya.
- [x] Memvalidasi keyboard, responsivitas, build, dan deployment publik.

> Audit visual: progress bar membaca menyatu di dasar header landing tanpa mengganggu navigasi. Tombol Kembali ke Atas menggunakan bentuk ringkas pada mobile dan label lengkap pada desktop; landing tetap terbaca tanpa overflow pada kedua ukuran layar.

> Audit materi: setiap modul kini memiliki tiga fokus baca dan setidaknya dua hingga tiga rujukan primer yang dapat dibuka. Sumber PROPER ditautkan ke portal resmi KLH/BPLH; LCA, karbon, circularity, nature, air, limbah, dan SML diperkuat dengan penerbit standar atau organisasi primer terkait.

> Verifikasi publik: workflow GitHub Pages untuk commit `5eba231` sukses. Landing publik menampilkan progress rute, tombol Kembali ke Atas, dan label keyboard pada navigasi anchor; sumber tambahan tersedia dari modul Literatur.

# Literatur Interaktif dan Daftar Bacaan

- [x] Menetapkan kamus istilah standar dan ringkasan tooltip yang ringkas.
- [x] Menambahkan pencarian khusus pada rujukan primer beserta kondisi tanpa hasil.
- [x] Menambahkan bookmark referensi local-first dan panel daftar bacaan pribadi.
- [x] Memvalidasi tooltip, keyboard, persistensi lokal, responsivitas, build, dan deployment publik.

> Audit visual: kartu sumber primer memiliki tombol bookmark yang jelas. Panel Reference Finder tampil sebagai jalur terpisah dari materi dan daftar bacaan tetap berada dekat kolom pencarian; susunan beralih menjadi satu kolom pada mobile tanpa overflow.

> Audit aksesibilitas: tooltip ditampilkan saat hover atau fokus keyboard, tombol bookmark menggunakan status `aria-pressed`, pencarian memiliki label yang dapat dibaca pembaca layar, dan daftar bacaan menjelaskan bahwa data disimpan lokal.

> Verifikasi publik: workflow GitHub Pages untuk commit `f12182d` sukses. Modul Literatur publik memuat bookmark per referensi, kolom pencarian Reference Finder, kondisi tanpa hasil, dan panel daftar bacaan pribadi.

# Catatan Pribadi Bookmark

- [x] Menambahkan struktur catatan per referensi yang kompatibel dengan bookmark lama.
- [x] Menambahkan editor catatan singkat pada Daftar Bacaan Pribadi.
- [x] Menyertakan catatan pribadi di autosave dan ekspor catatan literatur.
- [x] Memvalidasi persistensi, responsivitas, build, dan deployment publik.

> Audit visual: panel rujukan memakai penanda rute topik → sumber → catatan yang konsisten dengan Field Guide. Pada mobile, pencarian, daftar bacaan, dan ruang catatan tetap tersusun satu kolom tanpa overflow.

> Audit model lokal: bookmark lama tanpa catatan tetap valid; catatan dibatasi 280 karakter, dibersihkan ketika bookmark dihapus, serta ditambahkan sebagai `personalNote` saat ekspor catatan literatur.

> Verifikasi publik: workflow GitHub Pages untuk commit `ef8d49d` sukses. Halaman Literatur publik memuat rute topik → sumber → catatan, kontrol bookmark, dan struktur editor catatan pribadi yang aktif setelah referensi disimpan.

# Status, Urutan, dan Pemulihan Daftar Bacaan

- [x] Menambahkan status baca dan waktu simpan yang kompatibel dengan bookmark lama.
- [x] Menambahkan pilihan urut berdasarkan terbaru, topik, dan status baca.
- [x] Menambahkan impor file catatan dengan validasi, pratinjau, dan pemulihan local-first.
- [x] Memvalidasi persistensi, pengurutan, impor, responsivitas, build, dan deployment publik.

> Audit visual: panel daftar bacaan menampilkan kontrol urut dan impor secara ringkas di desktop serta mobile. Rute topik → sumber → catatan dan penanda spesimen aktif kini tetap terlihat pada layar sempit tanpa overflow.

> Audit pemulihan: ekspor baru menyertakan id referensi, status, waktu simpan, dan catatan pribadi; impor menerima file JSON EnvSusta, memvalidasi setiap referensi terhadap registry terkini, memberi pratinjau, dan melakukan merge tanpa menimpa catatan lokal yang sudah ada.

> Verifikasi publik awal: versi publik menampilkan penanda spesimen aktif, pilihan urut terbaru/topik/status, serta kontrol impor pada Daftar Bacaan Pribadi. Kontrol bookmark tetap dapat diakses dari rujukan primer pada modul aktif.

> Verifikasi publik: workflow GitHub Pages untuk commit `82205e6` sukses. Modul Literatur publik memuat status baca, urutan daftar, kontrol impor, dan penanda spesimen aktif pada rute belajar.

# Filter, Target Baca, dan Ekspor Markdown

- [x] Menambahkan filter daftar bacaan berdasarkan status baca dan domain.
- [x] Menambahkan target tanggal serta penanda pengingat lokal pada bookmark.
- [x] Menambahkan ekspor daftar bacaan dalam format Markdown.
- [x] Memvalidasi filter, pengingat, ekspor, responsivitas, build, dan deployment publik.

> Verifikasi 25 Agustus 2026: target baca dan pengingat diuji pada browser lokal tanpa notifikasi saat aplikasi tertutup; metadata tetap tersimpan di perangkat. Ekspor Markdown memuat status, target, ringkasan sumber, tautan, dan catatan pribadi. Desktop/mobile serta build GitHub Pages untuk commit `f7d3a93` telah lolos.

# Ringkasan Status, Agenda, dan Ekspor Terfilter

- [x] Menambahkan ringkasan visual jumlah bahan bacaan pada setiap status baca.
- [x] Menambahkan agenda mingguan untuk target tanggal baca yang telah ditentukan.
- [x] Menjadikan ekspor Markdown mengikuti status dan domain pada filter aktif.
- [x] Memvalidasi ringkasan, agenda, ekspor terfilter, responsivitas, build, dan deployment publik.

> Verifikasi 25 Agustus 2026: ringkasan mengikuti status bookmark aktual; agenda Senin–Minggu menampilkan target pada tanggalnya; ekspor Markdown dengan filter domain Air memuat konteks filter dan hanya referensi yang sesuai. Pemeriksaan desktop/mobile, TypeScript, build GitHub Pages, dan deployment publik commit `93e18a0` berhasil.

# Validasi Push GitHub Akhir

- [x] Memeriksa status branch lokal dan remote terbaru.
- [x] Menjalankan pemeriksaan format, TypeScript, dan build produksi.
- [x] Memastikan GitHub Pages untuk commit terbaru berhasil.

> Verifikasi 25 Agustus 2026: `main` lokal dan `origin/main` sama-sama berada pada commit `f2fc568`. Pemeriksaan Prettier, TypeScript, dan build target GitHub Pages berhasil; workflow GitHub Pages `32839390636` juga selesai sukses.
