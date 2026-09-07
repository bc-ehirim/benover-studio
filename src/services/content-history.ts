import type { GeneratedContent } from "@/types";

export const CONTENT_HISTORY_KEY = "benover-tech-content-history";
const HISTORY_LIMIT = 12;

function writeHistory(history: GeneratedContent[]): void {
  try {
    window.localStorage.setItem(CONTENT_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Local storage can be unavailable or full; the in-memory UI still works.
  }
}

function isGeneratedContent(value: unknown): value is GeneratedContent {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<GeneratedContent>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.hook === "string" &&
    typeof item.caption === "string" &&
    Array.isArray(item.hashtags) &&
    item.hashtags.every((tag) => typeof tag === "string") &&
    typeof item.cta === "string" &&
    typeof item.imagePrompt === "string" &&
    typeof item.videoPrompt === "string" &&
    typeof item.platform === "string" &&
    typeof item.contentType === "string" &&
    typeof item.tone === "string" &&
    typeof item.niche === "string" &&
    typeof item.createdAt === "string"
  );
}

export function loadContentHistory(): GeneratedContent[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(CONTENT_HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    return Array.isArray(history) ? history.filter(isGeneratedContent) : [];
  } catch {
    return [];
  }
}

export function saveContentHistory(result: GeneratedContent): GeneratedContent[] {
  const next = [
    result,
    ...loadContentHistory().filter(
      (item) => item.id !== result.id || item.createdAt !== result.createdAt,
    ),
  ];
  const limited = next.slice(0, HISTORY_LIMIT);
  if (typeof window !== "undefined") writeHistory(limited);
  return limited;
}

export function removeContentHistory(id: string): GeneratedContent[] {
  const next = loadContentHistory().filter((item) => item.id !== id);
  if (typeof window !== "undefined") writeHistory(next);
  return next;
}

export function clearContentHistory(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(CONTENT_HISTORY_KEY);
}
