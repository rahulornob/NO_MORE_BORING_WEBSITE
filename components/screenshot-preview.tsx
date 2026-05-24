import { ImageIcon } from "lucide-react";

type ScreenshotPreviewProps = { large?: boolean };

export function ScreenshotPreview({ large }: ScreenshotPreviewProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#050608]">
      <div className="flex size-14 items-center justify-center rounded-full bg-white sm:size-16">
        <ImageIcon className={large ? "size-8 text-black" : "size-7 text-black"} strokeWidth={1.8} />
      </div>
    </div>
  );
}
