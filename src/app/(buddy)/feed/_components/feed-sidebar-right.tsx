"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const friends = [
  { name: "Steve Jobs", role: "CEO of Apple", active: false, time: "5 minutes ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", active: true },
  { name: "Dylan Field", role: "CEO of Figma", active: true },
  { name: "Elon Musk", role: "CEO of Tesla", active: false, time: "10 minutes ago" },
  { name: "Satya Nadella", role: "CEO of Microsoft", active: true },
  { name: "Sundar Pichai", role: "CEO of Google", active: false, time: "1 hour ago" },
  { name: "Tim Cook", role: "CEO of Apple", active: true },
  { name: "Mark Zuckerberg", role: "CEO of Meta", active: false, time: "2 hours ago" },
  { name: "Jeff Bezos", role: "Founder of Amazon", active: false, time: "30 minutes ago" },
  { name: "Susan Wojcicki", role: "CEO of YouTube", active: true },
  { name: "Sheryl Sandberg", role: "COO of Meta", active: false, time: "3 hours ago" },
  { name: "Jack Dorsey", role: "Co-founder of Twitter", active: true },
  {
    name: "Marc Andreessen",
    role: "VC at Andreessen Horowitz",
    active: false,
    time: "15 minutes ago",
  },
  { name: "Naval Ravikant", role: "Angel Investor", active: true },
  { name: "Reid Hoffman", role: "Co-founder of Linkedin", active: false, time: "45 minutes ago" },
  { name: "Brian Chesky", role: "CEO of Airbnb", active: true },
  { name: "Evan Spiegel", role: "CEO of Snap Inc.", active: false, time: "20 minutes ago" },
  { name: "Daniel Ek", role: "CEO of Spotify", active: true },
  { name: "Whitney Wolfe Herd", role: "CEO of Bumble", active: true },
  { name: "Travis Kalanick", role: "Co-founder of Uber", active: false, time: "1 day ago" },
  { name: "Jack Ma", role: "Founder of Alibaba", active: false, time: "2 days ago" },
  { name: "Larry Page", role: "Co-founder of Google", active: true },
  { name: "Sergey Brin", role: "Co-founder of Google", active: true },
];

const cardClass =
  "rounded-md bg-buddy-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none";

export function FeedSidebarRight() {
  return (
    <aside className="space-y-4">
      <div className={cardClass}>
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-buddy-heading text-xl font-medium">You Might Like</h4>
          <Link href="#0" className="text-buddy-accent text-sm">
            See All
          </Link>
        </div>
        <hr className="border-buddy-divider mb-4" />
        <div className="flex gap-3">
          <div className="from-buddy-border to-buddy-muted bg-linear-0-to-br size-14 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Link
              href="#0"
              className="text-buddy-heading hover:text-buddy-accent block truncate font-medium"
            >
              Radovan SkillArena
            </Link>
            <p className="text-buddy-muted truncate text-xs">Founder & CEO at Trophy</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="border-buddy-border text-buddy-text hover:bg-buddy-canvas dark:text-buddy-text flex-1 rounded-md border py-2 text-xs font-medium transition dark:border-white/20 dark:hover:bg-white/10"
              >
                Ignore
              </button>
              <button
                type="button"
                className="border-buddy-accent bg-buddy-accent flex-1 rounded-md border py-2 text-xs font-medium text-white hover:opacity-90"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-buddy-heading text-xl font-medium">Your Friends</h4>
          <Link href="#0" className="text-buddy-accent text-sm">
            See All
          </Link>
        </div>
        <form className="relative mb-4" onSubmit={(e) => e.preventDefault()}>
          <Search className="text-buddy-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            placeholder="input search text"
            className={cn(
              "focus:ring-buddy-accent/30 bg-buddy-input text-buddy-text placeholder:text-buddy-muted h-10 w-full rounded-full border-0 py-2 pr-4 pl-10 text-sm outline-none focus:ring-2",
              "dark:text-buddy-heading dark:bg-white/10",
            )}
          />
        </form>
        <ul className="space-y-3">
          {friends.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <div className="from-buddy-border to-buddy-muted size-11 shrink-0 rounded-full bg-linear-to-br" />
                <div className="min-w-0">
                  <Link
                    href="#0"
                    className="text-buddy-heading hover:text-buddy-accent block truncate text-sm font-medium"
                  >
                    {f.name}
                  </Link>
                  <p className="text-buddy-muted truncate text-xs">{f.role}</p>
                </div>
              </div>
              <div className="text-buddy-muted shrink-0 text-xs">
                {f.active ? (
                  <span className="bg-buddy-green dark:ring-buddy-dark-surface inline-block size-3.5 rounded-full ring-2 ring-white" />
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
