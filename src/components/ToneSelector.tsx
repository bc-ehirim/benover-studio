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
          <motion.label
            key={tone.id}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
              selected
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-surface/50 text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name="tone"
              value={tone.id}
              checked={selected}
              onChange={() => onChange(tone.id)}
              className="sr-only"
            />
            {tone.name}
          </motion.label>
        );
      })}
    </div>
  );
}
