"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import SearchForm from "./SearchForm";
import NavLinks from "./NavLinks";
import { buddyAsset } from "@/features/buddyscript/assets";

export function FeedNavbar() {
  return (
    <header
      className={cn(
        "border-buddy-border bg-buddy-surface hidden border-b shadow-[0_4px_16px_rgba(0,0,0,0.06)] lg:block dark:shadow-none",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-4 py-2.5 xl:max-w-[1320px]">
        <Link href="/feed" className="shrink-0">
          <Image
            src={buddyAsset("Logo")}
            alt="Buddy Logo"
            width={150}
            height={36}
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 justify-center">
            <SearchForm />
          </div>

          <NavLinks />
        </div>
      </div>
    </header>
  );
}
