"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth/auth.context";
import { getApiErrorMessage } from "@/lib/api/rootApi";
import {
  useAddCommentMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useFeedPostsQuery,
  useReactToCommentMutation,
  useReactToPostMutation,
  useUpdatePostMutation,
} from "@/hooks/post/post.hooks";
import { uploadPostFile } from "@/services/post/post.service";
import { StoriesStrip } from "./StoriesStrip";
import { PostComposer } from "./PostComposer";
import { PostCard } from "./post/PostCard";
import type { PostActions, ReactionType } from "./post/types";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] shadow-sm dark:shadow-none";

export function FeedMainColumn() {
  const { user } = useAuth();
  const viewerId = user?.id || "";
  const feedQuery = useFeedPostsQuery(viewerId);
  const createPostMutation = useCreatePostMutation(viewerId);
  const updatePostMutation = useUpdatePostMutation(viewerId);
  const deletePostMutation = useDeletePostMutation();
  const reactMutation = useReactToPostMutation();
  const commentMutation = useAddCommentMutation(viewerId);
  const commentReactionMutation = useReactToCommentMutation();

  const [composerValue, setComposerValue] = useState("");
  const [audience, setAudience] = useState<"Public" | "Private">("Public");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const posts = feedQuery.data?.posts || [];

  async function handleSubmitPost() {
    try {
      if (!composerValue.trim()) return;
      if (editingPostId) {
        await updatePostMutation.mutateAsync({
          postId: editingPostId,
          content: composerValue.trim(),
          audience,
          imageUrls,
        });
        toast.success("Post updated.");
      } else {
        await createPostMutation.mutateAsync({
          content: composerValue.trim(),
          audience,
          imageUrls,
        });
        toast.success("Post created.");
      }
      setComposerValue("");
      setAudience("Public");
      setImageUrls([]);
      setEditingPostId(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to save post."));
    }
  }

  function startEdit(postId: string) {
    const target = posts.find((post) => post.id === postId);
    if (!target) return;
    setEditingPostId(postId);
    setComposerValue(target.content);
    setAudience(target.audience === "Private" ? "Private" : "Public");
    setImageUrls(target.media.map((media) => media.url));
    const composer = document.getElementById("composer");
    composer?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function cancelEdit() {
    setEditingPostId(null);
    setComposerValue("");
    setAudience("Public");
    setImageUrls([]);
  }

  const actions: PostActions = {
    onReact: async (postId: string, reaction: ReactionType) => {
      try {
        await reactMutation.mutateAsync({ postId, reaction });
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to update reaction."));
      }
    },
    onComment: async (postId: string, body: string) => {
      try {
        return await commentMutation.mutateAsync({ postId, content: body });
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to add comment."));
        throw error;
      }
    },
    onShare: async () => {
      toast.info("Share API is not available yet.");
    },
    onSave: async () => {
      toast.info("Save API is not available yet.");
    },
    onHide: async () => {
      toast.info("Hide API is not available yet.");
    },
    onDelete: async (postId: string) => {
      try {
        await deletePostMutation.mutateAsync(postId);
        toast.success("Post deleted.");
        if (editingPostId === postId) cancelEdit();
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to delete post."));
      }
    },
    onEdit: (postId: string) => startEdit(postId),
    onToggleNotification: async () => {
      toast.info("Notification API is not available yet.");
    },
    onLoadMoreComments: async () => {
      return [];
    },
    onCommentReact: async (commentId: string, reaction: ReactionType) => {
      const postWithComment = posts.find((post) =>
        post.comments.some((comment) => comment.id === commentId),
      );
      if (!postWithComment) return;
      try {
        await commentReactionMutation.mutateAsync({
          postId: postWithComment.id,
          commentId,
          reaction,
        });
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to update comment reaction."));
      }
    },
    onCommentReply: async (commentId: string, body: string) => {
      const postWithComment = posts.find((post) =>
        post.comments.some((comment) => comment.id === commentId),
      );
      if (!postWithComment) {
        throw new Error("Post not found");
      }
      try {
        return await commentMutation.mutateAsync({
          postId: postWithComment.id,
          content: body,
          parentCommentId: commentId,
        });
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to reply comment."));
        throw error;
      }
    },
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Stories */}
      <div className={cn("relative rounded-md p-4", cardClass)}>
        <StoriesStrip />
      </div>

      {/* Post composer */}
      <PostComposer
        value={composerValue}
        audience={audience}
        imageUrls={imageUrls}
        isSubmitting={createPostMutation.isPending || updatePostMutation.isPending}
        isEditing={Boolean(editingPostId)}
        onValueChange={setComposerValue}
        onAudienceChange={setAudience}
        onImageUpload={async (file) => {
          try {
            const url = await uploadPostFile(file);
            setImageUrls((prev) => [...prev, url]);
            return url;
          } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to upload image."));
            throw error;
          }
        }}
        onRemoveImage={(url) => setImageUrls((prev) => prev.filter((image) => image !== url))}
        onSubmit={handleSubmitPost}
        onCancelEdit={cancelEdit}
      />

      {/* Posts */}
      {feedQuery.isLoading ? (
        <div className={cn("space-y-4 rounded-md p-6", cardClass)}>
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-52 w-full animate-pulse rounded bg-gray-200" />
        </div>
      ) : null}
      {feedQuery.isError ? (
        <div className={cn("rounded-md p-4 text-sm text-red-500", cardClass)}>
          Failed to load posts. Please refresh.
        </div>
      ) : null}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          viewer={{
            id: viewerId,
            name: user?.name || "You",
            avatarUrl: user?.avatarUrl || "TxtImg",
          }}
          isOwner={post.author.id === viewerId}
          actions={actions}
        />
      ))}
    </div>
  );
}
