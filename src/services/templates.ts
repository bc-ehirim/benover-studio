import type { ContentTypeId, ToneId } from "@/types";

/** Deterministic Benover Tech content templates keyed by gadget category. */

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
  iPhone: {
    key: "iPhone",
    subject: "iPhones",
    hero: "a clean, capable iPhone",
    detail: "battery health, storage, iCloud status, cameras and display response",
    proof: "we help you check the important details before you commit",
    objection: "How do I know the iPhone is in the condition described?",
    imageSubject: "a modern iPhone in a clean graphite finish on a premium desk setup",
    tags: ["#iPhone", "#iPhoneDeals", "#ApplePhone", "#Smartphone", "#BatteryHealth"],
  },
  "Samsung Phones": {
    key: "Samsung Phones",
    subject: "Samsung phones",
    hero: "a sharp, responsive Samsung phone",
    detail: "display condition, battery health, cameras, storage and network compatibility",
    proof: "we help you compare the important specifications before you commit",
    objection: "Which Samsung model gives me the right value?",
    imageSubject: "a premium Samsung Galaxy phone with a bright display on a clean studio surface",
    tags: ["#Samsung", "#SamsungGalaxy", "#AndroidPhone", "#Smartphone", "#TechDeals"],
  },
  Laptops: {
    key: "Laptops",
    subject: "laptops for work, study and everyday performance",
    hero: "a dependable laptop matched to your workload",
    detail: "processor, RAM, SSD storage, battery condition, keyboard and display",
    proof: "we help you match the specifications to the work you actually do",
    objection: "Will this laptop handle my work without slowing me down?",
    imageSubject: "a slim laptop open beside a notebook and phone in a bright premium workspace",
    tags: ["#Laptop", "#LaptopDeals", "#WorkFromHome", "#StudentTech", "#Computer"],
  },
  Accessories: {
    key: "Accessories",
    subject: "phone and laptop accessories",
    hero: "accessories that fit your everyday setup",
    detail: "compatibility, build quality, charging speed and practical use",
    proof: "we focus on useful accessories that make your devices easier to use",
    objection: "Will this accessory work properly with my device?",
    imageSubject: "a refined selection of device accessories arranged on a clean premium desk",
    tags: ["#PhoneAccessories", "#TechAccessories", "#GadgetSetup", "#Charging", "#DeviceEssentials"],
  },
  Tablets: {
    key: "Tablets",
    subject: "tablets for work, learning and entertainment",
    hero: "a tablet that fits the way you work and relax",
    detail: "screen size, battery life, storage, performance and accessory compatibility",
    proof: "we help you choose a tablet around how you plan to use it",
    objection: "Is a tablet the right upgrade for me?",
    imageSubject: "a modern tablet displaying a clean productivity workspace",
    tags: ["#Tablet", "#TabletDeals", "#Productivity", "#MobileWork", "#TechSetup"],
  },
  Smartwatches: {
    key: "Smartwatches",
    subject: "smartwatches and wearable tech",
    hero: "a smartwatch that keeps pace with your day",
    detail: "battery life, compatibility, health features, display and strap comfort",
    proof: "we help you check compatibility before you choose a wearable",
    objection: "Will this smartwatch work with my phone?",
    imageSubject: "a premium smartwatch with a crisp display beside a smartphone",
    tags: ["#Smartwatch", "#WearableTech", "#FitnessTech", "#TechLifestyle", "#GadgetLife"],
  },
  "Earbuds & Audio": {
    key: "Earbuds & Audio",
    subject: "earbuds and personal audio",
    hero: "clear, comfortable audio for your everyday listening",
    detail: "fit, battery life, microphone quality, noise control and device compatibility",
    proof: "we help you compare the features that matter for your listening routine",
    objection: "Will these earbuds stay comfortable and connected?",
    imageSubject: "premium wireless earbuds in a charging case on a clean reflective surface",
    tags: ["#Earbuds", "#WirelessAudio", "#Headphones", "#AudioGear", "#MusicTech"],
  },
  "Chargers & Power Banks": {
    key: "Chargers & Power Banks",
    subject: "chargers and power banks",
    hero: "reliable power for your devices",
    detail: "wattage, port type, capacity, cable compatibility and safety features",
    proof: "we help you choose power accessories that match your devices",
    objection: "Will this charger or power bank suit my device?",
    imageSubject: "a compact fast charger and power bank arranged beside a modern smartphone",
    tags: ["#PowerBank", "#FastCharging", "#PhoneCharger", "#TechAccessories", "#MobilePower"],
  },
  Monitors: {
    key: "Monitors",
    subject: "monitors for work, gaming and creative setups",
    hero: "a monitor that gives your setup more room to perform",
    detail: "screen size, resolution, refresh rate, ports and desk compatibility",
    proof: "we help you compare the display specifications before you choose",
    objection: "Which monitor fits my desk and workload?",
    imageSubject: "a slim monitor displaying a crisp creative workspace on a clean desk",
    tags: ["#Monitor", "#DeskSetup", "#GamingSetup", "#Workstation", "#DisplayTech"],
  },
};

export const DEFAULT_PROFILE: NicheProfile = {
  key: "Gadgets",
  subject: "gadgets",
  hero: "a gadget that fits your setup",
  detail: "specifications, compatibility, condition and everyday usability",
  proof: "we help you compare the details before you commit",
  objection: "How do I choose the right gadget?",
  imageSubject: "a modern gadget arranged in a clean premium technology setup",
  tags: ["#Gadgets", "#Tech", "#SmartDevices", "#TechSetup", "#DeviceShopping"],
};

export function profileFor(niche: string): NicheProfile {
  return NICHE_PROFILES[niche] ?? { ...DEFAULT_PROFILE, key: niche || DEFAULT_PROFILE.key };
}

export const TITLE_TEMPLATES: Record<ContentTypeId, (p: NicheProfile) => string> = {
  educational: (p) => `What To Check Before Choosing ${p.key}`,
  promotional: (p) => `${p.key} For Your Next Upgrade`,
  comparison: (p) => `${p.key}: Which Option Fits You Best?`,
  tips: (p) => `5 Smart Checks Before Buying ${p.key}`,
  "product-showcase": (p) => `A Closer Look At ${p.hero}`,
  "customer-proof": (p) => `Why Buyers Choose The Right ${p.key}`,
};

export const HOOK_TEMPLATES: Record<ContentTypeId, (p: NicheProfile) => string> = {
  educational: (p) => `The right ${p.subject} starts with checking ${p.detail}.`,
  promotional: (p) => `Looking for ${p.subject}? Start with the details that affect your everyday use.`,
  comparison: (p) => `The best ${p.subject} depends on the details that match your everyday use.`,
  tips: (p) => `Before you buy ${p.subject}, save these checks.`,
  "product-showcase": (p) => `Look closer at ${p.hero}; the useful details are in the specification.`,
  "customer-proof": () => "The best upgrade is the one that makes everyday use feel easier.",
};

export const TONE_OPENERS: Record<ToneId, string> = {
  professional: "Here is the practical version.",
  "street-nigerian": "Oya, make we check am properly.",
  luxury: "Quietly, the right details make all the difference.",
  funny: "Let us save you from an expensive guess.",
  emotional: "A good upgrade should feel reassuring.",
  corporate: "A practical note for your next technology purchase.",
  "gen-z": "ok, quick setup check.",
};

export const TONE_CLOSERS: Record<ToneId, string> = {
  professional: "Compare the details, then choose what fits your needs.",
  "street-nigerian": "No rush; make sure the gadget fit your need well.",
  luxury: "Choose with intention, and let the details speak.",
  funny: "Your wallet will appreciate the research.",
  emotional: "The right choice should leave you feeling confident.",
  corporate: "Review the specifications and select the appropriate option.",
  "gen-z": "check the specs, then make the move.",
};
