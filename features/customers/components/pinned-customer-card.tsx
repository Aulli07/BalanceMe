import Link from "next/link";
import Image from "next/image";
import type { Customer } from "@/shared/types/domain";
import { getCustomerSaleTransactionCount } from "@/features/customers/selectors/get-customer-txn-count";
import { getTotalAmountOwedForCustomer } from "@/features/dashboard/selectors/get-customers-owing";
import { formatNaira } from "@/shared/utils/format-naira";

export function PinnedCustomerCard({ customer }: { customer: Customer }) {
  const txnCount = getCustomerSaleTransactionCount(customer.id);
  const amountOwed = getTotalAmountOwedForCustomer(customer.businessId, customer.id);
  const owesMoney = amountOwed > 0;
  const initials = customer.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/customers/${customer.id}`}
      className="flex min-w-[calc((100vw-65px)/3)] max-w-[calc((100vw-65px)/3)] shrink-0 flex-col items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-center shadow-xs transition hover:border-[var(--forest)]/30 active:scale-[0.98]"
      aria-label={`${customer.name}, ${txnCount} transactions, ${owesMoney ? `owes ${formatNaira(amountOwed)}` : "fully paid"}`}
    >
      <div className="flex w-full flex-col items-center">
        {customer.avatarUrl ? (
          <Image
            src={customer.avatarUrl}
            alt={customer.name}
            width={38}
            height={38}
            className="size-[38px] rounded-full object-cover ring-2 ring-[#e2ecd7]"
          />
        ) : (
          <span className="grid size-[38px] place-items-center rounded-full bg-[#e2ecd7] text-xs font-extrabold text-[var(--forest)] ring-2 ring-[#d8e4cc]">
            {initials}
          </span>
        )}

        <span className="mt-2 block w-full truncate text-xs font-bold leading-tight text-[var(--ink)]">
          {customer.name}
        </span>

        <span className="mt-0.5 block text-[11px] font-medium leading-tight text-[var(--muted)]">
          {txnCount} {txnCount === 1 ? "transaction" : "transactions"}
        </span>
      </div>

      <div className="mt-2.5 flex w-full items-center justify-center">
        {owesMoney ? (
          <span className="inline-flex max-w-full items-center justify-center truncate rounded-md bg-[#faede8] px-2 py-0.5 text-[10px] font-bold text-[#a7402a]">
            Owes {formatNaira(amountOwed)}
          </span>
        ) : (
          <span className="inline-flex items-center justify-center rounded-md bg-[#e2ecd7] px-2 py-0.5 text-[10px] font-bold text-[var(--forest)]">
            Fully paid
          </span>
        )}
      </div>
    </Link>
  );
}
