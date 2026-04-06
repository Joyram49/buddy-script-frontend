import type {
  BackendComment,
  BackendPost,
  BackendReactionType,
  BackendVisibility,
} from "./post.types";
import type { CommentData, PostData, ReactionType } from "@/app/(protected)/feed/_components/content/post/types";

function toReactionType(type: BackendReactionType): Exclude<ReactionType, null> {
  switch (type) {
    case "LIKE":
      return "like";
    case "LOVE":
      return "love";
    case "CARE":
      return "like";
    case "HAHA":
      return "haha";
    case "ANGRY":
      return "angry";
    case "SAD":
      return "sad";
    case "WOW":
      return "like";
    default:
      return "like";
  }
}

function toAudience(visibility: BackendVisibility): string {
  return visibility === "PRIVATE" ? "Private" : "Public";
}

export function mapBackendComment(comment: BackendComment, viewerId: string): CommentData {
  const viewerReaction = comment.commentReactions.find((r) => r.userId === viewerId);
  return {
    id: comment.id,
    body: comment.content,
    createdAt: comment.createdAt,
    reactionCount: comment.commentReactions.length,
    viewerReaction: viewerReaction ? toReactionType(viewerReaction.type) : null,
    author: {
      id: comment.author.id,
      name: comment.author.name || "Unknown user",
      avatarUrl: comment.author.avatarUrl || "TxtImg",
    },
    replies: (comment.replies || []).map((reply) => mapBackendComment(reply, viewerId)),
  };
}

export function mapBackendPost(post: BackendPost, viewerId: string): PostData {
  const viewerReaction = post.postReactions.find((r) => r.userId === viewerId);
  const topReactors = post.postReactions.slice(0, 5).map((r) => ({
    id: r.userId,
    name: "User",
    avatarUrl: "TxtImg",
  }));

  return {
    id: post.id,
    author: {
      id: post.author.id,
      name: post.author.name || "Unknown user",
      avatarUrl: post.author.avatarUrl || "TxtImg",
    },
    createdAt: post.createdAt,
    audience: toAudience(post.visibility),
    content: post.content,
    media: post.postImages.map((image) => ({ url: image.url, alt: "Post image" })),
    reactionSummary: {
      topReactors,
      total: post.postReactions.length,
    },
    commentCount: post.comments.length,
    shareCount: 0,
    viewerReaction: viewerReaction ? toReactionType(viewerReaction.type) : null,
    comments: post.comments.map((comment) => mapBackendComment(comment, viewerId)),
    totalCommentCount: post.comments.length,
  };
}
