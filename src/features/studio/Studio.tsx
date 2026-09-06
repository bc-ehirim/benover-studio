import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ContentTypeCard } from "@/components/ContentTypeCard";
import { PlatformCard } from "@/components/PlatformCard";
import { ResultCard } from "@/components/ResultCard";
import { ResultSkeleton } from "@/components/ResultSkeleton";
import { ToneSelector } from "@/components/ToneSelector";
import { CalendarStrip } from "./CalendarStrip";
import {
  CONTENT_TYPES,
  NICHES,
  PLATFORMS,
  PRESET_PACK,
  dayPlan,
  type CalendarDay,
} from "@/services/constants";
import { generateContent } from "@/services/generator";
import { fadeUp, stagger, viewportOnce } from "@/utils/motion";
import type {
  ContentTypeId,
  GeneratedContent,
  GenerationInput,
  PlatformId,
  ToneId,
} from "@/types";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputClass =
  "h-12 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

export function Studio() {
  const [todayIndex, setTodayIndex] = useState(1);
  const [platform, setPlatform] = useState<PlatformId>("instagram");
  const [contentType, setContentType] = useState<ContentTypeId>("educational");
  const [niche, setNiche] = useState("Phones");
  const [customNiche, setCustomNiche] = useState("");
  const [tone, setTone] = useState<ToneId>("professional");
  const [business, setBusiness] = useState("");
  const [audience, setAudience] = useState("");
  const [cta, setCta] = useState("");
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
    [platform, contentType, niche, customNiche, tone, business, audience, cta],
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
              Build today&apos;s post in four taps
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Pick a platform, a content type, your niche and a tone. Everything is generated on
              your device.
            </p>
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="niche">
                  Niche
                </label>
                <select
                  id="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className={`${inputClass} mt-3 appearance-none`}
                >
                  <optgroup label="BENOVERTECH preset pack">
                    {NICHES.filter((n) => n.preset).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="More niches">
                    {NICHES.filter((n) => !n.preset).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  Preset pack: {PRESET_PACK.join(" · ")}
                </p>
              </div>

              <div>
                <label className={labelClass} htmlFor="customNiche">
                  Custom niche (optional)
                </label>
                <input
                  id="customNiche"
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  placeholder="e.g. Solar installation"
                  className={`${inputClass} mt-3`}
                />
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Used when “Custom niche…” is selected.
                </p>
              </div>
            </div>

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
                  placeholder="BENOVERTECH"
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
                  placeholder="Lagos small business owners"
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
                  placeholder="Send us a WhatsApp message today."
                  className={`${inputClass} mt-2.5`}
                />
              </div>
            </div>

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
