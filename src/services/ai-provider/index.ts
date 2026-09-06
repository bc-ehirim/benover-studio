/**
 * AI Provider registry — INACTIVE placeholders.
 *
 * BENOVER Content Studio is fully offline: generation happens locally in
 * `src/services/generator.ts`. These modules exist so a provider can be wired
 * later. None of them perform network calls, and none accept API keys.
 */
import { openAIProvider } from "./openai";
import { geminiProvider } from "./gemini";
import { claudeProvider } from "./claude";
import type { AIProviderResponse } from "@/types";

export interface AIProvider {
  id: string;
  label: string;
  enabled: false;
  generate: () => Promise<AIProviderResponse>;
}

export const AI_PROVIDERS: AIProvider[] = [openAIProvider, geminiProvider, claudeProvider];

export const ACTIVE_PROVIDER = "local-prompt-engine" as const;

export { openAIProvider, geminiProvider, claudeProvider };
