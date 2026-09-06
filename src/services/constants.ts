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
];

export const CONTENT_TYPES: ContentTypeOption[] = [
  { id: "educational", name: "Educational", blurb: "Teach one useful thing" },
  { id: "promotional", name: "Promotional", blurb: "Push an offer clearly" },
  { id: "storytelling", name: "Storytelling", blurb: "A real customer moment" },
  { id: "sales", name: "Sales", blurb: "Direct, conversion-focused" },
  { id: "behind-the-scenes", name: "Behind the Scenes", blurb: "Show the process" },
  { id: "tips", name: "Tips", blurb: "Fast, saveable advice" },
  { id: "motivation", name: "Motivation", blurb: "Fuel for the grind" },
  { id: "product-showcase", name: "Product Showcase", blurb: "Hero the product" },
  { id: "customer-testimonial", name: "Customer Testimonial", blurb: "Proof that sells" },
  { id: "trending-style", name: "Trending Style", blurb: "Ride the current format" },
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

/** Preset pack foregrounded for BENOVERTECH. */
export const PRESET_PACK = [
  "Phones",
  "Laptops",
  "Accessories",
  "Graphic Design",
  "Branding",
  "Printing",
  "Web Development",
];

export const NICHES: NicheOption[] = [
  { id: "Phones", name: "Phones", preset: true },
  { id: "Laptops", name: "Laptops", preset: true },
  { id: "Accessories", name: "Accessories", preset: true },
  { id: "Graphic Design", name: "Graphic Design", preset: true },
  { id: "Branding", name: "Branding", preset: true },
  { id: "Printing", name: "Printing", preset: true },
  { id: "Web Development", name: "Web Development", preset: true },
  { id: "Web Design", name: "Web Design" },
  { id: "Fashion", name: "Fashion" },
  { id: "Food", name: "Food" },
  { id: "Real Estate", name: "Real Estate" },
  { id: "custom", name: "Custom niche…" },
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
    contentType: "product-showcase",
    typeLabel: "Product Showcase",
  },
  {
    index: 3,
    short: "Wed",
    label: "Wednesday",
    contentType: "storytelling",
    typeLabel: "Storytelling",
  },
  {
    index: 4,
    short: "Thu",
    label: "Thursday",
    contentType: "educational",
    typeLabel: "Educational",
  },
  { index: 5, short: "Fri", label: "Friday", contentType: "sales", typeLabel: "Sales" },
  {
    index: 6,
    short: "Sat",
    label: "Saturday",
    contentType: "behind-the-scenes",
    typeLabel: "Behind the Scenes",
  },
  {
    index: 0,
    short: "Sun",
    label: "Sunday",
    contentType: "customer-testimonial",
    typeLabel: "Community",
  },
];

export function dayPlan(dayIndex: number): CalendarDay {
  return WEEK_CALENDAR.find((d) => d.index === dayIndex) ?? WEEK_CALENDAR[0]!;
}

export const DEFAULT_CTA = "Send us a WhatsApp message today.";
export const BRAND = "BENOVERTECH";
