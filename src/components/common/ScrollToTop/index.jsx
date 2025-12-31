import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectList } from "@/features/posts";

const ScrollToTop = () => {
  const location = useLocation();
  const posts = useSelector(selectList);

  useEffect(() => {
    if (posts.length === 1) {
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "instant" });

        const mainContainer = document.querySelector("main");
        if (mainContainer) {
          mainContainer.scrollTop = 0;
        }
      };

      requestAnimationFrame(() => {
        scrollToTop();
      });
    }
  }, [location.pathname, posts.length]);

  return null;
};

export default ScrollToTop;
