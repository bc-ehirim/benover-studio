import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearContentHistory,
  loadContentHistory,
  removeContentHistory,
  saveContentHistory,
} from "./content-history";
import { generateContent } from "./generator";

function createStorage(initial = "") {
  let value = initial;
  return {
    getItem: vi.fn(() => value || null),
    setItem: vi.fn((_key: string, next: string) => {
      value = next;
    }),
    removeItem: vi.fn(() => {
      value = "";
    }),
  };
}

describe("content history persistence", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("ignores malformed records from localStorage", () => {
    const storage = createStorage(JSON.stringify([{ id: "bad" }, { nope: true }]));
    vi.stubGlobal("window", { localStorage: storage });

    expect(loadContentHistory()).toEqual([]);
  });

  it("saves, removes, and clears valid drafts", () => {
    const storage = createStorage();
    vi.stubGlobal("window", { localStorage: storage });
    const first = generateContent({
      platform: "instagram",
      contentType: "tips",
      niche: "iPhone",
      tone: "professional",
    });
    const second = generateContent({
      platform: "facebook",
      contentType: "tips",
      niche: "Laptops",
      tone: "professional",
    });

    expect(saveContentHistory(first)).toHaveLength(1);
    expect(saveContentHistory(second)).toHaveLength(2);
    expect(removeContentHistory(first.id)).toEqual([second]);
    clearContentHistory();
    expect(loadContentHistory()).toEqual([]);
  });
});
