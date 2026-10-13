import { EntryProps, VoiceEntryProps } from "../types/entry-type";
import { VoiceEntryTwo } from "./voice-entry-two";


export function ScreenshotEntryTwo({
  onNext,
  setCustomer,
  customer,
  setAmount,
  amount,
  setEntryType,
  entryType,
  entryDescription,
  setEntryDescription
}: EntryProps) {
  return (
    <VoiceEntryTwo 
      onNext={onNext}
      setCustomer={setCustomer}
      customer={customer}
      setAmount={setAmount}
      amount={amount}
      setEntryType={setEntryType}
      entryType={entryType}
      entryDescription={entryDescription}
      setEntryDescription={setEntryDescription}
    />
  )
}