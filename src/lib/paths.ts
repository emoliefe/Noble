/**
 * Prepend the Next.js basePath to local image paths.
 *
 * In GitHub Pages the site lives at /Noble, so all local images need the prefix.
 * NEXT_PUBLIC_BASE_PATH is set to "/Noble" in the GitHub Actions workflow.
 * In local dev it is unset, so we fall back to "".
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Return an absolute-from-root image path, basePath-aware. */
export function img(path: string): string {
  return `${BASE_PATH}${path}`;
}
