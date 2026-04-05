"use client";

type FeedThemeToggleProps = {
  dark: boolean;
  onToggle: () => void;
};

export function FeedThemeToggle({ dark, onToggle }: FeedThemeToggleProps) {
  return (
    <div className="pointer-events-none fixed right-0 top-1/2 z-[1] -translate-y-1/2">
      <button
        type="button"
        onClick={onToggle}
        className="pointer-events-auto flex h-8 w-[66px] rotate-90 items-center rounded-[40px] border border-buddy-accent bg-buddy-accent px-2.5 transition hover:opacity-95"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="inline-block size-[18px] shrink-0 rounded-full bg-white shadow-sm" />
      </button>
    </div>
  );
}
