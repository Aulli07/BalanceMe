import { Dispatch, SetStateAction } from "react";
import type { Category, Customer, SaleTransaction } from "@/shared/types/domain";



export type EntryProps = {
  onNext?: () => void;
  setCustomer?: Dispatch<SetStateAction<Customer | undefined>>;
  customer?: Customer;
  setAmount?: Dispatch<SetStateAction<[string, string]>>;
  amount?: [string, string];
  setEntryType?: Dispatch<SetStateAction<1 | 0>>;
  entryType?: 0|1;
  selectedPurchase?: SaleTransaction;
  setSelectedPurchase?: Dispatch<SetStateAction<SaleTransaction | undefined>>;
  entryDescription?: entryDetailType;
  setEntryDescription?: Dispatch<SetStateAction<entryDetailType>>;
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
  category?: Category;
  description: string;
  dueDate?: string;
  receipt?: File;
}


