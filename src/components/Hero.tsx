import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedButton } from "./AnimatedButton";
import { fadeUp, stagger } from "@/utils/motion";
import { scrollToId } from "@/utils/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45, y: [0, -18, 0] }}
          transition={{
            opacity: { duration: 1.6 },
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute right-[-80px] top-24 h-[360px] w-[360px] rounded-full bg-accent/40 blur-[130px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Offline content studio · No accounts, no keys
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Never run out of <span className="text-gradient">content</span> again.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Generate Facebook, Instagram and TikTok content in seconds.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row"
        >
          <AnimatedButton size="lg" onClick={() => scrollToId("studio")}>
            Generate Content
            <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg" onClick={() => scrollToId("features")}>
            Explore Features
          </AnimatedButton>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 text-xs text-muted-foreground">
          Captions · 15 hashtags · Image prompt · AI video prompt
        </motion.p>
      </motion.div>
    </section>
  );
}
