import { notFound } from "next/navigation";
import { getCustomer, getCustomerFormattedRecentTransactions } from "@/shared/selectors/customer-getters";
// import { getCustomerStats } from "@/features/customers/selectors/get-customer-stats";
import { getCustomerMonthlyActivity } from "@/features/customers/selectors/get-customer-monthly-activity";
import { AiInsight } from "@/features/customers/ui/ai-insight";
import { BalanceCard } from "@/features/customers/ui/balance-card";
import { CustomerProfile } from "@/features/customers/ui/customer-profile";
import { CustomerStatsCards } from "@/features/customers/ui/customer-stats";
import { DetailTopbar } from "@/features/customers/ui/detail-topbar";
import { InteractionChart } from "@/features/customers/ui/interaction-chart";
import { CustomerTransactionHistory } from "@/features/customers/ui/transaction-history";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { getCollectedAmountForCustomer } from "@/features/transactions/selectors/get-collected-amounts";
import { getTotalAmountOwedForCustomer } from "@/shared/selectors/customer-owe-getters";



export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = getCustomer(customerId);
  if (!customer) notFound();

  const transactions = getCustomerFormattedRecentTransactions(customer.id, ACTIVE_BUSINESS_ID);
  const { months } = getCustomerMonthlyActivity(customer.id, ACTIVE_BUSINESS_ID);

  const paidTotalAmount = getCollectedAmountForCustomer(ACTIVE_BUSINESS_ID, customer.id);
  const owesNowAmount = getTotalAmountOwedForCustomer(ACTIVE_BUSINESS_ID, customer.id);

  const totalHandled = paidTotalAmount + owesNowAmount;
  const repaidPercent = totalHandled
    ? Math.round((paidTotalAmount / totalHandled) * 100)
    : 100;

  const stats = {
    paidTotalAmount,
    transactionCount: transactions.length,
    owesNowAmount,
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-28 text-[var(--ink)]">
      <section className="px-5 pt-5">
        <DetailTopbar />
        <CustomerProfile customer={customer} />
        <BalanceCard
          repaidPercent={repaidPercent}
          owesNowAmount={owesNowAmount}
          paidTotalAmount={paidTotalAmount}
        />
        <CustomerStatsCards stats={stats} />
        <AiInsight name={customer.name} repaidPercent={repaidPercent} />
        <InteractionChart months={months} stats={stats} />
        <CustomerTransactionHistory transactions={transactions} />
      </section>
    </main>
  );
}
