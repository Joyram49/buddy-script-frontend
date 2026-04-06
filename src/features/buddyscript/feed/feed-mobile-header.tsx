"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buddyAsset } from "../assets";

type FeedMobileHeaderProps = {
  dark: boolean;
};

export function FeedMobileHeader({ dark }: FeedMobileHeaderProps) {
  return (
    <div
      className={cn(
        "border-b lg:hidden",
        dark ? "bg-buddy-dark-surface border-white/10" : "border-buddy-divider bg-buddy-surface",
      )}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3">
        <Link href="/feed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buddyAsset("Logo")} alt="" className="h-8 w-auto" />
        </Link>
        <Link
          href="#0"
          className={cn("rounded-full p-2", dark ? "text-gray-200" : "text-[#666]")}
          aria-label="Search"
        >
          <Search className="h-[17px] w-[17px]" />
        </Link>
      </div>
    </div>
  );
}
