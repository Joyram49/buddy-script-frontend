"use client";

import { buddyAsset } from "@/features/buddyscript/assets";

export function NotificationPanel() {
  return (
    <div className="font-poppins absolute top-full right-0 z-50 mt-2 w-[min(100vw-2rem,400px)] overflow-hidden rounded-md border border-buddy-border bg-buddy-surface shadow-xl transition">
      <div className="flex items-center justify-between border-b border-buddy-border p-4">
        <h4 className="text-lg font-semibold text-buddy-heading">Notifications</h4>
        <button type="button" className="text-buddy-subtle p-1" aria-label="More">
          <span className="inline-block h-1 w-1 rounded-full bg-current" />
        </button>
      </div>
      <div className="flex gap-2 border-b border-buddy-border p-3">
        <button
          type="button"
          className="rounded-md bg-buddy-accent px-4 py-1.5 text-sm font-medium text-white"
        >
          All
        </button>
        <button
          type="button"
          className="rounded-md px-4 py-1.5 text-sm font-medium text-buddy-muted hover:bg-buddy-canvas dark:text-buddy-text/80 dark:hover:bg-white/10"
        >
          Unread
        </button>
      </div>
      <div className="scrollbar-smart max-h-[600px] overflow-y-auto">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex gap-3 border-b border-buddy-divider p-3 last:border-0 hover:bg-buddy-canvas/80 dark:hover:bg-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={buddyAsset(i % 2 === 0 ? "images/img2.png" : "images/img3.png")}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-buddy-text">
                {i % 2 === 0 ? (
                  <>
                    <span className="font-medium text-buddy-heading">Steve Jobs</span> posted a link in
                    your timeline.
                  </>
                ) : (
                  <>
                    An admin changed the group{" "}
                    <span className="font-semibold text-buddy-heading">Freelacer usa</span>.
                  </>
                )}
              </p>
              <p className="text-buddy-accent mt-1 text-xs font-semibold">42 minutes ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
