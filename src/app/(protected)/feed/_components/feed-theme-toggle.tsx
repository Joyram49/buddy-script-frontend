"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function FeedThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed top-1/2 right-4 z-50 -translate-y-1/2 rotate-90">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle Theme"
        className="bg-muted dark:border-buddy-accent border-buddy-divider relative flex h-9 w-16 items-center rounded-full border px-0"
      >
        {/* Track Icons (muted) */}
        <div className="flex w-full items-center justify-between px-2">
          <Sun className="text-muted-foreground size-4 opacity-60" />
          <Moon className="text-muted-foreground size-4 opacity-60" />
        </div>

        {/* Sliding Thumb */}
        <span
          className={`bg-background absolute left-1 flex size-7 items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
            isDark ? "translate-x-7" : "translate-x-0"
          }`}
        >
          {isDark ? (
            <Moon className="size-4 text-blue-400" />
          ) : (
            <Sun className="size-4 text-yellow-500" />
          )}
        </span>
      </button>
    </div>
  );
}
