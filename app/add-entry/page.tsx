"use client";

import { AddEntryHeader } from "@/features/entries/components/entry-header";
import {
  AddEntryOne,
} from "@/features/entries/components/add-entry-one";
import {
  AddEntryTwo,
  type entryDetailType,
} from "@/features/entries/components/add-entry-two";
import { AddEntryThree } from "@/features/entries/components/add-entry-three";
import { useState } from "react";

export type customerType = {
  name: string;
  image: string;
};

export function AddEntryPage() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<customerType>();
  const [entryDescription, setEntryDescription] = useState<entryDetailType>({
    category: "",
    description: "",
    receipt: undefined,
  });


  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {step !== 3 && <AddEntryHeader step={step} setStep={setStep} />}

      {step === 1 && (
        <AddEntryOne
          setCustomer={setCustomer}
          customer={customer}
          setStep={setStep}
          setAmount={setAmount}
          amount={amount}
          setEntryType={setEntryType}
          entryType={entryType}
        />
      )}

      {step === 2 && (
        <AddEntryTwo
          customer={customer}
          amount={amount}
          entryType={entryType}
          entryDescription={entryDescription}
          setEntryDescription={setEntryDescription}
          setStep={setStep}
        />
      )}

      {step === 3 && <AddEntryThree setStep={setStep} />}

    </main>
  );
}

export default AddEntryPage;
