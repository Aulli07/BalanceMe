import { formatNaira } from "@/shared/utils/format-naira";
import type { NairaKobo } from "@/shared/types/domain";

type TransactionDetailsOverviewProps = {
  amount: NairaKobo;
  type: "payment" | "sale";
  createdAt: string;
};

export function TransactionDetailsOverview({
  amount,
  type,
  createdAt,
}: TransactionDetailsOverviewProps) {
  const isPayment = type === "payment";
  const date = new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date(createdAt));

  return (
    <section className="mt-10 flex min-h-72 flex-col px-5" aria-label="Transaction overview">
      <div>
        <p className="text-sm font-bold text-[var(--forest-soft)]">
          {isPayment ? "Payment received" : "Sale recorded"}
        </p>
        <p className="mt-2 text-5xl font-extrabold leading-none tracking-tight text-[var(--forest)]">
          {formatNaira(amount)}
        </p>
      </div>

      <time
        dateTime={createdAt}
        className="mt-auto border-t border-[var(--line)] pt-4 text-sm font-medium text-[var(--muted)]"
      >
        {date}
      </time>
    </section>
  );
}
