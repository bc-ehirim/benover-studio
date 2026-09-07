import type { GeneratedContent } from "@/types";

export const CONTENT_HISTORY_KEY = "benover-tech-content-history";
const HISTORY_LIMIT = 12;

export function loadContentHistory(): GeneratedContent[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(CONTENT_HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

export function saveContentHistory(result: GeneratedContent): GeneratedContent[] {
  const next = [result, ...loadContentHistory().filter((item) => item.id !== result.id)];
  const limited = next.slice(0, HISTORY_LIMIT);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CONTENT_HISTORY_KEY, JSON.stringify(limited));
  }
  return limited;
}

export function clearContentHistory(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(CONTENT_HISTORY_KEY);
}
