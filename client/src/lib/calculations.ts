/** Field Guide yang Tenang: formula starter dipisahkan agar setiap asumsi tetap terbaca, teruji, dan dapat diganti dengan factor library ber-versi. */

export type StarterFootprintInputs = {
  electricity: string;
  diesel: string;
  transport: string;
  waste: string;
};

/**
 * Faktor DEMO untuk orientasi produk, bukan faktor pelaporan formal.
 * Production engine wajib menyimpan `factor_id`, `factor_version`, `source`,
 * `valid_from`, `valid_to`, GWP basis, jurisdiction, dan evidence trail.
 */
export const STARTER_EMISSION_FACTORS = {
  electricityKgCo2ePerKwh: 0.82,
  dieselKgCo2ePerLiter: 2.68,
  transportKgCo2ePerKm: 0.18,
  wasteKgCo2ePerKg: 0.45,
} as const;

const parseActivityValue = (value: string) => {
  const normalized = value.replace(",", ".").replace(/[^0-9.]/g, "");
  return Number.parseFloat(normalized) || 0;
};

export function calculateStarterFootprint(inputs: StarterFootprintInputs) {
  const electricity =
    parseActivityValue(inputs.electricity) *
    STARTER_EMISSION_FACTORS.electricityKgCo2ePerKwh;
  const diesel =
    parseActivityValue(inputs.diesel) *
    STARTER_EMISSION_FACTORS.dieselKgCo2ePerLiter;
  const transport =
    parseActivityValue(inputs.transport) *
    STARTER_EMISSION_FACTORS.transportKgCo2ePerKm;
  const waste =
    parseActivityValue(inputs.waste) *
    STARTER_EMISSION_FACTORS.wasteKgCo2ePerKg;
  const totalKg = electricity + diesel + transport + waste;

  return {
    electricity,
    diesel,
    transport,
    waste,
    totalKg,
    totalTons: totalKg / 1000,
    hasData: Object.values(inputs).some(value => parseActivityValue(value) > 0),
  };
}
