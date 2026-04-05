"use client";

import { useTheme } from "next-themes";

export function FeedThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed top-1/2 right-0 z-60 -translate-y-1/2">
      <button
        type="button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        className="border-buddy-accent bg-buddy-accent pointer-events-auto flex h-8 w-[66px] rotate-90 items-center rounded-[40px] border px-2.5 transition hover:opacity-95"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="inline-block size-[18px] shrink-0 rounded-full bg-white shadow-sm" />
      </button>
    </div>
  );
}
