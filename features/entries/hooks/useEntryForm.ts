"use client";

import { useState } from "react";
import type { Customer, SaleTransaction } from "@/shared/types/domain";
import { entryDetailType } from "../types/entry-type";

type EntryFormOptions = {
  initialCustomer?: Customer;
  initialEntryType?: 0 | 1;
};

export function useEntryForm({
  initialCustomer,
  initialEntryType = 0,
}: EntryFormOptions = {}) {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<Customer | undefined>(initialCustomer);
  const [entryType, setEntryType] = useState<0 | 1>(initialEntryType);
  const [selectedPurchase, setSelectedPurchase] = useState<SaleTransaction | undefined>();
  const [entryDescription, setEntryDescription] = useState<entryDetailType>({ description: "" });
  
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedTrigger, isSelectedTrigger] = useState(false);

  const updateDescription = <Field extends keyof entryDetailType>(field: Field, value: entryDetailType[Field]) => {
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
    selectedPurchase,
    setSelectedPurchase,
    entryDescription,
    setEntryDescription,
    updateDescription,
    setCategoryPickerOpen, 
    categoryPickerOpen,
    selectedTrigger,
    isSelectedTrigger

  };  
};








