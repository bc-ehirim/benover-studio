import type { ContentTypeId, ToneId } from "@/types";

/** Deterministic content templates keyed by niche and content type. */

export interface NicheProfile {
  key: string;
  subject: string;
  hero: string;
  detail: string;
  proof: string;
  objection: string;
  imageSubject: string;
  tags: string[];
}

export const NICHE_PROFILES: Record<string, NicheProfile> = {
  Phones: {
    key: "Phones",
    subject: "used and new phones",
    hero: "a clean, battery-healthy iPhone",
    detail: "battery health, true storage size, iCloud lock status and panel originality",
    proof: "every device is tested in front of you before money changes hands",
    objection: "“What if the phone is locked or the battery is dead?”",
    imageSubject: "iPhone 14 Pro in space black with gold accent lighting",
    tags: [
      "#iPhoneNigeria",
      "#UsedPhones",
      "#PhoneDealsLagos",
      "#UKUsediPhone",
      "#BatteryHealth",
      "#GadgetsNigeria",
      "#PhonePlug",
      "#SmartphoneDeals",
    ],
  },
  Laptops: {
    key: "Laptops",
    subject: "laptops for work and school",
    hero: "a fast, clean-spec laptop",
    detail: "RAM, SSD speed, battery cycles, keyboard wear and screen condition",
    proof: "every laptop is benchmarked and stress-tested before it leaves the shop",
    objection: "“Will it slow down after two months?”",
    imageSubject: "slim aluminium laptop open on a dark marble desk",
    tags: [
      "#LaptopsNigeria",
      "#MacBookNigeria",
      "#UKUsedLaptop",
      "#StudentLaptop",
      "#WorkFromHome",
      "#TechDealsLagos",
      "#LaptopDeals",
      "#GadgetsNigeria",
    ],
  },
  Accessories: {
    key: "Accessories",
    subject: "phone and laptop accessories",
    hero: "accessories that actually last",
    detail: "cable gauge, charger wattage, real capacity and warranty",
    proof: "we only stock accessories we would use on our own devices",
    objection: "“Cheap chargers spoil my battery.”",
    imageSubject: "premium braided charging cable and power bank on black stone",
    tags: [
      "#PhoneAccessories",
      "#ChargersNigeria",
      "#PowerBank",
      "#GadgetsNigeria",
      "#TechAccessories",
      "#AirPodsNigeria",
      "#LagosGadgets",
      "#OriginalAccessories",
    ],
  },
  "Graphic Design": {
    key: "Graphic Design",
    subject: "graphic design for growing brands",
    hero: "a design system your customers remember",
    detail: "grid, hierarchy, contrast and export-ready files",
    proof: "we hand over source files, not just flat images",
    objection: "“My designer disappears after payment.”",
    imageSubject: "brand identity flat-lay with gold foil business cards on black",
    tags: [
      "#GraphicDesign",
      "#DesignNigeria",
      "#BrandIdentity",
      "#FlyerDesign",
      "#LogoDesigner",
      "#CreativeNigeria",
      "#DesignerLagos",
      "#VisualIdentity",
    ],
  },
  Branding: {
    key: "Branding",
    subject: "brand identity",
    hero: "a brand that looks funded",
    detail: "logo suite, colour system, type scale and usage rules",
    proof: "we deliver a written brand guide, not a single logo file",
    objection: "“Branding is too expensive for a small business.”",
    imageSubject: "luxury brand guideline booklet with gold embossing on black surface",
    tags: [
      "#Branding",
      "#BrandDesign",
      "#SmallBusinessNigeria",
      "#LogoDesign",
      "#BrandStrategy",
      "#CreativeNigeria",
      "#BrandIdentity",
      "#StartupNigeria",
    ],
  },
  Printing: {
    key: "Printing",
    subject: "print jobs done properly",
    hero: "print that feels expensive in the hand",
    detail: "GSM, finish, bleed and colour profile",
    proof: "we print a proof before we print a thousand",
    objection: "“The colours never come out like the design.”",
    imageSubject: "stack of gold-foiled business cards under warm studio light",
    tags: [
      "#PrintingNigeria",
      "#BusinessCards",
      "#FlyerPrinting",
      "#LargeFormatPrint",
      "#BrandedMerch",
      "#PrintLagos",
      "#SmallBusinessNigeria",
      "#QualityPrinting",
    ],
  },
  "Web Development": {
    key: "Web Development",
    subject: "websites that convert",
    hero: "a site that loads fast and sells",
    detail: "speed score, mobile layout, clear CTA and working forms",
    proof: "we hand over a site you can edit, with training included",
    objection: "“I paid for a website and it never went live.”",
    imageSubject: "dark UI dashboard glowing on a laptop screen in a studio",
    tags: [
      "#WebDevelopment",
      "#WebDesign",
      "#WebsiteNigeria",
      "#SmallBusinessWebsite",
      "#Ecommerce",
      "#TechNigeria",
      "#Frontend",
      "#DigitalPresence",
    ],
  },
  "Web Design": {
    key: "Web Design",
    subject: "web design",
    hero: "a website people trust in 3 seconds",
    detail: "layout rhythm, typography, contrast and mobile-first spacing",
    proof: "we design on mobile first, then scale up",
    objection: "“My site looks broken on phones.”",
    imageSubject: "elegant dark website mockup floating over a black gradient",
    tags: [
      "#WebDesign",
      "#UIDesign",
      "#UXDesign",
      "#WebsiteNigeria",
      "#LandingPage",
      "#DesignNigeria",
      "#MobileFirst",
      "#DigitalBrand",
    ],
  },
  Fashion: {
    key: "Fashion",
    subject: "fashion pieces",
    hero: "a fit that carries the room",
    detail: "fabric weight, stitching, fit and finish",
    proof: "every piece is checked seam by seam before delivery",
    objection: "“What I ordered is never what I get.”",
    imageSubject: "editorial fashion shot with warm gold rim light on black",
    tags: [
      "#FashionNigeria",
      "#StyleLagos",
      "#OOTD",
      "#NigerianFashion",
      "#Streetwear",
      "#FashionBrand",
      "#SlayLagos",
      "#ShopNigeria",
    ],
  },
  Food: {
    key: "Food",
    subject: "food people come back for",
    hero: "a plate worth the drive",
    detail: "freshness, portion, seasoning and packaging",
    proof: "cooked to order, never reheated",
    objection: "“Delivery always arrives cold.”",
    imageSubject: "steaming plated dish under warm golden light on dark wood",
    tags: [
      "#FoodNigeria",
      "#LagosFood",
      "#Foodie",
      "#JollofRice",
      "#FoodDelivery",
      "#EatLagos",
      "#HomeCooked",
      "#FoodBusiness",
    ],
  },
  "Real Estate": {
    key: "Real Estate",
    subject: "property that holds value",
    hero: "a title you can actually verify",
    detail: "documentation, survey, access road and true square metres",
    proof: "we walk the land with you and show the papers first",
    objection: "“Land scams are everywhere.”",
    imageSubject: "modern luxury property exterior at golden hour",
    tags: [
      "#RealEstateNigeria",
      "#LagosProperty",
      "#LandForSale",
      "#PropertyInvestment",
      "#RealEstateInvesting",
      "#HouseForSale",
      "#Lekki",
      "#OwnYourHome",
    ],
  },
};

export const DEFAULT_PROFILE: NicheProfile = {
  key: "General",
  subject: "what you sell",
  hero: "an offer worth stopping for",
  detail: "quality, price honesty and after-sales support",
  proof: "we show the work before you pay",
  objection: "“How do I know you are real?”",
  imageSubject: "premium product on a reflective black surface with gold light",
  tags: [
    "#SmallBusinessNigeria",
    "#LagosBusiness2",
    "#ShopNigeria",
    "#BuyNigerian",
    "#NigerianBusiness",
    "#CustomerFirst",
    "#QualityService",
    "#GrowYourBrand",
  ],
};

export function profileFor(niche: string): NicheProfile {
  return NICHE_PROFILES[niche] ?? { ...DEFAULT_PROFILE, key: niche, subject: niche.toLowerCase() };
}

export const TITLE_TEMPLATES: Record<ContentTypeId, (p: NicheProfile) => string> = {
  educational: (p) => `What Nobody Explains To You About ${p.key}`,
  promotional: (p) => `This Week Only: ${p.key} At Prices That Make Sense`,
  storytelling: (p) => `The Customer Who Almost Gave Up On ${p.key}`,
  sales: (p) => `Stop Overpaying For ${p.key}`,
  "behind-the-scenes": (p) => `How We Check Every ${p.key} Order Before It Leaves Us`,
  tips: (p) => `5 Quick Tips Before You Spend Money On ${p.key}`,
  motivation: (p) => `Your Business Deserves Better Than Guesswork`,
  "product-showcase": (p) => `Up Close With ${p.hero}`,
  "customer-testimonial": (p) => `“I Should Have Come Here First” — A Real ${p.key} Story`,
  "trending-style": (p) => `POV: You Finally Found A Real ${p.key} Plug`,
};

export const HOOK_TEMPLATES: Record<ContentTypeId, (p: NicheProfile) => string> = {
  educational: (p) => `Most people lose money on ${p.subject} because nobody checks ${p.detail}.`,
  promotional: (p) => `If you have been waiting for the right moment on ${p.subject}, this is it.`,
  storytelling: (p) => `He walked in convinced he had been scammed twice already.`,
  sales: (p) => `You are not paying for ${p.subject}. You are paying for peace of mind.`,
  "behind-the-scenes": (p) => `Before anything reaches you, it passes a checklist most sellers skip.`,
  tips: (p) => `Before you pay anybody for ${p.subject}, read this once.`,
  motivation: () => `Nobody built a serious brand posting once a month.`,
  "product-showcase": (p) => `Look at ${p.hero} properly — the details are the whole story.`,
  "customer-testimonial": () => `“I wish somebody told me this before I paid the first guy.”`,
  "trending-style": (p) => `Nigerians, we need to talk about how you buy ${p.subject}.`,
};

export const TONE_OPENERS: Record<ToneId, string> = {
  professional: "Here is the straight version.",
  "street-nigerian": "Oya gather here, make I yarn you small.",
  luxury: "Quietly, this is what quality looks like.",
  funny: "Let's be honest with ourselves for two minutes.",
  emotional: "This one is personal.",
  corporate: "A short note for business owners.",
  "gen-z": "ok real talk for a sec.",
};

export const TONE_CLOSERS: Record<ToneId, string> = {
  professional: "We are happy to walk you through the options.",
  "street-nigerian": "No wahala — we go sort you out well well.",
  luxury: "When you are ready, we are here.",
  funny: "Save yourself the drama. Come to people who care.",
  emotional: "You deserve to buy once and rest.",
  corporate: "Our team is available for a consultation.",
  "gen-z": "don't overthink it, just slide in.",
};

export const SHARED_TAGS = [
  "#LagosBusiness",
  "#BenoverTech",
  "#NaijaTech",
  "#Lagos",
  "#MadeInNigeria",
  "#SmallBizNigeria",
  "#ContentThatSells",
];

export const PLATFORM_TAGS: Record<string, string[]> = {
  facebook: ["#FacebookMarketplace", "#LagosDeals"],
  instagram: ["#InstagramNigeria", "#ExplorePage"],
  tiktok: ["#TikTokNigeria", "#FYPNigeria"],
};
