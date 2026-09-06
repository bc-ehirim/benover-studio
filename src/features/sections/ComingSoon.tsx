import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarClock,
  CalendarRange,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  Video,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { fadeUp, stagger, viewportOnce } from "@/utils/motion";

const features = [
  {
    title: "AI Image Generation",
    description: "Turn the image prompt into a finished visual without leaving the studio.",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "AI Video Generation",
    description: "Render the scene-by-scene video prompt into a short-form clip.",
    icon: <Video className="h-5 w-5" />,
  },
  {
    title: "Content Calendar",
    description: "Plan a full month and keep every generated post in one place.",
    icon: <CalendarRange className="h-5 w-5" />,
  },
  {
    title: "Brand Voice Memory",
    description: "Teach the studio how your brand sounds and keep it consistent.",
    icon: <Mic className="h-5 w-5" />,
  },
  {
    title: "WhatsApp CTA Builder",
    description: "Generate click-to-chat links with pre-filled buyer messages.",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: "Facebook Auto Scheduler",
    description: "Queue posts ahead of time instead of publishing them by hand.",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    title: "Analytics Dashboard",
    description: "See which content types and tones actually bring customers.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

export function ComingSoon() {
  return (
    <section id="features" className="px-5 pb-24 sm:px-8">
      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">On the roadmap</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            These are previews of what the studio will grow into. None of them are active yet.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} comingSoon />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
