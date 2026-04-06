"use client";

import { cn } from "@/lib/utils";
import { PostHeader } from "./PostHeader";
import { PostMedia } from "./PostMedia";
import { PostReactions } from "./PostReactions";
import { PostActions } from "./PostActions";
import { PostCommentInput } from "./PostCommentInput";
import { PostComment } from "./PostComment";
import type { PostData, PostActions as IPostActions, User } from "./types";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none";

interface PostCardProps {
  post: PostData;
  /** The currently authenticated viewer */
  viewer: User;
  /** Whether the viewer is the post's author */
  isOwner?: boolean;
  /** API action handlers — swap stubs for real calls */
  actions: IPostActions;
  /** Pass a href to make the comment count a link (e.g. to a detail page) */
  commentLinkHref?: string;
}

export function PostCard({
  post,
  viewer,
  isOwner = false,
  actions,
  commentLinkHref,
}: PostCardProps) {
  return (
    <article className={cn("overflow-hidden", cardClass)}>
      {/* Header + media */}
      <div className="px-6 pt-6 pb-0">
        <PostHeader
          post={post}
          isOwner={isOwner}
          actions={{
            onSave: actions.onSave,
            onToggleNotification: actions.onToggleNotification,
            onHide: actions.onHide,
            onEdit: actions.onEdit,
            onDelete: actions.onDelete,
          }}
        />

        {post.content && (
          <h4 className="text-buddy-heading dark:text-buddy-heading mb-4 text-sm leading-[21px] font-normal">
            {post.content}
          </h4>
        )}

        <PostMedia media={post.media} />
      </div>

      {/* Reaction summary */}
      <PostReactions post={post} commentLinkHref={commentLinkHref} />

      {/* Like / Comment / Share buttons */}
      <PostActions
        postId={post.id}
        viewerReaction={post.viewerReaction}
        onReact={actions.onReact}
        onShare={actions.onShare}
      />

      {/* Top-level comment input */}
      <div className="px-6 pt-6 pb-2">
        <PostCommentInput
          viewerAvatarUrl={viewer.avatarUrl}
          viewerName={viewer.name}
          onSubmit={(body) => actions.onComment(post.id, body).then(() => {})}
        />
      </div>

      {/* Comment list */}
      <div className="px-6 pt-4 pb-6">
        {post.totalCommentCount > post.comments.length && (
          <button
            type="button"
            onClick={() => actions.onLoadMoreComments(post.id)}
            className="text-buddy-muted mb-5 border-none bg-transparent text-sm font-semibold outline-none hover:underline"
          >
            View {post.totalCommentCount - post.comments.length} previous comments
          </button>
        )}

        <div className="flex flex-col gap-4">
          {post.comments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              viewer={viewer}
              onReact={actions.onCommentReact}
              onReply={actions.onCommentReply}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
