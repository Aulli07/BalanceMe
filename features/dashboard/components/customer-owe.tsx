import { LuUsersRound } from "react-icons/lu";
import { customerInitials } from "@/features/customers/data/customers";



export function CustomersOwing() {
  return (
    <article className="rounded-3xl border border-red-400 bg-red-50 py-3 px-4 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold text-red-900">
          <LuUsersRound className="size-3.5" aria-hidden="true" />
          Customers owe you
        </h2>
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
          3 overdue
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-bold tracking-tight text-red-950">₦74,500</p>
        <div className="flex items-center pl-1" aria-label="Customers who owe money">
          {customerInitials.map((customer) => (
            <span
              key={customer.initials}
              className={`-ml-1 grid size-8 place-items-center rounded-full border-2 border-red-50 text-xs font-bold first:ml-0 ${customer.className}`}
            >
              {customer.initials}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
