"use client";

import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { ScreenshotEntryOne } from "@/features/entries/components/screenshot-entry-one";
import { useEntryForm } from "@/features/entries/hooks/useEntryForm";

export function ScreenshotEntry() {
  const form = useEntryForm();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {form.step != 3 && <AddEntryHeader step={form.step} setStep={form.setStep} />}

      {form.step === 1 && (
        <div>
          <ScreenshotEntryOne onNext={() => form.setStep(2)} />
        </div>
      )}
    </main>
  )
}

export default ScreenshotEntry;