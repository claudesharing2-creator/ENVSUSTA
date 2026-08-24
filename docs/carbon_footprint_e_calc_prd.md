# Product Requirements Document (PRD)
# Carbon Footprint & E-Calc Platform

**Dokumen:** PRD-ENV-CF-001  
**Versi:** 1.0  
**Status:** Draft siap diturunkan menjadi technical design  
**Tanggal:** 24 Agustus 2026  
**Bahasa:** Indonesia  
**Produk:** Tools Carbon Footprint & E-Calc  
**Pemilik produk:** Sustainability / Climate Data Product Team  
**Basis metodologi utama:** GHG Protocol Corporate Standard, GHG Protocol Scope 2 Guidance, GHG Protocol Scope 3 Standard and Calculation Guidance, ISO 14064-1:2018, IPCC Guidelines, serta framework disclosure yang dipetakan secara terpisah.

> **Tujuan dokumen.** PRD ini mendefinisikan produk, kebutuhan pengguna, struktur data, formula, metodologi, aturan validasi, dan acceptance criteria untuk membangun tools yang menghitung serta mengelola inventarisasi emisi gas rumah kaca organisasi. Dokumen ini cukup rinci untuk menjadi dasar backlog engineering, data dictionary, calculation engine, API contract, dan test plan.

> **Batasan.** PRD ini tidak menggantikan teks resmi standar atau regulasi. Faktor emisi, nilai GWP, persyaratan contractual instrument, aturan pelaporan, dan regulasi harus dikelola sebagai data ber-versi. GHG Protocol Corporate Standard berfokus pada accounting dan reporting, sedangkan ISO 14064-1 mencakup persyaratan pada level organisasi untuk quantification, reporting, management, dan verification.[1] [2]

---

## 1. Product Overview

### 1.1 Product vision

Carbon Footprint & E-Calc adalah platform yang membantu organisasi mengubah data aktivitas—seperti listrik, bahan bakar, perjalanan, pembelian, transportasi, limbah, dan investasi—menjadi inventarisasi emisi GRK yang **transparan, dapat direproduksi, dapat ditelusuri, dan siap digunakan untuk pengambilan keputusan serta pelaporan**.

Produk tidak boleh berhenti sebagai kalkulator yang menampilkan satu angka. Produk harus menyediakan rantai data berikut:

```text
Organisasi dan boundary
        → Activity data
        → Normalisasi unit
        → Pemilihan faktor emisi
        → Formula dan calculation run
        → Scope/category result
        → Quality check dan evidence
        → Dashboard, target, dan reporting
```

### 1.2 Masalah yang diselesaikan

Organisasi umumnya menyimpan data lingkungan di invoice, spreadsheet, sistem energi, procurement, travel system, ERP, laporan vendor, dan dokumen manual. Tantangannya adalah data tidak seragam, unit tidak konsisten, faktor emisi berubah, boundary tidak terdokumentasi, Scope 3 sulit dikumpulkan, estimasi tidak diberi label, dan angka pada laporan tidak mudah ditelusuri kembali ke bukti.

Produk menyelesaikan masalah tersebut dengan menyediakan satu model data terkontrol, factor library ber-versi, calculation engine yang deterministik, data-quality workflow, evidence repository, approval, dan framework mapping.

### 1.3 Sasaran produk

| Sasaran | Definisi keberhasilan |
|---|---|
| **Correctness** | Perhitungan mengikuti metode yang dipilih dan lulus test case referensi |
| **Transparency** | Setiap hasil dapat ditelusuri ke input, factor, formula, asumsi, dan versi |
| **Coverage** | Mendukung Scope 1, Scope 2, dan 15 kategori Scope 3 secara modular |
| **Usability** | Contributor non-teknis dapat mengirim data dengan unit dan evidence yang jelas |
| **Auditability** | Perubahan, persetujuan, pembulatan, estimasi, dan restatement tercatat |
| **Decision support** | Pengguna dapat menemukan hotspot, intensitas, target gap, dan peluang reduksi |
| **Interoperability** | Import/export melalui CSV/XLSX/API serta mapping ke reporting framework |
| **Maintainability** | Factor, GWP, unit, metodologi, dan standard version dapat diperbarui tanpa mengubah histori secara diam-diam |

### 1.4 Non-goals versi awal

Versi awal tidak bertujuan menjadi platform perdagangan carbon credit, alat legal compliance otomatis untuk semua negara, alat sertifikasi ISO, pengganti auditor/assurance provider, atau model LCA lengkap untuk seluruh impact categories. Product dapat menyimpan offsets, removals, dan product footprint sebagai modul terpisah, tetapi tidak boleh mengklaim bahwa hasil tersebut otomatis terverifikasi atau net-zero certified.

---

## 2. Pengguna dan Peran

| Persona | Kebutuhan utama | Hak akses utama |
|---|---|---|
| **Organization Admin** | Membuat organisasi, entity, facility, user, boundary, dan konfigurasi | Full configuration, tanpa mengubah hasil yang sudah locked tanpa workflow |
| **Sustainability Manager** | Mengelola inventarisasi, target, hotspot, dan laporan | Create/review/approve inventory dan reports |
| **Data Contributor** | Mengunggah activity data dan evidence untuk area tertentu | Create/edit draft pada scope/facility yang ditugaskan |
| **Energy Manager** | Memantau energi, baseline, EnPI, dan proyek penghematan | Energy modules dan M&V |
| **Procurement/Supply-chain User** | Mengelola supplier, pembelian, transportasi, dan Scope 3 | Assigned supplier/category data |
| **Facility Manager** | Menginput meter, fuel, refrigerant, waste, water, incident | Assigned facility data |
| **Reviewer** | Memeriksa kelengkapan, formula, factor, dan evidence | Comment, approve, reject, request change |
| **Auditor/Assurance Provider** | Menelusuri hasil dan bukti tanpa mengubah data | Read-only audit workspace, issue log |
| **Report Consumer/Executive** | Melihat KPI, tren, target, dan ringkasan | Dashboard/report read-only |
| **Factor Librarian** | Mengelola factor, GWP, unit, source, dan version | Factor lifecycle dan approval |

### 2.1 Role segregation

Produk harus mendukung maker-checker. Contributor tidak boleh menyetujui data yang ia buat sendiri pada workflow formal. Factor yang dipakai pada calculation run yang sudah locked tidak boleh diubah in-place; perubahan harus membuat versi baru atau restatement run.

---

## 3. Konsep Metodologi dan Prinsip Produk

### 3.1 Accounting boundary

Setiap inventory memiliki **organizational boundary**, **operational boundary**, **reporting period**, **base year**, dan **consolidation approach**. Pendekatan boundary dapat berupa operational control, financial control, atau equity share. Tools harus menyimpan pendekatan yang dipilih serta daftar entitas/fasilitas yang termasuk dan tidak termasuk.

### 3.2 Prinsip inventory

Calculation engine harus menyediakan konfigurasi untuk prinsip berikut:

| Prinsip | Implementasi |
|---|---|
| **Relevance** | Hasil dan boundary mencerminkan kebutuhan keputusan pengguna |
| **Completeness** | Sumber emisi yang relevan dipetakan, termasuk exclusions dengan alasan |
| **Consistency** | Metode, unit, factor, boundary, dan time series dapat dibandingkan |
| **Transparency** | Asumsi, estimasi, exclusions, factor, dan formula terlihat |
| **Accuracy** | Mengurangi bias dan ketidakpastian sejauh practical |
| **Conservativeness** | Jika data tidak pasti, uncertainty dan status estimate ditampilkan |

### 3.3 Gross, reduction, removal, offset, dan net

Platform harus memisahkan lima jenis nilai:

| Nilai | Definisi produk |
|---|---|
| **Gross emissions** | Emisi inventaris sebelum pengurangan/removal/offset |
| **Reduction** | Penurunan emisi dari perubahan aktivitas/proses terhadap baseline atau periode pembanding |
| **Removal** | Penyerapan/penghilangan GRK dari atmosfer dengan metodologi tersendiri |
| **Offset/credit** | Instrumen klaim kompensasi yang disimpan terpisah dari inventory |
| **Net presentation** | Presentasi setelah item yang diizinkan secara metodologis, selalu menampilkan gross sebagai angka primer |

Engine dilarang mengurangi offset, avoided emissions, atau klaim recycling benefit dari gross Scope 1–3 secara otomatis. GHG Protocol juga membedakan accounting emisi dari accounting proyek mitigasi/offset.[1]

### 3.4 Direct factor dan gas-specific factor

Sistem harus mendukung dua bentuk faktor:

1. **Direct CO₂e factor**, misalnya kg CO₂e per liter.
2. **Gas-specific factors**, misalnya kg CO₂, kg CH₄, dan kg N₂O per unit, kemudian dikonversi menggunakan GWP set yang dipilih.

Jika factor sudah dalam CO₂e, engine tidak boleh mengalikan GWP sekali lagi.

---

## 4. Ruang Lingkup Fungsional Produk

| Modul | Release | Deskripsi |
|---|---:|---|
| Organization, facility, boundary | MVP | Master data, hierarchy, period, ownership, consolidation |
| Activity data intake | MVP | Manual entry, CSV/XLSX import, API-ready schema |
| Unit conversion | MVP | Dimensional units dan conversion trace |
| Factor library | MVP | EF, GWP, source, geography, version, status |
| Scope 1 calculator | MVP | Stationary, mobile, fugitive, process, land/biogenic memo |
| Scope 2 calculator | MVP | Location-based dan market-based |
| Scope 3 calculator | V1 | 15 categories dengan method-specific input |
| Quality and evidence | MVP | Completeness, validation, evidence, review |
| Reporting/dashboard | MVP | Breakdown, trend, intensity, export |
| Target and action | V1 | Reduction target, project, progress, gap |
| Energy management | V1 | Baseline, EnPI, audit, M&V |
| Framework mapping | V1 | GRI/ISSB/IFRS S1/S2/TNFD/CDP mapping |
| Assurance workspace | V1 | PBC list, issue, evidence, immutable run |
| LCA/product footprint | V2 | Product system boundary dan ISO 14067-style CFP |

---

## 5. Functional Requirements

### 5.1 Organization and reporting setup

| ID | Requirement | Priority |
|---|---|---:|
| FR-ORG-001 | Admin dapat membuat organization, legal entities, facilities, assets, meters, suppliers, products, dan investment records | Must |
| FR-ORG-002 | User dapat membuat reporting period dengan start date, end date, fiscal/calendar basis, status, dan close date | Must |
| FR-ORG-003 | User dapat menetapkan base year dan alasan restatement | Must |
| FR-ORG-004 | User dapat memilih consolidation approach dan menyimpan dokumen kebijakan | Must |
| FR-ORG-005 | Sistem menampilkan included/excluded sources beserta alasan, owner, dan review status | Must |
| FR-ORG-006 | Sistem mendukung multi-country, currency, timezone, locale, dan jurisdiction | Should |

### 5.2 Activity data intake

| ID | Requirement | Priority |
|---|---|---:|
| FR-DATA-001 | Contributor dapat memasukkan activity value, unit, period, facility, source, method, dan note | Must |
| FR-DATA-002 | Contributor dapat mengunggah invoice, meter reading, fuel log, manifest, travel report, supplier report, atau evidence lain | Must |
| FR-DATA-003 | Sistem memvalidasi unit, date range, duplicate, missing field, negative value, dan outlier | Must |
| FR-DATA-004 | Sistem menyimpan raw value dan normalized value tanpa menimpa data mentah | Must |
| FR-DATA-005 | Sistem mendukung actual, estimated, proxy, spend-based, supplier-reported, dan verified data status | Must |
| FR-DATA-006 | Sistem mendukung recurring data template per facility/source | Should |
| FR-DATA-007 | Import error ditampilkan per baris dengan remediation instruction | Must |

### 5.3 Factor library

| ID | Requirement | Priority |
|---|---|---:|
| FR-EF-001 | Factor memiliki name, type, unit, value, gas basis, geography, sector, source, citation, version, effective date, expiry/review date, status, dan owner | Must |
| FR-EF-002 | Sistem membedakan combustion EF, life-cycle EF, upstream-only EF, grid EF, market-based EF, waste EF, transport EF, and EEIO EF | Must |
| FR-EF-003 | Sistem menyimpan apakah factor termasuk combustion, upstream, T&D, biogenic CO₂, dan refrigerant GWP | Must |
| FR-EF-004 | Factor tidak boleh diubah in-place setelah digunakan pada locked run | Must |
| FR-EF-005 | Factor selection menyimpan alasan pemilihan dan fallback chain | Must |
| FR-EF-006 | Factor Librarian dapat membuat draft, submit review, approve, retire, dan supersede factor | Must |
| FR-EF-007 | Sistem mendukung factor gas-specific dan GWP set terpisah | Should |

### 5.4 Calculation run

| ID | Requirement | Priority |
|---|---|---:|
| FR-CALC-001 | User dapat membuat calculation run dengan inventory_id, method_version, factor_snapshot, boundary_snapshot, dan engine_version | Must |
| FR-CALC-002 | Engine bersifat deterministic: input dan versi yang sama menghasilkan hasil yang sama | Must |
| FR-CALC-003 | Engine menghasilkan line-level result dan aggregate result | Must |
| FR-CALC-004 | Setiap result line menyimpan formula_id, input_ids, factor_id, normalized inputs, result, rounding policy, dan warnings | Must |
| FR-CALC-005 | Engine dapat menjalankan scenario tanpa mengubah official inventory | Should |
| FR-CALC-006 | Sistem membedakan draft, calculated, in review, approved, locked, superseded, dan restated | Must |
| FR-CALC-007 | Sistem dapat membandingkan dua run dan menunjukkan perbedaan input, factor, method, dan output | Should |

### 5.5 Reporting and exports

| ID | Requirement | Priority |
|---|---|---:|
| FR-REP-001 | Dashboard menampilkan gross Scope 1, Scope 2 location-based, Scope 2 market-based, Scope 3 per category, total, intensity, dan trend | Must |
| FR-REP-002 | Dashboard dapat difilter berdasarkan facility, entity, country, period, scope, category, source, method, dan data quality | Must |
| FR-REP-003 | Export line-level calculation dan evidence index | Must |
| FR-REP-004 | Report menampilkan exclusions, estimates, factors, assumptions, restatements, dan methodological notes | Must |
| FR-REP-005 | Sistem menyediakan mapping ke GRI, ISSB/IFRS S1/S2, TNFD, dan questionnaire yang dikonfigurasi | Should |
| FR-REP-006 | Sistem menyediakan report pack untuk review/assurance | Should |

---

## 6. Calculation Engine Specification

### 6.1 Calculation contract

Setiap perhitungan harus menerima objek yang secara konseptual setara dengan berikut:

```json
{
  "activity": {
    "value": "125000.00",
    "unit": "kWh",
    "period_start": "2025-01-01",
    "period_end": "2025-12-31",
    "facility_id": "FAC-001",
    "data_status": "measured"
  },
  "factor": {
    "id": "EF-ID-GRID-2025",
    "value": "0.82",
    "unit": "kgCO2e/kWh",
    "basis": "location_based",
    "geography": "ID-JK",
    "version": "2025.1"
  },
  "method": {
    "standard": "GHG Protocol",
    "version": "Corporate Standard + Scope 2 Guidance",
    "formula_id": "S2.LOCATION.001"
  },
  "options": {
    "rounding": "half_up_final_only",
    "include_in_total": true
  }
}
```

Output minimum:

```json
{
  "result": {
    "value": "102500.00",
    "unit": "kgCO2e",
    "tco2e": "102.50000",
    "scope": "2",
    "category": null,
    "method": "location_based"
  },
  "trace": {
    "formula_id": "S2.LOCATION.001",
    "activity_record_ids": ["ACT-001"],
    "factor_id": "EF-ID-GRID-2025",
    "factor_version": "2025.1",
    "engine_version": "1.0.0"
  },
  "quality": {
    "data_status": "measured",
    "factor_status": "approved",
    "warnings": []
  }
}
```

### 6.2 Numeric rules

1. Gunakan decimal arithmetic/BigDecimal, bukan binary floating point, untuk nilai finansial, activity, factor, dan hasil.
2. Simpan nilai internal dengan precision yang cukup; lakukan rounding hanya pada presentation atau final aggregation sesuai policy.
3. Simpan unit asli dan unit normalisasi.
4. Hasil primer disimpan dalam **kg CO₂e** dan derived display dalam **tCO₂e**.
5. Jangan mengubah nilai negatif menjadi nol tanpa rule. Nilai negatif hanya diperbolehkan untuk removal atau adjustment type tertentu yang eksplisit.
6. Factor direct-CO₂e tidak boleh dikalikan GWP lagi.
7. Jika factor gas-specific, engine harus menghitung per gas lalu menjumlahkan.
8. Semua perhitungan harus idempotent: rerun dengan snapshot yang sama tidak membuat angka berbeda.

### 6.3 Unit and conversion registry

| Unit family | Unit contoh | Konversi internal yang disarankan |
|---|---|---|
| Mass | kg, tonne | kg sebagai canonical mass |
| Energy | Wh, kWh, MWh, GJ, TJ | kWh atau GJ sesuai formula, dengan conversion trace |
| Volume liquid | L, m³ | L atau m³ sesuai factor |
| Distance | km, mile | km |
| Transport | passenger-km, tonne-km, TEU-km | Simpan dimensi majemuk, jangan hilangkan denominators |
| Area | m², ha | m² |
| Currency | IDR, USD, EUR | Currency + exchange-rate version + price year |
| Emission | kg CO₂e, tCO₂e | kg CO₂e canonical |
| Gas mass | kg CO₂, kg CH₄, kg N₂O | Gas-specific mass sebelum GWP |

Conversion formula umum:

```text
normalized_value = raw_value × conversion_factor
```

Jika satuan melibatkan density, NCV, occupancy, load factor, exchange rate, atau other parameter, parameter tersebut harus direkam sebagai input tersendiri, bukan tersirat dalam formula.

### 6.4 Factor selection hierarchy

Factor selection harus configurable, tetapi default hierarchy dapat berupa:

1. supplier/facility-specific factor yang relevan dan approved;
2. utility, carrier, atau operator-specific factor;
3. national/regional government factor;
4. IPCC/GHG Protocol default factor;
5. recognized LCA/EEIO database;
6. generic fallback factor untuk screening.

Hierarki tidak boleh diterapkan secara buta. Engine harus memprioritaskan geographic, temporal, technical, product, and boundary representativeness. Setiap fallback harus diberi warning.

---

## 7. GHG Accounting Methodology: Scope 1

### 7.1 Definisi Scope 1

Scope 1 adalah emisi langsung dari sumber yang dimiliki atau dikendalikan organisasi. Dalam tools, Scope 1 minimal mencakup **stationary combustion, mobile combustion, fugitive emissions, process emissions**, dan optional land-use/biogenic memo items.

### 7.2 Scope 1 — stationary combustion

#### Metode A: direct CO₂e factor

```text
E_kgCO2e = Σ (fuel_quantity_normalized × EF_direct_kgCO2e_per_unit)
```

Input:

| Input | Wajib | Catatan |
|---|---:|---|
| Fuel type | Ya | Diesel, gasoline, natural gas, coal, biomass, dan lain-lain |
| Quantity | Ya | Dengan unit dan periode |
| Factor | Ya | Direct combustion factor, geographic/temporal basis |
| Facility/source | Ya | Boiler, furnace, genset, kiln |
| Biogenic flag | Ya untuk biomass | CO₂ biogenic dipisahkan bila metodologi mengharuskan |
| Evidence | Untuk formal inventory | Invoice, meter, fuel log |

#### Metode B: gas-specific factor dan energi

```text
Energy_TJ = quantity × NCV_MJ_per_unit ÷ 1,000,000
E_kgCO2e = Σ_gas (Energy_TJ × EF_gas_kg_per_TJ × GWP_gas)
```

Jika faktor dalam kg/TJ dan NCV dalam MJ/unit, pembagi 1.000.000 mengubah MJ ke TJ.

#### Metode C: mass balance untuk fuel input

Jika data fuel dalam massa:

```text
Energy_TJ = mass_kg × NCV_MJ_per_kg ÷ 1,000,000
```

### 7.3 Scope 1 — mobile combustion

#### Metode fuel-based

```text
E_kgCO2e = Σ_fuel (fuel_quantity × EF_combustion_fuel)
```

#### Metode distance-based

```text
fuel_quantity = distance_km × fuel_efficiency_liter_per_km
E_kgCO2e = fuel_quantity × EF_combustion_fuel
```

Untuk armada dengan unit liter per 100 km:

```text
fuel_quantity_liter = distance_km × fuel_consumption_l_per_100km ÷ 100
```

Untuk kendaraan listrik:

```text
E_kgCO2e = electricity_consumed_kWh × EF_electricity_kgCO2e_per_kWh
```

Jika listrik kendaraan diisi di fasilitas yang termasuk boundary, konsumsi tersebut juga harus direkonsiliasi agar tidak double-count dengan Scope 2. Engine perlu memiliki source ownership dan meter mapping.

### 7.4 Scope 1 — fugitive emissions

Fugitive sources meliputi refrigerant, air-conditioning, fire suppression, SF₆, dan kebocoran gas lain.

#### Metode direct leakage

```text
E_kgCO2e = Σ_gas (mass_leaked_kg × GWP_gas_kgCO2e_per_kg)
```

#### Metode inventory/mass balance

```text
mass_leaked_kg = beginning_stock
                + purchases
                - sales_or_transfers
                - ending_stock
                - recovered_or_reclaimed
```

Engine harus menyimpan apakah nilai leakage berupa **measured leakage**, **recharge quantity proxy**, atau **mass-balance estimate**.

### 7.5 Scope 1 — process emissions

Process emissions berasal dari reaksi kimia atau proses industri yang bukan sekadar pembakaran bahan bakar.

Formula generik:

```text
E_kgCO2e = Σ_process (process_activity × process_EF)
```

Untuk faktor gas-specific:

```text
E_kgCO2e = Σ_process Σ_gas (process_activity × EF_gas × GWP_gas)
```

Contoh activity data dapat berupa ton clinker, ton kapur, ton feedstock, volume gas terlepas, atau stoichiometric input. Formula spesifik harus ditentukan oleh process methodology/factor set dan tidak boleh di-hardcode sebagai satu formula universal.

### 7.6 Biogenic CO₂ dan memo item

CO₂ dari pembakaran biomass/biogenic carbon harus dapat dihitung, tetapi ditampilkan sebagai **biogenic CO₂ memo item** bila metodologi pelaporan memisahkannya dari fossil Scope 1. CH₄ dan N₂O dari pembakaran biomass tetap dapat masuk perhitungan sesuai boundary dan factor. Produk harus memiliki `carbon_origin = fossil | biogenic | mixed | unknown`.

### 7.7 Scope 1 validation rules

| Rule ID | Validasi | Severity |
|---|---|---:|
| S1-V-001 | Fuel activity tanpa unit | Error |
| S1-V-002 | Combustion factor dipakai sebagai upstream-only factor | Error |
| S1-V-003 | Biomass tanpa carbon-origin flag | Warning/Error configurable |
| S1-V-004 | Refrigerant leakage tanpa gas/GWP | Error |
| S1-V-005 | Distance-based mobile tanpa efficiency | Error |
| S1-V-006 | EV electricity dipetakan ke dua meter tanpa reconciliation | Warning |
| S1-V-007 | Process factor tanpa process applicability | Error |

---

## 8. GHG Accounting Methodology: Scope 2

GHG Protocol Scope 2 Guidance menstandarkan pengukuran emisi dari purchased/acquired electricity, steam, heat, dan cooling, serta membahas contractual instruments dan quality criteria untuk market-based method.[3]

### 8.1 Common scope 2 input

| Input | Deskripsi |
|---|---|
| Energy type | Electricity, steam, heat, cooling |
| Quantity | kWh/MWh/GJ/ton steam sesuai factor |
| Supplier/grid region | Lokasi konsumsi dan supplier |
| Reporting period | Period yang sama dengan inventory |
| Method | location-based atau market-based |
| Factor | Generation EF atau contractual EF sesuai method |
| Instrument | PPA, REC/EAC, supplier product, residual mix, unknown |
| Quality metadata | Geography, vintage, matching period, ownership/retirement, factor source |
| Evidence | Invoice, contract, certificate, meter, utility data |

### 8.2 Scope 2 — location-based

Formula default:

```text
E_location_kgCO2e = Σ_energy_type Σ_region (
    energy_consumed_MWh × location_based_EF_kgCO2e_per_MWh
)
```

Jika input kWh:

```text
E_location_kgCO2e = electricity_kWh × EF_kgCO2e_per_kWh
```

Faktor harus mewakili rata-rata grid/generation emissions pada lokasi dan periode yang sesuai. Upstream life-cycle emissions dan T&D loss tidak boleh ikut masuk ke Scope 2 jika faktor tersebut dimaksudkan hanya untuk generation; komponen tersebut dapat masuk Scope 3 Category 3 sesuai metodologi.

### 8.3 Scope 2 — market-based

Formula umum:

```text
E_market_kgCO2e = Σ_energy_contract_or_residual_mix (
    energy_matched_MWh × market_based_EF_kgCO2e_per_MWh
)
```

Engine harus melakukan factor selection berdasarkan hierarchy yang dikonfigurasi, misalnya:

1. supplier-specific emission rate yang eligible;
2. product/contractual instrument yang memenuhi quality criteria;
3. residual mix factor;
4. grid-average fallback dengan warning.

Jika contractual instrument hanya mencakup sebagian konsumsi:

```text
E_market_total = E_matched_contract + E_unmatched_residual_mix_or_fallback
```

Tidak boleh mengaplikasikan zero factor untuk seluruh konsumsi jika instrumen hanya mencakup sebagian volume atau tidak memenuhi metadata minimal.

### 8.4 Scope 2 contractual instrument fields

```text
instrument_id
instrument_type
supplier_id
energy_volume_mwh
coverage_start
coverage_end
geography
facility_or_market_matching
vintage_year
certificate_or_contract_reference
ownership_status
retirement_status
factor_source
quality_criteria_status
```

### 8.5 Scope 2 reporting output

Dashboard harus menampilkan sekurang-kurangnya:

- Scope 2 location-based;
- Scope 2 market-based;
- covered vs uncovered energy volume;
- renewable/contractual volume;
- factor by supplier/grid region;
- residual/fallback volume;
- instrument quality warning; dan
- reconciliation to purchased energy.

### 8.6 Scope 2 validation rules

| Rule ID | Validasi | Severity |
|---|---|---:|
| S2-V-001 | Energy quantity tanpa supplier/grid geography | Warning/Error configurable |
| S2-V-002 | Market-based instrument melewati period konsumsi | Error |
| S2-V-003 | Instrument volume melebihi consumption tanpa explanation | Error |
| S2-V-004 | Zero factor tanpa proof of eligible instrument | Error |
| S2-V-005 | Factor upstream life-cycle dipakai sebagai generation-only factor | Warning/Error |
| S2-V-006 | Location dan market output digabung menjadi satu angka tanpa label | Error |
| S2-V-007 | Purchased electricity sudah di Scope 2 tetapi kembali dimasukkan ke Scope 1 | Error |

---

## 9. GHG Accounting Methodology: Scope 3

Scope 3 mencakup emisi value chain upstream dan downstream. GHG Protocol menyediakan guidance untuk 15 kategori dan berbagai metode per kategori, termasuk supplier-specific, hybrid, average-data, activity-based, distance-based, fuel-based, dan spend-based.[4] Data specificity tidak selalu sama dengan accuracy; tools harus menampilkan metode dan confidence, bukan menganggap supplier data selalu lebih akurat.

### 9.1 Universal Scope 3 calculation pattern

```text
E_category_kgCO2e = Σ_i (activity_i_normalized × EF_i)
```

Untuk metode gas-specific:

```text
E_category_kgCO2e = Σ_i Σ_gas (activity_i × EF_i_gas × GWP_gas)
```

Untuk allocated emissions:

```text
E_allocated = E_total_source × allocation_share
```

Untuk scenario/lifetime:

```text
E_lifetime = units_sold × lifetime_activity_per_unit × EF
```

Semua category result harus menyimpan `category_id`, `method_id`, `boundary_note`, `time_boundary`, `allocation_rule`, `scenario_assumption`, dan `data_quality`.

### 9.2 Kategori 1 — Purchased goods and services

**Definisi:** Emisi cradle-to-gate dari barang dan jasa yang dibeli/diperoleh pada reporting year, tidak termasuk pembagian yang lebih tepat ke Category 2–8.

#### Metode supplier-specific

```text
E_cat1 = Σ_products (quantity_purchased × supplier_product_EF_cradle_to_gate)
```

Input: quantity/unit purchased, supplier product EF, product/SKU, period, supplier, verification status.

#### Metode hybrid

```text
E_cat1 = Σ_supplier_products (
    allocated_supplier_S1_S2
  + Σ_materials (material_quantity × material_cradle_to_gate_EF)
  + Σ_input_transport (mass_or_volume × distance × transport_EF)
  + Σ_supplier_waste (waste_quantity × waste_EF)
  + other_applicable_emissions
)
```

#### Metode average-data

```text
E_cat1 = Σ_products (mass_or_units_purchased × average_product_EF)
```

#### Metode spend-based

```text
E_cat1 = Σ_product_types (spend_in_reporting_currency × EEIO_EF_kgCO2e_per_currency)
```

Jika EF berasal dari tahun harga yang berbeda, gunakan deflator/exchange-rate version yang direkam:

```text
spend_adjusted = spend_current_year × price_index_factor
E = spend_adjusted × EEIO_EF_base_year
```

### 9.3 Kategori 2 — Capital goods

Metodenya sama dengan Category 1: supplier-specific, hybrid, average-product, dan spend-based. Total cradle-to-gate emissions dari capital good dihitung pada **tahun akuisisi**, bukan didepresiasi secara emisi selama umur aset.[5]

```text
E_cat2 = Σ_capital_goods (quantity_or_mass × cradle_to_gate_EF)
```

Rules:

- Capital good mengikuti financial accounting classification organisasi.
- Jangan menghitung item yang sama sekaligus sebagai Category 1 dan Category 2.
- Emisi penggunaan capital good masuk Scope 1/2 atau kategori lain sesuai sumber operasi, bukan kembali ke Category 2.

### 9.4 Kategori 3 — Fuel- and energy-related activities not included in Scope 1 or Scope 2

Category 3 tidak mencakup pembakaran fuel yang sudah masuk Scope 1 atau generation emissions electricity yang sudah masuk Scope 2.

#### A. Upstream emissions of purchased fuels

```text
EF_upstream_fuel = EF_life_cycle_fuel − EF_combustion_fuel
E_cat3_A = Σ_fuels (fuel_consumed × EF_upstream_fuel)
```

#### B. Upstream emissions of purchased electricity/steam/heat/cooling

```text
EF_upstream_energy = EF_life_cycle_energy
                   − EF_combustion_generation
                   − EF_T_and_D_if_already_included

E_cat3_B = Σ_energy (energy_consumed × EF_upstream_energy)
```

#### C. Transmission and distribution losses

```text
E_cat3_C = Σ_energy (
    energy_consumed × EF_life_cycle_energy × T_and_D_loss_rate
)
```

#### D. Generation of purchased electricity sold to end users

```text
E_cat3_D = Σ_energy_resold (energy_purchased_for_resale × EF_life_cycle_energy)
```

Input khusus Category 3: combustion EF, life-cycle EF, upstream-only EF, T&D loss rate, supplier/region, energy sold/resold flag, dan inclusion flags agar tidak double-count.

### 9.5 Kategori 4 — Upstream transportation and distribution

Category 4 mencakup third-party transport/distribution dari purchased products ke operasi organisasi dan transport services yang dibeli organisasi. Jika reporting company membayar outbound transport service, treatment dapat berada di Category 4 karena merupakan purchased service; downstream transport setelah point of sale yang tidak dibayar organisasi berada di Category 9.[6]

#### Fuel-based method

```text
E_cat4 = Σ_fuel (fuel_quantity × fuel_EF)
       + Σ_electricity (electricity_quantity × grid_EF)
       + Σ_refrigerant (leakage_mass × refrigerant_GWP)
```

#### Fuel inferred from spend

```text
fuel_quantity = fuel_spend ÷ average_fuel_price
E_cat4 = fuel_quantity × fuel_EF
```

#### Fuel inferred from distance

```text
fuel_quantity = Σ_transport_legs (distance_km × fuel_efficiency_l_per_km)
E_cat4 = fuel_quantity × fuel_EF
```

#### Allocation for shared vehicle

```text
allocated_fuel = total_fuel × company_goods_mass_or_volume ÷ total_goods_mass_or_volume
```

#### Distance-based method

```text
E_cat4 = Σ_shipments (
    goods_mass_tonne × distance_km × transport_EF_kgCO2e_per_tonne_km
)
```

#### Spend-based method

```text
E_cat4 = Σ_transport_modes (transport_spend × transport_EEIO_EF)
```

#### Storage distribution

Site-specific:

```text
E_storage = fuel_E × EF_fuel
          + electricity_E × EF_electricity
          + refrigerant_leakage × GWP
E_allocated = E_storage × company_goods_volume ÷ total_goods_volume
```

Average-data:

```text
E_storage = stored_volume × average_storage_days × EF_kgCO2e_per_volume_day
```

### 9.6 Kategori 5 — Waste generated in operations

Category 5 mencakup emisi dari treatment/disposal waste yang dihasilkan operasi reporting company dan dikelola pihak ketiga. Waste treatment di fasilitas yang dimiliki/dikendalikan reporting company harus dianalisis ke Scope 1/2 sesuai sumbernya.

#### Supplier-specific method

```text
E_cat5 = Σ_waste_providers allocated_provider_S1_S2
```

#### Waste-type-specific method

```text
E_cat5 = Σ_waste_streams (
    waste_mass_or_volume × treatment_specific_EF
)
```

#### Average-data method

```text
E_cat5 = Σ_treatment_methods (
    total_waste_mass × treatment_share × treatment_EF
)
```

Input: waste type, treatment method, mass/volume, provider, allocation, transportation inclusion, treatment EF, dan evidence. Recycling benefits/avoided emissions harus disimpan sebagai additional metric, bukan dikurangkan dari inventory tanpa metodologi eksplisit.[7]

### 9.7 Kategori 6 — Business travel

#### Fuel-based method

```text
E_cat6 = Σ_fuel (fuel_quantity × fuel_EF)
```

#### Distance-based method

```text
E_cat6 = Σ_modes (distance_vehicle_or_passenger_km × mode_EF)
        + optional Σ_hotel (hotel_nights × hotel_EF)
```

#### Spend-based method

```text
E_cat6 = Σ_modes (travel_spend × travel_EEIO_EF)
```

Input wajib: mode, distance/passenger-km atau fuel/spend, country/region, class/vehicle type bila factor membutuhkannya, dan optional hotel nights.

### 9.8 Kategori 7 — Employee commuting

#### Distance-based method

```text
total_distance_mode = Σ_employees (
    one_way_distance_km × 2 × commuting_days_per_year
)
E_cat7 = Σ_modes (total_distance_mode × mode_EF)
```

#### Average-data method

```text
E_cat7 = Σ_modes (
    employee_count × mode_share × one_way_distance_km × 2
    × working_days_per_year × mode_EF
)
```

Optional telework incremental energy:

```text
E_telework = Σ_energy_sources (incremental_energy × EF_energy_source)
```

Tools harus mendukung carpool occupancy agar vehicle-km tidak disamakan dengan passenger-km.

### 9.9 Kategori 8 — Upstream leased assets

Category 8 berlaku untuk lessee ketika emisi leased asset tidak sudah termasuk Scope 1/2 karena consolidation approach.

#### Asset-specific method

```text
E_cat8_asset = Σ_fuel (fuel × EF)
              + Σ_energy (energy × EF)
              + Σ_refrigerant (leakage × GWP)
              + process_emissions
E_cat8 = Σ_leased_assets E_cat8_asset
```

#### Lessor-specific allocation

```text
E_cat8 = Σ_lessors (
    lessor_S1_S2 × leased_area_or_volume ÷ total_lessor_area_or_volume
)
```

#### Average-data building

```text
E_cat8 = Σ_buildings (floor_area_m2 × average_EF_kgCO2e_per_m2_year)
```

#### Other leased assets

```text
E_cat8 = Σ_asset_types (number_of_assets × average_EF_per_asset_year)
```

### 9.10 Kategori 9 — Downstream transportation and distribution

Category 9 mencakup transport/distribution produk yang dijual setelah point of sale dalam kendaraan/fasilitas yang tidak dimiliki atau dikendalikan reporting company. Jika transport dibayar oleh reporting company sebagai purchased service, map ke Category 4 sesuai decision rule.[6]

```text
E_cat9_distance = Σ_shipments (
    goods_mass_sold_tonne × distance_km × transport_mode_EF
)
```

Metode fuel-based, distance-based, spend-based, storage site-specific, dan average-data mengikuti struktur Category 4 dengan perubahan `direction = downstream` dan `point_of_sale`.

### 9.11 Kategori 10 — Processing of sold products

Category 10 mencakup processing sold intermediate products oleh third party sebelum menjadi produk final.

#### Site-specific method

```text
E_cat10 = Σ_fuel (fuel × life_cycle_fuel_EF)
         + Σ_electricity (electricity × electricity_EF)
         + Σ_refrigerant (leakage × GWP)
         + process_emissions
         + Σ_waste (waste_output × waste_EF)
```

#### Average-data method

```text
E_cat10 = Σ_intermediate_products (
    mass_sold × processing_EF_per_mass_final_or_intermediate
)
```

Allocation ke intermediate product harus disimpan sebagai rule dan basis, misalnya mass, economic value, energy, atau process-specific allocation.

### 9.12 Kategori 11 — Use of sold products

Category 11 menghitung **total expected lifetime emissions** dari produk yang terjual pada reporting year. Direct use-phase emissions wajib dihitung bila relevan; indirect use-phase emissions dapat dihitung ketika diperkirakan signifikan.

#### Direct energy use

```text
E_cat11_direct = Σ_products (
    units_sold × lifetime_uses
    × fuel_or_electricity_per_use
    × use_phase_EF
)
```

Untuk refrigerant:

```text
E_refrigerant = units_sold × lifetime_uses
              × refrigerant_leakage_per_use × refrigerant_GWP
```

#### Sold fuels/feedstocks

```text
E_cat11_fuel = Σ_fuels_sold (quantity_sold × combustion_EF)
```

Upstream emissions fuel tidak dimasukkan kembali ke formula ini jika sudah dicakup kategori lain.

#### Products containing/forming GHGs

```text
E_cat11_GHG_product = Σ_products Σ_gas (
    GHG_mass_per_product × units_sold
    × release_percentage_lifetime × GWP_gas
)
```

Jika release percentage tidak diketahui, metodologi guidance dapat menggunakan asumsi 100%; product harus menampilkan assumption flag dan uncertainty.

#### Indirect use-phase scenario

```text
E_cat11_indirect = Σ_products Σ_scenarios (
    units_sold × lifetime_uses × scenario_share
    × activity_per_use_scenario × scenario_EF
)
```

Scenario shares harus berjumlah 100% atau sistem menampilkan incomplete allocation.

### 9.13 Kategori 12 — End-of-life treatment of sold products

Category 12 menghitung expected end-of-life treatment dari produk dan packaging yang terjual pada reporting year.

```text
E_cat12 = Σ_products Σ_treatment_methods (
    mass_sold_product_and_packaging
    × treatment_share
    × treatment_EF
)
```

Input wajib: product mass, packaging mass, material type, end-of-life treatment share, geography, time horizon, waste treatment EF, dan source of consumer disposal assumption.

### 9.14 Kategori 13 — Downstream leased assets

Category 13 berlaku untuk lessor atas asset yang dimiliki dan leased kepada pihak lain, ketika emissions lessee tidak sudah termasuk Scope 1/2 reporting company.

Metode sama dengan Category 8 dari perspektif lessor:

```text
E_cat13_asset_specific = lessee_or_asset_S1_S2
E_cat13_allocated = lessee_total_S1_S2 × leased_asset_share
E_cat13_average = asset_count_or_area × average_asset_EF
```

Jika leased product diperlakukan sebagai sold product dan dihitung sebagai Category 11, jangan menghitung lagi sebagai Category 13.

### 9.15 Kategori 14 — Franchises

Category 14 berlaku untuk franchisor atas operasi franchise yang tidak termasuk Scope 1/2.

#### Franchise-specific

```text
E_cat14 = Σ_franchises (franchise_S1 + franchise_S2)
```

#### Non-submetered allocation

```text
franchise_energy = franchise_area ÷ building_total_area
                  × building_occupancy_factor
                  × building_total_energy
```

#### Sample extrapolation

```text
E_group = sampled_emissions × total_franchises_in_group
         ÷ sampled_franchises_in_group
E_cat14 = Σ_groups E_group
```

#### Average-data

```text
E_cat14 = Σ_building_types (floor_area × average_EF_per_m2_year)
```

### 9.16 Kategori 15 — Investments

Category 15 terutama relevan untuk investor dan financial services. GHG Protocol membagi investasi ke equity, debt with known use of proceeds, project finance, dan managed/client services; data boundary dan applicability harus dikonfigurasi untuk tipe organisasi.[8]

#### Equity/investment-specific

```text
E_cat15_equity = Σ_investments (
    investee_S1_S2 × investor_equity_share
)
```

Jika relevan, investee Scope 3 dapat disimpan sebagai optional extension dengan significance flag.

#### Average-data/EEIO

```text
estimated_investeе_S1_S2 = investee_revenue × sector_EEIO_EF
E_cat15_average = estimated_investeе_S1_S2 × investor_share
```

#### Debt/project finance allocation

```text
allocation_share = investor_financing ÷ total_project_cost
E_cat15_project = project_S1_S2 × allocation_share
```

Portfolio harus memiliki fixed measurement date atau representative average methodology. Tools harus menyimpan investment type, use of proceeds, ownership/share, investee year, revenue, sector, project cost, financing, and factor basis.

---

## 10. Scope 3 Method Registry

Engine tidak boleh menggunakan hardcoded `if category == 1` yang tersebar di banyak file. Gunakan registry seperti berikut:

| Method ID | Category | Method | Primary activity | Factor unit | Formula |
|---|---:|---|---|---|---|
| CAT1.SUPPLIER | 1 | Supplier-specific | quantity purchased | kgCO₂e/kg or unit | quantity × supplier EF |
| CAT1.AVERAGE | 1 | Average-data | mass/unit purchased | kgCO₂e/kg or unit | quantity × average EF |
| CAT1.SPEND | 1 | Spend-based | spend | kgCO₂e/currency | spend × EEIO EF |
| CAT3.UPSTREAM_FUEL | 3 | Average/supplier | fuel consumed | kgCO₂e/unit | fuel × upstream EF |
| CAT4.DISTANCE | 4 | Distance-based | tonne-km | kgCO₂e/t-km | mass × distance × EF |
| CAT5.WASTE_TYPE | 5 | Waste-type-specific | waste mass | kgCO₂e/t | mass × treatment EF |
| CAT6.TRAVEL_DISTANCE | 6 | Distance-based | passenger-km | kgCO₂e/p-km | p-km × EF |
| CAT7.COMMUTE_AVG | 7 | Average-data | employee/mode profile | kgCO₂e/p-km | employees × share × distance × days × EF |
| CAT8.LEASED_AREA | 8 | Average-data | floor area | kgCO₂e/m²-year | area × EF |
| CAT10.SITE | 10 | Site-specific | downstream energy/process | kgCO₂e/input | Σ activity × EF |
| CAT11.LIFETIME | 11 | Direct use | units/lifetime uses | kgCO₂e/use | units × uses × activity × EF |
| CAT12.EOL | 12 | Waste treatment | sold mass | kgCO₂e/kg | mass × treatment share × EF |
| CAT14.SAMPLE | 14 | Sample extrapolation | sampled franchises | kgCO₂e/franchise | sample × total/sample count |
| CAT15.EQUITY | 15 | Investment-specific | investee emissions | kgCO₂e | investee emissions × share |

Method registry fields minimal:

```text
method_id
standard_name
standard_version
category_id
scope
formula_expression
required_inputs
optional_inputs
allowed_factor_types
allocation_rule
boundary_rule
time_boundary_rule
quality_requirements
validation_rules
output_dimensions
```

---

## 11. Data Model

### 11.1 Core entities

| Entity | Field penting |
|---|---|
| Organization | id, legal_name, jurisdiction, industry, currency, timezone |
| Entity | id, organization_id, legal ownership, control status |
| Facility | id, entity_id, address, country, grid_region, coordinates |
| Asset | id, facility_id, asset_type, ownership, operational_control |
| ReportingPeriod | id, start, end, fiscal_year, base_year_flag, status |
| Boundary | id, period_id, approach, included_entities, excluded_sources, rationale |
| ActivityRecord | id, source_type, activity_type, raw_value, raw_unit, normalized_value, normalized_unit, period, facility, status |
| Evidence | id, file/link, source_type, uploaded_by, hash, date, confidentiality |
| EmissionFactor | id, name, factor_type, value, unit, gas_basis, geography, sector, source, version, effective_from, effective_to, status |
| GWPSet | id, standard, assessment_report, gas, GWP_value, unit, version |
| ConversionFactor | id, from_unit, to_unit, value, conditions, source, version |
| Methodology | id, standard, version, formula_registry, applicability |
| CalculationRun | id, inventory_id, snapshot_hash, engine_version, status, started_at, completed_at |
| CalculationLine | id, run_id, activity_id, factor_id, method_id, scope, category, input_json, result_kgco2e, warnings |
| AggregateResult | id, run_id, dimension_json, value_kgco2e, intensity_value |
| Target | id, scope/category, baseline_year, target_year, target_value, unit, boundary, methodology |
| ActionProject | id, action_type, expected_reduction, status, owner, M&V_method |
| ReviewTask | id, object_type, object_id, reviewer, decision, comment, timestamp |
| DisclosureMapping | id, framework, disclosure_id, source_metric, status, evidence |

### 11.2 ActivityRecord schema

```json
{
  "id": "ACT-0001",
  "organization_id": "ORG-001",
  "facility_id": "FAC-001",
  "period_start": "2025-01-01",
  "period_end": "2025-12-31",
  "scope": "1",
  "category": null,
  "activity_type": "stationary_combustion",
  "source_subtype": "natural_gas",
  "raw_value": "45000",
  "raw_unit": "m3",
  "normalized_value": "477000",
  "normalized_unit": "kWh",
  "data_status": "measured",
  "source_system": "utility_invoice",
  "evidence_ids": ["EVD-001"],
  "estimate_method": null,
  "notes": "Metered monthly and reconciled to invoice",
  "created_by": "USR-001",
  "approved_at": null
}
```

### 11.3 EmissionFactor schema

```json
{
  "id": "EF-001",
  "name": "Grid electricity factor - region X",
  "factor_type": "grid_generation",
  "basis": "location_based",
  "value": "0.82",
  "unit": "kgCO2e/kWh",
  "gas_basis": "direct_co2e",
  "includes_combustion": true,
  "includes_upstream": false,
  "includes_td_losses": false,
  "carbon_origin": "mixed",
  "geography": "ID-REGION-X",
  "sector": "electricity",
  "source_url": "https://example.gov/factor",
  "source_title": "Official source",
  "source_publication_year": 2025,
  "version": "2025.1",
  "effective_from": "2025-01-01",
  "effective_to": "2025-12-31",
  "status": "approved",
  "uncertainty_percent": null,
  "approved_by": "USR-FACTOR-1"
}
```

---

## 12. Data Quality, Uncertainty, and Estimation

### 12.1 Data status taxonomy

| Status | Arti | Penggunaan |
|---|---|---|
| **Measured** | Meter/transaction/invoice langsung | Preferred |
| **Supplier-reported** | Data dari supplier/partner | Preferred if documented |
| **Calculated** | Diturunkan dari data primer dan formula | Acceptable |
| **Estimated** | Estimasi dengan asumsi eksplisit | Screening/temporary |
| **Proxy** | Menggunakan driver pengganti | Warning |
| **Spend-based** | Estimasi dari nilai belanja dan EEIO factor | Screening/Scope 3 gap |
| **Missing** | Tidak tersedia | Exclusion/warning |
| **Verified** | Sudah melalui verification/assurance scope tertentu | Highest confidence |

### 12.2 Uncertainty model MVP

MVP mendukung qualitative uncertainty: `low`, `medium`, `high`, serta data quality score. V1 dapat mendukung quantitative uncertainty:

```text
variance_total ≈ Σ_i (sensitivity_i² × variance_input_i)
```

Untuk independent activity-factor uncertainty secara sederhana:

```text
relative_uncertainty_result ≈ sqrt(
    relative_uncertainty_activity²
  + relative_uncertainty_factor²
)
```

Metode tersebut hanya boleh dipakai bila asumsi independence dan distribution direkam. Jika tidak, tampilkan qualitative confidence.

### 12.3 Completeness

Sistem harus memeriksa:

```text
completeness = covered_expected_sources ÷ total_expected_sources
```

Expected sources ditentukan oleh facility profile, industry template, energy profile, materiality screening, dan user-configured exclusions. Completeness bukan klaim bahwa inventory 100% benar; hanya indikator coverage.

---

## 13. Workflow Produk

### 13.1 Annual inventory workflow

1. Admin membuat reporting period dan snapshot boundary.
2. Sustainability Manager memilih methodology version dan factor policy.
3. Sistem membuat data request berdasarkan facility, scope, category, dan owner.
4. Contributor mengirim activity data beserta evidence.
5. Sistem melakukan unit, duplicate, date, factor, dan outlier validation.
6. Reviewer memeriksa data dan meminta perbaikan jika perlu.
7. Engine menjalankan calculation run.
8. Sustainability Manager meninjau hotspot, missing data, exclusions, dan warnings.
9. Calculation run disetujui dan di-lock.
10. Sistem menghasilkan dashboard, inventory table, methodology note, dan evidence index.
11. Jika ada perubahan material, sistem membuat restatement run dan menyimpan relasi terhadap run lama.

### 13.2 Quick calculator workflow

Quick E-Calc boleh lebih sederhana, tetapi harus jelas statusnya sebagai screening bila input/factor/boundary tidak lengkap:

```text
Pilih objek → Pilih aktivitas → Masukkan nilai/unit
→ Pilih lokasi/metode → Factor suggestion
→ Hitung → Tampilkan result + assumptions + quality warning
```

Quick calculator tidak boleh menyebut hasilnya “verified inventory” atau “official Scope 3 report” tanpa workflow formal.

### 13.3 Review workflow

```text
Draft → Submitted → Validation failed / Needs revision
      → Reviewer approved → Calculated → Management review
      → Approved → Locked
```

Transitions harus dicatat dalam immutable audit log.

---

## 14. Dashboard dan Output

### 14.1 Executive dashboard

Menampilkan gross emissions, Scope 1, Scope 2 location-based, Scope 2 market-based, Scope 3 total, top hotspots, emissions intensity, trend vs base year, target gap, data completeness, dan high-risk warnings.

### 14.2 Operational dashboard

Menampilkan konsumsi energi per facility/meter, fuel, refrigerant, waste, transport, supplier, activity record status, missing evidence, outlier, dan action project.

### 14.3 Inventory report

Isi minimum:

- organizational boundary dan operational boundary;
- reporting period dan base year;
- methodology/standard version;
- Scope 1 by source and gas;
- Scope 2 location-based and market-based;
- Scope 3 by 15 categories;
- biogenic CO₂ memo item bila relevan;
- gross emissions;
- exclusions dan rationale;
- activity data and factor sources;
- estimates/proxies/spend-based share;
- uncertainty/data quality;
- restatement notes;
- evidence index; dan
- reviewer/approval status.

### 14.4 Intensity metrics

Engine mendukung:

```text
intensity = emissions_kgCO2e ÷ denominator
```

Denominator dapat berupa revenue, unit product, tonne product, MWh output, m², employee, passenger-km, atau service unit. Setiap intensity metric harus menyimpan denominator definition, period, boundary, currency basis, activity source, dan comparability note.

---

## 15. API Requirements

### 15.1 Core endpoints konseptual

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/organizations` | Membuat organisasi |
| POST | `/reporting-periods` | Membuat period |
| POST | `/boundaries` | Menyimpan boundary |
| POST | `/activity-records` | Membuat activity data |
| POST | `/activity-records/import` | Import CSV/XLSX |
| GET | `/emission-factors` | Mencari factor |
| POST | `/emission-factors` | Membuat factor draft |
| POST | `/calculation-runs` | Menjalankan calculation |
| GET | `/calculation-runs/{id}` | Melihat status/run result |
| GET | `/results` | Query aggregate/line results |
| POST | `/reviews` | Approve/reject/request change |
| POST | `/reports` | Generate report |
| GET | `/evidence/{id}` | Mengambil evidence metadata |
| POST | `/targets` | Membuat target |
| POST | `/actions` | Membuat action project |

### 15.2 Idempotency dan reproducibility

`POST /calculation-runs` harus menerima `idempotency_key`. Snapshot hash minimal mencakup activity record IDs/versions, factor IDs/versions, methodology version, boundary version, GWP set, conversion versions, and engine version.

---

## 16. Non-functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | MVP dapat menghitung minimal 100.000 activity lines per run dalam SLA yang ditetapkan tanpa kehilangan traceability |
| **Determinism** | Run dengan snapshot sama menghasilkan output sama |
| **Security** | RBAC, tenant isolation, encrypted storage, secure evidence access |
| **Auditability** | Create/update/delete/approve/lock/restatement tercatat |
| **Availability** | Sesuai SLA produk dan kebutuhan reporting calendar |
| **Scalability** | Factor library dan Scope 3 supplier lines dapat tumbuh tanpa perubahan schema besar |
| **Accessibility** | Form memiliki unit labels, validation message jelas, dan keyboard-friendly interaction |
| **Localization** | Bahasa, currency, timezone, decimal separator, dan jurisdiction configurable |
| **Data retention** | Retention policy untuk evidence, inventory, factor, dan audit log configurable |
| **Observability** | Calculation errors, factor mismatch, slow runs, failed imports, dan invalid transitions terukur |

---

## 17. Validation and Error Handling

### 17.1 Validation layers

| Layer | Contoh |
|---|---|
| Schema | Required field, type, enum |
| Unit | Unit valid dan compatible dengan factor |
| Temporal | Period berada dalam reporting period |
| Boundary | Facility/entity termasuk boundary |
| Factor | Factor approved, applicable, dan versioned |
| Formula | Required input lengkap |
| Double count | Sumber yang sama tidak dihitung dua kali |
| Quality | Evidence, source, estimate reason |
| Aggregate | Category total reconcile ke line total |
| Reporting | Output memiliki methodology note dan labels |

### 17.2 Severity

- **Error:** Tidak boleh dihitung/submit sampai diperbaiki.
- **Warning:** Dapat dihitung, tetapi ditampilkan pada review/report.
- **Info:** Catatan transparansi tanpa memblokir.

### 17.3 Double-counting rules

1. Purchased electricity generation tidak dimasukkan ke Scope 1.
2. Scope 2 generation tidak dimasukkan lagi ke Scope 3 Category 3; Category 3 hanya komponen non-Scopes 1/2 yang tepat.
3. Upstream transport yang sudah termasuk cradle-to-gate factor tidak dimasukkan kembali ke Category 4.
4. Transport service yang dibayar reporting company dan transport downstream yang tidak dibayar harus mengikuti point-of-sale/payment rule.
5. Category 1 dan Category 2 tidak boleh memuat capital good yang sama.
6. Waste treatment internal vs third party harus dibedakan.
7. Leased assets harus mengikuti consolidation approach.
8. Leased products tidak boleh dihitung sekaligus sebagai Category 11 dan Category 13 tanpa rationale.
9. Avoided emissions dan offsets tidak mengurangi gross inventory.
10. EEIO factor yang mencakup Scope 1/2/upstream harus memiliki boundary disclosure agar tidak terjadi overlap.

---

## 18. Acceptance Criteria

### 18.1 MVP acceptance

| ID | Kriteria |
|---|---|
| AC-001 | Pengguna dapat membuat organization, facility, reporting period, boundary, dan base year |
| AC-002 | Pengguna dapat memasukkan activity data dengan unit dan evidence |
| AC-003 | Sistem menyimpan raw value, normalized value, factor snapshot, formula ID, dan result line |
| AC-004 | Engine menghitung Scope 1 stationary/mobile/fugitive/process |
| AC-005 | Engine menghitung Scope 2 location-based dan market-based secara terpisah |
| AC-006 | Sistem menandai estimated/proxy/spend-based data |
| AC-007 | Sistem menolak factor-unit mismatch |
| AC-008 | Sistem mencegah factor yang retired/expired digunakan tanpa override yang disetujui |
| AC-009 | Sistem menghasilkan report yang menampilkan gross emissions, assumptions, exclusions, factor sources, dan warnings |
| AC-010 | Reviewer dapat approve/reject/request change; run approved dapat di-lock |
| AC-011 | Locked run dapat direproduksi dengan snapshot yang sama |
| AC-012 | Sistem dapat mengekspor line-level calculation dan evidence index |

### 18.2 Scope 3 acceptance

| ID | Kriteria |
|---|---|
| AC-S3-001 | Semua 15 kategori tersedia sebagai taxonomy |
| AC-S3-002 | Category 1 mendukung supplier-specific, hybrid, average-data, dan spend-based |
| AC-S3-003 | Category 3 memisahkan upstream fuel, upstream purchased energy, T&D loss, dan resale |
| AC-S3-004 | Category 4/9 mendukung fuel-based, distance-based, spend-based, dan allocation |
| AC-S3-005 | Category 5/12 mendukung treatment share dan treatment-specific factor |
| AC-S3-006 | Category 6/7 mendukung passenger-km dan hotel/telework optional inputs |
| AC-S3-007 | Category 8/13 mendukung asset-specific, lessor/lessee allocation, dan average-data |
| AC-S3-008 | Category 11 mendukung lifetime use, direct/indirect scenario, fuel/feedstock, dan product GHG release |
| AC-S3-009 | Category 14 mendukung sample extrapolation |
| AC-S3-010 | Category 15 mendukung investee-specific, ownership allocation, revenue × EEIO, dan project finance allocation |

---

## 19. Test Cases dengan Expected Result

### TC-001 — Scope 1 diesel

**Input:** 10.000 liter diesel; direct combustion EF 2,68 kg CO₂e/liter.  
**Formula:** `10.000 × 2,68`.  
**Expected:** 26.800 kg CO₂e atau 26,8 tCO₂e.  
**Checks:** Scope 1, stationary/mobile sesuai source, factor direct, evidence required.

### TC-002 — Scope 1 gas-specific

**Input:** 1.000 unit fuel; NCV 10 MJ/unit; EF CO₂ 56.000 kg/TJ; EF CH₄ 1 kg/TJ; EF N₂O 0,1 kg/TJ; GWP set configured.  
**Formula:** `Energy_TJ = 1.000 × 10 ÷ 1.000.000 = 0,01 TJ`; lalu gas-specific sum.  
**Expected:** Hasil gas-specific disimpan per gas dan total CO₂e dihitung dari GWP snapshot.

### TC-003 — Scope 1 refrigerant

**Input:** 5 kg refrigerant leaked; GWP 2.088 kg CO₂e/kg.  
**Expected:** 10.440 kg CO₂e, Scope 1 fugitive; engine menolak jika GWP missing.

### TC-004 — Scope 2 location-based

**Input:** 125.000 kWh electricity; location EF 0,82 kg CO₂e/kWh.  
**Expected:** 102.500 kg CO₂e = 102,5 tCO₂e.

### TC-005 — Scope 2 partial contractual instrument

**Input:** 100 MWh total; 60 MWh eligible instrument at 0,1 kg/MWh; remaining 40 MWh residual factor at 0,8 kg/MWh.  
**Expected:** `60×0,1 + 40×0,8 = 38 kg CO₂e`; report matched/unmatched volume separately. Zero factor tidak diterapkan ke 100 MWh.

### TC-006 — Scope 3 Category 1 average-data

**Input:** 20.000 kg material; cradle-to-gate EF 1,5 kg CO₂e/kg.  
**Expected:** 30.000 kg CO₂e, Category 1, method average-data.

### TC-007 — Scope 3 Category 3 upstream fuel

**Input:** 50.000 liter fuel; lifecycle EF 3,20; combustion EF 2,68 kg CO₂e/liter.  
**Expected:** upstream EF 0,52; Category 3 = 26.000 kg CO₂e; combustion 134.000 kg CO₂e tetap berada di Scope 1.

### TC-008 — Scope 3 Category 4 distance

**Input:** 100 tonne goods; 1.200 km; EF 0,08 kg CO₂e/tonne-km.  
**Expected:** 9.600 kg CO₂e.

### TC-009 — Scope 3 Category 5 waste

**Input:** 500 tonne waste; 70% landfill; EF landfill 300 kg CO₂e/tonne; 30% recycling; EF recycling 10.  
**Expected:** `500×0,7×300 + 500×0,3×10 = 106.500 kg CO₂e`.

### TC-010 — Scope 3 Category 7 commuting

**Input:** 100 employees; 40% car; one-way 15 km; 220 days; factor 0,18 kg/passenger-km; assume one person/car.  
**Expected:** `100×40%×15×2×220×0,18 = 23.760 kg CO₂e`.

### TC-011 — Scope 3 Category 11 lifetime use

**Input:** 1.000 products sold; 500 lifetime uses; 0,2 kWh/use; EF 0,8 kg/kWh.  
**Expected:** 80.000 kg CO₂e, Category 11; lifetime assumption displayed.

### TC-012 — Scope 3 Category 14 sampling

**Input:** 10 sampled franchises total emissions 100.000 kg; population 100 franchises.  
**Expected:** `100.000 × 100 ÷ 10 = 1.000.000 kg CO₂e`; sample group and representativeness warning recorded.

### TC-013 — Scope 3 Category 15 equity allocation

**Input:** Investee S1+S2 50.000 tCO₂e; ownership 20%.  
**Expected:** 10.000 tCO₂e; investment-specific method and ownership evidence stored.

### TC-014 — Reproducibility

**Action:** Lock run, rerun with same snapshot.  
**Expected:** Identical line and aggregate results, identical snapshot hash.

### TC-015 — Factor version change

**Action:** Supersede factor version 2025.1 with 2026.1 and rerun.  
**Expected:** Original locked run unchanged; new run references factor 2026.1; diff report identifies changed factor and output.

---

## 20. Implementation Roadmap

### Phase 0 — Methodology foundation

Finalisasi factor policy, unit registry, GWP policy, boundary model, Scope taxonomy, method registry, data-quality taxonomy, dan golden test cases.

### Phase 1 — MVP Scope 1/2

Bangun master data, activity intake, factor library, unit engine, Scope 1, Scope 2 location/market, evidence, review, lock, dashboard, dan export.

### Phase 2 — Scope 3 core

Bangun Category 1–8 dengan method registry, supplier portal, transport, waste, travel, commuting, leased asset, dan screening workflow.

### Phase 3 — Scope 3 downstream/finance

Bangun Category 9–15, product use/lifetime scenarios, end-of-life, franchises, investments, sampling, allocation, dan uncertainty metadata.

### Phase 4 — Management and reporting

Tambahkan target, reduction projects, energy baseline/EnPI, M&V, climate risk, framework mapping, report builder, dan assurance workspace.

### Phase 5 — Product footprint/LCA

Tambahkan product system boundary, functional unit, life-cycle stages, allocation, product carbon footprint, dan ISO 14067-aligned reporting.

---

## 21. Risiko Produk dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Factor salah wilayah/tahun | Hasil tidak representatif | Geography/year validation dan factor approval |
| User memasukkan lifecycle EF ke Scope 1 | Double count | Factor type constraints |
| Scope 3 data sangat minim | Hasil bias | Screening, quality score, method fallback, uncertainty |
| Standard berubah | Reporting inconsistency | Versioned methodology dan effective-date policy |
| Angka terlihat terlalu presisi | False confidence | Precision policy, estimate label, confidence score |
| Reconciliation energi gagal | Scope 1/2 mismatch | Meter hierarchy, invoice reconciliation, exception report |
| Offset mengurangi gross | Misleading net claim | Separate reduction/removal/offset ledger |
| Multi-framework mapping membingungkan | Disclosure error | Data core terpisah dari framework mapping |
| Supplier tidak responsif | Scope 3 incompleteness | Supplier portal, spend-based screening, extrapolation disclosure |
| Assurance menemukan missing evidence | Delay laporan | Evidence-by-default dan PBC workspace |

---

## 22. Definition of Done Produk

Produk dan modul calculation engine dianggap selesai apabila pengguna dapat:

1. menetapkan boundary, period, base year, dan methodology version;
2. memasukkan atau mengimpor activity data dengan unit dan bukti;
3. memilih factor yang sesuai dan melihat sumber serta versi;
4. menjalankan formula dengan hasil line-level dan aggregate;
5. membedakan Scope 1, Scope 2 location/market, dan Scope 3 category;
6. melihat warnings, assumptions, data quality, dan exclusions;
7. menyetujui serta mengunci run;
8. mereproduksi run yang sama;
9. membandingkan perubahan factor/method/data;
10. mengekspor inventory, calculation trace, dan evidence pack; serta
11. memisahkan gross emissions dari reductions, removals, offsets, dan net presentation.

---

## 23. Referensi Metodologis

[1]: [GHG Protocol — Corporate Standard](https://ghgprotocol.org/corporate-standard)  
[2]: [ISO — ISO 14064-1:2018 Greenhouse Gas Quantification and Reporting](https://www.iso.org/standard/66453.html)  
[3]: [GHG Protocol — Scope 2 Guidance](https://ghgprotocol.org/scope-2-guidance)  
[4]: [GHG Protocol — Scope 3 Calculation Guidance](https://ghgprotocol.org/scope-3-calculation-guidance-2)  
[5]: [GHG Protocol — Scope 3 Category 2 Capital Goods Guidance](https://ghgprotocol.org/sites/default/files/2022-12/Chapter2.pdf)  
[6]: [GHG Protocol — Scope 3 Category 4 and Category 9 Guidance](https://ghgprotocol.org/sites/default/files/2022-12/Chapter4.pdf)  
[7]: [GHG Protocol — Scope 3 Category 5 Waste Guidance](https://ghgprotocol.org/sites/default/files/2022-12/Ch5_GHGP_Tech.pdf)  
[8]: [GHG Protocol — Scope 3 Category 15 Investments Guidance](https://ghgprotocol.org/sites/default/files/2022-12/Chapter15.pdf)  
[9]: [GHG Protocol — Scope 3 Calculation Formula Summary Tables](https://ghgprotocol.org/sites/default/files/2022-12/AppendixD.pdf)  
[10]: [IPCC — 2006 Guidelines for National Greenhouse Gas Inventories](https://www.ipcc-nggip.iges.or.jp/public/2006gl/)  
[11]: [ISO — ISO 50001 Energy Management](https://www.iso.org/iso-50001-energy-management.html)  
[12]: [IFRS Foundation — ISSB and IFRS Sustainability Disclosure Standards](https://www.ifrs.org/sustainability/knowledge-hub/introduction-to-issb-and-ifrs-sustainability-disclosure-standards/)  
[13]: [Global Reporting Initiative — GRI Standards](https://www.globalreporting.org/standards/)  
[14]: [Science Based Targets initiative — Corporate Net-Zero Standard](https://sciencebasedtargets.org/corporate-net-zero)  
[15]: [Otoritas Jasa Keuangan — POJK Nomor 51/POJK.03/2017](https://ojk.go.id/id/kanal/perbankan/regulasi/peraturan-ojk/Pages/POJK-Penerapan-Keuangan-Berkelanjutan-bagi-Lembaga-Jasa-Keuangan,-Emiten,-dan-Perusahaan-Publik.aspx)


---

# Appendix A — Extended Environmental Sustainability Modules

Bagian ini memperluas PRD inti agar platform tidak hanya menghitung carbon footprint, tetapi juga mendukung ekosistem environmental sustainability yang lebih luas.

## A.1 Carbon pricing and carbon market module

Modul ini harus memisahkan **compliance allowance**, **carbon credit**, **offset**, **removal**, **REC/EAC**, dan **internal carbon price**. Data model minimum:

```text
instrument_id
instrument_type
market_type
registry
project_id
methodology_id
serial_start
serial_end
vintage
quantity
unit
price
currency
seller
buyer
transaction_type
transaction_date
settlement_date
surrender_status
retirement_status
authorization_status
corresponding_adjustment_status
claim_boundary
claim_period
evidence_ids
```

Acceptance criteria:

| ID | Kriteria |
|---|---|
| EXT-CM-001 | Sistem dapat membedakan allowance dan credit |
| EXT-CM-002 | Sistem dapat mencatat holding, transfer, surrender, cancellation, dan retirement |
| EXT-CM-003 | Sistem tidak mengurangi gross Scope 1–3 otomatis karena credit/offset |
| EXT-CM-004 | Sistem mencatat registry, serial number, vintage, methodology, dan ownership |
| EXT-CM-005 | Sistem memberi warning jika credit eligibility atau claim status tidak lengkap |
| EXT-CM-006 | Sistem mendukung konfigurasi Indonesia, Article 6, compliance, dan voluntary market melalui adapter |

## A.2 Carbon trading and compliance ledger

Formula saldo unit:

```text
closing_balance = opening_balance
                + allocated_units
                + purchased_units
                + received_transfers
                - sold_units
                - surrendered_units
                - retired_units
                - cancelled_units
```

Formula exposure:

```text
compliance_gap = verified_compliance_emissions
               - eligible_units_available
```

Nilai transaksi:

```text
transaction_value = traded_quantity × price_per_unit + fee + tax
```

`eligible_units_available` tidak boleh disamakan dengan seluruh credit yang dimiliki. Eligibility, jurisdiction, vintage, authorization, registry, dan surrender/retirement status harus diperiksa.

## A.3 Carbon credit quality and project registry

Project registry mendukung baseline, project emissions, leakage, additionality, permanence, monitoring, validation, verification, issuance, buffer/reserve, transfer, retirement, safeguard, dan benefit sharing.

Formula konseptual:

```text
gross_mitigation = baseline_emissions − project_emissions − leakage
creditable_mitigation = gross_mitigation
                      − uncertainty_deduction
                      − buffer_deduction
                      − methodology_specific_deductions
```

Formula di atas bukan formula universal penerbitan credit. Setiap project wajib memiliki methodology-specific formula, monitoring period, evidence, validation, verification, dan registry record.

## A.4 Claims and greenwashing control

Claim record minimum:

```text
claim_id
claim_type
claim_text
claim_boundary
claim_period
inventory_run_id
reduction_ids
removal_ids
credit_retirement_ids
supporting_evidence
review_status
approved_by
public_disclosure_location
```

Sistem harus menolak atau memberi hard warning untuk klaim “net zero”, “carbon neutral”, atau “zero emission” apabila hanya tersedia data credit tanpa gross inventory, direct reduction pathway, claim boundary, dan retirement evidence.

## A.5 Climate risk and adaptation

Risk record mendukung hazard, exposure, vulnerability, impact, likelihood, financial consequence, scenario, adaptation action, residual risk, owner, deadline, dan evidence.

```text
conceptual_risk_score = hazard_score × exposure_score × vulnerability_score
residual_risk = initial_risk − risk_reduction_from_actions
```

Karena skoring bersifat metodologi-dependent, nilai dan bobot harus configurable dan tidak diperlakukan sebagai pengukuran ilmiah universal.

## A.6 Nature and biodiversity

Modul nature mengikuti alur `locate → identify dependencies/impacts → assess risks/opportunities → prioritize → act → monitor → disclose`. Data minimum mencakup facility/site coordinates, ecosystem, protected/priority area, land-use change, water dependency, pollution, species, restoration, conservation, supply-chain location, community safeguards, dan nature-related target.

Mapping disclosure mengikuti empat pilar TNFD: governance, strategy, risk and impact management, serta metrics and targets.[7]

## A.7 Water stewardship

Formula water balance:

```text
water_consumption = total_withdrawal − total_discharge
```

Formula intensity:

```text
water_intensity = water_consumption ÷ production_or_service_output
```

Data wajib membedakan source, basin, quality, withdrawal, discharge, consumption, reuse, recycled water, water stress, permit, dan community dependency.

## A.8 Pollution and chemicals

Modul pollution menyimpan pollutant, source, quantity, concentration, medium, permit limit, monitoring result, exceedance, incident, corrective action, dan remediation. Jenis utama mencakup air emissions, wastewater pollutants, soil contamination, hazardous chemicals, hazardous waste, plastics, spills, dan accidental release.

## A.9 Circular economy

KPI awal:

```text
recycled_content_rate = recycled_input_mass ÷ total_input_mass
reuse_rate = reused_units ÷ total_units
recovery_rate = recovered_mass ÷ total_waste_mass
material_circularity = circular_input_and_recovered_output ÷ total_material_flow
```

Setiap KPI wajib menyimpan material boundary, denominator, quality grade, methodology, source, period, dan evidence. Circularity benefit tidak boleh secara otomatis diklaim sebagai carbon reduction tanpa carbon accounting yang sesuai.

## A.10 Transition finance and green finance

Modul finance menyimpan taxonomy activity, eligibility, technical screening criteria, do-no-significant-harm, safeguards, use of proceeds, KPI, sustainability performance target, baseline, target year, capex/opex, transition action, and verification.

Output finance harus memisahkan financial amount dari environmental impact. Contohnya, nilai green bond bukan otomatis sama dengan emissions avoided. Impact calculation dan financial allocation harus mempunyai metodologi terpisah.

## A.11 Extended roadmap

| Release | Modul tambahan |
|---|---|
| **P1** | Carbon pricing, allowance/credit ledger, claims control, registry adapter |
| **P2** | Climate risk, adaptation, water, pollution, waste, circularity |
| **P3** | Nature/TNFD, biodiversity, sustainable procurement, transition finance |
| **P4** | LCA/PCF, product circularity, scenario modelling, ecosystem accounting |

## A.12 Extended reference set

[7]: [TNFD — Disclosure Recommendations](https://tnfd.global/recommendations/)  
[8]: [Convention on Biological Diversity — Kunming-Montreal Global Biodiversity Framework](https://www.cbd.int/gbf)  
[9]: [UN-Water](https://www.unwater.org/)  
[10]: [UNEP — Chemicals and Pollution Action](https://www.unep.org/topics/chemicals-and-pollution-action)  
[11]: [Ellen MacArthur Foundation — Circular Economy Introduction](https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview)  
[12]: [OECD — Guidance on Transition Finance](https://www.oecd.org/en/publications/oecd-guidance-on-transition-finance_7c68a1ee-en.html)  
[13]: [UNFCCC — About Carbon Pricing](https://unfccc.int/about-us/regional-collaboration-centres/the-ciaca/about-carbon-pricing)  
[14]: [Integrity Council for the Voluntary Carbon Market — Core Carbon Principles](https://icvcm.org/core-carbon-principles/)  
[15]: [IDXCarbon — Indonesia Carbon Exchange](https://idxcarbon.co.id/)  
[16]: [OJK — POJK Nomor 10 Tahun 2026](https://ojk.go.id/id/regulasi/Pages/POJK-10-Tahun-2026-Perubahan-Atas-POJK-14-Tahun-2023-tentang-Perdagangan-Karbon-Melalui-Bursa-Karbon.aspx)
