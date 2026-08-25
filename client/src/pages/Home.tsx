/** Field Guide yang Tenang: perpustakaan sustainability memakai alur topik → metode → penerapan, dengan batas penggunaan setiap metode tetap terlihat. */
import {
  ArrowLeft,
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
  RotateCcw,
  Route,
  Search,
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
/* Field Guide yang Tenang: landing page mengarahkan pembaca dari tujuan ke literatur, metode, dan panduan terapan. */
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import "@/landing.css";
import { calculateStarterFootprint, type StarterFootprintInputs } from "@/lib/calculations";
import { envSustaAssets } from "@/lib/assets";
import {
  actionPlaybooks,
  sustainabilityDomains,
  type DomainId,
  type UserGoal,
  userGoalOptions,
} from "@/lib/sustainability";

type ViewId = "overview" | "calculator" | "learn" | "plan" | "library";
type CalcInputs = StarterFootprintInputs;
type LocalWorkspace = {
  inputs: CalcInputs;
  playbookProgress: Record<DomainId, boolean[]>;
  activeDomains: DomainId[];
  updatedAt?: string;
};

type LiteratureSource = {
  title: string;
  note: string;
  href?: string;
};

type Difficulty = "Pemula" | "Menengah" | "Lanjutan";
type LandingAnchorId = "tujuan" | "topik" | "metode";

const initialInputs: CalcInputs = { electricity: "", diesel: "", transport: "", waste: "" };
const domainIcons: Record<DomainId, typeof Leaf> = {
  carbon: CloudSun,
  energy: Zap,
  water: Waves,
  waste: Recycle,
  materials: Factory,
  lca: Route,
  nature: Leaf,
  esg: LineChart,
  markets: WalletCards,
  proper: NotebookTabs,
};

const navItems: { id: ViewId; label: string; icon: typeof PanelLeft; note?: string }[] = [
  { id: "overview", label: "Mulai", icon: PanelLeft },
  { id: "library", label: "Topik", icon: NotebookTabs },
  { id: "learn", label: "Literatur", icon: BookOpen },
  { id: "plan", label: "Panduan terapan", icon: Target },
  { id: "calculator", label: "Metode hitung", icon: Footprints, note: "E-Calc" },
];

const landingAnchorItems: { id: LandingAnchorId; targetId: string; label: string }[] = [
  { id: "tujuan", targetId: "landing-goals", label: "Tujuan" },
  { id: "topik", targetId: "landing-topic-map", label: "Topik" },
  { id: "metode", targetId: "landing-method", label: "Metode" },
];

const literatureSources: Record<DomainId, LiteratureSource[]> = {
  carbon: [
    { title: "GHG Protocol Corporate Standard", note: "Inventaris dan pelaporan emisi organisasi", href: "https://ghgprotocol.org/corporate-standard" },
    { title: "GHG Protocol Scope 2 Guidance", note: "Emisi dari energi yang dibeli", href: "https://ghgprotocol.org/scope-2-guidance" },
  ],
  energy: [
    { title: "ISO 50001", note: "Sistem manajemen energi", href: "https://www.iso.org/standard/69426.html" },
    { title: "ISO environmental sustainability", note: "Portal tema dan standar lingkungan", href: "https://www.iso.org/sectors/environment" },
  ],
  water: [
    { title: "GRI 303: Water and Effluents 2018", note: "Pengungkapan penggunaan air dan efluen", href: "https://www.globalreporting.org/standards/media/1906/gri-303-water-and-effluents-2018.pdf" },
    { title: "ISO environmental sustainability", note: "Konteks sistem manajemen lingkungan", href: "https://www.iso.org/sectors/environment" },
  ],
  waste: [
    { title: "GRI 306: Waste 2020", note: "Pengungkapan dan pengelolaan limbah", href: "https://www.globalreporting.org/standards/media/2573/gri-306-waste-2020.pdf" },
    { title: "ISO environmental sustainability", note: "Konteks sistem manajemen lingkungan", href: "https://www.iso.org/sectors/environment" },
  ],
  materials: [
    { title: "ISO 59020", note: "Pengukuran dan penilaian circularity performance", href: "https://www.iso.org/standard/80648.html" },
    { title: "ISO circular economy", note: "Keluarga standar ekonomi sirkular", href: "https://www.iso.org/committee/7203984.html" },
  ],
  lca: [
    { title: "ISO 14040", note: "Prinsip dan kerangka Life Cycle Assessment", href: "https://www.iso.org/standard/37456.html" },
    { title: "ISO 14044", note: "Persyaratan dan pedoman LCA", href: "https://www.iso.org/standard/38498.html" },
  ],
  nature: [
    { title: "TNFD LEAP approach", note: "Locate, Evaluate, Assess, Prepare", href: "https://tnfd.global/publication/additional-guidance-on-assessment-of-nature-related-issues-the-leap-approach/" },
    { title: "Kunming–Montreal Global Biodiversity Framework", note: "Kerangka aksi keanekaragaman hayati", href: "https://www.cbd.int/gbf" },
  ],
  esg: [
    { title: "ISO 14000 family", note: "Sistem dan standar manajemen lingkungan", href: "https://www.iso.org/standards/popular/iso-14000-family" },
    { title: "ISO 14001", note: "Gunakan versi standar SML yang paling mutakhir", href: "https://www.iso.org/standards/popular/iso-14000-family" },
  ],
  markets: [
    { title: "VCMI Claims Code", note: "Panduan klaim terkait penggunaan kredit karbon", href: "https://vcmintegrity.org/claims-code/" },
    { title: "ICVCM Core Carbon Principles", note: "Integritas kredit karbon", href: "https://icvcm.org/the-core-carbon-principles/" },
  ],
  proper: [
    { title: "PROPER Beyond Compliance", note: "Materi pemrakarsa: dokumen hijau, DRKPL, inovasi, kompetensi, dan evidence lintas domain" },
    { title: "Ketentuan PROPER terkini", note: "Selalu konfirmasi kriteria dan cut-off langsung pada kanal resmi KLH/BPLH" },
  ],
};

function blankPlaybookProgress(): Record<DomainId, boolean[]> {
  return actionPlaybooks.reduce((progress, playbook) => {
    progress[playbook.domainId] = playbook.steps.map(() => false);
    return progress;
  }, {} as Record<DomainId, boolean[]>);
}

function normalizePlaybookProgress(progress?: Partial<Record<DomainId, boolean[]>>): Record<DomainId, boolean[]> {
  const fallback = blankPlaybookProgress();
  return actionPlaybooks.reduce((normalized, playbook) => {
    normalized[playbook.domainId] = fallback[playbook.domainId].map((item, index) => progress?.[playbook.domainId]?.[index] ?? item);
    return normalized;
  }, {} as Record<DomainId, boolean[]>);
}

function readLocalWorkspace(): LocalWorkspace {
  if (typeof window === "undefined") return { inputs: initialInputs, playbookProgress: blankPlaybookProgress(), activeDomains: [] };
  try {
    const raw = window.localStorage.getItem("envsusta-local-workspace");
    if (!raw) return { inputs: initialInputs, playbookProgress: blankPlaybookProgress(), activeDomains: [] };
    const parsed = JSON.parse(raw) as Partial<LocalWorkspace>;
    const activeDomains = Array.isArray(parsed.activeDomains)
      ? parsed.activeDomains.filter((id): id is DomainId => sustainabilityDomains.some((domain) => domain.id === id))
      : [];
    return {
      inputs: { ...initialInputs, ...(parsed.inputs ?? {}) },
      playbookProgress: normalizePlaybookProgress(parsed.playbookProgress),
      activeDomains,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    window.localStorage.removeItem("envsusta-local-workspace");
    return { inputs: initialInputs, playbookProgress: blankPlaybookProgress(), activeDomains: [] };
  }
}

function formatNumber(value: number, maxFractionDigits = 1) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: maxFractionDigits }).format(value);
}

function formatSavedAt(updatedAt?: string) {
  if (!updatedAt) return "Belum ada perubahan";
  return `Tersimpan ${new Date(updatedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}

function downloadReadingNotes(inputs: CalcInputs, playbookProgress: Record<DomainId, boolean[]>, activeDomains: DomainId[]) {
  const payload = {
    app: "EnvSusta",
    exportedAt: new Date().toISOString(),
    bookmarkedTopics: activeDomains,
    appliedPlaybookSteps: playbookProgress,
    methodWorksheet: { eCalcCarbon: inputs },
    note: "Catatan lokal berisi penanda topik, progres panduan penerapan, dan worksheet E-Calc opsional. Faktor pada E-Calc bersifat ilustratif; gunakan faktor resmi, batas organisasi, dan metodologi yang sesuai untuk pelaporan formal.",
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "envsusta-catatan-literatur.json";
  anchor.click();
  URL.revokeObjectURL(href);
}

function DomainIcon({ domainId, size = 20 }: { domainId: DomainId; size?: number }) {
  const Icon = domainIcons[domainId];
  return <Icon size={size} strokeWidth={1.8} />;
}

export default function Home() {
  const [workspaceSeed] = useState<LocalWorkspace>(() => readLocalWorkspace());
  const [activeView, setActiveView] = useState<ViewId>(() => {
    const candidate = new URLSearchParams(window.location.search).get("view");
    return candidate === "calculator" || candidate === "learn" || candidate === "plan" || candidate === "library" ? candidate : "overview";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputs, setInputs] = useState<CalcInputs>(workspaceSeed.inputs);
  const [savedAt, setSavedAt] = useState(formatSavedAt(workspaceSeed.updatedAt));
  const [playbookProgress, setPlaybookProgress] = useState<Record<DomainId, boolean[]>>(() => normalizePlaybookProgress(workspaceSeed.playbookProgress));
  const [activeDomains, setActiveDomains] = useState<DomainId[]>(workspaceSeed.activeDomains);
  const [selectedDomainId, setSelectedDomainId] = useState<DomainId>(workspaceSeed.activeDomains[0] ?? "carbon");
  const [showMethod, setShowMethod] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "">("");
  const [selectedGoal, setSelectedGoal] = useState<UserGoal | "">("");
  const [activeLandingAnchor, setActiveLandingAnchor] = useState<LandingAnchorId>("tujuan");
  const [isAnchorNavigating, setIsAnchorNavigating] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const updatedAt = new Date().toISOString();
      window.localStorage.setItem("envsusta-local-workspace", JSON.stringify({ inputs, playbookProgress, activeDomains, updatedAt }));
      setSavedAt(formatSavedAt(updatedAt));
    }, 500);
    return () => window.clearTimeout(timer);
  }, [inputs, playbookProgress, activeDomains]);

  const calculation = useMemo(() => calculateStarterFootprint(inputs), [inputs]);
  const selectedDomain = sustainabilityDomains.find((domain) => domain.id === selectedDomainId) ?? sustainabilityDomains[0];
  const selectedPlaybook = actionPlaybooks.find((playbook) => playbook.domainId === selectedDomain.id) ?? actionPlaybooks[0];
  const selectedPlaybookProgress = playbookProgress[selectedPlaybook.domainId];
  const selectedPlaybookCompleteCount = selectedPlaybookProgress.filter(Boolean).length;
  const completedTaskCount = Object.values(playbookProgress).flat().filter(Boolean).length;
  const totalTaskCount = actionPlaybooks.reduce((total, playbook) => total + playbook.steps.length, 0);
  const completion = Math.round((completedTaskCount / totalTaskCount) * 100);
  const standardOptions = useMemo(() => Array.from(new Set(sustainabilityDomains.flatMap((domain) => domain.standards))).sort(), []);
  const sectorOptions = useMemo(() => Array.from(new Set(sustainabilityDomains.flatMap((domain) => domain.sectors))).sort(), []);
  const filteredDomains = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("id-ID");
    return sustainabilityDomains.filter((domain) => {
      const searchable = [domain.title, domain.shortTitle, domain.summary, domain.description, ...domain.standards, ...domain.sectors, ...domain.goals, domain.difficulty].join(" ").toLocaleLowerCase("id-ID");
      return (!query || searchable.includes(query))
        && (!selectedStandard || domain.standards.includes(selectedStandard))
        && (!selectedSector || domain.sectors.includes(selectedSector))
        && (!selectedDifficulty || domain.difficulty === selectedDifficulty)
        && (!selectedGoal || domain.goals.includes(selectedGoal));
    });
  }, [searchQuery, selectedStandard, selectedSector, selectedDifficulty, selectedGoal]);
  const hasActiveFilters = Boolean(searchQuery || selectedStandard || selectedSector || selectedDifficulty || selectedGoal);

  useEffect(() => {
    if (filteredDomains.length && !filteredDomains.some((domain) => domain.id === selectedDomainId)) setSelectedDomainId(filteredDomains[0].id);
  }, [filteredDomains, selectedDomainId]);

  useEffect(() => {
    if (activeView !== "overview") return;
    const sections = landingAnchorItems.map((item) => ({ ...item, element: document.getElementById(item.targetId) })).filter((item): item is typeof item & { element: HTMLElement } => Boolean(item.element));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const matching = sections.find((section) => section.element === visible[0].target);
      if (matching) setActiveLandingAnchor(matching.id);
    }, { rootMargin: "-22% 0px -57% 0px", threshold: [0.05, 0.2, 0.45] });

    sections.forEach((section) => observer.observe(section.element));
    return () => observer.disconnect();
  }, [activeView]);

  const changeInput = (key: keyof CalcInputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    setInputs((current) => ({ ...current, [key]: nextValue }));
  };

  const goTo = (view: ViewId) => {
    setActiveView(view);
    window.history.replaceState(null, "", view === "overview" ? window.location.pathname : `${window.location.pathname}?view=${view}`);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateLandingAnchor = (anchor: (typeof landingAnchorItems)[number]) => {
    const target = document.getElementById(anchor.targetId);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveLandingAnchor(anchor.id);
    setIsAnchorNavigating(true);
    window.history.pushState(null, "", `#${anchor.targetId}`);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => setIsAnchorNavigating(false), reduceMotion ? 0 : 560);
  };

  const activateDomain = (domainId: DomainId, destination?: ViewId) => {
    setSelectedDomainId(domainId);
    setActiveDomains((current) => (current.includes(domainId) ? current : [...current, domainId]));
    if (destination) goTo(destination);
  };

  const handleQuickStart = () => {
    activateDomain("carbon");
    goTo("calculator");
    toast("E-Calc dibuka sebagai contoh metode. Hasilnya tetap bersifat ilustratif.");
  };

  const resetWorkspace = () => {
    setInputs(initialInputs);
    setPlaybookProgress(blankPlaybookProgress());
    setActiveDomains([]);
    setSelectedDomainId("carbon");
    toast("Penanda topik, langkah playbook, dan worksheet E-Calc telah dikosongkan.");
  };

  const resetLiteratureFilters = () => {
    setSearchQuery("");
    setSelectedStandard("");
    setSelectedSector("");
    setSelectedDifficulty("");
    setSelectedGoal("");
  };

  const beginGoalRoute = (goal: UserGoal) => {
    const firstMatch = sustainabilityDomains.find((domain) => domain.goals.includes(goal));
    if (firstMatch) setSelectedDomainId(firstMatch.id);
    setSelectedGoal(goal);
    goTo("library");
  };

  const openDomainLearning = (domainId: DomainId) => {
    activateDomain(domainId);
    goTo("learn");
  };

  const togglePlaybookStep = (domainId: DomainId, stepIndex: number) => {
    setPlaybookProgress((current) => ({
      ...current,
      [domainId]: current[domainId].map((isDone, index) => (index === stepIndex ? !isDone : isDone)),
    }));
  };

  const renderOverview = () => (
    <>
      <header className={`landing-header ${isAnchorNavigating ? "is-routing" : ""}`} aria-label="Navigasi landing page">
        <a className="landing-header-brand" href="#workspace-main"><img src={envSustaAssets.orbitMark} alt="Mark orbit terbuka EnvSusta" /><span>EnvSusta<small>FIELD GUIDE</small></span></a>
        <nav aria-label="Jelajahi landing page">{landingAnchorItems.map((item) => <a key={item.id} href={`#${item.targetId}`} className={activeLandingAnchor === item.id ? "active" : ""} aria-current={activeLandingAnchor === item.id ? "location" : undefined} onClick={(event) => { event.preventDefault(); navigateLandingAnchor(item); }}>{item.label}</a>)}</nav>
        <span className="landing-header-status" aria-live="polite"><i />{landingAnchorItems.find((item) => item.id === activeLandingAnchor)?.label}</span>
        <button className="landing-header-cta" onClick={() => goTo("library")}>Masuk tools <ArrowRight size={15} /></button>
      </header>
      <section className="welcome-panel workspace-hero">
        <div className="welcome-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />PETA LITERATUR SUSTAINABILITY · LOCAL-FIRST</div>
          <h1>Baca dengan arah.<br /><em>Terapkan dengan konteks.</em></h1>
          <p>Materi ringkas lintas topik sustainability, dari konsep, metode, dan standar hingga panduan penerapan awal.</p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={() => goTo("library")}>Jelajahi topik <ArrowDownRight size={18} /></button>
            <button className="quiet-action" onClick={() => goTo("learn")}>Baca literatur <ArrowRight size={17} /></button>
          </div>
          <p className="privacy-line"><Save size={14} /> Penanda topik dan catatan penerapan tersimpan di browser Anda.</p>
        </div>
        <div className="welcome-visual">
          <img src={envSustaAssets.hero} alt="Alat catatan dan pengukuran sustainability di atas meja lapangan" />
          <div className="visual-stamp"><span>READING ROUTE</span><b>{String(sustainabilityDomains.length).padStart(2, "0")}</b><small>TOPIC MODULES</small></div>
        </div>
      </section>

      <section className="workspace-snapshot" aria-label="Ringkasan literatur sustainability">
        <div className="snapshot-copy"><span className="section-kicker">PETA BACAAN</span><h2>Mulai dari pertanyaan yang ingin Anda pahami.</h2><p>Jelajahi konsep dan metode terlebih dahulu. Gunakan panduan terapan hanya saat Anda siap menerjemahkan materi ke praktik.</p><span className="observation-stamp">TOPIC · METHOD · PRACTICE</span></div>
        <div className="snapshot-stat"><strong>{sustainabilityDomains.length}</strong><span>topik tersedia</span></div>
        <div className="snapshot-stat"><strong>{activeDomains.length}</strong><span>topik ditandai</span></div>
        <div className="snapshot-stat"><strong>{completedTaskCount}/{totalTaskCount}</strong><span>langkah terapan</span></div>
      </section>

      <section className="landing-goals" id="landing-goals" aria-labelledby="landing-goal-title">
        <div className="landing-goals-intro"><span className="section-kicker">PILIH TITIK MASUK</span><h2 id="landing-goal-title">Mulai dari tujuan kerja Anda.</h2><p>Pilih tujuan, lalu persempit rute dengan standar, sektor, atau tingkat kesulitan pada Peta Topik.</p></div>
        <div className="landing-goal-grid">
          <button className="landing-goal-card goal-proper" onClick={() => beginGoalRoute("Kepatuhan PROPER")}><span className="goal-index">01 · COMPLIANCE</span><Building2 size={28} /><h3>Kepatuhan PROPER</h3><p>Telusuri SML, dokumen hijau, evidence, sumber daya, dan nature dari satu peta literatur.</p><span>Mulai rute <ArrowRight size={16} /></span></button>
          <button className="landing-goal-card goal-efficiency" onClick={() => beginGoalRoute("Efisiensi sumber daya")}><span className="goal-index">02 · IMPROVEMENT</span><TrendingDown size={26} /><h3>Efisiensi sumber daya</h3><p>Mulai dari energi, air, limbah, material, dan LCA untuk mengenali peluang perbaikan.</p><span>Mulai rute <ArrowRight size={16} /></span></button>
          <button className="landing-goal-card goal-disclosure" onClick={() => beginGoalRoute("Pengungkapan & disclosure")}><span className="goal-index">03 · DISCLOSURE</span><NotebookTabs size={26} /><h3>Pengungkapan & disclosure</h3><p>Pahami indikator, batas metode, sumber primer, dan bukti sebelum menyusun pelaporan.</p><span>Mulai rute <ArrowRight size={16} /></span></button>
        </div>
      </section>
      <div className="landing-route-connector" aria-hidden="true"><i /><span>GOAL SET → TOPIC MAP → SOURCE</span><i /></div>

      <section className="section-head domain-head" id="landing-topic-map"><div><h2>Peta topik sustainability</h2><p>Pilih domain untuk memahami konsep kunci, artefak metode, rujukan bukti, dan jalur penerapan awal.</p></div><button className="text-button" onClick={() => goTo("library")}>Buka topik <ArrowRight size={16} /></button></section>
      <section className="domain-overview-grid">
        {sustainabilityDomains.map((domain) => (
          <button key={domain.id} className={`domain-tile ${domain.tone} ${domain.id === "carbon" ? "recommended" : ""} ${activeDomains.includes(domain.id) ? "is-active" : ""}`} onClick={() => { setSelectedDomainId(domain.id); goTo("library"); }}>
            <div className="domain-tile-top"><span>{domain.number}</span><DomainIcon domainId={domain.id} size={20} /></div>
            <div><h3>{domain.shortTitle}</h3><p>{domain.summary}</p></div>
            {domain.id === "carbon" && <><span className="domain-specimen-note">FIELD SPECIMEN · GHG PROTOCOL · SOURCE VISIBLE</span><span className="domain-start-reason"><b>WHY START HERE</b><small>Kenali batas organisasi dan activity data sebelum memilih metode hitung.</small></span></>}
            <div className="domain-tile-bottom"><small>{activeDomains.includes(domain.id) ? "Topik ditandai" : domain.id === "carbon" ? "Direkomendasikan untuk mulai" : "Buka topik"}</small><ArrowDownRight size={17} /></div>
          </button>
        ))}
      </section>
      <div className="landing-route-connector route-after-map" aria-hidden="true"><i /><span>SELECTED TOPIC → METHOD NOTE → PRACTICE</span><i /></div>

      <section className="landing-fieldwork" aria-labelledby="fieldwork-title">
        <div className="landing-fieldwork-photo"><img src={envSustaAssets.learningAtlas} alt="Peta visual topik energi, air, material, emisi, dan nature" /><div><span>FIELD NOTE</span><b>Context comes first.</b><small>Metode selalu dibaca bersama batas penggunaannya.</small></div></div>
        <div className="landing-fieldwork-copy"><span className="section-kicker">SEBELUM MENGUKUR</span><h2 id="fieldwork-title">Pahami konteksnya, lalu pilih metodenya.</h2><p>Setiap modul menghubungkan konsep dengan artefak kerja dan sumber metode. Saat siap menerapkan, panduan terapan membantu menerjemahkannya menjadi langkah, bukti, dan output.</p><div className="landing-note-list"><span><i>01</i> Konsep yang perlu dipahami</span><span><i>02</i> Metode dan batas penggunaan</span><span><i>03</i> Bukti dan langkah penerapan</span></div><span className="fieldwork-route-chip">TOPIC SELECTED → METHOD CHECKED → PRACTICE READY</span><button className="quiet-action" onClick={() => goTo("learn")}>Lihat cara membaca literatur <ArrowRight size={16} /></button></div>
      </section>

      <section className="two-column-section">
        <div className="panel-card compass-card">
          <div className="panel-card-head"><div><span className="section-kicker">ALUR KERJA</span><h3>Gunakan 3 gerakan sederhana</h3></div><CircleHelp size={19} /></div>
          <span className="reading-state">ROUTE 01/03 · PILIH</span>
          <div className="compass-options">
            <button onClick={() => goTo("library")}><span className="compass-icon"><NotebookTabs size={18} /></span><span><b>1. Pilih topik</b><small>Mulai dari isu atau materi yang paling relevan untuk Anda.</small></span><ChevronRight size={18} /></button>
            <button onClick={() => goTo("learn")}><span className="compass-icon"><BookOpen size={18} /></span><span><b>2. Baca konsep dan metode</b><small>Pahami istilah, artefak kerja, dan batas penggunaan metode.</small></span><ChevronRight size={18} /></button>
            <button onClick={() => goTo("plan")}><span className="compass-icon"><Target size={18} /></span><span><b>3. Gunakan panduan terapan</b><small>Terjemahkan materi menjadi langkah kerja bila memang diperlukan.</small></span><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="panel-card signal-card">
          <div className="panel-card-head"><div><span className="section-kicker">MODE PENGGUNAAN</span><h3>Literatur-first</h3></div><span className="local-badge"><span /> Lokal</span></div>
          <span className="reading-state">ROUTE 02/03 · BACA</span>
          <div className="signal-number"><strong>Literatur</strong><span>konsep → metode → penerapan</span></div>
          <p>EnvSusta bukan dashboard kinerja. Pilih materi, pahami pendekatannya, lalu gunakan kalkulator atau playbook hanya ketika topik memang memerlukannya.</p>
          <div className="signal-footer"><span><Save size={14} /> {savedAt}</span><button onClick={() => goTo("library")}>Jelajahi topik <ArrowRight size={15} /></button></div>
        </div>
      </section>

      <section className="landing-method-band" id="landing-method">
        <div><span className="section-kicker">METODE SAAT DIBUTUHKAN</span><h2>Perhitungan bukan titik awal semua topik.</h2><p>E-Calc tersedia sebagai worksheet ilustratif pada materi karbon. Ia membantu memahami alur activity data dan faktor emisi, bukan menggantikan inventaris formal atau sumber primer.</p></div>
        <aside><img src={envSustaAssets.orbitMark} alt="" /><div><span>OPTIONAL WORKSHEET</span><b>E-Calc</b><small>Metode demo untuk materi karbon</small></div><button className="primary-action" onClick={() => goTo("calculator")}>Buka E-Calc <ArrowRight size={16} /></button></aside>
      </section>

      <section className="landing-cta" aria-labelledby="landing-cta-title"><div><span className="section-kicker">BUKA RUTE BACA</span><h2 id="landing-cta-title">Temukan topik yang paling dekat dengan pekerjaan Anda.</h2><p>Mulai dari tujuan, lanjutkan ke sumber dan metode, lalu gunakan panduan terapan ketika Anda membutuhkannya.</p></div><div><button className="primary-action" onClick={() => goTo("library")}>Jelajahi peta topik <ArrowDownRight size={17} /></button><button className="quiet-action" onClick={() => goTo("plan")}>Buka panduan terapan <ArrowRight size={16} /></button></div></section>

      <footer className="landing-footer"><div className="landing-footer-brand"><img src={envSustaAssets.orbitMark} alt="Mark orbit terbuka EnvSusta" /><div><b>EnvSusta</b><span>Literatur sustainability, tanpa kehilangan arah.</span></div></div><p>Local-first. Baca konteks, telusuri metode, simpan catatan di perangkat Anda.</p><button className="text-button" onClick={() => goTo("library")}>Masuk ke literatur <ArrowRight size={16} /></button></footer>
    </>
  );

  const renderCalculator = () => (
    <>
      <section className="page-intro calc-intro">
        <div><span className="eyebrow"><span className="eyebrow-dot" />METODE HITUNG OPSIONAL · E-CALC</span><h1>Uji contoh hitung karbon<br /><em>dengan konteks.</em></h1><p>E-Calc adalah pelengkap materi karbon. Gunakan saat Anda perlu memahami alur estimasi, bukan sebagai pusat seluruh tools.</p></div>
        <img src={envSustaAssets.carbonOrbit} alt="Ilustrasi orbit pengukuran jejak karbon" />
      </section>
      <section className="calculator-layout">
        <form className="panel-card calculation-form" onSubmit={(event: FormEvent) => { event.preventDefault(); activateDomain("carbon"); toast("Estimasi awal diperbarui dan tersimpan lokal."); }}>
          <div className="panel-card-head"><div><span className="section-kicker">CONTOH AKTIVITAS</span><h2>Coba perhitungan</h2></div><span className="step-chip">E-CALC</span></div>
          <p className="form-lead">Masukkan angka penuh, termasuk beberapa digit, untuk melihat bagaimana activity data dikonversi menjadi estimasi. Nilai hanya disimpan sebagai worksheet lokal dan tidak akan di-reset ketika Anda berpindah field.</p>
          <div className="input-stack">
            <label className="input-row"><span className="input-icon teal"><PlugZap size={18} /></span><span className="input-copy"><b>Listrik yang dibeli</b><small>Scope 2 · kWh per periode</small></span><span className="number-field"><input inputMode="decimal" value={inputs.electricity} onChange={changeInput("electricity")} placeholder="Contoh: 1250" aria-label="Listrik dalam kWh" autoComplete="off" /><em>kWh</em></span></label>
            <label className="input-row"><span className="input-icon orange"><Flame size={18} /></span><span className="input-copy"><b>Solar / diesel</b><small>Scope 1 · liter per periode</small></span><span className="number-field"><input inputMode="decimal" value={inputs.diesel} onChange={changeInput("diesel")} placeholder="Contoh: 80" aria-label="Solar dalam liter" autoComplete="off" /><em>L</em></span></label>
            <label className="input-row"><span className="input-icon charcoal"><Route size={18} /></span><span className="input-copy"><b>Perjalanan operasional</b><small>Scope 3 · km kendaraan</small></span><span className="number-field"><input inputMode="decimal" value={inputs.transport} onChange={changeInput("transport")} placeholder="Contoh: 430" aria-label="Perjalanan dalam kilometer" autoComplete="off" /><em>km</em></span></label>
            <label className="input-row"><span className="input-icon clay"><Recycle size={18} /></span><span className="input-copy"><b>Limbah operasional</b><small>Scope 3 · kg per periode</small></span><span className="number-field"><input inputMode="decimal" value={inputs.waste} onChange={changeInput("waste")} placeholder="Contoh: 250" aria-label="Limbah dalam kilogram" autoComplete="off" /><em>kg</em></span></label>
          </div>
          <div className="form-footer"><button type="button" className="quiet-action" onClick={() => setShowMethod((current) => !current)}><CircleHelp size={16} /> {showMethod ? "Tutup asumsi" : "Lihat asumsi"}</button><button type="submit" className="primary-action">Simpan estimasi <ArrowRight size={17} /></button></div>
          {showMethod && <div className="method-note"><b>Metode demo yang terlihat</b><p>Hasil dihitung dari data aktivitas × faktor ilustratif: listrik 0,82 kgCO₂e/kWh, diesel 2,68 kgCO₂e/L, transport 0,18 kgCO₂e/km, limbah 0,45 kgCO₂e/kg. Faktor, GWP, batas organisasi, dan sumber harus disesuaikan sebelum menggunakan hasil untuk pelaporan formal.</p></div>}
        </form>
        <aside className="result-column">
          <div className="result-card">
            <div className="result-kicker"><span>ESTIMASI GROSS</span><span className="quality-tag">Demo</span></div>
            <div className="orbit-meter"><div className="orbit-outer" /><div className="orbit-middle" /><div className="orbit-core"><strong>{calculation.hasData ? formatNumber(calculation.totalTons, 2) : "0,00"}</strong><small>tCO₂e</small></div><span className="orbit-tick" /></div>
            <h2>{calculation.hasData ? "Contoh hasil hitung" : "Belum ada contoh hitung"}</h2>
            <p>{calculation.hasData ? "Gunakan hasil untuk memahami sumber dominan dan alur metode. Gross emissions tetap dipisahkan dari offset, credit, atau allowance." : "Masukkan satu aktivitas untuk melihat bagaimana metode menghitung sebuah estimasi. Baca materi karbon untuk konteks dan batasannya."}</p>
            <button className="result-link" onClick={() => { setSelectedDomainId("carbon"); goTo("learn"); }}>Baca materi karbon <ArrowRight size={16} /></button>
          </div>
          <div className="breakdown-card"><div className="panel-card-head"><div><span className="section-kicker">KONTRIBUSI KARBON</span><h3>Menurut sumber data</h3></div><MoreHorizontal size={19} /></div>{[
            ["Listrik", calculation.electricity, "Scope 2", "teal"], ["Solar / diesel", calculation.diesel, "Scope 1", "orange"], ["Perjalanan", calculation.transport, "Scope 3", "charcoal"], ["Limbah", calculation.waste, "Scope 3", "clay"],
          ].map(([label, value, scope, tone]) => { const numericValue = value as number; const width = calculation.totalKg ? Math.max((numericValue / calculation.totalKg) * 100, 2) : 0; return <div className="breakdown-row" key={label as string}><div><span>{label}</span><small>{scope}</small></div><div className="breakdown-bar"><i className={tone as string} style={{ width: `${width}%` }} /></div><b>{formatNumber(numericValue / 1000, 2)} t</b></div>; })}</div>
        </aside>
      </section>
      <section className="calculator-callout"><div><span className="section-kicker">BATAS PENGGUNAAN</span><h3>E-Calc adalah bagian dari materi karbon.</h3><p>Hasil demo tidak menggantikan inventaris formal. Baca terlebih dahulu batas organisasi, faktor emisi, periode, Scope 1–3, dan prinsip pemisahan gross emissions dari unit karbon.</p></div><button className="quiet-action" onClick={() => { setSelectedDomainId("carbon"); goTo("learn"); }}>Baca materi karbon <ArrowRight size={17} /></button></section>
    </>
  );

  const renderLearn = () => (
    <>
      <section className="page-intro learn-intro"><div><span className="eyebrow"><span className="eyebrow-dot" />PERPUSTAKAAN PANDUAN</span><h1>Pahami topiknya.<br /><em>Kenali metodenya.</em></h1><p>{sustainabilityDomains.length} modul memperkenalkan konsep, artefak metode, rujukan bukti, dan batas penggunaan sebelum Anda memutuskan untuk menerapkannya.</p><span className="route-stamp">TOPIC → METHOD → PRACTICE</span></div><div className="learning-stat"><img src={envSustaAssets.orbitMark} alt="" /><span>MODUL TERSEDIA</span><strong>{String(sustainabilityDomains.length).padStart(2, "0")}</strong><p>dari karbon, LCA, SML, hingga PROPER readiness.</p></div></section>
      <section className="learning-layout">
        <nav className="lesson-nav extended" aria-label="Daftar materi">{sustainabilityDomains.map((domain) => <button className={selectedDomain.id === domain.id ? "selected" : ""} key={domain.id} onClick={() => setSelectedDomainId(domain.id)}><span>{domain.number}</span><DomainIcon domainId={domain.id} size={19} /><div><b>{domain.shortTitle}</b><small>{domain.lessonMinutes}</small></div><ChevronRight size={17} /></button>)}</nav>
        <article className="lesson-article domain-lesson">
          <div className={`lesson-hero ${selectedDomain.tone}`}><img src={envSustaAssets.learningAtlas} alt="Peta belajar sustainability dengan energi, air, material, emisi, dan nature" /><div><span className="section-kicker">MODUL {selectedDomain.number}</span><h2>{selectedDomain.title}</h2><p>{selectedDomain.summary}</p></div></div>
          <div className="article-body"><div className="article-copy"><p>{selectedDomain.description}</p><p><b>Jika akan diterapkan:</b> {selectedDomain.firstAction}</p></div><aside className="field-note"><span>RUJUKAN MULAI</span><b>Sumber primer</b><ul className="source-list">{literatureSources[selectedDomain.id].map((source) => <li key={source.title}>{source.href ? <a href={source.href} target="_blank" rel="noreferrer">{source.title}</a> : <strong>{source.title}</strong>}<small>{source.note}</small></li>)}</ul></aside></div>
          <div className="lesson-detail-grid"><div><span>KONSEP & INDIKATOR KUNCI</span>{selectedDomain.metrics.map((item) => <b key={item}>{item}</b>)}</div><div><span>ARTEFAK METODE</span>{selectedDomain.dataPoints.map((item) => <b key={item}>{item}</b>)}</div></div>
          <div className="lesson-actions"><button className="primary-action" onClick={() => activateDomain(selectedDomain.id, "plan")}>Buka panduan terapan <ArrowRight size={17} /></button><button className="quiet-action" onClick={() => activateDomain(selectedDomain.id, "library")}>Lihat ringkasan topik <ArrowRight size={16} /></button></div>
        </article>
      </section>
    </>
  );

  const renderPlan = () => (
    <>
      <section className="page-intro plan-intro">
        <div><span className="eyebrow"><span className="eyebrow-dot" />PANDUAN PENERAPAN</span><h1>Dari materi<br /><em>ke praktik kontekstual.</em></h1><p>Gunakan panduan ini setelah memahami materi. Setiap jalur menerjemahkan konsep menjadi langkah kerja, artefak, dan output yang dapat direview.</p><span className="route-stamp">CONCEPT → METHOD → OWNER → REVIEW</span></div>
        <div className="plan-orbit"><strong>{completion}%</strong><span>langkah terapan</span></div>
      </section>
      <section className="playbook-layout">
        <aside className="playbook-rail" aria-label="Pilih playbook domain">
          <div className="playbook-rail-head"><span className="section-kicker">PILIH PANDUAN</span><p>Pilih panduan setelah membaca materi yang paling dekat dengan konteks Anda.</p></div>
          {sustainabilityDomains.map((domain) => {
            const playbook = actionPlaybooks.find((item) => item.domainId === domain.id) ?? actionPlaybooks[0];
            const done = playbookProgress[playbook.domainId].filter(Boolean).length;
            return <button className={selectedPlaybook.domainId === playbook.domainId ? "selected" : ""} key={playbook.domainId} onClick={() => { setSelectedDomainId(playbook.domainId); activateDomain(playbook.domainId); }}><span className="playbook-domain-icon"><DomainIcon domainId={playbook.domainId} size={17} /></span><span><b>{domain.shortTitle}</b><small>{done}/{playbook.steps.length} langkah</small></span><ChevronRight size={16} /></button>;
          })}
        </aside>
        <article className={`playbook-canvas ${selectedDomain.tone}`}>
          <header className="playbook-head"><div className="playbook-number"><DomainIcon domainId={selectedPlaybook.domainId} size={26} /><span>PLAYBOOK {selectedDomain.number}</span></div><div><span className="section-kicker">UNTUK {selectedPlaybook.role.toUpperCase()}</span><h2>{selectedDomain.title}</h2><p>{selectedPlaybook.goal}</p></div><div className="playbook-count"><b>{selectedPlaybookCompleteCount}/{selectedPlaybook.steps.length}</b><small>langkah selesai</small></div></header>
          <section className="playbook-orientation"><div><span>HASIL 7 HARI PERTAMA</span><p>{selectedPlaybook.firstWeek}</p></div><div><span>CATATAN KEHATI-HATIAN</span><p>{selectedPlaybook.caution}</p></div></section>
          <section className="playbook-steps" aria-label={`Langkah penerapan ${selectedDomain.title}`}>
            {selectedPlaybook.steps.map((step, index) => <article className={`playbook-step ${selectedPlaybookProgress[index] ? "done" : ""}`} key={step.title}>
              <div className="step-index"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
              <div className="step-main"><span className="step-kicker">LANGKAH KERJA</span><h3>{step.title}</h3><p>{step.instruction}</p></div>
              <div className="step-detail"><span>ARTEFAK / RUJUKAN KERJA</span><p>{step.evidence}</p><span>OUTPUT KERJA</span><b>{step.output}</b></div>
              <div className="step-done"><p><b>Selesai ketika:</b> {step.doneWhen}</p><label><input type="checkbox" checked={selectedPlaybookProgress[index]} onChange={() => togglePlaybookStep(selectedPlaybook.domainId, index)} /><span>{selectedPlaybookProgress[index] ? "Sudah ditandai" : "Tandai saat diterapkan"}</span></label></div>
            </article>)}
          </section>
          <footer className="playbook-footer"><div><span className="section-kicker">NEXT BEST MOVE</span><p>{selectedPlaybookCompleteCount === selectedPlaybook.steps.length ? "Playbook selesai. Tinjau output bersama pemilik data dan pilih domain material berikutnya." : "Selesaikan satu langkah berikutnya dengan bukti yang mudah dikumpulkan. Hindari memulai semua domain sekaligus."}</p></div><button className="quiet-action" onClick={() => goTo("library")}>Buka Navigator <ArrowRight size={16} /></button></footer>
        </article>
      </section>
    </>
  );

  const renderLibrary = () => (
    <>
      <section className="page-intro library-intro"><div><span className="eyebrow"><span className="eyebrow-dot" />PETA TOPIK SUSTAINABILITY</span><h1>Seluruh topik.<br /><em>Satu peta literatur.</em></h1><p>Pilih topik untuk melihat konsep, artefak metode, rujukan kerja, dan jalur penerapan awal. Anda tidak perlu memulai dari emisi.</p><span className="route-stamp">10 TOPIC MODULES · SOURCE VISIBLE · CONTEXT FIRST</span></div><div className="library-side-note"><img src={envSustaAssets.orbitMark} alt="" /><b>Prinsip pembacaan</b><span>context first · source visible · method bounded</span></div></section>
      <section className="literature-filter-panel" aria-label="Cari dan filter literatur">
        <div className="filter-panel-head"><div><span className="section-kicker">CARI LITERATUR</span><h2>Temukan materi yang relevan.</h2></div><p>Mulai dari tujuan Anda, lalu persempit dengan standar, sektor, atau tingkat kesulitan. Hasil diperbarui saat Anda menyaringnya.</p><div className="filter-route-note"><img src={envSustaAssets.orbitMark} alt="" /><div><span>READING PATH</span><b>{selectedDomain.shortTitle}</b><small>topik aktif untuk ditelusuri</small></div></div></div>
        <div className="filter-controls">
          <label className="filter-field filter-search"><span>Kata kunci</span><div><Search size={17} /><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.currentTarget.value)} placeholder="Contoh: LCA, air, PROPER" aria-label="Cari topik literatur" /></div></label>
          <label className="filter-field filter-goal"><span>Tujuan pengguna</span><select value={selectedGoal} onChange={(event) => setSelectedGoal(event.currentTarget.value as UserGoal | "")} aria-label="Filter tujuan pengguna"><option value="">Semua tujuan</option>{userGoalOptions.map((goal) => <option key={goal} value={goal}>{goal}</option>)}</select></label>
          <label className="filter-field"><span>Standar / metode</span><select value={selectedStandard} onChange={(event) => setSelectedStandard(event.currentTarget.value)} aria-label="Filter standar atau metode"><option value="">Semua standar</option>{standardOptions.map((standard) => <option key={standard} value={standard}>{standard}</option>)}</select></label>
          <label className="filter-field"><span>Sektor industri</span><select value={selectedSector} onChange={(event) => setSelectedSector(event.currentTarget.value)} aria-label="Filter sektor industri"><option value="">Semua sektor</option>{sectorOptions.map((sector) => <option key={sector} value={sector}>{sector}</option>)}</select></label>
          <label className="filter-field"><span>Tingkat kesulitan</span><select value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.currentTarget.value as Difficulty | "")} aria-label="Filter tingkat kesulitan"><option value="">Semua tingkat</option><option value="Pemula">Pemula</option><option value="Menengah">Menengah</option><option value="Lanjutan">Lanjutan</option></select></label>
        </div>
        <div className="filter-status" aria-live="polite"><span><b>{filteredDomains.length}</b> dari {sustainabilityDomains.length} topik ditemukan</span><span className="filter-journey">OPEN ORBIT · FILTER → TOPIC → SOURCE</span>{hasActiveFilters && <button onClick={resetLiteratureFilters}><X size={14} /> Reset filter</button>}</div>
      </section>
      {filteredDomains.length ? <><section className="library-grid expanded">{filteredDomains.map((domain) => <button className={`library-card ${domain.id === "carbon" ? "recommended" : ""} ${selectedDomain.id === domain.id ? "selected featured" : ""} ${activeDomains.includes(domain.id) ? "is-active" : ""}`} key={domain.id} onClick={() => setSelectedDomainId(domain.id)}><span>{domain.number}</span>{selectedDomain.id === domain.id && <div className="specimen-route"><span>FIELD SPECIMEN</span><i /><small>filter → topik → sumber</small></div>}<div className="library-icon"><DomainIcon domainId={domain.id} size={23} /></div><h2>{domain.shortTitle}</h2><p>{domain.summary}</p><div className="library-meta"><span>{domain.difficulty}</span><span>{domain.standards[0]}</span><span className="goal-chip">{domain.goals[0]}</span></div><div><small>{activeDomains.includes(domain.id) ? "Topik ditandai" : domain.id === "carbon" ? "Mulai dari sini" : "Buka ringkasan"}</small><ArrowRight size={17} /></div></button>)}</section>
      <section className={`domain-explorer ${selectedDomain.tone}`} aria-live="polite">
        <div className="explorer-route"><img src={envSustaAssets.orbitMark} alt="" /><span>ACTIVE READING ROUTE</span><i /><b>{selectedDomain.shortTitle}</b><small>konsep · metode · sumber · langkah terapan</small></div>
        <div className="explorer-head"><div className="explorer-icon"><DomainIcon domainId={selectedDomain.id} size={28} /></div><div><span className="section-kicker">TOPIK {selectedDomain.number}</span><h2>{selectedDomain.title}</h2><p>{selectedDomain.description}</p><span className="explorer-source-stamp">METHOD NOTE · CONCEPT → ARTIFACT → PRACTICE</span></div><button className={activeDomains.includes(selectedDomain.id) ? "active-domain-button" : "primary-action"} onClick={() => activateDomain(selectedDomain.id)}>{activeDomains.includes(selectedDomain.id) ? "Topik ditandai" : "Tandai topik"} <Check size={16} /></button></div>
        <div className="domain-metadata"><div><span>TINGKAT</span><b>{selectedDomain.difficulty}</b></div><div><span>STANDAR / METODE</span><p>{selectedDomain.standards.join(" · ")}</p></div><div><span>SEKTOR</span><p>{selectedDomain.sectors.join(" · ")}</p></div><div className="goal-metadata"><span>TUJUAN PENGGUNA</span><p>{selectedDomain.goals.join(" · ")}</p></div></div>
        <div className="explorer-grid"><div><span>ARTEFAK METODE</span>{selectedDomain.dataPoints.map((item) => <p key={item}><Check size={14} /> {item}</p>)}</div><div><span>KONSEP & INDIKATOR</span>{selectedDomain.metrics.map((item) => <p key={item}><LineChart size={14} /> {item}</p>)}</div><div><span>RUJUKAN & BUKTI KERJA</span>{selectedDomain.evidence.map((item) => <p key={item}><Save size={14} /> {item}</p>)}</div></div>
        <div className="explorer-footer"><p><b>Jika akan diterapkan:</b> {selectedDomain.firstAction}</p><div><button className="quiet-action" onClick={() => openDomainLearning(selectedDomain.id)}>Baca materi <ArrowRight size={16} /></button><button className="primary-action" onClick={() => activateDomain(selectedDomain.id, "plan")}>Buka panduan terapan <ArrowRight size={16} /></button></div></div>
      </section>
      <section className="reference-strip"><div><span className="section-kicker">BATAS DAN SUMBER METODE</span><h3>Setiap materi perlu dibaca bersama konteks, versi metode, dan batas penggunaannya.</h3></div><div><p>EnvSusta menyimpan penanda topik, progres panduan, dan worksheet metode secara lokal. Untuk kerja formal, selalu gunakan sumber primer, ketentuan sektor, serta versi standar yang berlaku.</p><button className="quiet-action" onClick={() => downloadReadingNotes(inputs, playbookProgress, activeDomains)}><Download size={16} /> Unduh catatan literatur</button></div></section></> : <section className="empty-literature-state"><Search size={22} /><span className="section-kicker">TIDAK ADA HASIL</span><h2>Belum ada materi yang cocok.</h2><p>Coba kata kunci lain atau kosongkan satu atau beberapa filter untuk memperluas peta literatur.</p><button className="primary-action" onClick={resetLiteratureFilters}>Kosongkan filter <X size={16} /></button></section>}
    </>
  );

  const pageTitle: Record<ViewId, string> = { overview: "Mulai", calculator: "Metode hitung · E-Calc", learn: "Literatur sustainability", plan: "Panduan penerapan", library: "Peta topik sustainability" };
  const pageContent = activeView === "overview"
    ? renderOverview()
    : activeView === "calculator"
      ? renderCalculator()
      : activeView === "learn"
        ? renderLearn()
        : activeView === "plan"
          ? renderPlan()
          : renderLibrary();

  const isLanding = activeView === "overview";

  if (isLanding) {
    return <div className="landing-shell">
      <a className="skip-link" href="#workspace-main">Lewati ke konten utama</a>
      <main className="landing-workspace" id="workspace-main">
        <div className="workspace-content">{pageContent}</div>
      </main>
    </div>;
  }

  return <div className="envsusta-shell">
    <a className="skip-link" href="#workspace-main">Lewati ke konten utama</a>
    <aside className="sidebar">
      <div className="brand-block"><button className="brand" onClick={() => goTo("overview")} aria-label="EnvSusta, kembali ke halaman Mulai"><img src={envSustaAssets.orbitMark} alt="" /><span>EnvSusta</span></button><p>Literatur sustainability<br />tanpa kehilangan arah.</p></div>
      <nav className="main-nav" aria-label="Navigasi utama">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={activeView === item.id ? "active" : ""} onClick={() => goTo(item.id)}><Icon size={19} /><span>{item.label}</span>{item.note && <em>{item.note}</em>}</button>; })}</nav>
      <div className="sidebar-footer"><div className="local-state"><span><Save size={14} /> Catatan lokal</span><p>Penanda topik, langkah panduan, dan worksheet metode tersimpan di browser Anda.</p></div><button className="profile-mini" onClick={() => goTo("library")}><span>ES</span><div><b>Rute bacaan pribadi</b><small>{activeDomains.length ? `${activeDomains.length} topik ditandai` : "Pilih topik awal"}</small></div><Settings2 size={16} /></button></div>
    </aside>

    <header className="mobile-topbar"><button onClick={() => setMobileMenuOpen(true)} aria-label="Buka navigasi"><Menu size={21} /></button><button className="brand" onClick={() => goTo("overview")}><img src={envSustaAssets.orbitMark} alt="" /><span>EnvSusta</span></button><button onClick={() => downloadReadingNotes(inputs, playbookProgress, activeDomains)} aria-label="Unduh catatan literatur"><Download size={20} /></button></header>
    {mobileMenuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigasi utama"><div className="mobile-menu-top"><button className="brand" onClick={() => goTo("overview")}><img src={envSustaAssets.orbitMark} alt="" /><span>EnvSusta</span></button><button onClick={() => setMobileMenuOpen(false)} aria-label="Tutup navigasi"><X size={22} /></button></div>{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={activeView === item.id ? "active" : ""} onClick={() => goTo(item.id)}><Icon size={19} />{item.label}<ChevronRight size={17} /></button>})}<div className="mobile-menu-foot"><Save size={15} /> Catatan literatur tersimpan di perangkat ini.</div></div>}

    <main className="workspace workspace-enter" id="workspace-main" key={activeView}>
      <header className="workspace-topbar"><div><button className="back-home-link" onClick={() => goTo("overview")}><ArrowLeft size={14} /> Kembali ke beranda</button><span className="breadcrumb">ENVSUSTA / LITERATURE GUIDE</span><h2>{pageTitle[activeView]}</h2></div><div className="topbar-actions"><span className="autosave"><i />{savedAt}</span><button className="top-button" onClick={() => downloadReadingNotes(inputs, playbookProgress, activeDomains)}><Download size={16} /> Catatan</button><button className="top-button icon-only" onClick={resetWorkspace} aria-label="Reset catatan lokal"><RotateCcw size={16} /></button></div></header>
      <div className="workspace-content">{pageContent}</div>
    </main>
    <nav className="mobile-bottom-nav" aria-label="Navigasi cepat">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={activeView === item.id ? "active" : ""} onClick={() => goTo(item.id)}><Icon size={18} /><span>{item.label}</span></button>; })}</nav>
  </div>;
}
