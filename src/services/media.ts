import type { PlatformId } from "@/types";

const IMAGE_ENDPOINT = "https://image.pollinations.ai/prompt";

function imageDimensions(platform: PlatformId): { width: number; height: number } {
  if (platform === "tiktok") return { width: 768, height: 1365 };
  if (platform === "instagram") return { width: 1024, height: 1280 };
  return { width: 1024, height: 1024 };
}

/** Builds a free, no-key image-generation URL. The endpoint may be rate-limited. */
export function createImageGenerationUrl(prompt: string, platform: PlatformId): string {
  const { width, height } = imageDimensions(platform);
  const seed = Math.floor(Math.random() * 1_000_000_000);
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    model: "flux",
    seed: String(seed),
    nologo: "true",
    safe: "true",
  });
  return `${IMAGE_ENDPOINT}/${encodeURIComponent(prompt)}?${params.toString()}`;
}

export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("The free image service could not generate an image."));
    image.src = url;
  });
}
