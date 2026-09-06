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
} as const;

const PLATFORM_FILLER_TAGS: Record<GenerationInput["platform"], string[]> = {
  facebook: ["#FacebookMarketplace", "#CommunityBusiness", "#CustomerService", "#LocalBusiness"],
  instagram: ["#ExplorePage", "#VisualMarketing", "#SmallBusiness", "#Reels"],
  tiktok: ["#TikTokMadeMeBuyIt", "#LearnOnTikTok", "#ForYou", "#ShortFormVideo"],
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
    audience: limitInput(input.audience, INPUT_LIMITS.audience),
    cta: limitInput(input.cta, INPUT_LIMITS.cta),
  };
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
  push(business.toLowerCase() === "benover tech" ? "#BenoverTech" : toHashtag(business) ?? "");
  PLATFORM_FILLER_TAGS[input.platform]?.forEach(push);
  profile.tags
    .filter(
      (tag) =>
        isNigeriaContext || !/(nigeria|lagos|naija|nigerian|lekki|abuja|ukused)/i.test(tag),
    )
    .forEach(push);
  if (profile.key === "Phones" && isNigeriaContext) push("#iPhoneNigeria");
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
  const location = `📍 ${business} · ${niche}`;
  const bodySeparator = tone === "luxury" ? "\n\n" : "\n";

  if (input.platform === "tiktok") {
    const shortBody = body.slice(0, 3).map((line) => line.replace(/^\d+\.\s*/, ""));
    return [
      hook,
      "",
      ...shortBody,
      "",
      `${cta}`,
      location,
    ].join("\n");
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
        .replace(/quality, price honesty and after-sales support/gi, "quiet quality and thoughtful support")
        .replace(/\.$/, ".");
    case "funny":
      return index === 0 ? `${text.replace(/\.$/, "")} (yes, really).` : text;
    case "emotional":
      return text
        .replace(/Most disappointments are not bad luck\./, "The disappointment stays with you long after the purchase.")
        .replace(/Buy once\. Rest\. That is the whole offer\./, "Buy once. Rest. You deserve that peace of mind.");
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
  switch (t) {
    case "educational":
      return [
        `Before you spend money on ${profile.subject}, check ${profile.detail}.`,
        `Most disappointments are not bad luck. They are skipped checks.`,
        `At ${business}, ${profile.proof}.`,
      ];
    case "promotional":
      return [
        `${profile.hero} is available right now, priced for ${audience}.`,
        `No inflated "discount" games — just a fair number and honest condition.`,
        `${profile.proof}.`,
      ];
    case "storytelling":
      return [
        `He had already been burned twice. Third time, he came to us with his guard up.`,
        `We showed him ${profile.detail} before he paid anything.`,
        `He left with ${profile.hero} — and sent two of his friends the same week.`,
      ];
    case "sales":
      return [
        `${profile.objection}`,
        `That is exactly why ${profile.proof}.`,
        `Buy once. Rest. That is the whole offer.`,
      ];
    case "behind-the-scenes":
      return [
        `Here is what happens before your order leaves us.`,
        `We check ${profile.detail}, photograph it, then package it.`,
        `Boring? Maybe. But it is why our customers come back.`,
      ];
    case "tips":
      return [
        `1. Confirm ${profile.detail} in person.`,
        `2. Ask for the full history, not the highlight.`,
        `3. Compare two options before you commit.`,
        `4. Never pay before you inspect.`,
        `5. Buy from people who let you check everything.`,
      ];
    case "motivation":
      return [
        `Your competition is not better. They are just more consistent.`,
        `One post a day compounds faster than one perfect post a month.`,
        `${business} exists so ${audience} stop guessing.`,
      ];
    case "product-showcase":
      return [
        `${profile.hero}. Look at the finish, not just the price tag.`,
        `We verify ${profile.detail} before it is listed.`,
        `${profile.proof}.`,
      ];
    case "customer-testimonial":
      return [
        `"I should have come here first."`,
        `That is what she said after we walked her through ${profile.detail}.`,
        `${profile.proof} — every single time.`,
      ];
    case "trending-style":
    default:
      return [
        `POV: you finally found people who explain ${profile.detail} before collecting money.`,
        `No stories. No excuses. No "network problem".`,
        `${profile.proof}.`,
      ];
  }
}

function buildImagePrompt(
  profile: NicheProfile,
  input: GenerationInput,
  business: string,
  audience: string,
): string {
  return [
    `Premium editorial product photograph: ${profile.imageSubject}.`,
    `Brand context: ${business}. Target audience: ${audience}.`,
    `Clean graphite background with a cool blue key light and a restrained teal accent, premium but approachable retail styling.`,
    `Shot on 85mm lens, f/2.0, shallow depth of field, crisp micro-detail on edges and texture, gentle reflection under the subject.`,
    `Composition: subject slightly off-centre with generous negative space at the top for a headline overlay.`,
    `Mood: modern, trustworthy gadget retail with premium product detail.`,
    `Colour grade: clean neutrals, blue highlights, soft teal accents, no clipping.`,
    `Aspect ratio ${input.platform === "tiktok" ? "9:16 vertical" : input.platform === "instagram" ? "4:5 portrait" : "1:1 square"}. No text, no watermark, no logos.`,
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
    `BRAND CONTEXT: ${business}. TARGET AUDIENCE: ${audience}.`,
    ``,
    `OPENING HOOK (0–3s): ${hook}`,
    ``,
    `SCENE 1 (0–5s): Extreme close-up of ${profile.imageSubject} on a reflective black surface. Camera: slow dolly-in with a slight parallax drift. Text overlay: "${hook.slice(0, 60)}"`,
    ``,
    `SCENE 2 (5–13s): Hands inspecting the subject in warm studio light; cutaways to ${profile.detail}. Camera: handheld orbit at 30 degrees, then a smooth rack focus. Text overlay: "We check what others hide."`,
    ``,
    `SCENE 3 (13–20s): The customer smiling as they receive the finished item; shop interior slightly out of focus behind. Camera: gentle push-in, ending on a static hero frame. Text overlay: "${profile.proof}."`,
    ``,
    `ENDING CTA (20–25s): Clean brand frame with the Benover Tech mark and a restrained blue-teal accent. Text overlay: "${cta}"`,
    ``,
    `AUDIO DIRECTION: minimal deep-bass bed, one subtle riser into Scene 3, no voiceover required.`,
  ].join("\n");
}

/** Deterministic, fully local generation. No network calls. */
export function generateContent(input: GenerationInput): GeneratedContent {
  input = normalizeInput(input);
  const niche = resolveNiche(input);
  const profile = profileFor(niche);
  const business = input.business?.trim() || "BENOVERTECH";
  const audience = input.audience?.trim() || `${niche.toLowerCase()} buyers`;
  const cta = input.cta?.trim() || DEFAULT_CTA;

  const isPhoneSeed =
    profile.key === "iPhone" && (input.contentType === "educational" || input.contentType === "tips");

  const title = isPhoneSeed
    ? "3 Smart Checks Before Buying an iPhone"
    : TITLE_TEMPLATES[input.contentType](profile);

  const hook = isPhoneSeed
    ? "Before you choose an iPhone, check the details that affect how it will perform every day."
    : HOOK_TEMPLATES[input.contentType](profile);

  const body = isPhoneSeed
    ? [
        "Check 1: Battery health. Open Settings and review the number yourself so you understand the device's likely daily performance.",
        "Check 2: iCloud status. Confirm the phone is ready for its next owner before you commit.",
        "Check 3: The display and cameras. Test touch response, brightness, focus and image quality across the device.",
        `At ${business}, we test battery health, storage, iCloud status and panel originality in front of you, so ${audience} can buy with confidence.`,
      ]
    : bodyFor(input, profile, business, audience);

  const opener = TONE_OPENERS[input.tone];
  const closer = TONE_CLOSERS[input.tone];
  const styledBody = body.map((line, index) => applyToneToText(line, input.tone, index));
  const styledHook = applyToneToHook(hook, input.tone);

  const caption = formatCaption(
    input,
    styledBody,
    opener,
    styledHook,
    closer,
    cta,
    business,
    niche,
    input.tone,
  );

  return {
    id: `${input.platform}-${input.contentType}-${niche}-${input.tone}`.toLowerCase(),
    title,
    hook,
    caption,
    hashtags: buildHashtags(input, profile),
    cta,
    imagePrompt: buildImagePrompt(profile, input, business, audience),
    videoPrompt: buildVideoPrompt(profile, input, styledHook, cta, business, audience),
    platform: input.platform,
    contentType: input.contentType,
    tone: input.tone,
    niche,
    createdAt: new Date().toISOString(),
  };
}
