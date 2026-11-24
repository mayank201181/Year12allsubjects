"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const NAV_ITEMS = [
  { href: "/", icon: "🎓", label: "Subjects & 45-Pt Planner", shortLabel: "Hub" },
  { href: "/core", icon: "🧭", label: "IB Core: TOK · EE · CAS", shortLabel: "IB Core" },
] as const;

type ThemeChoice = "light" | "dark";
const themeListeners = new Set<() => void>();

function readTheme(): ThemeChoice {
  try {
    const saved = window.localStorage.getItem("y12hub.theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function subscribeTheme(onChange: () => void): () => void {
  themeListeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key === "y12hub.theme") onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    themeListeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function HubNav() {
  const pathname = usePathname();
  const theme = useSyncExternalStore<ThemeChoice>(subscribeTheme, readTheme, () => "light");

  const toggleTheme = () => {
    const next: ThemeChoice = theme === "dark" ? "light" : "dark";
    try {
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("y12hub.theme", next);
    } catch {
      /* ignore */
    }
    for (const l of themeListeners) l();
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-sm font-black text-brand-ink"
            >
              IB
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black tracking-tight sm:text-base">Year 12–13 IB Diploma Hub</p>
              <p className="truncate text-xs text-ink-2">Tanglin Cohort · Aug 2027 – May 2029</p>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1.5 sm:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3.5 py-2 text-sm font-bold transition ${
                    active ? "bg-brand text-brand-ink" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  <span aria-hidden className="mr-1.5">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="shrink-0 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs font-bold text-ink transition hover:border-brand/40"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-2 backdrop-blur"
      >
        <div className="mx-auto flex max-w-md items-center justify-around gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold transition ${
                  active ? "bg-brand text-brand-ink shadow-sm" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
