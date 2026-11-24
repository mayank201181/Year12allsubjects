// ---------------------------------------------------------------------------
// Central registry of all 8 Year 12–13 IB Diploma Subject Study-Guide Apps
// for Vanishree (Tanglin Trust School, Singapore · Aug 2027 – May 2029).
// ---------------------------------------------------------------------------

export type IBGroup = 1 | 2 | 3 | 4 | 5;
export type SelectionLevel = "off" | "SL" | "HL";

export interface SubjectSpec {
  id: string;
  repo: string;
  url: string;
  name: string;
  shortName: string;
  group: IBGroup;
  groupLabel: string;
  icon: string;
  accentHex: string;
  guideYear: string;
  provisionalStamp: string | null;
  tagline: string;
  slPapers: number;
  hlPapers: number;
  slSummary: string;
  hlSummary: string;
  iaTitle: string;
  iaWeightSL: string;
  iaWeightHL: string;
  iaTiming: string;
  topicsCount: number;
  highlights: string[];
}

export const PROVISIONAL_FA2029_STAMP =
  "Provisional: aligned to FA2029 subject brief; full guide due Feb 2027";

export const IB_GROUPS: { group: IBGroup; title: string; subtitle: string }[] = [
  { group: 1, title: "Group 1 · Studies in Language & Literature", subtitle: "Transferable literary craft across 4 forms (zero set texts assumed)" },
  { group: 2, title: "Group 2 · Language Acquisition", subtitle: "Post-IGCSE B1→B2/C1 Hispanic culture, grammar & oral fluency" },
  { group: 3, title: "Group 3 · Individuals & Societies", subtitle: "Empirical inquiry, quantitative policy modelling & real-world analysis" },
  { group: 4, title: "Group 4 · Sciences", subtitle: "FA2025 conceptual themes — Paper 1A + 1B + Paper 2 (Paper 3 abolished)" },
  { group: 5, title: "Group 5 · Mathematics", subtitle: "Pure analytical inquiry, proof & TI-Nspire CX modelling" },
];

export const SUBJECTS: readonly SubjectSpec[] = [
  {
    id: "englishlit",
    repo: "Year12englishlit",
    url: "https://year12englishlit.vercel.app",
    name: "English A: Literature",
    shortName: "English Lit",
    group: 1,
    groupLabel: "Group 1 · Language A",
    icon: "✒️",
    accentHex: "#be123c",
    guideYear: "FA2021",
    provisionalStamp: null,
    tagline: "3 Areas of Exploration, 4 literary forms, 7 concepts & zero assumed set texts.",
    slPapers: 2,
    hlPapers: 2,
    slSummary: "P1 35% (1 unseen, 1h 15m) · P2 35% (1h 45m) · IO IA 30% (9 works min)",
    hlSummary: "P1 35% (2 unseen, 2h 15m) · P2 25% · HL Essay 20% (1,200–1,500w) · IO IA 20% (13 works)",
    iaTitle: "Individual Oral (15m, 40m) + HL Essay [HL]",
    iaWeightSL: "30%",
    iaWeightHL: "20% IO + 20% HLE",
    iaTiming: "DP2 Term 1–2",
    topicsCount: 8,
    highlights: ["Non-prescriptive craft", "IO Global Issue Funnel", "HL Essay 1,200–1,500w"],
  },
  {
    id: "spanishb",
    repo: "Year12spanishb",
    url: "https://year12spanishb.vercel.app",
    name: "Spanish B (Post-IGCSE)",
    shortName: "Spanish B",
    group: 2,
    groupLabel: "Group 2 · Language B",
    icon: "🇪🇸",
    accentHex: "#c2410c",
    guideYear: "FA2029 Brief",
    provisionalStamp: PROVISIONAL_FA2029_STAMP,
    tagline: "5 Prescribed Themes, B1–C1 Vocab Hub with audio, accent keypad & HL Literature.",
    slPapers: 3,
    hlPapers: 3,
    slSummary: "P1 Writing 25% (250–400w) · P2 Reading 25% + Listening 25% · Visual IO 25% (15m prep)",
    hlSummary: "P1 Writing 25% (450–600w) · P2 Reading 25% + Listening 25% · Literary IO 25% (20m prep)",
    iaTitle: "Individual Oral (Visual SL / Literary HL)",
    iaWeightSL: "25%",
    iaWeightHL: "25%",
    iaTiming: "DP2 Term 2",
    topicsCount: 8,
    highlights: ["1,000+ B1–C1 Vocab + TTS", "Accent keypad áéíóúñ", "Subjunctive & 15 text types"],
  },
  {
    id: "psychology",
    repo: "Year12psychology",
    url: "https://year12psychology.vercel.app",
    name: "Psychology",
    shortName: "Psychology",
    group: 3,
    groupLabel: "Group 3 · Individuals & Societies",
    icon: "🧠",
    accentHex: "#7c3aed",
    guideYear: "NEW FA2027",
    provisionalStamp: null,
    tagline: "Brand-new 2027 guide: 6 Concepts × 3 Approaches × 4 Contexts + Research Proposal IA.",
    slPapers: 2,
    hlPapers: 3,
    slSummary: "P1 35% (SAQ + Unseen Context + Concept ERQ) · P2 35% (Class Practicals) · Proposal IA 30%",
    hlSummary: "P1 25% · P2 25% · P3 30% (Culture/Motivation/Tech Data Analysis) · Proposal IA 20%",
    iaTitle: "Research Proposal (2,200w, NO data collection)",
    iaWeightSL: "30%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 3 – DP2 Term 1",
    topicsCount: 8,
    highlights: ["6 Concepts × 4 Contexts", "4 Class Practicals", "No data collection IA"],
  },
  {
    id: "economics",
    repo: "Year12economics",
    url: "https://year12economics.vercel.app",
    name: "Economics",
    shortName: "Economics",
    group: 3,
    groupLabel: "Group 3 · Individuals & Societies",
    icon: "📈",
    accentHex: "#b45309",
    guideYear: "FA2022",
    provisionalStamp: null,
    tagline: "Units 1–4, 9 Key Concepts, real-world Paper 1b bank & HL Paper 3 quant policy.",
    slPapers: 2,
    hlPapers: 3,
    slSummary: "P1 Extended 30% (1h 15m) · P2 Data Response 40% (1h 45m) · 3-Commentary IA 30%",
    hlSummary: "P1 20% · P2 30% · P3 Quantitative & 10m Policy 30% (1h 45m) · 3-Commentary IA 20%",
    iaTitle: "Portfolio of 3 News Commentaries (3 × 800w)",
    iaWeightSL: "30%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 2 – DP2 Term 2",
    topicsCount: 8,
    highlights: ["9 Key Concepts", "HL Paper 3 Quant & Policy", "3×800w IA Portfolio"],
  },
  {
    id: "biology",
    repo: "Year12biology",
    url: "https://year12biology.vercel.app",
    name: "Biology",
    shortName: "Biology",
    group: 4,
    groupLabel: "Group 4 · Sciences",
    icon: "🧬",
    accentHex: "#15803d",
    guideYear: "FA2025",
    provisionalStamp: null,
    tagline: "All 40 official sub-topics A1.1–D4.3, stats toolkit (χ² / t-test / Lincoln) & no Paper 3.",
    slPapers: 3,
    hlPapers: 3,
    slSummary: "P1A+1B 36% (55m, 1h 30m) · P2 44% (50m, 1h 30m) · Scientific Investigation IA 20%",
    hlSummary: "P1A+1B 36% (75m, 2h) · P2 44% (80m, 2h 30m) · Scientific Investigation IA 20%",
    iaTitle: "Scientific Investigation (3,000w, 24m)",
    iaWeightSL: "20%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 3 – DP2 Term 1",
    topicsCount: 8,
    highlights: ["All 40 sub-topics A–D", "No Paper 3 (FA2025)", "Stats & χ² Lab"],
  },
  {
    id: "chemistry",
    repo: "Year12chemistry",
    url: "https://year12chemistry.vercel.app",
    name: "Chemistry",
    shortName: "Chemistry",
    group: 4,
    groupLabel: "Group 4 · Sciences",
    icon: "⚗️",
    accentHex: "#0f766e",
    guideYear: "FA2025",
    provisionalStamp: null,
    tagline: "Structure 1–3 & Reactivity 1–3 (S1.1–R3.4), mechanisms, spectroscopy & no Paper 3.",
    slPapers: 3,
    hlPapers: 3,
    slSummary: "P1A+1B 36% (55m, 1h 30m) · P2 44% (50m, 1h 30m) · Scientific Investigation IA 20%",
    hlSummary: "P1A+1B 36% (75m, 2h) · P2 44% (90m, 2h 30m) · Scientific Investigation IA 20%",
    iaTitle: "Scientific Investigation (3,000w, 24m)",
    iaWeightSL: "20%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 3 – DP2 Term 1",
    topicsCount: 8,
    highlights: ["Structure & Reactivity", "No Paper 3 (FA2025)", "NMR / Born–Haber / SN1–SN2"],
  },
  {
    id: "physics",
    repo: "Year12physics",
    url: "https://year12physics.vercel.app",
    name: "Physics",
    shortName: "Physics",
    group: 4,
    groupLabel: "Group 4 · Sciences",
    icon: "⚛️",
    accentHex: "#2563eb",
    guideYear: "FA2025",
    provisionalStamp: null,
    tagline: "Themes A–E (24 sub-topics A.1–E.5), uncertainties & Paper 1A+1B+2 (no Paper 3).",
    slPapers: 3,
    hlPapers: 3,
    slSummary: "P1A+1B 36% (45m, 1h 30m) · P2 44% (50m, 1h 30m) · Scientific Investigation IA 20%",
    hlSummary: "P1A+1B 36% (60m, 2h) · P2 44% (90m, 2h 30m) · Scientific Investigation IA 20%",
    iaTitle: "Scientific Investigation (3,000w, 24m)",
    iaWeightSL: "20%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 3 – DP2 Term 1",
    topicsCount: 10,
    highlights: ["Themes A–E (A.1–E.5)", "No Paper 3 (FA2025)", "Relativity & Quantum [HL]"],
  },
  {
    id: "mathsaa",
    repo: "Year12mathsaa",
    url: "https://year12mathsaa.vercel.app",
    name: "Mathematics: Analysis & Approaches",
    shortName: "Maths AA",
    group: 5,
    groupLabel: "Group 5 · Mathematics",
    icon: "∫",
    accentHex: "#4338ca",
    guideYear: "FA2029 Brief",
    provisionalStamp: PROVISIONAL_FA2029_STAMP,
    tagline: "Inquiry-process course, FA2029 cuts removed, TI-Nspire CX P2 & HL Paper 3 (1h/50m).",
    slPapers: 2,
    hlPapers: 3,
    slSummary: "P1 Non-GDC 40% (75m, 1h 30m) · P2 GDC 40% (75m, 1h 30m) · Inquiry IA 20%",
    hlSummary: "P1 Non-GDC 30% (100m, 2h) · P2 GDC 30% (100m, 2h) · P3 20% (50m, 1h) · Inquiry IA 20%",
    iaTitle: "Mathematical Exploration (Unified SL/HL Inquiry, 20m)",
    iaWeightSL: "20%",
    iaWeightHL: "20%",
    iaTiming: "DP1 Term 3 – DP2 Term 1",
    topicsCount: 8,
    highlights: ["FA2029 cuts excluded", "Unified SL/HL IA A4/B6/C4/D6", "TI-Nspire CX P2 & HL P3"],
  },
] as const;

/** Default example 3 HL + 3 SL pathway (e.g. Double Science substituting Group 6). */
export const DEFAULT_PLAN: Record<string, SelectionLevel> = {
  englishlit: "SL",
  spanishb: "SL",
  economics: "SL",
  psychology: "off",
  biology: "off",
  chemistry: "HL",
  physics: "HL",
  mathsaa: "HL",
};

export interface TanglinMilestone {
  term: string;
  window: string;
  focus: string;
  deliverables: string[];
}

export const TANGLIN_TIMELINE: readonly TanglinMilestone[] = [
  {
    term: "DP1 · Term 1",
    window: "Aug – Dec 2027",
    focus: "Foundations, CAS Launch & First Assessments",
    deliverables: [
      "Lock in 3 HL + 3 SL subject combination (final add/drop check)",
      "CAS Introductory Interview & begin regular weekly Creativity/Activity/Service",
      "Launch Learner Portfolio (English Lit) & first Economics news commentary hunt",
    ],
  },
  {
    term: "DP1 · Term 2",
    window: "Jan – Apr 2028",
    focus: "Extended Essay Launch & Core Frameworks",
    deliverables: [
      "Choose EE Pathway (Subject-focused or NEW 2027 Interdisciplinary) & supervisor",
      "Economics IA Commentary #1 (Microeconomics) & TOK Exhibition object shortlisting",
      "Plan collaborative CAS Project (≥ 1 month duration)",
    ],
  },
  {
    term: "DP1 · Term 3",
    window: "Apr – Jul 2028",
    focus: "IA Launches, TOK Exhibition & Service Week",
    deliverables: [
      "Maths AA Inquiry Exploration IA kickoff & Science IA research design / lab work",
      "Psychology Research Proposal IA design (no data collection!) & Year 12 Exams",
      "TOK Exhibition (950w, 33%) submission & Year 12 Service & Expedition Week",
    ],
  },
  {
    term: "DP2 · Term 4",
    window: "Aug – Dec 2028",
    focus: "Extended Essay Final, Science/Maths IAs & HL Essay",
    deliverables: [
      "Submit Extended Essay (4,000w + 500w Reflection after viva voce — Nov 2028)",
      "Complete Science IA (3,000w), Maths AA IA, Economics Commentaries #2–#3, HL Essay [HL]",
      "CAS Mid-Stage Interview & TOK Prescribed Titles released (Sept 2028)",
    ],
  },
  {
    term: "DP2 · Term 5",
    window: "Jan – May 2029",
    focus: "Orals, TOK Essay, Mock Exams & May 2029 Finals",
    deliverables: [
      "English A Individual Oral (15m) & Spanish B Individual Oral recordings",
      "Submit TOK Essay (1,600w, 67%) & complete Final CAS Portfolio Interview",
      "Mock Exams (Feb/Mar 2029) → IB Diploma External Exams (May 2029 — Cohort 1 FA2029 Maths/Spanish!)",
    ],
  },
];
