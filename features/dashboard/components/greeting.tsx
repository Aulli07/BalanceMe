import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { getUser } from "@/shared/selectors/getters";
import { getTimePeriod } from "@/shared/utils/get-time-period";

export function Greeting() {
  const user = getUser(ACTIVE_BUSINESS_ID);
  if (!user) return <h1>Hi there</h1>

  const firstName = user.fullName.split(" ")[0];
  const timeOfDay = getTimePeriod(new Date());
  
  return (
    <section>
      <h1 className="mb-3 mt-3 whitespace-nowrap text-xl font-bold leading-tight tracking-tight text-[var(--ink)]">
        Good {timeOfDay}, {firstName}!
      </h1>
    </section>
  );
}