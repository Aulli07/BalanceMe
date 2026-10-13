import { PulseData } from "@/features/analytics/data/business-pulses";
import { Dispatch, SetStateAction, useEffect } from "react";

export function slideShow(data: PulseData[], setActiveIndex: Dispatch<SetStateAction<number>>) {
  useEffect(() => {
    if (data.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % data.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [data.length]);
}
