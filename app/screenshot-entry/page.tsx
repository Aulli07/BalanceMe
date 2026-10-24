"use client";

import { AddEntryThree } from "@/features/entries/components/add-entry-three";
import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { ScreenshotEntryOne } from "@/features/entries/components/screenshot-entry-one";
import { ScreenshotEntryTwo } from "@/features/entries/components/screenshot-entry-two";
import { useEntryForm } from "@/features/entries/hooks/useEntryForm";



export function ScreenshotEntry() {
  const form = useEntryForm();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {form.step != 3 && <AddEntryHeader step={form.step} setStep={form.setStep} />}

      {form.step === 1 && (
        <ScreenshotEntryOne onNext={() => form.setStep(2)} />
      )}

      {form.step === 2 && (
        <ScreenshotEntryTwo
          onNext={() => form.setStep(3)}
          setCustomer={form.setCustomer}
          customer={form.customer}
          setAmount={form.setAmount}
          amount={form.amount}
          setEntryType={form.setEntryType}
          entryType={form.entryType}
          entryDescription={form.entryDescription}
          setEntryDescription={form.setEntryDescription}
        />
      )}

      {form.step === 3 && <AddEntryThree setStep={form.setStep} />}
    </main>
  )
}

export default ScreenshotEntry;