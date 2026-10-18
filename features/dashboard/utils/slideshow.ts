
import { Dispatch, SetStateAction, useEffect } from "react";
import { PulseDisplayData } from "../types/pulse-entry";

export function slideShow(data: PulseDisplayData[], setActiveIndex: Dispatch<SetStateAction<number>>) {
  useEffect(() => {
    if (data.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % data.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [data.length]);
}
