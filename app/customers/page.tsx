"use client";

import { useState } from "react";

import { mockCustomers } from "@/shared/data/domain-mock-data";
import type { Customer } from "@/shared/types/domain";
import { CustomerHeader } from "@/features/customers/components/customer-header";
import { CustomerInput } from "@/features/customers/components/customer-input";
import { CustomerFilter } from "@/features/customers/components/customer-filter";
import { CustomerSummary } from "@/features/customers/components/customer-summary";




export default function CustomersPage() {
  const [ visibleCustomers, setVisibleCustomers ] = useState<Customer[]>(mockCustomers);

  return (
    <main className="mt-5 px-5 min-h-[calc(100vh-5rem)] bg-[var(--paper)] text-[var(--ink)]">
      <CustomerHeader />
      <CustomerInput setVisibleCustomers={setVisibleCustomers} />
      <CustomerFilter setVisibleCustomers={setVisibleCustomers}/>
      <CustomerSummary visibleCustomers={visibleCustomers}/>
    </main>
  );
}
