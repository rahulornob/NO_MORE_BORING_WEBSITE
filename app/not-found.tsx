import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md pt-32 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted">404</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        This page is boring, because it doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-85"
      >
        Back to the gallery
      </Link>
    </div>
  );
}
