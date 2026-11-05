import type { Transaction } from "@/shared/types/domain";
import { getPaymentDetails, getSaleDetails } from "../selectors/get-sale-details";

import { PaymentTransactionUi } from "../ui/payment-transaction-ui";
import { SaleTransactionUi } from "../ui/sale-transaction-ui";



export function TransactionDetailsOverview({
  transaction,
}: {transaction: Transaction}) {
  
  if (transaction.type === "payment") {
    const { amountPaid, allocations } = getPaymentDetails(transaction);

    return (
      <PaymentTransactionUi
        transaction={transaction}
        amountPaid={amountPaid}
        allocations={allocations}
      />
    );
  }

  const { productPrice, amountPaid, balance } = getSaleDetails(transaction);

  return (
    <SaleTransactionUi 
      transaction={transaction} 
      productPrice={productPrice}
      amountPaid={amountPaid}
      balance={balance}
   />
  )
}
