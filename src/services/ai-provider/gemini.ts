import type { AIProviderResponse } from "@/types";

/** Inactive placeholder. Makes no network calls. */
export const geminiProvider = {
  id: "gemini",
  label: "Gemini",
  enabled: false as const,
  async generate(): Promise<AIProviderResponse> {
    return { ok: false, reason: "Gemini provider is not enabled in this offline build." };
  },
};
