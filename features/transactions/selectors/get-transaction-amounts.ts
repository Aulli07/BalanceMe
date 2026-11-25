import { useMemo } from "react";
import { getTransactionActivity } from "./get-transactions";
import { getFilteredTransactions } from "./get-filtered-transactions";
import { months } from "../data/txn-stuff";
import { getProductPriceForMonth } from "./get-product-price-amounts";
import { getCollectedAmountForMonth } from "./get-collected-amounts";
import { getTransactionsForDay, getTransactionsForMonth } from "./get-period-txns";


export function getTransactionAmounts(businessId: string, activeFilter: "Settled" | "Owed" | "All", monthIndex: number) {
  const allTransactions = useMemo(() => 
    getTransactionActivity(businessId),
    [],
  );
  const filteredTxns = getFilteredTransactions(allTransactions, activeFilter);

  const transactions = useMemo(() =>
    getTransactionsForMonth(getTransactionsForDay(filteredTxns), months[monthIndex]),
    [filteredTxns, monthIndex],
  );

  const totalPrice = useMemo(
    () => getProductPriceForMonth(businessId, months[monthIndex]),
    [monthIndex],
  );
  const totalCollected = useMemo(
    () => getCollectedAmountForMonth(businessId, months[monthIndex]),
    [monthIndex],
  );

  return { allTransactions, transactions, totalPrice, totalCollected }
}