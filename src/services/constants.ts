import type {
  ContentTypeOption,
  NicheOption,
  Platform,
  ToneOption,
  ContentTypeId,
} from "@/types";

export const PLATFORMS: Platform[] = [
  {
    id: "facebook",
    name: "Facebook",
    blurb: "Long-form, community-driven posts",
    maxChars: 2200,
  },
  {
    id: "instagram",
    name: "Instagram",
    blurb: "Visual-first captions with hashtags",
    maxChars: 2200,
  },
  {
    id: "tiktok",
    name: "TikTok",
    blurb: "Punchy hooks built for watch time",
    maxChars: 2200,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    blurb: "Direct, concise buyer conversations",
    maxChars: 1000,
  },
];

export const CONTENT_TYPES: ContentTypeOption[] = [
  { id: "educational", name: "Buyer Education", blurb: "Teach one useful thing" },
  { id: "promotional", name: "Offer", blurb: "Present a product offer" },
  { id: "comparison", name: "Comparison", blurb: "Help buyers compare" },
  { id: "tips", name: "Tips", blurb: "Fast, saveable advice" },
  { id: "product-showcase", name: "Product Showcase", blurb: "Hero the product" },
  { id: "customer-proof", name: "Customer Proof", blurb: "Show why buyers trust it" },
];

export const TONES: ToneOption[] = [
  { id: "professional", name: "Professional" },
  { id: "street-nigerian", name: "Street Nigerian" },
  { id: "luxury", name: "Luxury" },
  { id: "funny", name: "Funny" },
  { id: "emotional", name: "Emotional" },
  { id: "corporate", name: "Corporate" },
  { id: "gen-z", name: "Gen Z" },
];

/** Gadget categories supported by Benover Tech. */
export const PRESET_PACK = [
  "iPhone",
  "Samsung Phones",
  "Laptops",
  "Accessories",
  "Tablets",
  "Smartwatches",
  "Earbuds & Audio",
  "Chargers & Power Banks",
  "Monitors",
];

export const NICHES: NicheOption[] = [
  { id: "iPhone", name: "iPhone", preset: true },
  { id: "Samsung Phones", name: "Samsung Phones", preset: true },
  { id: "Laptops", name: "Laptops", preset: true },
  { id: "Accessories", name: "Accessories", preset: true },
  { id: "Tablets", name: "Tablets", preset: true },
  { id: "Smartwatches", name: "Smartwatches", preset: true },
  { id: "Earbuds & Audio", name: "Earbuds & Audio", preset: true },
  { id: "Chargers & Power Banks", name: "Chargers & Power Banks", preset: true },
  { id: "Monitors", name: "Monitors", preset: true },
  { id: "custom", name: "Custom gadget…" },
];

export interface CalendarDay {
  index: number;
  short: string;
  label: string;
  contentType: ContentTypeId;
  typeLabel: string;
}

/** Sunday = 0 to match Date.getDay(). Sunday "Community" maps to storytelling. */
export const WEEK_CALENDAR: CalendarDay[] = [
  {
    index: 1,
    short: "Mon",
    label: "Monday",
    contentType: "tips",
    typeLabel: "Tips",
  },
  {
    index: 2,
    short: "Tue",
    label: "Tuesday",
    contentType: "comparison",
    typeLabel: "Comparison",
  },
  {
    index: 3,
    short: "Wed",
    label: "Wednesday",
    contentType: "customer-proof",
    typeLabel: "Customer Proof",
  },
  {
    index: 4,
    short: "Thu",
    label: "Thursday",
    contentType: "educational",
    typeLabel: "Educational",
  },
  { index: 5, short: "Fri", label: "Friday", contentType: "promotional", typeLabel: "Offer" },
  {
    index: 6,
    short: "Sat",
    label: "Saturday",
    contentType: "product-showcase",
    typeLabel: "Product Showcase",
  },
  {
    index: 0,
    short: "Sun",
    label: "Sunday",
    contentType: "tips",
    typeLabel: "Tips",
  },
];

export function dayPlan(dayIndex: number): CalendarDay {
  return WEEK_CALENDAR.find((d) => d.index === dayIndex) ?? WEEK_CALENDAR[0]!;
}

export const DEFAULT_CTA = "Message Benover Tech for current availability.";
export const BRAND = "Benover Tech";

export const INPUT_LIMITS = {
  business: 80,
  audience: 120,
  cta: 160,
  customNiche: 60,
  productField: 80,
} as const;
