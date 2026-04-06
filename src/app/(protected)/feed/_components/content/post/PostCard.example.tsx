/**
 * Example usage of <PostCard /> with stub actions.
 *
 * When your backend is ready, replace each stub with a real fetch/mutation.
 * The component tree doesn't change at all — only the action implementations do.
 */

"use client";

import { useState } from "react";
import { PostCard } from "./PostCard";
import type { PostData, PostActions, User } from "./types";

// ─── Stub data (replace with SWR / React Query / server component props) ──────
//
// avatarUrl accepts EITHER:
//   • a static-asset key  →  "PostImg"  (resolved via resolveImg() in image-utils.ts)
//   • a full API URL      →  "https://cdn.example.com/avatar.jpg"
// No component code changes when you switch from one to the other.

const VIEWER: User = {
  id: "viewer-1",
  name: "You",
  avatarUrl: "TxtImg", // static asset key — matches original img("TxtImg")
};

const INITIAL_POST: PostData = {
  id: "post-1",
  author: {
    id: "user-42",
    name: "Karim Saif",
    avatarUrl: "PostImg", // static asset key — matches original img("PostImg")
  },
  createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  audience: "Public",
  content: "-Healthy Tracking App",
  media: [
    { url: "TimelineImg", alt: "Timeline" }, // static asset key
    { url: "Img2" },
    { url: "Img3" },
    // ↓ When backend is ready, just swap to the real URL:
    // { url: "https://cdn.example.com/posts/post-1/img1.jpg", alt: "Timeline" },
  ],
  reactionSummary: {
    topReactors: [
      { id: "u1", name: "Alice", avatarUrl: "ReactImg1" },
      { id: "u2", name: "Bob", avatarUrl: "ReactImg2" },
      { id: "u3", name: "Carol", avatarUrl: "ReactImg3" },
      { id: "u4", name: "Dave", avatarUrl: "ReactImg4" },
      { id: "u5", name: "Eve", avatarUrl: "ReactImg5" },
    ],
    total: 14,
  },
  commentCount: 12,
  shareCount: 122,
  viewerReaction: "haha",
  totalCommentCount: 16,
  comments: [
    {
      id: "comment-1",
      author: { id: "user-7", name: "Radovan SkillArena", avatarUrl: "TxtImg" },
      body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      createdAt: new Date(Date.now() - 21 * 60 * 1000).toISOString(),
      reactionCount: 198,
      viewerReaction: null,
    },
  ],
};

// ─── Stub actions (swap each for your real API call) ──────────────────────────

export default function FeedPage() {
  const [post, setPost] = useState<PostData>(INITIAL_POST);

  const actions: PostActions = {
    // ── Post reactions ──────────────────────────────────────────────────────
    async onReact(postId, reaction) {
      // TODO: await api.post(`/posts/${postId}/react`, { reaction })
      setPost((p) => ({ ...p, viewerReaction: reaction }));
    },

    // ── Comments ────────────────────────────────────────────────────────────
    async onComment(postId, body) {
      // TODO: const newComment = await api.post(`/posts/${postId}/comments`, { body })
      const newComment = {
        id: `comment-${Date.now()}`,
        author: VIEWER,
        body,
        createdAt: new Date().toISOString(),
        reactionCount: 0,
        viewerReaction: null,
      } as const;
      setPost((p) => ({
        ...p,
        comments: [...p.comments, newComment],
        commentCount: p.commentCount + 1,
        totalCommentCount: p.totalCommentCount + 1,
      }));
      return newComment;
    },

    async onLoadMoreComments(postId, cursor) {
      // TODO: const { comments } = await api.get(`/posts/${postId}/comments?cursor=${cursor}`)
      return [];
    },

    async onCommentReact(commentId, reaction) {
      // TODO: await api.post(`/comments/${commentId}/react`, { reaction })
      setPost((p) => ({
        ...p,
        comments: p.comments.map((c) =>
          c.id === commentId ? { ...c, viewerReaction: reaction } : c,
        ),
      }));
    },

    async onCommentReply(commentId, body) {
      // TODO: const reply = await api.post(`/comments/${commentId}/replies`, { body })
      const reply = {
        id: `reply-${Date.now()}`,
        author: VIEWER,
        body,
        createdAt: new Date().toISOString(),
        reactionCount: 0,
        viewerReaction: null,
      } as const;
      return reply;
    },

    // ── Share ───────────────────────────────────────────────────────────────
    async onShare(postId) {
      // TODO: await api.post(`/posts/${postId}/share`)
      setPost((p) => ({ ...p, shareCount: p.shareCount + 1 }));
    },

    // ── Menu actions ────────────────────────────────────────────────────────
    async onSave(postId) {
      // TODO: await api.post(`/posts/${postId}/save`)
    },

    async onHide(postId) {
      // TODO: await api.post(`/posts/${postId}/hide`)
      // Then remove from feed list in parent state
    },

    async onDelete(postId) {
      // TODO: await api.delete(`/posts/${postId}`)
    },

    onEdit(postId) {
      // TODO: open edit modal / navigate to edit page
    },

    async onToggleNotification(postId) {
      // TODO: await api.post(`/posts/${postId}/notifications/toggle`)
    },
  };

  return (
    <PostCard
      post={post}
      viewer={VIEWER}
      isOwner={post.author.id === VIEWER.id}
      actions={actions}
      commentLinkHref={`/posts/${post.id}`}
    />
  );
}
