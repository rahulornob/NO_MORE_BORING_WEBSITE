import { clsx } from "clsx";

type ScoreBadgeProps = {
  label: string;
  value: number;
  strong?: boolean;
};

export function ScoreBadge({ label, value, strong }: ScoreBadgeProps) {
  return (
    <div
      className={clsx(
        "flex min-w-[76px] items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-xs",
        strong ? "border-white/20 bg-white text-black" : "border-white/10 bg-white/[0.04] text-ink",
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] opacity-75">
        {label}
      </span>
      <span className="font-semibold tabular-nums">{value.toFixed(1)}</span>
    </div>
  );
}
