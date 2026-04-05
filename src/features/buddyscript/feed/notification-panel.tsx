"use client";

import { cn } from "@/lib/utils";
import { buddyAsset } from "../assets";

type NotificationPanelProps = {
  open: boolean;
  dark: boolean;
};

export function NotificationPanel({ open, dark }: NotificationPanelProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,380px)] rounded-md border shadow-xl transition",
        dark ? "border-white/10 bg-buddy-dark-surface" : "border-buddy-divider bg-buddy-surface",
      )}
    >
      <div className="flex items-center justify-between border-b border-buddy-divider p-4 dark:border-white/10">
        <h4 className={cn("text-base font-semibold", dark ? "text-white" : "text-buddy-heading")}>
          Notifications
        </h4>
        <button type="button" className="p-1 text-buddy-subtle" aria-label="More">
          <span className="inline-block h-1 w-1 rounded-full bg-current" />
        </button>
      </div>
      <div className="flex gap-2 border-b border-buddy-divider p-3 dark:border-white/10">
        <button
          type="button"
          className="rounded-md bg-buddy-accent px-4 py-1.5 text-sm font-medium text-white"
        >
          All
        </button>
        <button
          type="button"
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium",
            dark ? "text-gray-300 hover:bg-white/10" : "text-buddy-muted hover:bg-buddy-canvas",
          )}
        >
          Unread
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3 border-b border-buddy-divider p-3 last:border-0 dark:border-white/10",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={buddyAsset(i % 2 === 0 ? "images/logo.svg" : "images/google.svg")}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm leading-snug", dark ? "text-gray-200" : "text-buddy-text")}>
                {i % 2 === 0 ? (
                  <>
                    <span className="font-medium text-buddy-accent">Steve Jobs</span> posted a link in
                    your timeline.
                  </>
                ) : (
                  <>
                    An admin changed the group{" "}
                    <span className="font-medium text-buddy-accent">Freelacer usa</span>.
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-buddy-subtle">42 miniutes ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
