import { CustomerHeader } from "@/features/customers/components/customer-header";
import { CustomerList } from "@/features/customers/components/customer-list";
import { CustomerSummary } from "@/features/customers/components/customer-summary";

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <CustomerHeader />
      <div className="px-5 pb-8 pt-2">
        <CustomerSummary />
        <CustomerList />
      </div>
    </main>
  );
}
