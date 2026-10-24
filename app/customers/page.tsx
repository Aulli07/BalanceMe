"use client";

import { useState } from "react";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import type { Customer } from "@/shared/types/domain";

import { CustomerHeader } from "@/features/customers/components/customer-header";
import { CustomerInput } from "@/features/customers/components/customer-input";
import { CustomerFilter } from "@/features/customers/components/customer-filter";
import { CustomerSummary } from "@/features/customers/components/customer-summary";

import { getCustomers } from "@/shared/selectors/getters";




export default function CustomersPage() {
  const customers = getCustomers(ACTIVE_BUSINESS_ID)
  const [ visibleCustomers, setVisibleCustomers ] = useState<Customer[]>(customers);

  return (
    <main className="mt-5 px-5 min-h-[calc(100vh-5rem)] bg-[var(--paper)] text-[var(--ink)]">
      <CustomerHeader />
      <CustomerInput setVisibleCustomers={setVisibleCustomers} />
      <CustomerFilter setVisibleCustomers={setVisibleCustomers}/>
      <CustomerSummary visibleCustomers={visibleCustomers}/>
    </main>
  );
}
