"use client";

import { FeedMobileHeader } from "./_components/feed-mobile-header";
import { FeedMobileNav } from "./_components/feed-mobile-nav";

import { FeedNavbar } from "./_components/navbar/FeedNavbar";
import { FeedSidebarLeft } from "./_components/FeedSidebarLeft";
import { FeedSidebarRight } from "./_components/FeedSidebarRight";
import { FeedThemeToggle } from "./_components/feed-theme-toggle";
import { FeedMainColumn } from "./_components/content";

export default function FeedPage() {
  return (
    <div className="font-poppins bg-background text-foreground flex h-dvh flex-col overflow-hidden">
      <FeedThemeToggle />

      <div className="fixed inset-x-0 top-0 z-40">
        <FeedNavbar />
        <FeedMobileHeader />
      </div>

      <div className="bg-background flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex min-h-0 w-full max-w-[1160px] flex-1 px-4 py-2.5 xl:max-w-[1320px]">
          <div className="grid min-h-0 w-full gap-4 lg:grid-cols-12 lg:gap-6">
            <div className="no-scrollbar hidden min-h-0 overflow-y-auto pt-18 pr-1 lg:col-span-3 lg:block">
              <FeedSidebarLeft />
            </div>
            <div className="no-scrollbar min-h-0 overflow-y-auto pt-18 lg:col-span-6">
              <FeedMainColumn />
            </div>
            <div className="no-scrollbar hidden min-h-0 overflow-y-auto pt-18 pl-1 lg:col-span-3 lg:block">
              <FeedSidebarRight />
            </div>
          </div>
        </div>

        <FeedMobileNav />
      </div>
    </div>
  );
}
