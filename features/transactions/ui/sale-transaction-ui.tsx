import { getCategory, getCustomer, getReceiptAttachment } from "@/shared/selectors/getters";
import { formatNaira } from "@/shared/utils/format-naira";
import { LuFileText } from "react-icons/lu";
import type { SaleTransactionUiProps } from "../types/transaction-props";
import { getDateString } from "../utils/get-date-string";
import { DetailRow } from "./detail-row";
import { TransactionActions } from "./transaction-actions";

export function SaleTransactionUi({
  transaction,
  productPrice,
  amountPaid,
  balance,
}: SaleTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);
  const category = getCategory(transaction.categoryId);
  const receipt = getReceiptAttachment(transaction.receiptId ?? "");

  return (
    <section className="mt-5 flex min-h-[calc(100dvh-5rem)] flex-col px-5 pb-6">
      <div className="rounded-[1.75rem] bg-[var(--forest)] p-6 text-white shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-[var(--lime)]">Sale recorded</p>
          <span className="truncate rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {category?.name ?? "Sale"}
          </span>
        </div>
        <p className="mt-5 text-sm font-medium text-white/70">Product price</p>
        <p className="mt-1 text-5xl font-extrabold leading-none tracking-tight">
          {formatNaira(productPrice)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <AmountCard label="Amount paid" value={formatNaira(amountPaid)} />
        <AmountCard label="Balance" value={formatNaira(balance)} highlighted />
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-[var(--forest-soft)]">Sale information</p>
        <dl className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
          <DetailRow label="Customer" value={customer?.name ?? "Unknown customer"} />
          <DetailRow label="Category" value={category?.name ?? "Uncategorised"} />
          <DetailRow label="Description" value={transaction.description} />
        </dl>
      </div>

      {receipt && (
        <div className="mt-6">
          <p className="text-sm font-bold text-[var(--forest-soft)]">Receipt preview</p>
          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--lime)] text-[var(--forest-dark)]">
              <LuFileText className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[var(--ink)]">{receipt.fileName}</p>
              <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                PDF · {Math.ceil(receipt.sizeBytes / 1024)} KB
              </p>
            </div>
          </div>
        </div>
      )}

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
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p className={`mt-2 text-lg font-extrabold ${highlighted ? "text-[var(--forest)]" : "text-[var(--ink)]"}`}>
        {value}
      </p>
    </div>
  );
}
