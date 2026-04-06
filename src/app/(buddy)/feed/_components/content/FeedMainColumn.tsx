"use client";

import { cn } from "@/lib/utils";
import { StoriesStrip } from "./StoriesStrip";
import { PostComposer } from "./PostComposer";
import PostCard from "./post/PostCard.example";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] shadow-sm dark:shadow-none";

export function FeedMainColumn() {
  return (
    <div className="space-y-4 pb-24">
      {/* Stories */}
      <div className={cn("relative rounded-md p-4", cardClass)}>
        <StoriesStrip />
      </div>

      {/* Post composer */}
      <PostComposer />

      {/* Posts */}
      <PostCard />
    </div>
  );
}
