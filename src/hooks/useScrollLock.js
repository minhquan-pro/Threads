import { useEffect } from "react";

export const useScrollLock = (locked = false) => {
  useEffect(() => {
    if (!locked) return undefined;

    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [locked]);
};
