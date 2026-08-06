import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Website } from "@/lib/types";

export function WebsiteCard({ site }: { site: Website }) {
  const meta = [site.platform, site.categories[0]].filter(Boolean).join(" · ");

  return (
    <Link href={`/site/${site.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-accent-soft">
        <Image
          src={site.image}
          alt={`${site.title} website design`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {site.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-paper">
            Featured
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{site.title}</h3>
          {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
        </div>
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted opacity-0 transition group-hover:opacity-100" />
      </div>
    </Link>
  );
}
