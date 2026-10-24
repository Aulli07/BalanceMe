import type { Transaction } from "@/shared/types/domain";
import {
  getPaymentDetails,
  getSaleDetails,
} from "../selectors/get-sale-details";
import { PaymentTransactionUi } from "../ui/payment-transaction-ui";
import { SaleTransactionUi } from "../ui/sale-transaction-ui";

type TransactionDetailsOverviewProps = {
  transaction: Transaction;
};

export function TransactionDetailsOverview({
  transaction,
}: TransactionDetailsOverviewProps) {
  if (transaction.type === "payment") {
    return (
      <PaymentTransactionUi
        transaction={transaction}
        details={getPaymentDetails(transaction)}
      />
    );
  }

  return <SaleTransactionUi 
    transaction={transaction} 
    details={getSaleDetails(transaction)} />;
}
