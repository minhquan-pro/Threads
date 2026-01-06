import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const useElapsedTimeCounter = (initialSeconds, startTime) => {
  const computeRemaining = useCallback(() => {
    if (!startTime) return initialSeconds;
    const elapsedSeconds = dayjs().diff(dayjs(startTime), "second");
    return Math.max(0, initialSeconds - elapsedSeconds);
  }, [initialSeconds, startTime]);

  const initialRemaining = computeRemaining();
  const [secondsLeft, setSecondsLeft] = useState(initialRemaining);
  const [exist, setExist] = useState(initialRemaining > 0);

  useEffect(() => {
    const remaining = computeRemaining();
    setSecondsLeft(remaining);
    setExist(remaining > 0);
  }, [computeRemaining, initialSeconds, startTime]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExist(false);
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return { exist, secondsLeft };
};
