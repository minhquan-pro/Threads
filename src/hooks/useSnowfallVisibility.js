import { useEffect, useState } from "react";

export default function useSnowfallVisibility() {
  const [showSnow, setShowSnow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setShowSnow(y <= 200);
    };
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { showSnow };
}
