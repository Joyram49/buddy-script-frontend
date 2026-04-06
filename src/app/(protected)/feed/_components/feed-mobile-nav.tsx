"use client";

import Link from "next/link";
import { Bell, Home, Menu, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedMobileNav() {
  return (
    <nav
      className={cn(
        "border-buddy-border bg-buddy-surface fixed right-0 bottom-0 left-0 z-40 border-t lg:hidden",
      )}
    >
      <ul className="flex items-center justify-around px-2 py-2">
        <li>
          <Link
            href="/feed"
            className="text-buddy-accent flex flex-col items-center gap-0.5 p-2 text-xs"
          >
            <Home className="h-6 w-6" strokeWidth={1.5} />
          </Link>
        </li>
        <li>
          <Link href="#0" className="text-buddy-text/60 flex flex-col items-center p-2">
            <Users className="h-6 w-6" />
          </Link>
        </li>
        <li>
          <Link href="#0" className="text-buddy-text/60 relative flex flex-col items-center p-2">
            <Bell className="h-6 w-6" />
            <span className="bg-buddy-accent absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] text-white">
              6
            </span>
          </Link>
        </li>
        <li>
          <Link href="#0" className="text-buddy-text/60 relative flex flex-col items-center p-2">
            <MessageCircle className="h-6 w-6" />
            <span className="bg-buddy-accent absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] text-white">
              2
            </span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="text-buddy-text/60 flex flex-col items-center p-2"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
