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

export async function fetchGeneratedImage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 90_000);

  try {
    const response = await fetch(url, { signal: controller.signal, mode: "cors" });
    if (!response.ok) {
      throw new Error(`The image service returned HTTP ${response.status}.`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      throw new Error("The image service returned an invalid response.");
    }
    return URL.createObjectURL(await response.blob());
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Image generation timed out. Please try again.");
    }
    throw error instanceof Error
      ? error
      : new Error("The free image service could not generate an image.");
  } finally {
    window.clearTimeout(timeout);
  }
}
