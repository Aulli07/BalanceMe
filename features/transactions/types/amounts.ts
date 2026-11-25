import { Customer, NairaAmount } from "@/shared/types/domain";

export type CustomerProductPriceAmount = {
  customer: Customer | undefined;
  amount: NairaAmount;
};

export type CustomerCollectedAmount = {
  customer: Customer | undefined;
  amount: NairaAmount;
};