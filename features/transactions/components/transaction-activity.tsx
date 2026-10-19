import Image from "next/image";
import { LuClock3 } from "react-icons/lu";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import {
  mockCategories,
  mockCustomers,
  mockPaymentTransactions,
  mockTransactions,
} from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";
import { getTransactionActivity } from "../selectors/get-transactions";
import { formatTransactionTime } from "../utils/format-time";
import { getInitials } from "../utils/get-name-initials";





export function TransactionActivity() {
  const transactions = getTransactionActivity(ACTIVE_BUSINESS_ID);

  return (
    <section className="flex flex-col gap-4 px-5 pt-5" aria-labelledby="activity-heading">
      <h2 id="activity-heading" className="sr-only">
        Transaction activity
      </h2>

      {Object.entries(transactions).map(([day, dayTransactions]) => (
        <div key={day}>
          <h3 className="mb-0.5 px-0.5 text-sm font-bold tracking-tight text-[var(--muted)]">
            {day}
          </h3>

          {dayTransactions.map((transaction) => {
            const customerName = transaction.customer?.name ?? "Unknown customer";

            return (
              <article
                key={transaction.id}
                className="flex min-h-18 items-center gap-2.5 border-b border-[var(--line)] py-2.5"
              >
                {transaction.customer?.avatarUrl ? (
                  <Image
                    src={transaction.customer.avatarUrl}
                    alt={customerName}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--line)] text-sm font-extrabold text-[var(--forest)]">
                    {getInitials(customerName)}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold leading-tight text-[var(--ink)]">
                    {transaction.description}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium leading-tight text-[var(--muted)]">
                    <span>{transaction.category}</span>
                    <span aria-hidden="true">•</span>
                    <span>{customerName}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={transaction.createdAt}>
                      {formatTransactionTime(transaction.createdAt)}
                    </time>
                  </div>
                </div>

                <div className="flex min-w-[88px] shrink-0 flex-col items-end justify-center text-right">
                  <p className="text-md font-extrabold leading-tight tracking-tight text-[var(--forest)]">
                    {formatNaira(transaction.amount)}
                  </p>
                  <span
                    className={`mt-1 flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-bold leading-none ${transaction.statusColor}`}
                  >
                    {transaction.status.startsWith("Owes") && (
                      <LuClock3 className="size-2.5" aria-hidden="true" />
                    )}
                    {transaction.status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </section>
  );
}
