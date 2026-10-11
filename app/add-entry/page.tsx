import { AddEntryHeader, EntryHeader } from "@/features/entries/components/entry-header";
import {
  AddEntryOne,
  EntryCustomer,
} from "@/features/entries/components/add-entry-one";
import { AddEntryTwo, EntryAmount } from "@/features/entries/components/add-entry-two";
import { useState } from "react";

export type customerType = {
  name: string;
  image: string;
};

export function AddEntryPage() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [step, setStep] = useState<1 | 2>(1);
  const [customer, setCustomer] = useState<customerType>();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <AddEntryHeader step={step} />

      {step === 1 && (
        <AddEntryOne
          setCustomer={setCustomer}
          customer={customer}
          setStep={setStep}
          setAmount={setAmount}
          setEntryType={setEntryType}
        />
      )}

      {step === 2 && (
        <AddEntryTwo
          customer={customer}
          step={step}
          amount={amount}
          entryType={entryType}
        />
      )}
    </main>
  );
}

export default AddEntryPage;
