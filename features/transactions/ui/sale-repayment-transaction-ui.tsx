import type { SaleRepaymentTransaction } from "@/shared/types/domain";
import { RepaymentAllocations } from "./repayment-allocations";
import { SaleAmounts } from "./sale-amounts";
import { SaleDetails } from "./sale-details";
import { TransactionDateActions } from "./transaction-date-actions";
import { TransactionHero } from "./transaction-hero";

export function SaleRepaymentTransactionUi({
  transaction,
}: {
  transaction: SaleRepaymentTransaction;
}) {
  return (
    <section className="mt-5 flex flex-col px-5">
      <TransactionHero
        tag="Sale and repayment"
        amountLabel="Amount received"
        amount={transaction.amountReceived}
      />
      <SaleAmounts
        productPrice={transaction.sale.productPrice}
        amountPaid={transaction.sale.amountPaid}
        tag="sale"
      />
      <SaleDetails transaction={transaction} />
      <RepaymentAllocations allocations={transaction.allocations} />
      <TransactionDateActions createdAt={transaction.createdAt} />
    </section>
  );
}
