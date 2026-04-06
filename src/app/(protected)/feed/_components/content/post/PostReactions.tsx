import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { resolveImg } from "./image-utils";
import type { PostData } from "./types";

interface PostReactionsProps {
  post: Pick<PostData, "reactionSummary" | "commentCount" | "shareCount">;
  /** If true, comment count is a navigable link (e.g. on a detail page) */
  commentLinkHref?: string;
}

export function PostReactions({ post, commentLinkHref }: PostReactionsProps) {
  const { topReactors, total } = post.reactionSummary;
  const overflow = Math.max(0, total - topReactors.length);

  return (
    <div className="border-buddy-divider mx-6 mb-[26px] flex items-center justify-between border-b pb-4">
      {/* Reaction avatars */}
      <div className="flex cursor-pointer items-center gap-2">
        {topReactors.map((user, i) => (
          <div
            key={user.id}
            className={cn(
              "dark:border-buddy-surface relative size-8 overflow-hidden rounded-full border-2 border-white",
              i > 0 && "-ml-4",
            )}
            title={user.name}
          >
            <Image src={resolveImg(user.avatarUrl)} alt={user.name} fill className="object-cover" />
          </div>
        ))}

        {overflow > 0 && (
          <div className="bg-buddy-accent dark:border-buddy-surface -ml-4 flex size-8 items-center justify-center rounded-full border-2 border-white text-xs font-normal text-white">
            {overflow}+
          </div>
        )}
        <span className="text-buddy-heading text-sm font-medium">{total}</span>
      </div>

      {/* Comment & share counts */}
      <div className="flex gap-4">
        <p className="text-buddy-muted text-sm">
          {commentLinkHref ? (
            <Link href={commentLinkHref} className="hover:text-buddy-accent">
              <span className="text-buddy-heading font-medium">{post.commentCount}</span> Comment
            </Link>
          ) : (
            <>
              <span className="text-buddy-heading font-medium">{post.commentCount}</span> Comment
            </>
          )}
        </p>
        <p className="text-buddy-muted text-sm">
          <span className="text-buddy-heading font-medium">{post.shareCount}</span> Share
        </p>
      </div>
    </div>
  );
}
