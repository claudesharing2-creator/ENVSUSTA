/** Field Guide yang Tenang: workspace lintas domain memakai alur orientasi → data → aksi, dengan setiap keputusan dan asumsi tetap terlihat. */
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  CloudSun,
  Download,
  Factory,
  Flame,
  Footprints,
  Leaf,
  LineChart,
  Menu,
  MoreHorizontal,
  NotebookTabs,
  PanelLeft,
  PlugZap,
  Recycle,
  Route,
  Save,
  Settings2,
  Sparkles,
  Target,
  TrendingDown,
  Upload,
  WalletCards,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  calculateStarterFootprint,
  type StarterFootprintInputs,
} from "@/lib/calculations";
import { envSustaAssets } from "@/lib/assets";
import {
  sustainabilityActionTracks,
  sustainabilityDomains,
  type DomainId,
  type SustainabilityDomain,
} from "@/lib/sustainability";

type ViewId = "overview" | "calculator" | "learn" | "plan" | "library";
type CalcInputs = StarterFootprintInputs;
type LocalWorkspace = {
  inputs: CalcInputs;
  tasks: boolean[];
  activeDomains: DomainId[];
  updatedAt?: string;
};

const initialInputs: CalcInputs = {
  electricity: "",
  diesel: "",
  transport: "",
  waste: "",
};
const domainIcons: Record<DomainId, typeof Leaf> = {
  carbon: CloudSun,
  energy: Zap,
  water: Waves,
  waste: Recycle,
  materials: Factory,
  nature: Leaf,
  esg: LineChart,
  markets: WalletCards,
};

const navItems: {
  id: ViewId;
  label: string;
  icon: typeof PanelLeft;
  note?: string;
}[] = [
  { id: "overview", label: "Hari ini", icon: PanelLeft },
  { id: "calculator", label: "Kalkulator", icon: Footprints, note: "E-Calc" },
  { id: "learn", label: "Belajar", icon: BookOpen },
  { id: "plan", label: "Rencana aksi", icon: Target },
  { id: "library", label: "Navigator", icon: NotebookTabs },
];

function blankTasks() {
  return sustainabilityActionTracks.map((_, index) => index === 0);
}

function normalizeTasks(tasks?: boolean[]) {
  const fallback = blankTasks();
  return fallback.map((item, index) => tasks?.[index] ?? item);
}

function readLocalWorkspace(): LocalWorkspace {
  if (typeof window === "undefined")
    return { inputs: initialInputs, tasks: blankTasks(), activeDomains: [] };
  try {
    const raw = window.localStorage.getItem("envsusta-local-workspace");
    if (!raw)
      return { inputs: initialInputs, tasks: blankTasks(), activeDomains: [] };
    const parsed = JSON.parse(raw) as Partial<LocalWorkspace>;
    const activeDomains = Array.isArray(parsed.activeDomains)
      ? parsed.activeDomains.filter((id): id is DomainId =>
          sustainabilityDomains.some(domain => domain.id === id)
        )
      : [];
    return {
      inputs: { ...initialInputs, ...(parsed.inputs ?? {}) },
      tasks: normalizeTasks(parsed.tasks),
      activeDomains,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    window.localStorage.removeItem("envsusta-local-workspace");
    return { inputs: initialInputs, tasks: blankTasks(), activeDomains: [] };
  }
}

function formatNumber(value: number, maxFractionDigits = 1) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

function formatSavedAt(updatedAt?: string) {
  if (!updatedAt) return "Belum ada perubahan";
  return `Tersimpan ${new Date(updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}

function downloadLocalData(
  inputs: CalcInputs,
  tasks: boolean[],
  activeDomains: DomainId[]
) {
  const payload = {
    app: "EnvSusta",
    exportedAt: new Date().toISOString(),
    calculatorInputs: inputs,
    actionPlan: tasks,
    activeDomains,
    note: "Draf lokal untuk orientasi dan aksi awal. Faktor perhitungan pada versi demo bersifat ilustratif; pilih faktor resmi, batas organisasi, dan metodologi yang sesuai sebelum menggunakan hasil untuk pelaporan formal.",
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "envsusta-draf-lokal.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

function DomainIcon({
  domainId,
  size = 20,
}: {
  domainId: DomainId;
  size?: number;
}) {
  const Icon = domainIcons[domainId];
  return <Icon size={size} strokeWidth={1.8} />;
}

export default function Home() {
  const [workspaceSeed] = useState<LocalWorkspace>(() => readLocalWorkspace());
  const [activeView, setActiveView] = useState<ViewId>(() => {
    const candidate = new URLSearchParams(window.location.search).get("view");
    return candidate === "calculator" ||
      candidate === "learn" ||
      candidate === "plan" ||
      candidate === "library"
      ? candidate
      : "overview";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputs, setInputs] = useState<CalcInputs>(workspaceSeed.inputs);
  const [savedAt, setSavedAt] = useState(
    formatSavedAt(workspaceSeed.updatedAt)
  );
  const [tasks, setTasks] = useState(() => normalizeTasks(workspaceSeed.tasks));
  const [activeDomains, setActiveDomains] = useState<DomainId[]>(
    workspaceSeed.activeDomains
  );
  const [selectedDomainId, setSelectedDomainId] = useState<DomainId>(
    workspaceSeed.activeDomains[0] ?? "carbon"
  );
  const [showMethod, setShowMethod] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const updatedAt = new Date().toISOString();
      window.localStorage.setItem(
        "envsusta-local-workspace",
        JSON.stringify({ inputs, tasks, activeDomains, updatedAt })
      );
      setSavedAt(formatSavedAt(updatedAt));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [inputs, tasks, activeDomains]);

  const calculation = useMemo(
    () => calculateStarterFootprint(inputs),
    [inputs]
  );
  const selectedDomain =
    sustainabilityDomains.find(domain => domain.id === selectedDomainId) ??
    sustainabilityDomains[0];
  const completedTaskCount = tasks.filter(Boolean).length;
  const completion = Math.round((completedTaskCount / tasks.length) * 100);
  const dataSignals = [
    calculation.hasData,
    activeDomains.includes("energy"),
    activeDomains.includes("water"),
    activeDomains.includes("waste"),
    activeDomains.includes("materials"),
    activeDomains.includes("nature"),
  ].filter(Boolean).length;

  const changeInput =
    (key: keyof CalcInputs) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      setInputs(current => ({ ...current, [key]: nextValue }));
    };

  const goTo = (view: ViewId) => {
    setActiveView(view);
    window.history.replaceState(
      null,
      "",
      view === "overview"
        ? window.location.pathname
        : `${window.location.pathname}?view=${view}`
    );
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activateDomain = (domainId: DomainId, destination?: ViewId) => {
    setSelectedDomainId(domainId);
    setActiveDomains(current =>
      current.includes(domainId) ? current : [...current, domainId]
    );
    if (destination) goTo(destination);
  };

  const handleQuickStart = () => {
    activateDomain("carbon");
    goTo("calculator");
    toast(
      "Mulai dari angka yang tersedia. Estimasi tetap diberi label data awal."
    );
  };

  const resetWorkspace = () => {
    setInputs(initialInputs);
    setTasks(blankTasks());
    setActiveDomains([]);
    setSelectedDomainId("carbon");
    toast(
      "Draf lokal dikosongkan. Anda dapat memulai ulang dari domain mana pun."
    );
  };

  const openDomainLearning = (domainId: DomainId) => {
    activateDomain(domainId);
    goTo("learn");
  };

  const renderOverview = () => (
    <>
      <section className="welcome-panel workspace-hero">
        <div className="welcome-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            WORKSPACE SUSTAINABILITY · LOCAL-FIRST
          </div>
          <h1>
            Satu ruang kerja.
            <br />
            <em>Seluruh dampak.</em>
          </h1>
          <p>
            Petakan karbon, energi, air, limbah, material, nature, ESG, dan
            carbon market dari data yang sudah Anda miliki.
          </p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={() => goTo("library")}>
              Pilih fokus awal <ArrowDownRight size={18} />
            </button>
            <button className="quiet-action" onClick={() => goTo("learn")}>
              Lihat jalur belajar <ArrowRight size={17} />
            </button>
          </div>
          <p className="privacy-line">
            <Save size={14} /> Draf ini tersimpan di browser perangkat Anda.
          </p>
        </div>
        <div className="welcome-visual">
          <img
            src={envSustaAssets.hero}
            alt="Alat catatan dan pengukuran sustainability di atas meja lapangan"
          />
          <div className="visual-stamp">
            <span>FIELD NOTE</span>
            <b>{String(activeDomains.length || 1).padStart(2, "0")}</b>
            <small>FOCUS AREAS</small>
          </div>
        </div>
      </section>

      <section
        className="workspace-snapshot"
        aria-label="Snapshot sustainability workspace"
      >
        <div className="snapshot-copy">
          <span className="section-kicker">SNAPSHOT HARI INI</span>
          <h2>Mulai dari area yang paling siap datanya.</h2>
          <p>
            Belum perlu menyelesaikan seluruh agenda sekaligus. Pilih fokus,
            kumpulkan bukti, lalu ubah temuan menjadi aksi.
          </p>
          <span className="observation-stamp">
            OBSERVATION · LOCAL DRAFT · SOURCE VISIBLE
          </span>
        </div>
        <div className="snapshot-stat">
          <strong>{activeDomains.length}</strong>
          <span>fokus aktif</span>
        </div>
        <div className="snapshot-stat">
          <strong>{dataSignals}/6</strong>
          <span>sinyal data awal</span>
        </div>
        <div className="snapshot-stat">
          <strong>
            {completedTaskCount}/{tasks.length}
          </strong>
          <span>aksi ditandai</span>
        </div>
      </section>

      <section className="section-head domain-head">
        <div>
          <h2>Peta sustainability Anda</h2>
          <p>
            Pilih salah satu domain untuk melihat data yang perlu dikumpulkan,
            metrik yang dapat dipantau, dan langkah pertama.
          </p>
        </div>
        <button className="text-button" onClick={() => goTo("library")}>
          Buka Navigator <ArrowRight size={16} />
        </button>
      </section>
      <section className="domain-overview-grid">
        {sustainabilityDomains.map(domain => (
          <button
            key={domain.id}
            className={`domain-tile ${domain.tone} ${domain.id === "carbon" ? "recommended" : ""} ${activeDomains.includes(domain.id) ? "is-active" : ""}`}
            onClick={() => {
              setSelectedDomainId(domain.id);
              goTo("library");
            }}
          >
            <div className="domain-tile-top">
              <span>{domain.number}</span>
              <DomainIcon domainId={domain.id} size={20} />
            </div>
            <div>
              <h3>{domain.shortTitle}</h3>
              <p>{domain.summary}</p>
            </div>
            <div className="domain-tile-bottom">
              <small>
                {activeDomains.includes(domain.id)
                  ? "Fokus aktif"
                  : domain.id === "carbon"
                    ? "Direkomendasikan untuk mulai"
                    : "Buka domain"}
              </small>
              <ArrowDownRight size={17} />
            </div>
          </button>
        ))}
      </section>

      <section className="two-column-section">
        <div className="panel-card compass-card">
          <div className="panel-card-head">
            <div>
              <span className="section-kicker">ALUR KERJA</span>
              <h3>Gunakan 3 gerakan sederhana</h3>
            </div>
            <CircleHelp size={19} />
          </div>
          <div className="compass-options">
            <button onClick={() => goTo("library")}>
              <span className="compass-icon">
                <NotebookTabs size={18} />
              </span>
              <span>
                <b>1. Tentukan fokus</b>
                <small>
                  Pilih domain berdasarkan dampak dan data yang siap.
                </small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => goTo("learn")}>
              <span className="compass-icon">
                <BookOpen size={18} />
              </span>
              <span>
                <b>2. Pahami metodenya</b>
                <small>Baca metric, bukti, dan batas penggunaan data.</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => goTo("plan")}>
              <span className="compass-icon">
                <Target size={18} />
              </span>
              <span>
                <b>3. Tindak lanjuti</b>
                <small>
                  Ubah satu temuan menjadi tindakan yang punya pemilik.
                </small>
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="panel-card signal-card">
          <div className="panel-card-head">
            <div>
              <span className="section-kicker">STATUS DATA</span>
              <h3>Ruang kerja Anda</h3>
            </div>
            <span className="local-badge">
              <span /> Lokal
            </span>
          </div>
          <div className="signal-number">
            <strong>
              {calculation.hasData
                ? formatNumber(calculation.totalTons, 2)
                : "—"}
            </strong>
            <span>tCO₂e estimasi</span>
          </div>
          <p>
            {calculation.hasData
              ? "Baseline karbon tersedia sebagai salah satu input. Lanjutkan dengan melengkapi domain lain yang material bagi organisasi Anda."
              : "Belum ada baseline karbon. Anda tetap dapat memulai dari air, limbah, material, nature, atau ESG."}
          </p>
          <div className="signal-footer">
            <span>
              <Save size={14} /> {savedAt}
            </span>
            <button
              onClick={() => goTo(calculation.hasData ? "plan" : "library")}
            >
              {calculation.hasData ? "Buka aksi" : "Pilih fokus"}{" "}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderCalculator = () => (
    <>
      <section className="page-intro calc-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            E-CALC · DATA KARBON
          </span>
          <h1>
            Hitung jejak karbon
            <br />
            <em>tanpa kehilangan konteks.</em>
          </h1>
          <p>
            E-Calc adalah salah satu modul dalam workspace. Masukkan data
            aktivitas dalam periode yang sama untuk membuat baseline awal.
          </p>
        </div>
        <img
          src={envSustaAssets.carbonOrbit}
          alt="Ilustrasi orbit pengukuran jejak karbon"
        />
      </section>
      <section className="calculator-layout">
        <form
          className="panel-card calculation-form"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            activateDomain("carbon");
            toast("Estimasi awal diperbarui dan tersimpan lokal.");
          }}
        >
          <div className="panel-card-head">
            <div>
              <span className="section-kicker">DATA AKTIVITAS</span>
              <h2>Masukkan yang Anda tahu</h2>
            </div>
            <span className="step-chip">E-CALC</span>
          </div>
          <p className="form-lead">
            Masukkan angka penuh, termasuk beberapa digit. Nilai disimpan
            sebagai draf lokal dan tidak akan di-reset ketika Anda berpindah
            field.
          </p>
          <div className="input-stack">
            <label className="input-row">
              <span className="input-icon teal">
                <PlugZap size={18} />
              </span>
              <span className="input-copy">
                <b>Listrik yang dibeli</b>
                <small>Scope 2 · kWh per periode</small>
              </span>
              <span className="number-field">
                <input
                  inputMode="decimal"
                  value={inputs.electricity}
                  onChange={changeInput("electricity")}
                  placeholder="Contoh: 1250"
                  aria-label="Listrik dalam kWh"
                  autoComplete="off"
                />
                <em>kWh</em>
              </span>
            </label>
            <label className="input-row">
              <span className="input-icon orange">
                <Flame size={18} />
              </span>
              <span className="input-copy">
                <b>Solar / diesel</b>
                <small>Scope 1 · liter per periode</small>
              </span>
              <span className="number-field">
                <input
                  inputMode="decimal"
                  value={inputs.diesel}
                  onChange={changeInput("diesel")}
                  placeholder="Contoh: 80"
                  aria-label="Solar dalam liter"
                  autoComplete="off"
                />
                <em>L</em>
              </span>
            </label>
            <label className="input-row">
              <span className="input-icon charcoal">
                <Route size={18} />
              </span>
              <span className="input-copy">
                <b>Perjalanan operasional</b>
                <small>Scope 3 · km kendaraan</small>
              </span>
              <span className="number-field">
                <input
                  inputMode="decimal"
                  value={inputs.transport}
                  onChange={changeInput("transport")}
                  placeholder="Contoh: 430"
                  aria-label="Perjalanan dalam kilometer"
                  autoComplete="off"
                />
                <em>km</em>
              </span>
            </label>
            <label className="input-row">
              <span className="input-icon clay">
                <Recycle size={18} />
              </span>
              <span className="input-copy">
                <b>Limbah operasional</b>
                <small>Scope 3 · kg per periode</small>
              </span>
              <span className="number-field">
                <input
                  inputMode="decimal"
                  value={inputs.waste}
                  onChange={changeInput("waste")}
                  placeholder="Contoh: 250"
                  aria-label="Limbah dalam kilogram"
                  autoComplete="off"
                />
                <em>kg</em>
              </span>
            </label>
          </div>
          <div className="form-footer">
            <button
              type="button"
              className="quiet-action"
              onClick={() => setShowMethod(current => !current)}
            >
              <CircleHelp size={16} />{" "}
              {showMethod ? "Tutup asumsi" : "Lihat asumsi"}
            </button>
            <button type="submit" className="primary-action">
              Simpan estimasi <ArrowRight size={17} />
            </button>
          </div>
          {showMethod && (
            <div className="method-note">
              <b>Metode demo yang terlihat</b>
              <p>
                Hasil dihitung dari data aktivitas × faktor ilustratif: listrik
                0,82 kgCO₂e/kWh, diesel 2,68 kgCO₂e/L, transport 0,18 kgCO₂e/km,
                limbah 0,45 kgCO₂e/kg. Faktor, GWP, batas organisasi, dan sumber
                harus disesuaikan sebelum menggunakan hasil untuk pelaporan
                formal.
              </p>
            </div>
          )}
        </form>
        <aside className="result-column">
          <div className="result-card">
            <div className="result-kicker">
              <span>ESTIMASI GROSS</span>
              <span className="quality-tag">Data awal</span>
            </div>
            <div className="orbit-meter">
              <div className="orbit-outer" />
              <div className="orbit-middle" />
              <div className="orbit-core">
                <strong>
                  {calculation.hasData
                    ? formatNumber(calculation.totalTons, 2)
                    : "0,00"}
                </strong>
                <small>tCO₂e</small>
              </div>
              <span className="orbit-tick" />
            </div>
            <h2>
              {calculation.hasData
                ? "Baseline karbon Anda"
                : "Belum ada baseline"}
            </h2>
            <p>
              {calculation.hasData
                ? "Gunakan hasil ini untuk menemukan sumber terbesar. Gross emissions tetap dicatat terpisah dari offset, credit, atau allowance."
                : "Masukkan satu aktivitas untuk memulai baseline. Anda juga dapat memilih domain sustainability lain di Navigator."}
            </p>
            <button className="result-link" onClick={() => goTo("plan")}>
              Buka rencana aksi <ArrowRight size={16} />
            </button>
          </div>
          <div className="breakdown-card">
            <div className="panel-card-head">
              <div>
                <span className="section-kicker">KONTRIBUSI KARBON</span>
                <h3>Menurut sumber data</h3>
              </div>
              <MoreHorizontal size={19} />
            </div>
            {[
              ["Listrik", calculation.electricity, "Scope 2", "teal"],
              ["Solar / diesel", calculation.diesel, "Scope 1", "orange"],
              ["Perjalanan", calculation.transport, "Scope 3", "charcoal"],
              ["Limbah", calculation.waste, "Scope 3", "clay"],
            ].map(([label, value, scope, tone]) => {
              const numericValue = value as number;
              const width = calculation.totalKg
                ? Math.max((numericValue / calculation.totalKg) * 100, 2)
                : 0;
              return (
                <div className="breakdown-row" key={label as string}>
                  <div>
                    <span>{label}</span>
                    <small>{scope}</small>
                  </div>
                  <div className="breakdown-bar">
                    <i
                      className={tone as string}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <b>{formatNumber(numericValue / 1000, 2)} t</b>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
      <section className="calculator-callout">
        <div>
          <span className="section-kicker">BATAS PENGGUNAAN</span>
          <h3>Kalkulator bukan seluruh program sustainability.</h3>
          <p>
            Gunakan Navigator untuk menambahkan air, limbah, material, nature,
            ESG, dan carbon market ke dalam rencana kerja yang sama.
          </p>
        </div>
        <button className="quiet-action" onClick={() => goTo("library")}>
          Buka Navigator <ArrowRight size={17} />
        </button>
      </section>
    </>
  );

  const renderLearn = () => (
    <>
      <section className="page-intro learn-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            PETA BELAJAR
          </span>
          <h1>
            Pahami domainnya.
            <br />
            <em>Lalu pilih aksi.</em>
          </h1>
          <p>
            Delapan modul memperkenalkan cara berpikir, data, metrik, dan bukti
            yang diperlukan sebelum masuk ke standar atau disclosure yang lebih
            kompleks.
          </p>
        </div>
        <div className="learning-stat">
          <span>MODUL TERSEDIA</span>
          <strong>08</strong>
          <p>dari karbon sampai nature dan carbon market.</p>
        </div>
      </section>
      <section className="learning-layout">
        <nav className="lesson-nav extended" aria-label="Daftar materi">
          {sustainabilityDomains.map(domain => (
            <button
              className={selectedDomain.id === domain.id ? "selected" : ""}
              key={domain.id}
              onClick={() => setSelectedDomainId(domain.id)}
            >
              <span>{domain.number}</span>
              <DomainIcon domainId={domain.id} size={19} />
              <div>
                <b>{domain.shortTitle}</b>
                <small>{domain.lessonMinutes}</small>
              </div>
              <ChevronRight size={17} />
            </button>
          ))}
        </nav>
        <article className="lesson-article domain-lesson">
          <div className={`lesson-hero ${selectedDomain.tone}`}>
            <img
              src={envSustaAssets.learningAtlas}
              alt="Peta belajar sustainability dengan energi, air, material, emisi, dan nature"
            />
            <div>
              <span className="section-kicker">
                MODUL {selectedDomain.number}
              </span>
              <h2>{selectedDomain.title}</h2>
              <p>{selectedDomain.summary}</p>
            </div>
          </div>
          <div className="article-body">
            <div className="article-copy">
              <p>{selectedDomain.description}</p>
              <p>
                <b>Langkah pertama:</b> {selectedDomain.firstAction}
              </p>
            </div>
            <aside className="field-note">
              <span>FIELD NOTE</span>
              <b>Bukti minimum</b>
              <ul>
                {selectedDomain.evidence.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
          <div className="lesson-detail-grid">
            <div>
              <span>METRIK AWAL</span>
              {selectedDomain.metrics.map(item => (
                <b key={item}>{item}</b>
              ))}
            </div>
            <div>
              <span>DATA YANG DIKUMPULKAN</span>
              {selectedDomain.dataPoints.map(item => (
                <b key={item}>{item}</b>
              ))}
            </div>
          </div>
          <div className="lesson-actions">
            <button
              className="primary-action"
              onClick={() => activateDomain(selectedDomain.id, "plan")}
            >
              Tambahkan ke rencana <ArrowRight size={17} />
            </button>
            <button
              className="quiet-action"
              onClick={() => activateDomain(selectedDomain.id, "library")}
            >
              Buka data domain <ArrowRight size={16} />
            </button>
          </div>
        </article>
      </section>
    </>
  );

  const renderPlan = () => (
    <>
      <section className="page-intro plan-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            RENCANA AKSI
          </span>
          <h1>
            Ubah fokus
            <br />
            <em>menjadi kebiasaan.</em>
          </h1>
          <p>
            Rencana ini mencakup seluruh domain sustainability. Tandai tindakan
            yang sudah dimulai, lalu lanjutkan dari bukti yang paling mudah
            dikumpulkan.
          </p>
        </div>
        <div className="plan-orbit">
          <strong>{completion}%</strong>
          <span>selesai</span>
        </div>
      </section>
      <section className="plan-layout">
        <div className="panel-card action-list">
          <div className="panel-card-head">
            <div>
              <span className="section-kicker">PROGRAM AWAL</span>
              <h2>8 jalur yang terhubung</h2>
            </div>
            <span className="step-chip">
              {completedTaskCount}/{tasks.length}
            </span>
          </div>
          {sustainabilityActionTracks.map((item, index) => (
            <label
              className={`action-item ${tasks[index] ? "done" : ""}`}
              key={item.title}
            >
              <input
                type="checkbox"
                checked={tasks[index]}
                onChange={() =>
                  setTasks(current =>
                    current.map((task, itemIndex) =>
                      itemIndex === index ? !task : task
                    )
                  )
                }
              />
              <span className="check-box">
                {tasks[index] && <Check size={15} />}
              </span>
              <span>
                <b>{item.title}</b>
                <small>{item.copy}</small>
              </span>
              <span className="action-domain">
                <DomainIcon domainId={item.domainId} size={15} />
              </span>
            </label>
          ))}
        </div>
        <aside className="plan-aside">
          <div className="panel-card next-action">
            <img
              className="plan-orbit-mark"
              src={envSustaAssets.orbitMark}
              alt=""
            />
            <span className="section-kicker">FOKUS SAAT INI · FIELD NOTE</span>
            <h3>
              {activeDomains.length
                ? `${activeDomains.length} domain aktif`
                : "Tentukan domain pertama"}
            </h3>
            <p>
              {activeDomains.length
                ? "Gunakan Navigator untuk meninjau data dan bukti dari domain aktif, kemudian centang tindakan yang benar-benar mulai dikerjakan."
                : "Pilih domain berdasarkan dampak, kewajiban, atau data yang paling siap. Karbon hanya salah satu titik awal."}
            </p>
            <small className="method-status">
              STATUS · DRAFT LOKAL · PEMILIK BELUM DITETAPKAN
            </small>
            <button onClick={() => goTo("library")}>
              {activeDomains.length ? "Buka fokus aktif" : "Pilih domain"}{" "}
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="impact-note">
            <TrendingDown size={21} />
            <div>
              <b>Urutkan tindakan dengan hati-hati.</b>
              <p>
                Hindari dampak, kurangi intensitas, ubah proses atau sumber
                daya, lalu kelola dampak sisa dengan klaim yang hati-hati.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );

  const renderLibrary = () => (
    <>
      <section className="page-intro library-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            NAVIGATOR SUSTAINABILITY
          </span>
          <h1>
            Seluruh topik.
            <br />
            <em>Satu alur kerja.</em>
          </h1>
          <p>
            Pilih domain untuk melihat metric, data, bukti, dan tindakan awal.
            Semua domain dapat menjadi fokus tanpa harus dimulai dari emisi.
          </p>
        </div>
        <div className="library-side-note">
          <b>Prinsip kerja</b>
          <span>impact first · source visible · action owned</span>
        </div>
      </section>
      <section className="library-grid expanded">
        {sustainabilityDomains.map(domain => (
          <button
            className={`library-card ${domain.id === "carbon" ? "recommended" : ""} ${selectedDomain.id === domain.id ? "selected" : ""} ${activeDomains.includes(domain.id) ? "is-active" : ""}`}
            key={domain.id}
            onClick={() => setSelectedDomainId(domain.id)}
          >
            <span>{domain.number}</span>
            <div className="library-icon">
              <DomainIcon domainId={domain.id} size={23} />
            </div>
            <h2>{domain.shortTitle}</h2>
            <p>{domain.summary}</p>
            <div>
              <small>
                {activeDomains.includes(domain.id)
                  ? "Fokus aktif"
                  : domain.id === "carbon"
                    ? "Mulai dari sini"
                    : "Pilih untuk detail"}
              </small>
              <ArrowRight size={17} />
            </div>
          </button>
        ))}
      </section>
      <section
        className={`domain-explorer ${selectedDomain.tone}`}
        aria-live="polite"
      >
        <div className="explorer-head">
          <div className="explorer-icon">
            <DomainIcon domainId={selectedDomain.id} size={28} />
          </div>
          <div>
            <span className="section-kicker">
              DOMAIN {selectedDomain.number}
            </span>
            <h2>{selectedDomain.title}</h2>
            <p>{selectedDomain.description}</p>
          </div>
          <button
            className={
              activeDomains.includes(selectedDomain.id)
                ? "active-domain-button"
                : "primary-action"
            }
            onClick={() => activateDomain(selectedDomain.id)}
          >
            {activeDomains.includes(selectedDomain.id)
              ? "Fokus aktif"
              : "Jadikan fokus"}{" "}
            <Check size={16} />
          </button>
        </div>
        <div className="explorer-grid">
          <div>
            <span>DATA MINIMUM</span>
            {selectedDomain.dataPoints.map(item => (
              <p key={item}>
                <Check size={14} /> {item}
              </p>
            ))}
          </div>
          <div>
            <span>METRIK AWAL</span>
            {selectedDomain.metrics.map(item => (
              <p key={item}>
                <LineChart size={14} /> {item}
              </p>
            ))}
          </div>
          <div>
            <span>BUKTI & KONTROL</span>
            {selectedDomain.evidence.map(item => (
              <p key={item}>
                <Save size={14} /> {item}
              </p>
            ))}
          </div>
        </div>
        <div className="explorer-footer">
          <p>
            <b>Langkah pertama:</b> {selectedDomain.firstAction}
          </p>
          <div>
            <button
              className="quiet-action"
              onClick={() => openDomainLearning(selectedDomain.id)}
            >
              Pelajari domain <ArrowRight size={16} />
            </button>
            <button
              className="primary-action"
              onClick={() => activateDomain(selectedDomain.id, "plan")}
            >
              Buka rencana aksi <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
      <section className="reference-strip">
        <div>
          <span className="section-kicker">
            UNTUK TOOLS YANG DAPAT DIPERTANGGUNGJAWABKAN
          </span>
          <h3>
            Versi, sumber, bukti, dan pemilik data adalah bagian dari pengalaman
            pengguna.
          </h3>
        </div>
        <div>
          <p>
            Setiap domain nantinya dapat dikembangkan menjadi data dictionary,
            factor library, evidence trail, approval, dan disclosure workspace.
            Draf lokal dapat diekspor untuk didiskusikan atau dipindahkan ke
            workflow berikutnya.
          </p>
          <button
            className="quiet-action"
            onClick={() => downloadLocalData(inputs, tasks, activeDomains)}
          >
            <Download size={16} /> Unduh draf lokal
          </button>
        </div>
      </section>
    </>
  );

  const pageTitle: Record<ViewId, string> = {
    overview: "Hari ini",
    calculator: "Kalkulator karbon",
    learn: "Belajar sustainability",
    plan: "Rencana aksi",
    library: "Navigator sustainability",
  };
  const pageContent =
    activeView === "overview"
      ? renderOverview()
      : activeView === "calculator"
        ? renderCalculator()
        : activeView === "learn"
          ? renderLearn()
          : activeView === "plan"
            ? renderPlan()
            : renderLibrary();

  return (
    <div className="envsusta-shell">
      <a className="skip-link" href="#workspace-main">
        Lewati ke konten utama
      </a>
      <aside className="sidebar">
        <div className="brand-block">
          <button
            className="brand"
            onClick={() => goTo("overview")}
            aria-label="EnvSusta, kembali ke Hari ini"
          >
            <img src={envSustaAssets.orbitMark} alt="" />
            <span>EnvSusta</span>
          </button>
          <p>
            Mulai sustainability
            <br />
            tanpa kehilangan arah.
          </p>
        </div>
        <nav className="main-nav" aria-label="Navigasi utama">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activeView === item.id ? "active" : ""}
                onClick={() => goTo(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.note && <em>{item.note}</em>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="local-state">
            <span>
              <Save size={14} /> Local-first
            </span>
            <p>
              Data tetap di browser sampai Anda memilih mengekspor atau
              menghubungkan layanan lain.
            </p>
          </div>
          <button className="profile-mini" onClick={() => goTo("library")}>
            <span>ES</span>
            <div>
              <b>Workspace pribadi</b>
              <small>
                {activeDomains.length
                  ? `${activeDomains.length} fokus aktif`
                  : "Pilih domain awal"}
              </small>
            </div>
            <Settings2 size={16} />
          </button>
        </div>
      </aside>

      <header className="mobile-topbar">
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Buka navigasi"
        >
          <Menu size={21} />
        </button>
        <button className="brand" onClick={() => goTo("overview")}>
          <img src={envSustaAssets.orbitMark} alt="" />
          <span>EnvSusta</span>
        </button>
        <button
          onClick={() => downloadLocalData(inputs, tasks, activeDomains)}
          aria-label="Unduh draf lokal"
        >
          <Download size={20} />
        </button>
      </header>
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi utama"
        >
          <div className="mobile-menu-top">
            <button className="brand" onClick={() => goTo("overview")}>
              <img src={envSustaAssets.orbitMark} alt="" />
              <span>EnvSusta</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup navigasi"
            >
              <X size={22} />
            </button>
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activeView === item.id ? "active" : ""}
                onClick={() => goTo(item.id)}
              >
                <Icon size={19} />
                {item.label}
                <ChevronRight size={17} />
              </button>
            );
          })}
          <div className="mobile-menu-foot">
            <Save size={15} /> Draf aktif tersimpan di perangkat ini.
          </div>
        </div>
      )}

      <main className="workspace" id="workspace-main">
        <header className="workspace-topbar">
          <div>
            <span className="breadcrumb">ENVSUSTA / WORKSPACE</span>
            <h2>{pageTitle[activeView]}</h2>
          </div>
          <div className="topbar-actions">
            <span className="autosave">
              <i />
              {savedAt}
            </span>
            <button
              className="top-button"
              onClick={() => downloadLocalData(inputs, tasks, activeDomains)}
            >
              <Download size={16} /> Ekspor
            </button>
            <button
              className="top-button icon-only"
              onClick={resetWorkspace}
              aria-label="Reset draf"
            >
              <Upload size={16} />
            </button>
          </div>
        </header>
        <div className="workspace-content">{pageContent}</div>
      </main>
      <nav className="mobile-bottom-nav" aria-label="Navigasi cepat">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={activeView === item.id ? "active" : ""}
              onClick={() => goTo(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
