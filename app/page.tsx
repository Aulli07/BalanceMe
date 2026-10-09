import {
  LuCalendarDays,
  LuChevronDown,
  LuTrendingUp,
  LuUsersRound,
} from "react-icons/lu";
import { Header } from "@/shared/components/header";
import { BusinessPulse } from "@/features/analytics/components/business-pulse";
import { businessPulses } from "@/features/analytics/data/business-pulses";

export default function Home() {
  return (
    <main className="bg-[var(--paper)] px-6 pt-3 text-[var(--ink)]">
      <Header />
      <Hero />
    </main>
  );
}

export function Hero() {
  return (
    <section>
      <h1 className="mb-3 mt-3 whitespace-nowrap text-xl font-bold leading-tight tracking-tight text-[var(--ink)]">
        Good morning, Adaeze
      </h1>
      <Dashboard />
    </section>
  );
}

export function Dashboard() {
  return (
    <section className="grid gap-3 pb-6">
      <CashRecorded />
      <CustomersOwing />
      <BusinessPulse data={businessPulses} />
    </section>
  );
}

export function CashRecorded() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--forest)] p-5 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/10">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -right-30 h-85 w-80 rounded-full  bg-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-20 h-65 w-60 rounded-full bg-[var(--forest)] transparent" />

      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold">
          <LuCalendarDays className="size-3.5" aria-hidden="true" />
          Cash recorded
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-lime-100"
          aria-label="Change cash recording period"
        >
          Today
          <LuChevronDown className="size-3" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-5 text-4xl font-bold tracking-tight text-[var(--lime)]">
        ₦286,450
      </p>
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-green-100">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[var(--lime)]">
          <LuTrendingUp className="size-3.5" aria-hidden="true" />
          2.4% up yesterday
        </span>
      </div>
    </article>
  );
}

const customers = [
  { initials: "AM", className: "bg-green-100 text-green-900" },
  { initials: "KO", className: "bg-orange-100 text-orange-900" },
  { initials: "NC", className: "bg-blue-100 text-blue-900" },
  { initials: "EO", className: "bg-amber-100 text-amber-900" },
];

export function CustomersOwing() {
  return (
    <article className="rounded-3xl border border-red-400 bg-red-100 py-3 px-4 text-[var(--ink)]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold text-red-900">
          <LuUsersRound className="size-3.5" aria-hidden="true" />
          Customers owe you
        </h2>
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
          3 overdue
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-2xl font-bold tracking-tight text-red-950">₦74,500</p>
        <div className="flex items-center pl-1" aria-label="Customers who owe money">
          {customers.map((customer) => (
            <span
              key={customer.initials}
              className={`-ml-1 grid size-8 place-items-center rounded-full border-2 border-red-50 text-xs font-bold first:ml-0 ${customer.className}`}
            >
              {customer.initials}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
