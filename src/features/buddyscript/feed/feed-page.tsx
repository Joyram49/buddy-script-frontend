"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FeedMobileHeader } from "./feed-mobile-header";
import { FeedMobileNav } from "./feed-mobile-nav";
import { FeedMainColumn } from "./feed-main-column";
import { FeedNavbar } from "./feed-navbar";
import { FeedSidebarLeft } from "./feed-sidebar-left";
import { FeedSidebarRight } from "./feed-sidebar-right";
import { FeedThemeToggle } from "./feed-theme-toggle";

export function FeedPage() {
  const [dark, setDark] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col font-sans",
        dark ? "bg-buddy-dark-bg text-gray-100" : "bg-buddy-canvas text-buddy-text",
      )}
    >
      <FeedThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden",
          dark ? "bg-buddy-dark-bg" : "bg-buddy-canvas",
        )}
      >
        <FeedNavbar
          dark={dark}
          notifyOpen={notifyOpen}
          onNotifyToggle={() => {
            setNotifyOpen((v) => !v);
            setProfileOpen(false);
          }}
          profileOpen={profileOpen}
          onProfileToggle={() => {
            setProfileOpen((v) => !v);
            setNotifyOpen(false);
          }}
        />
        <FeedMobileHeader dark={dark} />

        <div
          className={cn(
            "mx-auto w-full max-w-[1160px] flex-1 overflow-y-auto px-4 py-2.5 xl:max-w-[1320px]",
          )}
        >
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
            <div className="hidden lg:col-span-3 lg:block">
              <FeedSidebarLeft dark={dark} />
            </div>
            <div className="lg:col-span-6">
              <FeedMainColumn dark={dark} />
            </div>
            <div className="hidden lg:col-span-3 lg:block">
              <FeedSidebarRight dark={dark} />
            </div>
          </div>
        </div>

        <FeedMobileNav dark={dark} />
      </div>
    </div>
  );
}
