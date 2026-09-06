import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ContentTypeId, ContentTypeOption } from "@/types";

interface ContentTypeCardProps {
  option: ContentTypeOption;
  selected: boolean;
  recommended?: boolean;
  onSelect: (id: ContentTypeId) => void;
}

export function ContentTypeCard({
  option,
  selected,
  recommended,
  onSelect,
}: ContentTypeCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.id)}
      className={cn(
        "card-lift relative flex min-h-[84px] w-full flex-col justify-center gap-1 rounded-2xl border p-3.5 text-left",
        selected
          ? "border-accent-glow/70 bg-accent/20"
          : "border-border bg-surface/50 hover:bg-surface",
      )}
    >
      {recommended && (
        <span className="absolute right-2 top-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
          Today
        </span>
      )}
      <span className="text-sm font-semibold leading-tight">{option.name}</span>
      <span className="text-xs leading-snug text-muted-foreground">{option.blurb}</span>
    </motion.button>
  );
}
