import type { AIProviderResponse } from "@/types";

/** Inactive placeholder. Makes no network calls. */
export const openAIProvider = {
  id: "openai",
  label: "OpenAI",
  enabled: false as const,
  async generate(): Promise<AIProviderResponse> {
    return { ok: false, reason: "OpenAI provider is not enabled in this offline build." };
  },
};
