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
