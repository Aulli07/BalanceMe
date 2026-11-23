import { Dispatch, SetStateAction } from "react";
import type { Customer, SaleTransaction } from "@/shared/types/domain";



export type EntryProps = {
  onNext?: () => void;
  setCustomer?: Dispatch<SetStateAction<Customer | undefined>>;
  customer?: Customer;
  purchaseAmount?: string;
  setPurchaseAmount?: Dispatch<SetStateAction<string>>;
  amountPaid?: string;
  setAmountPaid?: Dispatch<SetStateAction<string>>;
  amountRepaid?: string;
  setAmountRepaid?: Dispatch<SetStateAction<string>>;
  setEntryType?: Dispatch<SetStateAction<2| 1 | 0>>;
  entryType?: 0|1|2;
  selectedPurchase?: SaleTransaction;
  setSelectedPurchase?: Dispatch<SetStateAction<SaleTransaction | undefined>>;
  description?: string;
  setDescription?: Dispatch<SetStateAction<string>>;
  dueDate?: string;
  setDueDate?: Dispatch<SetStateAction<string>>;
  receipt?: File;
  setReceipt?: Dispatch<SetStateAction<File | undefined>>;
  setStep?: Dispatch<SetStateAction<1|2|3>>;
}

export type VoiceEntryProps = {
  setTranscript: Dispatch<SetStateAction<string>>;
  transcript: string;
  listening: boolean;
  start: () => void;
  stop: () => void;
  onNext: () => void;
};

export type entryDetailType = {
  description: string;
  dueDate?: string;
  receipt?: File;
}


