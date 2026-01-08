import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatches);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMatches);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMatches);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
};

export const useIsDesktop = () => {
  return useMediaQuery("(min-width: 768px)");
};
