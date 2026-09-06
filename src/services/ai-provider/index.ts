/**
 * AI Provider registry — INACTIVE placeholders.
 *
 * Captions and video assembly run locally. Image generation uses an online
 * provider in `src/services/media.ts`. These modules are inactive placeholders
 * for future server-side providers; none of them accept browser API keys.
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
