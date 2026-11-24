import test from "node:test";
import assert from "node:assert/strict";
import {
  coreMatrixPoints,
  evaluateDiplomaScore,
  validateDiplomaPlan,
  type CoreGrade,
} from "../lib/ibRules.ts";
import {
  DEFAULT_PLAN,
  PROVISIONAL_FA2029_STAMP,
  SUBJECTS,
} from "../lib/subjects.ts";
import {
  CAS_DATA,
  EE_2027_DATA,
  TOK_DATA,
  checkTokObjectSpecificity,
  evaluateEeRq,
} from "../lib/coreData.ts";

test("Official IBO TOK x EE Core Matrix covers all 25 cells accurately", () => {
  const expected: Record<CoreGrade, Record<CoreGrade, 0 | 1 | 2 | 3 | "FAIL">> = {
    A: { A: 3, B: 3, C: 2, D: 2, E: "FAIL", N: "FAIL" },
    B: { A: 3, B: 2, C: 2, D: 1, E: "FAIL", N: "FAIL" },
    C: { A: 2, B: 2, C: 1, D: 0, E: "FAIL", N: "FAIL" },
    D: { A: 2, B: 1, C: 0, D: 0, E: "FAIL", N: "FAIL" },
    E: { A: "FAIL", B: "FAIL", C: "FAIL", D: "FAIL", E: "FAIL", N: "FAIL" },
    N: { A: "FAIL", B: "FAIL", C: "FAIL", D: "FAIL", E: "FAIL", N: "FAIL" },
  };
  for (const tok of ["A", "B", "C", "D", "E", "N"] as CoreGrade[]) {
    for (const ee of ["A", "B", "C", "D", "E", "N"] as CoreGrade[]) {
      assert.equal(coreMatrixPoints(tok, ee), expected[tok][ee], `${tok} x ${ee}`);
    }
  }
});

test("All 10 IB Diploma Failing Conditions trigger accurately", () => {
  const clean = evaluateDiplomaScore({
    hlGrades: [7, 7, 7],
    slGrades: [7, 7, 7],
    tok: "A",
    ee: "A",
    casMet: true,
  });
  assert.equal(clean.totalPoints, 45);
  assert.equal(clean.awarded, true);
  assert.equal(clean.triggeredConditions.length, 0);

  // 1. CAS unmet
  assert.equal(
    evaluateDiplomaScore({ hlGrades: [6, 6, 6], slGrades: [6, 6, 6], tok: "B", ee: "B", casMet: false }).awarded,
    false,
  );
  // 2. Total < 24
  const lowTotal = evaluateDiplomaScore({ hlGrades: [4, 4, 4], slGrades: [4, 4, 3], tok: "D", ee: "D", casMet: true });
  assert.equal(lowTotal.totalPoints, 23);
  assert.equal(lowTotal.awarded, false);
  assert.ok(lowTotal.triggeredConditions.some((c) => c.id === 2));

  // 3. Any N
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [7, 7, "N"], slGrades: [7, 7, 7], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 3,
    ),
  );

  // 4. Any E in TOK or EE
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [7, 7, 7], slGrades: [7, 7, 7], tok: "E", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 4,
    ),
  );

  // 5. Any grade 1
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [7, 7, 7], slGrades: [7, 7, 1], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 5,
    ),
  );

  // 6. 3 or more grade 2s
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [6, 6, 2], slGrades: [6, 2, 2], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 6,
    ),
  );

  // 7. 4 or more grades <= 3
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [6, 3, 3], slGrades: [6, 3, 3], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 7,
    ),
  );

  // 8. HL sum < 12
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [4, 4, 3], slGrades: [6, 6, 6], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 8,
    ),
  );

  // 9. SL sum < 9
  assert.ok(
    evaluateDiplomaScore({ hlGrades: [6, 6, 6], slGrades: [3, 3, 2], tok: "A", ee: "A", casMet: true }).triggeredConditions.some(
      (c) => c.id === 9,
    ),
  );

  // 10. Academic misconduct
  assert.ok(
    evaluateDiplomaScore({
      hlGrades: [7, 7, 7],
      slGrades: [7, 7, 7],
      tok: "A",
      ee: "A",
      casMet: true,
      misconductPenalty: true,
    }).triggeredConditions.some((c) => c.id === 10),
  );
});

test("6-Subject Diploma Planner enforces 3 HL + 3 SL and IB Group rules", () => {
  const def = validateDiplomaPlan(DEFAULT_PLAN);
  assert.equal(def.valid, true);
  assert.equal(def.hlCount, 3);
  assert.equal(def.slCount, 3);
  assert.equal(def.teachingHours, 1170);

  // Missing Group 5 (Maths) fails
  const noMaths = validateDiplomaPlan({ ...DEFAULT_PLAN, mathsaa: "off", biology: "HL" });
  assert.equal(noMaths.valid, false);
  assert.ok(noMaths.missingGroups.includes(5));
});

test("Hub links all 8 apps with exact FA2029 provisional stamps on Maths AA & Spanish B only", () => {
  assert.equal(SUBJECTS.length, 8);
  const provisionalIds = SUBJECTS.filter((s) => s.provisionalStamp === PROVISIONAL_FA2029_STAMP).map((s) => s.id).sort();
  assert.deepEqual(provisionalIds, ["mathsaa", "spanishb"]);
  for (const s of SUBJECTS) {
    assert.equal(s.url, `https://year12${s.id}.vercel.app`);
  }
});

test("Core data integrity: 35 TOK prompts, FA2027 EE 30 marks (Crit D = 8), 7 CAS Outcomes", () => {
  assert.equal(TOK_DATA.iaPrompts.length, 35);
  assert.equal(EE_2027_DATA.totalMarks, 30);
  const sum = EE_2027_DATA.criteria.reduce((s, c) => s + c.maxMarks, 0);
  assert.equal(sum, 30);
  assert.equal(EE_2027_DATA.criteria.find((c) => c.code === "D")?.maxMarks, 8);
  assert.equal(EE_2027_DATA.reflectionWordLimit, 500);
  assert.equal(CAS_DATA.learningOutcomes.length, 7);

  assert.equal(checkTokObjectSpecificity("a map").score, "needs-specificity");
  assert.equal(
    checkTokObjectSpecificity("My grandmother's 1978 handwritten Tamil recipe notebook").score,
    "strong",
  );
  assert.equal(evaluateEeRq("What is climate change").status, "warn");
  assert.equal(
    evaluateEeRq("To what extent did Singapore's 2024 carbon tax increase reduce electricity-sector emissions compared with industrial subsidies?").status,
    "strong",
  );
});
