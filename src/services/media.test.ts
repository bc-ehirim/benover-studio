import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createImageGenerationUrl,
  fetchGeneratedImage,
  imageExtension,
  releaseObjectUrl,
} from "./media";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("media utilities", () => {
  it("encodes the prompt and uses platform dimensions", () => {
    const url = createImageGenerationUrl("a phone & laptop", "tiktok");
    const parsed = new URL(url);

    expect(parsed.pathname).toContain("a%20phone%20%26%20laptop");
    expect(parsed.searchParams.get("width")).toBe("768");
    expect(parsed.searchParams.get("height")).toBe("1365");
  });

  it("maps response MIME types to download extensions", () => {
    expect(imageExtension("image/png")).toBe("png");
    expect(imageExtension("image/webp")).toBe("webp");
    expect(imageExtension("image/jpeg")).toBe("jpg");
  });

  it("returns a local object URL for a valid image response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(new Blob(["image"]), { headers: { "content-type": "image/png" } }),
    );
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:image");

    await expect(fetchGeneratedImage("https://example.test/image")).resolves.toEqual({
      url: "blob:image",
      extension: "png",
    });
  });

  it("reports HTTP failures and invalid content types", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 429 }));
    await expect(fetchGeneratedImage("https://example.test/image")).rejects.toThrow("busy");

    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response("not an image", { headers: { "content-type": "text/html" } }),
    );
    await expect(fetchGeneratedImage("https://example.test/image")).rejects.toThrow("invalid response");
  });

  it("reports a timeout", async () => {
    vi.useFakeTimers();
    globalThis.fetch = vi.fn().mockImplementation(
      (_url: string, options?: RequestInit) =>
        new Promise((_resolve, reject) => {
          options?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );

    const request = fetchGeneratedImage("https://example.test/image");
    const assertion = expect(request).rejects.toThrow("timed out");
    await vi.advanceTimersByTimeAsync(90_000);
    await assertion;
  });

  it("releases object URLs safely", () => {
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    releaseObjectUrl(null);
    releaseObjectUrl("blob:image");
    expect(revoke).toHaveBeenCalledWith("blob:image");
  });
});
