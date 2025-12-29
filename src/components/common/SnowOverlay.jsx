import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import useSnowfallVisibility from "@/hooks/useSnowfallVisibility";
import snow from "@/assets/images/snow.svg";

export default function SnowOverlay({ threshold = 200, speed = [0.5, 1] }) {
  const { showSnow } = useSnowfallVisibility(threshold);
  const [snowImages, setSnowImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = snow;
    img.onload = () => {
      setSnowImages([img]);
    };
  }, []);

  useEffect(() => {
    if (!snowImages.length) return;

    if (showSnow) {
      setShouldRender(true);
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setShouldRender(false), 600);
    return () => clearTimeout(timeout);
  }, [showSnow, snowImages]);

  if (!isDarkTheme || !shouldRender || snowImages.length === 0) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 h-[90px] opacity-0 transition-all duration-500 ease-in-out ${
        isVisible && "opacity-80"
      }`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Snowfall
        color="white"
        speed={speed}
        wind={[-0.5, 0.5]}
        images={snowImages}
        snowflakeCount={20}
        radius={[7, 7]}
      />
    </div>
  );
}
