"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageIcon, MoreVertical, Send, Smile, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { buddyAsset } from "../assets";

type FeedMainColumnProps = {
  dark: boolean;
};

function PostCard({ dark, index }: { dark: boolean; index: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-md shadow-sm",
        dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
      )}
    >
      <div className="border-b border-buddy-divider px-6 pb-4 pt-6 dark:border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="size-12 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
            <div>
              <h4 className={cn("font-semibold", dark ? "text-white" : "text-[#212121]")}>
                Karim Saif
              </h4>
              <p className="text-sm text-buddy-muted">
                5 minute ago . <Link href="#0" className="text-buddy-accent">Public</Link>
              </p>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              className="p-1 text-buddy-subtle hover:text-buddy-text dark:hover:text-white"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen ? (
              <ul
                className={cn(
                  "absolute right-0 top-full z-20 mt-1 min-w-[200px] rounded-md border py-2 shadow-lg",
                  dark ? "border-white/10 bg-buddy-dark-surface" : "border-buddy-divider bg-buddy-surface",
                )}
              >
                {["Save Post", "Turn On Notification", "Hide", "Edit Post", "Delete Post"].map(
                  (t) => (
                    <li key={t}>
                      <Link
                        href="#0"
                        className="block px-4 py-2 text-sm text-[#666] hover:bg-buddy-canvas hover:text-buddy-accent dark:text-gray-300 dark:hover:bg-white/10"
                      >
                        {t}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            ) : null}
          </div>
        </div>
        <h3 className={cn("mt-4 font-medium", dark ? "text-white" : "text-buddy-heading")}>
          -Healthy Tracking App
        </h3>
        <div className="mt-4 overflow-hidden rounded-md">
          <div className="aspect-video w-full bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={buddyAsset("images/timeline_img.png")}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-buddy-divider px-6 py-4 dark:border-white/10">
        <div className="flex items-center gap-1">
          {["from-amber-200 to-orange-300", "from-pink-200 to-rose-400", "from-blue-200 to-indigo-400"].map(
            (g, i) => (
              <div
                key={i}
                className={cn("-ml-1 size-8 rounded-full border-2 border-white bg-gradient-to-br first:ml-0 dark:border-buddy-dark-surface", g)}
              />
            ),
          )}
          <span className="ml-2 text-sm text-buddy-muted">9+</span>
        </div>
        <div className="flex gap-4 text-sm text-buddy-muted">
          {index === 0 ? (
            <Link href="#0" className="hover:text-buddy-accent">
              <span className="font-medium text-buddy-text dark:text-gray-200">12</span> Comment
            </Link>
          ) : (
            <span>
              <span className="font-medium text-buddy-text dark:text-gray-200">12</span> Comment
            </span>
          )}
          <span>
            <span className="font-medium text-buddy-text dark:text-gray-200">122</span> Share
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-buddy-divider px-6 py-3 dark:border-white/10">
        <button
          type="button"
          className="flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-md bg-buddy-canvas/80 py-2 text-sm font-medium text-buddy-heading dark:bg-white/10 dark:text-white"
        >
          <span className="text-lg">😄</span> Haha
        </button>
        <button
          type="button"
          className="flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-md py-2 text-sm text-buddy-text dark:text-gray-200"
        >
          Comment
        </button>
        <button
          type="button"
          className="flex flex-1 min-w-[100px] items-center justify-center gap-2 rounded-md py-2 text-sm text-buddy-text dark:text-gray-200"
        >
          Share
        </button>
      </div>

      <div className="p-6 pt-4">
        <div className="flex gap-3">
          <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
          <div className="relative flex-1">
            <textarea
              placeholder="Write a comment"
              rows={2}
              className={cn(
                "w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-buddy-accent/30",
                dark
                  ? "border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                  : "border-buddy-border bg-buddy-surface text-buddy-text",
              )}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button type="button" className="p-1.5 text-buddy-muted hover:text-buddy-accent">
                <Smile className="h-4 w-4" />
              </button>
              <button type="button" className="p-1.5 text-buddy-muted hover:text-buddy-accent">
                <ImageIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 text-sm font-medium text-buddy-accent hover:underline"
        >
          View 4 previous comments
        </button>
        <div className="mt-4 flex gap-3">
          <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
          <div className="flex-1 rounded-md bg-buddy-canvas/60 p-3 dark:bg-white/5">
            <p className="text-sm font-medium text-buddy-text dark:text-gray-100">Radovan SkillArena</p>
            <p className="mt-1 text-sm leading-relaxed text-buddy-muted dark:text-gray-300">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-buddy-muted">
              <span>Like.</span>
              <span>Reply.</span>
              <span>Share</span>
              <span>.21m</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeedMainColumn({ dark }: FeedMainColumnProps) {
  return (
    <div className="space-y-4 pb-24 lg:pb-6">
      <div
        className={cn(
          "relative rounded-md p-4 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Your Story", "Ryan", "Ryan", "Ryan"].map((label, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] overflow-hidden rounded-md bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="truncate text-center text-xs text-white">{label}</p>
              </div>
              {i === 0 ? (
                <button
                  type="button"
                  className="absolute bottom-8 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-buddy-accent text-white shadow-md"
                >
                  +
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "rounded-md p-6 shadow-sm",
          dark ? "bg-buddy-dark-surface" : "bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="flex gap-3">
          <div className="size-12 shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
          <div className="relative flex-1">
            <textarea
              id="composer"
              placeholder="Write something ..."
              rows={3}
              className={cn(
                "w-full resize-none rounded-md border px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-buddy-accent/30",
                dark
                  ? "border-white/10 bg-white/5 text-white placeholder:text-gray-500"
                  : "border-buddy-border bg-buddy-surface placeholder:text-buddy-muted",
              )}
            />
          </div>
        </div>
        <div className="mt-4 hidden flex-wrap items-center justify-between gap-3 border-t border-buddy-divider pt-4 dark:border-white/10 sm:flex">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#666] hover:bg-buddy-canvas dark:text-gray-300 dark:hover:bg-white/10"
            >
              <ImageIcon className="h-5 w-5" /> Photo
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#666] hover:bg-buddy-canvas dark:text-gray-300 dark:hover:bg-white/10"
            >
              <Video className="h-5 w-5" /> Video
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#666] hover:bg-buddy-canvas dark:text-gray-300 dark:hover:bg-white/10"
            >
              Event
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#666] hover:bg-buddy-canvas dark:text-gray-300 dark:hover:bg-white/10"
            >
              Article
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-buddy-accent px-5 py-2 text-sm font-medium text-white hover:shadow-md"
          >
            <Send className="h-4 w-4" />
            Post
          </button>
        </div>
      </div>

      <PostCard dark={dark} index={0} />
      <PostCard dark={dark} index={1} />
    </div>
  );
}
