"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { resolveImg } from "./image-utils";
import { PostCommentInput } from "./PostCommentInput";
import type { CommentData, PostActions, User } from "./types";

interface PostCommentProps {
  comment: CommentData;
  viewer: User;
  onReact: PostActions["onCommentReact"];
  onReply: PostActions["onCommentReply"];
}

export function PostComment({ comment, viewer, onReact, onReply }: PostCommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <div className="flex gap-5">
      {/* Author avatar */}
      <Link
        href={`/profile/${comment.author.id}`}
        className="border-buddy-border relative size-10 shrink-0 overflow-hidden rounded-full border"
      >
        <Image
          src={resolveImg(comment.author.avatarUrl)}
          alt={comment.author.name}
          fill
          className="object-contain"
        />
      </Link>

      <div className="flex-1">
        {/* Comment bubble */}
        <div className="bg-buddy-input dark:bg-buddy-dark-surface relative mb-12 max-w-fit rounded-[18px] p-3">
          <div className="mb-1">
            <Link href={`/profile/${comment.author.id}`}>
              <h4 className="text-buddy-heading text-sm leading-tight font-semibold">
                {comment.author.name}
              </h4>
            </Link>
          </div>
          <p className="text-buddy-text dark:text-buddy-heading/80 text-sm leading-relaxed">
            {comment.body}
          </p>

          {/* Reaction badge */}
          <div className="dark:bg-buddy-surface absolute right-0 -bottom-4 flex cursor-pointer items-center gap-1 rounded-xl bg-white px-3 py-1 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
            <div className="flex items-center">
              <ThumbsUp className="text-buddy-accent h-4 w-4" />
              <Heart className="-ml-1 h-4 w-4 text-red-500" />
            </div>
            <span className="text-buddy-heading mt-0.5 text-sm leading-tight font-medium">
              {comment.reactionCount}
            </span>
          </div>
        </div>

        {/* Reply actions */}
        <div className="mt-1">
          <ul className="flex items-center gap-2">
            <li>
              <button
                type="button"
                onClick={() => onReact(comment.id, comment.viewerReaction ? null : "like")}
                className="text-buddy-heading dark:text-buddy-heading cursor-pointer text-sm font-medium transition-colors hover:underline"
              >
                {comment.viewerReaction ? "Liked." : "Like."}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowReplyInput((v) => !v)}
                className="text-buddy-heading dark:text-buddy-heading cursor-pointer text-sm font-medium transition-colors hover:underline"
              >
                Reply.
              </button>
            </li>
            <li>
              <span className="text-buddy-heading dark:text-buddy-heading cursor-pointer text-sm font-medium transition-colors hover:underline">
                Share
              </span>
            </li>
            <li>
              <span className="text-buddy-muted text-sm font-medium">{timeAgo}</span>
            </li>
          </ul>
        </div>

        {/* Nested reply input */}
        {showReplyInput && (
          <div className="mt-4">
            <PostCommentInput
              viewerAvatarUrl={viewer.avatarUrl}
              viewerName={viewer.name}
              placeholder={`Reply to ${comment.author.name}…`}
              onSubmit={async (body) => {
                await onReply(comment.id, body);
                setShowReplyInput(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
