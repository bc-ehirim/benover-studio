import type { ContentTypeId, GenerationInput, PlatformId, ToneId } from "@/types";
import { CONTENT_TYPES, PLATFORMS, TONES } from "./constants";

/**
 * Reusable prompt-engine templates.
 *
 * Structured blocks: Platform, Content Type, Tone, Business, Target Audience,
 * CTA, Output Format. Used locally to assemble deterministic content and to
 * build a portable prompt string. No network calls are ever made here.
 */

export const PLATFORM_RULES: Record<PlatformId, string> = {
  facebook:
    "Write for Facebook feed readers: a strong first line, short scannable paragraphs, community warmth, and a plain-language CTA.",
  instagram:
    "Write for Instagram: visual-first caption, tight line breaks, one clear idea, emoji used sparingly, hashtags grouped at the end.",
  tiktok:
    "Write for TikTok: hook in the first 3 seconds, spoken rhythm, short lines, native slang-friendly, CTA in the last line.",
};

export const CONTENT_TYPE_RULES: Record<ContentTypeId, string> = {
  educational: "Teach exactly one useful idea with concrete, checkable detail.",
  promotional: "Present a specific offer with the benefit before the ask.",
  storytelling: "Tell a small true-feeling story with a turn and a lesson.",
  sales: "Remove doubt, name the objection, and close with urgency that stays honest.",
  "behind-the-scenes": "Show process and standards so the work feels trustworthy.",
  tips: "Deliver fast, saveable, numbered advice with no filler.",
  motivation: "Encourage without cliché; anchor it in the customer's real day.",
  "product-showcase": "Lead with the product's standout detail, then proof, then price cue.",
  "customer-testimonial": "Center the customer's words and the result they got.",
  "trending-style": "Use a current short-form format: list, myth-bust, or POV framing.",
};

export const TONE_RULES: Record<ToneId, string> = {
  professional: "Clear, confident, no slang, no hype.",
  "street-nigerian": "Warm Nigerian street register: pidgin flavour, playful, still respectful.",
  luxury: "Restrained, premium, spacious sentences, quiet authority.",
  funny: "Light, self-aware humour that never mocks the customer.",
  emotional: "Human and sincere; speak to relief, pride and trust.",
  corporate: "Formal, structured, brand-safe, benefit-led.",
  "gen-z": "Fast, lowercase energy, punchy fragments, culturally current.",
};

export const OUTPUT_FORMAT = [
  "TITLE: one scroll-stopping line",
  "HOOK: one opening sentence",
  "CAPTION: full ready-to-post social caption",
  "HASHTAGS: exactly 15, relevant, no duplicates",
  "CTA: one direct action line",
  "IMAGE PROMPT: full descriptive brief for an image model",
  "VIDEO PROMPT: hook, Scene 1-3, text overlays, camera movement, ending CTA",
].join("\n");

export function buildPrompt(input: GenerationInput): string {
  const niche = resolveNiche(input);
  const platform = PLATFORMS.find((p) => p.id === input.platform)?.name ?? input.platform;
  const type = CONTENT_TYPES.find((c) => c.id === input.contentType)?.name ?? input.contentType;
  const tone = TONES.find((t) => t.id === input.tone)?.name ?? input.tone;

  return [
    `PLATFORM: ${platform}\n${PLATFORM_RULES[input.platform]}`,
    `CONTENT TYPE: ${type}\n${CONTENT_TYPE_RULES[input.contentType]}`,
    `TONE: ${tone}\n${TONE_RULES[input.tone]}`,
    `BUSINESS: ${input.business?.trim() || "BENOVERTECH — phones, laptops, accessories, graphic design, branding, printing and web development."}`,
    `TARGET AUDIENCE: ${input.audience?.trim() || `${niche} buyers in Lagos and across Nigeria`}`,
    `CTA: ${input.cta?.trim() || "Send us a WhatsApp message today."}`,
    `OUTPUT FORMAT:\n${OUTPUT_FORMAT}`,
  ].join("\n\n");
}

export function resolveNiche(input: GenerationInput): string {
  const custom = input.customNiche?.trim();
  if (input.niche === "custom" && custom) return custom;
  return custom && !input.niche ? custom : input.niche || "Phones";
}
