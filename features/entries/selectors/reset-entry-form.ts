import type { FormType } from "../types/entry-type";

export function resetEntryForm(form: FormType) {
  form.setProductPrice("0");
  form.setAmountPaid("0");
  form.setAmountRepaid("0");
  form.setStep(1);
  form.setCustomer(undefined);
  form.setEntryType(0);
  form.setDebtRepaymentMode(0);
  form.setSelectedPurchase(undefined);
  form.setDescription("");
  form.setDueDate("");
  form.setReceipt(undefined);
  form.setCategoryPickerOpen(false);
  form.isSelectedTrigger(false);
}
