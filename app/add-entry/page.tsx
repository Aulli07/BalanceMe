"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { AddEntryOne } from "@/features/entries/components/add-entry-one";
import { AddEntryTwo } from "@/features/entries/components/add-entry-two";
import { AddEntryThree } from "@/features/entries/components/add-entry-three";
import { useEntryForm } from "@/features/entries/hooks/useEntryForm";
import { mockCustomers } from "@/shared/data/domain-mock-data";




export function AddEntryPage() {
  return (
    <Suspense fallback={null}>
      <AddEntryPageContent />
    </Suspense>
  );
}

function AddEntryPageContent() {
  const searchParams = useSearchParams();
  const preselectedCustomer = mockCustomers.find(
    (customer) => customer.id === searchParams.get("customerId"),
  );
  const isRepayment = searchParams.get("mode") === "repayment";
  const isSale = searchParams.get("mode") === "sale";

  const form = useEntryForm({
    initialCustomer: preselectedCustomer,
    initialEntryType: isRepayment ? 1 : isSale ? 0 : 2,
  });
  
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {form.step !== 3 && <AddEntryHeader step={form.step} setStep={form.setStep} />}

      {form.step === 1 && (
        <AddEntryOne form={form} />
      )}

      {form.step === 2 && (
        <AddEntryTwo form={form} />
      )}

      {form.step === 3 && <AddEntryThree setStep={form.setStep} />}

    </main>
  );
}

export default AddEntryPage;
