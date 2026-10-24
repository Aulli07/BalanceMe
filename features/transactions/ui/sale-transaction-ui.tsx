import { formatNaira } from "@/shared/utils/format-naira";
import { LuFileText } from "react-icons/lu";
import { getDateString } from "../utils/get-date-string";
import { getCategory, getCustomer, getReceiptAttachment } from "@/shared/selectors/getters";
import { SaleTransactionUiProps } from "../types/transaction-props";


export function SaleTransactionUi({
  transaction,
  productPrice,
  amountPaid,
  balance
}: SaleTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);
  const category = getCategory(transaction.categoryId);
  const receipt = getReceiptAttachment(transaction?.receiptId ?? "");

  return (
    <section className="mt-7 flex min-h-72 flex-col px-5" aria-label="Sale details">
      <div>
        <p className="text-sm font-bold text-[var(--forest-soft)]">Product price</p>
        <p className="mt-2 text-5xl font-extrabold leading-none tracking-tight text-[var(--forest)]">
          {formatNaira(productPrice)}
        </p>

        <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <DetailRow label="Amount paid by customer" value={formatNaira(amountPaid)} />
          <DetailRow label="Balance" value={formatNaira(balance)} valueClassName="text-[var(--forest)]" />
          <DetailRow label="Customer" value={customer?.name ?? "Unknown customer"} />
          <DetailRow label="Category" value={category?.name ?? "Uncategorised"} />
          <DetailRow label="Description" value={transaction.description} />
        </dl>

        {receipt && (
          <div className="mt-6">
            <p className="text-sm font-bold text-[var(--forest-soft)]">Receipt</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--paper)] text-[var(--forest)]">
                <LuFileText className="size-5" aria-hidden="true" />
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

function DetailRow({
  label,
  value,
  valueClassName = "text-[var(--ink)]",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 py-4">
      <dt className="text-sm font-medium text-[var(--muted)]">{label}</dt>
      <dd className={`text-right text-base font-bold ${valueClassName}`}>{value}</dd>
    </div>
  );
}
