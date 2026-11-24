// ---------------------------------------------------------------------------
// Official IB Diploma Core Data for /core:
//  1. Theory of Knowledge (TOK — First Assessment 2022, all 35 IA Prompts)
//  2. Extended Essay (NEW First Assessment 2027 — 30 marks, Interdisciplinary
//     Pathway, single 500-word Reflection statement)
//  3. Creativity, Activity, Service (CAS — 3 Strands, 7 Learning Outcomes,
//     5 Stages, CAS Project & Tanglin 5-Term Schedule + Gold DofE)
// ---------------------------------------------------------------------------

export interface TokPrompt {
  id: number;
  text: string;
  tags: string[];
}

export const TOK_DATA = {
  guideLabel: "IBO TOK Guide · First Assessment 2022",
  coreTheme: {
    name: "Knowledge and the Knower",
    description:
      "Compulsory core theme examining yourself as a knower, communities of knowers, bias, epistemic responsibility, and how we justify knowledge claims.",
  },
  optionalThemes: [
    { name: "Knowledge and Technology", focus: "AI, algorithms, data curation, digital echo chambers & tool-mediated knowing." },
    { name: "Knowledge and Language", focus: "Translation, framing, metaphor, linguistic relativity & silencing." },
    { name: "Knowledge and Politics", focus: "Propaganda, power, institutional trust, statistics in policy & civic ethics." },
    { name: "Knowledge and Religion", focus: "Faith, revelation, authority, certainty & inter-tradition dialogue." },
    { name: "Knowledge and Indigenous Societies", focus: "Oral traditions, ecological knowledge, colonial erasure & ownership." },
  ],
  aoks: [
    { name: "History", icon: "📜", focus: "Primary vs secondary sources, hindsight, selection bias & competing narratives." },
    { name: "The Human Sciences", icon: "🧠", focus: "Observer effects, modelling human behaviour, ethics & cultural validity (Psychology / Economics)." },
    { name: "The Natural Sciences", icon: "⚛️", focus: "Falsifiability, paradigm shifts, idealised models & peer review (Physics / Chemistry / Biology)." },
    { name: "Mathematics", icon: "∫", focus: "Axiomatic proof, certainty vs real-world applicability, invented vs discovered." },
    { name: "The Arts", icon: "🎭", focus: "Aesthetic truth, authorial intent vs reception, representation & emotional knowledge (English Lit)." },
  ],
  knowledgeFramework: [
    { pillar: "Scope", question: "What counts as knowledge here, what are its boundaries, and what problems does it seek to solve?" },
    { pillar: "Perspectives", question: "How do cultural, historical, and individual viewpoints shape interpretation and disagreement?" },
    { pillar: "Methods & Tools", question: "What methodologies, instruments, models, and verification standards produce reliable knowledge?" },
    { pillar: "Ethics", question: "What responsibilities do knowers hold, and what ethical limits constrain how knowledge is pursued or used?" },
  ],
  assessments: {
    exhibition: {
      title: "TOK Exhibition (Internal Assessment)",
      weight: "33%",
      maxMarks: 10,
      maxWords: 950,
      summary:
        "Choose ONE of the 35 official IA Prompts and select THREE specific real-world objects (with clear real-world context — NEVER generic clip-art concepts!), writing a 950-word commentary showing how TOK manifests in the world around us.",
    },
    essay: {
      title: "TOK Essay on a Prescribed Title (External Assessment)",
      weight: "67%",
      maxMarks: 10,
      scaledNote: "Marked out of 10 and doubled to 20 (20/30 total TOK marks).",
      maxWords: 1600,
      summary:
        "Choose 1 of 6 IBO Prescribed Titles (released Sept 2028 for May 2029 exams). Construct a nuanced, balanced exploration of claims and counterclaims grounded in 2 Areas of Knowledge using concrete, authentic real-world examples.",
    },
  },
  // All 35 official IBO TOK FA2022 Exhibition IA Prompts (verbatim).
  iaPrompts: [
    { id: 1, text: "What counts as knowledge?", tags: ["scope", "definition", "certainty"] },
    { id: 2, text: "Are some types of knowledge more useful than others?", tags: ["utility", "value", "aok"] },
    { id: 3, text: "What features of knowledge have an impact on its reliability?", tags: ["reliability", "methods", "evidence"] },
    { id: 4, text: "On what grounds might we doubt a claim?", tags: ["doubt", "scepticism", "evidence"] },
    { id: 5, text: "What counts as good evidence for a claim?", tags: ["evidence", "methods", "justification"] },
    { id: 6, text: "How does the way that we organize or classify knowledge affect what we know?", tags: ["classification", "language", "tools"] },
    { id: 7, text: "What are the implications of having, or not having, knowledge?", tags: ["ethics", "power", "responsibility"] },
    { id: 8, text: "To what extent is certainty attainable?", tags: ["certainty", "doubt", "maths"] },
    { id: 9, text: "Are some types of knowledge less open to interpretation than others?", tags: ["interpretation", "perspectives", "arts"] },
    { id: 10, text: "What challenges are raised by the dissemination and/or communication of knowledge?", tags: ["communication", "language", "technology"] },
    { id: 11, text: "Can new knowledge change established values or beliefs?", tags: ["values", "beliefs", "change"] },
    { id: 12, text: "Is bias inevitable in the production of knowledge?", tags: ["bias", "perspectives", "methods"] },
    { id: 13, text: "How can we know that current knowledge is an improvement upon past knowledge?", tags: ["progress", "history", "science"] },
    { id: 14, text: "Does some knowledge belong only to particular communities of knowers?", tags: ["communities", "indigenous", "culture"] },
    { id: 15, text: "What constraints are there on the pursuit of knowledge?", tags: ["ethics", "constraints", "politics"] },
    { id: 16, text: "Should some knowledge not be sought on ethical grounds?", tags: ["ethics", "science", "limits"] },
    { id: 17, text: "Why do we seek knowledge?", tags: ["motivation", "knower", "value"] },
    { id: 18, text: "Are some things unknowable?", tags: ["limits", "scope", "certainty"] },
    { id: 19, text: "What makes a good explanation?", tags: ["explanation", "models", "science"] },
    { id: 20, text: "What is the relationship between personal experience and knowledge?", tags: ["experience", "knower", "perspectives"] },
    { id: 21, text: "What is the relationship between knowledge and culture?", tags: ["culture", "perspectives", "communities"] },
    { id: 22, text: "What role do experts play in influencing our consumption or acquisition of knowledge?", tags: ["experts", "authority", "trust"] },
    { id: 23, text: "How important are material tools in the production or acquisition of knowledge?", tags: ["tools", "technology", "science"] },
    { id: 24, text: "How might the context in which knowledge is presented influence whether it is accepted or rejected?", tags: ["context", "politics", "communication"] },
    { id: 25, text: "How can we distinguish between knowledge, belief and opinion?", tags: ["belief", "justification", "truth"] },
    { id: 26, text: "Does our knowledge depend on our interactions with other knowers?", tags: ["communities", "knower", "collaboration"] },
    { id: 27, text: "Does all knowledge impose ethical obligations on those who know it?", tags: ["ethics", "responsibility", "knower"] },
    { id: 28, text: "To what extent is objectivity possible in the production or acquisition of knowledge?", tags: ["objectivity", "bias", "science"] },
    { id: 29, text: "Who owns knowledge?", tags: ["ownership", "politics", "indigenous"] },
    { id: 30, text: "What role does imagination play in producing knowledge about the world?", tags: ["imagination", "arts", "maths"] },
    { id: 31, text: "How can we judge when evidence is adequate?", tags: ["evidence", "methods", "reliability"] },
    { id: 32, text: "What makes a good historian? (or: How do historians decide what is significant?)", tags: ["history", "methods", "perspectives"] },
    { id: 33, text: "How is current knowledge shaped by its historical development?", tags: ["history", "change", "progress"] },
    { id: 34, text: "In what ways do our values affect our acquisition of knowledge?", tags: ["values", "ethics", "perspectives"] },
    { id: 35, text: "In what ways do values affect the production of knowledge?", tags: ["values", "bias", "production"] },
  ] as TokPrompt[],
} as const;

export interface ObjectCheckResult {
  score: "strong" | "needs-specificity" | "empty";
  feedback: string;
}

/** Checks whether a student's proposed TOK Exhibition object is specific & contextualized rather than generic. */
export function checkTokObjectSpecificity(raw: string): ObjectCheckResult {
  const s = raw.trim();
  if (!s) return { score: "empty", feedback: "Enter a proposed object (e.g. 'My grandmother's 1978 handwritten Tamil recipe notebook')." };
  const words = s.split(/\s+/).filter(Boolean);
  const genericPatterns = /^(a |an |the )?(book|phone|smartphone|map|painting|photo|photograph|calculator|microscope|bible|dictionary|newspaper|clock|globe|compass|camera|laptop|ai|internet|music|science|history|art)\.?$/i;
  if (genericPatterns.test(s) || words.length < 4) {
    return {
      score: "needs-specificity",
      feedback:
        "Too generic! IBO examiners penalise generic objects ('a map', 'a microscope'). Anchor it to a SPECIFIC time, place, owner, edition, or real-world moment (e.g. 'The 1973 Peters Projection world map hung in my Geography classroom').",
    };
  }
  const hasAnchor =
    /\b(1\d{3}|20\d{2}|my |our |from |in |at |by |edition|museum|singapore|tanglin|family|grandmother|grandfather|school|lab|exhibition|published|dated|used|worn|handwritten|original|photograph of)\b/i.test(
      s,
    );
  if (!hasAnchor && words.length < 7) {
    return {
      score: "needs-specificity",
      feedback:
        "Getting closer — add a concrete real-world context anchor (who owns/created it, exact year/place, or where you encountered it) so examiners see its specific real-world provenance.",
    };
  }
  return {
    score: "strong",
    feedback:
      "Specific & contextualised! Make sure your commentary explains THIS exact object's real-world context and links it directly back to your chosen IA prompt.",
  };
}

export interface EeCriterion2027 {
  code: string;
  name: string;
  maxMarks: number;
  highlight?: boolean;
  summary: string;
  topBandTip: string;
}

export const EE_2027_DATA = {
  guideLabel: "NEW Extended Essay Guide · First Assessment 2027 (30 Marks)",
  supersedesNote:
    "Important: Tanglin's 2025–27 booklet printed the retired pre-2027 34-mark EE structure. Because Vanishree sits exams in May 2029, she follows the NEW First Assessment 2027 EE guide (30 marks total, Interdisciplinary Pathway, and single 500-word Reflection).",
  wordLimit: 4000,
  reflectionWordLimit: 500,
  totalMarks: 30,
  studentHours: "~40 hours independent research · 3–5 hours supervisor contact",
  tanglinWindow: "Nov Year 12 (2027) → Nov Year 13 (2028)",
  pathways: [
    {
      name: "Subject-Focused Pathway",
      detail:
        "Deep disciplinary research within ONE DP subject (strongly recommended to pick one of your HL subjects — e.g. Physics, Chemistry, Economics, Psychology, Maths, or English Lit).",
    },
    {
      name: "NEW 2027 Interdisciplinary Pathway",
      detail:
        "Replaces legacy 'World Studies'. Integrates conceptual lenses and methodologies from TWO distinct DP subjects to examine a complex contemporary issue (e.g. Economics + Biology on carbon pricing & mangrove restoration).",
    },
  ],
  criteria: [
    {
      code: "A",
      name: "Framework for the Essay",
      maxMarks: 6,
      summary: "Sharp, narrow Research Question (RQ), clear disciplinary/interdisciplinary framing, and well-justified methodology & sources.",
      topBandTip: "State your exact RQ, why it matters, and justify WHY your chosen method/data/texts fit it (not just what you read).",
    },
    {
      code: "B",
      name: "Knowledge and Understanding",
      maxMarks: 6,
      summary: "Accurate, sustained command of subject-specific concepts, terminology, theories, and academic source context.",
      topBandTip: "Demonstrate DP HL-calibre conceptual accuracy throughout — zero textbook padding.",
    },
    {
      code: "C",
      name: "Analysis and Line of Argument",
      maxMarks: 6,
      summary: "Coherent, progressive argument analysing evidence (data, experiments, close reading, models) directly toward answering the RQ.",
      topBandTip: "Every section must push your thesis forward; link every graph, regression, quote, or calculation explicitly to the RQ.",
    },
    {
      code: "D",
      name: "Discussion and Evaluation",
      maxMarks: 8,
      highlight: true,
      summary: "HIGHEST-WEIGHTED CRITERION (8/30 = 26.7%)! Evaluates strengths/limitations of findings, methodological uncertainties, counter-arguments, and unresolved questions.",
      topBandTip: "Never leave evaluation for one rushed final paragraph — weigh reliability, confounding variables, and alternative interpretations deeply!",
    },
    {
      code: "E",
      name: "Reflection (Single 500-Word Statement)",
      maxMarks: 4,
      summary: "NEW 2027 streamlined format: ONE cohesive 500-word Reflection statement completed after your final viva voce (replacing three separate RPPF mini-boxes).",
      topBandTip: "Focus on genuine intellectual turning points — how setbacks, unexpected data, or methodology pivots changed your thinking as a researcher.",
    },
  ] as EeCriterion2027[],
  milestones: [
    { date: "Nov – Dec Year 12", step: "Choose Subject-focused vs Interdisciplinary pathway, narrow RQ, meet supervisor." },
    { date: "Jan – Apr Year 12", step: "Literature review, lab/data pilot or primary text close-reading, formal proposal sign-off." },
    { date: "May – Aug (Summer)", step: "Complete primary data collection / modelling / drafting full 4,000-word first draft." },
    { date: "Sep – Oct Year 13", step: "Supervisor feedback session, deepen Criterion D evaluation & tighten academic citations." },
    { date: "Nov Year 13", step: "Final 4,000w submission → Viva Voce interview → write single 500-word Reflection statement." },
  ],
};

export interface EeRqCheckResult {
  status: "strong" | "warn" | "empty";
  issues: string[];
  strengths: string[];
}

export function evaluateEeRq(raw: string): EeRqCheckResult {
  const s = raw.trim();
  if (!s) return { status: "empty", issues: [], strengths: [] };
  const issues: string[] = [];
  const strengths: string[] = [];
  const words = s.split(/\s+/).filter(Boolean);

  if (!s.endsWith("?")) {
    issues.push("Frame your Extended Essay RQ as a clear, direct question ending with '?'.");
  }
  if (/^(what is|who was|when did|is |are |does |did |can )/i.test(s)) {
    issues.push("Starts with a closed yes/no or purely descriptive opener — switch to 'To what extent…', 'How effectively…', or 'How does X affect Y…' so you can argue and evaluate (Criterion D = 8 marks!).");
  } else if (/^(to what extent|how |in what ways|why )/i.test(s)) {
    strengths.push("Open, evaluative stem ('To what extent' / 'How') invites genuine Criterion C argument & Criterion D evaluation.");
  }
  if (words.length < 9) {
    issues.push("Too broad/short (< 9 words) — specify exact variables, texts, time period, geographic location, or experimental parameter.");
  } else if (words.length > 35) {
    issues.push("Very long (> 35 words) — tighten into one crisp, focused researchable question.");
  } else {
    strengths.push("Focused length (9–35 words) suited to a narrow 4,000-word investigation.");
  }
  if (/\b(everything|all |world|history of|impact of social media|climate change in general)\b/i.test(s)) {
    issues.push("Contains an overly sweeping scope word ('all', 'world', 'history of') — narrow to a specific case, variable, or corpus.");
  }
  if (/\b(\d{4}|temperature|concentration|elasticity|singapore|between|versus|vs\.?|compare|effect of|relationship between)\b/i.test(s)) {
    strengths.push("Includes concrete bounding variables, timeframe, or comparative anchor.");
  }

  return {
    status: issues.length === 0 ? "strong" : "warn",
    issues,
    strengths,
  };
}

export interface CasOutcome {
  id: string;
  code: string;
  title: string;
  description: string;
  example: string;
}

export const CAS_DATA = {
  guideLabel: "IBO CAS Programme · Mandatory 18-Month Pass/Fail Core",
  strands: [
    { name: "Creativity", icon: "🎨", detail: "Exploring and extending ideas leading to an original or interpretive product or performance (music, theatre, coding, design, writing)." },
    { name: "Activity", icon: "🏃", detail: "Physical exertion contributing to a healthy lifestyle (sport, dance, swimming, martial arts, expedition training)." },
    { name: "Service", icon: "🤝", detail: "Collaborative, reciprocal, unpaid voluntary exchange with real community benefit — respecting dignity and genuine local needs." },
  ],
  stages: [
    { step: "1. Investigation", detail: "Identify personal interests, skills, and authentic community needs." },
    { step: "2. Preparation", detail: "Clarify roles, plan timelines, assess safety/ethics, and acquire needed skills." },
    { step: "3. Action", detail: "Implement the plan through sustained, active participation." },
    { step: "4. Reflection", detail: "Examine thoughts, challenges, ethics, and growth before, during, and after." },
    { step: "5. Demonstration", detail: "Share evidence, learnings, and outcomes cleanly in your CAS Portfolio." },
  ],
  learningOutcomes: [
    { id: "lo1", code: "LO1", title: "Strengths & Growth", description: "Identify own strengths and develop areas for growth.", example: "Logging how shifting from solo piano to chamber ensemble exposed rhythm/listening gaps." },
    { id: "lo2", code: "LO2", title: "Challenge & Skills", description: "Demonstrate that challenges have been undertaken, developing new skills in the process.", example: "Learning Python data visualisation or completing an unfamiliar 10 km endurance training cycle." },
    { id: "lo3", code: "LO3", title: "Initiative & Planning", description: "Demonstrate how to initiate and plan a CAS experience.", example: "Drafting budgets, risk assessments, and weekly schedules for a student-led coding workshop." },
    { id: "lo4", code: "LO4", title: "Commitment & Perseverance", description: "Show commitment to and perseverance in CAS experiences.", example: "Sustaining weekly tutoring or sports training steadily across all 5 Tanglin terms." },
    { id: "lo5", code: "LO5", title: "Collaborative Skills", description: "Demonstrate the skills and recognize the benefits of working collaboratively.", example: "Co-leading a ≥1-month CAS Project, negotiating responsibilities and resolving setbacks." },
    { id: "lo6", code: "LO6", title: "Global Engagement", description: "Demonstrate engagement with issues of global significance.", example: "Connecting local Singapore coastal cleanup or migrant-worker literacy to UN SDGs." },
    { id: "lo7", code: "LO7", title: "Ethics of Choices & Actions", description: "Recognize and consider the ethics of choices and actions.", example: "Ensuring Service Learning avoids 'voluntourism' and respects partner communities' autonomy." },
  ] as CasOutcome[],
  casProjectRule:
    "At least ONE collaborative CAS Project lasting a minimum of 1 month (from planning to completion), integrating at least one CAS strand (often combining Creativity + Service or Activity + Service) across all 5 CAS Stages.",
  tanglinSchedule: [
    { term: "Term 1 (DP1)", detail: "Introductory CAS Interview, set balanced Creativity/Activity/Service goals, launch weekly Service Learning." },
    { term: "Term 2–3 (DP1)", detail: "Design & launch collaborative CAS Project (≥1 month) + participate in Tanglin Year 12 Service & Expedition Week." },
    { term: "Term 4 (DP2)", detail: "Mid-Stage CAS Interview, audit all 7 Learning Outcomes for gaps, continue balanced weekly engagement." },
    { term: "Term 5 (DP2)", detail: "Final CAS Portfolio verification & exit interview — confirm full completion well before May 2029 exams!" },
  ],
  goldDofENote:
    "Gold Duke of Edinburgh's International Award (offered at Tanglin) maps naturally onto CAS: Volunteering → Service, Physical → Activity, Skills → Creativity, and the Adventurous Journey / Gold Residential can enrich your reflections (always log CAS-specific Learning Outcomes separately inside your IB CAS portfolio!).",
};
