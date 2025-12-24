import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";
import useSnowfallVisibility from "@/hooks/useSnowfallVisibility";
import snow from "@/assets/images/snow.png";

export default function SnowOverlay({ threshold = 200, speed = [0.6, 0.4] }) {
  const { showSnow } = useSnowfallVisibility(threshold);
  const [snowImages, setSnowImages] = useState([]);

  useEffect(() => {
    const img = new Image();
    img.src = snow;
    img.onload = () => {
      setSnowImages([img]);
    };
  }, []);

  if (!showSnow || snowImages.length === 0) return null;

  return (
    <div
      className={
        "pointer-events-none fixed inset-0 z-9999 h-[90px] opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-100"
      }
    >
      <Snowfall
        speed={speed}
        wind={[0, 0.3]}
        images={snowImages}
        snowflakeCount={20}
        radius={[10, 10]}
      />
    </div>
  );
}
