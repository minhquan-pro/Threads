import { HashRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import AppRoute from "./components/AppRoute";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 400);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <HashRouter>
      {isLoading && <SplashScreen isFading={isFading} />}
      <ToastContainer />
      <AuthProvider />
      <ScrollToTop />

      <AppRoute />
    </HashRouter>
  );
}

export default App;
