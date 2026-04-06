"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { StoryTile, type Story } from "./StoryTile";
import * as images from "@/assets";

type ImageKey = keyof typeof images;
function img(key: string): string {
  return (images[key as ImageKey] as string) ?? (images["Img1"] as unknown as string);
}

const STORIES: Story[] = [
  {
    label: "Your Story",
    images: [img("Photos1"), img("Photos2")],
    avatar: img("Profile"),
    own: true,
  },
  {
    label: "Ryan",
    images: [img("Photos3"), img("Photos1"), img("Photos4")],
    avatar: img("Img9"),
  },
  {
    label: "Alex",
    images: [img("Photos8"), img("Photos1"), img("Photos2")],
    avatar: img("Img10"),
  },
  {
    label: "Sam",
    images: [img("Photos5"), img("Friend4")],
    avatar: img("Img11"),
  },
  {
    label: "Jordan",
    images: [img("Photos9")],
    avatar: img("Img12"),
  },
  {
    label: "Morgan",
    images: [img("Photos5"), img("Friend4")],
    avatar: img("Img1"),
  },
  {
    label: "Taylor",
    images: [img("Photos1"), img("Photos8"), img("Photos4")],
    avatar: img("Img2"),
  },
];

const VISIBLE = 4;

export function StoriesStrip() {
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, STORIES.length - VISIBLE);
  const canPrev = offset > 0;
  const canNext = offset < maxOffset;

  return (
    <div className="relative px-1">
      <div className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-4">
        {STORIES.slice(offset, offset + VISIBLE).map((story, i) => (
          <StoryTile key={`${story.label}-${offset + i}`} {...story} />
        ))}
      </div>

      {/* Prev arrow */}
      {canPrev && (
        <button
          type="button"
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          className="text-buddy-heading absolute top-1/2 -left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          aria-label="Previous stories"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Next arrow */}
      {canNext && (
        <button
          type="button"
          onClick={() => setOffset((o) => Math.min(maxOffset, o + 1))}
          className="text-buddy-heading absolute top-1/2 -right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          aria-label="Next stories"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
