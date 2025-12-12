import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import SplashScreen from "../SplashScreen";

const AppInitializer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 0);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  return (
    <div>
      {isLoading && <SplashScreen isFading={isFading} />}
      <Outlet />
    </div>
  );
};
export default AppInitializer;
