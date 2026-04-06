"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveImg } from "./image-utils";
import type { MediaItem } from "./types";

interface PostMediaProps {
  media: MediaItem[];
}

export function PostMedia({ media }: PostMediaProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (media.length === 0) return null;

  const hasManySlides = media.length > 1;

  return (
    <div className="relative mb-6 overflow-hidden rounded-md">
      <div className="relative aspect-video w-full">
        <Image
          src={resolveImg(media[activeSlide].url)}
          alt={media[activeSlide].alt ?? "Post image"}
          fill
          priority
          className="rounded-md object-cover"
        />
      </div>

      {/* Dot indicators */}
      {hasManySlides && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === activeSlide ? "w-4 bg-white" : "w-1.5 bg-white/50",
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Next arrow */}
      {hasManySlides && (
        <button
          type="button"
          onClick={() => setActiveSlide((s) => (s + 1) % media.length)}
          className="text-buddy-heading absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
