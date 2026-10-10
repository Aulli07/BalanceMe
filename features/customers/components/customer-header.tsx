import { LuSearch } from "react-icons/lu";

export function CustomerHeader() {
  return (
    <header className="flex min-h-16 items-center justify-between px-5 pt-2">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
        Customers
      </h1>
      <button
        type="button"
        className="grid size-9 place-items-center rounded-full text-[var(--forest)] transition-colors active:bg-[#e9eddf]"
        aria-label="Search customers"
      >
        <LuSearch className="size-5" aria-hidden="true" />
      </button>
    </header>
  );
}
