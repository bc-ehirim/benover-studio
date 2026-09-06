import type { GeneratedContent } from "@/types";

/** Full plain-text rendering of a generated result. */
export function resultToText(result: GeneratedContent): string {
  return [
    "BENOVER CONTENT STUDIO",
    "======================",
    "",
    `Platform:     ${result.platform}`,
    `Content type: ${result.contentType}`,
    `Tone:         ${result.tone}`,
    `Niche:        ${result.niche}`,
    `Generated:    ${new Date(result.createdAt).toLocaleString()}`,
    "",
    "TITLE",
    "-----",
    result.title,
    "",
    "HOOK",
    "----",
    result.hook,
    "",
    "CAPTION",
    "-------",
    result.caption,
    "",
    `HASHTAGS (${result.hashtags.length})`,
    "---------",
    result.hashtags.join(" "),
    "",
    "CALL TO ACTION",
    "--------------",
    result.cta,
    "",
    "IMAGE PROMPT",
    "------------",
    result.imagePrompt,
    "",
    "AI VIDEO PROMPT",
    "---------------",
    result.videoPrompt,
    "",
    "PUBLISHING",
    "----------",
    "Copy, create media elsewhere, then post manually.",
    "",
  ].join("\n");
}

/** Trigger a client-side .txt download. No network involved. */
export function downloadTextFile(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
