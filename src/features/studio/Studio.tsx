import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { PlatformCard } from "@/components/PlatformCard";
import { ResultCard } from "@/components/ResultCard";
import { ResultSkeleton } from "@/components/ResultSkeleton";
import { ToneSelector } from "@/components/ToneSelector";
import { BrandProfileForm } from "@/components/BrandProfileForm";
import { CalendarStrip } from "./CalendarStrip";
import {
  CONTENT_TYPES,
  CAMPAIGN_PRESETS,
  INPUT_LIMITS,
  NICHES,
  PLATFORMS,
  PRESET_PACK,
  dayPlan,
  type CalendarDay,
} from "@/services/constants";
import { generateContent } from "@/services/generator";
import { loadBrandProfile, saveBrandProfile } from "@/services/brand-profile";
import { fadeUp, stagger, viewportOnce } from "@/utils/motion";
import type {
  ContentTypeId,
  GeneratedContent,
  GenerationInput,
  PlatformId,
  ToneId,
  BrandProfile,
} from "@/types";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

export function Studio() {
  const [todayIndex, setTodayIndex] = useState(1);
  const [brandProfile, setBrandProfile] = useState<BrandProfile>(loadBrandProfile);
  const [platform, setPlatform] = useState<PlatformId>("instagram");
  const [contentType, setContentType] = useState<ContentTypeId>("educational");
  const [niche, setNiche] = useState("iPhone");
  const [customNiche, setCustomNiche] = useState("");
  const [tone, setTone] = useState<ToneId>(brandProfile.tone);
  const [business, setBusiness] = useState(brandProfile.business);
  const [audience, setAudience] = useState(brandProfile.audience);
  const [cta, setCta] = useState(brandProfile.cta);
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [condition, setCondition] = useState("");
  const [batteryHealth, setBatteryHealth] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTodayIndex(new Date().getDay());
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const today = useMemo(() => dayPlan(todayIndex), [todayIndex]);

  function handleBrandProfileChange(profile: BrandProfile) {
    setBrandProfile(profile);
    setBusiness(profile.business);
    setAudience(profile.audience);
    setTone(profile.tone);
    setCta(profile.cta);
    saveBrandProfile(profile);
  }

  const run = useCallback(
    (overrides?: Partial<GenerationInput>) => {
      const input: GenerationInput = {
        platform,
        contentType,
        niche,
        customNiche,
        tone,
        business,
        audience,
        cta,
        model,
        storage,
        ram,
        condition,
        batteryHealth,
        color,
        price,
        availability,
        location: brandProfile.location,
        delivery: brandProfile.delivery,
        warranty: brandProfile.warranty,
        paymentOptions: brandProfile.paymentOptions,
        trustStatements: brandProfile.trustStatements,
        ...overrides,
      };
      setLoading(true);
      setResult(null);
      const delay = 800 + Math.floor(Math.random() * 700);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setResult(generateContent(input));
        setLoading(false);
      }, delay);
    },
    [
      platform,
      contentType,
      niche,
      customNiche,
      tone,
      business,
      audience,
      cta,
      model,
      storage,
      ram,
      condition,
      batteryHealth,
      color,
      price,
      availability,
    ],
  );

  function handleGenerateToday() {
    setContentType(today.contentType);
    run({ contentType: today.contentType });
  }

  function handlePickDay(day: CalendarDay) {
    setContentType(day.contentType);
  }

  return (
    <section id="studio" className="relative px-5 pb-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="space-y-5"
        >
          <motion.div variants={fadeUp} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground">
              <Wand2 className="h-3.5 w-3.5 text-primary" />
              The Studio
            </span>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Build Benover Tech&apos;s next product post
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Turn a gadget category, campaign type and tone into ready-to-publish social content.
              Everything is generated on your device.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <BrandProfileForm profile={brandProfile} onChange={handleBrandProfileChange} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <CalendarStrip
              todayIndex={todayIndex}
              activeType={contentType}
              onPick={handlePickDay}
            />
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Today is <span className="text-foreground">{today.label}</span> —{" "}
                <span className="text-primary">{today.typeLabel}</span> day.
              </p>
              <AnimatedButton variant="subtle" size="sm" onClick={handleGenerateToday}>
                <Sparkles className="h-4 w-4" />
                Generate Today&apos;s Content
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="panel space-y-7 p-5 sm:p-6">
            <div>
              <p className={labelClass}>Platform</p>
              <div role="radiogroup" aria-label="Platform" className="mt-3 grid grid-cols-3 gap-2.5">
                {PLATFORMS.map((p) => (
                  <PlatformCard
                    key={p.id}
                    platform={p}
                    selected={p.id === platform}
                    onSelect={setPlatform}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Content type</p>
              <div
                role="radiogroup"
                aria-label="Content type"
                className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
              >
                {CONTENT_TYPES.map((c) => (
                  <ContentTypeCard
                    key={c.id}
                    option={c}
                    selected={c.id === contentType}
                    recommended={c.id === today.contentType}
                    onSelect={setContentType}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Start with a campaign</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CAMPAIGN_PRESETS.map((preset, index) => (
                  <button
                    key={`${preset.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setContentType(preset.contentType);
                      if (preset.name === "WhatsApp sales") setPlatform("whatsapp");
                    }}
                    className="rounded-xl border border-border bg-surface/50 p-3 text-left transition-colors hover:border-primary/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="block text-xs font-semibold">{preset.name}</span>
                    <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">{preset.blurb}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="niche">
                  Product category
                </label>
                <select
                  id="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className={`${inputClass} mt-3 appearance-none`}
                >
                  <optgroup label="Benover Tech gadgets">
                    {NICHES.filter((n) => n.preset).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="More gadget categories">
                    {NICHES.filter((n) => !n.preset).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Categories: {PRESET_PACK.join(" · ")}
                </p>
              </div>

              <div>
                <label className={labelClass} htmlFor="customNiche">
                  Custom gadget category (optional)
                </label>
                <input
                  id="customNiche"
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  maxLength={INPUT_LIMITS.customNiche}
                  placeholder={
                    niche === "custom" ? "e.g. Gaming console" : "Select Custom gadget… first"
                  }
                  disabled={niche !== "custom"}
                  className={`${inputClass} mt-3 disabled:cursor-not-allowed disabled:opacity-50`}
                />
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Used when “Custom gadget…” is selected.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["model", "Model", model, setModel, "e.g. Galaxy S24"],
                ["condition", "Condition", condition, setCondition, "New, used or UK-used"],
                ["price", "Price", price, setPrice, "e.g. Ask for current price"],
              ].map(([id, label, value, setter, placeholder]) => (
                <div key={id as string}>
                  <label className={labelClass} htmlFor={id as string}>{label as string}</label>
                  <input
                    id={id as string}
                    value={value as string}
                    onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                    maxLength={INPUT_LIMITS.productField}
                    placeholder={placeholder as string}
                    className={`${inputClass} mt-2.5`}
                  />
                </div>
              ))}
            </div>

            <details open={advancedOpen} onToggle={(event) => setAdvancedOpen(event.currentTarget.open)}>
              <summary className="cursor-pointer text-sm font-semibold text-primary">Advanced details</summary>
              <div className="mt-4 space-y-5">
                <div>
                  <p className={labelClass}>Tone</p>
                  <div className="mt-3">
                    <ToneSelector value={tone} onChange={setTone} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="business">
                  Business
                </label>
                <input
                  id="business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  maxLength={INPUT_LIMITS.business}
                  placeholder="Benover Tech"
                  className={`${inputClass} mt-2.5`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="audience">
                  Target audience
                </label>
                <input
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  maxLength={INPUT_LIMITS.audience}
                  placeholder="People upgrading their everyday tech"
                  className={`${inputClass} mt-2.5`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cta">
                  Call to action
                </label>
                <input
                  id="cta"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  maxLength={INPUT_LIMITS.cta}
                  placeholder="Message Benover Tech for current availability."
                  className={`${inputClass} mt-2.5`}
                />
              </div>
                </div>
              </div>
            </details>

            <details className="rounded-xl border border-border/70 p-4">
              <summary className="cursor-pointer text-sm font-semibold">Additional product facts</summary>
              <div className="mt-4">
              <p className={labelClass}>Product details (optional)</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["storage", "Storage", storage, setStorage, "e.g. 256GB"],
                  ["ram", "RAM", ram, setRam, "e.g. 16GB"],
                  ["batteryHealth", "Battery health", batteryHealth, setBatteryHealth, "e.g. 92%"],
                  ["color", "Colour", color, setColor, "e.g. Graphite"],
                  ["availability", "Availability", availability, setAvailability, "In stock or pre-order"],
                ].map(([id, label, value, setter, placeholder]) => (
                  <div key={id as string}>
                    <label className="text-xs text-muted-foreground" htmlFor={id as string}>
                      {label as string}
                    </label>
                    <input
                      id={id as string}
                      value={value as string}
                      onChange={(event) => (setter as (value: string) => void)(event.target.value)}
                      maxLength={INPUT_LIMITS.productField}
                      placeholder={placeholder as string}
                      className={`${inputClass} mt-1.5 h-10`}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Add only facts you are ready to publish. Generated copy remains a draft for review.
              </p>
              </div>
            </details>

            <AnimatedButton
              size="lg"
              className="hidden w-full sm:inline-flex"
              disabled={loading}
              onClick={() => run()}
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Generating…" : "Generate Content"}
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultSkeleton />
            </motion.div>
          )}
          {!loading && result && <ResultCard key={result.id + result.createdAt} result={result} />}
        </AnimatePresence>

        {!loading && !result && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Your generated post will appear here.
          </p>
        )}
      </div>

      {/* Sticky mobile generate button */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden">
        <AnimatedButton size="lg" className="w-full" disabled={loading} onClick={() => run()}>
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating…" : "Generate Content"}
        </AnimatedButton>
      </div>
    </section>
  );
}
