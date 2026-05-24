"use client";

import { clsx } from "clsx";
import { categories } from "@/lib/sites";
import type { Category, Platform, SortKey } from "@/lib/types";
import { SearchInput } from "@/components/search-input";

type Filters = {
  category: Category | "All";
  platform: Platform | "All";
  style: string;
  interaction: string;
  color: string;
  layout: string;
  query: string;
  sort: SortKey;
};

type FilterBarProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
};

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "min-h-8 shrink-0 rounded-full border px-3 text-[11px] font-medium uppercase tracking-[0.12em] transition",
        active
          ? "border-white/70 bg-white text-black"
          : "border-white/10 bg-white/[0.03] text-muted hover:border-white/30 hover:text-ink",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <section className="sticky top-16 z-20 border-b border-white/10 bg-paper/78 py-4 backdrop-blur-xl">
      <div className="grid w-full gap-4 px-4 sm:px-6 lg:px-6">
        <div className="grid gap-3 lg:grid-cols-[minmax(260px,420px)_1fr_auto] lg:items-center">
          <SearchInput value={filters.query} onChange={(query) => update({ query })} />
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            <ChipButton
              label="All"
              active={filters.category === "All"}
              onClick={() => update({ category: "All" })}
            />
            {categories.map((category) => (
              <ChipButton
                key={category}
                label={category}
                active={filters.category === category}
                onClick={() => update({ category })}
              />
            ))}
          </div>
          <p className="text-right text-xs font-medium uppercase tracking-[0.16em] text-muted tabular-nums">
            {resultCount} sites
          </p>
        </div>
      </div>
    </section>
  );
}
