export function normalizePath(p: string) {
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}
    