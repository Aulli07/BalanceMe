import { Header } from "@/shared/components/header";

// import { BusinessPulse } from "@/features/dashboard/components/business-pulse";
import { Greeting } from "@/features/dashboard/components/greeting";
import { TotalOwed } from "@/features/dashboard/components/total-owed";
import { WhoOwesYou } from "@/features/dashboard/components/who-owes-you";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";

export const dynamic = "force-dynamic";



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
      <TotalOwed businessId={ACTIVE_BUSINESS_ID} />
      <WhoOwesYou businessId={ACTIVE_BUSINESS_ID} />
      {/* <BusinessPulse businessId={ACTIVE_BUSINESS_ID} /> */}
    </section>
  );
}
