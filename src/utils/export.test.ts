import { describe, expect, it } from "vitest";
import type { GeneratedContent } from "@/types";
import { downloadTextFile, resultToText } from "./export";

const result: GeneratedContent = {
  id: "instagram-educational-phones-professional",
  title: "A useful phone buying guide",
  hook: "Check this before you pay.",
  caption: "A ready-to-post caption.",
  hashtags: ["#Phones", "#Tech"],
  cta: "Message us today.",
  imagePrompt: "A premium phone photograph.",
  videoPrompt: "A short product video.",
  platform: "instagram",
  contentType: "educational",
  tone: "professional",
  niche: "Phones",
  createdAt: "2026-09-06T00:00:00.000Z",
};

describe("result export", () => {
  it("includes every generated result section", () => {
    const output = resultToText(result);

    expect(output).toContain(result.title);
    expect(output).toContain(result.caption);
    expect(output).toContain(result.hashtags.join(" "));
    expect(output).toContain(result.cta);
    expect(output).toContain(result.imagePrompt);
    expect(output).toContain(result.videoPrompt);
  });

  it("reports unavailable downloads outside a browser", () => {
    expect(downloadTextFile("content.txt", "content")).toBe(false);
  });
});
