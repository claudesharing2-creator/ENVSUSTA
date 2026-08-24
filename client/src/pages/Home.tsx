/** Field Guide yang Tenang: dashboard ini memprioritaskan langkah kecil, konteks jelas, dan data yang dapat ditelusuri. */
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
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
  Play,
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

type ViewId = "overview" | "calculator" | "learn" | "plan" | "library";
type CalcInputs = StarterFootprintInputs;

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
  { id: "library", label: "Kamus data", icon: NotebookTabs },
];

const lessons = [
  {
    id: "footprint",
    number: "01",
    title: "Kenali jejak karbon",
    copy: "Mulai dari empat aktivitas yang paling mudah Anda temukan datanya.",
    icon: Footprints,
    tone: "teal",
    minutes: "6 menit",
    detail:
      "Jejak karbon adalah perkiraan emisi gas rumah kaca yang terkait dengan aktivitas. Untuk langkah pertama, fokuskan pada data yang dapat dibuktikan: tagihan listrik, pembelian bahan bakar, perjalanan, dan catatan limbah.",
  },
  {
    id: "scope",
    number: "02",
    title: "Pahami Scope 1–3",
    copy: "Klasifikasikan sumber emisi tanpa harus memahami semua standar sekaligus.",
    icon: CloudSun,
    tone: "sand",
    minutes: "8 menit",
    detail:
      "Scope 1 adalah emisi langsung seperti pembakaran bahan bakar. Scope 2 terkait energi yang dibeli. Scope 3 mencakup value chain, misalnya perjalanan, pengadaan, dan limbah. Mulailah dari materialitas dan kualitas data, bukan dari kesempurnaan.",
  },
  {
    id: "energy",
    number: "03",
    title: "Baca energi Anda",
    copy: "Temukan penggunaan terbesar sebelum mencari proyek teknologi baru.",
    icon: Zap,
    tone: "apricot",
    minutes: "5 menit",
    detail:
      "Manajemen energi dimulai dengan baseline dan pola penggunaan. Bandingkan konsumsi dengan output yang relevan, lalu cari perubahan yang bisa dilakukan tanpa mengorbankan layanan atau keselamatan.",
  },
];

const libraryTopics = [
  [
    "GHG Accounting",
    "Scope 1, 2, 3 · faktor emisi · data aktivitas",
    "Sumber angka yang jelas",
  ],
  [
    "Manajemen energi",
    "Baseline · EnPI · penggunaan signifikan",
    "Konsumsi menjadi tindakan",
  ],
  [
    "ESG & disclosure",
    "Materiality · KPI · governance · evidence",
    "Siap dibaca stakeholder",
  ],
  [
    "Carbon market",
    "Allowance · credit · retirement · claim",
    "Pisahkan gross dan offset",
  ],
  [
    "Air & limbah",
    "Withdrawal · discharge · waste hierarchy",
    "Dampak di luar karbon",
  ],
  [
    "Nature & circularity",
    "Biodiversity · material flow · supplier",
    "Pikirkan value chain",
  ],
];

const initialInputs: CalcInputs = {
  electricity: "",
  diesel: "",
  transport: "",
  waste: "",
};

function formatNumber(value: number, maxFractionDigits = 1) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

function downloadLocalData(inputs: CalcInputs, tasks: boolean[]) {
  const payload = {
    app: "EnvSusta",
    exportedAt: new Date().toISOString(),
    calculatorInputs: inputs,
    actionPlan: tasks,
    note: "Draf lokal. Faktor perhitungan pada versi demo bersifat ilustratif dan perlu disesuaikan dengan metodologi serta sumber faktor resmi yang dipilih organisasi.",
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

export default function Home() {
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
  const [inputs, setInputs] = useState<CalcInputs>(initialInputs);
  const [savedAt, setSavedAt] = useState<string>("Belum ada perubahan");
  const [tasks, setTasks] = useState([true, false, false, false]);
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [showMethod, setShowMethod] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("envsusta-local-workspace");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as {
        inputs?: CalcInputs;
        tasks?: boolean[];
        updatedAt?: string;
      };
      if (parsed.inputs) setInputs({ ...initialInputs, ...parsed.inputs });
      if (parsed.tasks && Array.isArray(parsed.tasks)) setTasks(parsed.tasks);
      if (parsed.updatedAt)
        setSavedAt(
          `Tersimpan ${new Date(parsed.updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`
        );
    } catch {
      window.localStorage.removeItem("envsusta-local-workspace");
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const updatedAt = new Date().toISOString();
      window.localStorage.setItem(
        "envsusta-local-workspace",
        JSON.stringify({ inputs, tasks, updatedAt })
      );
      setSavedAt(
        `Tersimpan ${new Date(updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`
      );
    }, 550);
    return () => window.clearTimeout(timer);
  }, [inputs, tasks]);

  const calculation = useMemo(
    () => calculateStarterFootprint(inputs),
    [inputs]
  );

  const completedTaskCount = tasks.filter(Boolean).length;
  const completion = Math.round((completedTaskCount / tasks.length) * 100);

  const changeInput =
    (key: keyof CalcInputs) => (event: ChangeEvent<HTMLInputElement>) => {
      setInputs(current => ({ ...current, [key]: event.target.value }));
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

  const handleQuickStart = () => {
    goTo("calculator");
    toast("Mulai dari angka yang Anda miliki. Estimasi tetap diberi label.");
  };

  const resetWorkspace = () => {
    setInputs(initialInputs);
    setTasks([true, false, false, false]);
    toast("Draf lokal dikosongkan. Anda bisa mulai lagi kapan saja.");
  };

  const renderOverview = () => (
    <>
      <section className="welcome-panel">
        <div className="welcome-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            WORKSPACE PRIBADI · LANGKAH 01 DARI 04
          </div>
          <h1>
            Mulai dari data
            <br />
            <em>yang sudah ada.</em>
          </h1>
          <p>
            EnvSusta membantu Anda memahami sustainability lewat angka
            sehari-hari, kemudian menerjemahkannya menjadi langkah yang lebih
            baik.
          </p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={handleQuickStart}>
              Buat estimasi pertama <ArrowDownRight size={18} />
            </button>
            <button className="quiet-action" onClick={() => goTo("learn")}>
              Lihat panduan singkat <ArrowRight size={17} />
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
            <b>01</b>
            <small>DATA → AKSI</small>
          </div>
        </div>
      </section>

      <section className="progress-strip" aria-label="Kemajuan awal Anda">
        <div className="trail-block">
          <span className="trail-index">01</span>
          <div>
            <b>Kenali konteks</b>
            <small>Satu perubahan kecil sudah dimulai.</small>
          </div>
          <span className="trail-check">
            <Check size={15} />
          </span>
        </div>
        <div className="trail-line active" />
        <div className="trail-block active">
          <span className="trail-index">02</span>
          <div>
            <b>Masukkan data</b>
            <small>Listrik, bahan bakar, perjalanan, limbah.</small>
          </div>
          <span className="trail-pulse" />
        </div>
        <div className="trail-line" />
        <div className="trail-block">
          <span className="trail-index">03</span>
          <div>
            <b>Baca hasil</b>
            <small>Temukan sumber emisi utama.</small>
          </div>
        </div>
        <div className="trail-line" />
        <div className="trail-block">
          <span className="trail-index">04</span>
          <div>
            <b>Rencanakan aksi</b>
            <small>Jadikan target lebih nyata.</small>
          </div>
        </div>
      </section>

      <section className="section-head">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            LANGKAH BERIKUTNYA
          </span>
          <h2>Jangan menunggu data sempurna.</h2>
        </div>
        <button className="text-button" onClick={() => goTo("learn")}>
          Lihat semua materi <ArrowRight size={16} />
        </button>
      </section>
      <section className="starter-grid">
        {lessons.map(lesson => {
          const Icon = lesson.icon;
          return (
            <button
              key={lesson.id}
              className={`starter-card ${lesson.tone}`}
              onClick={() => {
                setSelectedLesson(lesson);
                goTo("learn");
              }}
            >
              <div className="starter-card-top">
                <span>{lesson.number}</span>
                <Icon size={21} />
              </div>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.copy}</p>
              </div>
              <div className="starter-card-bottom">
                <small>{lesson.minutes}</small>
                <ArrowDownRight size={18} />
              </div>
            </button>
          );
        })}
      </section>

      <section className="two-column-section">
        <div className="panel-card compass-card">
          <div className="panel-card-head">
            <div>
              <span className="eyebrow">PETA AWAL</span>
              <h3>Di mana Anda ingin mulai?</h3>
            </div>
            <CircleHelp size={19} />
          </div>
          <div className="compass-options">
            <button onClick={() => goTo("calculator")}>
              <span className="compass-icon">
                <Zap size={18} />
              </span>
              <span>
                <b>Energi & emisi</b>
                <small>Kalkulasi dari listrik dan bahan bakar.</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => goTo("plan")}>
              <span className="compass-icon">
                <Target size={18} />
              </span>
              <span>
                <b>Target & rencana</b>
                <small>Ubah insight menjadi tindakan kecil.</small>
              </span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => goTo("library")}>
              <span className="compass-icon">
                <Leaf size={18} />
              </span>
              <span>
                <b>Topik lanjutan</b>
                <small>Air, circularity, ESG, dan carbon market.</small>
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="panel-card signal-card">
          <div className="panel-card-head">
            <div>
              <span className="eyebrow">STATUS DATA</span>
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
              ? "Angka awal tersedia. Lanjutkan dengan memeriksa sumber dan faktor emisi yang digunakan."
              : "Belum ada angka yang dihitung. Masukkan satu sumber data untuk membuat baseline awal."}
          </p>
          <div className="signal-footer">
            <span>
              <Save size={14} /> {savedAt}
            </span>
            <button onClick={handleQuickStart}>
              Buka kalkulator <ArrowRight size={15} />
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
            E-CALC · ESTIMASI AWAL
          </span>
          <h1>
            Mulai dari aktivitas
            <br />
            <em>yang bisa Anda cek.</em>
          </h1>
          <p>
            Masukkan data dalam periode yang sama, misalnya satu bulan. Hasil
            ini membantu membuat baseline awal dan bukan inventaris GRK yang
            telah diverifikasi.
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
            toast("Estimasi awal telah diperbarui dan tersimpan lokal.");
          }}
        >
          <div className="panel-card-head">
            <div>
              <span className="eyebrow">DATA AKTIVITAS</span>
              <h2>Masukkan yang Anda tahu</h2>
            </div>
            <span className="step-chip">1 / 2</span>
          </div>
          <p className="form-lead">
            Tidak punya semua data? Isi satu atau dua sumber dulu. Anda dapat
            menyempurnakannya nanti.
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
                  placeholder="0"
                  aria-label="Listrik dalam kWh"
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
                  placeholder="0"
                  aria-label="Solar dalam liter"
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
                  placeholder="0"
                  aria-label="Perjalanan dalam kilometer"
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
                  placeholder="0"
                  aria-label="Limbah dalam kilogram"
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
              <CircleHelp size={16} /> Lihat asumsi
            </button>
            <button type="submit" className="primary-action">
              Perbarui estimasi <ArrowRight size={17} />
            </button>
          </div>
          {showMethod && (
            <div className="method-note">
              <b>Metode demo</b>
              <p>
                Hasil dihitung dari data aktivitas × faktor ilustratif: listrik
                0,82 kgCO₂e/kWh, diesel 2,68 kgCO₂e/L, transport 0,18 kgCO₂e/km,
                limbah 0,45 kgCO₂e/kg. Pilih faktor, GWP, batas organisasi, dan
                sumber resmi sebelum memakai hasil untuk pelaporan formal.
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
                ? "Baseline awal Anda"
                : "Belum ada baseline"}
            </h2>
            <p>
              {calculation.hasData
                ? "Gunakan hasil ini untuk menemukan sumber terbesar—bukan untuk membuat klaim net-zero atau offset."
                : "Masukkan salah satu aktivitas di samping untuk memulai estimasi pertama."}
            </p>
            <button className="result-link" onClick={() => goTo("plan")}>
              Jadikan rencana aksi <ArrowRight size={16} />
            </button>
          </div>
          <div className="breakdown-card">
            <div className="panel-card-head">
              <div>
                <span className="eyebrow">KONTRIBUSI EMISI</span>
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
          <span className="eyebrow">CATATAN PENTING</span>
          <h3>Gross emissions selalu terlihat lebih dulu.</h3>
          <p>
            Carbon credit, allowance, atau offset perlu dicatat sebagai
            instrumen pasar yang terpisah. Mereka tidak menghapus angka Scope
            1–3 Anda secara otomatis.
          </p>
        </div>
        <WalletCards size={34} />
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
            Pahami konteks.
            <br />
            <em>Lalu pilih aksi.</em>
          </h1>
          <p>
            Materi dibuat untuk membangun fondasi sebelum Anda menyentuh
            standar, disclosure, atau carbon market yang lebih kompleks.
          </p>
        </div>
        <div className="learning-stat">
          <span>JALUR PEMULA</span>
          <strong>04</strong>
          <p>langkah kecil menuju workspace yang lebih siap.</p>
        </div>
      </section>
      <section className="learning-layout">
        <nav className="lesson-nav" aria-label="Daftar materi">
          {lessons.map(lesson => {
            const Icon = lesson.icon;
            return (
              <button
                className={selectedLesson.id === lesson.id ? "selected" : ""}
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
              >
                <span>{lesson.number}</span>
                <Icon size={19} />
                <div>
                  <b>{lesson.title}</b>
                  <small>{lesson.minutes}</small>
                </div>
                <ChevronRight size={17} />
              </button>
            );
          })}
          <button className="lesson-nav-more" onClick={() => goTo("library")}>
            <span>04</span>
            <Sparkles size={19} />
            <div>
              <b>Lanjut ke topik lain</b>
              <small>ESG, air, circularity, nature.</small>
            </div>
            <ChevronRight size={17} />
          </button>
        </nav>
        <article className="lesson-article">
          <div className="lesson-hero">
            <img
              src={envSustaAssets.learningAtlas}
              alt="Peta belajar sustainability dengan energi, air, material, emisi, dan nature"
            />
            <div>
              <span className="eyebrow">MATERI {selectedLesson.number}</span>
              <h2>{selectedLesson.title}</h2>
              <p>{selectedLesson.copy}</p>
            </div>
          </div>
          <div className="article-body">
            <div className="article-copy">
              <p>{selectedLesson.detail}</p>
              <p>
                Anda tidak perlu langsung mencari semua jawaban. Mulailah dengan
                membedakan **data aktivitas**, **faktor emisi**, dan **hasil
                estimasi**. Ketiga hal ini akan menjadi fondasi untuk langkah
                yang lebih tertib.
              </p>
            </div>
            <aside className="field-note">
              <span>FIELD NOTE</span>
              <b>Yang perlu dibuktikan</b>
              <ul>
                <li>Sumber data dan periodenya</li>
                <li>Unit yang digunakan</li>
                <li>Asumsi atau estimasi yang dipakai</li>
              </ul>
            </aside>
          </div>
          <button className="primary-action" onClick={handleQuickStart}>
            Coba dengan data saya <ArrowRight size={17} />
          </button>
        </article>
      </section>
    </>
  );

  const renderPlan = () => {
    const taskItems = [
      [
        "Tetapkan periode baseline",
        "Pilih satu bulan atau satu tahun untuk memulai.",
      ],
      ["Kumpulkan tagihan listrik", "Simpan bukti kWh dan lokasi penggunaan."],
      [
        "Petakan bahan bakar & perjalanan",
        "Catat volume, kendaraan, atau kilometer.",
      ],
      [
        "Pilih satu peluang pengurangan",
        "Fokus pada sumber emisi terbesar lebih dulu.",
      ],
    ];
    return (
      <>
        <section className="page-intro plan-intro">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              RENCANA AKSI
            </span>
            <h1>
              Ubah baseline
              <br />
              <em>menjadi kebiasaan.</em>
            </h1>
            <p>
              Rencana ini dibuat agar pekerjaan sustainability punya pemilik,
              bukti, dan langkah kecil berikutnya.
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
                <span className="eyebrow">CHECKLIST AWAL</span>
                <h2>4 langkah yang realistis</h2>
              </div>
              <span className="step-chip">{completedTaskCount}/4</span>
            </div>
            {taskItems.map(([title, copy], index) => (
              <label
                className={`action-item ${tasks[index] ? "done" : ""}`}
                key={title}
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
                  <b>{title}</b>
                  <small>{copy}</small>
                </span>
                <span className="action-index">0{index + 1}</span>
              </label>
            ))}
          </div>
          <aside className="plan-aside">
            <div className="panel-card next-action">
              <span className="eyebrow">REKOMENDASI SAAT INI</span>
              <h3>
                {calculation.hasData
                  ? "Periksa sumber emisi terbesar"
                  : "Bangun baseline sederhana"}
              </h3>
              <p>
                {calculation.hasData
                  ? "Buka hasil E-Calc lalu pilih aktivitas dengan kontribusi tertinggi. Satu sumber emisi adalah cukup untuk memulai percobaan pengurangan."
                  : "Masukkan penggunaan listrik atau bahan bakar terlebih dahulu. Ini akan membuat action plan lebih relevan."}
              </p>
              <button
                onClick={
                  calculation.hasData
                    ? () => goTo("calculator")
                    : handleQuickStart
                }
              >
                {calculation.hasData ? "Lihat breakdown" : "Buat baseline"}{" "}
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="impact-note">
              <TrendingDown size={21} />
              <div>
                <b>Urutkan tindakan dengan hati-hati.</b>
                <p>
                  Hindari, kurangi, ganti, lalu kelola emisi sisa. Offset bukan
                  langkah pertama.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </>
    );
  };

  const renderLibrary = () => (
    <>
      <section className="page-intro library-intro">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            KAMUS SUSTAINABILITY
          </span>
          <h1>
            Topik kompleks,
            <br />
            <em>pintu masuk sederhana.</em>
          </h1>
          <p>
            Gunakan sebagai orientasi awal. Saat data digunakan untuk disclosure
            atau compliance, selalu cek metodologi dan regulasi yang berlaku.
          </p>
        </div>
        <div className="library-side-note">
          <b>Prinsip kerja</b>
          <span>Gross first · source visible · claim carefully</span>
        </div>
      </section>
      <section className="library-grid">
        {libraryTopics.map(([title, copy, note], index) => (
          <article className="library-card" key={title}>
            <span>0{index + 1}</span>
            <div className="library-icon">
              {index === 0 ? (
                <CloudSun size={23} />
              ) : index === 1 ? (
                <Zap size={23} />
              ) : index === 2 ? (
                <LineChart size={23} />
              ) : index === 3 ? (
                <WalletCards size={23} />
              ) : index === 4 ? (
                <Waves size={23} />
              ) : (
                <Leaf size={23} />
              )}
            </div>
            <h2>{title}</h2>
            <p>{copy}</p>
            <div>
              <small>{note}</small>
              <button
                onClick={() =>
                  toast(
                    `${title}: materi lanjutan akan memperluas workspace ini.`
                  )
                }
                aria-label={`Buka materi ${title}`}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </article>
        ))}
      </section>
      <section className="reference-strip">
        <div>
          <span className="eyebrow">
            UNTUK TOOLS YANG DAPAT DIPERTANGGUNGJAWABKAN
          </span>
          <h3>
            Versi, sumber, dan bukti adalah bagian dari pengalaman pengguna.
          </h3>
        </div>
        <div>
          <p>
            Faktor emisi, GWP, batas organisasi, regulasi, serta status
            verifikasi perlu dicatat sebagai data ber-versi. Ini menjaga hasil
            bisa ditelusuri dan diperbarui ketika metodologi berkembang.
          </p>
          <button
            className="quiet-action"
            onClick={() => downloadLocalData(inputs, tasks)}
          >
            <Download size={16} /> Unduh draf lokal
          </button>
        </div>
      </section>
    </>
  );

  const pageMap = {
    overview: renderOverview,
    calculator: renderCalculator,
    learn: renderLearn,
    plan: renderPlan,
    library: renderLibrary,
  };
  const pageTitle: Record<ViewId, string> = {
    overview: "Hari ini",
    calculator: "Kalkulator jejak karbon",
    learn: "Belajar sustainability",
    plan: "Rencana aksi",
    library: "Kamus data",
  };
  const CurrentPage = pageMap[activeView];

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
          <button
            className="profile-mini"
            onClick={() =>
              toast("Workspace pribadi aktif. Semua perubahan tersimpan lokal.")
            }
          >
            <span>ES</span>
            <div>
              <b>Workspace pribadi</b>
              <small>Pengguna baru</small>
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
          onClick={() => downloadLocalData(inputs, tasks)}
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
              onClick={() => downloadLocalData(inputs, tasks)}
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
        <div className="workspace-content">
          <CurrentPage />
        </div>
      </main>
      <nav className="mobile-bottom-nav" aria-label="Navigasi cepat">
        {navItems.slice(0, 5).map(item => {
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
