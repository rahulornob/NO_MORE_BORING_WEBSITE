import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, RefreshCw, Star, Trash2, X } from "lucide-react";
import clsx from "clsx";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { ADMIN_PAGE_SIZE } from "@/lib/config";
import { activeSource, getAllRecords, paginate, searchSites } from "@/lib/data";
import type { Website } from "@/lib/types";
import {
  deleteSiteAction,
  logoutAction,
  setStatusAction,
  syncNowAction,
  toggleFeaturedAction,
} from "./actions";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const SOURCE_LABELS = {
  notion: "Notion connected",
  sheets: "Google Sheets (read-only)",
  sample: "Demo data",
} as const;

function StatusBadge({ status }: { status: Website["status"] }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-medium capitalize",
        status === "published" && "bg-emerald-100 text-emerald-800",
        status === "draft" && "bg-amber-100 text-amber-800",
        status === "submitted" && "bg-blue-100 text-blue-800",
        status === "rejected" && "bg-red-100 text-red-700"
      )}
    >
      {status}
    </span>
  );
}

const iconButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink";

type Props = {
  searchParams: Promise<{ p?: string; find?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  if (!adminConfigured()) {
    return (
      <div className="mx-auto max-w-lg pt-24">
        <h1 className="text-2xl font-semibold tracking-tight">Admin setup</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Set an <code className="rounded bg-accent-soft px-1.5 py-0.5">ADMIN_PASSWORD</code>{" "}
          environment variable (locally in <code className="rounded bg-accent-soft px-1.5 py-0.5">.env.local</code>,
          in production in your hosting dashboard), redeploy, and reload this
          page to sign in.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return <LoginForm />;
  }

  const { p, find = "" } = await searchParams;
  const all = await getAllRecords();
  const source = activeSource();

  const submissions = all.filter((site) => site.status === "submitted");
  const library = all.filter((site) => site.status !== "submitted");
  const found = find ? searchSites(library, find) : library;
  const { items, page, totalPages, total } = paginate(
    found,
    Math.max(1, Number(p) || 1),
    ADMIN_PAGE_SIZE
  );

  const counts = {
    published: all.filter((s) => s.status === "published").length,
    draft: all.filter((s) => s.status === "draft").length,
  };

  return (
    <div className="pt-10 sm:pt-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-muted">
            {SOURCE_LABELS[source]} · {counts.published} published ·{" "}
            {counts.draft} draft{counts.draft === 1 ? "" : "s"} ·{" "}
            {submissions.length} awaiting review
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form action={syncNowAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-85"
            >
              <RefreshCw className="h-4 w-4" />
              Sync now
            </button>
          </form>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-line px-5 py-2.5 text-sm text-muted transition hover:border-ink hover:text-ink"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      {source === "sample" && (
        <div className="mt-8 rounded-2xl border border-line bg-accent-soft/60 p-6 text-sm leading-relaxed">
          <p className="font-medium">You&apos;re looking at demo data.</p>
          <p className="mt-1 text-muted">
            To go live, set <code className="rounded bg-white px-1.5 py-0.5">NOTION_TOKEN</code> and{" "}
            <code className="rounded bg-white px-1.5 py-0.5">NOTION_DATABASE_ID</code> — the full
            walkthrough (including the exact Notion database template) is in the
            project README. Demo edits reset on redeploy.
          </p>
        </div>
      )}

      {submissions.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">
            Review queue{" "}
            <span className="text-sm font-normal text-muted">
              {submissions.length} waiting
            </span>
          </h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
            {submissions.map((site) => (
              <li
                key={site.id}
                className="flex flex-wrap items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium">{site.title}</p>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {site.url && (
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener"
                        className="underline underline-offset-2 hover:text-ink"
                      >
                        {site.url}
                      </a>
                    )}
                    {site.description && ` — ${site.description}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <form action={setStatusAction.bind(null, site.id, "published")}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition hover:opacity-85"
                    >
                      <Check className="h-3.5 w-3.5" /> Publish
                    </button>
                  </form>
                  <form action={setStatusAction.bind(null, site.id, "rejected")}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs text-muted transition hover:border-ink hover:text-ink"
                    >
                      <X className="h-3.5 w-3.5" /> Reject
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Library{" "}
            <span className="text-sm font-normal text-muted">{total} sites</span>
          </h2>
          <form action="/admin" className="flex items-center gap-2">
            <input
              type="search"
              name="find"
              defaultValue={find}
              placeholder="Find a site…"
              className="rounded-full border border-line bg-white px-4 py-2 text-sm outline-none transition focus:border-ink"
            />
          </form>
        </div>

        <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
          {items.map((site) => (
            <li key={site.id} className="flex items-center gap-4 p-3">
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-accent-soft">
                <Image
                  src={site.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/site/${site.slug}`}
                  className="font-medium hover:underline"
                >
                  {site.title}
                </Link>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {[site.platform, ...site.categories].filter(Boolean).join(" · ")}
                </p>
              </div>
              <StatusBadge status={site.status} />
              <div className="flex items-center gap-1.5">
                <form action={toggleFeaturedAction.bind(null, site.id, !site.featured)}>
                  <button
                    type="submit"
                    title={site.featured ? "Unfeature" : "Feature"}
                    className={clsx(iconButton, site.featured && "border-ink text-ink")}
                  >
                    <Star
                      className={clsx("h-4 w-4", site.featured && "fill-current")}
                    />
                  </button>
                </form>
                {site.status === "draft" ? (
                  <form action={setStatusAction.bind(null, site.id, "published")}>
                    <button type="submit" title="Publish" className={iconButton}>
                      <Check className="h-4 w-4" />
                    </button>
                  </form>
                ) : (
                  <form action={setStatusAction.bind(null, site.id, "draft")}>
                    <button
                      type="submit"
                      title="Unpublish (move to draft)"
                      className={iconButton}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </form>
                )}
                {site.editUrl && (
                  <a
                    href={site.editUrl}
                    target="_blank"
                    rel="noopener"
                    title="Edit in Notion"
                    className={iconButton}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                <form action={deleteSiteAction.bind(null, site.id)}>
                  <button
                    type="submit"
                    title="Archive (recoverable from Notion trash)"
                    className={clsx(iconButton, "hover:border-red-500 hover:text-red-600")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="p-8 text-center text-sm text-muted">
              No sites match{find ? ` “${find}”` : ""}.
            </li>
          )}
        </ul>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            {page > 1 && (
              <Link
                href={`/admin?p=${page - 1}${find ? `&find=${encodeURIComponent(find)}` : ""}`}
                className="rounded-full border border-line px-4 py-2 transition hover:border-ink"
              >
                ← Previous
              </Link>
            )}
            <span className="text-muted">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/admin?p=${page + 1}${find ? `&find=${encodeURIComponent(find)}` : ""}`}
                className="rounded-full border border-line px-4 py-2 transition hover:border-ink"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
