"use client";

import { AddEntryHeader } from "@/features/entries/components/entry-header";
import { VoiceEntryOne } from "@/features/entries/components/voice-entry-one";
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
        transcript={voicedInput.transcipt}
        onStart={voicedInput.onStart}
        onStop={voicedInput.onStop}
        onNext={() => form.setStep(2)}
      />
    ) }
    </main>
  )
}

export default VoiceEntry;