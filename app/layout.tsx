import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { HubNav } from "@/components/HubNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Year 12–13 IB Diploma Hub · All 8 Subjects & IB Core",
  description:
    "Vanishree's Year 12–13 IB Diploma study hub (Tanglin Trust School, Aug 2027 – May 2029): launcher for all 8 SL/HL apps, 3 HL + 3 SL planner, 45-point Core Matrix & failing-conditions calculator, and TOK / EE (FA2027) / CAS Core guide.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Year 12 Hub",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fc" },
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
