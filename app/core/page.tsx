import type { Metadata } from "next";
import { CoreWorkspace } from "@/components/CoreWorkspace";

export const metadata: Metadata = {
  title: "IB Core: TOK, Extended Essay (FA2027) & CAS · Year 12–13 Hub",
  description:
    "Interactive IB Core toolkit: all 35 TOK Exhibition IA Prompts, 3-object specificity checker, NEW FA2027 30-mark Extended Essay rubric & RQ tester, and 7 CAS Learning Outcomes tracker.",
};

export default function CorePage() {
  return <CoreWorkspace />;
}
