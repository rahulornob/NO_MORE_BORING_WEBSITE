import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { getAllTags } from "@/lib/data";

export async function SiteFooter() {
  const tags = (await getAllTags()).slice(0, 6);

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid w-full max-w-site gap-10 px-5 py-14 sm:grid-cols-3">
        <div className="max-w-xs">
          <p className="text-sm font-semibold uppercase tracking-[0.14em]">
            {SITE_NAME}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Hand-curated website inspiration. No noise, no filler — just work
            worth studying.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  href={`/browse/${tag.slug}`}
                  className="text-muted transition hover:text-ink"
                >
                  {tag.label} websites
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Site
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted transition hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/submit" className="text-muted transition hover:text-ink">
                Submit a site
              </Link>
            </li>
            <li>
              <a href="/llms.txt" className="text-muted transition hover:text-ink">
                For AI agents
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-site items-center justify-between px-5 py-5 text-xs text-muted">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}
          </span>
          <span>Curated by humans.</span>
        </div>
      </div>
    </footer>
  );
}
