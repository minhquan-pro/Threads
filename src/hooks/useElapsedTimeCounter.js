import { useEffect, useState } from "react";

export const useElapsedTimeCounter = (initialSeconds) => {
  const [exist, setExist] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setExist(false);
      return;
    }
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return { exist, secondsLeft };
};
