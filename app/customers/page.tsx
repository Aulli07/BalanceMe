"use client";

import { useState } from "react";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import type { Customer } from "@/shared/types/domain";

import { CustomerHeader } from "@/features/customers/components/customer-header";
import { CustomerInput } from "@/features/customers/components/customer-input";
import { CustomerFilter } from "@/features/customers/components/customer-filter";
import { CustomerSummary } from "@/features/customers/components/customer-summary";
import { AddCustomerSheet } from "@/features/customers/components/add-customer-sheet";

import { getCustomers } from "@/shared/selectors/getters";

export default function CustomersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const customers = getCustomers(ACTIVE_BUSINESS_ID);
  const [visibleCustomers, setVisibleCustomers] = useState<Customer[]>(customers);
  const [addOpen, setAddOpen] = useState(false);

  function handleCustomerAdded() {
    const updated = getCustomers(ACTIVE_BUSINESS_ID);
    setVisibleCustomers(updated);
    setRefreshKey((k) => k + 1);
  }

  return (
    <main className="mt-5 px-5 min-h-[calc(100vh-5rem)] bg-[var(--paper)] text-[var(--ink)]">
      <CustomerHeader onAddCustomer={() => setAddOpen(true)} />
      <CustomerInput key={`input-${refreshKey}`} setVisibleCustomers={setVisibleCustomers} />
      <CustomerFilter key={`filter-${refreshKey}`} setVisibleCustomers={setVisibleCustomers} />
      <CustomerSummary visibleCustomers={visibleCustomers} />
      <AddCustomerSheet
        open={addOpen}
        setOpen={setAddOpen}
        onCustomerAdded={handleCustomerAdded}
      />
    </main>
  );
}
