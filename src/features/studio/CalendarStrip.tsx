import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { WEEK_CALENDAR, type CalendarDay } from "@/services/constants";

interface CalendarStripProps {
  todayIndex: number;
  activeType: string;
  onPick: (day: CalendarDay) => void;
}

export function CalendarStrip({ todayIndex, activeType, onPick }: CalendarStripProps) {
  return (
    <div className="panel p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <CalendarDays className="h-4 w-4 text-primary" />
        Weekly gadget content plan
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        A simple weekly rhythm for showcasing and explaining your products.
      </p>

      <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
        {WEEK_CALENDAR.map((day) => {
          const isToday = day.index === todayIndex;
          const isActive = day.contentType === activeType;
          return (
            <motion.button
              key={day.index}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onPick(day)}
              className={cn(
                "min-w-[112px] shrink-0 rounded-xl border p-3 text-left transition-colors",
                isToday
                  ? "border-primary/60 bg-primary/10"
                  : isActive
                    ? "border-accent-glow/60 bg-accent/15"
                    : "border-border bg-surface/50 hover:bg-surface",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {day.short}
                </span>
                {isToday && <span className="text-[10px] text-primary">Today</span>}
              </div>
              <span className="mt-1.5 block text-sm font-medium leading-tight">
                {day.typeLabel}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
