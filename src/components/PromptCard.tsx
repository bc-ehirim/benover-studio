import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CopyButton } from "./CopyButton";
import { fadeUp } from "@/utils/motion";

interface PromptCardProps {
  title: string;
  description?: string;
  content: string;
  copyLabel: string;
  icon?: ReactNode;
  compatibility?: string[];
}

export function PromptCard({
  title,
  description,
  content,
  copyLabel,
  icon,
  compatibility,
}: PromptCardProps) {
  return (
    <motion.div variants={fadeUp} className="panel card-lift p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="flex items-center gap-2 text-base font-semibold">
            {icon}
            {title}
          </h4>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <CopyButton label={copyLabel} value={content} />
      </div>

      {compatibility && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {compatibility.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-background/60 p-4 font-sans text-sm leading-relaxed text-muted-foreground">
        {content}
      </pre>
    </motion.div>
  );
}
