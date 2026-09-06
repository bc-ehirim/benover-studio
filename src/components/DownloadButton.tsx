import { Download } from "lucide-react";
import { toast } from "sonner";
import { AnimatedButton } from "./AnimatedButton";
import { downloadTextFile } from "@/utils/export";

interface DownloadButtonProps {
  filename: string;
  contents: string;
  label?: string;
  className?: string;
}

export function DownloadButton({
  filename,
  contents,
  label = "Download TXT",
  className,
}: DownloadButtonProps) {
  return (
    <AnimatedButton
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        const ok = downloadTextFile(filename, contents);
        if (ok) {
          toast.success("Download started", { description: filename });
        } else {
          toast.error("Download unavailable", {
            description: "Your browser could not create the text file.",
          });
        }
      }}
    >
      <Download className="h-4 w-4" />
      {label}
    </AnimatedButton>
  );
}
