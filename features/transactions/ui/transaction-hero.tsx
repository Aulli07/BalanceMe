import { formatNaira } from "@/shared/utils/format-naira";

export function TransactionHero({
  tag,
  amountLabel,
  amount,
}: {
  tag: string;
  amountLabel: string;
  amount: number;
}) {
  return (
    <div className="rounded-[1.75rem] bg-[var(--forest)] p-6 text-white shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="space-y-4">
          <p className="text-sm font-medium text-white/70">{amountLabel}</p>
          <p className="mt-1 text-3xl font-extrabold leading-none tracking-tight text-[var(--lime)]">
            {formatNaira(amount)}
          </p>
        </div>
        <span className="items-start self-start rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
          {tag}
        </span>
      </div>
    </div>
  );
}
