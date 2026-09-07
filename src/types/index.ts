export type PlatformId = "facebook" | "instagram" | "tiktok" | "whatsapp";

export type ContentTypeId =
  "educational" | "promotional" | "comparison" | "tips" | "product-showcase" | "customer-proof";

export type ToneId =
  "professional" | "street-nigerian" | "luxury" | "funny" | "emotional" | "corporate" | "gen-z";

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
  model?: string;
  storage?: string;
  ram?: string;
  condition?: string;
  batteryHealth?: string;
  color?: string;
  price?: string;
  availability?: string;
  location?: string;
  delivery?: string;
  warranty?: string;
  paymentOptions?: string;
  trustStatements?: string;
  variation?: number;
}

export interface BrandProfile {
  business: string;
  location: string;
  whatsapp: string;
  currency: string;
  delivery: string;
  warranty: string;
  paymentOptions: string;
  audience: string;
  tone: ToneId;
  trustStatements: string;
  cta: string;
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
