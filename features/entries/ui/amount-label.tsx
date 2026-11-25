export function AmountLabel({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: number;
  tone?: "light" | "red";
}) {
  const isRed = tone === "red";

  return (
    <div className={`rounded-xl px-3 py-2 ${isRed ? "bg-[#f7e4d3]" : "bg-white/10"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wide ${isRed ? "text-[#81502f]" : "text-[#d9e8c5]"}`}>
        {label}
      </p>
      <p className={`mt-0.5 text-sm font-extrabold ${isRed ? "text-[#81502f]" : "text-[var(--surface)]"}`}>
        ₦{value.toLocaleString("en-NG")}
      </p>
    </div>
  );
}
