import { RotateCcw, Save } from "lucide-react";
import { AnimatedButton } from "./AnimatedButton";
import {
  DEFAULT_BRAND_PROFILE,
  resetBrandProfile,
  saveBrandProfile,
} from "@/services/brand-profile";
import type { BrandProfile } from "@/types";

interface BrandProfileFormProps {
  profile: BrandProfile;
  onChange: (profile: BrandProfile) => void;
}

const fields: Array<[keyof BrandProfile, string, string]> = [
  ["business", "Business name", "Benover Tech"],
  ["location", "Location or service area", "e.g. Lagos, Nigeria"],
  ["whatsapp", "WhatsApp or contact", "e.g. +234 800 000 0000"],
  ["currency", "Currency", "NGN"],
  ["delivery", "Delivery or pickup", "e.g. Pickup and delivery available"],
  ["warranty", "Warranty or returns", "Only add your actual policy"],
  ["paymentOptions", "Payment options", "e.g. Transfer or card"],
  ["audience", "Default audience", "People upgrading their everyday tech"],
  ["cta", "Default call to action", "Message Benover Tech for current availability."],
  ["trustStatements", "Verified trust statements", "Facts you are comfortable publishing"],
];

export function BrandProfileForm({ profile, onChange }: BrandProfileFormProps) {
  function update(key: keyof BrandProfile, value: string) {
    onChange({ ...profile, [key]: value });
  }

  function save() {
    saveBrandProfile(profile);
  }

  function reset() {
    onChange(resetBrandProfile());
  }

  const summary = [
    profile.business,
    profile.location,
    profile.currency,
    profile.whatsapp && "WhatsApp configured",
  ].filter(Boolean).join(" · ");

  return (
    <details className="panel group p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold">Benover Tech profile</span>
          <span className="mt-1 block text-xs text-muted-foreground">
            {summary || "Save your contact, service and trust details once for every post."}
          </span>
        </span>
        <span className="text-xs text-primary group-open:hidden">Edit profile</span>
      </summary>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map(([key, label, placeholder]) => (
          <label key={key} className="text-xs text-muted-foreground">
            {label}
            <input
              value={profile[key]}
              onChange={(event) => update(key, event.target.value)}
              placeholder={placeholder}
              className="mt-1.5 h-10 w-full rounded-xl border border-border bg-surface/60 px-3 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </label>
        ))}
        <label className="text-xs text-muted-foreground">
          Default tone
          <select
            value={profile.tone}
            onChange={(event) => update("tone", event.target.value as BrandProfile["tone"])}
            className="mt-1.5 h-10 w-full rounded-xl border border-border bg-surface/60 px-3 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          >
            <option value="professional">Professional</option>
            <option value="street-nigerian">Street Nigerian</option>
            <option value="luxury">Luxury</option>
            <option value="funny">Funny</option>
            <option value="emotional">Emotional</option>
            <option value="corporate">Corporate</option>
            <option value="gen-z">Gen Z</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <AnimatedButton size="sm" onClick={save}>
          <Save className="h-4 w-4" />
          Save profile
        </AnimatedButton>
        <AnimatedButton size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </AnimatedButton>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        These values stay in this browser. Only image generation uses an external online service.
      </p>
    </details>
  );
}
