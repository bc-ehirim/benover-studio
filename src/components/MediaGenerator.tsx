import { useEffect, useState } from "react";
import { Download, Image as ImageIcon, Loader2, Video } from "lucide-react";
import { toast } from "sonner";
import type { GeneratedContent } from "@/types";
import { createImageGenerationUrl, preloadImage } from "@/services/media";
import { assembleVideo } from "@/utils/video";
import { AnimatedButton } from "./AnimatedButton";

interface MediaGeneratorProps {
  result: GeneratedContent;
}

export function MediaGenerator({ result }: MediaGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(null);
    setVideoUrl(null);
    setError(null);
  }, [result.id]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  async function ensureImage(): Promise<string> {
    if (imageUrl) return imageUrl;
    const url = createImageGenerationUrl(result.imagePrompt, result.platform);
    await preloadImage(url);
    setImageUrl(url);
    return url;
  }

  async function handleGenerateImage() {
    setImageLoading(true);
    setError(null);
    try {
      await ensureImage();
      toast.success("Image ready", { description: "Generated with the free image service." });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Image generation failed.";
      setError(message);
      toast.error("Could not generate image", { description: message });
    } finally {
      setImageLoading(false);
    }
  }

  async function handleGenerateVideo() {
    setVideoLoading(true);
    setError(null);
    try {
      const url = await ensureImage();
      const blob = await assembleVideo({
        imageUrl: url,
        title: result.title,
        hook: result.hook,
        cta: result.cta,
        vertical: result.platform === "tiktok",
      });
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      setVideoUrl(URL.createObjectURL(blob));
      toast.success("Video ready", { description: "Assembled locally in your browser." });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Video generation failed.";
      setError(message);
      toast.error("Could not create video", { description: message });
    } finally {
      setVideoLoading(false);
    }
  }

  return (
    <section className="panel space-y-4 p-5" aria-label="Media generator">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Create media</p>
        <h4 className="mt-1 text-base font-semibold">Bring this Benover Tech post to life</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Images use a free online generator. Videos are assembled locally from the image, title,
          hook and CTA.
        </p>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Generated ${result.niche} visual for Benover Tech`}
          className="max-h-[30rem] w-full rounded-xl border border-border object-contain bg-background sm:max-h-[32rem]"
        />
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          playsInline
          className="max-h-[30rem] w-full rounded-xl border border-border bg-black sm:max-h-[32rem]"
        />
      )}

      {error && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <AnimatedButton size="sm" onClick={handleGenerateImage} disabled={imageLoading || videoLoading}>
          {imageLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
          {imageLoading ? "Generating image..." : imageUrl ? "Regenerate image" : "Generate free image"}
        </AnimatedButton>
        <AnimatedButton
          size="sm"
          variant="outline"
          onClick={handleGenerateVideo}
          disabled={imageLoading || videoLoading}
        >
          {videoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
          {videoLoading ? "Assembling video..." : "Create free video"}
        </AnimatedButton>
        {imageUrl && (
          <a
            href={imageUrl}
            download="benover-tech-gadget-image.jpg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface/50 px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-4 w-4" />
            Download image
          </a>
        )}
        {videoUrl && (
          <a
            href={videoUrl}
            download="benover-tech-gadget-video.webm"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface/50 px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-4 w-4" />
            Download video
          </a>
        )}
      </div>
    </section>
  );
}
