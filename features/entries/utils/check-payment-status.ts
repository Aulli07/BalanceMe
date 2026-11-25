export function isFullPayment(productPrice: string, amountPaid: string) {
  const price = Number(productPrice || 0);
  const paid = Number(amountPaid || 0);

  return price > 0 && paid >= price;
}