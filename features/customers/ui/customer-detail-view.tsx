import { AiInsight } from "./ai-insight";
import { BalanceCard } from "./balance-card";
import { CustomerProfile } from "./customer-profile";
import { CustomerStatsCards } from "./customer-stats";
import { DetailTopbar } from "./detail-topbar";
import { InteractionChart } from "./interaction-chart";
import { CustomerTransactionHistory } from "./transaction-history";
import type { CustomerDetailData } from "../types/types";

export function CustomerDetailView({
  customer,
  stats,
  months,
  transactions,
}: CustomerDetailData) {
  const totalHandled = stats.paidTotalKobo + stats.owesNowKobo;
  const repaidPercent = totalHandled
    ? Math.round((stats.paidTotalKobo / totalHandled) * 100)
    : 100;

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-28 text-[var(--ink)]">
      <section className="px-5 pt-5">
        <DetailTopbar />
        <CustomerProfile customer={customer} />
        <BalanceCard stats={stats} />
        <CustomerStatsCards stats={stats} />
        <AiInsight name={customer.name} repaidPercent={repaidPercent} />
        <InteractionChart months={months} stats={stats} />
        <CustomerTransactionHistory transactions={transactions} />
      </section>
    </main>
  );
}
