import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "About — Why We Curate",
  description: `${SITE_NAME} is a hand-curated web design gallery. Every site is picked by a human for taste, motion and originality — no scraping, no pay-to-play placement, no filler.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl pt-16 sm:pt-24">
      <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        Boring is a choice.
        <br />
        This is the alternative.
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        <p>
          The internet is drowning in sameness — the same hero, the same three
          feature cards, the same testimonial wall. {SITE_NAME} exists to prove
          it doesn&apos;t have to be that way, and to give designers a place to
          find work that actually moves the craft forward.
        </p>
        <p>
          Every site in this gallery was chosen by a human. Nothing here is
          scraped, auto-submitted or paid for. If it&apos;s in the gallery, a
          curator looked at it, used it, and decided it teaches something worth
          learning.
        </p>
      </div>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">
        The rules we curate by
      </h2>
      <ol className="mt-6 space-y-5">
        {[
          {
            title: "Taste over trend",
            body: "Trends age in months. We pick sites whose decisions — type, spacing, color, restraint — will still look considered in five years.",
          },
          {
            title: "Motion with a purpose",
            body: "Animation earns its place by explaining, guiding or delighting. If it only decorates, it doesn't qualify.",
          },
          {
            title: "Originality that still works",
            body: "Experimental is welcome; unusable is not. Every pick has to succeed at its actual job — selling, telling, showing.",
          },
          {
            title: "Every pick explained",
            body: "A screenshot alone teaches nothing. Each site comes with a curator's note on why it works, so you can steal the thinking, not just the look.",
          },
        ].map((rule, index) => (
          <li key={rule.title} className="flex gap-4">
            <span className="text-sm font-semibold text-muted">
              0{index + 1}
            </span>
            <div>
              <h3 className="font-semibold">{rule.title}</h3>
              <p className="mt-1 leading-relaxed text-muted">{rule.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl border border-line bg-accent-soft/60 p-8">
        <h2 className="text-lg font-semibold tracking-tight">
          Made something that isn&apos;t boring?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We review every submission by hand. If it teaches something, it gets
          in — no fees, no favors.
        </p>
        <Link
          href="/submit"
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-85"
        >
          Submit a site
        </Link>
      </div>
    </article>
  );
}
