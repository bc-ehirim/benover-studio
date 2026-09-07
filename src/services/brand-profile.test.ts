import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_BRAND_PROFILE,
  loadBrandProfile,
  resetBrandProfile,
  saveBrandProfile,
} from "./brand-profile";

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

describe("brand profile persistence", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("merges valid saved values and rejects invalid tone values", () => {
    const storage = createStorage(
      JSON.stringify({ business: "Benover Mobile", tone: "not-a-tone" }),
    );
    vi.stubGlobal("window", { localStorage: storage });

    expect(loadBrandProfile()).toMatchObject({
      business: "Benover Mobile",
      tone: DEFAULT_BRAND_PROFILE.tone,
      audience: DEFAULT_BRAND_PROFILE.audience,
    });
  });

  it("saves and resets a profile", () => {
    const storage = createStorage();
    vi.stubGlobal("window", { localStorage: storage });
    const profile = { ...DEFAULT_BRAND_PROFILE, business: "Benover Mobile" };

    saveBrandProfile(profile);
    expect(loadBrandProfile().business).toBe("Benover Mobile");
    expect(resetBrandProfile()).toEqual(DEFAULT_BRAND_PROFILE);
  });
});
