"use client";

import { BookText, CalendarDays, ImageIcon, Send, Video } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { buddyAsset } from "@/features/buddyscript/assets";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] shadow-sm dark:shadow-none";

export function PostComposer() {
  return (
    <div className={cn("rounded-md p-6", cardClass)}>
      <div className="flex gap-3">
        <div className="from-buddy-border to-buddy-muted relative size-12 shrink-0 overflow-hidden rounded-full bg-linear-to-br">
          <Image
            src={buddyAsset("Profile")}
            alt="profile-image"
            fill
            priority
            className="absolute rounded-full bg-cover object-cover"
          />
        </div>
        <div className="relative flex-1">
          <textarea
            id="composer"
            placeholder="Write something ..."
            rows={3}
            className={cn(
              "focus:ring-buddy-accent/30 w-full resize-none rounded-md border px-3 py-3 text-sm outline-none focus:ring-2",
              "border-buddy-border bg-buddy-surface text-buddy-text placeholder:text-buddy-muted",
              "dark:text-buddy-heading dark:border-white/10 dark:bg-white/5",
            )}
          />
        </div>
      </div>
      <div className="border-buddy-divider mt-4 hidden flex-wrap items-center justify-between gap-3 border-t pt-4 sm:flex">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <ImageIcon className="h-5 w-5" />, label: "Photo" },
            { icon: <Video className="h-5 w-5" />, label: "Video" },
            { icon: <CalendarDays className="h-5 w-5" />, label: "Event" },
            { icon: <BookText className="h-5 w-5" />, label: "Article" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="bg-buddy-accent flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white hover:shadow-md"
        >
          <Send className="h-4 w-4" />
          Post
        </button>
      </div>
    </div>
  );
}
