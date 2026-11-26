import type { FormType } from "../types/entry-type";

export type EntryDetailsValidationErrors = {
  description?: string;
  receipt?: string;
};

export function validateEntryDetails({
  entryType,
  description,
  receipt,
}: Pick<FormType, "entryType" | "description" | "receipt">): EntryDetailsValidationErrors {
  const errors: EntryDetailsValidationErrors = {};

  if (entryType !== 1) {
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      errors.description = "Add a description for this sale.";
    } else if (/^\d+$/.test(trimmedDescription)) {
      errors.description = "Description cannot contain only numbers.";
    }
  }

  if (
    receipt &&
    (receipt.size === 0 ||
      (!receipt.type.startsWith("image/") &&
        receipt.type !== "application/pdf"))
  ) {
    errors.receipt = "Choose a valid image or PDF receipt.";
  }

  return errors;
}
