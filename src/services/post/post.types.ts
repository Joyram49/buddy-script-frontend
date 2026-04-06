import type { CommentData, PostData } from "@/app/(protected)/feed/_components/content/post/types";

export type BackendReactionType = "LIKE" | "LOVE" | "CARE" | "HAHA" | "ANGRY" | "SAD" | "WOW";
export type BackendVisibility = "PUBLIC" | "PRIVATE";

export interface BackendUser {
  id: string;
  name: string | null;
  email?: string | null;
  avatarUrl: string | null;
}

export interface BackendPostImage {
  id: string;
  url: string;
  sortOrder: number;
}

export interface BackendReaction {
  id: string;
  type: BackendReactionType;
  userId: string;
  createdAt: string;
}

export interface BackendComment {
  id: string;
  content: string;
  createdAt: string;
  author: BackendUser;
  commentReactions: BackendReaction[];
  replies?: BackendComment[];
}

export interface BackendPost {
  id: string;
  content: string;
  createdAt: string;
  visibility: BackendVisibility;
  author: BackendUser;
  postImages: BackendPostImage[];
  postReactions: BackendReaction[];
  comments: BackendComment[];
}

export interface FeedPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface FeedQueryInput {
  page?: number;
  limit?: number;
}

export interface CreatePostInput {
  content: string;
  visibility: BackendVisibility;
  imageUrls: string[];
}

export interface UpdatePostInput {
  content?: string;
  visibility?: BackendVisibility;
  imageUrls?: string[];
}

export interface AddCommentInput {
  content: string;
  parentCommentId?: string;
}

export interface FeedQueryResponse {
  posts: PostData[];
  meta?: FeedPaginationMeta;
}

export interface AddCommentResponse {
  comment: CommentData;
}
