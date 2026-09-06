export type PlatformId = "facebook" | "instagram" | "tiktok";

export type ContentTypeId =
  | "educational"
  | "promotional"
  | "storytelling"
  | "sales"
  | "behind-the-scenes"
  | "tips"
  | "motivation"
  | "product-showcase"
  | "customer-testimonial"
  | "trending-style";

export type ToneId =
  | "professional"
  | "street-nigerian"
  | "luxury"
  | "funny"
  | "emotional"
  | "corporate"
  | "gen-z";

export interface Platform {
  id: PlatformId;
  name: string;
  blurb: string;
  maxChars: number;
}

export interface ContentTypeOption {
  id: ContentTypeId;
  name: string;
  blurb: string;
}

export interface ToneOption {
  id: ToneId;
  name: string;
}

export interface NicheOption {
  id: string;
  name: string;
  preset?: boolean;
}

export interface GenerationInput {
  platform: PlatformId;
  contentType: ContentTypeId;
  niche: string;
  customNiche?: string;
  tone: ToneId;
  business?: string;
  audience?: string;
  cta?: string;
}

export interface GeneratedContent {
  id: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  cta: string;
  imagePrompt: string;
  videoPrompt: string;
  platform: PlatformId;
  contentType: ContentTypeId;
  tone: ToneId;
  niche: string;
  createdAt: string;
}

export interface AIProviderResponse {
  ok: false;
  reason: string;
}
