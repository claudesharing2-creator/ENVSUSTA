# Materi Tambahan Environmental Sustainability
# Carbon Trading dan Modul Lanjutan

**Dokumen:** ENV-SUST-ADD-001  
**Versi:** 1.0  
**Tanggal:** 24 Agustus 2026  
**Kegunaan:** Bahan pengayaan domain dan referensi untuk pengembangan tools sustainability, carbon footprint, E-Calc, ESG, dan climate management.

> **Posisi materi.** Carbon footprint menjawab pertanyaan “berapa emisi yang dihasilkan?”, sedangkan carbon trading dan climate management menjawab “bagaimana emisi dikendalikan, diberi harga, dibiayai, diperdagangkan, dan dikomunikasikan?”. Keduanya berhubungan, tetapi tidak boleh dicampur menjadi satu angka tanpa label metodologi.

---

## 1. Arsitektur Besar Environmental Sustainability

Environmental sustainability profesional dapat dikelompokkan ke dalam lima lapisan.

| Lapisan | Pertanyaan utama | Modul |
|---|---|---|
| **Measure** | Berapa dampak dan emisinya? | GHG inventory, carbon footprint, energy, water, waste, biodiversity metrics |
| **Manage** | Bagaimana dampak dikurangi? | Energy management, decarbonization, pollution control, circularity, conservation |
| **Finance** | Bagaimana tindakan dibiayai dan diberi insentif? | Carbon tax, ETS, carbon credits, green bonds, transition finance, internal carbon price |
| **Disclose** | Bagaimana kinerja dan risiko dilaporkan? | ESG, GRI, ISSB/IFRS S1-S2, TNFD, CDP, assurance |
| **Transform** | Bagaimana bisnis beralih menuju resilient, low-carbon, nature-positive model? | Net zero, adaptation, just transition, sustainable supply chain, nature strategy |

Tools yang baik perlu membedakan **measurement ledger**, **management/action ledger**, **market instrument ledger**, dan **disclosure ledger**. Satu activity record dapat memengaruhi lebih dari satu modul, tetapi setiap output tetap memiliki definisi dan boundary sendiri.

---

## 2. Carbon Pricing

**Carbon pricing** adalah pemberian harga atau sinyal ekonomi terhadap emisi GRK. Tujuannya adalah membuat aktivitas beremisi tinggi menghadapi biaya atau insentif yang lebih jelas sehingga keputusan konsumsi dan investasi bergeser ke pilihan rendah emisi.[1]

### 2.1 Jenis carbon pricing

| Instrumen | Cara kerja | Siapa yang biasanya mengatur | Output yang dikelola tools |
|---|---|---|---|
| **Carbon tax** | Tarif per tCO₂e atau per unit bahan bakar/emisi | Pemerintah | Taxable emissions, rate, liability, payment status |
| **Emission Trading System (ETS)** | Cap total emisi dan unit allowance yang dapat diperdagangkan | Pemerintah/regulator | Cap, allocation, verified emissions, allowance balance |
| **Baseline-and-credit** | Proyek menghasilkan credit bila menurunkan emisi dibanding baseline | Regulator/program standard | Baseline, project emissions, credits issued |
| **Voluntary carbon market** | Organisasi membeli/retire credit untuk tujuan sukarela | Registry/standard/market participants | Credit metadata, transaction, retirement, claim |
| **Internal carbon price** | Harga internal untuk menilai proyek, risiko, atau keputusan investasi | Perusahaan | Shadow price, implicit price, project NPV, carbon cost |
| **Carbon border/embedded-emission mechanism** | Harga atau kewajiban terkait embedded emissions dalam perdagangan lintas batas | Pemerintah/blok ekonomi | Product emissions, import/export, declared emissions |

UNFCCC membedakan ETS atau cap-and-trade dari carbon tax: ETS memberikan fleksibilitas melalui pembelian/penjualan emission units dengan cap tertentu, sedangkan carbon tax memberikan kepastian harga tetapi tidak secara langsung menjamin jumlah penurunan emisi.[1]

### 2.2 Allowance, carbon credit, dan offset

| Istilah | Makna praktis |
|---|---|
| **Allowance/emission unit** | Hak atau kuota untuk emisi dalam sistem compliance; biasanya terkait cap dan periode tertentu |
| **Carbon credit** | Unit hasil pengurangan atau removal yang dikreditkan dari suatu aktivitas/proyek berdasarkan metodologi tertentu |
| **Offset** | Penggunaan credit yang telah dibeli dan di-retire untuk mendukung klaim atau tujuan tertentu; bukan pengurangan langsung dari inventory perusahaan |
| **Removal** | Penghilangan CO₂ dari atmosfer dan penyimpanan dalam reservoir dengan risiko reversal yang dikelola |
| **REC/EAC** | Environmental attribute certificate untuk energi listrik; tidak identik dengan carbon credit dan tidak boleh diperlakukan sebagai offset otomatis |

Satu unit kredit umumnya merepresentasikan satu unit pengurangan/removal yang dinyatakan dalam tCO₂e, tetapi nilai legal, eligibility, claimability, dan penggunaannya selalu bergantung pada program, registry, regulasi, dan metodologi yang berlaku.

### 2.3 Compliance market dan voluntary market

**Compliance carbon market** digunakan untuk memenuhi kewajiban yang ditetapkan regulator. **Voluntary carbon market** digunakan organisasi atau individu berdasarkan komitmen sukarela. Credit dari voluntary market tidak otomatis dapat digunakan untuk memenuhi kewajiban compliance, NDC, atau klaim net-zero. Tools harus mempunyai field `market_type`, `eligibility`, `authorization_status`, `claim_status`, dan `retirement_status`.

---

## 3. Carbon Trading dan Carbon Credit Lifecycle

### 3.1 Siklus unit allowance

```text
Regulatory cap
→ Allocation/auction
→ Monitoring emissions
→ Verification
→ Trading
→ Surrender/cancellation
→ Compliance reconciliation
```

### 3.2 Siklus carbon credit proyek

```text
Project design
→ Methodology and baseline
→ Additionality assessment
→ Stakeholder/safeguard review
→ Validation
→ Monitoring
→ Verification
→ Issuance in registry
→ Transfer/sale
→ Retirement or cancellation
→ Claim/reporting
```

### 3.3 Konsep integritas credit

ICVCM menetapkan sepuluh Core Carbon Principles untuk menilai kredit karbon berintegritas tinggi. Prinsip tersebut mencakup effective governance, tracking, transparency, independent validation and verification, additionality, permanence, robust quantification, no double-counting, sustainable development benefits and safeguards, serta contribution toward net-zero transition.[2]

| Konsep | Pertanyaan yang harus dijawab tools |
|---|---|
| **Additionality** | Apakah pengurangan/removal tidak akan terjadi tanpa insentif credit? |
| **Baseline** | Bagaimana skenario emisi tanpa proyek ditentukan dan dibuktikan? |
| **Leakage** | Apakah emisi berpindah ke lokasi/aktivitas lain di luar boundary proyek? |
| **Permanence** | Apakah removal dapat berbalik, misalnya akibat kebakaran atau perubahan penggunaan lahan? |
| **Quantification** | Apakah activity data, factor, uncertainty, dan metode memadai? |
| **Validation** | Apakah desain proyek diperiksa sebelum implementasi? |
| **Verification** | Apakah hasil monitoring diverifikasi oleh pihak independen? |
| **Double issuance** | Apakah unit yang sama diterbitkan lebih dari satu kali? |
| **Double claiming** | Apakah reduction yang sama diklaim oleh dua pihak? |
| **Double use** | Apakah credit yang sama digunakan dua kali atau di-retire dua kali? |
| **Safeguards** | Apakah hak masyarakat, Indigenous Peoples, biodiversity, dan lingkungan dilindungi? |

### 3.4 Formula konseptual crediting

Tidak ada satu formula universal untuk semua proyek kredit karbon. Formula wajib mengikuti metodologi proyek yang disetujui. Namun, struktur konseptualnya dapat dimodelkan sebagai:

```text
Gross mitigation = Baseline emissions − Project emissions − Leakage
Net creditable mitigation = Gross mitigation − Uncertainty deduction − Buffer/reserve deduction − Other methodology deductions
```

Semua komponen harus mempunyai `methodology_id`, `version`, `monitoring_period`, `boundary`, dan `verification_status`. Engine tidak boleh menerbitkan credit hanya dari kalkulasi corporate footprint tanpa project methodology, baseline, monitoring, validation, dan verification.

### 3.5 Trading ledger

Formula operasional yang dapat digunakan untuk compliance account:

```text
closing_allowance_balance
= opening_balance
+ allocated_allowances
+ purchased_allowances
− sold_allowances
− surrendered_allowances
− cancelled_allowances
```

Compliance gap secara konseptual:

```text
compliance_gap = verified_compliance_emissions − eligible_allowances_available
```

Jika `compliance_gap > 0`, organisasi memiliki shortfall. Jika `compliance_gap < 0`, organisasi memiliki surplus, subject to applicable rules. Credit dan allowance tidak boleh dipertukarkan secara otomatis karena eligibility berbeda.

Nilai transaksi:

```text
transaction_value = quantity_units × price_per_unit
```

Tools harus menyimpan currency, price basis, fee, tax, settlement date, counterparty, registry, serial range, ownership, dan retirement/surrender evidence.

---

## 4. Article 6 dan Paris Agreement Cooperation

Article 6 menyediakan kerangka kerja kerja sama antarnegara dalam implementasi NDC. Modul utama yang perlu dipahami adalah:

| Mekanisme | Fokus |
|---|---|
| **Article 6.2** | Cooperative approaches dan transfer hasil mitigasi antarnegara; memerlukan accounting dan authorization yang sesuai |
| **Article 6.4** | Mekanisme kredit karbon di bawah otoritas Paris Agreement |
| **Article 6.8** | Non-market approaches, misalnya kerja sama kebijakan, teknologi, capacity building, dan finance tanpa transfer unit sebagai market credit |

Risiko utama Article 6 adalah **double counting**. Sistem tools harus menyimpan status authorization, corresponding adjustment requirement, first transfer, host country, acquiring country, NDC use, registry serial number, dan corresponding adjustment evidence.

> **Pemisahan penting:** corporate inventory, project credit, NDC accounting, dan offset claim adalah empat accounting contexts yang berbeda. Aplikasi tidak boleh menyamakan “perusahaan memiliki credit” dengan “emisi perusahaan telah berkurang”.

---

## 5. Konteks Indonesia

Untuk konteks Indonesia, modul carbon market harus version-aware dan tidak meng-hardcode struktur registri atau istilah regulasi. IDXCarbon menjelaskan allowance market untuk **Kuota Emisi GRK** dan offset market untuk **SPE-GRK**. IDXCarbon juga mencantumkan mekanisme auction, regular trading, negotiated trading, dan marketplace.[3]

Perubahan terbaru yang perlu diperhatikan adalah **POJK Nomor 10 Tahun 2026**, yang berlaku 7 Juni 2026 dan mengubah POJK 14 Tahun 2023. Abstrak OJK menyatakan bahwa unit karbon yang diperdagangkan melalui bursa karbon wajib tercatat pada **Sistem Registri Unit Karbon atau SRUK**, yang menggantikan SRN PPI, serta mengatur perubahan lingkup unit karbon dan masa transisi tertentu.[4]

Implikasi desain:

| Kebutuhan | Implementasi |
|---|---|
| Regulatory version | Simpan `jurisdiction`, `regulation_id`, `effective_from`, `effective_to` |
| Registry | Registry adapter untuk SRUK/SRN-PPI atau sistem terkait, bukan hardcoded satu registry |
| Unit types | PTBAE-PU, SPE-GRK, dan unit lain sebagai master data ber-status |
| Compliance | `surrender` berbeda dari `retirement` |
| VCM claim | Retirement evidence dan claim wording terpisah |
| Trading | Auction, continuous/regular, negotiated, marketplace sebagai transaction type |
| Reconciliation | Unit serial, ownership, transfer, retirement, cancellation, and registry status |

Karena regulasi dapat berubah, produk harus menampilkan disclaimer bahwa regulatory eligibility dan claim harus dikonfirmasi berdasarkan aturan yang berlaku pada tanggal transaksi/pelaporan.

---

## 6. Carbon Claims dan Anti-Greenwashing

Tools harus membedakan jenis klaim berikut:

| Klaim | Data minimum yang dibutuhkan |
|---|---|
| **Emission reduction** | Baseline/reference, project activity, measured result, boundary, period |
| **Carbon neutral** | Gross inventory, eligible reductions, credits retired, claim period, claim boundary |
| **Net zero** | Near-term and long-term target, gross reduction pathway, residual emissions, removals, governance |
| **Climate contribution** | Contribution amount/activity without claiming own emissions are neutralized |
| **Avoided emissions** | Counterfactual baseline and project scenario; reported separately from inventory |
| **Renewable electricity claim** | Consumption, certificate/contract, geography, vintage, matching, retirement |
| **Nature-positive claim** | Baseline nature condition, impact metric, location, additionality, safeguards, monitoring |

Aplikasi harus mencegah pengguna menghasilkan label “net zero”, “carbon neutral”, atau “zero emission” hanya karena memasukkan offset atau membeli renewable certificate. Gross inventory dan direct reductions harus selalu ditampilkan sebagai angka utama.

---

## 7. Climate Mitigation, Net Zero, dan Transition Planning

**Mitigation** mengurangi sumber emisi atau meningkatkan removal. **Adaptation** mengurangi kerentanan dan meningkatkan kemampuan merespons dampak iklim. **Transition planning** menghubungkan target, governance, strategi bisnis, capex, opex, technology pathway, workforce, finance, dan disclosure.

OECD menekankan bahwa transition finance berfokus pada proses menjadi lebih berkelanjutan, termasuk kebutuhan akan target interim, KPI, governance, transparency, verification, safeguards, dan pengendalian risiko greenwashing.[5]

### 7.1 Mitigation hierarchy

```text
Avoid → Reduce → Replace → Substitute → Remove residual emissions → Claim carefully
```

### 7.2 Transition plan fields

```text
baseline_year
near_term_target
long_term_target
scope_boundary
target_methodology
capex_alignment
opex_alignment
technology_actions
energy_actions
supplier_actions
workforce_impact
just_transition_actions
residual_emissions_strategy
removal_strategy
finance_plan
interim_milestones
assurance_status
```

### 7.3 Internal carbon price

Formula evaluasi sederhana:

```text
annual_internal_carbon_cost = forecast_emissions × internal_carbon_price
```

Untuk perbandingan proyek:

```text
carbon_adjusted_project_cost
= financial_cost + forecast_emissions × internal_carbon_price
```

Internal price dapat berupa shadow price, implicit price, or compliance exposure price. Ia bukan otomatis sama dengan market price dan harus memiliki scenario/version.

---

## 8. Climate Adaptation dan Resilience

IPCC menilai bahwa perubahan iklim telah menimbulkan gangguan luas pada alam dan kehidupan manusia, serta meningkatkan risiko dari panas ekstrem, badai, kekeringan, banjir, dan kenaikan muka laut.[6]

Materi profesional meliputi hazard, exposure, vulnerability, sensitivity, adaptive capacity, adaptation option, residual risk, dan monitoring.

```text
Climate risk = Hazard × Exposure × Vulnerability
```

Formula ini adalah conceptual risk model, bukan formula universal untuk semua penilaian risiko. Engine harus mendukung scoring matrix dan scenario-based assessment.

| Komponen | Contoh data |
|---|---|
| **Hazard** | Flood, drought, heatwave, storm, wildfire, sea-level rise |
| **Exposure** | Facility location, asset value, workforce, supplier, route |
| **Vulnerability** | Building quality, water dependency, backup capacity, health sensitivity |
| **Impact** | Downtime, damage, cost, production loss, safety, ecosystem impact |
| **Adaptation action** | Drainage, cooling, water storage, diversification, early warning |
| **Residual risk** | Risk after action |

Output tool: risk register, site heatmap, scenario comparison, adaptation action plan, cost-benefit, responsible owner, deadline, status, and evidence.

---

## 9. Nature, Biodiversity, dan Nature-Related Risk

TNFD menyediakan kerangka disclosure nature-related issues dengan empat pilar: **governance, strategy, risk and impact management, serta metrics and targets**.[7] Kerangka ini mencakup dependencies, impacts, risks, opportunities, lokasi prioritas, value chain, time horizon, dan engagement dengan Indigenous Peoples serta local communities.

Kunming-Montreal Global Biodiversity Framework memiliki empat goals untuk 2050 dan 23 targets untuk 2030. Targetnya mencakup spatial planning, restoration, conservation, species, invasive species, pollution, climate-biodiversity resilience, sustainable agriculture/fisheries/forestry, urban green space, business disclosure, consumption, finance, dan participation.[8]

### 9.1 Nature assessment workflow

```text
Locate → Identify dependencies and impacts → Assess risks/opportunities
→ Prioritize locations → Set targets → Act → Monitor → Disclose
```

### 9.2 Nature data domains

| Domain | Contoh KPI |
|---|---|
| Land | Hectare converted, restored, protected, land-use change |
| Ecosystem condition | Habitat quality, ecological integrity, connectivity |
| Species | Threatened species, abundance, extinction risk |
| Water | Basin stress, withdrawal, discharge, pollution load |
| Soil | Erosion, organic matter, contamination |
| Pollution | Nutrients, pesticides, chemicals, plastics |
| Supply chain | Deforestation-free volume, traceability, certified sourcing |
| Safeguards | FPIC, grievance, community benefit, rights impact |

Nature metrics harus bersifat location-specific. Satu angka global tanpa lokasi biasanya tidak cukup untuk menilai nature-related risk.

---

## 10. Water Stewardship dan Water Footprint

Water stewardship menggabungkan efisiensi internal dengan konteks watershed, kualitas air, akses masyarakat, dan dampak terhadap ekosistem. UN-Water menempatkan SDG 6 pada ketersediaan dan pengelolaan air serta sanitasi yang berkelanjutan untuk semua.[9]

### 10.1 Water balance

```text
water_balance = total_withdrawal − total_discharge − consumption
```

Definitions must be explicit:

- **Withdrawal:** air yang diambil dari sumber.
- **Discharge:** air yang dikembalikan ke sumber atau sistem pengolahan.
- **Consumption:** withdrawal yang tidak dikembalikan ke watershed yang sama dalam periode tersebut.
- **Reused/recycled water:** air yang digunakan kembali sebelum withdrawal baru.

### 10.2 Water module fields

```text
source_type
watershed
withdrawal_volume
source_quality
discharge_volume
discharge_quality
consumption_volume
reuse_volume
water_stress_factor
facility
period
permit
community_dependency
evidence
```

### 10.3 Water risk

Tools perlu memisahkan volume dari risk score. Volume rendah di basin yang sangat water-stressed dapat lebih material daripada volume tinggi di basin yang abundant. Output sebaiknya mencakup water intensity, withdrawal by source, discharge pollutant load, stress-adjusted exposure, and action progress.

---

## 11. Pollution, Chemicals, dan Waste

UNEP mengelompokkan pengelolaan chemicals dan pollution sebagai isu yang berdampak terhadap kesehatan manusia dan lingkungan, termasuk polusi udara, tanah, air, chemicals, dan waste.[10]

Materi yang perlu dimasukkan:

| Area | Materi |
|---|---|
| Air pollution | NOx, SOx, PM, VOC, dust, monitoring and control |
| Water pollution | BOD, COD, nutrients, metals, temperature, discharge permits |
| Soil pollution | Spill, contamination, remediation, land liability |
| Chemicals | Inventory, classification, SDS, storage, substitution, exposure |
| Hazardous waste | Manifest, storage, transport, treatment, final disposal |
| Plastic pollution | Polymer, packaging, leakage, recycled content, reuse, collection |
| Accidental release | Incident, severity, affected area, response, root cause |

### 11.1 Waste hierarchy

```text
Prevention → Reduction → Reuse → Repair/Refurbish → Recycling
→ Recovery → Treatment → Disposal
```

Carbon impact dari waste harus tetap direkonsiliasi dengan GHG inventory agar tidak double-count dengan Scope 3 Category 5 atau Category 12.

---

## 12. Circular Economy dan Resource Efficiency

Ellen MacArthur Foundation mendefinisikan circular economy sebagai sistem yang menjaga material tetap beredar dan meregenerasi alam. Tiga prinsipnya adalah menghilangkan waste/pollution, mengedarkan produk/material pada nilai tertinggi, dan meregenerasi alam.[11]

### 12.1 Circular business models

| Model | Contoh |
|---|---|
| Product life extension | Repair, maintenance, durability |
| Reuse/refill | Reusable packaging, refill station |
| Sharing/access | Product-as-a-service, shared equipment |
| Remanufacturing | Rebuild component/product |
| Recycling | Material recovery with quality retention |
| Industrial symbiosis | By-product menjadi input pihak lain |
| Regenerative sourcing | Material sourcing yang memulihkan ekosistem |

### 12.2 Circularity KPI

```text
recycled_content_rate = recycled_input_mass ÷ total_input_mass
reuse_rate = reused_product_or_packaging_units ÷ total_units
recovery_rate = recovered_mass ÷ total_waste_mass
```

Rasio harus menyimpan numerator, denominator, material boundary, quality grade, geography, dan verification evidence.

---

## 13. Sustainable Procurement dan Supply Chain

Sustainable procurement mengintegrasikan cost, quality, delivery, environmental impact, human rights, labor, and resilience ke dalam keputusan pembelian.

Materi meliputi supplier screening, environmental criteria, supplier code, traceability, responsible sourcing, deforestation, critical minerals, conflict minerals, product footprint, supplier engagement, and corrective action.

### 13.1 Supplier score

Jangan memakai satu skor tanpa transparansi. Model yang lebih baik:

```text
supplier_score = weighted_sum(
    emissions_quality,
    environmental_compliance,
    water_risk,
    waste_performance,
    biodiversity_risk,
    human_rights_safeguards,
    data_completeness,
    transition_plan_quality
)
```

Bobot, threshold, missing-data treatment, dan conflict-of-interest policy harus terlihat. Supplier score bukan pengganti audit atau legal due diligence.

---

## 14. Life Cycle Assessment dan Product Carbon Footprint

LCA mengevaluasi dampak di sepanjang tahapan siklus hidup, bukan hanya operasi perusahaan. Product carbon footprint berfokus pada dampak iklim dan memerlukan functional unit, system boundary, data inventory, allocation, life-cycle factors, dan review.

### 14.1 System boundaries

| Boundary | Cakupan |
|---|---|
| **Cradle-to-gate** | Raw material sampai produk keluar dari gate produsen |
| **Gate-to-gate** | Proses di satu tahap produksi |
| **Cradle-to-grave** | Raw material sampai penggunaan dan end-of-life |
| **Cradle-to-cradle** | Siklus tertutup dengan material kembali menjadi input |

### 14.2 Formula sederhana product footprint

```text
PCF = Σ_life_cycle_stages Σ_activities (activity_quantity × life_cycle_EF)
       ± allocation_adjustments
```

Allocation rule, cut-off, recycled content, substitution, avoided emissions, dan biogenic carbon harus disimpan eksplisit. Product footprint tidak boleh dibandingkan apabila functional unit atau system boundary berbeda.

---

## 15. Environmental Management System dan Compliance

ISO 14001 dapat dijadikan kerangka Environmental Management System, sedangkan peraturan lokal menentukan izin, monitoring, reporting, dan sanksi. Materi yang perlu dipelajari:

1. environmental policy;
2. aspect-impact register;
3. legal and other requirements register;
4. objectives and targets;
5. operational control;
6. emergency preparedness and response;
7. competence and awareness;
8. monitoring and measurement;
9. internal audit;
10. management review; dan
11. corrective action and continual improvement.

Tools sebaiknya memiliki **compliance calendar**, permit register, obligation library, evidence, expiry alert, incident, audit finding, corrective action, dan owner. Sistem tidak boleh mengklaim legal compliance hanya karena checklist telah diisi.

---

## 16. Green Finance dan Transition Finance

Green finance membiayai kegiatan yang memenuhi kriteria lingkungan tertentu. Transition finance membiayai perubahan menuju model rendah emisi/resilient, termasuk sektor hard-to-abate, dengan risiko greenwashing yang harus dikendalikan.[5]

### 16.1 Modul green/transition finance

| Modul | Data utama |
|---|---|
| Green taxonomy screening | Activity, sector, technical screening criteria, do-no-significant-harm, safeguards |
| Green bond/use of proceeds | Allocation, eligible project, impact, reporting, assurance |
| Sustainability-linked finance | KPI, baseline, target, SPT, observation date, consequence |
| Transition finance | Transition plan, interim targets, capex, lock-in risk, safeguards |
| Climate finance | Funding source, instrument, adaptation/mitigation split, beneficiary, outcome |
| Internal investment | Carbon price, climate risk, avoided cost, project emissions, NPV |

Finance outputs harus memisahkan **financial value**, **emissions impact**, **avoided emissions**, dan **portfolio alignment**.

---

## 17. Sustainable Buildings, Transport, dan Energy Transition

Modul operasional tambahan meliputi:

| Area | Materi dan KPI |
|---|---|
| Buildings | Energy intensity, HVAC, envelope, cooling load, green building certification |
| Transport | Fleet efficiency, EV share, modal shift, freight intensity, passenger-km |
| Renewable energy | Capacity, generation, self-consumption, storage, certificates |
| Industry | Process efficiency, waste heat, electrification, hydrogen, fuel switching |
| Data centers | PUE, renewable electricity, cooling, embodied carbon |
| Cities | Transit, waste, water, green space, air quality, resilience |

Energy savings harus dibedakan dari renewable attribute. Menggunakan listrik terbarukan dapat menurunkan market-based Scope 2 sesuai aturan yang berlaku, tetapi tidak otomatis menurunkan physical energy consumption atau Scope 1.

---

## 18. Just Transition, Human Rights, dan Environmental Safeguards

Environmental transition memiliki dampak sosial. Materi profesional perlu mencakup worker reskilling, affordability, community rights, Indigenous Peoples, gender, health and safety, grievance mechanism, land rights, benefit sharing, and equitable participation.

Setiap proyek carbon, conservation, renewable energy, mining, infrastructure, atau offset harus memiliki:

```text
stakeholder_map
rights_screening
consultation_record
FPIC_status_when_applicable
grievance_mechanism
benefit_sharing
worker_transition_plan
safeguard_monitoring
remediation_plan
```

Kinerja lingkungan yang baik tidak menghapus kewajiban perlindungan hak manusia dan masyarakat terdampak.

---

## 19. Environmental Data Governance dan Assurance

Data governance adalah fondasi seluruh tools. Model yang harus disiapkan:

| Dimensi | Pertanyaan |
|---|---|
| **Ownership** | Siapa pemilik data dan siapa yang bertanggung jawab? |
| **Lineage** | Dari mana data berasal dan bagaimana ditransformasi? |
| **Quality** | Apakah actual, estimated, proxy, supplier-reported, atau verified? |
| **Versioning** | Factor, GWP, methodology, regulation, dan formula versi berapa? |
| **Control** | Siapa yang input, review, approve, lock, dan restate? |
| **Evidence** | Bukti apa yang mendukung nilai? |
| **Retention** | Berapa lama data dan bukti disimpan? |
| **Access** | Siapa yang boleh melihat data sensitif? |
| **Assurance** | Apa yang diverifikasi dan dengan level assurance apa? |

Audit trail minimum: `who`, `what`, `when`, `before`, `after`, `reason`, `approval`, `evidence`, and `calculation_run`.

---

## 20. Master KPI Catalogue

| Domain | KPI contoh | Unit |
|---|---|---|
| GHG | Scope 1, Scope 2 LB/MB, Scope 3, intensity | tCO₂e; tCO₂e/unit |
| Energy | Total energy, renewable share, EnPI, savings | MWh; %; kWh/unit |
| Carbon market | Allowance balance, credits held/retired, price exposure | tCO₂e; currency/tCO₂e |
| Water | Withdrawal, discharge, consumption, stress-adjusted water | m³; m³/unit |
| Waste | Total waste, hazardous waste, diversion, recovery | tonne; % |
| Pollution | NOx, SOx, PM, VOC, BOD, COD, spills | tonne; kg; incident count |
| Circularity | Recycled content, reuse, recovery, product life | %; years |
| Biodiversity | Area impacted/restored/protected, priority sites | ha; count |
| Climate risk | Sites exposed, risk score, residual risk, action completion | count; score; % |
| Transition | Target progress, capex aligned, renewable capacity | %; currency; MW |
| Finance | Green/transition finance, carbon cost, project abatement cost | currency; currency/tCO₂e |
| Data quality | Completeness, evidence coverage, estimated share | % |

---

## 21. Rekomendasi Modul Tambahan untuk Tools

| Modul produk | Fungsi inti | Prioritas |
|---|---|---:|
| **Carbon Pricing** | Carbon tax, ETS, internal price, scenario analysis | P1 |
| **Carbon Credit Registry** | Project, serial, methodology, issuance, transfer, retirement | P1 |
| **Carbon Trading Ledger** | Allowance/credit balance, transaction, surrender, retirement | P1 |
| **Claims Manager** | Claim boundary, evidence, wording, retirement link, approval | P1 |
| **Transition Plan** | Target, interim milestone, action, capex, residual emissions | P1 |
| **Climate Risk** | Hazard, exposure, vulnerability, scenario, adaptation action | P1 |
| **Water** | Withdrawal, discharge, consumption, basin risk | P2 |
| **Waste and Pollution** | Waste stream, treatment, pollutant, incident, compliance | P2 |
| **Circularity** | Material flow, reuse, recycling, product life, circular KPI | P2 |
| **Nature/TNFD** | Location, dependency, impact, risk, target, disclosure | P2 |
| **Sustainable Procurement** | Supplier data, screening, traceability, engagement | P2 |
| **LCA/PCF** | Product system, stages, allocation, product footprint | P3 |
| **Green/Transition Finance** | Taxonomy, proceeds, KPI-linked finance, impact | P3 |

### 21.1 Prinsip arsitektur

1. **Inventory core terpisah dari market instruments.** Carbon credit tidak mengubah Scope 1–3 gross.
2. **Factor dan methodology versioned.** Setiap output dapat direproduksi.
3. **Regulatory adapter.** Indonesia, Article 6, ETS, dan voluntary standards dapat memiliki aturan berbeda.
4. **Location-aware.** Nature dan water membutuhkan lokasi/watershed, bukan hanya total global.
5. **Claims require evidence.** Tidak boleh membuat klaim dari angka tanpa provenance.
6. **Every estimate is labeled.** Estimasi, proxy, spend-based, dan extrapolation harus terlihat.
7. **No universal credit formula.** Project crediting mengikuti methodology-specific rules.
8. **Gross-first reporting.** Gross emissions selalu ditampilkan sebelum reductions, removals, offsets, atau market transactions.

---

## References

[1]: [UNFCCC — About Carbon Pricing](https://unfccc.int/about-us/regional-collaboration-centres/the-ciaca/about-carbon-pricing)  
[2]: [Integrity Council for the Voluntary Carbon Market — Core Carbon Principles](https://icvcm.org/core-carbon-principles/)  
[3]: [IDXCarbon — Indonesia Carbon Exchange](https://idxcarbon.co.id/)  
[4]: [OJK — POJK Nomor 10 Tahun 2026 tentang Perubahan atas POJK 14 Tahun 2023](https://ojk.go.id/id/regulasi/Pages/POJK-10-Tahun-2026-Perubahan-Atas-POJK-14-Tahun-2023-tentang-Perdagangan-Karbon-Melalui-Bursa-Karbon.aspx)  
[5]: [OECD — Guidance on Transition Finance](https://www.oecd.org/en/publications/oecd-guidance-on-transition-finance_7c68a1ee-en.html)  
[6]: [IPCC/UNEP — Climate Change 2022: Impacts, Adaptation and Vulnerability](https://www.unep.org/resources/report/climate-change-2022-impacts-adaptation-and-vulnerability-working-group-ii)  
[7]: [TNFD — Disclosure Recommendations](https://tnfd.global/recommendations/)  
[8]: [Convention on Biological Diversity — Kunming-Montreal Global Biodiversity Framework](https://www.cbd.int/gbf)  
[9]: [UN-Water — SDG 6 and Sustainable Water Management](https://www.unwater.org/)  
[10]: [UNEP — Chemicals and Pollution Action](https://www.unep.org/topics/chemicals-and-pollution-action)  
[11]: [Ellen MacArthur Foundation — Circular Economy Introduction](https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview)
