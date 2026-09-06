import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { AnimatedButton } from "./AnimatedButton";
import { copyText } from "@/utils/clipboard";

interface CopyButtonProps {
  label: string;
  value: string;
  variant?: "primary" | "outline" | "subtle" | "ghost";
  className?: string;
}

export function CopyButton({ label, value, variant = "subtle", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyText(value);
    if (ok) {
      setCopied(true);
      toast.success(`${label.replace("Copy ", "")} copied`, {
        description: "Paste it wherever you post.",
      });
      setTimeout(() => setCopied(false), 1800);
    } else {
      toast.error("Couldn't copy automatically", {
        description: "Select the text and copy it manually.",
      });
    }
  }

  return (
    <AnimatedButton variant={variant} size="sm" className={className} onClick={handleCopy}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </AnimatedButton>
  );
}
