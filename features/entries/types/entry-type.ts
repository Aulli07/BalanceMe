import { Dispatch, SetStateAction } from "react";



export type EntryProps = {
  onNext?: () => void;
  setCustomer?: Dispatch<SetStateAction<customerType | undefined>>;
  customer?: customerType | undefined;
  setAmount?: Dispatch<SetStateAction<[string, string]>>;
  amount?: [string, string];
  setEntryType?: Dispatch<SetStateAction<1 | 0>>;
  entryType?: 0|1;
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
  category: string;
  description: string;
  receipt?: File;
}

export type customerType = {
  name: string;
  image: string;
};

