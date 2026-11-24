import type { ISODateTime } from "@/shared/types/domain";

export function getDueDate(createdAt: ISODateTime): ISODateTime {
  const dueDate = new Date(createdAt);
  dueDate.setUTCDate(dueDate.getUTCDate() + 7);

  return dueDate.toLocaleDateString("en-GB");
}
