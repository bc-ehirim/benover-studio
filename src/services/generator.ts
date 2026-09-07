import type { GeneratedContent, GenerationInput, ToneId } from "@/types";
import { DEFAULT_CTA, INPUT_LIMITS } from "./constants";
import { resolveNiche } from "./prompt-engine";
import {
  HOOK_TEMPLATES,
  TITLE_TEMPLATES,
  TONE_CLOSERS,
  TONE_OPENERS,
  profileFor,
  type NicheProfile,
} from "./templates";

const PLATFORM_NAME = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
} as const;

const PLATFORM_FILLER_TAGS: Record<GenerationInput["platform"], string[]> = {
  facebook: ["#FacebookMarketplace", "#CommunityBusiness", "#CustomerService", "#LocalBusiness"],
  instagram: ["#ExplorePage", "#VisualMarketing", "#SmallBusiness", "#Reels"],
  tiktok: ["#TikTokMadeMeBuyIt", "#LearnOnTikTok", "#ForYou", "#ShortFormVideo"],
  whatsapp: ["#WhatsAppBusiness", "#DirectSales", "#GadgetDeals", "#TechSupport"],
};

function toHashtag(value: string): string | null {
  const words = value.match(/[A-Za-z0-9]+/g) ?? [];
  if (words.length === 0) return null;
  return `#${words.map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase()).join("")}`;
}

function limitInput(value: string | undefined, maxLength: number): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

function normalizeInput(input: GenerationInput): GenerationInput {
  return {
    ...input,
    customNiche: limitInput(input.customNiche, INPUT_LIMITS.customNiche),
    business: limitInput(input.business, INPUT_LIMITS.business),
    whatsapp: limitInput(input.whatsapp, INPUT_LIMITS.productField),
    audience: limitInput(input.audience, INPUT_LIMITS.audience),
    cta: limitInput(input.cta, INPUT_LIMITS.cta),
    model: limitInput(input.model, INPUT_LIMITS.productField),
    storage: limitInput(input.storage, INPUT_LIMITS.productField),
    ram: limitInput(input.ram, INPUT_LIMITS.productField),
    condition: limitInput(input.condition, INPUT_LIMITS.productField),
    batteryHealth: limitInput(input.batteryHealth, INPUT_LIMITS.productField),
    color: limitInput(input.color, INPUT_LIMITS.productField),
    price: limitInput(input.price, INPUT_LIMITS.productField),
    availability: limitInput(input.availability, INPUT_LIMITS.productField),
    location: limitInput(input.location, INPUT_LIMITS.productField),
    delivery: limitInput(input.delivery, INPUT_LIMITS.productField),
    warranty: limitInput(input.warranty, INPUT_LIMITS.productField),
    paymentOptions: limitInput(input.paymentOptions, INPUT_LIMITS.productField),
    trustStatements: limitInput(input.trustStatements, INPUT_LIMITS.cta),
  };
}

function productDetails(input: GenerationInput): string {
  const details = [
    input.model && `model: ${input.model}`,
    input.storage && `storage: ${input.storage}`,
    input.ram && `RAM: ${input.ram}`,
    input.condition && `condition: ${input.condition}`,
    input.batteryHealth && `battery health: ${input.batteryHealth}`,
    input.color && `colour: ${input.color}`,
    input.price && `price: ${input.price}`,
    input.availability && `availability: ${input.availability}`,
  ].filter(Boolean);
  return details.length ? details.join(", ") : "specific product details supplied by the seller";
}

function buildHashtags(input: GenerationInput, profile: NicheProfile): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (tag: string) => {
    const clean = tag.trim();
    const key = clean.toLowerCase();
    if (!clean || seen.has(key) || out.length >= 15) return;
    seen.add(key);
    out.push(clean);
  };

  const business = input.business?.trim() || "Benover Tech";
  const audience = input.audience?.trim() || "";
  const context = `${business} ${audience}`;
  const isNigeriaContext = /lagos|nigeria|naija|nigerian/i.test(context);
  const locationTags = [
    ["lagos", "#Lagos"],
    ["nigeria", "#Nigeria"],
    ["london", "#London"],
    ["new york", "#NewYork"],
    ["toronto", "#Toronto"],
    ["dubai", "#Dubai"],
  ] as const;

  push(toHashtag(profile.key) ?? "");
  push(business.toLowerCase() === "benover tech" ? "#BenoverTech" : (toHashtag(business) ?? ""));
  PLATFORM_FILLER_TAGS[input.platform]?.forEach(push);
  profile.tags
    .filter(
      (tag) => isNigeriaContext || !/(nigeria|lagos|naija|nigerian|lekki|abuja|ukused)/i.test(tag),
    )
    .forEach(push);
  if (profile.key === "iPhone" && isNigeriaContext) push("#iPhoneNigeria");
  locationTags.forEach(([name, tag]) => {
    if (new RegExp(name, "i").test(context)) push(tag);
  });

  const filler = [
    "#ContentCreator",
    "#TrustedSeller",
    "#GrowYourBusiness",
    "#DailyContent",
    "#SocialMediaTips",
    "#SmallBusiness",
    "#OnlineBusiness",
  ];
  if (isNigeriaContext) {
    filler.splice(1, 0, "#NigerianBusiness", "#BuyNigerian");
    filler.push("#SocialMediaNigeria");
  }
  let i = 0;
  while (out.length < 15 && i < filler.length) push(filler[i++]!);

  return out.slice(0, 15);
}

function formatCaption(
  input: GenerationInput,
  body: string[],
  opener: string,
  hook: string,
  closer: string,
  cta: string,
  business: string,
  niche: string,
  tone: ToneId,
): string {
  const location = [
    `📍 ${business}`,
    input.location,
    niche,
  ].filter(Boolean).join(" · ");
  const bodySeparator = tone === "luxury" ? "\n\n" : "\n";

  if (input.platform === "whatsapp") {
    return [hook, "", ...body.slice(0, 3), "", cta, location].join("\n");
  }

  if (input.platform === "tiktok") {
    const shortBody = body.slice(0, 3).map((line) => line.replace(/^\d+\.\s*/, ""));
    return [hook, "", ...shortBody, "", `${cta}`, location].join("\n");
  }

  if (input.platform === "instagram") {
    return [
      `${opener} ${hook}`,
      "",
      body.join(bodySeparator === "\n" ? "\n\n" : bodySeparator),
      "",
      `${closer}`,
      `\n${cta}`,
      "",
      location,
    ].join("\n");
  }

  return [
    `${opener} ${hook}`,
    "",
    body.join(bodySeparator),
    "",
    closer,
    cta,
    "",
    `${location} · ${PLATFORM_NAME[input.platform]}`,
  ].join("\n");
}

function applyToneToText(text: string, tone: ToneId, index: number): string {
  switch (tone) {
    case "street-nigerian":
      return text
        .replace(/Before you spend a naira on/i, "Before you drop money on")
        .replace(/Most disappointments are not bad luck\./, "No be bad luck every time.")
        .replace(/That is exactly why /, "Na why ")
        .replace(/\.$/, " o.");
    case "luxury":
      return text
        .replace(/clean, /gi, "considered, ")
        .replace(/fair number and honest condition/gi, "transparent value and assured condition")
        .replace(
          /quality, price honesty and after-sales support/gi,
          "quiet quality and thoughtful support",
        )
        .replace(/\.$/, ".");
    case "funny":
      return index === 0 ? `${text.replace(/\.$/, "")} (yes, really).` : text;
    case "emotional":
      return text
        .replace(
          /Most disappointments are not bad luck\./,
          "The disappointment stays with you long after the purchase.",
        )
        .replace(
          /Buy once\. Rest\. That is the whole offer\./,
          "Buy once. Rest. You deserve that peace of mind.",
        );
    case "corporate":
      return index === 0 ? `Recommendation: ${text}` : text;
    case "gen-z":
      return text
        .toLowerCase()
        .replace(/[.!?]+$/, "")
        .replace(/^before /, "real talk: before ")
        .concat(".");
    case "professional":
    default:
      return text;
  }
}

function applyToneToHook(hook: string, tone: ToneId): string {
  switch (tone) {
    case "street-nigerian":
      return `${hook.replace(/\.$/, "")} — no shortcuts.`;
    case "luxury":
      return hook.replace(/^Most people/, "Many buyers");
    case "funny":
      return `${hook.replace(/\.$/, "")} (we wish it were that simple).`;
    case "emotional":
      return `${hook.replace(/\.$/, "")} — and that regret is avoidable.`;
    case "corporate":
      return `A practical point: ${hook.toLowerCase()}`;
    case "gen-z":
      return `${hook.toLowerCase().replace(/[.!?]+$/, "")} fr.`;
    case "professional":
    default:
      return hook;
  }
}

function bodyFor(
  input: GenerationInput,
  profile: NicheProfile,
  business: string,
  audience: string,
): string[] {
  const t = input.contentType;
  if (input.campaign === "new-stock") {
    return [
      `${profile.hero} is ready for a new owner.`,
      `Product facts to review: ${productDetails(input)}.`,
      input.availability ? `Availability: ${input.availability}.` : "Ask about current availability before publishing.",
    ];
  }
  if (input.campaign === "price-drop") {
    return [
      `${profile.hero} has a price update for buyers comparing their next upgrade.`,
      input.price ? `Updated price: ${input.price}. Confirm it is current before publishing.` : "Add the updated price before publishing this post.",
      "Keep the previous price and offer terms only when they have been verified.",
    ];
  }
  if (input.campaign === "trade-in") {
    return [
      `Thinking about upgrading your ${profile.subject}? Ask ${business} about trade-in options.`,
      `Share the current device model and condition so the next steps can be explained clearly.`,
      input.trustStatements || "Trade-in terms must be confirmed before publishing.",
    ];
  }
  if (input.campaign === "whatsapp-sales") {
    return [
      `${profile.hero}, with the key details ready for a direct buyer conversation.`,
      `Send the model, condition and budget to ${business} for the next step.`,
      input.availability ? `Availability: ${input.availability}.` : "Ask about current availability.",
    ];
  }
  if (input.campaign === "used-device-check") {
    return [
      `Before choosing this used ${profile.key}, review the supplied condition and product facts.`,
      `Check ${profile.detail} yourself before payment.`,
      input.trustStatements || "Add only inspection details that have been confirmed.",
    ];
  }
  switch (t) {
    case "educational":
      return [
        `Before you spend money on ${profile.subject}, check ${profile.detail}.`,
        `Most disappointments are not bad luck. They are skipped checks.`,
        input.trustStatements || `At ${business}, review the supplied details before you commit.`,
      ];
    case "promotional":
      return [
        `${profile.hero}, with the supplied product details ready for review.`,
        input.price
          ? `Price information: ${input.price}. Confirm the current price before publishing.`
          : "Add the current price before publishing this offer.",
        input.availability
          ? `Availability: ${input.availability}. Confirm it is still current before publishing.`
          : "Ask Benover Tech about current availability.",
      ];
    case "comparison":
      return [
        `Compare ${profile.detail} before you decide.`,
        `The right choice depends on your routine, priorities and budget.`,
        input.trustStatements || "Review the supplied specifications before publishing.",
      ];
    case "tips":
      return [
        `1. Confirm ${profile.detail} in person.`,
        `2. Ask for the full history, not the highlight.`,
        `3. Compare two options before you commit.`,
        `4. Never pay before you inspect.`,
        `5. Buy from people who let you check everything.`,
      ];
    case "product-showcase":
      return [
        `${profile.hero}. Look at the finish, not just the price tag.`,
        `Review ${profile.detail} against the supplied product details before publishing.`,
        input.trustStatements || "Add verified product details before posting.",
      ];
    case "customer-proof":
      return [
        `A good buying decision starts with clear information.`,
        input.trustStatements || "Add a verified customer experience before publishing this post.",
        `${business} helps ${audience} compare the supplied details before they commit.`,
      ];
    default:
      return [
        `${profile.hero}.`,
        input.trustStatements || "Review the supplied specifications before publishing.",
        `${business} helps ${audience} choose with more confidence.`,
      ];
  }
}

function buildImagePrompt(
  profile: NicheProfile,
  input: GenerationInput,
  business: string,
  audience: string,
): string {
  const ratio =
    input.platform === "tiktok"
      ? "9:16 vertical"
      : input.platform === "instagram"
        ? "4:5 portrait"
        : "1:1 square";
  return [
    `SUBJECT: one ${profile.key} product, specifically ${profile.imageSubject}.`,
    `PRODUCT FACTS: ${productDetails(input)}. Preserve the product category and physical form exactly.`,
    `SCENE: realistic social-media lifestyle photo showing the single product being used in a clean ${audience} setting.`,
    `COMPOSITION: product is the unmistakable hero, close enough to inspect, with natural context and clear negative space for optional overlay.`,
    `CAMERA: premium commercial photography, 50mm lens, natural perspective, crisp product detail, realistic materials, balanced exposure.`,
    `STYLE: polished Benover Tech retail photography, clean graphite surfaces, cool blue key light, restrained teal accents, trustworthy and modern.`,
    `FORMAT: ${ratio}. No rendered words or logos.`,
    `AVOID: extra phones or gadgets, hands covering the product, distorted screens, duplicated objects, fake brand marks, unreadable text, watermark, collage, illustration, cartoon, low resolution.`,
  ].join(" ");
}

function buildVideoPrompt(
  profile: NicheProfile,
  input: GenerationInput,
  hook: string,
  cta: string,
  business: string,
  audience: string,
): string {
  const ratio = input.platform === "facebook" ? "1:1 or 4:5" : "9:16 vertical";
  return [
    `AI VIDEO PROMPT — works in Veo, Kling, Hailuo, Sora, Runway and InVideo AI`,
    ``,
    `FORMAT: ${ratio}, 15–25 seconds, polished premium gadget retail aesthetic with clean graphite, blue and teal accents.`,
    `BRAND CONTEXT: ${business}. TARGET AUDIENCE: ${audience}. PRODUCT DETAILS: ${productDetails(input)}. CONTACT: ${input.whatsapp || "use the configured Benover Tech contact"}.`,
    ``,
    `OPENING HOOK (0–3s): ${hook}`,
    ``,
    `SCENE 1 (0–5s): Extreme close-up of ${profile.imageSubject} on a reflective black surface. Camera: slow dolly-in with a slight parallax drift. Text overlay: "${hook.slice(0, 60)}"`,
    ``,
    `SCENE 2 (5–13s): Hands inspecting the subject in clean studio light; cutaways to ${profile.detail}. Camera: handheld orbit at 30 degrees, then a smooth rack focus. Text overlay: "Compare the details that matter."`,
    ``,
    `SCENE 3 (13–20s): The product in a clean retail setting with the supplied details shown clearly. Camera: gentle push-in, ending on a static hero frame. Text overlay: "Review the details before you choose."`,
    ``,
    `ENDING CTA (20–25s): Clean brand frame with the Benover Tech mark and a restrained blue-teal accent. Text overlay: "${cta}"`,
    ``,
    `AUDIO DIRECTION: minimal deep-bass bed, one subtle riser into Scene 3, no voiceover required.`,
  ].join("\n");
}

/** Deterministic local copy generation. Optional media generation uses a separate online service. */
export function generateContent(input: GenerationInput): GeneratedContent {
  input = normalizeInput(input);
  const niche = resolveNiche(input);
  const profile = profileFor(niche);
  const business = input.business?.trim() || "Benover Tech";
  const audience = input.audience?.trim() || `${niche.toLowerCase()} buyers`;
  const cta = input.cta?.trim() || DEFAULT_CTA;
  const profileDetails = [
    input.location && `Location: ${input.location}.`,
    input.delivery && `Delivery or pickup: ${input.delivery}.`,
    input.warranty && `Warranty or returns: ${input.warranty}.`,
    input.paymentOptions && `Payment options: ${input.paymentOptions}.`,
  ].filter(Boolean) as string[];
  const profileCta = input.whatsapp?.trim()
    ? `${cta} WhatsApp: ${input.whatsapp.trim()}.`
    : cta;

  const isPhoneSeed =
    profile.key === "iPhone" &&
    (input.contentType === "educational" || input.contentType === "tips");

  const baseTitle = isPhoneSeed
    ? "3 Smart Checks Before Buying an iPhone"
    : TITLE_TEMPLATES[input.contentType](profile);

  const baseHook = isPhoneSeed
    ? "Before you choose an iPhone, check the details that affect how it will perform every day."
    : HOOK_TEMPLATES[input.contentType](profile);
  const variation = input.variation ?? 0;
  const title = variation > 0 ? `${baseTitle} · Variation ${variation}` : baseTitle;
  const hook = variation > 0 ? `A different angle: ${baseHook}` : baseHook;

  const body = isPhoneSeed
    ? [
        "Check 1: Battery health. Open Settings and review the number yourself so you understand the device's likely daily performance.",
        "Check 2: iCloud status. Confirm the phone is ready for its next owner before you commit.",
        "Check 3: The display and cameras. Test touch response, brightness, focus and image quality across the device.",
        input.trustStatements ||
          `At ${business}, review the supplied product details clearly before ${audience} commits.`,
      ]
    : bodyFor(input, profile, business, audience);
  if (profileDetails.length) body.push(...profileDetails);

  const details = productDetails(input);
  const detailedBody = body.map((line, index) =>
    index === body.length - 1 ? `${line} Product details: ${details}.` : line,
  );

  const opener = TONE_OPENERS[input.tone];
  const closer = TONE_CLOSERS[input.tone];
  const styledBody = detailedBody.map((line, index) => applyToneToText(line, input.tone, index));
  const styledHook = applyToneToHook(hook, input.tone);

  const caption = formatCaption(
    input,
    styledBody,
    opener,
    styledHook,
    closer,
    profileCta,
    business,
    niche,
    input.tone,
  );

  return {
    id: `${input.platform}-${input.contentType}-${input.campaign ?? "standard"}-${niche}-${input.tone}-v${variation}-${Date.now()}`.toLowerCase(),
    title,
    hook,
    caption,
    hashtags: buildHashtags(input, profile),
    cta: profileCta,
    imagePrompt: buildImagePrompt(profile, input, business, audience),
    videoPrompt: buildVideoPrompt(profile, input, styledHook, profileCta, business, audience),
    platform: input.platform,
    contentType: input.contentType,
    tone: input.tone,
    niche,
    campaign: input.campaign,
    createdAt: new Date().toISOString(),
  };
}
