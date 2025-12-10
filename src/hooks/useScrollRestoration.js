import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export const useScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      scrollPositions.current[location.pathname] = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const savedPosition = scrollPositions.current[location.pathname];
    if (savedPosition) {
      window.scrollTo(0, savedPosition);
    }
  }, [location.pathname]);
};
