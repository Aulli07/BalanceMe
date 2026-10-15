"use client";

import { useState } from "react";
import { entryDetailType } from "../types/entry-type";
import { Customer } from "@/features/customers/data/customers";


export function useEntryForm() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [entryDescription, setEntryDescription] = useState<entryDetailType>({ category: "", description: "", });
  
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedTrigger, isSelectedTrigger] = useState(false);

  const updateDescription = (field: keyof entryDetailType, value: string | File | undefined) => {
    setEntryDescription((current: entryDetailType) => ({
      ...current,
      [field]: value,
    }))
  }

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
    updateDescription,
    setCategoryPickerOpen, 
    categoryPickerOpen,
    selectedTrigger,
    isSelectedTrigger

  };  
};








