import { motion } from "framer-motion";
import { Hash, Image as ImageIcon, Info, Video } from "lucide-react";
import { CopyButton } from "./CopyButton";
import { DownloadButton } from "./DownloadButton";
import { PromptCard } from "./PromptCard";
import { PLATFORMS } from "@/services/constants";
import { resultToText } from "@/utils/export";
import { fadeUp, stagger } from "@/utils/motion";
import type { GeneratedContent } from "@/types";

interface ResultCardProps {
  result: GeneratedContent;
}

export function ResultCard({ result }: ResultCardProps) {
  const platform = PLATFORMS.find((p) => p.id === result.platform);
  const charCount = result.caption.length;
  const max = platform?.maxChars ?? 2200;
  const fileText = resultToText(result);

  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      animate="show"
      className="mt-8 space-y-4"
      id="preview"
    >
      <motion.div variants={fadeUp} className="panel overflow-hidden">
        <div className="border-b border-border bg-surface/40 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary">
              {platform?.name}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1">{result.niche}</span>
            <span className="rounded-full border border-border px-2.5 py-1">
              {result.contentType.replace(/-/g, " ")}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1">
              {result.tone.replace(/-/g, " ")}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">{result.title}</h3>
          <p className="mt-2 text-sm italic text-primary/90">{result.hook}</p>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Benover Tech caption</h4>
            <span
              className={
                charCount > max
                  ? "text-xs font-medium text-destructive"
                  : "text-xs text-muted-foreground"
              }
            >
              {charCount.toLocaleString()} / {max.toLocaleString()} characters
            </span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {result.caption}
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <Hash className="h-4 w-4 text-primary" />
                Hashtags
              </h4>
              <span className="text-xs text-muted-foreground">
                {result.hashtags.length} tags
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {result.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-primary/80">Call to action</p>
            <p className="mt-1 text-sm font-medium">{result.cta}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border bg-surface/30 px-5 py-4">
          <CopyButton label="Copy Caption" value={result.caption} variant="primary" />
          <CopyButton label="Copy Hashtags" value={result.hashtags.join(" ")} />
          <CopyButton label="Copy Image Prompt" value={result.imagePrompt} />
          <CopyButton label="Copy Video Prompt" value={result.videoPrompt} />
          <DownloadButton filename="benover-content.txt" contents={fileText} />
        </div>
      </motion.div>

      <PromptCard
        title="Image Prompt"
        description="Paste into any image model to create the visual."
        content={result.imagePrompt}
        copyLabel="Copy Image Prompt"
        icon={<ImageIcon className="h-4 w-4 text-primary" />}
      />

      <PromptCard
        title="AI Video Prompt"
        description="Hook, three scenes, overlays, camera moves and an ending CTA."
        content={result.videoPrompt}
        copyLabel="Copy Video Prompt"
        icon={<Video className="h-4 w-4 text-primary" />}
        compatibility={["Veo", "Kling", "Hailuo", "Sora", "Runway", "InVideo AI"]}
      />

      <motion.div
        variants={fadeUp}
        className="flex items-start gap-3 rounded-2xl border border-border bg-surface/40 px-4 py-3.5"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Publishing stays manual.</span> Copy,
          create media elsewhere, then post manually.
        </p>
      </motion.div>
    </motion.div>
  );
}
