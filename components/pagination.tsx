import Link from "next/link";
import clsx from "clsx";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string>;
};

function pageHref(basePath: string, page: number, query: Record<string, string>) {
  const params = new URLSearchParams(query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ page, totalPages, basePath, query = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const linkClass = (disabled: boolean) =>
    clsx(
      "rounded-full border px-4 py-2 text-sm transition",
      disabled
        ? "pointer-events-none border-line text-muted/50"
        : "border-line text-ink hover:border-ink"
    );

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-4">
      <Link
        href={pageHref(basePath, page - 1, query)}
        rel="prev"
        aria-disabled={page <= 1}
        className={linkClass(page <= 1)}
      >
        ← Previous
      </Link>
      <span className="text-sm text-muted">
        Page {page} of {totalPages}
      </span>
      <Link
        href={pageHref(basePath, page + 1, query)}
        rel="next"
        aria-disabled={page >= totalPages}
        className={linkClass(page >= totalPages)}
      >
        Next →
      </Link>
    </nav>
  );
}
