"use client";
import Link from "next/link";
import { LuPlus, LuReceiptText, LuWallet } from "react-icons/lu";
import { formatNaira } from "@/shared/utils/format-naira";
import type { CustomerTransactionItem } from "../types/customer-detail";
export function CustomerTransactionHistory({
  transactions,
}: {
  transactions: CustomerTransactionItem[];
}) {
  return (
    <section className="mt-7" aria-labelledby="history-heading">
      <div className="flex items-center justify-between">
        <h2 id="history-heading" className="text-lg font-bold">
          Transactions
        </h2>
        <Link
          href="/add-entry"
          className="grid size-9 place-items-center rounded-full bg-[var(--forest)] text-[var(--lime)]"
          aria-label="Add transaction"
        >
          <LuPlus className="size-5" />
        </Link>
      </div>
      <div className="mt-3 divide-y divide-[var(--line)]">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}
function TransactionItem({
  transaction,
}: {
  transaction: CustomerTransactionItem;
}) {
  const isPayment = transaction.type === "payment";
  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className="flex min-h-[72px] items-center gap-3 py-3"
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full ${isPayment ? "bg-[#e9f3df] text-[var(--forest)]" : "bg-[var(--forest)]/10 text-[var(--forest)]"}`}
      >
        {isPayment ? (
          <LuWallet className="size-[18px]" />
        ) : (
          <LuReceiptText className="size-[18px]" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{transaction.title}</p>
        <p className="mt-0.5 truncate text-xs text-[var(--muted)]">
          {transaction.description}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-extrabold text-[var(--forest)]">
          {formatNaira(transaction.amountKobo)}
        </p>
        <span
          className={`mt-1 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold ${isPayment ? "bg-[#e9f3df] text-[var(--forest-soft)]" : "bg-[#fff3dd] text-[#9b651b]"}`}
        >
          {transaction.paymentStatus}
        </span>
      </div>
    </Link>
  );
}
