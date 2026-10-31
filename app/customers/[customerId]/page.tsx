import { notFound } from "next/navigation";
import { getCustomer } from "@/shared/selectors/getters";
import { getCustomerStats } from "@/features/customers/selectors/get-customer-stats";
import { getCustomerRecentTransactions } from "@/features/customers/selectors/get-customer-transactions";
import { getCustomerMonthlyActivity } from "@/features/customers/selectors/get-customer-monthly-activity";
import { CustomerDetailHeader } from "@/features/customers/components/customer-detail-header";
import { CustomerProfileCard } from "@/features/customers/components/customer-profile-card";
import { CustomerActions } from "@/features/customers/components/customer-actions";
import { CustomerFinancialSummary } from "@/features/customers/components/customer-financial-summary";
import { CustomerInteractions } from "@/features/customers/components/customer-interactions";
import { CustomerTransactionHistory } from "@/features/customers/components/customer-transaction-history";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = getCustomer(customerId);
  if (!customer) notFound();

  const stats = getCustomerStats(customer.id);
  const transactions = getCustomerRecentTransactions(customer.id, 3);
  const { months, averagePerMonth } = getCustomerMonthlyActivity(customer.id);

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 pt-5 text-[var(--ink)]">
      <CustomerDetailHeader />
      <CustomerProfileCard customer={customer} />
      <CustomerActions phone={customer.phone} />
      <CustomerFinancialSummary stats={stats} />
      <CustomerInteractions
        months={months}
        averagePerMonth={averagePerMonth}
      />
      <CustomerTransactionHistory transactions={transactions} />
    </main>
  );
}
