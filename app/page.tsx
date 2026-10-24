import { Header } from "@/shared/components/header";

import { BusinessPulse } from "@/features/dashboard/components/business-pulse";

import { CashRecorded } from "@/features/dashboard/components/cash-recorded";
import { CustomersOwing } from "@/features/dashboard/components/customer-owe";
import { Greeting } from "@/features/dashboard/components/greeting";
import { PinnedCustomers } from "@/features/dashboard/components/pinned-customers";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";




export default function Home() {
  return (
    <main className="bg-[var(--paper)] px-6 pb-18 pt-3 text-[var(--ink)]">
      <Header />
      <Dashboard />
    </main>
  );
}

export function Dashboard() {
  return (
    <section className="grid gap-3 pb-6">
      <Greeting businessId={ACTIVE_BUSINESS_ID} />
      <CashRecorded businessId={ACTIVE_BUSINESS_ID}/>
      <CustomersOwing businessId={ACTIVE_BUSINESS_ID}/>
      <PinnedCustomers businessId={ACTIVE_BUSINESS_ID}/>
      <BusinessPulse businessId={ACTIVE_BUSINESS_ID} />
    </section>
  );
}
