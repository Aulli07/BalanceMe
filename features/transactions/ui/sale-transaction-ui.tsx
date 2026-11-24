import type { SaleTransactionUiProps } from "../types/transaction-props";
import { SaleAmounts } from "./sale-amounts";
import { SaleDetails } from "./sale-details";
import { TransactionDateActions } from "./transaction-date-actions";
import { TransactionHero } from "./transaction-hero";

export function SaleTransactionUi({
  transaction,
  productPrice,
  amountPaid,
  balance,
}: SaleTransactionUiProps) {
  return (
    <section className="flex flex-col px-5">
      <TransactionHero
        tag="Sale"
        amountLabel="Amount paid"
        amount={amountPaid}
      />
      <SaleAmounts
        productPrice={productPrice}
        amountPaid={amountPaid}
        balance={balance}
      />
      <SaleDetails transaction={transaction} />
      <TransactionDateActions createdAt={transaction.createdAt} />
    </section>
  );
}
