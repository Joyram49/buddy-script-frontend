/** Static files under `public/buddyscript/assets`. */
export function buddyAsset(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, "");
  return `/buddyscript/assets/${trimmed}`;
}
