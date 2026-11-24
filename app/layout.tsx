import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { HubNav } from "@/components/HubNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Year 12–13 IB Diploma Hub · All 8 Subjects & IB Core",
  description:
    "Vanishree's Year 12–13 IB Diploma study hub (Tanglin Trust School, Aug 2027 – May 2029): launcher for all 8 SL/HL apps, 3 HL + 3 SL planner, 45-point Core Matrix & failing-conditions calculator, and TOK / EE (FA2027) / CAS Core guide.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d4ed8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <HubNav />
        <main className="mx-auto max-w-6xl px-4 pt-5 pb-28 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
