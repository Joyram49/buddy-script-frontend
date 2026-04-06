"use client";

import { cn } from "@/lib/utils";
import type { ReactionType, PostActions as IPostActions } from "./types";

// ─── Icons ────────────────────────────────────────────────────────────────────

function HahaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
      <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
      <path
        fill="#664500"
        d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
      />
      <path
        fill="#fff"
        d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
      />
      <path
        fill="#664500"
        d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
      <path
        stroke="currentColor"
        d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.938 9.313h7.125M10.5 14.063h3.563"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PostActionsProps {
  postId: string;
  viewerReaction: ReactionType;
  onReact: IPostActions["onReact"];
  onCommentClick?: () => void;
  onShare: IPostActions["onShare"];
}

export function PostActions({
  postId,
  viewerReaction,
  onReact,
  onCommentClick,
  onShare,
}: PostActionsProps) {
  const isHaha = viewerReaction === "haha";

  return (
    <div className="bg-buddy-canvas/50 flex gap-1 px-2 py-2 dark:bg-[#11263c]">
      {/* Haha */}
      <button
        type="button"
        onClick={() => onReact(postId, isHaha ? null : "haha")}
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border-none py-3 text-sm font-normal transition-colors",
          isHaha
            ? "text-buddy-heading bg-[#e4f1fd] dark:bg-[#123150]"
            : "text-buddy-text bg-transparent hover:bg-[#e4f1fd] dark:hover:bg-[#123150]",
        )}
      >
        <HahaIcon />
        Haha
      </button>

      {/* Comment */}
      <button
        type="button"
        onClick={onCommentClick}
        className="text-buddy-text hover:bg-buddy-canvas flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-transparent py-3 text-sm transition-colors dark:hover:bg-[#123150]"
      >
        <CommentIcon />
        Comment
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={() => onShare(postId)}
        className="text-buddy-text hover:bg-buddy-canvas flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-transparent py-3 text-sm transition-colors dark:hover:bg-[#123150]"
      >
        <ShareIcon />
        Share
      </button>
    </div>
  );
}
