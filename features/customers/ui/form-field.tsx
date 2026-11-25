export function FormField({
  icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[var(--forest)]/30">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf3df] text-[var(--forest)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <label className="block text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
          {label}
          {required && <span className="text-red-400"> *</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--muted)]/50"
        />
      </div>
    </div>
  );
}
