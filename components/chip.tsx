import Link from "next/link";
import clsx from "clsx";

type ChipProps = {
  href: string;
  label: string;
  active?: boolean;
  count?: number;
};

export function Chip({ href, label, active = false, count }: ChipProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] transition",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-muted hover:border-ink hover:text-ink"
      )}
    >
      {label}
      {typeof count === "number" && (
        <span className={clsx("text-[11px]", active ? "text-paper/70" : "text-muted/70")}>
          {count}
        </span>
      )}
    </Link>
  );
}
