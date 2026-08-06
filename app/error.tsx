"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md pt-32 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something broke — that&apos;s on us.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The content source might be having a moment. Try again in a few
        seconds.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-85"
      >
        Try again
      </button>
    </div>
  );
}
