import { useEffect, useState } from "react";

export function useTimer(listening: boolean) {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (!listening) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [listening]);

  return seconds;
}