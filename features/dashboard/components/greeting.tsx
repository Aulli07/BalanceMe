
import { getUser } from "@/shared/selectors/getters";
import { getTimePeriod } from "@/shared/utils/get-time-period";

export function Greeting({businessId}: {businessId: string}) {
  const user = getUser(businessId);
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