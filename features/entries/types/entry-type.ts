import type { Customer, SaleTransaction } from "@/shared/types/domain";

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
  selectedPurchases: SaleTransaction[];
  setSelectedPurchases: React.Dispatch<React.SetStateAction<SaleTransaction[]>>;
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


export type EntryFormOptions = {
  initialCustomer?: Customer;
  initialEntryType?: 0 | 1 | 2;
};

export type CanContinueEntryOptions = {
  customer: Customer | undefined;
  entryType: 0 | 1 | 2;
  productPrice: string;
  amountPaid?: string;
  amountRepaid: string;
  selectedPurchases: SaleTransaction[];
};


