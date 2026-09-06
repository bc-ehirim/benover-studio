import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TONES } from "@/services/constants";
import type { ToneId } from "@/types";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Tone" className="flex flex-wrap gap-2">
      {TONES.map((tone) => {
        const selected = tone.id === value;
        return (
          <motion.button
            key={tone.id}
            type="button"
            role="radio"
            aria-checked={selected}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(tone.id)}
            className={cn(
              "h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              selected
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-surface/50 text-muted-foreground hover:text-foreground",
            )}
          >
            {tone.name}
          </motion.button>
        );
      })}
    </div>
  );
}
