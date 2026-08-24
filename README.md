# EnvSusta

**EnvSusta** adalah tools environmental sustainability yang membantu pengguna baru bergerak dari data aktivitas sederhana menuju pemahaman, baseline jejak karbon, dan rencana aksi yang dapat ditindaklanjuti.

> **Nilai utama:** Mulai dari data yang sudah ada—lalu tingkatkan kualitas data, metode, dan tindakan secara bertahap.

## Fitur saat ini

| Area | Implementasi |
|---|---|
| **Hari ini** | Onboarding praktis, progress trail, dan rekomendasi langkah berikutnya |
| **E-Calc / Carbon Footprint** | Estimasi awal dari listrik, diesel, perjalanan, dan limbah dengan breakdown Scope 1–3 |
| **Belajar** | Materi pemula untuk jejak karbon, Scope 1–3, dan manajemen energi |
| **Rencana aksi** | Checklist sederhana yang tersimpan lokal dan beradaptasi dengan baseline |
| **Kamus data** | Pintu masuk untuk GHG accounting, ESG, carbon market, air, limbah, circularity, dan nature |
| **Local-first** | Draf dan progress disimpan di `localStorage`; data dapat diekspor dalam format JSON |
| **Responsif** | Rail workspace di desktop dan bottom navigation di mobile |

## Menjalankan secara lokal

```bash
pnpm install
pnpm check
pnpm dev
```

Untuk menyiapkan build GitHub Pages secara lokal:

```bash
VITE_DEPLOY_TARGET=github pnpm build
```

## Deployment otomatis

Push ke branch `main` memicu workflow `.github/workflows/pages.yml` untuk menjalankan type check, build produksi, dan deployment GitHub Pages. Pastikan pada **Settings → Pages** repository, sumber publikasi menggunakan **GitHub Actions**.

## Catatan metodologi

Faktor emisi yang ada di UI saat ini merupakan **faktor demo untuk orientasi produk** dan tidak boleh dipakai sebagai inventaris GRK formal, laporan sustainability, pelaporan regulator, atau klaim carbon-neutral/net-zero.

Implementasi production perlu menerapkan:

1. library faktor emisi ber-versi dengan sumber, periode validitas, basis GWP, dan jurisdiksi;
2. batas organisasi dan operasional yang eksplisit;
3. data lineage, evidence, review, dan approval trail;
4. metode Scope 2 location-based dan market-based yang terpisah; serta
5. pemisahan gross inventory, reductions, removals, carbon credits, allowances, dan claims.

Dokumen domain, PRD, dan formula registry tersedia dalam folder [`docs/`](./docs).

## Struktur repository

```text
client/src/pages/Home.tsx       # Workspace dan experience pengguna
client/src/lib/calculations.ts  # Formula E-Calc starter yang dapat diaudit
client/src/lib/assets.ts        # Resolusi aset untuk preview dan GitHub Pages
client/public/assets/           # Aset visual yang dibundel untuk deployment mandiri
docs/                           # Materi domain, PRD, dan formula registry
.github/workflows/pages.yml     # Quality gate dan GitHub Pages deployment
```

## Disclaimer

EnvSusta adalah alat bantu pembelajaran dan estimasi awal. Hasilnya tidak menggantikan penilaian profesional, verification/assurance independen, kewajiban hukum, atau keputusan regulator.
