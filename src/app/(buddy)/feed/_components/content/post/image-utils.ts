/**
 * @file image-utils.ts
 *
 * Centralised image resolution.
 *
 * During development / before the backend is ready, components call `resolveImg()`
 * with a static-asset key and get back the correct URL from `@/assets`.
 *
 * Once the backend ships, callers simply pass the full URL they receive from the
 * API — `resolveImg()` detects this and returns it unchanged.
 *
 * No component needs to change at all when you migrate from static → API images.
 */

import * as images from "@/assets";

type ImageKey = keyof typeof images;

/**
 * Resolve an image source.
 *
 * - If `src` starts with "/" or "http" it is already an absolute URL → returned as-is.
 * - Otherwise it is treated as a key into the `@/assets` barrel export.
 * - Falls back to `Img1` if the key is not found.
 */
export function resolveImg(src: string): string {
  if (src.startsWith("/") || src.startsWith("http")) {
    return src;
  }
  return (images[src as ImageKey] as string) ?? (images["Img1"] as unknown as string);
}

/**
 * Convenience alias — keeps callers that were using the old `img()` helper
 * working with a one-line import change.
 *
 * @example
 * // Before (inline in PostCard.tsx)
 * img("PostImg")
 *
 * // After
 * import { img } from "@/lib/image-utils";
 * img("PostImg")
 */
export const img = resolveImg;
