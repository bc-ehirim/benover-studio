import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";
import { scrollToId } from "@/utils/motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => scrollToId("top")}
          className="flex items-center gap-2.5"
          aria-label="Benover Tech home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-sm font-bold text-primary-foreground">
            B
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Benover <span className="text-muted-foreground">Tech</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <button onClick={() => scrollToId("studio")} className="hover:text-foreground">
            Generator
          </button>
          <button onClick={() => scrollToId("workflow")} className="hover:text-foreground">
            Workflow
          </button>
          <button onClick={() => scrollToId("features")} className="hover:text-foreground">
            About
          </button>
        </nav>

        <AnimatedButton size="sm" className="hidden sm:inline-flex" onClick={() => scrollToId("studio")}>
          Create Post
        </AnimatedButton>
      </div>
    </motion.header>
  );
}
