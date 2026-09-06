import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Studio } from "@/features/studio/Studio";
import { Workflow } from "@/features/sections/Workflow";
import { ComingSoon } from "@/features/sections/ComingSoon";
import { Footer } from "@/features/sections/Footer";

export const Route = createFileRoute("/")({
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
