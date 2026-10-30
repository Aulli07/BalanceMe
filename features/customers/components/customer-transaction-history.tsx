import { LuReceipt, LuWallet } from "react-icons/lu";
import { formatNaira } from "@/shared/utils/format-naira";
import { getDayLabel } from "@/features/transactions/utils/get-day-label";
import { formatTransactionTime } from "@/features/transactions/utils/format-time";
import type { CustomerTransactionItem } from "../types/customer-detail";

export function CustomerTransactionHistory({
  transactions,
}: {
  transactions: CustomerTransactionItem[];
}) {
  return (
    <section className="mt-8 pb-28">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-[var(--ink)]">
          Transaction history
        </h2>
        <p className="text-[11px] text-[var(--muted)]">
          Latest first · {transactions.length} shown
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-5">
        {transactions.map((txn) => (
          <TransactionRow key={txn.id} transaction={txn} />
        ))}
      </div>
    </section>
  );
}

function TransactionRow({
  transaction,
}: {
  transaction: CustomerTransactionItem;
}) {
  const dayLabel = getDayLabel(transaction.createdAt);
  const time = formatTransactionTime(transaction.createdAt);
  const isSale = transaction.type === "sale";

  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-full ${
          isSale
            ? "bg-[var(--forest)]/10 text-[var(--forest)]"
            : "bg-[var(--forest)]/5 text-[var(--forest-soft)]"
        }`}
      >
        {isSale ? (
          <LuReceipt className="size-[18px]" />
        ) : (
          <LuWallet className="size-[18px]" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
          <span>
            {dayLabel} · {time}
          </span>
          {isSale && (
            <span className="rounded-full bg-[var(--forest)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--forest)]">
              Transactions sample
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm font-bold text-[var(--ink)]">
          {transaction.title}
        </p>
        <p className="text-[12px] text-[var(--muted)]">
          {transaction.description}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-[var(--ink)]">
          {formatNaira(transaction.amountKobo)}
        </p>
        <p className="text-[10px] text-[var(--muted)]">
          {transaction.paymentStatus}
        </p>
      </div>
    </div>
  );
}

