import { useEffect } from "react";

export const useInfiniteScroll = ({
  lastElementRef,
  page,
  pagination,
  loading,
  onEnd,
}) => {
  useEffect(() => {
    if (!lastElementRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            if (page >= pagination?.last_page) return;
            onEnd();
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" },
    );

    const lastElement = lastElementRef.current;
    observer.observe(lastElement);

    return () => observer.disconnect(lastElement);
  }, [loading, page, pagination?.last_page, lastElementRef, onEnd]);
};
