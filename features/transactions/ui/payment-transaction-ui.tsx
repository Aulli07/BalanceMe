import {
  mockCustomers,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";
import { getDateString } from "../utils/get-date-string";
import { getCustomer } from "@/shared/selectors/getters";
import { DetailRow } from "./detail-row";
import { PaymentTransactionUiProps } from "../types/transaction-props";



export function PaymentTransactionUi({
  transaction,
  amountPaid,
  allocations
}: PaymentTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);

  return (
    <section className="mt-7 flex min-h-72 flex-col px-5" aria-label="Payment details">
      <div>
        <p className="text-sm font-bold text-[var(--forest-soft)]">Payment received</p>
        <p className="mt-2 text-3xl font-extrabold leading-none tracking-tight text-[var(--forest)]">
          {formatNaira(amountPaid)}
        </p>

        <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <DetailRow label="Amount paid by customer" value={formatNaira(amountPaid)} />
          <DetailRow label="Customer" value={customer?.name ?? "Unknown customer"} />
          {transaction.note && <DetailRow label="Note" value={transaction.note} />}
        </dl>

        <div className="mt-6">
          <p className="text-sm font-bold text-[var(--forest-soft)]">Allocated to sales</p>
          <ul className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white px-4">
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
                  <span className="shrink-0 text-sm font-bold text-[var(--forest)]">
                    {formatNaira(allocation.amountKobo)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <time
        dateTime={transaction.createdAt}
        className="mt-8 border-t border-[var(--line)] pt-4 text-sm font-medium text-[var(--muted)]"
      >
        {getDateString(transaction.createdAt)}
      </time>
    </section>
  );
}
