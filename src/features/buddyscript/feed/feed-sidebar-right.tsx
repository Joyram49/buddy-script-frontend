"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedSidebarRightProps = {
  dark: boolean;
};

const friends = [
  { name: "Steve Jobs", role: "CEO of Apple", active: false, time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", active: true },
  { name: "Dylan Field", role: "CEO of Figma", active: true },
  { name: "Steve Jobs", role: "CEO of Apple", active: false, time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", active: true },
];

export function FeedSidebarRight({ dark }: FeedSidebarRightProps) {
  return (
    <aside className="space-y-4">
      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h4 className={cn("text-xl font-medium", dark ? "text-white" : "text-[#212121]")}>
            You Might Like
          </h4>
          <Link href="#0" className="text-sm text-buddy-accent">
            See All
          </Link>
        </div>
        <hr className={cn("mb-4 border-buddy-divider dark:border-white/10")} />
        <div className="flex gap-3">
          <div className="size-14 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
          <div className="min-w-0 flex-1">
            <Link
              href="#0"
              className={cn(
                "block truncate font-medium hover:text-buddy-accent",
                dark ? "text-white" : "text-[#212121]",
              )}
            >
              Radovan SkillArena
            </Link>
            <p className="truncate text-xs text-buddy-muted">Founder & CEO at Trophy</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className={cn(
                  "flex-1 rounded-md border py-2 text-xs font-medium transition",
                  dark
                    ? "border-white/20 text-gray-200 hover:bg-white/10"
                    : "border-buddy-border text-buddy-text hover:bg-buddy-canvas",
                )}
              >
                Ignore
              </button>
              <button
                type="button"
                className="flex-1 rounded-md border border-buddy-accent bg-buddy-accent py-2 text-xs font-medium text-white hover:opacity-90"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h4 className={cn("text-xl font-medium", dark ? "text-white" : "text-[#212121]")}>
            Your Friends
          </h4>
          <Link href="#0" className="text-sm text-buddy-accent">
            See All
          </Link>
        </div>
        <form className="relative mb-4" onSubmit={(e) => e.preventDefault()}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
          <input
            type="search"
            placeholder="input search text"
            className={cn(
              "h-10 w-full rounded-full border-0 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-buddy-accent/30",
              dark ? "bg-white/10 text-white placeholder:text-gray-400" : "bg-buddy-input",
            )}
          />
        </form>
        <ul className="max-h-80 space-y-3 overflow-y-auto">
          {friends.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                <div className="min-w-0">
                  <Link
                    href="#0"
                    className={cn(
                      "block truncate text-sm font-medium hover:text-buddy-accent",
                      dark ? "text-white" : "text-[#212121]",
                    )}
                  >
                    {f.name}
                  </Link>
                  <p className="truncate text-xs text-buddy-muted">{f.role}</p>
                </div>
              </div>
              <div className="shrink-0 text-xs text-buddy-muted">
                {f.active ? (
                  <span className="inline-block size-3.5 rounded-full bg-buddy-green ring-2 ring-white dark:ring-buddy-dark-surface" />
                ) : (
                  <span>{f.time}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
