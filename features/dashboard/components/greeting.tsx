import { CURRENT_USER } from "@/shared/data/current-context";
import { getTimePeriod } from "@/shared/utils/get-time-period";

export function Greeting() {
  const firstName = CURRENT_USER.fullName.split(" ")[0];
  const timeOfDay = getTimePeriod(new Date());
  
  return (
    <section>
      <h1 className="mb-3 mt-3 whitespace-nowrap text-xl font-bold leading-tight tracking-tight text-[var(--ink)]">
        Good {timeOfDay}, {firstName}!
      </h1>
    </section>
  );
}