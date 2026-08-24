/** Field Guide yang Tenang: registry domain menjaga seluruh workspace sustainability tetap konsisten, dapat ditelusuri, dan mudah diperluas. */

export type DomainId =
  | "carbon"
  | "energy"
  | "water"
  | "waste"
  | "materials"
  | "nature"
  | "esg"
  | "markets";

export type SustainabilityDomain = {
  id: DomainId;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  firstAction: string;
  metrics: string[];
  dataPoints: string[];
  evidence: string[];
  lessonMinutes: string;
  tone: "teal" | "sand" | "apricot" | "moss";
};

export const sustainabilityDomains: SustainabilityDomain[] = [
  {
    id: "carbon",
    number: "01",
    title: "GHG accounting & jejak karbon",
    shortTitle: "Karbon",
    summary:
      "Mulai dari activity data, faktor emisi, dan batas organisasi yang jelas.",
    description:
      "Inventaris GRK membantu melihat emisi Scope 1, Scope 2, dan Scope 3 secara terpisah. Untuk pemula, yang paling penting adalah sumber data, periode, unit, dan asumsi yang dapat ditelusuri.",
    firstAction:
      "Catat listrik, bahan bakar, perjalanan, dan limbah pada periode yang sama.",
    metrics: ["tCO₂e gross", "intensitas emisi", "cakupan Scope 1–3"],
    dataPoints: [
      "Tagihan listrik",
      "Bukti pembelian bahan bakar",
      "Kilometer perjalanan",
      "Catatan limbah",
    ],
    evidence: [
      "Periode pelaporan",
      "Faktor emisi dan versinya",
      "Asumsi perhitungan",
    ],
    lessonMinutes: "8 menit",
    tone: "teal",
  },
  {
    id: "energy",
    number: "02",
    title: "Manajemen energi",
    shortTitle: "Energi",
    summary:
      "Kenali pola konsumsi sebelum memilih proyek efisiensi atau energi terbarukan.",
    description:
      "Manajemen energi menghubungkan pemakaian energi dengan aktivitas operasional. Baseline, EnPI, dan penggunaan energi signifikan membantu tim menemukan peluang perbaikan tanpa menebak-nebak.",
    firstAction:
      "Susun baseline kWh dan tandai proses atau lokasi dengan penggunaan terbesar.",
    metrics: ["kWh", "EnPI", "penggunaan energi signifikan"],
    dataPoints: [
      "Tagihan energi",
      "Jam operasi",
      "Output atau okupansi",
      "Daftar peralatan utama",
    ],
    evidence: [
      "Batas baseline",
      "Metode normalisasi",
      "Catatan perubahan proses",
    ],
    lessonMinutes: "7 menit",
    tone: "sand",
  },
  {
    id: "water",
    number: "03",
    title: "Air & efluen",
    shortTitle: "Air",
    summary:
      "Pantau pengambilan, penggunaan, pelepasan, kualitas, dan risiko air di lokasi.",
    description:
      "Air perlu dikelola sebagai aliran fisik dan risiko lokal. Mulailah dengan memahami dari mana air berasal, ke mana air digunakan, apakah ada efluen, dan bukti pemantauan yang tersedia.",
    firstAction:
      "Buat water balance sederhana untuk satu lokasi atau satu proses utama.",
    metrics: ["m³ withdrawal", "m³ discharge", "intensitas air"],
    dataPoints: [
      "Tagihan atau meter air",
      "Sumber air",
      "Volume efluen",
      "Hasil uji kualitas",
    ],
    evidence: ["Lokasi dan periode", "Metode pengukuran", "Izin dan baku mutu"],
    lessonMinutes: "6 menit",
    tone: "teal",
  },
  {
    id: "waste",
    number: "04",
    title: "Limbah & polusi",
    shortTitle: "Limbah",
    summary:
      "Utamakan pencegahan, pengurangan, pemilahan, dan pengelolaan yang dapat dibuktikan.",
    description:
      "Pengelolaan limbah bukan hanya berat total. Penting untuk memahami jenis limbah, hierarki pengelolaan, limbah B3, jalur pengangkutan, serta pengendalian polusi yang relevan.",
    firstAction:
      "Pisahkan tiga aliran limbah terbesar dan catat jalur pengelolaannya.",
    metrics: ["ton limbah", "tingkat diversion", "limbah B3"],
    dataPoints: [
      "Timbangan atau manifest",
      "Jenis limbah",
      "Vendor pengelola",
      "Tujuan akhir",
    ],
    evidence: [
      "Dokumen pengangkutan",
      "Izin vendor",
      "Foto atau log pemilahan",
    ],
    lessonMinutes: "6 menit",
    tone: "apricot",
  },
  {
    id: "materials",
    number: "05",
    title: "Material & circularity",
    shortTitle: "Material",
    summary:
      "Lihat bahan masuk, masa pakai produk, sisa proses, dan peluang sirkular.",
    description:
      "Circularity membantu tim mengurangi kebutuhan material baru melalui desain yang tahan lama, penggunaan kembali, perbaikan, serta peningkatan pemulihan material di akhir masa pakai.",
    firstAction:
      "Pilih satu material dominan dan petakan masuk, dipakai, tersisa, dan keluar.",
    metrics: ["material input", "recycled content", "recovery rate"],
    dataPoints: [
      "Bill of materials",
      "Pembelian material",
      "Scrap proses",
      "Data pengembalian",
    ],
    evidence: ["Spesifikasi material", "Sertifikat pemasok", "Metode alokasi"],
    lessonMinutes: "7 menit",
    tone: "moss",
  },
  {
    id: "nature",
    number: "06",
    title: "Nature & biodiversity",
    shortTitle: "Nature",
    summary:
      "Pahami dampak dan ketergantungan organisasi terhadap ekosistem serta penggunaan lahan.",
    description:
      "Nature mencakup keterkaitan organisasi dengan lahan, air, hutan, habitat, dan spesies. Fokus awalnya adalah lokasi, rantai pasok, tekanan utama, dan langkah menghindari atau memulihkan dampak.",
    firstAction:
      "Tandai lokasi dan pemasok yang paling bergantung pada lahan, air, atau bahan berbasis alam.",
    metrics: ["lokasi prioritas", "tekanan ekosistem", "cakupan pemasok"],
    dataPoints: [
      "Koordinat lokasi",
      "Komoditas utama",
      "Peta pemasok",
      "Area restorasi",
    ],
    evidence: ["Batas lokasi", "Metode screening", "Catatan konsultasi"],
    lessonMinutes: "8 menit",
    tone: "moss",
  },
  {
    id: "esg",
    number: "07",
    title: "ESG, risiko & disclosure",
    shortTitle: "ESG",
    summary:
      "Hubungkan isu lingkungan material dengan governance, KPI, risiko, target, dan bukti.",
    description:
      "Disclosure yang berguna dimulai dari isu yang paling material bagi organisasi dan stakeholder. Data perlu memiliki pemilik, definisi, periode, bukti, serta proses review sebelum dibagikan.",
    firstAction:
      "Pilih tiga isu lingkungan yang paling relevan dan tetapkan pemilik data untuk masing-masing.",
    metrics: ["topik material", "cakupan KPI", "status bukti"],
    dataPoints: ["Daftar KPI", "Pemilik data", "Target", "Risiko dan peluang"],
    evidence: ["Data dictionary", "Approval trail", "Referensi framework"],
    lessonMinutes: "9 menit",
    tone: "sand",
  },
  {
    id: "markets",
    number: "08",
    title: "Carbon market & claims",
    shortTitle: "Carbon market",
    summary:
      "Pisahkan inventaris gross, pengurangan, credit, allowance, retirement, dan klaim.",
    description:
      "Carbon market bukan pengganti inventaris emisi. Sebelum mempertimbangkan instrumen pasar, tim perlu memisahkan gross emissions, strategi pengurangan, karakter unit karbon, retirement, serta batas klaim yang digunakan.",
    firstAction:
      "Dokumentasikan gross emissions lebih dulu dan catat setiap unit karbon sebagai ledger terpisah.",
    metrics: ["gross emissions", "unit karbon", "status retirement"],
    dataPoints: [
      "ID proyek atau unit",
      "Vintage",
      "Registry",
      "Status kepemilikan",
    ],
    evidence: [
      "Sertifikat retirement",
      "Kebijakan klaim",
      "Catatan due diligence",
    ],
    lessonMinutes: "8 menit",
    tone: "apricot",
  },
];

export const sustainabilityActionTracks = [
  {
    domainId: "carbon" as DomainId,
    title: "Tetapkan periode dan batas baseline",
    copy: "Tentukan unit organisasi, lokasi, dan periode yang akan digunakan.",
  },
  {
    domainId: "energy" as DomainId,
    title: "Kumpulkan energi dan pola operasi",
    copy: "Simpan kWh, bahan bakar, jam operasi, dan driver konsumsi.",
  },
  {
    domainId: "water" as DomainId,
    title: "Petakan aliran air utama",
    copy: "Catat sumber, penggunaan, efluen, serta lokasi yang relevan.",
  },
  {
    domainId: "waste" as DomainId,
    title: "Pisahkan aliran limbah terbesar",
    copy: "Mulai dari jenis, volume, jalur pengelolaan, dan bukti vendor.",
  },
  {
    domainId: "materials" as DomainId,
    title: "Pilih satu material prioritas",
    copy: "Lihat peluang mengurangi input baru, scrap, atau material tak terpakai.",
  },
  {
    domainId: "nature" as DomainId,
    title: "Screening lokasi dan supply chain",
    copy: "Identifikasi ketergantungan atau dampak pada ekosistem dan lahan.",
  },
  {
    domainId: "esg" as DomainId,
    title: "Tetapkan pemilik data dan bukti",
    copy: "Pastikan setiap KPI punya definisi, pemilik, periode, dan evidence.",
  },
  {
    domainId: "markets" as DomainId,
    title: "Pisahkan ledger unit karbon",
    copy: "Catat credit atau allowance tanpa mengurangi angka gross inventory.",
  },
];

export type PlaybookStep = {
  title: string;
  instruction: string;
  evidence: string;
  output: string;
  doneWhen: string;
};

export type ActionPlaybook = {
  domainId: DomainId;
  role: string;
  goal: string;
  firstWeek: string;
  caution: string;
  steps: PlaybookStep[];
};

export const actionPlaybooks: ActionPlaybook[] = [
  {
    domainId: "carbon",
    role: "Pemrakarsa sustainability, finance, operasi, atau fasilitas",
    goal: "Membuat baseline emisi gross yang dapat dijelaskan sebelum menetapkan target atau klaim.",
    firstWeek:
      "Pilih satu periode dan satu lokasi atau unit organisasi untuk pilot pertama.",
    caution:
      "Jangan mengurangi angka gross inventory dengan carbon credit, offset, atau allowance dalam baseline operasional.",
    steps: [
      {
        title: "Tetapkan batas dan periode",
        instruction:
          "Tulis unit organisasi, lokasi, aktivitas yang dicakup, serta periode pelaporan pada satu lembar scope note.",
        evidence: "Scope note dengan nama lokasi dan tanggal mulai-akhir.",
        output: "Batas inventaris v0.1.",
        doneWhen:
          "Setiap orang di tim dapat menjelaskan apa yang masuk dan tidak masuk.",
      },
      {
        title: "Kumpulkan activity data",
        instruction:
          "Ambil tagihan listrik, bukti bahan bakar, perjalanan, dan limbah. Catat angka asli beserta satuannya, jangan langsung mengubahnya menjadi emisi.",
        evidence:
          "File tagihan, rekap pembelian, log kendaraan, atau manifest limbah.",
        output: "Register activity data.",
        doneWhen:
          "Setiap angka memiliki sumber, unit, periode, dan pemilik data.",
      },
      {
        title: "Catat faktor dan asumsi",
        instruction:
          "Buat daftar faktor emisi yang dipakai beserta sumber, versi, GWP basis, dan alasan pemilihannya.",
        evidence: "Factor register atau spreadsheet metodologi.",
        output: "Log metode perhitungan.",
        doneWhen:
          "Perhitungan dapat diulang oleh orang lain dengan input yang sama.",
      },
      {
        title: "Hitung dan cek kewajaran",
        instruction:
          "Jalankan E-Calc atau spreadsheet, lalu bandingkan hasil dengan konsumsi atau periode sebelumnya untuk mencari angka yang tidak masuk akal.",
        evidence: "File kalkulasi dan catatan review.",
        output: "Baseline tCO₂e gross.",
        doneWhen: "Sumber emisi terbesar dan penyebabnya telah diidentifikasi.",
      },
      {
        title: "Pilih satu tindakan pengurangan",
        instruction:
          "Ambil satu sumber terbesar dan rumuskan tindakan terukur, misalnya pengurangan jam idle, perbaikan set point, atau perpindahan perjalanan.",
        evidence: "Action card dengan pemilik dan tanggal review.",
        output: "Rencana pengurangan 30–90 hari.",
        doneWhen:
          "Tindakan memiliki pemilik, indikator, dan tanggal cek ulang.",
      },
    ],
  },
  {
    domainId: "energy",
    role: "Fasilitas, engineering, operasi, atau procurement",
    goal: "Mengubah tagihan energi menjadi baseline, prioritas penggunaan, dan proyek efisiensi yang dapat diukur.",
    firstWeek:
      "Mulai dari satu gedung, lini proses, atau lokasi dengan tagihan yang paling mudah diakses.",
    caution:
      "Jangan membandingkan kWh mentah antarperiode tanpa mencatat perubahan output, jam operasi, atau okupansi.",
    steps: [
      {
        title: "Petakan sumber energi",
        instruction:
          "Daftar seluruh sumber energi: listrik, gas, bahan bakar, steam, dan energi terbarukan yang dibeli atau dihasilkan sendiri.",
        evidence: "Tagihan, kontrak utilitas, dan daftar meter.",
        output: "Peta sumber energi.",
        doneWhen:
          "Tidak ada sumber energi utama yang belum memiliki pemilik data.",
      },
      {
        title: "Buat baseline dan driver",
        instruction:
          "Pilih periode baseline lalu catat driver konsumsi seperti output, jam operasi, luas area, atau jumlah penghuni.",
        evidence: "Rekap meter dan data operasi pada periode yang sama.",
        output: "Baseline kWh dan driver.",
        doneWhen:
          "Tim dapat menjelaskan perubahan konsumsi secara kontekstual.",
      },
      {
        title: "Tentukan penggunaan signifikan",
        instruction:
          "Urutkan penggunaan terbesar dan tandai peralatan atau proses yang layak diperiksa lebih dulu.",
        evidence: "Daftar beban, jam operasi, atau hasil audit walk-through.",
        output: "Daftar significant energy uses.",
        doneWhen:
          "Tiga penggunaan prioritas beserta alasan pilihannya telah disepakati.",
      },
      {
        title: "Rancang tindakan hemat energi",
        instruction:
          "Untuk tiap prioritas, tulis tindakan, mekanisme penghematan, risiko operasional, biaya indikatif, dan cara mengukur hasilnya.",
        evidence: "Action card atau proposal kecil.",
        output: "Pipeline proyek efisiensi.",
        doneWhen:
          "Setidaknya satu tindakan dapat dimulai tanpa menunggu proyek modal besar.",
      },
      {
        title: "Pantau dan review",
        instruction:
          "Pantau metrik secara berkala, bandingkan terhadap baseline yang dinormalisasi, lalu catat perubahan proses yang mempengaruhi hasil.",
        evidence: "Log meter dan catatan perubahan operasi.",
        output: "Review kinerja energi.",
        doneWhen: "Ada keputusan lanjut, ubah, atau hentikan berdasarkan data.",
      },
    ],
  },
  {
    domainId: "water",
    role: "Operasi lokasi, fasilitas, EHS, atau manajemen gedung",
    goal: "Memahami aliran air dan efluen untuk menemukan risiko, kebocoran, dan peluang pengurangan yang relevan dengan lokasi.",
    firstWeek:
      "Mulai dari satu lokasi dan buat peta sederhana dari sumber air hingga pelepasan atau penggunaan ulang.",
    caution:
      "Risiko air bersifat lokal; angka konsumsi saja tidak cukup tanpa konteks lokasi, kualitas, dan izin.",
    steps: [
      {
        title: "Tandai sumber dan titik penggunaan",
        instruction:
          "Gambar alur dari sumber air ke proses, sanitasi, pendinginan, produk, serta titik pelepasan atau reuse.",
        evidence: "Sketsa lokasi, daftar meter, dan foto titik utama.",
        output: "Peta aliran air.",
        doneWhen: "Setiap aliran utama mempunyai asal dan tujuan yang jelas.",
      },
      {
        title: "Susun water balance",
        instruction:
          "Rekap volume air masuk, digunakan, dilepas, dan digunakan kembali pada periode yang sama. Gunakan estimasi secara eksplisit jika meter belum lengkap.",
        evidence: "Tagihan, pembacaan meter, log operasi, dan asumsi.",
        output: "Water balance v0.1.",
        doneWhen:
          "Selisih besar antara input dan output telah diberi penjelasan atau daftar investigasi.",
      },
      {
        title: "Periksa kualitas dan kepatuhan",
        instruction:
          "Tandai proses yang menghasilkan efluen, cek jadwal pengujian, izin, dan batas mutu yang berlaku pada lokasi.",
        evidence: "Hasil laboratorium, izin, dan catatan inspeksi.",
        output: "Register efluen dan kepatuhan.",
        doneWhen:
          "Pemilik tindakan dan tenggat untuk setiap gap sudah tercatat.",
      },
      {
        title: "Pilih peluang pengurangan",
        instruction:
          "Pilih satu hotspot seperti kebocoran, cleaning, cooling, atau reuse. Tentukan tindakan kecil yang bisa diuji dan cara mengukur dampaknya.",
        evidence: "Foto kondisi awal dan action card.",
        output: "Eksperimen efisiensi air.",
        doneWhen:
          "Ada pembacaan sebelum-sesudah atau alasan terdokumentasi bila belum bisa diukur.",
      },
      {
        title: "Review risiko lokasi",
        instruction:
          "Diskusikan gangguan pasokan, kualitas sumber, konflik penggunaan, dan kejadian cuaca yang dapat memengaruhi operasi.",
        evidence: "Catatan diskusi lokasi dan daftar risiko.",
        output: "Risk note air.",
        doneWhen:
          "Risiko prioritas memiliki respons awal atau kebutuhan eskalasi.",
      },
    ],
  },
  {
    domainId: "waste",
    role: "EHS, operasi, fasilitas, atau pengelola lokasi",
    goal: "Mengurangi limbah di sumbernya dan memastikan jalur pengelolaan dapat dibuktikan, terutama untuk limbah berisiko.",
    firstWeek:
      "Lakukan walk-through singkat untuk menandai tiga aliran limbah terbesar atau paling berisiko.",
    caution:
      "Jangan menyebut limbah 'didaur ulang' tanpa bukti jalur pengelolaan, vendor, atau dokumentasi penerimaan.",
    steps: [
      {
        title: "Identifikasi aliran limbah",
        instruction:
          "Kelompokkan limbah berdasarkan jenis, sumber proses, frekuensi, volume, dan apakah termasuk limbah berisiko atau B3.",
        evidence: "Foto area, timbangan, manifest, atau catatan vendor.",
        output: "Register aliran limbah.",
        doneWhen:
          "Tiga aliran prioritas sudah memiliki nama dan asal yang jelas.",
      },
      {
        title: "Periksa pemilahan di sumber",
        instruction:
          "Cek apakah wadah, label, area penyimpanan, dan instruksi kerja membuat orang mudah memilah dengan benar.",
        evidence: "Foto sebelum-sesudah dan checklist inspeksi.",
        output: "Daftar perbaikan pemilahan.",
        doneWhen:
          "Setiap aliran prioritas memiliki titik pengumpulan dan label yang dapat dipahami.",
      },
      {
        title: "Verifikasi jalur pengelolaan",
        instruction:
          "Catat siapa yang mengambil limbah, ke mana tujuannya, dokumen apa yang diterima, dan izin yang relevan.",
        evidence: "Kontrak, manifest, tanda terima, atau izin vendor.",
        output: "Ledger vendor dan tujuan akhir.",
        doneWhen:
          "Tidak ada aliran prioritas dengan tujuan akhir yang tidak diketahui.",
      },
      {
        title: "Uji tindakan pencegahan",
        instruction:
          "Pilih satu penyebab limbah, seperti kemasan berlebih, reject, atau bahan sekali pakai, lalu buat percobaan pengurangan yang aman.",
        evidence: "Action card dan volume sebelum-sesudah.",
        output: "Eksperimen pencegahan limbah.",
        doneWhen: "Dampak, kualitas, dan risiko tindakan sudah dicatat.",
      },
      {
        title: "Tinjau hasil dan eskalasi",
        instruction:
          "Review data volume, biaya, insiden, dan kepatuhan; eskalasi isu B3, pencemaran, atau vendor yang tidak dapat diverifikasi.",
        evidence: "Catatan review bulanan.",
        output: "Ringkasan performa limbah.",
        doneWhen: "Ada keputusan tindakan lanjut dan pemiliknya.",
      },
    ],
  },
  {
    domainId: "materials",
    role: "Procurement, desain produk, operasi, atau supply chain",
    goal: "Menemukan peluang mengurangi input material baru, scrap, dan kehilangan nilai material sepanjang siklus hidup.",
    firstWeek:
      "Pilih satu material atau komponen dengan volume, biaya, atau risiko tertinggi untuk dipetakan terlebih dahulu.",
    caution:
      "Jangan mengklaim circularity hanya dari material daur ulang; lihat juga daya tahan, penggunaan ulang, perbaikan, dan akhir masa pakai.",
    steps: [
      {
        title: "Pilih material prioritas",
        instruction:
          "Nilai bahan berdasarkan volume, biaya, risiko pasokan, kandungan material, dan potensi limbah atau dampak hilir.",
        evidence: "Data pembelian, BOM, atau laporan scrap.",
        output: "Daftar material prioritas.",
        doneWhen: "Satu material dipilih dengan alasan yang terdokumentasi.",
      },
      {
        title: "Petakan aliran material",
        instruction:
          "Catat material masuk, digunakan dalam produk atau proses, menjadi scrap, disimpan, dikembalikan, atau keluar sebagai limbah.",
        evidence: "BOM, stok, yield proses, dan catatan limbah.",
        output: "Material flow sketch.",
        doneWhen: "Titik kehilangan nilai atau material sudah terlihat.",
      },
      {
        title: "Cari pilihan sirkular",
        instruction:
          "Uji peluang pengurangan material, penggunaan ulang, perbaikan, substitusi, recycled content, atau pengembalian produk secara terpisah.",
        evidence: "Spesifikasi material dan masukan pemilik proses.",
        output: "Daftar opsi circularity.",
        doneWhen: "Setiap opsi punya dampak, batasan, dan pemilik eksplorasi.",
      },
      {
        title: "Libatkan pemasok atau pengguna",
        instruction:
          "Mintalah informasi spesifikasi, sertifikat, kemasan, take-back, atau perubahan desain dari pihak yang memegang data terbaik.",
        evidence: "Email, questionnaire, atau spesifikasi revisi.",
        output: "Log engagement supply chain.",
        doneWhen:
          "Respons dan data yang belum tersedia telah dicatat secara transparan.",
      },
      {
        title: "Tentukan metrik dan review",
        instruction:
          "Pilih metrik yang mencerminkan keputusan, seperti material input, scrap rate, reused content, atau recovery rate.",
        evidence: "KPI sheet dan baseline.",
        output: "KPI material pilot.",
        doneWhen:
          "KPI dapat dikumpulkan berulang tanpa pekerjaan manual berlebihan.",
      },
    ],
  },
  {
    domainId: "nature",
    role: "Sustainability lead, supply chain, operasi lokasi, atau risiko perusahaan",
    goal: "Mengidentifikasi lokasi dan rantai pasok yang paling berkaitan dengan alam sebelum menentukan tindakan avoid, reduce, restore, atau engage.",
    firstWeek:
      "Kumpulkan daftar lokasi, komoditas utama, dan pemasok prioritas sebagai dasar screening awal.",
    caution:
      "Jangan menyimpulkan dampak biodiversitas hanya dari data global; lokasi, ekosistem, dan pihak terdampak sangat menentukan.",
    steps: [
      {
        title: "Tetapkan lokasi dan value chain",
        instruction:
          "Daftar lokasi operasi, asal bahan utama, dan pemasok yang berkaitan dengan lahan, air, hutan, atau habitat.",
        evidence: "Daftar lokasi, alamat pemasok, atau data komoditas.",
        output: "Scope map nature.",
        doneWhen: "Area yang belum diketahui diberi label sebagai gap data.",
      },
      {
        title: "Screening ketergantungan dan dampak",
        instruction:
          "Tanya bagaimana proses bergantung pada air, tanah, serbuk sari, iklim lokal, atau bahan berbasis alam; catat tekanan yang mungkin ditimbulkan.",
        evidence: "Hasil workshop atau questionnaire.",
        output: "Daftar dependency dan impact.",
        doneWhen:
          "Tiga isu prioritas dipilih berdasarkan lokasi atau materialitas.",
      },
      {
        title: "Tandai risiko dan pihak terkait",
        instruction:
          "Identifikasi kemungkinan konflik lahan, perubahan penggunaan lahan, area sensitif, atau komunitas yang perlu dilibatkan.",
        evidence: "Peta, catatan konsultasi, dan daftar risiko.",
        output: "Nature risk note.",
        doneWhen:
          "Setiap risiko utama memiliki pemilik untuk validasi lebih lanjut.",
      },
      {
        title: "Pilih urutan respons",
        instruction:
          "Susun tindakan mulai dari menghindari dampak, mengurangi tekanan, memulihkan, lalu mendukung konservasi jika relevan.",
        evidence: "Action card lokasi atau pemasok.",
        output: "Hierarki tindakan nature.",
        doneWhen: "Tindakan tidak melompati upaya pencegahan langsung.",
      },
      {
        title: "Pantau dan libatkan",
        instruction:
          "Tentukan indikator sederhana dan jadwal engagement dengan lokasi, pemasok, atau pihak yang memiliki pengetahuan setempat.",
        evidence: "Log pemantauan dan engagement.",
        output: "Rencana monitoring nature.",
        doneWhen:
          "Ada cara untuk memeriksa apakah tindakan menghasilkan perubahan yang diharapkan.",
      },
    ],
  },
  {
    domainId: "esg",
    role: "Sustainability lead, legal, finance, risiko, atau corporate affairs",
    goal: "Membuat isu lingkungan material dapat dikelola melalui pemilik, KPI, bukti, governance, dan disclosure yang konsisten.",
    firstWeek:
      "Pilih tiga isu paling relevan untuk organisasi dan tentukan siapa yang memegang data dasarnya.",
    caution:
      "Jangan mengumpulkan KPI hanya karena framework memintanya; setiap metrik perlu terkait pada keputusan, risiko, atau target yang jelas.",
    steps: [
      {
        title: "Tentukan isu dan pengguna keputusan",
        instruction:
          "Daftar isu yang memengaruhi operasi, stakeholder, regulasi, atau pendanaan; tandai siapa yang membutuhkan keputusan atau informasi tersebut.",
        evidence: "Catatan workshop materiality atau risk review.",
        output: "Daftar isu prioritas.",
        doneWhen: "Tiga isu memiliki alasan relevansi dan pengguna keputusan.",
      },
      {
        title: "Rumuskan KPI yang dapat digunakan",
        instruction:
          "Untuk tiap isu, tentukan definisi metrik, unit, periode, batas cakupan, baseline, dan target bila sudah tersedia.",
        evidence: "Data dictionary draft.",
        output: "KPI card.",
        doneWhen:
          "KPI tidak bergantung pada istilah yang dapat ditafsirkan berbeda oleh dua orang.",
      },
      {
        title: "Tetapkan pemilik dan evidence",
        instruction:
          "Tentukan pemilik data, sumber primer, bukti pendukung, frekuensi pembaruan, dan jalur approval.",
        evidence: "RACI sederhana dan evidence list.",
        output: "Data ownership map.",
        doneWhen:
          "Setiap KPI memiliki satu pemilik dan satu jalur bukti minimum.",
      },
      {
        title: "Buat review governance",
        instruction:
          "Tetapkan agenda review singkat: perubahan data, risiko, deviasi target, keputusan, dan action owner.",
        evidence: "Template minutes atau review pack.",
        output: "Ritme governance.",
        doneWhen:
          "Review berikutnya sudah memiliki tanggal dan pemilik agenda.",
      },
      {
        title: "Siapkan disclosure hati-hati",
        instruction:
          "Tulis narasi berbasis data yang membedakan fakta, target, metodologi, keterbatasan, dan langkah berikutnya.",
        evidence: "Disclosure draft dan evidence index.",
        output: "Disclosure-ready packet.",
        doneWhen:
          "Setiap klaim dapat ditelusuri ke bukti atau batasannya dijelaskan.",
      },
    ],
  },
  {
    domainId: "markets",
    role: "Sustainability, finance, legal, procurement, atau pengelola risiko",
    goal: "Menilai dan mencatat instrumen pasar karbon secara terpisah dari emisi gross, pengurangan internal, dan klaim publik.",
    firstWeek:
      "Pastikan inventaris gross dan strategi pengurangan internal telah dicatat sebelum membahas pembelian unit karbon.",
    caution:
      "Unit karbon tidak otomatis membenarkan klaim net-zero, carbon neutral, atau kompensasi; klaim perlu kebijakan, bukti, dan review legal tersendiri.",
    steps: [
      {
        title: "Pisahkan angka gross dan strategi pengurangan",
        instruction:
          "Tulis baseline gross, sumber emisi utama, dan rencana reduksi internal pada dokumen terpisah dari ledger unit karbon.",
        evidence: "Inventaris GRK dan reduction plan.",
        output: "Gross-versus-market statement.",
        doneWhen:
          "Tim dapat melihat emisi gross tanpa angka credit atau offset tercampur.",
      },
      {
        title: "Deskripsikan unit yang dipertimbangkan",
        instruction:
          "Catat jenis instrumen, proyek, vintage, registry, volume, status kepemilikan, dan tujuan penggunaannya.",
        evidence: "Term sheet, registry record, atau informasi proyek.",
        output: "Unit profile.",
        doneWhen:
          "Tidak ada unit yang hanya dicatat sebagai 'offset' tanpa identitas dan status.",
      },
      {
        title: "Lakukan due diligence dasar",
        instruction:
          "Periksa registry, bukti penerbitan, risiko double counting, status retirement, serta kebijakan internal dan kewajiban yang relevan.",
        evidence: "Checklist due diligence dan sumber review.",
        output: "Review note unit karbon.",
        doneWhen:
          "Keputusan lanjut, tahan, atau tolak memiliki alasan tertulis.",
      },
      {
        title: "Bangun ledger dan kontrol",
        instruction:
          "Simpan ID unit, tanggal, volume, biaya, status, dokumen, dan pihak yang menyetujui dalam ledger yang tidak dapat tercampur dengan inventaris gross.",
        evidence: "Carbon unit ledger dan lampiran.",
        output: "Ledger unit karbon.",
        doneWhen:
          "Setiap perubahan status memiliki tanggal dan bukti pendukung.",
      },
      {
        title: "Review klaim sebelum publikasi",
        instruction:
          "Sebelum menyebut unit dalam komunikasi, cek klaim, cakupan, bahasa, bukti retirement, serta batasan yang perlu disampaikan.",
        evidence: "Claim review sheet dan approval.",
        output: "Claim-ready pack.",
        doneWhen:
          "Tidak ada klaim publik tanpa pemilik, bukti, dan persetujuan.",
      },
    ],
  },
];
