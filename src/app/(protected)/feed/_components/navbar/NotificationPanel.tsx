"use client";

import Image from "next/image";
import * as images from "@/assets";

export function NotificationPanel() {
  return (
    <div className="font-poppins border-buddy-border bg-buddy-surface absolute top-full right-0 z-50 mt-2 w-[min(100vw-2rem,400px)] overflow-hidden rounded-md border shadow-xl transition">
      <div className="border-buddy-border flex items-center justify-between border-b p-4">
        <h4 className="text-buddy-heading text-lg font-semibold">Notifications</h4>
        <button type="button" className="text-buddy-subtle p-1" aria-label="More">
          <span className="inline-block h-1 w-1 rounded-full bg-current" />
        </button>
      </div>
      <div className="border-buddy-border flex gap-2 border-b p-3">
        <button
          type="button"
          className="bg-buddy-accent rounded-md px-4 py-1.5 text-sm font-medium text-white"
        >
          All
        </button>
        <button
          type="button"
          className="text-buddy-muted hover:bg-buddy-canvas dark:text-buddy-text/80 rounded-md px-4 py-1.5 text-sm font-medium dark:hover:bg-white/10"
        >
          Unread
        </button>
      </div>
      <div className="scrollbar-smart max-h-[600px] overflow-y-auto">
        {Array.from({ length: 12 }, (_, i) => {
          const imgKey = `Img${i + 1}` as keyof typeof images;
          const imgSrc = images[imgKey] as string;
          return (
            <div
              key={i}
              className="border-buddy-divider hover:bg-buddy-canvas/80 flex gap-3 border-b p-3 last:border-0 dark:hover:bg-white/5"
            >
              <Image
                src={imgSrc}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-buddy-text text-sm leading-snug">
                  {i % 2 === 0 ? (
                    <>
                      <span className="text-buddy-heading font-medium">Steve Jobs</span> posted a
                      link in your timeline.
                    </>
                  ) : (
                    <>
                      An admin changed the group{" "}
                      <span className="text-buddy-heading font-semibold">Freelacer usa</span>.
                    </>
                  )}
                </p>
                <p className="text-buddy-accent mt-1 text-xs font-semibold">42 minutes ago</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
