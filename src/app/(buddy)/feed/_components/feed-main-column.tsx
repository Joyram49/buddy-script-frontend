"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ImageIcon, MoreVertical, Send, Smile, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { buddyAsset } from "@/features/buddyscript/assets";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] shadow-sm dark:shadow-none";

/** Images served from `public/buddyscript/assets/images/` */
const STORY_IMAGES = [
  buddyAsset("images/timeline_img.png"),
  buddyAsset("images/img2.png"),
  buddyAsset("images/img3.png"),
  buddyAsset("images/profile.png"),
];

const POST_CAROUSEL_IMAGES = [
  buddyAsset("images/timeline_img.png"),
  buddyAsset("images/img2.png"),
  buddyAsset("images/img3.png"),
];

function StoryTile({
  label,
  imageUrls,
  showAdd,
}: {
  label: string;
  imageUrls: string[];
  showAdd?: boolean;
}) {
  const [slide, setSlide] = useState(0);
  const hasMultiple = imageUrls.length > 1;
  const goNext = () => setSlide((s) => (s + 1) % imageUrls.length);

  return (
    <div className="from-buddy-border to-buddy-muted dark:from-buddy-muted/50 dark:to-buddy-dark-surface relative aspect-3/4 overflow-hidden rounded-md bg-linear-to-br">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrls[slide]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-2 pt-8">
        <p className="truncate text-center text-xs text-white">{label}</p>
      </div>
      {hasMultiple ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="text-buddy-heading absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
          aria-label="Next story"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      ) : null}
      {showAdd ? (
        <button
          type="button"
          className="bg-buddy-accent absolute bottom-8 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-md"
          aria-label="Add to your story"
        >
          +
        </button>
      ) : null}
    </div>
  );
}

function PostCard({ index }: { index: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mediaSlide, setMediaSlide] = useState(0);
  const postImages = POST_CAROUSEL_IMAGES;

  return (
    <article className={cn("overflow-hidden", cardClass)}>
      <div className="border-buddy-divider border-b px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="from-buddy-border to-buddy-muted size-12 shrink-0 rounded-full bg-linear-to-br" />
            <div>
              <h4 className="text-buddy-heading font-semibold">Karim Saif</h4>
              <p className="text-buddy-muted text-sm">
                5 minute ago .{" "}
                <Link href="#0" className="text-buddy-accent">
                  Public
                </Link>
              </p>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              className="text-buddy-subtle hover:text-buddy-text dark:hover:text-buddy-heading p-1"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen ? (
              <ul
                className={cn(
                  "border-buddy-divider bg-buddy-surface absolute top-full right-0 z-20 mt-1 min-w-[200px] rounded-md border py-2 shadow-lg",
                )}
              >
                {["Save Post", "Turn On Notification", "Hide", "Edit Post", "Delete Post"].map(
                  (t) => (
                    <li key={t}>
                      <Link
                        href="#0"
                        className="text-buddy-text hover:bg-buddy-canvas hover:text-buddy-accent block px-4 py-2 text-sm dark:hover:bg-white/10"
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
        <h3 className="text-buddy-heading mt-4 font-medium">-Healthy Tracking App</h3>
        <div className="relative mt-4 overflow-hidden rounded-md">
          <div className="from-buddy-border to-buddy-muted dark:from-buddy-muted/50 dark:to-buddy-dark-surface relative aspect-video w-full bg-linear-to-br">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={postImages[mediaSlide]}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          {postImages.length > 1 ? (
            <button
              type="button"
              onClick={() => setMediaSlide((s) => (s + 1) % postImages.length)}
              className="text-buddy-heading absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="border-buddy-divider flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
        <div className="flex items-center gap-1">
          {[
            "from-amber-200 to-orange-300",
            "from-pink-200 to-rose-400",
            "from-blue-200 to-indigo-400",
          ].map((g, i) => (
            <div
              key={i}
              className={cn(
                "dark:border-buddy-dark-surface -ml-1 size-8 rounded-full border-2 border-white bg-linear-to-br first:ml-0",
                g,
              )}
            />
          ))}
          <span className="text-buddy-muted ml-2 text-sm">9+</span>
        </div>
        <div className="text-buddy-muted flex gap-4 text-sm">
          {index === 0 ? (
            <Link href="#0" className="hover:text-buddy-accent">
              <span className="text-buddy-text font-medium">12</span> Comment
            </Link>
          ) : (
            <span>
              <span className="text-buddy-text font-medium">12</span> Comment
            </span>
          )}
          <span>
            <span className="text-buddy-text font-medium">122</span> Share
          </span>
        </div>
      </div>

      <div className="border-buddy-divider flex flex-wrap gap-2 border-b px-6 py-3">
        <button
          type="button"
          className="bg-buddy-canvas/80 text-buddy-heading dark:text-buddy-heading flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium dark:bg-white/10"
        >
          <span className="text-lg">😄</span> Haha
        </button>
        <button
          type="button"
          className="text-buddy-text flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm"
        >
          Comment
        </button>
        <button
          type="button"
          className="text-buddy-text flex min-w-[100px] flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm"
        >
          Share
        </button>
      </div>

      <div className="p-6 pt-4">
        <div className="flex gap-3">
          <div className="from-buddy-border to-buddy-muted size-10 shrink-0 rounded-full bg-linear-to-br" />
          <div className="relative flex-1">
            <textarea
              placeholder="Write a comment"
              rows={2}
              className={cn(
                "focus:ring-buddy-accent/30 w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2",
                "border-buddy-border bg-buddy-surface text-buddy-text placeholder:text-buddy-muted",
                "dark:text-buddy-heading dark:placeholder:text-buddy-muted dark:border-white/10 dark:bg-white/5",
              )}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button type="button" className="text-buddy-muted hover:text-buddy-accent p-1.5">
                <Smile className="h-4 w-4" />
              </button>
              <button type="button" className="text-buddy-muted hover:text-buddy-accent p-1.5">
                <ImageIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="text-buddy-accent mt-3 text-sm font-medium hover:underline"
        >
          View 4 previous comments
        </button>
        <div className="mt-4 flex gap-3">
          <div className="from-buddy-border to-buddy-muted size-10 shrink-0 rounded-full bg-linear-to-br" />
          <div className="bg-buddy-canvas/60 flex-1 rounded-md p-3 dark:bg-white/5">
            <p className="text-buddy-text dark:text-buddy-heading text-sm font-medium">
              Radovan SkillArena
            </p>
            <p className="text-buddy-muted mt-1 text-sm leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </p>
            <div className="text-buddy-muted mt-2 flex items-center gap-2 text-xs">
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

export function FeedMainColumn() {
  return (
    <div className="space-y-4 pb-24 lg:pb-6">
      <div className={cn("relative rounded-md p-4", cardClass)}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Your Story", images: STORY_IMAGES.slice(0, 2), own: true },
            { label: "Ryan", images: STORY_IMAGES },
            { label: "Alex", images: STORY_IMAGES.slice(1, 4) },
            { label: "Sam", images: STORY_IMAGES.slice(0, 3) },
          ].map((story, i) => (
            <StoryTile
              key={`${story.label}-${i}`}
              label={story.label}
              imageUrls={story.images}
              showAdd={Boolean(story.own)}
            />
          ))}
        </div>
      </div>

      <div className={cn("rounded-md p-6", cardClass)}>
        <div className="flex gap-3">
          <div className="from-buddy-border to-buddy-muted size-12 shrink-0 rounded-full bg-linear-to-br" />
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
            <button
              type="button"
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              <ImageIcon className="h-5 w-5" /> Photo
            </button>
            <button
              type="button"
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              <Video className="h-5 w-5" /> Video
            </button>
            <button
              type="button"
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              Event
            </button>
            <button
              type="button"
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              Article
            </button>
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

      <PostCard index={0} />
      <PostCard index={1} />
    </div>
  );
}
