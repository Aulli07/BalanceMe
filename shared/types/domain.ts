export type EntityId = string;
export type ISODateTime = string;
export type NairaAmount = number;

export interface User {
  id: EntityId;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  businessIds: EntityId[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Business {
  id: EntityId;
  ownerId: EntityId;
  name: string;
  category: string;
  phone?: string;
  address?: string;
  currency: "NGN";
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Customer {
  id: EntityId;
  businessId: EntityId;
  name: string;
  pinned: boolean;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  reminder?: CustomerReminder;
  lastReminded?: CustomerLastReminded;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CustomerReminder {
  date: ISODateTime;
  note?: string;
}

export interface CustomerLastReminded {
  channel: "whatsapp" | "sms" | "email";
  at: ISODateTime;
}

export type NotificationCategory = "Paid" | "Owed" | "Analytics";

export interface Notification {
  id: EntityId;
  businessId: EntityId;
  title: string;
  detail: string;
  category: NotificationCategory;
  unread: boolean;
  createdAt: ISODateTime;
  transactionId?: EntityId;
  customerId?: EntityId;
}

export interface Receipt {
  id: EntityId;
  businessId: EntityId;
  transactionId: EntityId;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  createdAt: ISODateTime;
}

export type TransactionType = "sale" | "repayment" | "sale_repayment";

export interface BaseTransaction {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  receiptId?: EntityId;
  note?: string;
  createdAt: ISODateTime;
}

export interface SaleDetails {
  description: string;
  productPrice: NairaAmount;
  /** A sale is recorded on credit, so this must be less than productPrice. */
  amountPaid: NairaAmount;
}

export interface RepaymentAllocation {
  /** The earlier sale whose outstanding debt is being paid. */
  saleTransactionId: EntityId;
  debtAmountPaid: NairaAmount;
}

export interface SaleTransaction extends BaseTransaction {
  type: "sale";
  sale: SaleDetails;
}

export interface RepaymentTransaction extends BaseTransaction {
  type: "repayment";
  amountReceived: NairaAmount;
  allocations: RepaymentAllocation[];
}

export interface SaleRepaymentTransaction extends BaseTransaction {
  type: "sale_repayment";
  /** Total cash handed over for the new sale and old debt repayments. */
  amountReceived: NairaAmount;
  sale: SaleDetails;
  allocations: RepaymentAllocation[];
}

export type Transaction =
  | SaleTransaction
  | RepaymentTransaction
  | SaleRepaymentTransaction;


export type SaleSettlementStatus = "paid" | "partially_paid" | "unpaid";

export interface WrittenEntryDraft {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  description: string;
  productPrice: NairaAmount;
  amountPaid: NairaAmount;
  amountOwed: NairaAmount;
  receiptFiles?: File[];
  createdAt: ISODateTime;
}
