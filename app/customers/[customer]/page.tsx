import { getCustomer } from "@/shared/selectors/getters";
import { notFound } from "next/navigation"


export async function CustomerPage({
  params
}: {
  params: Promise<{ customerId: string }>;
}) {
  
  const { customerId } = await params;
  const customer = getCustomer(customerId);
  if (!customer) notFound();

  return (
    <main className="min-h-screen bg-[var-(--paper)] text-[var(--ink)}">

    </main>
  )
}