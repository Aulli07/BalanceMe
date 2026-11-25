"use client";

import { useState } from "react";
import type { Customer, SaleTransaction } from "@/shared/types/domain";
import { EntryFormOptions, FormType } from "../types/entry-type";


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









