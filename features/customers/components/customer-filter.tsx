import { Dispatch, SetStateAction, useState } from "react";
import { customerFilters } from "../data/customers";
import { filterCustomers } from "../selectors/filter-customers";
import { Customer } from "@/shared/types/domain";

export function CustomerFilter({
  setVisibleCustomers
} : {
  setVisibleCustomers: Dispatch<SetStateAction<Customer[]>>
}) {
  const [activeFilter, setActiveFilter] = useState<(typeof customerFilters)[number]>("All");

  return (
    <div
      className="flex items-center overflow-x-auto gap-2"
      role="group"
      aria-label="Filter notifications"
    >
      {customerFilters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              setActiveFilter(filter);
              const filtered = filterCustomers(filter);
              setVisibleCustomers(filtered);
            }}
            className={`px-4 py-1.5 rounded-xl text-[13px] font-bold transition ${
              isActive
                ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
                : "text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--forest)]"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  )
}