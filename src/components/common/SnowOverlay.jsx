import Snowfall from "react-snowfall";
import useSnowfallVisibility from "@/hooks/useSnowfallVisibility";

export default function SnowOverlay({ threshold = 200, speed = [0.25, 0.2] }) {
  const { showSnow } = useSnowfallVisibility(threshold);

  if (!showSnow) return null;

  return (
    <div
      className={
        "pointer-events-none fixed inset-0 z-50 h-[90px] opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-50"
      }
    >
      <Snowfall speed={speed} wind={[0, 0]} />
    </div>
  );
}
