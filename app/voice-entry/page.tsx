"use client";

import { AddEntryThree } from "@/features/entries/components/add-entry-three";
import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { VoiceEntryOne } from "@/features/entries/components/voice-entry-one";
import { VoiceEntryTwo } from "@/features/entries/components/voice-entry-two";
import { useEntryForm, useSpeechInputForm } from "@/features/entries/hooks/useEntryForm";
import { useState } from "react";

export function VoiceEntry() {
  const form = useEntryForm();
  const voicedInput = useSpeechInputForm();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {form.step != 3 && <AddEntryHeader step={form.step} setStep={form.setStep} />}

    {form.step === 1 && (
      <VoiceEntryOne
        setTranscript={voicedInput.setTranscript}
        transcript={voicedInput.transcript}
        listening={voicedInput.listening}
        onStart={voicedInput.onStart}
        onStop={voicedInput.onStop}
        onNext={() => form.setStep(2)}
      />
    )}

    {form.step === 2 && (
      <VoiceEntryTwo 
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

export default VoiceEntry;