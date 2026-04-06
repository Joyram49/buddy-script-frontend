import { privateApi, unwrapApiResponse } from "@/lib/api/rootApi";
import { mapBackendComment, mapBackendPost } from "./post.mapper";
import type { ReactionType } from "@/app/(protected)/feed/_components/content/post/types";
import type {
  AddCommentInput,
  BackendComment,
  BackendPost,
  BackendReactionType,
  BackendVisibility,
  CreatePostInput,
  FeedPaginationMeta,
  FeedQueryInput,
  UpdatePostInput,
} from "./post.types";

function toBackendReaction(type: Exclude<ReactionType, null>): BackendReactionType {
  switch (type) {
    case "like":
      return "LIKE";
    case "love":
      return "LOVE";
    case "haha":
      return "HAHA";
    case "angry":
      return "ANGRY";
    case "sad":
      return "SAD";
    default:
      return "LIKE";
  }
}

function toBackendVisibility(audience: string): BackendVisibility {
  return audience.toLowerCase() === "private" ? "PRIVATE" : "PUBLIC";
}

export async function getFeedPosts(viewerId: string, query: FeedQueryInput = {}) {
  const response = await privateApi.get("/posts", { params: query });
  const rawPosts = unwrapApiResponse<BackendPost[]>(response);
  const meta = response.data?.meta as FeedPaginationMeta | undefined;
  return {
    posts: rawPosts.map((post) => mapBackendPost(post, viewerId)),
    meta,
  };
}

export async function createPost(payload: CreatePostInput, viewerId: string) {
  const response = await privateApi.post("/posts", payload);
  const rawPost = unwrapApiResponse<{ post: BackendPost }>(response);
  return mapBackendPost(rawPost.post, viewerId);
}

export async function updatePost(postId: string, payload: UpdatePostInput, viewerId: string) {
  const response = await privateApi.patch(`/posts/${postId}`, payload);
  const rawPost = unwrapApiResponse<{ post: BackendPost }>(response);
  return mapBackendPost(rawPost.post, viewerId);
}

export async function deletePost(postId: string) {
  await privateApi.delete(`/posts/${postId}`);
}

export async function reactToPost(postId: string, reaction: ReactionType) {
  if (!reaction) {
    await privateApi.delete(`/posts/${postId}/reactions`);
    return;
  }
  await privateApi.post(`/posts/${postId}/reactions`, { type: toBackendReaction(reaction) });
}

export async function addComment(postId: string, payload: AddCommentInput, viewerId: string) {
  const response = await privateApi.post(`/posts/${postId}/comments`, payload);
  const rawComment = unwrapApiResponse<{ comment: BackendComment }>(response);
  return mapBackendComment(rawComment.comment, viewerId);
}

export async function reactToComment(postId: string, commentId: string, reaction: ReactionType) {
  if (!reaction) {
    await privateApi.delete(`/posts/${postId}/comments/${commentId}/reactions`);
    return;
  }
  await privateApi.post(`/posts/${postId}/comments/${commentId}/reactions`, {
    type: toBackendReaction(reaction),
  });
}

export async function uploadPostFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await privateApi.post("/posts/file-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const data = unwrapApiResponse<{ url: string }>(response);
  return data.url;
}

export function buildPostCreatePayload(input: {
  content: string;
  audience: string;
  imageUrls: string[];
}): CreatePostInput {
  return {
    content: input.content,
    visibility: toBackendVisibility(input.audience),
    imageUrls: input.imageUrls,
  };
}
