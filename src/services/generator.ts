import type { GeneratedContent, GenerationInput } from "@/types";
import { DEFAULT_CTA } from "./constants";
import { resolveNiche } from "./prompt-engine";
import {
  HOOK_TEMPLATES,
  PLATFORM_TAGS,
  SHARED_TAGS,
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

  ["#LagosBusiness", "#BenoverTech"].forEach(push);
  if (profile.key === "Phones") push("#iPhoneNigeria");
  profile.tags.forEach(push);
  (PLATFORM_TAGS[input.platform] ?? []).forEach(push);
  SHARED_TAGS.forEach(push);

  const filler = [
    "#ContentCreator",
    "#NigerianBusiness",
    "#BuyNigerian",
    "#CustomerService",
    "#TrustedSeller",
    "#GrowYourBusiness",
    "#DailyContent",
    "#SocialMediaNigeria",
  ];
  let i = 0;
  while (out.length < 15 && i < filler.length) push(filler[i++]!);

  return out.slice(0, 15);
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
        `Before you spend a naira on ${profile.subject}, check ${profile.detail}.`,
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

function buildImagePrompt(profile: NicheProfile, input: GenerationInput): string {
  return [
    `Premium editorial product photograph: ${profile.imageSubject}.`,
    `Deep matte black background with a reflective luxury surface, soft golden-orange rim light (#F59E0B) from the left and a subtle purple accent glow (#6D28D9) from the right.`,
    `Shot on 85mm lens, f/2.0, shallow depth of field, crisp micro-detail on edges and texture, gentle reflection under the subject.`,
    `Composition: subject slightly off-centre with generous negative space at the top for a headline overlay.`,
    `Mood: minimal luxury, high-end tech advertising, Apple-style restraint.`,
    `Colour grade: rich blacks, warm gold highlights, no clipping.`,
    `Aspect ratio ${input.platform === "tiktok" ? "9:16 vertical" : input.platform === "instagram" ? "4:5 portrait" : "1:1 square"}. No text, no watermark, no logos.`,
  ].join(" ");
}

function buildVideoPrompt(
  profile: NicheProfile,
  input: GenerationInput,
  hook: string,
  cta: string,
): string {
  const ratio = input.platform === "facebook" ? "1:1 or 4:5" : "9:16 vertical";
  return [
    `AI VIDEO PROMPT — works in Veo, Kling, Hailuo, Sora, Runway and InVideo AI`,
    ``,
    `FORMAT: ${ratio}, 15–25 seconds, cinematic, dark premium aesthetic with golden-orange and purple accent light.`,
    ``,
    `OPENING HOOK (0–3s): ${hook}`,
    ``,
    `SCENE 1 (0–5s): Extreme close-up of ${profile.imageSubject} on a reflective black surface. Camera: slow dolly-in with a slight parallax drift. Text overlay: "${hook.slice(0, 60)}"`,
    ``,
    `SCENE 2 (5–13s): Hands inspecting the subject in warm studio light; cutaways to ${profile.detail}. Camera: handheld orbit at 30 degrees, then a smooth rack focus. Text overlay: "We check what others hide."`,
    ``,
    `SCENE 3 (13–20s): The customer smiling as they receive the finished item; shop interior slightly out of focus behind. Camera: gentle push-in, ending on a static hero frame. Text overlay: "${profile.proof}."`,
    ``,
    `ENDING CTA (20–25s): Black frame, brand mark centred, golden glow rising from below. Text overlay: "${cta}"`,
    ``,
    `AUDIO DIRECTION: minimal deep-bass bed, one subtle riser into Scene 3, no voiceover required.`,
  ].join("\n");
}

/** Deterministic, fully local generation. No network calls. */
export function generateContent(input: GenerationInput): GeneratedContent {
  const niche = resolveNiche(input);
  const profile = profileFor(niche);
  const business = input.business?.trim() || "BENOVERTECH";
  const audience = input.audience?.trim() || `${niche.toLowerCase()} buyers in Lagos`;
  const cta = input.cta?.trim() || DEFAULT_CTA;

  const isPhoneSeed =
    profile.key === "Phones" && (input.contentType === "educational" || input.contentType === "tips");

  const title = isPhoneSeed
    ? "3 Mistakes People Make Before Buying a Used iPhone"
    : TITLE_TEMPLATES[input.contentType](profile);

  const hook = isPhoneSeed
    ? "Most people lose money on a used iPhone in the first five minutes — before they even check the battery."
    : HOOK_TEMPLATES[input.contentType](profile);

  const body = isPhoneSeed
    ? [
        "Mistake 1: Trusting the seller's word on battery health. Open Settings and look at the number yourself. Anything under 85% is a hidden cost.",
        "Mistake 2: Not checking iCloud lock status. A locked iPhone is an expensive paperweight, no matter how clean the body looks.",
        "Mistake 3: Ignoring the panel. A replaced screen is fine — a bad replacement is not. Check the touch response at the edges and the true black.",
        "At BENOVERTECH, we test battery health, storage, iCloud status and panel originality in front of you before money changes hands.",
      ]
    : bodyFor(input, profile, business, audience);

  const opener = TONE_OPENERS[input.tone];
  const closer = TONE_CLOSERS[input.tone];

  const caption = [
    `${opener} ${hook}`,
    "",
    body.join("\n"),
    "",
    `${closer}`,
    `${cta}`,
    "",
    `📍 ${business} — ${PLATFORM_NAME[input.platform]} · ${niche}`,
  ].join("\n");

  return {
    id: `${input.platform}-${input.contentType}-${niche}-${input.tone}`.toLowerCase(),
    title,
    hook,
    caption,
    hashtags: buildHashtags(input, profile),
    cta,
    imagePrompt: buildImagePrompt(profile, input),
    videoPrompt: buildVideoPrompt(profile, input, hook, cta),
    platform: input.platform,
    contentType: input.contentType,
    tone: input.tone,
    niche,
    createdAt: new Date().toISOString(),
  };
}
