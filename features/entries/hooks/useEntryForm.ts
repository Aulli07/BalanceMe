"use client";

import { useState } from "react";
import type { Customer, SaleTransaction } from "@/shared/types/domain";

type EntryFormOptions = {
  initialCustomer?: Customer;
  initialEntryType?: 0 | 1 | 2;
};

export function useEntryForm({
  initialCustomer,
  initialEntryType = 0,
}: EntryFormOptions = {}): FormType {
  const [productPrice, setProductPrice] = useState("0");
  const [amountPaid, setAmountPaid] = useState("0");
  const [amountRepaid, setAmountRepaid] = useState("0");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<Customer | undefined>(initialCustomer);

  const [entryType, setEntryType] = useState<0 | 1 | 2>(initialEntryType);
  const [debtRepaymentMode, setDebtRepaymentMode] = useState<0 | 1>(0);
  
  const [selectedPurchase, setSelectedPurchase] = useState<SaleTransaction | undefined>();
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [receipt, setReceipt] = useState<File | undefined>();
  
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedTrigger, isSelectedTrigger] = useState(false);

  return {
    productPrice,
    setProductPrice,
    amountPaid,
    setAmountPaid,
    amountRepaid,
    setAmountRepaid,
    step,
    setStep,
    customer,
    setCustomer,
    entryType,
    setEntryType,
    debtRepaymentMode,
    setDebtRepaymentMode,
    selectedPurchase,
    setSelectedPurchase,
    description,
    setDescription,
    dueDate,
    setDueDate,
    receipt,
    setReceipt,
    setCategoryPickerOpen, 
    categoryPickerOpen,
    selectedTrigger,
    isSelectedTrigger

  };  
};

export type FormType = {
  productPrice: string;
  setProductPrice: React.Dispatch<React.SetStateAction<string>>;
  amountPaid: string;
  setAmountPaid: React.Dispatch<React.SetStateAction<string>>;
  amountRepaid: string;
  setAmountRepaid: React.Dispatch<React.SetStateAction<string>>;
  step: 1 | 2 | 3;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  customer: Customer | undefined;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  entryType: 0 | 1 | 2;
  setEntryType: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  debtRepaymentMode: 0 | 1;
  setDebtRepaymentMode: React.Dispatch<React.SetStateAction<0 | 1>>;
  selectedPurchase: SaleTransaction | undefined;
  setSelectedPurchase: React.Dispatch<React.SetStateAction<SaleTransaction | undefined>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  receipt: File | undefined;
  setReceipt: React.Dispatch<React.SetStateAction<File | undefined>>;
  categoryPickerOpen: boolean;
  setCategoryPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTrigger: boolean;
  isSelectedTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};







