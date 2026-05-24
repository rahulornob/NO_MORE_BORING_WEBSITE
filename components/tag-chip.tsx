import { clsx } from "clsx";
import type { ReactNode } from "react";

type TagChipProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "dark";
  active?: boolean;
  className?: string;
};

export function TagChip({ children, tone = "default", active, className }: TagChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em]",
        tone === "default" && "border-white/10 bg-white/[0.04] text-muted",
        tone === "accent" && "border-accent/70 bg-accent/15 text-[#c4b5fd]",
        tone === "dark" && "border-white/15 bg-white/[0.06] text-ink",
        active && "border-white/70 bg-white text-black",
        className,
      )}
    >
      {children}
    </span>
  );
}
