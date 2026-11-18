export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const imageUrl = (
  path?: string | null,
  size: string = "original",
): string | undefined =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : undefined;
