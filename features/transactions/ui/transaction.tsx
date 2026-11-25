import Link from "next/link";
import { TransactionActivityItemProps } from "../types/transaction-props";
import Image from "next/image";
import { formatTransactionTime } from "../utils/format-time";
import { formatNaira } from "@/shared/utils/format-naira";
import { getInitialsOfName } from "@/shared/utils/get-initials";

export function TransactionUi({
  transaction, 
  name
}: {
  transaction: TransactionActivityItemProps; 
  name: string
}) {
  return (
    <Link
      href={`/transactions/${transaction.id}`}
      key={transaction.id}
      className="group"
    >
      <article
        key={transaction.id}
        className="flex min-h-18 items-center gap-2.5 border-b border-[var(--line)] py-2.5"
      >
        {transaction.customer?.avatarUrl ? (
          <Image
            src={transaction.customer.avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="size-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--line)] text-sm font-extrabold text-[var(--forest)]">
            {getInitialsOfName(name)}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold leading-tight text-[var(--ink)]">
            {transaction.type === "sale"
              ? "Sale"
              : transaction.type === "repayment"
                ? "Repayment"
                : "Sale and repayment"}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium leading-tight text-[var(--muted)]">
            <span>{name}</span>
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
          <p
            className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${transaction.statusColor}`}
          >
            {transaction.status}
          </p>
        </div>
      </article>
    </Link>
  )
} 