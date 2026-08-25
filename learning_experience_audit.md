# Audit Pengalaman Literatur EnvSusta

## Design Read

> Reading this as: redesign panduan literatur sustainability untuk pengguna pemula hingga praktisi, dengan bahasa field journal yang tenang, tetapi harus mengutamakan orientasi belajar dan aksesibilitas daripada dekorasi visual.

## Temuan awal

Tangkapan layar pada lebar sekitar 430 px memperlihatkan status navigasi materi yang tidak jelas. Tampilan hover, fokus, dan materi terpilih terlalu mirip, sedangkan jalur titik dekoratif berada terlalu dekat dengan label. Akibatnya, pengguna sulit memastikan domain yang aktif dan apakah sebuah item sedang dapat dipilih atau telah dipilih.

Materi pada panel domain memiliki konsep, metrik, bukti, dan tiga fokus baca, tetapi urutannya belum menjawab kebutuhan pengguna baru secara langsung: apa yang harus dipahami lebih dahulu, bahan apa yang perlu disiapkan, tindakan kecil apa yang perlu dilakukan, dan hasil apa yang seharusnya tersedia. Perbaikan akan membentuk urutan tersebut sebagai rute belajar eksplisit tanpa mengubah sumber primer atau menjadikan produk sebagai dashboard analitik.

## Hasil verifikasi perubahan

Pada preview, pemilihan domain Air lalu Energi memperbarui status aktif, pertanyaan awal, sumber primer, bahan yang perlu disiapkan, dan tindakan awal sesuai domain. Status aktif kini disampaikan melalui warna latar, garis aksen, teks “Sedang dipelajari”, serta `aria-current`, tanpa garis titik yang berpotensi bertabrakan dengan label.

Navigasi materi juga berhasil diuji melalui keyboard: tombol Karbon diberi fokus lalu diaktifkan dengan Enter, kemudian panel mengganti materi, pertanyaan awal, sumber, data awal, dan tindakan domain Karbon.
