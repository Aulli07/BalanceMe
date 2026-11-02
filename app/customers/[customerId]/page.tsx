import { notFound } from "next/navigation";
import { getCustomer } from "@/shared/selectors/getters";
import { getCustomerStats } from "@/features/customers/selectors/get-customer-stats";
import { getCustomerRecentTransactions } from "@/features/customers/selectors/get-customer-transactions";
import { getCustomerMonthlyActivity } from "@/features/customers/selectors/get-customer-monthly-activity";
import { AiInsight } from "@/features/customers/ui/ai-insight";
import { BalanceCard } from "@/features/customers/ui/balance-card";
import { CustomerProfile } from "@/features/customers/ui/customer-profile";
import { CustomerStatsCards } from "@/features/customers/ui/customer-stats";
import { DetailTopbar } from "@/features/customers/ui/detail-topbar";
import { InteractionChart } from "@/features/customers/ui/interaction-chart";
import { CustomerTransactionHistory } from "@/features/customers/ui/transaction-history";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = getCustomer(customerId);
  if (!customer) notFound();

  const stats = getCustomerStats(customer.id);
  const transactions = getCustomerRecentTransactions(customer.id);
  const { months } = getCustomerMonthlyActivity(customer.id);
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
