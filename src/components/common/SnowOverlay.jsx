import Snowfall from "react-snowfall";
import useSnowfallVisibility from "@/hooks/useSnowfallVisibility";

export default function SnowOverlay({
  threshold = 200,
  speed = [0.05, 0.2],
  className = "pointer-events-none fixed inset-0 h-[100px] opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-50",
}) {
  const { showSnow } = useSnowfallVisibility(threshold);

  if (!showSnow) return null;

  return (
    <div className={className}>
      <Snowfall speed={speed} />
    </div>
  );
}
