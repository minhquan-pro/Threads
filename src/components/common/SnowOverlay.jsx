import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import useSnowfallVisibility from "@/hooks/useSnowfallVisibility";
import snow from "@/assets/images/snow.png";

export default function SnowOverlay({ threshold = 200, speed = [0.4, 1] }) {
  const { showSnow } = useSnowfallVisibility(threshold);
  const [snowImages, setSnowImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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

  if (!shouldRender || snowImages.length === 0) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 h-[90px] transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-70" : "opacity-0"
      }`}
    >
      <Snowfall
        speed={speed}
        wind={[-0.5, 0.5]}
        images={snowImages}
        snowflakeCount={15}
        radius={[10, 10]}
      />
    </div>
  );
}
