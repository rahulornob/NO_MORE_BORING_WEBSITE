"use client";

import { Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search curated websites</span>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        className="h-10 w-full rounded-md border border-white/10 bg-white/[0.04] px-9 text-sm text-ink outline-none transition placeholder:text-muted focus:border-white/30 focus:ring-2 focus:ring-accent/20"
        type="search"
      />
      {value ? (
        <button
          aria-label="Clear search"
          className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition hover:bg-white/10 hover:text-ink"
          onClick={() => onChange("")}
          type="button"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </label>
  );
}
