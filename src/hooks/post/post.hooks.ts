"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PostData, ReactionType } from "@/app/(protected)/feed/_components/content/post/types";
import {
  addComment,
  buildPostCreatePayload,
  createPost,
  deletePost,
  getFeedPosts,
  reactToComment,
  reactToPost,
  updatePost,
} from "@/services/post/post.service";

export const postKeys = {
  feed: ["posts", "feed"] as const,
};

type FeedCache = { posts: PostData[]; meta?: Record<string, unknown> };

export function useFeedPostsQuery(viewerId: string) {
  return useQuery({
    queryKey: postKeys.feed,
    queryFn: async () => getFeedPosts(viewerId, { page: 1, limit: 20 }),
    enabled: Boolean(viewerId),
    staleTime: 1000 * 30,
  });
}

export function useCreatePostMutation(viewerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { content: string; audience: string; imageUrls: string[] }) =>
      createPost(buildPostCreatePayload(payload), viewerId),
    onSuccess: (createdPost) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: [createdPost, ...(prev?.posts || [])],
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}

export function useUpdatePostMutation(viewerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      postId: string;
      content: string;
      audience: string;
      imageUrls: string[];
    }) =>
      updatePost(
        payload.postId,
        buildPostCreatePayload({
          content: payload.content,
          audience: payload.audience,
          imageUrls: payload.imageUrls,
        }),
        viewerId,
      ),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: (prev?.posts || []).map((post) => (post.id === updatedPost.id ? updatedPost : post)),
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: (prev?.posts || []).filter((post) => post.id !== postId),
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}

export function useReactToPostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { postId: string; reaction: ReactionType }) =>
      reactToPost(payload.postId, payload.reaction),
    onSuccess: (_, payload) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: (prev?.posts || []).map((post) => {
          if (post.id !== payload.postId) return post;
          const hadReaction = Boolean(post.viewerReaction);
          const hasReactionNow = Boolean(payload.reaction);
          const total =
            post.reactionSummary.total +
            (hasReactionNow && !hadReaction ? 1 : 0) -
            (!hasReactionNow && hadReaction ? 1 : 0);
          return {
            ...post,
            viewerReaction: payload.reaction,
            reactionSummary: {
              ...post.reactionSummary,
              total: Math.max(0, total),
            },
          };
        }),
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}

export function useAddCommentMutation(viewerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { postId: string; content: string; parentCommentId?: string }) =>
      addComment(
        payload.postId,
        { content: payload.content, parentCommentId: payload.parentCommentId },
        viewerId,
      ),
    onSuccess: (comment, payload) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: (prev?.posts || []).map((post) =>
          post.id !== payload.postId
            ? post
            : {
                ...post,
                comments: payload.parentCommentId
                  ? post.comments.map((existingComment) =>
                      existingComment.id === payload.parentCommentId
                        ? {
                            ...existingComment,
                            replies: [...(existingComment.replies || []), comment],
                          }
                        : existingComment,
                    )
                  : [...post.comments, comment],
                commentCount: post.commentCount + 1,
                totalCommentCount: post.totalCommentCount + 1,
              },
        ),
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}

export function useReactToCommentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { postId: string; commentId: string; reaction: ReactionType }) =>
      reactToComment(payload.postId, payload.commentId, payload.reaction),
    onSuccess: (_, payload) => {
      queryClient.setQueryData(postKeys.feed, (prev: FeedCache | undefined) => ({
        posts: (prev?.posts || []).map((post) =>
          post.id !== payload.postId
            ? post
            : {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === payload.commentId
                    ? {
                        ...comment,
                        viewerReaction: payload.reaction,
                      }
                    : comment,
                ),
              },
        ),
        meta: prev?.meta,
      }));
      queryClient.invalidateQueries({ queryKey: postKeys.feed });
    },
  });
}
