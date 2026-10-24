import { mockSaleTransactions } from "@/shared/data/domain-mock-data";
import { getCustomer } from "@/shared/selectors/getters";
import { formatNaira } from "@/shared/utils/format-naira";
import type { PaymentTransactionUiProps } from "../types/transaction-props";
import { getDateString } from "../utils/get-date-string";
import { DetailRow } from "./detail-row";
import { TransactionActions } from "./transaction-actions";

export function PaymentTransactionUi({
  transaction,
  amountPaid,
  allocations,
}: PaymentTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);

  return (
    <section className="mt-6 flex min-h-[calc(100dvh-5rem)] flex-col px-5 pb-6">
      <div className="rounded-[1.75rem] bg-[var(--forest)] p-6 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[var(--lime)]">Payment received</p>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">Payment</span>
        </div>
        <p className="mt-5 text-sm font-medium text-white/70">Amount received</p>
        <p className="mt-1 text-5xl font-extrabold leading-none tracking-tight">
          {formatNaira(amountPaid)}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-[var(--forest-soft)]">Payment information</p>
        <dl className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
          <DetailRow label="Customer" value={customer?.name ?? "Unknown customer"} />
          {transaction.note && <DetailRow label="Note" value={transaction.note} />}
        </dl>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <p className="text-sm font-bold text-[var(--forest-soft)]">Allocated to sales</p>
          <p className="text-xs font-bold text-[var(--muted)]">
            {allocations.length} allocation{allocations.length === 1 ? "" : "s"}
          </p>
        </div>
        <ul className="mt-3 divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
          {allocations.map((allocation) => {
            const sale = mockSaleTransactions.find(
              (item) => item.id === allocation.saleTransactionId,
            );

            return (
              <li key={allocation.saleTransactionId} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[var(--ink)]">
                    {sale?.description ?? "Sale transaction"}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)]">Payment allocation</p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--paper)] px-3 py-1.5 text-sm font-extrabold text-[var(--forest)]">
                  {formatNaira(allocation.amountKobo)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <time
        dateTime={transaction.createdAt}
        className="mt-6 text-center text-sm font-medium text-[var(--muted)]"
      >
        {getDateString(transaction.createdAt)}
      </time>
      <TransactionActions />
    </section>
  );
}
