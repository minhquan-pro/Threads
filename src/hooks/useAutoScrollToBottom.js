import { useEffect, useRef } from "react";

export const useAutoScrollToBottom = ({ dependency, permitScrollToBottom }) => {
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (lastElementRef.current && permitScrollToBottom) {
      lastElementRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [dependency, permitScrollToBottom]);

  return { lastElementRef };
};
