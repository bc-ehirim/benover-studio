import { forwardRef, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "text-primary-foreground bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)] hover:brightness-110",
  outline:
    "border border-border bg-surface/50 text-foreground hover:border-primary/50 hover:bg-surface",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-surface/70",
  subtle: "bg-surface-raised text-foreground border border-border hover:border-primary/40",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  function AnimatedButton(
    { className, variant = "primary", size = "md", children, onClick, ...props },
    ref,
  ) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const counter = useRef(0);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = counter.current++;
        setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setRipples((r) => r.filter((item) => item.id !== id)), 600);
        onClick?.(e);
      },
      [onClick],
    );

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onClick={handleClick}
        className={cn(
          "relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-45",
          variants[variant],
          sizes[size],
          className,
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.35, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ left: r.x - 40, top: r.y - 40 }}
            className="pointer-events-none absolute h-20 w-20 rounded-full bg-current"
          />
        ))}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
