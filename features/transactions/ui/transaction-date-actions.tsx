import { getDateString } from "../utils/get-date-string";
import { TransactionActions } from "./transaction-actions";

export function TransactionDateActions({ createdAt }: { createdAt: string }) {
  return (
    <>
      <time
        dateTime={createdAt}
        className="mt-6 text-center text-sm font-medium text-[var(--muted)]"
      >
        {getDateString(createdAt)}
      </time>
      <TransactionActions />
    </>
  );
}
