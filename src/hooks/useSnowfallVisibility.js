import { useEffect, useState } from "react";

export default function useSnowfallVisibility(threshold = 200) {
  const [showSnow, setShowSnow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setShowSnow(y <= threshold);
    };
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { showSnow };
}
