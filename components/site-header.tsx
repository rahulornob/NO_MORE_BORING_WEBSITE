import Link from "next/link";
import { SITE_NAME } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between px-5">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.14em]"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-muted transition hover:text-ink">
            Browse
          </Link>
          <Link href="/about" className="text-muted transition hover:text-ink">
            About
          </Link>
          <Link
            href="/submit"
            className="rounded-full border border-line px-3.5 py-1.5 transition hover:border-ink hover:bg-ink hover:text-paper"
          >
            Submit a site
          </Link>
        </nav>
      </div>
    </header>
  );
}
