"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CAS_DATA,
  EE_2027_DATA,
  TOK_DATA,
  checkTokObjectSpecificity,
  evaluateEeRq,
} from "@/lib/coreData";

type CoreTab = "tok" | "ee" | "cas";

export function CoreWorkspace() {
  const [tab, setTab] = useState<CoreTab>("tok");

  // TOK interactive state
  const [promptSearch, setPromptSearch] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState<number>(3);
  const [tokObjects, setTokObjects] = useState<[string, string, string]>([
    "My grandfather's 1968 brass slide rule used during engineering school in Mumbai",
    "A smartphone",
    "The 2024 Tanglin Biology lab osmosis graph with overlapping ±2 SD error bars",
  ]);

  // EE 2027 interactive state
  const [rqInput, setRqInput] = useState(
    "To what extent did Singapore's 2024 carbon tax increase reduce electricity-sector emissions compared with industrial energy efficiency subsidies?",
  );
  const [eeScores, setEeScores] = useState<Record<string, number>>({
    A: 5,
    B: 5,
    C: 5,
    D: 7,
    E: 4,
  });

  // CAS interactive 7 Learning Outcomes tracker (persisted locally)
  const [casChecked, setCasChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = window.localStorage.getItem("y12hub.casLO");
      if (saved) return JSON.parse(saved) as Record<string, boolean>;
    } catch {
      /* ignore */
    }
    return {};
  });

  const toggleCasLo = (id: string) => {
    setCasChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem("y12hub.casLO", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const filteredPrompts = useMemo(() => {
    const q = promptSearch.trim().toLowerCase();
    if (!q) return TOK_DATA.iaPrompts;
    return TOK_DATA.iaPrompts.filter(
      (p) =>
        p.text.toLowerCase().includes(q) ||
        String(p.id) === q ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [promptSearch]);

  const rqEval = useMemo(() => evaluateEeRq(rqInput), [rqInput]);
  const eeTotal = useMemo(
    () => Object.values(eeScores).reduce((sum, n) => sum + n, 0),
    [eeScores],
  );
  const casDoneCount = useMemo(
    () => CAS_DATA.learningOutcomes.filter((lo) => casChecked[lo.id]).length,
    [casChecked],
  );

  return (
    <div className="space-y-6">
      {/* Header & Tab Switcher */}
      <section className="card space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-brand">
              Mandatory IB Diploma Core · Up to +3 Bonus Points + CAS Pass
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              TOK (FA2022) · Extended Essay (NEW FA2027) · CAS
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-line bg-surface-2 px-3.5 py-2 text-xs font-extrabold text-ink transition hover:border-brand/40"
          >
            ← Back to 8 Subjects &amp; 45-Pt Calculator
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-xl bg-surface-2 p-1.5">
          {(
            [
              { id: "tok", icon: "🦉", label: "TOK (FA2022)" },
              { id: "ee", icon: "📜", label: "Extended Essay (2027)" },
              { id: "cas", icon: "🤝", label: "CAS (18 Months)" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-2 py-2.5 text-xs font-extrabold transition sm:text-sm ${
                tab === t.id ? "bg-brand text-brand-ink shadow-sm" : "text-ink-2 hover:text-ink"
              }`}
            >
              <span aria-hidden className="mr-1">
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ====================================================== TAB 1: TOK */}
      {tab === "tok" ? (
        <div className="space-y-6">
          {/* Architecture Grid */}
          <section className="card space-y-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-black">Theory of Knowledge (TOK) Architecture</h2>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">
                {TOK_DATA.guideLabel}
              </span>
            </div>

            <div className="rounded-xl border border-brand/30 bg-brand-soft/40 p-4">
              <p className="text-xs font-extrabold uppercase text-brand">Compulsory Core Theme</p>
              <p className="mt-1 text-base font-black">{TOK_DATA.coreTheme.name}</p>
              <p className="mt-1 text-sm text-ink-2">{TOK_DATA.coreTheme.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2.5 rounded-xl border border-line bg-surface-2/40 p-4">
                <h3 className="text-sm font-black">5 Compulsory Areas of Knowledge (AOKs)</h3>
                <ul className="space-y-2 text-xs leading-relaxed">
                  {TOK_DATA.aoks.map((a) => (
                    <li key={a.name} className="rounded-lg bg-surface p-2.5">
                      <span className="font-extrabold">
                        {a.icon} {a.name}:
                      </span>{" "}
                      <span className="text-ink-2">{a.focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 space-y-4">
                <div className="rounded-xl border border-line bg-surface-2/40 p-4">
                  <h3 className="text-sm font-black">Knowledge Framework (4 Analytical Pillars)</h3>
                  <ul className="mt-2 space-y-2 text-xs leading-relaxed">
                    {TOK_DATA.knowledgeFramework.map((k) => (
                      <li key={k.pillar}>
                        <span className="font-extrabold text-brand">{k.pillar}:</span>{" "}
                        <span className="text-ink-2">{k.question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-line bg-surface-2/40 p-4">
                  <h3 className="text-sm font-black">5 Optional Themes (Study 2)</h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-ink-2">
                    {TOK_DATA.optionalThemes.map((o) => (
                      <li key={o.name}>
                        <span className="font-bold text-ink">{o.name}:</span> {o.focus}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black">{TOK_DATA.assessments.exhibition.title}</h3>
                  <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-xs font-extrabold text-gold">
                    {TOK_DATA.assessments.exhibition.weight} · {TOK_DATA.assessments.exhibition.maxWords}w
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-2">
                  {TOK_DATA.assessments.exhibition.summary}
                </p>
              </div>
              <div className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black">{TOK_DATA.assessments.essay.title}</h3>
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-extrabold text-brand">
                    {TOK_DATA.assessments.essay.weight} · {TOK_DATA.assessments.essay.maxWords}w
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-2">
                  {TOK_DATA.assessments.essay.summary}
                </p>
                <p className="mt-1.5 text-xs font-bold text-brand">
                  {TOK_DATA.assessments.essay.scaledNote}
                </p>
              </div>
            </div>
          </section>

          {/* 3-Object Specificity Checker */}
          <section className="card space-y-4 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-black">TOK Exhibition 3-Object Specificity Checker</h2>
              <p className="text-sm text-ink-2">
                IBO examiners cap exhibitions that use generic concepts (&ldquo;a phone&rdquo;, &ldquo;a map&rdquo;).
                Test your 3 chosen objects against Prompt #{selectedPromptId}:
              </p>
              <p className="mt-2 rounded-lg bg-brand-soft/60 px-3 py-2 text-xs font-extrabold text-brand">
                Prompt #{selectedPromptId}: &ldquo;
                {TOK_DATA.iaPrompts.find((p) => p.id === selectedPromptId)?.text}&rdquo;
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {tokObjects.map((val, idx) => {
                const res = checkTokObjectSpecificity(val);
                return (
                  <div key={idx} className="min-w-0 space-y-2 rounded-xl border border-line bg-surface-2/40 p-3">
                    <label className="block text-xs font-extrabold" htmlFor={`tok-obj-${idx}`}>
                      Object {idx + 1}
                    </label>
                    <textarea
                      id={`tok-obj-${idx}`}
                      rows={3}
                      value={val}
                      onChange={(e) =>
                        setTokObjects((prev) => {
                          const next = [...prev] as [string, string, string];
                          next[idx] = e.target.value;
                          return next;
                        })
                      }
                      className="w-full rounded-lg border border-line bg-surface p-2 text-xs leading-relaxed text-ink focus:border-brand focus:outline-none"
                    />
                    <p
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold leading-snug ${
                        res.score === "strong"
                          ? "bg-good-soft text-good"
                          : res.score === "needs-specificity"
                            ? "bg-warn-soft text-warn"
                            : "bg-surface text-ink-2"
                      }`}
                    >
                      {res.score === "strong" ? "✓ " : res.score === "needs-specificity" ? "⚠️ " : ""}
                      {res.feedback}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* All 35 Official TOK Exhibition IA Prompts */}
          <section className="card space-y-4 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-black">All 35 Official TOK Exhibition IA Prompts</h2>
                <p className="text-xs text-ink-2">
                  Click any prompt to test it with your 3 objects above, or filter by keyword (e.g. ethics, bias, evidence, tools).
                </p>
              </div>
              <input
                type="search"
                value={promptSearch}
                onChange={(e) => setPromptSearch(e.target.value)}
                placeholder="Filter 35 prompts (e.g. ethics, bias, evidence)…"
                className="w-full rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs text-ink focus:border-brand focus:outline-none sm:w-72"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((p) => {
                const active = selectedPromptId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPromptId(p.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-brand bg-brand-soft/60"
                        : "border-line bg-surface-2/30 hover:border-brand/40"
                    }`}
                  >
                    <p className="text-[11px] font-black text-brand">IA Prompt #{p.id}</p>
                    <p className="mt-1 text-xs font-bold leading-snug text-ink">{p.text}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}

      {/* ============================================ TAB 2: EXTENDED ESSAY 2027 */}
      {tab === "ee" ? (
        <div className="space-y-6">
          <section className="card space-y-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-black">Extended Essay — NEW First Assessment 2027</h2>
              <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-extrabold text-gold">
                {EE_2027_DATA.totalMarks} Marks · 4,000 Words · Single 500w Reflection
              </span>
            </div>

            <div className="rounded-xl border border-warn/40 bg-warn-soft p-3.5 text-xs font-bold leading-relaxed text-warn">
              ⚠️ {EE_2027_DATA.supersedesNote}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {EE_2027_DATA.pathways.map((p) => (
                <div key={p.name} className="rounded-xl border border-line bg-surface-2/40 p-4">
                  <h3 className="text-sm font-black text-brand">{p.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* 30-Mark Rubric Tracker */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-black">2027 Assessment Criteria Interactive Self-Tracker</h3>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-black text-brand tabular-nums">
                  Self-Check Score: {eeTotal} / {EE_2027_DATA.totalMarks}
                </span>
              </div>

              <div className="space-y-2.5">
                {EE_2027_DATA.criteria.map((c) => {
                  const val = eeScores[c.code] ?? 0;
                  return (
                    <div
                      key={c.code}
                      className={`rounded-xl border p-4 ${
                        c.highlight ? "border-gold/50 bg-gold-soft/30" : "border-line bg-surface-2/30"
                      }`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-black">
                            Criterion {c.code}: {c.name}{" "}
                            <span className="text-brand">({c.maxMarks} marks)</span>
                          </p>
                          <p className="mt-0.5 text-xs text-ink-2">{c.summary}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={c.maxMarks}
                            value={val}
                            aria-label={`Criterion ${c.code} self score`}
                            onChange={(e) =>
                              setEeScores((prev) => ({ ...prev, [c.code]: Number(e.target.value) }))
                            }
                            className="w-28 accent-brand"
                          />
                          <span className="w-12 text-right text-sm font-black tabular-nums">
                            {val}/{c.maxMarks}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] font-semibold text-ink-2">
                        💡 <strong className="text-ink">Top-band move:</strong> {c.topBandTip}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RQ Narrow-Scope Tester */}
          <section className="card space-y-4 p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-black">Extended Essay Research Question (RQ) Narrow-Scope Tester</h2>
              <p className="text-xs text-ink-2">
                Test whether your proposed RQ is sharp, arguable, and narrow enough for 4,000 words + Band 7–8 Criterion D evaluation.
              </p>
            </div>
            <textarea
              rows={3}
              value={rqInput}
              onChange={(e) => setRqInput(e.target.value)}
              placeholder="Type your draft Extended Essay Research Question…"
              className="w-full rounded-xl border border-line bg-surface-2 p-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
            {rqEval.status !== "empty" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-good/30 bg-good-soft/40 p-3 text-xs">
                  <p className="font-black text-good">Strengths Detected</p>
                  {rqEval.strengths.length > 0 ? (
                    <ul className="mt-1.5 space-y-1 text-ink">
                      {rqEval.strengths.map((s) => (
                        <li key={s}>✓ {s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-ink-2">Refine your RQ with an evaluative opener and specific variables.</p>
                  )}
                </div>
                <div className="rounded-xl border border-warn/30 bg-warn-soft/50 p-3 text-xs">
                  <p className="font-black text-warn">Scope &amp; Sharpening Checks</p>
                  {rqEval.issues.length > 0 ? (
                    <ul className="mt-1.5 space-y-1 text-ink">
                      {rqEval.issues.map((i) => (
                        <li key={i}>⚠️ {i}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 font-bold text-good">
                      ✓ Strong narrow-scope RQ ready for supervisor approval!
                    </p>
                  )}
                </div>
              </div>
            ) : null}

            {/* Tanglin EE Timeline */}
            <div className="pt-2">
              <h3 className="text-sm font-black">Tanglin EE Schedule ({EE_2027_DATA.tanglinWindow})</h3>
              <ol className="mt-2.5 grid gap-2.5 sm:grid-cols-5">
                {EE_2027_DATA.milestones.map((m) => (
                  <li key={m.date} className="rounded-xl border border-line bg-surface-2/40 p-3 text-xs">
                    <p className="font-black text-brand">{m.date}</p>
                    <p className="mt-1 leading-snug text-ink-2">{m.step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      ) : null}

      {/* ====================================================== TAB 3: CAS */}
      {tab === "cas" ? (
        <div className="space-y-6">
          <section className="card space-y-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-black">Creativity, Activity, Service (CAS)</h2>
              <span className="rounded-full bg-good-soft px-3 py-1 text-xs font-extrabold text-good">
                {CAS_DATA.guideLabel}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {CAS_DATA.strands.map((s) => (
                <div key={s.name} className="rounded-xl border border-line bg-surface-2/40 p-4">
                  <p className="text-base font-black">
                    <span aria-hidden className="mr-1.5">
                      {s.icon}
                    </span>
                    {s.name}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{s.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-brand/30 bg-brand-soft/40 p-4 text-xs leading-relaxed">
              <p className="font-black text-brand">Mandatory CAS Project Rule</p>
              <p className="mt-1 text-ink">{CAS_DATA.casProjectRule}</p>
            </div>

            <div>
              <h3 className="text-sm font-black">The 5 CAS Stages</h3>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-5">
                {CAS_DATA.stages.map((st) => (
                  <div key={st.step} className="rounded-xl border border-line bg-surface-2/40 p-3 text-xs">
                    <p className="font-black text-brand">{st.step}</p>
                    <p className="mt-1 leading-snug text-ink-2">{st.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive 7 CAS Learning Outcomes Tracker */}
          <section className="card space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black">Interactive 7 CAS Learning Outcomes Tracker</h2>
                <p className="text-xs text-ink-2">
                  Tick off each Learning Outcome as you log concrete reflection evidence in your portfolio (saved locally on this device).
                </p>
              </div>
              <span className="rounded-full bg-good-soft px-3 py-1 text-sm font-black text-good tabular-nums">
                {casDoneCount} / 7 Outcomes Evidenced
              </span>
            </div>

            <div className="grid gap-2.5 md:grid-cols-2">
              {CAS_DATA.learningOutcomes.map((lo) => {
                const checked = Boolean(casChecked[lo.id]);
                return (
                  <label
                    key={lo.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                      checked ? "border-good/40 bg-good-soft/40" : "border-line bg-surface-2/30 hover:border-brand/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCasLo(lo.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-good"
                    />
                    <div className="min-w-0 text-xs">
                      <p className="font-black text-ink">
                        {lo.code}: {lo.title}
                      </p>
                      <p className="mt-0.5 text-ink-2">{lo.description}</p>
                      <p className="mt-1 text-[11px] italic text-ink-2">Example: {lo.example}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="grid gap-4 pt-2 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface-2/40 p-4">
                <h3 className="text-sm font-black">Tanglin 5-Term CAS Schedule</h3>
                <ul className="mt-2 space-y-2 text-xs text-ink-2">
                  {CAS_DATA.tanglinSchedule.map((item) => (
                    <li key={item.term}>
                      <span className="font-extrabold text-ink">{item.term}:</span> {item.detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-gold/40 bg-gold-soft/40 p-4">
                <h3 className="text-sm font-black text-gold">Gold Duke of Edinburgh Award Dual-Counting</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink">{CAS_DATA.goldDofENote}</p>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
