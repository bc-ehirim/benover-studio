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
        downloadTextFile(filename, contents);
        toast.success("Download started", { description: filename });
      }}
    >
      <Download className="h-4 w-4" />
      {label}
    </AnimatedButton>
  );
}
