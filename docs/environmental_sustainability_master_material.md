# Materi Lengkap Environmental Sustainability

## Basis Referensi untuk Pengembangan Tools

**Versi dokumen:** 1.0  
**Tanggal penyusunan:** 24 Agustus 2026  
**Bahasa:** Indonesia  
**Tujuan:** Menjadi bahan acuan konseptual, metodologis, dan fungsional untuk mengembangkan tools environmental sustainability, khususnya tools ESG, energy management, GHG accounting, carbon footprint, environmental management, dan sustainability reporting.

> **Catatan penting.** Dokumen ini adalah materi referensi dan rancangan kebutuhan pengetahuan, bukan pengganti teks standar, nasihat hukum, atau opini assurance. Standar, faktor emisi, dan regulasi memiliki versi serta wilayah berlaku yang berbeda. Tools harus menyimpan versi sumber, tanggal efektif, yurisdiksi, asumsi, dan jejak audit.

---

## 1. Ringkasan Eksekutif

Environmental sustainability dalam konteks profesional adalah sistem untuk memahami, mengukur, mengendalikan, melaporkan, dan meningkatkan dampak lingkungan dari aktivitas organisasi. Cakupannya tidak berhenti pada pengurangan sampah atau penanaman pohon, tetapi mencakup **emisi gas rumah kaca, energi, air, limbah, pencemaran, biodiversitas, penggunaan lahan, rantai pasok, risiko iklim, dan kualitas pengungkapan**.

Dalam praktik bisnis, environmental sustainability biasanya beririsan dengan tiga kelompok pekerjaan. Pertama, **pengukuran dan accounting**, misalnya inventarisasi GRK, carbon footprint, energy balance, water balance, dan material flow. Kedua, **manajemen dan perbaikan**, misalnya ISO 14001, ISO 50001, efisiensi energi, pengurangan emisi, pengelolaan limbah, dan environmental compliance. Ketiga, **disclosure dan decision support**, misalnya ESG reporting, GRI, IFRS S1/S2, TCFD, TNFD, CDP, serta pelaporan yang dapat diaudit.

Untuk pengembangan tools, prinsip yang paling penting adalah memisahkan **data mentah**, **faktor konversi**, **metode kalkulasi**, **hasil**, **indikator kinerja**, **target**, **bukti pendukung**, dan **laporan**. Dengan arsitektur ini, sebuah kalkulator sederhana dapat berkembang menjadi platform yang mendukung screening, pengelolaan program, reporting, audit trail, dan assurance.

---

## 2. Ruang Lingkup Environmental Sustainability

### 2.1 Definisi kerja

Environmental sustainability dapat didefinisikan sebagai pengelolaan aktivitas manusia agar penggunaan sumber daya, emisi, limbah, dan dampak terhadap ekosistem tetap berada dalam batas yang dapat ditanggung lingkungan serta tidak mengurangi kemampuan generasi mendatang untuk memenuhi kebutuhannya. Perserikatan Bangsa-Bangsa menghubungkan sustainability dengan pendekatan terpadu yang menggabungkan kepedulian lingkungan dan pembangunan ekonomi.[1]

Dalam tools, definisi ini perlu diterjemahkan menjadi pertanyaan operasional:

| Pertanyaan | Contoh penerapan |
|---|---|
| Apa yang digunakan organisasi? | Energi, air, bahan baku, lahan, bahan kimia |
| Apa yang dilepaskan? | GRK, polutan udara, efluen, limbah, panas |
| Apa yang dipengaruhi? | Iklim, ekosistem, biodiversitas, masyarakat sekitar |
| Apa risikonya bagi bisnis? | Gangguan pasokan, regulasi, biaya energi, bencana, reputasi |
| Apa tindakan perbaikannya? | Efisiensi, substitusi, circularity, restorasi, pengurangan emisi |
| Bagaimana kinerjanya dibuktikan? | Data, faktor emisi, dokumen, audit, assurance, laporan |

### 2.2 Hubungan dengan ESG

**ESG** adalah kerangka yang menggabungkan isu **Environmental, Social, dan Governance**. Environmental sustainability terutama berada di pilar E, tetapi data lingkungan sering memengaruhi pilar G melalui kebijakan, pengawasan dewan, manajemen risiko, pengendalian internal, dan disclosure. Pilar S juga dapat bersinggungan dengan lingkungan melalui isu kesehatan masyarakat, hak masyarakat adat, keselamatan pekerja, dan keadilan transisi.

Environmental sustainability tidak sama dengan ESG secara keseluruhan. ESG lebih luas karena mencakup isu sosial dan tata kelola. Sebaliknya, environmental management lebih berfokus pada cara organisasi mengendalikan aspek dan dampak lingkungannya. Tools perlu menghindari pencampuran ketiganya dengan menyediakan taxonomy dan ownership yang jelas.

### 2.3 Lapisan materi

| Lapisan | Fokus | Contoh modul tools |
|---|---|---|
| **Planet dan dampak** | Iklim, air, polusi, limbah, biodiversitas, sumber daya | Impact register, environmental aspects register |
| **Operasi** | Energi, bahan bakar, proses, transportasi, fasilitas | Activity data collection, energy dashboard |
| **Value chain** | Pemasok, logistik, penggunaan produk, end-of-life | Scope 3, supplier portal, LCA |
| **Manajemen** | Kebijakan, target, program, risiko, audit | EMS, EnMS, action tracker |
| **Disclosure** | KPI, narrative, evidence, framework mapping | GRI/ISSB/TNFD reporting |
| **Assurance** | Kontrol, bukti, review, verifikasi | Data lineage, approval workflow |

---

## 3. ESG dan Sustainability Management

### 3.1 Materiality

Materiality adalah proses menentukan topik yang cukup penting untuk memengaruhi keputusan, dampak, atau strategi. Penggunaannya berbeda menurut framework. Pendekatan **impact materiality** menilai dampak organisasi terhadap ekonomi, lingkungan, dan manusia; GRI dirancang untuk membantu organisasi memahami serta melaporkan dampaknya kepada stakeholders.[4] Pendekatan **financial materiality** berfokus pada sustainability-related risks and opportunities yang dapat memengaruhi prospek, arus kas, akses pendanaan, atau cost of capital; ini merupakan fokus ISSB/IFRS S1 dan S2.[3]

Tools sebaiknya tidak memiliki satu tombol materiality yang menghasilkan keputusan otomatis. Lebih baik sediakan dua dimensi yang dapat dipetakan:

| Dimensi | Pertanyaan utama | Output |
|---|---|---|
| **Impact materiality** | Seberapa besar, luas, serius, dan sulit dipulihkan dampak organisasi terhadap lingkungan? | Daftar topik dampak material |
| **Financial materiality** | Apakah isu lingkungan dapat memengaruhi cash flow, asset value, financing, cost, atau business continuity? | Daftar risiko/peluang material |

Parameter penilaian dapat mencakup severity, scale, scope, irremediable character, likelihood, time horizon, stakeholder concern, financial magnitude, dan confidence. Semua skor harus memiliki definisi, bobot, sumber bukti, dan approval owner.

### 3.2 ESG governance

Materi governance untuk environmental sustainability meliputi pembagian peran antara board, executive sponsor, sustainability team, facility/energy manager, procurement, finance, legal, risk, IT, HR, dan data owner. Framework ISSB menggunakan area governance, strategy, risk management, serta metrics and targets sebagai struktur inti disclosure.[3]

Contoh artefak yang dibutuhkan tools adalah:

- environmental atau sustainability policy;
- daftar peran dan RACI;
- materiality assessment;
- risk and opportunity register;
- target register;
- KPI dictionary;
- evidence repository;
- approval log; dan
- reporting calendar.

---

## 4. Inventarisasi GRK dan Carbon Accounting

### 4.1 Konsep dasar

Inventarisasi GRK adalah proses mengidentifikasi, mengukur, mengagregasi, dan melaporkan emisi serta, bila relevan, removals organisasi. GHG Protocol Corporate Standard menyediakan panduan untuk inventarisasi tingkat organisasi dan mencakup tujuh gas yang terkait dengan Kyoto Protocol: CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, dan NF₃.[5]

Hasil biasanya dinyatakan sebagai **CO₂ ekuivalen atau CO₂e**. CO₂e memungkinkan gas yang berbeda dinyatakan dalam satuan dampak pemanasan yang setara menggunakan nilai **global warming potential atau GWP** yang ditentukan oleh metodologi dan sumber yang dipilih.

### 4.2 Scope 1, Scope 2, dan Scope 3

| Scope | Definisi kerja | Contoh sumber |
|---|---|---|
| **Scope 1** | Emisi langsung dari sumber yang dimiliki atau dikendalikan organisasi | Pembakaran boiler, genset, kendaraan, proses industri, kebocoran refrigeran |
| **Scope 2** | Emisi tidak langsung dari energi yang dibeli atau diperoleh | Listrik, steam, heating, cooling |
| **Scope 3** | Emisi tidak langsung lain sepanjang value chain | Barang/jasa yang dibeli, capital goods, transportasi, perjalanan, commuting, penggunaan produk, investasi, limbah |

Scope 2 Guidance menstandarkan pengukuran emisi dari listrik, steam, heating, dan cooling yang dibeli.[5] Scope 3 Standard menyediakan pendekatan untuk emisi value chain dan 15 kategori aktivitas upstream serta downstream.[6]

### 4.3 Organizational boundary

Sebelum menghitung, organisasi harus menentukan entitas, fasilitas, aset, lokasi, joint venture, leased asset, anak perusahaan, serta operasi yang masuk inventaris. Pendekatan boundary perlu dipilih secara konsisten, misalnya berdasarkan operational control, financial control, atau equity share sesuai metodologi yang dipakai.

Tools harus menyimpan:

| Field | Contoh |
|---|---|
| Organization | PT Contoh Energi |
| Reporting year | 2025 |
| Boundary method | Operational control |
| Included entities | Pabrik A, kantor pusat, gudang B |
| Excluded entities | JV C, dengan alasan |
| Base year | 2022 |
| Consolidation rule | 100% operational control |
| Change log | Akuisisi pabrik pada 2025 |

### 4.4 Rumus umum

Rumus paling umum adalah:

> **Emisi GRK = Data Aktivitas × Faktor Emisi × Faktor Konversi**

Jika faktor emisi sudah menyatakan kg CO₂e per unit aktivitas, faktor konversi mungkin hanya berupa pembagian 1.000 untuk mengubah kg menjadi ton:

> **tCO₂e = Activity Data × EF (kg CO₂e/unit) ÷ 1.000**

Contoh kategori perhitungan:

| Sumber | Activity data | Faktor emisi | Hasil |
|---|---|---|---|
| Solar kendaraan | Liter solar | kg CO₂e/liter | kg atau tCO₂e |
| Listrik | kWh | kg CO₂e/kWh | kg atau tCO₂e |
| Refrigeran | Kg refrigeran yang bocor | kg CO₂e/kg refrigeran | kg atau tCO₂e |
| Perjalanan | Passenger-km atau liter bahan bakar | kg CO₂e/unit | kg atau tCO₂e |
| Limbah | Ton limbah per jenis/metode pengolahan | kg CO₂e/ton | kg atau tCO₂e |
| Pembelian | Kg material atau nilai belanja | EF berbasis aktivitas atau spend | kg atau tCO₂e |

Faktor emisi wajib menyimpan unit, sumber, geographic applicability, tahun, versi, basis GWP, metode, uncertainty, dan tanggal berlaku. IPCC 2006 Guidelines membagi panduan ke dalam General Guidance and Reporting, Energy, Industrial Processes and Product Use, Agriculture/Forestry and Other Land Use, serta Waste.[7]

### 4.5 Scope 2 location-based dan market-based

Untuk listrik yang dibeli, tools dapat mendukung dua pendekatan bila data dan metodologi mengharuskannya. **Location-based** menggunakan faktor emisi rata-rata jaringan di lokasi konsumsi. **Market-based** menggunakan instrumen atau faktor yang merepresentasikan kontrak dan pilihan pembelian energi, apabila memenuhi persyaratan kualitas yang relevan. Jangan menggabungkan dua hasil menjadi satu angka tanpa label; tampilkan metode, factor source, contractual instrument, dan residual mix bila tersedia.

### 4.6 Kualitas data

Kualitas activity data lebih penting daripada tampilan kalkulator. Tools sebaiknya memberi skor atau flag kualitas berdasarkan:

| Level | Karakteristik |
|---|---|
| **A — Measured** | Meter, invoice, fuel log, weighbridge, atau sistem transaksi yang lengkap |
| **B — Documented estimate** | Estimasi dari catatan internal yang terdokumentasi |
| **C — Proxy** | Data lokasi, jam operasi, luas bangunan, atau unit produksi sebagai proksi |
| **D — Spend-based/default** | Nilai belanja atau faktor default karena data aktivitas belum tersedia |
| **E — Missing** | Belum ada data; hasil hanya indikatif atau tidak dihitung |

Setiap hasil harus memiliki data owner, evidence link, periode, unit, metode estimasi, dan reviewer. Tools sebaiknya tidak menyamakan angka aktual dan angka estimasi tanpa penanda.

### 4.7 Carbon calculator dan E-Calc

**Emission calculator atau E-Calc** dan **carbon footprint calculator** adalah alat implementasi untuk menjalankan perhitungan; keduanya bukan standar akuntansi. Calculator dapat digunakan untuk screening, simulasi, edukasi, atau inventarisasi yang lebih formal, tergantung kualitas data, faktor emisi, boundary, kontrol, dan dokumentasi.

Fitur minimum calculator yang baik meliputi:

1. pilihan objek perhitungan: organisasi, fasilitas, produk, acara, perjalanan, rumah tangga, atau proyek;
2. pemilihan periode dan lokasi;
3. input activity data dengan unit yang jelas;
4. konversi unit yang terdokumentasi;
5. factor library yang dapat diberi versi;
6. pemetaan otomatis ke Scope dan kategori sumber;
7. penyimpanan asumsi dan sumber data;
8. perhitungan gross emissions sebelum offsets atau removals;
9. breakdown per scope, sumber, lokasi, dan periode;
10. confidence atau data-quality score; serta
11. export hasil dan evidence pack.

**Aturan penting:** avoided emissions, offsets, renewable energy certificates, dan removals tidak boleh diam-diam dikurangkan dari gross inventory. Tools harus menampilkan gross emissions, reductions, removals, offsets, dan net presentation sebagai field terpisah dengan label metodologi.

### 4.8 Scope 3 secara lebih rinci

Lima belas kategori Scope 3 perlu dimodelkan sebagai taxonomy, bukan sekadar kolom bebas. Kategori tersebut mencakup purchased goods and services; capital goods; fuel- and energy-related activities not included in Scope 1/2; upstream transportation and distribution; waste generated in operations; business travel; employee commuting; upstream leased assets; downstream transportation and distribution; processing of sold products; use of sold products; end-of-life treatment of sold products; downstream leased assets; franchises; dan investments.[6]

Tools dapat menyediakan tiga metode umum:

| Metode | Data utama | Kelebihan | Keterbatasan |
|---|---|---|---|
| **Supplier-specific** | Emisi yang dilaporkan pemasok | Lebih spesifik | Bergantung pada kesiapan pemasok |
| **Activity-based** | Kg material, ton-km, passenger-km, unit produk | Lebih representatif | Memerlukan data operasional |
| **Spend-based** | Nilai pembelian dan EEIO factor | Cepat untuk screening | Ketidakpastian lebih tinggi |

---

## 5. Manajemen Energi

### 5.1 Tujuan

Energy management bertujuan mengurangi konsumsi, biaya, intensitas, dan emisi energi tanpa mengorbankan keselamatan, kualitas, kapasitas, atau kebutuhan layanan. ISO 50001 menyediakan kerangka Energy Management System atau EnMS untuk menetapkan kebijakan dan target, menggunakan data, mengukur hasil, melakukan review, dan meningkatkan kinerja secara berkelanjutan.[8]

### 5.2 Siklus kerja EnMS

| Tahap | Aktivitas | Output tools |
|---:|---|---|
| 1 | Menetapkan scope, energy policy, dan peran | EnMS profile, RACI |
| 2 | Mengumpulkan konsumsi dan biaya energi | Energy data ledger |
| 3 | Melakukan energy review | Significant energy uses |
| 4 | Menentukan baseline dan EnPI | Baseline model, KPI |
| 5 | Menetapkan target | Target register |
| 6 | Menemukan peluang penghematan | Opportunity pipeline |
| 7 | Menjalankan proyek | Action tracker |
| 8 | Mengukur dan memverifikasi hasil | M&V record |
| 9 | Melakukan review dan perbaikan | Management review |

### 5.3 Data energi

Data minimal meliputi jenis energi, unit, periode, lokasi, meter, volume, biaya, tarif, sumber invoice, faktor konversi energi, dan hubungan dengan driver operasi. Driver dapat berupa unit produksi, luas bangunan, jam operasi, occupancy, ton-km, atau pendapatan.

Contoh KPI:

- kWh per unit produksi;
- GJ per ton produk;
- liter bahan bakar per kilometer;
- kWh per m² bangunan;
- renewable energy share;
- peak demand;
- energy cost per unit output; dan
- tCO₂e per unit output.

### 5.4 Baseline dan EnPI

Energy baseline adalah kondisi pembanding yang digunakan untuk menilai perubahan kinerja. Baseline perlu memiliki periode, batas, sumber data, dan metode normalisasi. Jika produksi berubah, perbandingan total kWh antarbulan dapat menyesatkan. Tools dapat menyediakan normalisasi terhadap output produksi, jam operasi, cuaca, atau occupancy.

Rumus intensitas sederhana:

> **Energy intensity = Total energy consumption ÷ Relevant activity driver**

Rumus penghematan relatif:

> **Energy saving (%) = (Baseline normalized energy − Actual energy) ÷ Baseline normalized energy × 100%**

Tools sebaiknya membedakan saving yang **estimated**, **measured**, dan **verified**.

### 5.5 Energy audit dan M&V

Energy audit mengidentifikasi sumber konsumsi terbesar, kehilangan, kondisi peralatan, peluang efisiensi, biaya investasi, penghematan, dan risiko implementasi. M&V menguji apakah penghematan benar-benar terjadi dibandingkan baseline dengan batas dan periode yang disepakati.

Data proyek energi:

| Field | Contoh |
|---|---|
| Project | Retrofit LED gudang |
| Baseline | 120 fixture × 100 W × 4.000 jam |
| Proposed | 120 fixture × 40 W × 4.000 jam |
| Investment | Nilai investasi |
| Expected saving | kWh/tahun dan biaya/tahun |
| Emission impact | tCO₂e/tahun |
| Payback | Tahun atau bulan |
| Status | Identified, approved, implemented, verified |
| Evidence | Invoice, commissioning, meter data |

---

## 6. Environmental Management System dan Kepatuhan

### 6.1 ISO 14001

ISO 14001 adalah kerangka Environmental Management System atau EMS untuk menetapkan, menerapkan, memelihara, dan terus memperbaiki sistem pengelolaan tanggung jawab lingkungan.[9] Pada saat penyusunan dokumen ini, halaman resmi ISO menyatakan ISO 14001:2015 telah withdrawn dan digantikan ISO 14001:2026. Tools harus memiliki konfigurasi standar berbasis versi dan tidak menganggap checklist edisi lama selalu berlaku.

### 6.2 Aspects and impacts

Environmental aspect adalah elemen aktivitas, produk, atau jasa organisasi yang dapat berinteraksi dengan lingkungan. Environmental impact adalah perubahan terhadap lingkungan, baik merugikan maupun menguntungkan, yang dihasilkan dari aspek tersebut.

Contoh register:

| Aktivitas | Aspect | Impact | Kondisi | Significance | Control |
|---|---|---|---|---|---|
| Operasi boiler | Pembakaran bahan bakar | Emisi udara dan GRK | Normal | Tinggi | Burner tuning, fuel monitoring |
| Pencucian proses | Penggunaan air dan bahan kimia | Efluen | Normal | Tinggi | Wastewater treatment |
| Penyimpanan solar | Risiko tumpahan | Pencemaran tanah | Darurat | Tinggi | Bunding, emergency response |
| Pengiriman produk | Konsumsi bahan bakar | Emisi Scope 3 | Normal | Sedang | Route optimization |

Metode scoring harus dikonfigurasi, misalnya severity × likelihood × legal sensitivity × stakeholder concern. Jangan membuat skor yang tampak presisi tanpa menjelaskan definisi skala.

### 6.3 Legal and compliance register

Tools perlu memiliki daftar izin, persyaratan, batas baku mutu, frekuensi pemantauan, responsible owner, tanggal jatuh tempo, dokumen bukti, status kepatuhan, temuan, dan tindakan korektif. Regulasi harus dipetakan berdasarkan negara, provinsi, sektor, jenis fasilitas, dan tanggal efektif.

Untuk Indonesia, POJK 51/POJK.03/2017 merupakan sumber resmi terkait penerapan keuangan berkelanjutan bagi Lembaga Jasa Keuangan, Emiten, dan Perusahaan Publik.[10] Regulasi ini tidak boleh diperlakukan sebagai kewajiban universal bagi semua jenis organisasi; tools harus menyediakan jurisdiction and applicability assessment serta memeriksa perubahan regulasi terbaru.

---

## 7. Climate Risk, Decarbonization, dan Net-Zero

### 7.1 Jenis risiko iklim

**Physical risk** berasal dari perubahan fisik iklim seperti banjir, kekeringan, gelombang panas, badai, kenaikan muka laut, atau perubahan pola hujan. **Transition risk** berasal dari perubahan kebijakan, teknologi, pasar, harga karbon, preferensi pelanggan, dan ekspektasi investor menuju ekonomi rendah emisi. Risiko tersebut dapat memengaruhi aset, operasi, pemasok, pendapatan, biaya, modal, dan reputasi.

Risk register sebaiknya memiliki:

- hazard dan driver;
- lokasi serta aset yang terkena;
- time horizon;
- likelihood dan severity;
- financial exposure;
- existing controls;
- adaptation response;
- mitigation response;
- owner;
- scenario atau evidence source; dan
- residual risk.

### 7.2 Decarbonization hierarchy

Urutan tindakan yang baik adalah:

1. menghindari atau mengurangi kebutuhan energi dan aktivitas beremisi;
2. meningkatkan efisiensi proses dan peralatan;
3. beralih ke sumber energi atau bahan bakar rendah emisi;
4. mengubah desain produk, proses, logistik, dan rantai pasok;
5. menggunakan removal atau offset sesuai aturan yang berlaku untuk emisi residual; serta
6. mengungkapkan gross emissions, reductions, removals, dan offsets secara transparan.

### 7.3 Target iklim

Target perlu memiliki baseline year, target year, boundary, scope, metric, unit, percentage reduction, coverage, owner, milestones, dan metode pengukuran. SBTi Corporate Net-Zero Standard dirancang untuk membantu perusahaan menetapkan target berbasis sains, mengelola transition risk, dan menyusun transisi menuju net-zero.[11] Halaman resmi SBTi menunjukkan evolusi versi standar; karena itu tools wajib menyimpan version, criteria, validation status, dan applicable date.

---

## 8. Air dan Air Limbah

Materi water sustainability mencakup pengambilan air, konsumsi, pembuangan, daur ulang, kualitas sumber air, water stress, proses produksi, dan ketergantungan fasilitas terhadap daerah aliran sungai. Tools perlu membedakan **withdrawal**, **consumption**, **discharge**, dan **reuse**.

Contoh data:

| Indikator | Satuan umum | Contoh sumber |
|---|---|---|
| Water withdrawal | m³ | Meter intake, invoice, izin |
| Water consumption | m³ | Withdrawal − discharge, jika metodologi memungkinkan |
| Discharge | m³ | Flow meter, wastewater report |
| Recycled/reused water | m³ dan % | Treatment plant, process log |
| Effluent quality | mg/L, pH, temperature | Laboratory report |
| Water intensity | m³ per output | Produksi, layanan, luas, atau revenue |

Jangan membandingkan water consumption antarorganisasi tanpa memperhatikan lokasi, water stress, kualitas data, dan metode pengukuran. Tools dapat mengaitkan titik lokasi dengan metadata risiko air jika data geografis tersedia.

---

## 9. Limbah, Material Flow, dan Ekonomi Sirkular

Pengelolaan limbah dimulai dari pencegahan, pengurangan, penggunaan kembali, perbaikan, refurbishment, recycling, recovery, treatment, dan disposal. Hierarki ini perlu disimpan sebagai metode pengelolaan, bukan hanya sebagai label kategori.

### 9.1 Data limbah

Data penting meliputi jenis limbah, klasifikasi hazardous/non-hazardous, sumber proses, berat/volume, metode pengukuran, tujuan pengolahan, vendor, dokumen manifest, lokasi, periode, dan biaya. Untuk limbah B3, persyaratan hukum dan bukti pengangkutan perlu disesuaikan dengan yurisdiksi.

### 9.2 Circularity metrics

KPI dapat meliputi waste generated, waste intensity, diversion from disposal, recycling rate, reuse rate, recycled content, virgin material share, product lifetime, repair rate, take-back volume, dan material recovery. Tools harus memisahkan **recycled**, **reused**, **recovered**, **treated**, dan **disposed**, karena istilah tersebut tidak selalu bermakna sama.

---

## 10. Polusi dan Bahan Kimia

Environmental sustainability mencakup pencemaran udara, air, tanah, laut, kebisingan, bau, bahan kimia, serta pelepasan zat yang berdampak pada kesehatan dan ekosistem. Modul polusi perlu mengelola aspek berikut:

| Area | Contoh metrik |
|---|---|
| Air emissions | NOx, SOx, particulate matter, VOC, dust |
| Water pollution | COD, BOD, TSS, pH, heavy metals, temperature |
| Soil contamination | Spill, contaminated land, remediation status |
| Chemicals | Inventory, hazard class, storage, substitution |
| Marine pollution | Plastic leakage, discharge, spill, lost gear |
| Incident | Date, location, severity, substance, response, corrective action |

Tools tidak boleh menggunakan satu skor pollution yang menyembunyikan detail. Tampilkan quantity, unit, limit, monitoring method, result, exceedance, corrective action, dan evidence.

---

## 11. Biodiversitas dan Nature-related Risk

Biodiversity mencakup keragaman genetik, spesies, dan ekosistem. Bisnis dapat memiliki **dependencies** terhadap nature, misalnya air, penyerbukan, tanah, biomassa, atau perlindungan pesisir, dan juga menimbulkan **impacts** melalui perubahan lahan, polusi, pengambilan sumber daya, atau gangguan habitat.

TNFD menyediakan kerangka disclosure untuk nature-related dependencies, impacts, risks, dan opportunities. Struktur rekomendasinya mencakup governance; strategy; risk and impact management; serta metrics and targets.[12]

Fitur tools yang relevan:

- asset and activity geolocation;
- biodiversity-sensitive area flag;
- land-use change register;
- deforestation-free or no-conversion commitment;
- nature dependency assessment;
- impact driver taxonomy;
- priority location assessment;
- mitigation hierarchy;
- restoration commitment; dan
- nature-related metrics and targets.

Analisis nature membutuhkan data geospasial, sektor, komoditas, ekosistem, dan kualitas lokasi. Tools harus memberikan confidence flag jika penilaian hanya menggunakan proxy.

---

## 12. Life Cycle Assessment dan Product Carbon Footprint

**Life Cycle Assessment atau LCA** menilai dampak sepanjang siklus hidup produk atau jasa. Tahap yang lazim dianalisis adalah ekstraksi bahan baku, pengolahan, manufaktur, distribusi, penggunaan, dan akhir masa pakai. System boundary dapat berbentuk cradle-to-gate, cradle-to-customer, atau cradle-to-grave.

ISO 14067:2018 secara khusus membahas quantification dan reporting carbon footprint of products, konsisten dengan prinsip LCA ISO 14040 dan ISO 14044. ISO 14067 berfokus pada satu impact category, yaitu climate change, dan tidak otomatis menilai aspek sosial, ekonomi, atau dampak lingkungan lainnya.[13]

Data model LCA:

| Entity | Contoh |
|---|---|
| Product | Produk A, versi desain 3 |
| Functional unit | 1 kg produk atau 1 unit layanan |
| System boundary | Cradle-to-gate |
| Life-cycle stage | Material, manufacturing, transport |
| Input flow | Kg material, kWh, liter fuel |
| Output flow | Product, waste, emissions |
| Allocation rule | Mass, economic, energy, system expansion |
| Dataset | Database/factor, geographic and temporal scope |
| Result | kg CO₂e per functional unit |

LCA tidak boleh digunakan untuk membandingkan produk jika functional unit, boundary, allocation, data quality, dan assumptions berbeda.

---

## 13. Sustainable Supply Chain dan Procurement

Sebagian dampak lingkungan berada di luar operasi langsung. Modul sustainable supply chain menghubungkan procurement, supplier data, Scope 3, material, transportasi, packaging, dan end-of-life.

Fitur utama:

- supplier master dan tier;
- supplier code of conduct;
- environmental questionnaire;
- certification registry;
- supplier-specific emissions;
- product/material footprint;
- country and commodity risk;
- corrective action;
- supplier engagement status; dan
- procurement decision criteria.

Tools sebaiknya mengizinkan pemasok memasukkan data dengan bukti, kemudian memberi status **reported**, **estimated**, **verified**, atau **not available**. Data pemasok tidak boleh dipaksa menjadi angka presisi jika metodologinya tidak sebanding.

---

## 14. Sustainability Reporting dan Disclosure

### 14.1 GRI

GRI Standards dirancang sebagai sistem modular yang terdiri dari **Universal Standards, Sector Standards, dan Topic Standards**. GRI membantu organisasi melaporkan dampak terhadap ekonomi, lingkungan, dan manusia, serta topik material dan cara topik tersebut dikelola.[4]

### 14.2 ISSB / IFRS S1 dan S2

IFRS S1 membahas sustainability-related financial disclosures, sementara IFRS S2 berfokus pada climate-related disclosures. Keduanya menggunakan empat area utama: governance, strategy, risk management, dan metrics and targets. IFRS S2 mensyaratkan pengungkapan Scope 1, Scope 2, dan Scope 3 dengan rujukan GHG Protocol.[3]

### 14.3 TCFD dan TNFD

Struktur TCFD yang terdiri dari governance, strategy, risk management, serta metrics and targets telah diintegrasikan ke dalam arsitektur ISSB untuk disclosure iklim. TNFD menggunakan struktur sejenis untuk isu alam, tetapi menambahkan penekanan pada dependencies, impacts, priority locations, dan nature-related risks/opportunities.[3] [12]

### 14.4 CDP dan disclosure questionnaires

CDP dapat dipandang sebagai kanal atau questionnaire disclosure lingkungan. Tools dapat menyediakan export atau mapping, tetapi jangan menganggap setiap pertanyaan CDP identik dengan persyaratan GRI atau ISSB.

### 14.5 Reporting data model

Setiap metrik sebaiknya memiliki:

| Field | Fungsi |
|---|---|
| Metric ID | Identifier stabil |
| Metric name | Nama yang mudah dipahami |
| Definition | Definisi operasional |
| Unit | tCO₂e, MWh, m³, ton, %, dan lain-lain |
| Scope/boundary | Lingkup pengukuran |
| Period | Bulan, kuartal, tahun |
| Value | Nilai numerik |
| Method | Metode pengukuran |
| Source | Invoice, meter, lab, supplier, estimate |
| Framework mapping | GRI/ISSB/TNFD/other |
| Evidence | Dokumen atau link |
| Data quality | Rating kualitas |
| Owner/reviewer | Akuntabilitas |
| Version | Versi metodologi/factor |
| Restatement flag | Perubahan angka historis |

---

## 15. Audit, Assurance, dan Internal Control

GHG Protocol Corporate Standard berfokus pada accounting dan reporting, bukan pada tata cara verifikasi.[5] ISO 14064-1:2018 menetapkan prinsip dan persyaratan tingkat organisasi untuk quantification, reporting, management, dan verification of GHG inventory.[14]

Tools yang mendukung assurance perlu menyediakan:

1. data lineage dari laporan ke activity data;
2. formula dan factor version;
3. bukti per input;
4. approval status;
5. maker-checker workflow;
6. edit history;
7. restatement control;
8. exception report;
9. reconciliation dengan invoice atau ledger;
10. completeness check;
11. duplicate check;
12. unit consistency check;
13. missing-data report; dan
14. export evidence pack.

### 15.1 Contoh rule validasi

| Rule | Kondisi | Tindakan |
|---|---|---|
| Unit missing | Activity value ada tetapi unit kosong | Reject submission |
| Factor mismatch | Unit data tidak cocok dengan unit factor | Minta konversi |
| Factor expired | Factor melewati effective date | Warning/review |
| Boundary gap | Fasilitas tidak terpetakan | Flag completeness |
| Duplicate invoice | Nomor invoice sama pada periode sama | Block atau review |
| Outlier | Nilai menyimpang dari baseline | Request explanation |
| Missing evidence | Data formal tanpa bukti | Mark as estimate |
| Unapproved target | Target tanpa owner atau approval | Incomplete |

---

## 16. Arsitektur Konseptual Tools

### 16.1 Modul inti

| Modul | Fungsi utama |
|---|---|
| **Organization and boundary** | Entitas, fasilitas, lokasi, periode, ownership, boundary |
| **Activity data** | Input konsumsi energi, bahan bakar, transportasi, air, limbah, material |
| **Factor library** | Faktor emisi, GWP, conversion factor, source, version, geography |
| **Calculator engine** | Formula, aggregation, unit conversion, Scope/category mapping |
| **Energy management** | Baseline, EnPI, audit, projects, M&V |
| **Environmental aspects** | Aspects, impacts, significance, controls |
| **Compliance** | Legal register, permits, monitoring, incidents, deadlines |
| **Climate risk** | Physical/transition risk, scenario, adaptation, mitigation |
| **Water and waste** | Balance, quality, waste streams, treatment, circularity |
| **Nature** | Dependencies, impacts, locations, TNFD metrics |
| **Targets and actions** | Reduction target, owner, timeline, project, progress |
| **Reporting** | ESG dashboard, GRI, ISSB, TNFD, CDP mapping |
| **Evidence and assurance** | Documents, approvals, audit trail, reviewer workflow |

### 16.2 Data flow

```text
Master data and boundary
        ↓
Activity data collection ─── Evidence and data quality
        ↓
Unit normalization and validation
        ↓
Factor selection and methodology versioning
        ↓
Calculation engine
        ↓
Scope/category aggregation
        ↓
KPI, baseline, target, risk and hotspot analysis
        ↓
Actions, projects and management review
        ↓
Framework mapping and reporting
        ↓
Assurance/evidence export
```

### 16.3 Entitas data minimal

```text
Organization
 ├── Entity
 ├── Facility
 │    ├── Meter
 │    ├── Asset
 │    ├── ActivityRecord
 │    └── Permit
 ├── Boundary
 ├── ReportingPeriod
 ├── EmissionFactor
 ├── ConversionFactor
 ├── CalculationMethod
 ├── GHGResult
 ├── EnergyBaseline
 ├── EnergyProject
 ├── EnvironmentalAspect
 ├── ComplianceRequirement
 ├── RiskOpportunity
 ├── Target
 ├── Action
 ├── Evidence
 └── ReportDisclosure
```

### 16.4 Principle data governance

Tools harus menggunakan **versioned master data**, bukan formula yang tersebar di kode aplikasi. Factor library, unit conversion, GWP basis, standard mapping, regulatory requirements, dan questionnaire perlu dapat diperbarui tanpa mengubah hasil historis secara diam-diam.

Setiap hasil historis perlu dapat direproduksi dengan kombinasi:

> **Input version + factor version + method version + boundary version + calculation engine version**

---

## 17. KPI Catalog Awal

| Domain | KPI contoh |
|---|---|
| Climate | tCO₂e Scope 1, 2, 3; total gross emissions; emissions intensity; reduction progress |
| Energy | Total energy; renewable share; energy intensity; peak demand; verified savings |
| Water | Withdrawal; consumption; discharge; reuse; water intensity; exceedances |
| Waste | Waste generated; hazardous waste; diversion; recycling; disposal; intensity |
| Pollution | Air emissions; effluent parameters; spills; incidents; exceedances |
| Materials | Virgin material; recycled content; material intensity; circularity rate |
| Nature | Priority locations; land-use change; nature dependencies; restoration area |
| Management | Aspect significance; compliance status; audit findings; overdue actions |
| Targets | Baseline; target; current value; gap; confidence; owner; due date |
| Data quality | Coverage; measured share; estimate share; evidence completeness; restatement count |

KPI tidak boleh dibuat hanya karena datanya mudah dikumpulkan. Setiap KPI harus memiliki definisi, tujuan keputusan, frequency, owner, boundary, unit, calculation method, data quality requirement, dan disclosure mapping.

---

## 18. Roadmap Pengembangan Tools

### Fase 1 — Calculator dan data foundation

Bangun organization, facility, period, activity data, factor library, unit conversion, formula engine, Scope 1/2 calculation, dan output carbon footprint. Fokus pada correctness, transparency, dan audit trail sebelum memperbanyak dashboard.

### Fase 2 — Energy and operational management

Tambahkan meter, energy baseline, EnPI, audit, energy-saving projects, M&V, water, waste, environmental aspects, dan compliance register.

### Fase 3 — Scope 3 dan supply chain

Tambahkan 15 kategori Scope 3, supplier portal, supplier-specific data, activity-based calculation, spend-based screening, procurement mapping, dan hotspot analysis.

### Fase 4 — Risk, targets, and decarbonization

Tambahkan climate risk, target register, reduction pathway, project portfolio, scenario assumptions, renewable procurement, removals/offset separation, dan progress tracking.

### Fase 5 — Reporting dan assurance

Tambahkan GRI/ISSB/TNFD/CDP mapping, disclosure builder, evidence pack, maker-checker, approval, restatement, assurance workflow, dan export.

### Definition of Done untuk modul inti

Sebuah modul dianggap siap apabila pengguna dapat memahami data yang dimasukkan, unit, sumber faktor, formula, asumsi, hasil, kualitas data, perubahan historis, dan cara hasil tersebut dipetakan ke laporan. Modul belum siap jika hanya menghasilkan angka tanpa penjelasan atau bukti.

---

## 19. Prinsip Desain yang Wajib Dipertahankan

**Pertama, transparency over false precision.** Tampilkan asumsi dan kualitas data, bukan hanya dua angka desimal. **Kedua, gross before net.** Gross emissions harus terlihat sebelum pengurangan, removals, atau offsets. **Ketiga, version everything.** Standar, factor, GWP, boundary, formula, dan regulatory mapping harus memiliki versi. **Keempat, evidence by default.** Setiap angka pelaporan perlu dapat ditelusuri ke dokumen atau sumber data. **Kelima, framework-neutral core.** Simpan data inti sekali, lalu petakan ke beberapa framework melalui disclosure mapping. **Keenam, jurisdiction-aware.** Regulasi Indonesia, standar global, dan persyaratan sektor tidak boleh dicampur tanpa label keberlakuan.

> **Definisi produk yang disarankan:** Tools environmental sustainability adalah sistem pengelolaan data, kalkulasi, pengukuran kinerja, pengendalian, target, dan disclosure lingkungan yang dapat ditelusuri—bukan sekadar kalkulator emisi.

---

## 20. Daftar Istilah Singkat

| Istilah | Arti |
|---|---|
| **Activity data** | Data aktivitas yang menimbulkan konsumsi atau emisi |
| **CO₂e** | Satuan ekuivalen dampak gas rumah kaca |
| **Emission factor** | Faktor yang menghubungkan activity data dengan emisi |
| **EnPI** | Energy Performance Indicator |
| **EMS** | Environmental Management System |
| **EnMS** | Energy Management System |
| **GWP** | Global Warming Potential |
| **LCA** | Life Cycle Assessment |
| **Materiality** | Penentuan isu yang penting berdasarkan dampak dan/atau implikasi finansial |
| **M&V** | Measurement and Verification |
| **Removal** | Penyerapan atau penghilangan GRK dari atmosfer |
| **Scope 1** | Emisi langsung |
| **Scope 2** | Emisi tidak langsung dari energi yang dibeli |
| **Scope 3** | Emisi tidak langsung lain dalam value chain |
| **tCO₂e** | Ton CO₂ ekuivalen |
| **Value chain** | Aktivitas upstream dan downstream yang terkait dengan organisasi |

---

## Referensi Kredibel

[1]: [United Nations — Sustainability](https://www.un.org/en/academic-impact/sustainability)  
[2]: [United Nations — Sustainable Development Goals](https://sdgs.un.org/goals)  
[3]: [IFRS Foundation — Introduction to the ISSB and IFRS Sustainability Disclosure Standards](https://www.ifrs.org/sustainability/knowledge-hub/introduction-to-issb-and-ifrs-sustainability-disclosure-standards/)  
[4]: [Global Reporting Initiative — GRI Standards](https://www.globalreporting.org/standards/)  
[5]: [GHG Protocol — Corporate Standard](https://ghgprotocol.org/corporate-standard)  
[6]: [GHG Protocol — Corporate Value Chain (Scope 3) Standard](https://ghgprotocol.org/corporate-value-chain-scope-3-standard)  
[7]: [IPCC — 2006 Guidelines for National Greenhouse Gas Inventories](https://www.ipcc-nggip.iges.or.jp/public/2006gl/)  
[8]: [ISO — ISO 50001 Energy Management](https://www.iso.org/iso-50001-energy-management.html)  
[9]: [ISO — ISO 14001 Environmental Management Systems](https://www.iso.org/standard/14001)  
[10]: [Otoritas Jasa Keuangan — POJK Nomor 51/POJK.03/2017](https://ojk.go.id/id/kanal/perbankan/regulasi/peraturan-ojk/Pages/POJK-Penerapan-Keuangan-Berkelanjutan-bagi-Lembaga-Jasa-Keuangan,-Emiten,-dan-Perusahaan-Publik.aspx)  
[11]: [Science Based Targets initiative — Corporate Net-Zero Standard](https://sciencebasedtargets.org/corporate-net-zero)  
[12]: [TNFD — Disclosure Recommendations](https://tnfd.global/recommendations/)  
[13]: [ISO — ISO 14067 Carbon Footprint of Products](https://www.iso.org/standard/71206.html)  
[14]: [ISO — ISO 14064-1 Greenhouse Gas Quantification and Reporting](https://www.iso.org/standard/66453.html)
