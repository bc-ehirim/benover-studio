interface VideoOptions {
  imageUrl: string;
  title: string;
  hook: string;
  cta: string;
  vertical: boolean;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The generated image could not be used in the video."));
    image.src = url;
  });
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  zoom: number,
): void {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
  const imageWidth = image.naturalWidth * scale;
  const imageHeight = image.naturalHeight * scale;
  context.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
}

/** Assemble a short branded video locally from the generated image and copy. */
export async function assembleVideo(options: VideoOptions): Promise<Blob> {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("Video export is not supported by this browser.");
  }

  const image = await loadImage(options.imageUrl);
  const width = options.vertical ? 720 : 1024;
  const height = options.vertical ? 1280 : 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser could not create a video canvas.");

  const stream = canvas.captureStream(30);
  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "";
  const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data);
  };

  const recording = new Promise<Blob>((resolve, reject) => {
    recorder.onerror = () => reject(new Error("The browser could not assemble the video."));
    recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
  });

  recorder.start();
  const startedAt = performance.now();
  const duration = 8_000;
  const frame = (now: number) => {
    const elapsed = now - startedAt;
    const progress = Math.min(elapsed / duration, 1);
    const zoom = 1 + progress * 0.08;

    context.fillStyle = "#101827";
    context.fillRect(0, 0, width, height);
    drawCover(context, image, width, height, zoom);

    const overlay = context.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, "rgba(9, 18, 34, 0.18)");
    overlay.addColorStop(0.55, "rgba(9, 18, 34, 0.14)");
    overlay.addColorStop(1, "rgba(9, 18, 34, 0.9)");
    context.fillStyle = overlay;
    context.fillRect(0, 0, width, height);

    const padding = width * 0.09;
    context.fillStyle = "#8bd4d0";
    context.font = `600 ${Math.round(width * 0.035)}px system-ui, sans-serif`;
    context.fillText("BENOVER TECH", padding, height - padding * 2.9);

    context.fillStyle = "#ffffff";
    context.font = `700 ${Math.round(width * 0.065)}px system-ui, sans-serif`;
    const titleLines = wrapText(context, options.title, width - padding * 2);
    titleLines.slice(0, 3).forEach((line, index) => {
      context.fillText(line, padding, height - padding * (2.25 - index * 0.12));
    });

    context.fillStyle = "rgba(255, 255, 255, 0.86)";
    context.font = `400 ${Math.round(width * 0.033)}px system-ui, sans-serif`;
    const hookLines = wrapText(context, options.hook, width - padding * 2);
    hookLines.slice(0, 2).forEach((line, index) => {
      context.fillText(line, padding, height - padding * (1.25 - index * 0.11));
    });

    if (progress >= 0.72) {
      context.fillStyle = "#ffffff";
      context.font = `600 ${Math.round(width * 0.035)}px system-ui, sans-serif`;
      context.fillText(options.cta, padding, height - padding * 0.45);
    }

    if (elapsed < duration) requestAnimationFrame(frame);
    else recorder.stop();
  };
  requestAnimationFrame(frame);

  return recording;
}
