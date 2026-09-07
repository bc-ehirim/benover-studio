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

export function loadBrandProfile(): BrandProfile {
  if (typeof window === "undefined") return DEFAULT_BRAND_PROFILE;
  try {
    const stored = window.localStorage.getItem(BRAND_PROFILE_KEY);
    if (!stored) return DEFAULT_BRAND_PROFILE;
    return { ...DEFAULT_BRAND_PROFILE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_BRAND_PROFILE;
  }
}

export function saveBrandProfile(profile: BrandProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BRAND_PROFILE_KEY, JSON.stringify(profile));
}

export function resetBrandProfile(): BrandProfile {
  if (typeof window !== "undefined") window.localStorage.removeItem(BRAND_PROFILE_KEY);
  return DEFAULT_BRAND_PROFILE;
}