import { formatNaira } from "@/shared/utils/format-naira";

export function SaleAmounts({
  productPrice,
  amountPaid,
  balance,
  tag
}: {
  productPrice: number;
  amountPaid: number;
  balance?: number;
  tag?: string
}) {
  return (
    <div
      className={`mt-4 grid gap-3 ${balance === undefined ? "grid-cols-2" : "grid-cols-2"}`}
    >
      {tag === "sale" && <AmountCard label="Amount paid" value={formatNaira(amountPaid)} />}
      <AmountCard label="Purchase price" value={formatNaira(productPrice)} />
      {balance !== undefined && (
        <AmountCard
          label="Amount to repay"
          value={formatNaira(balance)}
          highlighted
        />
      )}
    </div>
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
