"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

export interface Story {
  label: string;
  images: string[];
  avatar?: string;
  own?: boolean;
}

const DRAG_THRESHOLD = 25; // px to commit slide change

export function StoryTile({ label, images, avatar, own }: Story) {
  const [slide, setSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const total = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const isLocked = useRef<"horizontal" | "vertical" | null>(null);
  const animating = useRef(false);

  //  Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    currentX.current = 0;
    isLocked.current = null;
    animating.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (total <= 1) return;

      const dx = e.touches[0].clientX - startX.current;
      const dy = e.touches[0].clientY - startY.current;

      // Determine direction lock on first significant movement
      if (isLocked.current === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        isLocked.current = Math.abs(dx) >= Math.abs(dy) ? "horizontal" : "vertical";
      }

      if (isLocked.current !== "horizontal") return;

      // Prevent page scroll when swiping horizontally
      e.preventDefault();

      // Add resistance at edges
      let offset = dx;
      if ((slide === 0 && dx > 0) || (slide === total - 1 && dx < 0)) {
        offset = dx * 0.25;
      }

      currentX.current = dx;
      setDragOffset(offset);
      setIsDragging(true);
    },
    [slide, total],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const dx = currentX.current;
    setIsDragging(false);
    setDragOffset(0);

    if (dx < -DRAG_THRESHOLD && slide < total - 1) {
      setSlide((s) => s + 1);
    } else if (dx > DRAG_THRESHOLD && slide > 0) {
      setSlide((s) => s - 1);
    }

    isLocked.current = null;
    currentX.current = 0;
  }, [isDragging, slide, total]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (total <= 1) return;
      startX.current = e.clientX;
      currentX.current = 0;
      isLocked.current = "horizontal";
      animating.current = false;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX.current;
        let offset = dx;
        if ((slide === 0 && dx > 0) || (slide === total - 1 && dx < 0)) {
          offset = dx * 0.25;
        }
        currentX.current = dx;
        setDragOffset(offset);
        setIsDragging(true);
      };

      const onUp = () => {
        const dx = currentX.current;
        setIsDragging(false);
        setDragOffset(0);
        if (dx < -DRAG_THRESHOLD && slide < total - 1) setSlide((s) => s + 1);
        else if (dx > DRAG_THRESHOLD && slide > 0) setSlide((s) => s - 1);
        currentX.current = 0;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [slide, total],
  );

  // Width of each slide as % of the visible container
  const trackTranslate = `calc(${-slide * 100}% + ${dragOffset}px)`;

  return (
    <div
      ref={containerRef}
      className="from-buddy-border to-buddy-muted dark:from-buddy-muted/50 dark:to-buddy-dark-surface relative aspect-3/4 overflow-hidden rounded-xl bg-linear-to-br select-none"
      style={{
        cursor: total > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        touchAction: total > 1 ? "pan-y" : "auto", // allow vertical scroll, we handle horizontal
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* ── Image track ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex h-full"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(${trackTranslate})`,
          transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          willChange: "transform",
        }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-full shrink-0" style={{ width: `${100 / total}%` }}>
            <Image
              src={src}
              alt={`${label} ${i + 1}`}
              fill
              priority={i === 0}
              draggable={false}
              className="pointer-events-none object-cover"
            />
          </div>
        ))}
      </div>

      {/*  Gradient overlay*/}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/25" />

      {/*  Progress bars  */}
      {total > 1 && (
        <div className="pointer-events-none absolute inset-x-2 top-2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-colors duration-200"
              style={{
                backgroundColor:
                  i < slide
                    ? "rgba(255,255,255,0.75)"
                    : i === slide
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}

      {/*  Owner avatar with white ring  */}
      <div className="pointer-events-none absolute top-3 right-4">
        <div className="relative size-5 overflow-hidden rounded-full shadow-md ring-2 ring-white ring-offset-1 ring-offset-black/30">
          {avatar ? (
            <Image src={avatar} alt={label} fill className="object-cover" />
          ) : (
            <div className="from-buddy-border to-buddy-muted h-full w-full bg-linear-to-br" />
          )}
        </div>
        {own && (
          <span className="bg-buddy-accent absolute -right-0.5 -bottom-0.5 size-3 rounded-full ring-2 ring-white" />
        )}
      </div>

      {/* ── Add story button ─────────────────────────────────────────── */}
      {own && (
        <button
          type="button"
          className="bg-buddy-accent pointer-events-auto absolute bottom-9 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full text-base font-bold text-white shadow-md"
          aria-label="Add to your story"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          +
        </button>
      )}

      {/* ── Label ────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 pt-6">
        <p className="truncate text-center text-xs font-semibold text-white drop-shadow-sm">
          {label}
        </p>
      </div>
    </div>
  );
}
