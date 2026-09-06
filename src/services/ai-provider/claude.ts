import type { AIProviderResponse } from "@/types";

/** Inactive placeholder. Makes no network calls. */
export const claudeProvider = {
  id: "claude",
  label: "Claude",
  enabled: false as const,
  async generate(): Promise<AIProviderResponse> {
    return { ok: false, reason: "Claude provider is not enabled in this offline build." };
  },
};
