"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns"; // or swap for your own formatter
import { resolveImg } from "./image-utils";
import type { PostData, PostActions } from "./types";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ThreeDotsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
      <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
      <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
      <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
    </svg>
  );
}

// ─── Menu config ──────────────────────────────────────────────────────────────

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  /** Render only when the viewer owns the post */
  ownerOnly?: boolean;
}

function buildMenuItems(
  postId: string,
  isOwner: boolean,
  actions: Pick<PostActions, "onSave" | "onToggleNotification" | "onHide" | "onEdit" | "onDelete">,
): MenuItem[] {
  return [
    {
      label: "Save Post",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="#1890FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
          />
        </svg>
      ),
      action: () => actions.onSave(postId),
    },
    {
      label: "Turn On Notification",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          fill="none"
          viewBox="0 0 20 22"
        >
          <path
            fill="#377DFF"
            fillRule="evenodd"
            d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      action: () => actions.onToggleNotification(postId),
    },
    {
      label: "Hide",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="#1890FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
          />
        </svg>
      ),
      action: () => actions.onHide(postId),
    },
    {
      label: "Edit Post",
      ownerOnly: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="#1890FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
          />
          <path
            stroke="#1890FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
          />
        </svg>
      ),
      action: () => actions.onEdit(postId),
    },
    {
      label: "Delete Post",
      ownerOnly: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="#1890FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
          />
        </svg>
      ),
      action: () => actions.onDelete(postId),
    },
  ].filter((item) => !item.ownerOnly || isOwner);
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PostHeaderProps {
  post: Pick<PostData, "id" | "author" | "createdAt" | "audience">;
  /** Whether the current viewer is the post author */
  isOwner?: boolean;
  actions: Pick<PostActions, "onSave" | "onToggleNotification" | "onHide" | "onEdit" | "onDelete">;
}

export function PostHeader({ post, isOwner = false, actions }: PostHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = buildMenuItems(post.id, isOwner, actions);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className="mb-4 flex items-center justify-between">
      {/* Author info */}
      <div className="flex cursor-pointer items-center gap-4">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
          <Image
            src={resolveImg(post.author.avatarUrl)}
            alt={post.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-buddy-heading cursor-pointer text-base leading-tight font-normal hover:underline">
            {post.author.name}
          </h4>
          <p className="text-buddy-muted text-sm leading-tight dark:text-white/46">
            {timeAgo} ·{" "}
            <Link href="#0" className="hover:underline">
              {post.audience}
            </Link>
          </p>
        </div>
      </div>

      {/* Three-dot dropdown */}
      <div className="relative">
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent px-1 py-1 outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <ThreeDotsIcon />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop to close on outside click */}
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} aria-hidden />
            <ul
              role="menu"
              className="bg-buddy-surface dark:bg-buddy-dark-surface absolute top-8 right-0 z-20 min-w-[312px] rounded-md py-4 shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
            >
              {menuItems.map((item) => (
                <li key={item.label} role="none" className="mb-4 last:mb-0">
                  <button
                    role="menuitem"
                    type="button"
                    className="text-buddy-muted hover:text-buddy-accent flex w-full items-center gap-3 px-4 text-base font-medium transition-colors"
                    onClick={() => {
                      item.action();
                      setMenuOpen(false);
                    }}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ebf2ff]">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
