import { motion } from "framer-motion";
import { Check, Facebook, Instagram, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Platform, PlatformId } from "@/types";

const icons: Record<PlatformId, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
};

interface PlatformCardProps {
  platform: Platform;
  selected: boolean;
  onSelect: (id: PlatformId) => void;
}

export function PlatformCard({ platform, selected, onSelect }: PlatformCardProps) {
  const Icon = icons[platform.id];
  return (
    <motion.label
      whileTap={{ scale: 0.98 }}
      className={cn(
        "card-lift relative flex min-h-[92px] w-full cursor-pointer flex-col items-start gap-1 rounded-2xl border p-4 text-left focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        selected
          ? "border-primary/60 bg-primary/10 glow-ring"
          : "border-border bg-surface/60 hover:bg-surface",
      )}
    >
      <input
        type="radio"
        name="platform"
        value={platform.id}
        checked={selected}
        onChange={() => onSelect(platform.id)}
        className="sr-only"
      />
      <div className="flex w-full items-center justify-between">
        <Icon className={cn("h-5 w-5", selected ? "text-primary" : "text-muted-foreground")} />
        {selected && <Check className="h-4 w-4 text-primary" />}
      </div>
      <span className="text-sm font-semibold">{platform.name}</span>
      <span className="text-xs leading-snug text-muted-foreground">{platform.blurb}</span>
    </motion.label>
  );
}
