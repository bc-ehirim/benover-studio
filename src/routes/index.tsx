import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Studio } from "@/features/studio/Studio";
import { Workflow } from "@/features/sections/Workflow";
import { ComingSoon } from "@/features/sections/ComingSoon";
import { Footer } from "@/features/sections/Footer";

const title = "BENOVER Content Studio — Never run out of content again";
const description =
  "Generate Facebook, Instagram and TikTok captions, 15 hashtags, image prompts and AI video prompts in seconds. Fully offline, no accounts.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Nav />
      <Hero />
      <Studio />
      <Workflow />
      <ComingSoon />
      <Footer />
    </motion.main>
  );
}
