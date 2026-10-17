import { LuUsersRound } from "react-icons/lu";
import { getTotalAmountOwed, getTotalCustomersOwing } from "../selectors/get-customers-owing";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import Image from "next/image";



export function CustomersOwing() {
  const { count, customersOwing } = getTotalCustomersOwing(ACTIVE_BUSINESS_ID);
  return (
    <article className="rounded-3xl border border-red-100 bg-red-50 py-3 px-4 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold text-red-900">
          <LuUsersRound className="size-3.5" aria-hidden="true" />
          Customers owe you
        </h2>
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
          {count} owing
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-bold tracking-tight text-red-950">{getTotalAmountOwed(ACTIVE_BUSINESS_ID)}</p>
        <div className="flex items-center pl-1" aria-label="Customers who owe money">
          {customersOwing.map((customer) => (
            customer.avatarUrl
            ? (
            <Image
              key={customer.id}
              src={customer.avatarUrl}
              alt="Image not found"
              className="size-8 place-items-center rounded-full border-2 border-red-50"
            />
          ) : (
            <span
              key={customer.id}
              className="-ml-1 grid size-8 place-items-center rounded-full border-2 border-red-50 bg-red-200 text-xs font-bold text-red-900 first:ml-0"
            >
              {customer.name.split(" ")[0][0] + customer.name.split(" ")[1][0]}
            </span>
          )
          )
          )}
        </div>
      </div>
    </article>
  );
}
