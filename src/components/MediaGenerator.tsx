import { useEffect, useRef, useState } from "react";
import { Download, Image as ImageIcon, Loader2, Video } from "lucide-react";
import { toast } from "sonner";
import type { GeneratedContent } from "@/types";
import { createImageGenerationUrl, fetchGeneratedImage, type GeneratedImageAsset } from "@/services/media";
import { assembleVideo } from "@/utils/video";
import { AnimatedButton } from "./AnimatedButton";

interface MediaGeneratorProps {
  result: GeneratedContent;
}

export function MediaGenerator({ result }: MediaGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageExtension, setImageExtension] = useState<GeneratedImageAsset["extension"]>("jpg");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageElapsed, setImageElapsed] = useState(0);
  const imageAbort = useRef<AbortController | null>(null);
  const imageUrlRef = useRef<string | null>(null);
  const videoUrlRef = useRef<string | null>(null);

  useEffect(() => {
    imageAbort.current?.abort();
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    setImageUrl(null);
    setImageExtension("jpg");
    setVideoUrl(null);
    setError(null);
    imageUrlRef.current = null;
    videoUrlRef.current = null;
  }, [result.id]);

  useEffect(() => {
    return () => {
      imageAbort.current?.abort();
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (!imageLoading) {
      setImageElapsed(0);
      return;
    }
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setImageElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [imageLoading]);

  async function ensureImage(force = false): Promise<string> {
    if (imageUrl && !force) return imageUrl;
    const url = createImageGenerationUrl(result.imagePrompt, result.platform);
    imageAbort.current?.abort();
    imageAbort.current = new AbortController();
    const asset = await fetchGeneratedImage(url, imageAbort.current.signal);
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    imageUrlRef.current = asset.url;
    setImageExtension(asset.extension);
    setImageUrl(asset.url);
    return asset.url;
  }

  async function handleGenerateImage() {
    setImageLoading(true);
    setError(null);
    try {
      await ensureImage(true);
      toast.success("Image ready", { description: "Generated with the free image service." });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Image generation failed.";
      setError(message);
      toast.error("Could not generate image", { description: message });
    } finally {
      imageAbort.current = null;
      setImageLoading(false);
    }
  }

  function handleCancelImage() {
    imageAbort.current?.abort();
    setImageLoading(false);
    setError("Image generation was cancelled.");
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
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
      const nextVideoUrl = URL.createObjectURL(blob);
      videoUrlRef.current = nextVideoUrl;
      setVideoUrl(nextVideoUrl);
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
          Free community image generation may vary in speed and availability. Videos are assembled
          locally from the image, title, hook and CTA.
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
        {imageLoading && (
          <AnimatedButton size="sm" variant="ghost" onClick={handleCancelImage}>
            Cancel {imageElapsed > 0 ? `(${imageElapsed}s)` : ""}
          </AnimatedButton>
        )}
        {typeof window !== "undefined" &&
          typeof MediaRecorder !== "undefined" &&
          typeof HTMLCanvasElement !== "undefined" &&
          "captureStream" in HTMLCanvasElement.prototype && (
            <AnimatedButton
              size="sm"
              variant="outline"
              onClick={handleGenerateVideo}
              disabled={imageLoading || videoLoading}
            >
              {videoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
              {videoLoading ? "Assembling video..." : "Create free video"}
            </AnimatedButton>
          )}
        {imageUrl && (
          <a
            href={imageUrl}
            download={`benover-tech-gadget-image.${imageExtension}`}
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
