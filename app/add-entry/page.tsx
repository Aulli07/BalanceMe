"use client";

import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { AddEntryOne } from "@/features/entries/components/add-entry-one";
import { AddEntryTwo } from "@/features/entries/components/add-entry-two";
import { AddEntryThree } from "@/features/entries/components/add-entry-three";
import { useEntryForm } from "@/features/entries/hooks/useEntryForm";




export function AddEntryPage() {
  const form = useEntryForm();
  
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {form.step !== 3 && <AddEntryHeader step={form.step} setStep={form.setStep} />}

      {form.step === 1 && (
        <AddEntryOne
          setCustomer={form.setCustomer}
          customer={form.customer}
          setStep={form.setStep}
          setAmount={form.setAmount}
          amount={form.amount}
          setEntryType={form.setEntryType}
          entryType={form.entryType}
        />
      )}

      {form.step === 2 && (
        <AddEntryTwo
          customer={form.customer}
          amount={form.amount}
          entryType={form.entryType}
          entryDescription={form.entryDescription}
          setEntryDescription={form.setEntryDescription}
          setStep={form.setStep}
        />
      )}

      {form.step === 3 && <AddEntryThree setStep={form.setStep} />}

    </main>
  );
}

export default AddEntryPage;
