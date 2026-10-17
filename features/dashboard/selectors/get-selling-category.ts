import {
  mockCategories,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";

export function getStrongestSellingCategory(businessId: string) {
  const categoryAmounts = new Map<string, number>();

  for (const transaction of mockSaleTransactions) {
    if (transaction.businessId !== businessId) continue;

    const currentAmount = categoryAmounts.get(transaction.categoryId) ?? 0;
    categoryAmounts.set(
      transaction.categoryId,
      currentAmount + transaction.totalKobo,
    );
  }

  const strongestCategory = [...categoryAmounts.entries()].sort(
    ([, firstAmount], [, secondAmount]) => secondAmount - firstAmount,
  )[0];

  if (!strongestCategory) return null;

  const [categoryId, totalKobo] = strongestCategory;
  const category = mockCategories.find(
    (item) => item.id === categoryId && item.businessId === businessId,
  );

  if (!category) return null;

  return { category, totalKobo };
}
