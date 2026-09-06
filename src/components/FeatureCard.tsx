import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/utils/motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  comingSoon?: boolean;
  step?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  comingSoon,
  step,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      aria-disabled={comingSoon}
      className={cn(
        "panel relative flex flex-col gap-3 p-5",
        comingSoon ? "opacity-60" : "card-lift",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border border-border",
            comingSoon ? "bg-surface text-muted-foreground" : "bg-primary/10 text-primary",
          )}
        >
          {icon}
        </span>
        {step && (
          <span className="text-xs font-medium tracking-widest text-muted-foreground">
            {step}
          </span>
        )}
        {comingSoon && (
          <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
