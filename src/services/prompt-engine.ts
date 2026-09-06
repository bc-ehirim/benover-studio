import type { GenerationInput } from "@/types";

export function resolveNiche(input: GenerationInput): string {
  const custom = input.customNiche?.trim();
  if (input.niche === "custom" && custom) return custom;
  return custom && !input.niche ? custom : input.niche || "iPhone";
}
