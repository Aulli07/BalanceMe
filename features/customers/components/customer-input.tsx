import { mockCustomers } from "@/shared/data/domain-mock-data";
import { Customer } from "@/shared/types/domain";
import { Dispatch, SetStateAction } from "react";
import { LuSearch } from "react-icons/lu";



export function CustomerInput({
  setVisibleCustomers
} : {
  setVisibleCustomers: Dispatch<SetStateAction<Customer[]>>
}) {
  
  function handleChange(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    const found = mockCustomers.filter(
      (customer) => !normalizedQuery || customer.name.toLowerCase().includes(normalizedQuery),
    );

    setVisibleCustomers(found);
  }

  return (
    <label className="flex h-12 items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[var(--muted)] shadow-sm shadow-[var(--forest)]/5 focus-within:border-[var(--forest-soft)] focus-within:ring-4 focus-within:ring-[var(--lime)]/20">
      <LuSearch className="size-4.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">Search Customers</span>
      <input
        type="search"
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search customers"
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
      />
    </label>
  )
}