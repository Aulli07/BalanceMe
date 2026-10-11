import { EntryHeader } from "@/features/entries/components/entry-header";
import { EntryCustomer } from "@/features/entries/components/entry-customer";
import { EntryAmount } from "@/features/entries/components/entry-amount";

export function AddEntryPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <EntryHeader />
      <EntryCustomer />
      <EntryAmount />
    </main>
  );
}

export default AddEntryPage;