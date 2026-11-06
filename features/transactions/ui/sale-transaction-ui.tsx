import { getCustomer } from "@/shared/selectors/getters";
import { formatNaira } from "@/shared/utils/format-naira";
import type { SaleTransactionUiProps } from "../types/transaction-props";
import { getDateString } from "../utils/get-date-string";
import { DetailRow } from "./detail-row";
import { TransactionActions } from "./transaction-actions";

export function SaleTransactionUi({
  transaction,
  productPrice,
  amountPaid,
  balance,
  dueDate
}: SaleTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);

  return (
    <section className="flex flex-col px-5 flex-1">
      <div className="rounded-[1.75rem] bg-[var(--forest)] p-6 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-[var(--lime)]">Sale recorded</p>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
            Sale
          </span>
        </div>
        <p className="mt-5 text-sm font-medium text-white/70">Product price</p>
        <p className="mt-1 text-3xl font-extrabold leading-none tracking-tight">
          {formatNaira(productPrice)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <AmountCard label="Amount paid" value={formatNaira(amountPaid)} />
        <AmountCard label="Balance" value={formatNaira(balance)} highlighted />
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-[var(--forest-soft)]">
          Sale information
        </p>
        <dl className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
          <DetailRow
            label="Customer"
            value={customer?.name ?? "Unknown customer"}
          />
          <DetailRow label="Description" value={transaction.description} />
          <DetailRow label="Due Date" value={transaction.dueDate ?? } />
        </dl>
      </div>
      <time
        dateTime={transaction.createdAt}
        className="mt-6 flex-1 text-center text-sm font-medium text-[var(--muted)]"
      >
        {getDateString(transaction.createdAt)}
      </time>
      <TransactionActions />
    </section>
  );
}

function AmountCard({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-extrabold ${highlighted ? "text-[var(--forest)]" : "text-[var(--ink)]"}`}
      >
        {value}
      </p>
    </div>
  );
}
