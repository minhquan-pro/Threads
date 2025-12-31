import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" });

      // Scroll main container nếu có
      const mainContainer = document.querySelector("main");
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
    };

    requestAnimationFrame(() => {
      scrollToTop();
    });
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
