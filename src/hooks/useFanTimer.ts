import { useState, useEffect } from "react";
import type { ApplianceStatus } from "@/types/appliances";

export function useFanTimer() {
  const [status, setStatus] = useState<ApplianceStatus>("IDLE");
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === "ACTIVE" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStatus("IDLE");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, timeLeft]);

  const start6Hours = () => {
    setTimeLeft(6 * 60 * 60);
    setStatus("ACTIVE");
  };

  const togglePause = () => {
    setStatus(status === "ACTIVE" ? "PAUSED" : "ACTIVE");
  };

  const stop = () => {
    setStatus("IDLE");
    setTimeLeft(0);
  };

  return {
    status,
    timeLeft,
    start6Hours,
    togglePause,
    stop,
  };
}
