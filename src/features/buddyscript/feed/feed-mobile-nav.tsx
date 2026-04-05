"use client";

import Link from "next/link";
import { Bell, Home, Menu, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedMobileNavProps = {
  dark: boolean;
};

export function FeedMobileNav({ dark }: FeedMobileNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t lg:hidden",
        dark ? "border-white/10 bg-buddy-dark-surface" : "border-buddy-divider bg-buddy-surface",
      )}
    >
      <ul className="flex items-center justify-around px-2 py-2">
        <li>
          <Link
            href="/feed"
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 text-xs",
              dark ? "text-buddy-accent" : "text-buddy-accent",
            )}
          >
            <Home className="h-6 w-6" strokeWidth={1.5} />
          </Link>
        </li>
        <li>
          <Link
            href="#0"
            className={cn("flex flex-col items-center p-2", dark ? "text-gray-300" : "text-buddy-text/60")}
          >
            <Users className="h-6 w-6" />
          </Link>
        </li>
        <li>
          <Link
            href="#0"
            className={cn("relative flex flex-col items-center p-2", dark ? "text-gray-300" : "text-buddy-text/60")}
          >
            <Bell className="h-6 w-6" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-buddy-accent px-1 text-[9px] text-white">
              6
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="#0"
            className={cn("relative flex flex-col items-center p-2", dark ? "text-gray-300" : "text-buddy-text/60")}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-buddy-accent px-1 text-[9px] text-white">
              2
            </span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className={cn("flex flex-col items-center p-2", dark ? "text-gray-300" : "text-buddy-text/60")}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
