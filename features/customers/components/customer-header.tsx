import { LuPlus } from "react-icons/lu";

interface CustomerHeaderProps {
  onAddCustomer: () => void;
}

export function CustomerHeader({ onAddCustomer }: CustomerHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
        Customers
      </h1>
      <button
        type="button"
        onClick={onAddCustomer}
        className="flex items-center gap-1.5 rounded-full bg-[var(--forest)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        Add 
        <LuPlus className="size-4 font-bold" />
      </button>
    </header>
  );
}
