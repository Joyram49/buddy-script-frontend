"use client";

import Link from "next/link";
import { Bookmark, Gamepad2, Settings, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedSidebarLeftProps = {
  dark: boolean;
};

const link = (dark: boolean) =>
  cn(
    "flex items-center gap-3 rounded-md py-2 text-sm font-medium transition hover:text-buddy-accent",
    dark ? "text-gray-300" : "text-[#666]",
  );

export function FeedSidebarLeft({ dark }: FeedSidebarLeftProps) {
  return (
    <aside className="space-y-4">
      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <h4 className={cn("mb-6 text-xl font-medium", dark ? "text-white" : "text-[#212121]")}>
          Explore
        </h4>
        <ul className="space-y-1">
          <li className="flex items-center justify-between">
            <Link href="#0" className={link(dark)}>
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-buddy-accent/10 text-xs">
                ◎
              </span>
              Learning
            </Link>
            <span className="rounded bg-buddy-accent/15 px-2 py-0.5 text-xs font-medium text-buddy-accent">
              New
            </span>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <span className="text-[#666] dark:text-gray-400">▤</span>
              Insights
            </Link>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <UserPlus className="h-5 w-5 text-[#666] dark:text-gray-400" />
              Find friends
            </Link>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <Bookmark className="h-5 w-5 text-[#666] dark:text-gray-400" />
              Bookmarks
            </Link>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <Users className="h-5 w-5 text-[#666] dark:text-gray-400" />
              Group
            </Link>
          </li>
          <li className="flex items-center justify-between">
            <Link href="#0" className={link(dark)}>
              <Gamepad2 className="h-5 w-5 text-[#666] dark:text-gray-400" />
              Gaming
            </Link>
            <span className="rounded bg-buddy-accent/15 px-2 py-0.5 text-xs font-medium text-buddy-accent">
              New
            </span>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <Settings className="h-5 w-5 text-[#666] dark:text-gray-400" />
              Settings
            </Link>
          </li>
          <li>
            <Link href="#0" className={link(dark)}>
              <span className="text-[#666] dark:text-gray-400">⭳</span>
              Save post
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h4 className={cn("text-xl font-medium", dark ? "text-white" : "text-[#212121]")}>
            Suggested People
          </h4>
          <Link href="#0" className="text-sm text-buddy-accent">
            See All
          </Link>
        </div>
        {[
          { name: "Steve Jobs", role: "CEO of Apple" },
          { name: "Ryan Roslansky", role: "CEO of Linkedin" },
          { name: "Dylan Field", role: "CEO of Figma" },
        ].map((p) => (
          <div
            key={p.name}
            className="mb-4 flex items-center justify-between gap-2 last:mb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="size-12 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
              <div className="min-w-0">
                <Link
                  href="#0"
                  className={cn(
                    "block truncate font-medium hover:text-buddy-accent",
                    dark ? "text-white" : "text-[#212121]",
                  )}
                >
                  {p.name}
                </Link>
                <p className="truncate text-xs text-buddy-muted">{p.role}</p>
              </div>
            </div>
            <Link
              href="#0"
              className="shrink-0 rounded-md border border-buddy-accent px-3 py-1 text-xs font-medium text-buddy-accent hover:bg-buddy-accent hover:text-white"
            >
              Connect
            </Link>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <h4 className={cn("text-xl font-medium", dark ? "text-white" : "text-[#212121]")}>Events</h4>
          <Link href="#0" className="text-sm text-buddy-accent">
            See all
          </Link>
        </div>
        {[1, 2].map((i) => (
          <Link
            key={i}
            href="#0"
            className={cn(
              "mb-4 block overflow-hidden rounded-md border last:mb-0",
              dark ? "border-white/10" : "border-buddy-divider",
            )}
          >
            <div className="aspect-[2/1] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" />
            <div className="flex gap-3 p-3">
              <div className="flex flex-col items-center rounded bg-buddy-canvas px-2 py-1 text-center dark:bg-white/10">
                <span className="text-lg font-semibold text-buddy-accent">10</span>
                <span className="text-xs text-buddy-muted">Jul</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium", dark ? "text-white" : "text-[#212121]")}>
                  No more terrorism no more cry
                </p>
              </div>
            </div>
            <hr className={cn("border-buddy-divider dark:border-white/10")} />
            <div className="flex items-center justify-between px-3 py-2 text-xs">
              <span className="text-buddy-muted">17 People Going</span>
              <span className="font-medium text-buddy-accent">Going</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
