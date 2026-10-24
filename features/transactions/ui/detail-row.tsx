export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 py-4">
      <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      <span className="text-right text-base font-bold text-[var(--ink)]">{value}</span>
    </div>
  );
}