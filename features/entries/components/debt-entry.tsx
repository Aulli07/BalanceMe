import type { FormType } from "../hooks/useEntryForm";

export function isFullPayment(productPrice: string, amountPaid: string) {
  const price = Number(productPrice || 0);
  const paid = Number(amountPaid || 0);

  return price > 0 && paid >= price;
}

export function DebtEntry({ form }: { form: FormType }) {
  const {
    customer,
    productPrice,
    setProductPrice,
    amountPaid,
    setAmountPaid,
  } = form;

  const purchasePrice = Number(productPrice || 0);
  const paid = Number(amountPaid || 0);
  const amountOwed = Math.max(purchasePrice - paid, 0);

  return (
    <section className="mt-4" aria-labelledby="entry-amount-heading">
      <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-[#e5e9df] bg-[var(--surface)] shadow-sm shadow-[var(--forest)]/5">
        <div className="border-b border-[#e9ede5] bg-[#f3f7ed] px-4 py-3">
          <p className="text-sm font-extrabold text-[var(--forest)]">
            New purchase
          </p>
          <p className="mt-0.5 text-xs font-medium text-[#607568]">
            Record what was sold and what was paid today.
          </p>
        </div>
        <div className="px-4 py-3">
          <label
            className="flex items-center justify-between gap-4 border-b border-[#e9ede5] pb-3"
            htmlFor="entry-product-price"
          >
            <span className="text-base font-bold text-[#53705f]">
              Product price
            </span>
            <input
              id="entry-product-price"
              type="number"
              value={productPrice}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) => setProductPrice(event.target.value)}
              className="w-40 appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </label>

          <label
            className="flex items-center justify-between gap-4 pt-3"
            htmlFor="entry-amount-paid"
          >
            <span className="text-base font-bold text-[#53705f]">
              Amount paid
            </span>
            <input
              id="entry-amount-paid"
              type="number"
              value={amountPaid}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) => setAmountPaid(event.target.value)}
              className="w-40 appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </label>
        </div>
      </div>

      <p
        id="entry-amount-heading"
        className="mt-3 rounded-xl bg-[#f7e4d3] px-4 py-2 text-center text-[14px] font-bold text-[#81502f]"
      >
        {"\u20A6"} {amountOwed.toLocaleString("en-NG")} will be added to{" "}
        {customer?.name ?? "this customer"}&apos;s debt
      </p>
    </section>
  );
}