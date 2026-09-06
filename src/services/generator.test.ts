import { describe, expect, it } from "vitest";
import { INPUT_LIMITS, PLATFORMS } from "./constants";
import { generateContent } from "./generator";

const baseInput = {
  platform: "instagram" as const,
  contentType: "educational" as const,
  niche: "iPhone",
  tone: "professional" as const,
};

describe("generateContent", () => {
  it("returns exactly 15 unique hashtags", () => {
    const result = generateContent(baseInput);
    const normalized = result.hashtags.map((tag) => tag.toLowerCase());

    expect(result.hashtags).toHaveLength(15);
    expect(new Set(normalized).size).toBe(15);
  });

  it("resolves and propagates a custom niche", () => {
    const result = generateContent({
      ...baseInput,
      niche: "custom",
      customNiche: "Gaming consoles",
    });

    expect(result.niche).toBe("Gaming consoles");
    expect(result.caption).toContain("Gaming consoles");
    expect(result.hashtags).toContain("#GamingConsoles");
  });

  it("propagates business, audience, and CTA through the result", () => {
    const result = generateContent({
      ...baseInput,
      business: "Benover Tech",
      audience: "Toronto students",
      cta: "Book a device consultation today.",
    });
    const combined = [result.caption, result.imagePrompt, result.videoPrompt].join("\n");

    expect(combined).toContain("Benover Tech");
    expect(combined).toContain("Toronto students");
    expect(result.caption).toContain("Book a device consultation today.");
    expect(result.videoPrompt).toContain("Book a device consultation today.");
  });

  it("changes caption structure and hashtags by platform", () => {
    const facebook = generateContent({ ...baseInput, platform: "facebook" });
    const instagram = generateContent({ ...baseInput, platform: "instagram" });
    const tiktok = generateContent({ ...baseInput, platform: "tiktok" });

    expect(facebook.caption).not.toBe(instagram.caption);
    expect(instagram.caption).not.toBe(tiktok.caption);
    expect(facebook.hashtags).not.toEqual(instagram.hashtags);
    expect(tiktok.caption.startsWith(tiktok.hook)).toBe(true);
    expect(facebook.caption).toContain("Facebook");
  });

  it("changes vocabulary and formatting by tone", () => {
    const professional = generateContent({ ...baseInput, tone: "professional" });
    const luxury = generateContent({ ...baseInput, tone: "luxury" });
    const genZ = generateContent({ ...baseInput, tone: "gen-z" });

    expect(professional.caption).not.toBe(luxury.caption);
    expect(luxury.caption).toContain("Quietly, the right details");
    expect(genZ.caption).toContain("ok, quick setup check.");
    expect(genZ.caption).not.toContain("Most people");
  });

  it("enforces input limits for non-UI callers", () => {
    const business = "B".repeat(INPUT_LIMITS.business + 20);
    const audience = "A".repeat(INPUT_LIMITS.audience + 20);
    const cta = "C".repeat(INPUT_LIMITS.cta + 20);
    const result = generateContent({ ...baseInput, business, audience, cta });

    expect(result.caption).toContain("B".repeat(INPUT_LIMITS.business));
    expect(result.caption).not.toContain(business);
    expect(result.caption).toContain("A".repeat(INPUT_LIMITS.audience));
    expect(result.cta).toBe("C".repeat(INPUT_LIMITS.cta));
    expect(result.caption.length).toBeLessThanOrEqual(
      PLATFORMS.find((platform) => platform.id === baseInput.platform)!.maxChars,
    );
  });
});
