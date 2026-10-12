import { customerType } from "@/app/add-entry/page";
import { useState } from "react";
import { entryDetailType } from "../components/add-entry-two";


export function useEntryForm() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<customerType | undefined>(undefined);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [entryDescription, setEntryDescription] = useState<entryDetailType>({
    category: "",
    description: "",
  });

  return {
    amount,
    setAmount,
    step,
    setStep,
    customer,
    setCustomer,
    entryType,
    setEntryType,
    entryDescription,
    setEntryDescription,
  };  
};


export function useSpeechInputForm() {
  const [transcipt, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  
  const onStart = () => {
    console.log("It started")
  }

  const onStop = () => {
    console.log("It stopped")
  }

  return {
    transcipt,
    setTranscript,
    listening,
    setListening,
    onStart,
    onStop
  };
}