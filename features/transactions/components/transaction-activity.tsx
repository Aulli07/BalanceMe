import { LuArrowDownLeft, LuClock3 } from "react-icons/lu";

type Transaction = {
  initials: string;
  avatarColor: string;
  category: string;
  description: string;
  customer: string;
  amount: string;
  status?: string;
  statusColor?: string;
};

const transactions: Record<string, Transaction[]> = {
  Today: [
    {
      initials: "AM",
      avatarColor: "bg-[#e2ecd7] text-[var(--forest)]",
      category: "Product sale",
      description: "Household supplies",
      customer: "Adaeze M.",
      amount: "₦45,000",
      status: "Paid",
      statusColor: "bg-[#e9f1df] text-[#568044]",
    },
    {
      initials: "KO",
      avatarColor: "bg-[#f2e3d8] text-[#805644]",
      category: "Service",
      description: "Logo design",
      customer: "Kemi O.",
      amount: "₦18,500",
      status: "Owes ₦6,500",
      statusColor: "bg-[#f8ead5] text-[#855126]",
    },
  ],
  Yesterday: [
    {
      initials: "NC",
      avatarColor: "bg-[#e0e9ed] text-[#456076]",
      category: "Product sale",
      description: "Office supplies",
      customer: "Nneka C.",
      amount: "₦32,000",
      status: "Paid",
      statusColor: "bg-[#e9f1df] text-[#568044]",
    },
    {
      initials: "EO",
      avatarColor: "bg-[#f2eccf] text-[#79652e]",
      category: "Consultation",
      description: "Business advisory",
      customer: "Emeka O.",
      amount: "₦12,000",
      status: "Owes ₦4,000",
      statusColor: "bg-[#f8ead5] text-[#855126]",
    },
  ],
};

export function TransactionActivity() {
  return (
    <section className="flex flex-col gap-4 px-5 pt-5" aria-labelledby="activity-heading">

      {Object.entries(transactions).map(([day, dayTransactions]) => (
        <div key={day}>
          <h3 className="mb-0.5 px-0.5 text-sm font-bold tracking-tight text-[#829082]">
            {day}
          </h3>

          {dayTransactions.map((transaction) => (
            <article
              key={`${day}-${transaction.customer}`}
              className="flex min-h-18 items-center gap-2.5 border-b border-[#e8ebdf] py-2.5"
            >
              <div
                className={`grid size-12 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${transaction.avatarColor}`}
                aria-hidden="true"
              >
                {transaction.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold leading-tight text-[#294735]">
                  {transaction.category}
                </p>
                <p className="mt-1 truncate text-xs font-medium leading-tight text-[#778477]">
                  {transaction.description}
                </p>
                <p className="mt-1 truncate text-xs font-semibold leading-tight text-[#516753]">
                  {transaction.customer}
                </p>
              </div>
              <div className="flex min-w-[75px] shrink-0 flex-col items-end justify-center text-right">
                <p className="flex items-center gap-1 text-md font-extrabold leading-tight tracking-tight text-[var(--forest)]">
                  {transaction.amount}
                </p>
                {transaction.status && (
                  <span className={`mt-1 flex place-items-center items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-bold leading-none ${transaction.statusColor}`}>
                    {transaction.status.includes("Owes") && <LuClock3 className="size-2.5" aria-hidden="true" />}
                    {transaction.status}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
