import { LuCircleAlert, LuUsersRound } from "react-icons/lu";

import { getDebtDashboardSummary } from "../selectors/get-customers-owing";
import { formatNaira } from "@/shared/utils/format-naira";

export function TotalOwed({ businessId }: { businessId: string }) {
  const { totalOwedAmount, totalOverdueAmount, customers } =
    getDebtDashboardSummary(businessId);
  const customerCount = customers.length;
  const nobodyOwes = totalOwedAmount === 0;

  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--forest)] p-5 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -right-30 h-85 w-80 rounded-full bg-white/5"
      />
      <h2 className="flex items-center gap-1.5 text-xs font-bold text-[#e7efe1]">
        <LuUsersRound className="size-3.5" aria-hidden="true" />
        Total owed to you
      </h2>
      <p className="mt-5 text-4xl font-bold tracking-tight text-[var(--lime)]">
        {formatNaira(totalOwedAmount)}
      </p>

      {nobodyOwes ? (
        <p className="mt-3 text-sm font-semibold text-[#e7efe1]">
          Nobody owes you right now
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm font-semibold text-[#e7efe1]">
            {customerCount} {customerCount === 1 ? "customer" : "customers"} owing
          </p>
          <p
            className={
              totalOverdueAmount > 0
                ? "mt-2 relative flex items-center justify-end gap-1.5 text-sm font-bold text-[#ffd4b5]"
                : "mt-2 text-sm font-semibold text-[#dce8d5]"
            }
          >
            {totalOverdueAmount > 0 && (
              <LuCircleAlert className="size-4 shrink-0" aria-hidden="true" />
            )}
            {totalOverdueAmount > 0
              ? `${formatNaira(totalOverdueAmount)} overdue`
              : "Nothing overdue"}
          </p>
        </>
      )}
    </article>
  );
}
