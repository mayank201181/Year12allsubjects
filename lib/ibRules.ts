// ---------------------------------------------------------------------------
// Pure IB Diploma Programme scoring, Core Bonus Matrix, 10 Failing Conditions,
// and 6-Subject (3 HL + 3 SL) Group-Rule validator.
// Zero React dependencies — exhaustively unit-tested by Node.
// ---------------------------------------------------------------------------
import { SUBJECTS, type IBGroup, type SelectionLevel } from "./subjects.ts";

export type CoreGrade = "A" | "B" | "C" | "D" | "E" | "N";
export type SubjectGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "N";

/**
 * Official IBO TOK × Extended Essay Core Bonus Points Matrix (May 2015–present).
 * Returns 0..3 bonus points, or "FAIL" when either grade is E or N.
 */
const MATRIX: Record<"A" | "B" | "C" | "D", Record<"A" | "B" | "C" | "D", 0 | 1 | 2 | 3>> = {
  A: { A: 3, B: 3, C: 2, D: 2 },
  B: { A: 3, B: 2, C: 2, D: 1 },
  C: { A: 2, B: 2, C: 1, D: 0 },
  D: { A: 2, B: 1, C: 0, D: 0 },
};

export function coreMatrixPoints(tok: CoreGrade, ee: CoreGrade): 0 | 1 | 2 | 3 | "FAIL" {
  if (tok === "E" || ee === "E" || tok === "N" || ee === "N") return "FAIL";
  return MATRIX[tok][ee];
}

export interface DiplomaScoreInput {
  /** Exactly 3 HL subject grades (1–7 or "N"). */
  hlGrades: [SubjectGrade, SubjectGrade, SubjectGrade];
  /** Exactly 3 SL subject grades (1–7 or "N"). */
  slGrades: [SubjectGrade, SubjectGrade, SubjectGrade];
  tok: CoreGrade;
  ee: CoreGrade;
  casMet: boolean;
  /** True only if penalized by Final Award Committee for academic misconduct. */
  misconductPenalty?: boolean;
}

export interface FailingConditionCheck {
  id: number;
  rule: string;
  triggered: boolean;
  detail: string;
}

export interface DiplomaScoreResult {
  hlSum: number;
  slSum: number;
  subjectTotal: number;
  coreBonus: 0 | 1 | 2 | 3 | "FAIL";
  totalPoints: number;
  awarded: boolean;
  conditions: FailingConditionCheck[];
  triggeredConditions: FailingConditionCheck[];
}

export function evaluateDiplomaScore(input: DiplomaScoreInput): DiplomaScoreResult {
  const numeric = (g: SubjectGrade): number => (g === "N" ? 0 : g);
  const allGrades: SubjectGrade[] = [...input.hlGrades, ...input.slGrades];

  const hlSum = input.hlGrades.reduce<number>((sum, g) => sum + numeric(g), 0);
  const slSum = input.slGrades.reduce<number>((sum, g) => sum + numeric(g), 0);
  const subjectTotal = hlSum + slSum;
  const coreBonus = coreMatrixPoints(input.tok, input.ee);
  const totalPoints = subjectTotal + (coreBonus === "FAIL" ? 0 : coreBonus);

  const hasAnyN = allGrades.includes("N") || input.tok === "N" || input.ee === "N";
  const hasAnyE = input.tok === "E" || input.ee === "E";
  const count1s = allGrades.filter((g) => g === 1).length;
  const count2s = allGrades.filter((g) => g === 2).length;
  const count3OrBelow = allGrades.filter((g) => typeof g === "number" && g <= 3).length;

  // All 10 official IBO Diploma Failing Conditions (Tanglin Booklet p. 90).
  const conditions: FailingConditionCheck[] = [
    {
      id: 1,
      rule: "CAS requirements met",
      triggered: !input.casMet,
      detail: input.casMet ? "CAS completed across 18 months & 7 Learning Outcomes." : "CAS requirements have NOT been met — automatic failing condition.",
    },
    {
      id: 2,
      rule: "Minimum 24 total points",
      triggered: totalPoints < 24,
      detail: `Current total is ${totalPoints}/45 (minimum 24 required).`,
    },
    {
      id: 3,
      rule: "No grade 'N' awarded",
      triggered: hasAnyN,
      detail: hasAnyN ? "An 'N' (no grade) is present in TOK, EE, or a subject." : "No 'N' grades recorded.",
    },
    {
      id: 4,
      rule: "No grade 'E' in TOK or Extended Essay",
      triggered: hasAnyE,
      detail: hasAnyE ? `TOK (${input.tok}) / EE (${input.ee}) contains an 'E' — automatic failing condition.` : `TOK (${input.tok}) and EE (${input.ee}) are both D or above.`,
    },
    {
      id: 5,
      rule: "No grade 1 in any subject",
      triggered: count1s > 0,
      detail: count1s > 0 ? `${count1s} subject(s) at grade 1.` : "No grade 1s.",
    },
    {
      id: 6,
      rule: "No more than two grade 2s (HL or SL)",
      triggered: count2s >= 3,
      detail: count2s >= 3 ? `${count2s} grade 2s recorded (3 or more fails the Diploma).` : `${count2s} grade 2(s) (max 2 allowed).`,
    },
    {
      id: 7,
      rule: "No more than three grades of 3 or below",
      triggered: count3OrBelow >= 4,
      detail: count3OrBelow >= 4 ? `${count3OrBelow} grades are 3 or below (4 or more fails the Diploma).` : `${count3OrBelow} grade(s) ≤ 3 (max 3 allowed).`,
    },
    {
      id: 8,
      rule: "At least 12 points across HL subjects",
      triggered: hlSum < 12,
      detail: `HL total is ${hlSum}/21 (minimum 12 required across 3 HL subjects).`,
    },
    {
      id: 9,
      rule: "At least 9 points across SL subjects",
      triggered: slSum < 9,
      detail: `SL total is ${slSum}/21 (minimum 9 required across 3 SL subjects).`,
    },
    {
      id: 10,
      rule: "No academic misconduct penalty",
      triggered: Boolean(input.misconductPenalty),
      detail: input.misconductPenalty
        ? "Academic misconduct penalty from the Final Award Committee voids the Diploma."
        : "Academic integrity upheld across all external exams, IAs, TOK, and EE.",
    },
  ];

  const triggeredConditions = conditions.filter((c) => c.triggered);
  return {
    hlSum,
    slSum,
    subjectTotal,
    coreBonus,
    totalPoints,
    awarded: triggeredConditions.length === 0,
    conditions,
    triggeredConditions,
  };
}

export interface DiplomaPlanSummary {
  selectedCount: number;
  hlCount: number;
  slCount: number;
  teachingHours: number;
  examPapers: number;
  courseworkCount: number;
  missingGroups: IBGroup[];
  valid: boolean;
  warnings: string[];
  notes: string[];
}

export function validateDiplomaPlan(plan: Record<string, SelectionLevel>): DiplomaPlanSummary {
  const chosen = SUBJECTS.filter((s) => plan[s.id] === "HL" || plan[s.id] === "SL");
  const hls = chosen.filter((s) => plan[s.id] === "HL");
  const sls = chosen.filter((s) => plan[s.id] === "SL");

  const requiredGroups: IBGroup[] = [1, 2, 3, 4, 5];
  const coveredGroups = new Set(chosen.map((s) => s.group));
  const missingGroups = requiredGroups.filter((g) => !coveredGroups.has(g));

  const teachingHours = hls.length * 240 + sls.length * 150;
  const examPapers = chosen.reduce((sum, s) => sum + (plan[s.id] === "HL" ? s.hlPapers : s.slPapers), 0);
  // Each subject has 1 IA, plus English Lit HL adds the HL Essay (+1), plus TOK Exhibition + EE (+2 core)!
  const courseworkCount = chosen.length + (plan.englishlit === "HL" ? 1 : 0) + 2;

  const warnings: string[] = [];
  if (chosen.length !== 6) {
    warnings.push(`Select exactly 6 subjects (currently ${chosen.length}/6).`);
  }
  if (hls.length !== 3 || sls.length !== 3) {
    warnings.push(`Standard IB Diploma requires 3 HL + 3 SL (currently ${hls.length} HL, ${sls.length} SL).`);
  }
  if (missingGroups.length > 0) {
    warnings.push(`Missing required IB Group(s): Group ${missingGroups.join(", Group ")}.`);
  }

  const notes: string[] = [];
  const g4Count = chosen.filter((s) => s.group === 4).length;
  const g3Count = chosen.filter((s) => s.group === 3).length;
  if (g4Count === 2) {
    notes.push("Double Science pathway (2 × Group 4 substituting Group 6 Arts — standard for Medicine / Engineering / STEM).");
  } else if (g3Count === 2) {
    notes.push("Double Humanities pathway (2 × Group 3 substituting Group 6 Arts — strong for PPE / Law / Social Sciences).");
  }
  if (g4Count === 3) {
    warnings.push("Three Group 4 Sciences requires a special IBO Irregular Diploma application (usually only for specific medical schools).");
  }
  if (plan.mathsaa === "HL" && plan.physics === "HL") {
    notes.push("Maths AA HL + Physics HL unlocks top global Engineering, CS, and Physical Sciences university prerequisites.");
  }
  if (plan.chemistry === "HL" && plan.biology === "HL") {
    notes.push("Chemistry HL + Biology HL satisfies UK/Singapore Medicine and Life Sciences entry requirements.");
  }

  const valid = chosen.length === 6 && hls.length === 3 && sls.length === 3 && missingGroups.length === 0 && g4Count <= 2;

  return {
    selectedCount: chosen.length,
    hlCount: hls.length,
    slCount: sls.length,
    teachingHours,
    examPapers,
    courseworkCount,
    missingGroups,
    valid,
    warnings,
    notes,
  };
}
