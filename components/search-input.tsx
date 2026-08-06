import { Search } from "lucide-react";

export function SearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/" role="search" className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search sites, styles, platforms…"
        className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-5 text-sm outline-none transition placeholder:text-muted/70 focus:border-ink"
      />
    </form>
  );
}
