"use client";

import Link from "next/link";
import { Bell, Home, MessageCircle, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { buddyAsset } from "../assets";
import { NotificationPanel } from "./notification-panel";

type FeedNavbarProps = {
  dark: boolean;
  notifyOpen: boolean;
  onNotifyToggle: () => void;
  profileOpen: boolean;
  onProfileToggle: () => void;
};

export function FeedNavbar({
  dark,
  notifyOpen,
  onNotifyToggle,
  profileOpen,
  onProfileToggle,
}: FeedNavbarProps) {
  return (
    <header
      className={cn(
        "hidden border-b shadow-[0_4px_16px_#F0F2F5] lg:block",
        dark ? "bg-buddy-dark-surface border-white/10" : "bg-buddy-surface border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1160px] items-center gap-6 px-4 py-2.5 xl:max-w-[1320px]">
        <Link href="/feed" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buddyAsset("Logo")} alt="" className="h-9 w-auto" />
        </Link>

        <form
          className="relative ml-auto w-full max-w-[424px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 left-4 h-[17px] w-[17px] -translate-y-1/2",
              dark ? "text-gray-400" : "text-[#666]",
            )}
          />
          <input
            type="search"
            placeholder="input search text"
            aria-label="Search"
            className={cn(
              "focus:ring-buddy-accent/30 h-10 w-full rounded-full border-0 py-2 pr-4 pl-11 text-base transition outline-none focus:ring-2",
              dark
                ? "bg-white/10 text-white placeholder:text-gray-400"
                : "bg-buddy-input text-buddy-text",
            )}
          />
        </form>

        <nav className="flex shrink-0 items-center gap-1">
          <Link
            href="/feed"
            className={cn(
              "rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/10",
              dark ? "text-gray-200" : "text-buddy-text",
            )}
            aria-current="page"
          >
            <Home className="h-[21px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <Link
            href="#0"
            className={cn(
              "rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/10",
              dark ? "text-gray-300" : "text-buddy-text/60",
            )}
          >
            <Users className="h-5 w-[26px]" strokeWidth={1.2} />
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={onNotifyToggle}
              className={cn(
                "relative rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/10",
                dark ? "text-gray-200" : "text-buddy-text/60",
              )}
              aria-expanded={notifyOpen}
            >
              <Bell className="h-[22px] w-5" strokeWidth={1.2} />
              <span className="bg-buddy-accent absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white">
                6
              </span>
            </button>
            <NotificationPanel open={notifyOpen} dark={dark} />
          </div>

          <Link
            href="#0"
            className={cn(
              "relative rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/10",
              dark ? "text-gray-200" : "text-buddy-text/60",
            )}
          >
            <MessageCircle className="h-[22px] w-[23px]" strokeWidth={1.2} />
            <span className="bg-buddy-accent absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium text-white">
              2
            </span>
          </Link>

          <div className="border-buddy-divider relative ml-3 flex items-center gap-2 border-l pl-4 dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={buddyAsset("Profile")}
              alt=""
              className="dark:ring-buddy-dark-surface h-10 w-10 rounded-full object-cover ring-2 ring-white"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml," +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect fill="#cbd5e1" width="40" height="40" rx="20"/></svg>`,
                  );
              }}
            />
            <div className="text-left">
              <p className={cn("text-sm font-medium", dark ? "text-white" : "text-[#112032]")}>
                Dylan Field
              </p>
              <button
                type="button"
                onClick={onProfileToggle}
                className="text-buddy-text/80 dark:text-gray-300"
                aria-expanded={profileOpen}
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
                  />
                </svg>
              </button>
            </div>

            {profileOpen ? (
              <div
                className={cn(
                  "absolute top-full right-0 z-50 mt-2 w-72 rounded-md border p-4 shadow-lg",
                  dark
                    ? "bg-buddy-dark-surface translate-y-2 border-white/10"
                    : "border-buddy-divider bg-buddy-surface translate-y-2",
                )}
              >
                <div className="mb-4 flex gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={buddyAsset("Profile")}
                    alt=""
                    className="h-[54px] w-[54px] shrink-0 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div>
                    <p className={cn("font-bold", dark ? "text-white" : "text-[#212121]")}>
                      Dylan Field
                    </p>
                    <Link href="#0" className="text-sm text-[#377DFF]">
                      View Profile
                    </Link>
                  </div>
                </div>
                <hr className={cn("mb-3", dark ? "border-white/10" : "border-buddy-divider")} />
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="#0"
                      className="hover:text-buddy-accent flex items-center justify-between text-[#666] dark:text-gray-300"
                    >
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-[#ebf2ff] p-2.5 dark:bg-white/10">
                          Settings
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#0"
                      className="hover:text-buddy-accent text-[#666] dark:text-gray-300"
                    >
                      Help & Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#0"
                      className="hover:text-buddy-accent text-[#666] dark:text-gray-300"
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
