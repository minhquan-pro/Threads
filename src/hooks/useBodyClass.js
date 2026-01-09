import { useEffect, useState } from "react";

export const useBodyClass = (className) => {
  const [hasClass, setHasClass] = useState(() =>
    document.body.classList.contains(className),
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const present = document.body.classList.contains(className);
          setHasClass(present);
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [className]);

  return hasClass;
};
