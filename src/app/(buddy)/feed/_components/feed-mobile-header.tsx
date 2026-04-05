"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import Logo from "@/assets/images/logo.svg";

export function FeedMobileHeader() {
  return (
    <div
      className="border-buddy-border bg-buddy-surface border-b lg:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3">
        <Link href="/feed">
          <Image src={Logo} alt="Buddy Logo" width={116} height={32} className="h-8 w-auto" />
        </Link>
        <Link href="#0" className="text-buddy-muted rounded-full p-2" aria-label="Search">
          <Search className="h-[17px] w-[17px]" />
        </Link>
      </div>
    </div>
  );
}
