import { motion } from "framer-motion";
import { Download, Send, Wand2 } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { fadeUp, stagger, viewportOnce } from "@/utils/motion";

const steps = [
  {
    step: "01",
    title: "Generate",
    description:
      "Pick platform, type, niche and tone. You get a title, hook, caption, 15 hashtags and both media prompts in seconds.",
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    step: "02",
    title: "Download",
    description:
      "Copy any block, or download benover-content.txt with the whole result so nothing is lost between devices.",
    icon: <Download className="h-5 w-5" />,
  },
  {
    step: "03",
    title: "Publish manually",
    description:
      "Create the image or video wherever you like, then post it yourself. Nothing is scheduled or sent for you.",
    icon: <Send className="h-5 w-5" />,
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="px-5 py-20 sm:px-8">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-4xl"
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Built for your daily workflow</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Three steps, every day. Generate, download, publish manually.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <FeatureCard key={s.step} {...s} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
