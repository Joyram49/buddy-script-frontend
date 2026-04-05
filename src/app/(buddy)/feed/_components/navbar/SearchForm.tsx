"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchForm = () => {
  return (
    <form className="relative w-full max-w-[424px]" onSubmit={(e) => e.preventDefault()}>
      <Search className="text-buddy-muted pointer-events-none absolute top-1/2 left-4 h-[17px] w-[17px] -translate-y-1/2" />
      <input
        type="search"
        placeholder="input search text"
        aria-label="Search"
        className={cn(
          "focus:ring-buddy-accent/30 bg-buddy-input text-buddy-text placeholder:text-buddy-muted h-10 w-full rounded-full border-0 py-2 pr-4 pl-11 text-base transition outline-none focus:ring-2",
          "dark:text-buddy-heading dark:placeholder:text-buddy-muted dark:bg-white/10",
        )}
      />
    </form>
  );
};

export default SearchForm;
