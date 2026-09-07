import type { BrandProfile } from "@/types";

export const BRAND_PROFILE_KEY = "benover-tech-brand-profile";

export const DEFAULT_BRAND_PROFILE: BrandProfile = {
  business: "Benover Tech",
  location: "",
  whatsapp: "",
  currency: "NGN",
  delivery: "",
  warranty: "",
  paymentOptions: "",
  audience: "People upgrading their everyday tech",
  tone: "professional",
  trustStatements: "",
  cta: "Message Benover Tech for current availability.",
};

const TONES = new Set<BrandProfile["tone"]>([
  "professional",
  "street-nigerian",
  "luxury",
  "funny",
  "emotional",
  "corporate",
  "gen-z",
]);

function readProfile(value: unknown): BrandProfile {
  if (!value || typeof value !== "object") return { ...DEFAULT_BRAND_PROFILE };
  const stored = value as Partial<BrandProfile>;
  const profile = { ...DEFAULT_BRAND_PROFILE };
  for (const key of Object.keys(profile) as Array<keyof BrandProfile>) {
    if (typeof stored[key] === "string") profile[key] = stored[key] as never;
  }
  if (!TONES.has(profile.tone)) profile.tone = DEFAULT_BRAND_PROFILE.tone;
  return profile;
}

export function loadBrandProfile(): BrandProfile {
  if (typeof window === "undefined") return DEFAULT_BRAND_PROFILE;
  try {
    const stored = window.localStorage.getItem(BRAND_PROFILE_KEY);
    if (!stored) return { ...DEFAULT_BRAND_PROFILE };
    return readProfile(JSON.parse(stored));
  } catch {
    return { ...DEFAULT_BRAND_PROFILE };
  }
}

export function saveBrandProfile(profile: BrandProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BRAND_PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // Keep the current profile in React state when storage is unavailable.
  }
}

export function resetBrandProfile(): BrandProfile {
  if (typeof window !== "undefined") window.localStorage.removeItem(BRAND_PROFILE_KEY);
  return { ...DEFAULT_BRAND_PROFILE };
}
