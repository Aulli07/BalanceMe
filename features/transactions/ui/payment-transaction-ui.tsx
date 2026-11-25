import { getCustomer } from "@/shared/selectors/customer-getters";
import type { PaymentTransactionUiProps } from "../types/transaction-props";
import { DetailRow } from "./detail-row";
import { RepaymentAllocations } from "./repayment-allocations";
import { TransactionDateActions } from "./transaction-date-actions";
import { TransactionHero } from "./transaction-hero";

export function PaymentTransactionUi({
  transaction,
  amountPaid,
  allocations,
}: PaymentTransactionUiProps) {
  const customer = getCustomer(transaction.customerId);

  return (
    <section className="mt-5 flex flex-col px-5">
      <TransactionHero
        tag="Repayment"
        amountLabel="Amount received"
        amount={amountPaid}
      />
      <div className="mt-4">
        <dl className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
          <DetailRow
            label="Customer"
            value={customer?.name ?? "Unknown customer"}
          />
          {transaction.note && (
            <DetailRow label="Note" value={transaction.note} />
          )}
        </dl>
      </div>
      <RepaymentAllocations allocations={allocations} />
      <TransactionDateActions createdAt={transaction.createdAt} />
    </section>
  );
}
