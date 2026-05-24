import type { WebsiteItem } from "@/lib/types";
import { ScreenshotPreview } from "@/components/screenshot-preview";

type WebsiteCardProps = {
  site: WebsiteItem;
};

export function WebsiteCard({ site }: WebsiteCardProps) {
  return (
    <article className="group overflow-hidden rounded-[16px] bg-[#111318] p-1 shadow-[0_18px_46px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.08] transition duration-300 hover:-translate-y-1 hover:ring-white/[0.18]">
      <a
        className="block"
        href={site.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${site.title}`}
      >
        <div className="relative aspect-[9/12] overflow-hidden rounded-[12px] bg-paper">
          <div className="h-full w-full transition duration-500 group-hover:scale-[1.025]">
            <ScreenshotPreview />
          </div>
        </div>

        <div className="flex h-12 items-center px-2">
          <h2 className="truncate text-[16px] font-medium leading-none text-ink transition group-hover:text-white">
            {site.title}
          </h2>
        </div>
      </a>
    </article>
  );
}
