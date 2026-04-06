"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { buddyAsset } from "@/features/buddyscript/assets";
import * as images from "@/assets";

type Friends = {
  name: string;
  role: string;
  active: boolean;
  time?: string;
  img: keyof typeof images;
}[];

const friends: Friends = [
  { name: "Steve Jobs", role: "CEO of Apple", active: false, time: "5 minutes ago", img: "Img1" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", active: true, img: "Img2" },
  { name: "Dylan Field", role: "CEO of Figma", active: true, img: "Img3" },
  { name: "Elon Musk", role: "CEO of Tesla", active: false, time: "10 minutes ago", img: "Img4" },
  { name: "Satya Nadella", role: "CEO of Microsoft", active: true, img: "Img5" },
  { name: "Sundar Pichai", role: "CEO of Google", active: false, time: "1 hour ago", img: "Img6" },
  { name: "Tim Cook", role: "CEO of Apple", active: true, img: "Photos8" },
  { name: "Mark Zuckerberg", role: "CEO of Meta", active: false, time: "2 hours ago", img: "Img7" },
  {
    name: "Jeff Bezos",
    role: "Founder of Amazon",
    active: false,
    time: "30 minutes ago",
    img: "Img8",
  },
  { name: "Susan Wojcicki", role: "CEO of YouTube", active: true, img: "Img9" },
  {
    name: "Sheryl Sandberg",
    role: "COO of Meta",
    active: false,
    time: "3 hours ago",
    img: "Img10",
  },
  { name: "Jack Dorsey", role: "Co-founder of Twitter", active: true, img: "Img12" },
  {
    name: "Marc Andreessen",
    role: "VC at Andreessen Horowitz",
    active: false,
    time: "15 minutes ago",
    img: "Img11",
  },
  { name: "Naval Ravikant", role: "Angel Investor", active: true, img: "Friend1" },
  {
    name: "Reid Hoffman",
    role: "Co-founder of Linkedin",
    active: false,
    time: "45 minutes ago",
    img: "Friend2",
  },
  { name: "Brian Chesky", role: "CEO of Airbnb", active: true, img: "Friend3" },
  {
    name: "Evan Spiegel",
    role: "CEO of Snap Inc.",
    active: false,
    time: "20 minutes ago",
    img: "Friend4",
  },
  { name: "Daniel Ek", role: "CEO of Spotify", active: true, img: "Friend5" },
  { name: "Whitney Wolfe Herd", role: "CEO of Bumble", active: true, img: "Friend6" },
  {
    name: "Travis Kalanick",
    role: "Co-founder of Uber",
    active: false,
    time: "1 day ago",
    img: "Friend7",
  },
  {
    name: "Jack Ma",
    role: "Founder of Alibaba",
    active: false,
    time: "2 days ago",
    img: "Friend8",
  },
  { name: "Larry Page", role: "Co-founder of Google", active: true, img: "Photos3" },
  { name: "Sergey Brin", role: "Co-founder of Google", active: true, img: "Friend9" },
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
          <div className="from-buddy-border to-buddy-muted bg-linear-0-to-br relative size-14 shrink-0 rounded-full">
            <Image
              src={buddyAsset("Photos7")}
              alt={"Feed-event"}
              fill
              priority
              className="absolute w-full rounded-full bg-cover"
            />
          </div>
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
        <ul className="mt-4 space-y-4">
          {friends.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                <div className="from-buddy-border to-buddy-muted relative size-11 shrink-0 rounded-full bg-linear-to-br">
                  <Image
                    src={buddyAsset(f.img)}
                    alt={"Feed-event"}
                    fill
                    priority
                    className="absolute w-full rounded-full bg-cover"
                  />
                </div>
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
                  <span className="bg-buddy-green dark:ring-buddy-dark-surface inline-block size-2.5 rounded-full ring-2 ring-white" />
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
