"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEFAULT_PLAN,
  IB_GROUPS,
  SUBJECTS,
  TANGLIN_TIMELINE,
  type SelectionLevel,
} from "@/lib/subjects";
import {
  coreMatrixPoints,
  evaluateDiplomaScore,
  validateDiplomaPlan,
  type CoreGrade,
  type SubjectGrade,
} from "@/lib/ibRules";

const CORE_GRADES: CoreGrade[] = ["A", "B", "C", "D", "E"];
const MATRIX_GRADES: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
const SUBJECT_GRADES: SubjectGrade[] = [7, 6, 5, 4, 3, 2, 1];

export function HubDashboard() {
  const [previewLevel, setPreviewLevel] = useState<"HL" | "SL">("HL");
  const [plan, setPlan] = useState<Record<string, SelectionLevel>>(() => {
    if (typeof window === "undefined") return DEFAULT_PLAN;
    try {
      const saved = window.localStorage.getItem("y12hub.plan");
      if (saved) return { ...DEFAULT_PLAN, ...(JSON.parse(saved) as Record<string, SelectionLevel>) };
    } catch {
      /* ignore */
    }
    return DEFAULT_PLAN;
  });

  const [hlGrades, setHlGrades] = useState<[SubjectGrade, SubjectGrade, SubjectGrade]>([7, 6, 6]);
  const [slGrades, setSlGrades] = useState<[SubjectGrade, SubjectGrade, SubjectGrade]>([6, 6, 6]);
  const [tokGrade, setTokGrade] = useState<CoreGrade>("A");
  const [eeGrade, setEeGrade] = useState<CoreGrade>("B");
  const [casMet, setCasMet] = useState<boolean>(true);
  const [misconduct, setMisconduct] = useState<boolean>(false);

  const setSubjectChoice = (id: string, level: SelectionLevel) => {
    setPlan((prev) => {
      const next = { ...prev, [id]: level };
      try {
        window.localStorage.setItem("y12hub.plan", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const applyPreset = (preset: Record<string, SelectionLevel>) => {
    setPlan(preset);
    try {
      window.localStorage.setItem("y12hub.plan", JSON.stringify(preset));
    } catch {
      /* ignore */
    }
  };

  const planSummary = useMemo(() => validateDiplomaPlan(plan), [plan]);

  const hlSlots = useMemo(() => {
    const chosen = SUBJECTS.filter((s) => plan[s.id] === "HL");
    return [0, 1, 2].map((i) => chosen[i]?.shortName ?? `HL Subject ${i + 1}`);
  }, [plan]);

  const slSlots = useMemo(() => {
    const chosen = SUBJECTS.filter((s) => plan[s.id] === "SL");
    return [0, 1, 2].map((i) => chosen[i]?.shortName ?? `SL Subject ${i + 1}`);
  }, [plan]);

  const scoreResult = useMemo(
    () =>
      evaluateDiplomaScore({
        hlGrades,
        slGrades,
        tok: tokGrade,
        ee: eeGrade,
        casMet,
        misconductPenalty: misconduct,
      }),
    [hlGrades, slGrades, tokGrade, eeGrade, casMet, misconduct],
  );

  return (
    <div className="space-y-8">
      {/* ======================================================= HERO BANNER */}
      <section className="card overflow-hidden border-brand/25 p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">
                IB Diploma Programme · May 2029 Cohort
              </span>
              <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-extrabold text-gold">
                Tanglin Trust School · Singapore
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Vanishree&apos;s Year 12–13 IB Study Command Centre
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-2 sm:text-base">
              All 8 SL/HL study guides aligned to the exact IBO guides governing May 2029 exams — including the FA2025
              Sciences (no Paper 3), NEW FA2027 Psychology &amp; Extended Essay (30 marks), and FA2029 Subject Brief
              previews for Maths AA &amp; Spanish B.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
            <Link
              href="/core"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-extrabold text-brand-ink shadow-sm transition hover:bg-brand-2"
            >
              <span aria-hidden>🧭</span> Open IB Core (TOK · EE · CAS) →
            </Link>
            <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs">
              <span className="font-bold text-ink-2">Card Preview:</span>
              <div className="inline-flex rounded-lg bg-surface p-0.5">
                {(["HL", "SL"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPreviewLevel(lvl)}
                    className={`rounded-md px-2.5 py-1 text-xs font-extrabold transition ${
                      previewLevel === lvl ? "bg-brand text-brand-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= SUBJECT LAUNCHER */}
      <section aria-labelledby="launcher-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="launcher-heading" className="text-xl font-black tracking-tight sm:text-2xl">
              All 8 IB Diploma Subject Study Guides
            </h2>
            <p className="text-sm text-ink-2">
              Every app is written to HL with HL-only content tagged so you can switch SL / HL anytime.
            </p>
          </div>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-ink-2">
            Showing {previewLevel} assessment specs
          </span>
        </div>

        <div className="space-y-6">
          {IB_GROUPS.map((grp) => {
            const items = SUBJECTS.filter((s) => s.group === grp.group);
            return (
              <div key={grp.group} className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-1.5">
                  <h3 className="text-sm font-black uppercase tracking-wide text-brand">{grp.title}</h3>
                  <p className="text-xs text-ink-2">{grp.subtitle}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((sub) => {
                    const selected = plan[sub.id] ?? "off";
                    return (
                      <article
                        key={sub.id}
                        className="card flex min-w-0 flex-col justify-between p-4 transition hover:border-brand/40 sm:p-5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                aria-hidden
                                style={{ backgroundColor: sub.accentHex }}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl text-white shadow-sm"
                              >
                                {sub.icon}
                              </span>
                              <div className="min-w-0">
                                <h4 className="truncate text-base font-black">{sub.name}</h4>
                                <p className="text-xs font-bold text-ink-2">
                                  {sub.guideYear} · {sub.topicsCount} topics
                                </p>
                              </div>
                            </div>
                            {selected !== "off" ? (
                              <span
                                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                                  selected === "HL"
                                    ? "bg-brand-soft text-brand"
                                    : "bg-good-soft text-good"
                                }`}
                              >
                                My {selected}
                              </span>
                            ) : null}
                          </div>

                          {sub.provisionalStamp ? (
                            <div className="rounded-lg border border-warn/40 bg-warn-soft px-2.5 py-1.5 text-xs font-bold leading-snug text-warn">
                              ⚠️ {sub.provisionalStamp}
                            </div>
                          ) : null}

                          <p className="text-sm leading-relaxed text-ink-2">{sub.tagline}</p>

                          <div className="rounded-xl bg-surface-2 p-3 text-xs leading-relaxed">
                            <p className="font-extrabold text-ink">
                              {previewLevel} Assessment ({previewLevel === "HL" ? "240h" : "150h"}):
                            </p>
                            <p className="mt-0.5 text-ink-2">
                              {previewLevel === "HL" ? sub.hlSummary : sub.slSummary}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {sub.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-2"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                          <span className="truncate text-xs font-semibold text-ink-2">{sub.repo}</span>
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-extrabold text-brand-ink transition hover:bg-brand-2"
                          >
                            Launch App <span aria-hidden>↗</span>
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================= 6-SUBJECT DIPLOMA PLANNER */}
      <section aria-labelledby="planner-heading" className="card space-y-5 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 id="planner-heading" className="text-xl font-black tracking-tight">
              Interactive 6-Subject Diploma Planner (3 HL + 3 SL)
            </h2>
            <p className="text-sm text-ink-2">
              Toggle your 6 subjects to verify IB Group rules, exam-paper count, coursework load &amp; Tanglin timeline.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  englishlit: "SL",
                  spanishb: "SL",
                  economics: "SL",
                  psychology: "off",
                  biology: "off",
                  chemistry: "HL",
                  physics: "HL",
                  mathsaa: "HL",
                })
              }
              className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-bold hover:border-brand/40"
            >
              Engineering / STEM
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  englishlit: "SL",
                  spanishb: "SL",
                  psychology: "HL",
                  economics: "off",
                  biology: "HL",
                  chemistry: "HL",
                  physics: "off",
                  mathsaa: "SL",
                })
              }
              className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-bold hover:border-brand/40"
            >
              Medicine / Bio-Psych
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  englishlit: "HL",
                  spanishb: "SL",
                  economics: "HL",
                  psychology: "SL",
                  biology: "off",
                  chemistry: "off",
                  physics: "SL",
                  mathsaa: "HL",
                })
              }
              className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-bold hover:border-brand/40"
            >
              PPE / Econ-Lit
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((sub) => {
            const lvl = plan[sub.id] ?? "off";
            return (
              <div key={sub.id} className="min-w-0 rounded-xl border border-line bg-surface-2/60 p-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-lg">
                    {sub.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold">{sub.shortName}</p>
                    <p className="text-[11px] text-ink-2">Group {sub.group}</p>
                  </div>
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-1 rounded-lg bg-surface p-1">
                  {(["off", "SL", "HL"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSubjectChoice(sub.id, opt)}
                      className={`rounded-md py-1 text-xs font-extrabold transition ${
                        lvl === opt
                          ? opt === "HL"
                            ? "bg-brand text-brand-ink"
                            : opt === "SL"
                              ? "bg-good text-white"
                              : "bg-surface-2 text-ink"
                          : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {opt === "off" ? "Off" : opt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Diploma Rule Audit */}
        <div
          className={`rounded-xl border p-4 ${
            planSummary.valid
              ? "border-good/40 bg-good-soft/50"
              : "border-warn/40 bg-warn-soft/70"
          }`}
        >
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-ink-2">Subject Load</p>
              <p className="text-lg font-black tabular-nums">
                {planSummary.hlCount} HL · {planSummary.slCount} SL
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-ink-2">Teaching Hours</p>
              <p className="text-lg font-black tabular-nums">{planSummary.teachingHours} hrs</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-ink-2">May 2029 Papers</p>
              <p className="text-lg font-black tabular-nums">{planSummary.examPapers} exam papers</p>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase text-ink-2">Major Coursework</p>
              <p className="text-lg font-black tabular-nums">{planSummary.courseworkCount} submissions</p>
            </div>
          </div>

          {planSummary.warnings.length > 0 ? (
            <ul className="mt-3 space-y-1 text-xs font-bold text-warn">
              {planSummary.warnings.map((w) => (
                <li key={w}>⚠️ {w}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs font-extrabold text-good">
              ✓ Valid 3 HL + 3 SL IB Diploma combination covering Groups 1–5!
            </p>
          )}
          {planSummary.notes.length > 0 ? (
            <ul className="mt-2 space-y-1 text-xs text-ink-2">
              {planSummary.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Tanglin 5-Term Milestones */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-black uppercase tracking-wide text-ink-2">
            Tanglin 5-Term DP Milestone Roadmap (Aug 2027 – May 2029)
          </h3>
          <div className="grid gap-3 md:grid-cols-5">
            {TANGLIN_TIMELINE.map((t) => (
              <div key={t.term} className="min-w-0 rounded-xl border border-line bg-surface-2/50 p-3">
                <p className="text-xs font-black text-brand">{t.term}</p>
                <p className="text-[11px] font-semibold text-ink-2">{t.window}</p>
                <p className="mt-1.5 text-xs font-extrabold">{t.focus}</p>
                <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-ink-2">
                  {t.deliverables.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== 45-POINT CALCULATOR & 10 FAILING RULES */}
      <section aria-labelledby="calc-heading" className="card space-y-6 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="calc-heading" className="text-xl font-black tracking-tight">
              45-Point IB Diploma Calculator, Core Matrix &amp; 10 Failing Conditions
            </h2>
            <p className="text-sm text-ink-2">
              Adjust your 3 HL grades, 3 SL grades, TOK, Extended Essay &amp; CAS status to verify Diploma eligibility.
            </p>
          </div>
          <div
            className={`shrink-0 rounded-2xl border px-4 py-2.5 text-center ${
              scoreResult.awarded
                ? "border-good/40 bg-good-soft text-good"
                : "border-bad/40 bg-bad-soft text-bad"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wide">
              {scoreResult.awarded ? "IB Diploma Awarded" : "Failing Condition Triggered"}
            </p>
            <p className="text-2xl font-black tabular-nums">
              {scoreResult.totalPoints} <span className="text-sm font-bold">/ 45</span>
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Subject Grade Sliders & Core Selectors */}
          <div className="min-w-0 space-y-4">
            <div className="rounded-xl border border-line bg-surface-2/50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Higher Level (3 HL · min 12 pts)</h3>
                <span
                  className={`text-sm font-black tabular-nums ${
                    scoreResult.hlSum < 12 ? "text-bad" : "text-brand"
                  }`}
                >
                  {scoreResult.hlSum} / 21
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {hlSlots.map((label, idx) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-bold">{label}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {SUBJECT_GRADES.map((g) => (
                        <button
                          key={String(g)}
                          type="button"
                          onClick={() =>
                            setHlGrades((prev) => {
                              const next = [...prev] as [SubjectGrade, SubjectGrade, SubjectGrade];
                              next[idx] = g;
                              return next;
                            })
                          }
                          className={`h-8 w-8 rounded-lg text-xs font-extrabold transition ${
                            hlGrades[idx] === g
                              ? "bg-brand text-brand-ink"
                              : "bg-surface text-ink-2 hover:text-ink"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Standard Level (3 SL · min 9 pts)</h3>
                <span
                  className={`text-sm font-black tabular-nums ${
                    scoreResult.slSum < 9 ? "text-bad" : "text-good"
                  }`}
                >
                  {scoreResult.slSum} / 21
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {slSlots.map((label, idx) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-bold">{label}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {SUBJECT_GRADES.map((g) => (
                        <button
                          key={String(g)}
                          type="button"
                          onClick={() =>
                            setSlGrades((prev) => {
                              const next = [...prev] as [SubjectGrade, SubjectGrade, SubjectGrade];
                              next[idx] = g;
                              return next;
                            })
                          }
                          className={`h-8 w-8 rounded-lg text-xs font-extrabold transition ${
                            slGrades[idx] === g
                              ? "bg-good text-white"
                              : "bg-surface text-ink-2 hover:text-ink"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">IB Core Bonus (TOK × EE · max 3 pts)</h3>
                <span className="text-sm font-black text-gold">
                  {scoreResult.coreBonus === "FAIL" ? "FAILING" : `+${scoreResult.coreBonus} pts`}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-bold text-ink-2">TOK Grade</p>
                  <div className="grid grid-cols-5 gap-1">
                    {CORE_GRADES.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setTokGrade(g)}
                        className={`rounded-lg py-1.5 text-xs font-extrabold ${
                          tokGrade === g
                            ? g === "E"
                              ? "bg-bad text-white"
                              : "bg-brand text-brand-ink"
                            : "bg-surface text-ink-2 hover:text-ink"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-bold text-ink-2">Extended Essay Grade</p>
                  <div className="grid grid-cols-5 gap-1">
                    {CORE_GRADES.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setEeGrade(g)}
                        className={`rounded-lg py-1.5 text-xs font-extrabold ${
                          eeGrade === g
                            ? g === "E"
                              ? "bg-bad text-white"
                              : "bg-brand text-brand-ink"
                            : "bg-surface text-ink-2 hover:text-ink"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={casMet}
                    onChange={(e) => setCasMet(e.target.checked)}
                    className="h-4 w-4 accent-brand"
                  />
                  CAS requirements met (mandatory)
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-ink-2">
                  <input
                    type="checkbox"
                    checked={misconduct}
                    onChange={(e) => setMisconduct(e.target.checked)}
                    className="h-4 w-4 accent-bad"
                  />
                  Simulate misconduct penalty
                </label>
              </div>
            </div>
          </div>

          {/* Right: Official Matrix Table + 10 Failing Conditions Live Checklist */}
          <div className="min-w-0 space-y-4">
            <div className="rounded-xl border border-line bg-surface-2/40 p-4">
              <h3 className="text-sm font-black">Official IBO TOK × EE Bonus Matrix</h3>
              <p className="mt-0.5 text-xs text-ink-2">Any grade E in TOK or EE is an automatic Failing Condition.</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-center text-xs">
                  <thead>
                    <tr className="border-b border-line text-ink-2">
                      <th className="p-1.5 text-left font-bold">TOK \ EE</th>
                      {MATRIX_GRADES.map((g) => (
                        <th key={g} className="p-1.5 font-extrabold">
                          {g}
                        </th>
                      ))}
                      <th className="p-1.5 font-extrabold text-bad">E</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATRIX_GRADES.map((row) => (
                      <tr key={row} className="border-b border-line/60">
                        <th className="p-1.5 text-left font-extrabold">{row}</th>
                        {MATRIX_GRADES.map((col) => {
                          const pts = coreMatrixPoints(row, col);
                          const active = tokGrade === row && eeGrade === col;
                          return (
                            <td
                              key={col}
                              className={`p-1.5 font-extrabold ${
                                active
                                  ? "rounded-md bg-brand text-brand-ink"
                                  : pts === 3
                                    ? "text-good"
                                    : "text-ink"
                              }`}
                            >
                              +{pts}
                            </td>
                          );
                        })}
                        <td
                          className={`p-1.5 font-extrabold ${
                            tokGrade === row && eeGrade === "E" ? "bg-bad text-white" : "text-bad"
                          }`}
                        >
                          Fail
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/40 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">All 10 IB Diploma Failing Conditions</h3>
                <span className="text-xs font-extrabold text-ink-2">
                  {10 - scoreResult.triggeredConditions.length}/10 Clear
                </span>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {scoreResult.conditions.map((c) => (
                  <li
                    key={c.id}
                    className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                      c.triggered ? "bg-bad-soft font-bold text-bad" : "bg-surface text-ink-2"
                    }`}
                  >
                    <span aria-hidden className="shrink-0 font-black">
                      {c.triggered ? "✗" : "✓"}
                    </span>
                    <div className="min-w-0">
                      <span className="font-bold text-ink">{c.id}. {c.rule}:</span>{" "}
                      <span>{c.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
