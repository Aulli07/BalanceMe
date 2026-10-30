import Image from "next/image";
import type { Customer } from "@/shared/types/domain";
import { getInitials } from "@/features/transactions/utils/get-name-initials";
import { getCustomerStats } from "../selectors/get-customer-stats";
import { getLastActivityLabel } from "../selectors/get-last-activity-label";

export function CustomerProfileCard({ customer }: { customer: Customer }) {
  const stats = getCustomerStats(customer.id);
  const lastActivity = getLastActivityLabel(customer.id);

  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
          Customer profile
        </p>
        <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-semibold text-[var(--muted)]">
          Sample profile
        </span>
      </div>

      <div className="mt-4 flex items-start gap-4">
        {customer.avatarUrl ? (
          <Image
            src={customer.avatarUrl}
            alt={customer.name}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[var(--forest)] text-lg font-extrabold text-white">
            {getInitials(customer.name)}
          </div>
        )}

        <div className="min-w-0 pt-0.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">
            {customer.name}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            🏪 Customer at your shop
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[13px] text-[var(--muted)]">
        <span>📋 {stats.transactionCount} transactions</span>
        <span>⏱ {lastActivity}</span>
      </div>
    </section>
  );
}

