// ─── Domain Types ─────────────────────────────────────────────────────────────
// These mirror what your REST/GraphQL API will return.
// Swap the placeholder fields for real ones once the backend is ready.

export type ReactionType = "haha" | "like" | "love" | "sad" | "angry" | null;

export interface User {
  id: string;
  name: string;
  /**
   * Either a full URL returned by the API (e.g. "https://cdn.example.com/avatar.jpg")
   * or a static-asset key from `@/assets` (e.g. "PostImg", "TxtImg").
   * Pass either form — `resolveImg()` in `image-utils.ts` handles both.
   */
  avatarUrl: string;
}

export interface MediaItem {
  /**
   * Either a full URL returned by the API or a static-asset key from `@/assets`.
   * Pass either form — `resolveImg()` in `image-utils.ts` handles both.
   */
  url: string;
  alt?: string;
}

export interface ReactionSummary {
  /** Avatars of the top reactors */
  topReactors: User[];
  /** Total reaction count */
  total: number;
}

export interface CommentData {
  id: string;
  author: User;
  body: string;
  createdAt: string; // ISO string
  reactionCount: number;
  /** Current viewer's reaction to this comment */
  viewerReaction: ReactionType;
}

export interface PostData {
  id: string;
  author: User;
  createdAt: string; // ISO string
  /** e.g. "Public" | "Friends" */
  audience: string;
  title?: string;
  media: MediaItem[];
  reactionSummary: ReactionSummary;
  commentCount: number;
  shareCount: number;
  /** Current viewer's reaction to the post */
  viewerReaction: ReactionType;
  /** Subset of comments shown on the card */
  comments: CommentData[];
  /** Total comments including hidden ones */
  totalCommentCount: number;
}

// ─── API Callback Props ────────────────────────────────────────────────────────
// Each component receives only the callbacks it needs.
// Replace the stub implementations with real API calls later.

export interface PostActions {
  onReact: (postId: string, reaction: ReactionType) => Promise<void>;
  onComment: (postId: string, body: string) => Promise<CommentData>;
  onShare: (postId: string) => Promise<void>;
  onSave: (postId: string) => Promise<void>;
  onHide: (postId: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  onEdit: (postId: string) => void;
  onToggleNotification: (postId: string) => Promise<void>;
  onLoadMoreComments: (postId: string, cursor?: string) => Promise<CommentData[]>;
  onCommentReact: (commentId: string, reaction: ReactionType) => Promise<void>;
  onCommentReply: (commentId: string, body: string) => Promise<CommentData>;
}
