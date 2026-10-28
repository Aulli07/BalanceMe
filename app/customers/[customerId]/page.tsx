import { CustomerHero } from "@/features/customers/components/customer-hero";
import { getCustomer } from "@/shared/selectors/getters";
import { notFound } from "next/navigation";

export default async function CustomerPage({
  params
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = getCustomer(customerId);

  if (!customer) notFound();

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 pt-5 text-[var(--ink)]">
      <CustomerHero customer={customer} />
    </main>
  );
}
