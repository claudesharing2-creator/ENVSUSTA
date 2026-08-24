# Quality Gate dan Otomasi Deployment

EnvSusta bersifat **local-first** pada tahap awal. Data kalkulator dan checklist disimpan di browser pengguna, sehingga aplikasi statis dapat dibangun dan dipublikasikan langsung dari repository.

## Siklus quality gate

Setiap perubahan pada branch `main` menjalankan urutan berikut melalui GitHub Actions:

| Tahap | Pemeriksaan | Tujuan |
|---|---|---|
| 1 | Instalasi dengan lockfile | Menjaga dependensi dapat direproduksi |
| 2 | `pnpm check` | Menghentikan deployment jika TypeScript gagal |
| 3 | `pnpm build` | Memastikan artefak produksi bisa dibentuk |
| 4 | Upload artifact | Menyimpan artefak situs statis yang benar |
| 5 | Deploy GitHub Pages | Menerbitkan hanya artefak yang lolos quality gate |

## Batas otomasi saat ini

Pipeline ini memeriksa konsistensi teknis dan membangun artefak di setiap push. Pemeriksaan visual, review metodologi faktor emisi, serta legal/regulatory review tetap membutuhkan peninjauan manusia sebelum rilis yang digunakan untuk disclosure, compliance, carbon credit, atau carbon market.

> Perhitungan starter di aplikasi sengaja diberi label **estimasi awal**. Production engine perlu factor library yang ber-versi, bukti sumber, batas organisasi, kebijakan GWP, serta approval/assurance workflow.
