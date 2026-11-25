import { TransactionActivityItemProps, TransactionMonthlyActivityProps } from "../types/transaction-props";
import { NoTransactionUi } from "../ui/no-transactions";
import { TransactionUi } from "../ui/transaction";



export function TransactionActivity({
  transactions,
}: TransactionMonthlyActivityProps) {
  const hasTransactions = Object.keys(transactions).length > 0;

  return (
    <section
      className="flex flex-col gap-4 px-5 pt-5"
      aria-labelledby="activity-heading"
    >
      <h2 id="activity-heading" className="sr-only">
        Transaction activity
      </h2>

      {!hasTransactions ? (
        <NoTransactionUi />
      ) : (
        Object.entries(transactions).map(([day, dayTransactions]) => (
          <div key={day}>
            <h3 className="mb-0.5 px-0.5 text-sm font-bold tracking-tight text-[var(--forest-green)]">
              {day}
            </h3>

            {dayTransactions.map((transaction: TransactionActivityItemProps) => {
              const customerName =
                transaction.customer?.name ?? "Unknown customer";

              return (
                <TransactionUi transaction={transaction} name={customerName}/>
                // <Link
                //   href={`/transactions/${transaction.id}`}
                //   key={transaction.id}
                //   className="group"
                // >
                //   <article
                //     key={transaction.id}
                //     className="flex min-h-18 items-center gap-2.5 border-b border-[var(--line)] py-2.5"
                //   >
                //     {transaction.customer?.avatarUrl ? (
                //       <Image
                //         src={transaction.customer.avatarUrl}
                //         alt={customerName}
                //         width={48}
                //         height={48}
                //         className="size-9 shrink-0 rounded-full object-cover"
                //       />
                //     ) : (
                //       <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--line)] text-sm font-extrabold text-[var(--forest)]">
                //         {getInitials(customerName)}
                //       </span>
                //     )}

                //     <div className="min-w-0 flex-1">
                //       <p className="truncate text-sm font-bold leading-tight text-[var(--ink)]">
                //         {transaction.type === "sale"
                //           ? "Sale"
                //           : transaction.type === "repayment"
                //             ? "Repayment"
                //             : "Sale and repayment"}
                //       </p>

                //       <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium leading-tight text-[var(--muted)]">
                //         <span>{customerName}</span>
                //         <span aria-hidden="true">•</span>
                //         <time dateTime={transaction.createdAt}>
                //           {formatTransactionTime(transaction.createdAt)}
                //         </time>
                //       </div>
                //     </div>

                //     <div className="flex min-w-[88px] shrink-0 flex-col items-end justify-center text-right">
                //       <p className="text-md font-extrabold leading-tight tracking-tight text-[var(--forest)]">
                //         {formatNaira(transaction.amount)}
                //       </p>
                //       <p
                //         className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${transaction.statusColor}`}
                //       >
                //         {transaction.status}
                //       </p>
                //     </div>
                //   </article>
                // </Link>
              );
            })}
          </div>
        ))
      )}
    </section>
  );
}
