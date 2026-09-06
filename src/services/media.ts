import type { PlatformId } from "@/types";

const IMAGE_ENDPOINT = "https://image.pollinations.ai/prompt";

export interface GeneratedImageAsset {
  url: string;
  extension: "jpg" | "png" | "webp";
}

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

export function imageExtension(contentType: string): GeneratedImageAsset["extension"] {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

export function releaseObjectUrl(url: string | null): void {
  if (url) URL.revokeObjectURL(url);
}

export async function fetchGeneratedImage(
  url: string,
  signal?: AbortSignal,
): Promise<GeneratedImageAsset> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90_000);
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(url, { signal: controller.signal, mode: "cors" });
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("The free image service is busy right now. Please retry in a moment.");
      }
      throw new Error(`The image service returned HTTP ${response.status}.`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      throw new Error("The image service returned an invalid response.");
    }
    return {
      url: URL.createObjectURL(await response.blob()),
      extension: imageExtension(contentType),
    };
  } catch (error) {
    if (signal?.aborted) {
      throw new Error("Image generation was cancelled.");
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Image generation timed out. Please try again.");
    }
    if (error instanceof TypeError) {
      throw new Error("The image service could not be reached. Check your connection and retry.");
    }
    throw error instanceof Error
      ? error
      : new Error("The free image service could not generate an image.");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
