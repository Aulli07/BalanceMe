"use client";

import { useState } from "react";
import { LuChevronRight, LuSearch } from "react-icons/lu";

import { filters } from "@/features/customers/data/customers";
import { filterCustomers } from "@/features/customers/selectors/filter-customers";
import { getCustomerSaleTransactionCount } from "@/features/customers/selectors/get-customer-txn-count";
import Link from "next/link";
import { mockCustomers } from "@/shared/data/domain-mock-data";
import type { Customer } from "@/shared/types/domain";

export default function CustomersPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [visibleCustomers, setVisibleCustomers] =
    useState<Customer[]>(mockCustomers);

  function handleChange(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    const found = mockCustomers.filter(
      (customer) =>
        !normalizedQuery ||
        customer.name.toLowerCase().includes(normalizedQuery),
    );

    setVisibleCustomers(found);
  }

  return (
    <main className="mt-5 px-5 min-h-[calc(100vh-5rem)] bg-[var(--paper)] text-[var(--ink)]">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
          Customers
        </h1>

        <label className="flex h-12 items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[var(--muted)] shadow-sm shadow-[var(--forest)]/5 focus-within:border-[var(--forest-soft)] focus-within:ring-4 focus-within:ring-[var(--lime)]/20">
          <LuSearch className="size-4.5 shrink-0" aria-hidden="true" />
          <span className="sr-only">Search Customers</span>
          <input
            type="search"
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Search customers"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
        </label>

        <div
          className="flex items-center overflow-x-auto gap-2"
          role="group"
          aria-label="Filter notifications"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveFilter(filter);
                  const filtered = filterCustomers(filter);
                  setVisibleCustomers(filtered);
                }}
                className={`px-4 py-1.5 rounded-xl text-[13px] font-bold transition ${
                  isActive
                    ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
                    : "text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--forest)]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </header>

      <div className="border-t border-[#e8ebdf] mt-5">
        {visibleCustomers.map((customer) => (
          <Link
            href={`/customers/${customer.id}`}
            key={customer.id}
            type="button"
            className="flex min-h-17 w-full items-center gap-2.5 border-b border-[#e8ebdf] px-0.5 py-2 text-left transition-colors active:bg-[#e8eddd]/50"
            aria-label={`Preview ${customer.name}`}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#e2ecd7] text-sm font-extrabold text-[var(--forest)]">
              {customer.name.slice(0, 2).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-bold leading-tight text-[#294735]">
                {customer.name}
              </span>
              <span className="mt-1 block truncate text-xs font-medium leading-tight text-[#778477]">
                {getCustomerSaleTransactionCount(customer.id)} recorded
                transactions
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              {customer.pinned && (
                <span className="inline-flex min-h-6 items-center rounded-[7px] bg-[#e2ecd7] px-1.5 text-[10px] font-bold leading-none text-[var(--forest)]">
                  Pinned
                </span>
              )}
              <LuChevronRight
                className="size-5 text-[#9aa695] opacity-60"
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
