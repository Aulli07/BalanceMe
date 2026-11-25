import type {
  SaleRepaymentTransaction,
  SaleTransaction,
} from "@/shared/types/domain";
import { getCustomer } from "@/shared/selectors/customer-getters";
import { getDueDate } from "@/shared/utils/get-due-date";
import { DetailRow } from "./detail-row";

export function SaleDetails({
  transaction,
}: {
  transaction: SaleTransaction | SaleRepaymentTransaction;
}) {
  const customer = getCustomer(transaction.customerId);
  const dueDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(getDueDate(transaction.createdAt)));

  return (
    <div className="mt-5">
      <dl className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
        <DetailRow
          label="Customer"
          value={customer?.name ?? "Unknown customer"}
        />
        <DetailRow label="Description" value={transaction.sale.description} />
        <DetailRow label="Due date" value={dueDate} />
      </dl>
    </div>
  );
}
