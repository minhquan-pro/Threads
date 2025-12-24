import { HashRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/auth/AuthProvider";
import ScrollToTop from "./components/common/ScrollToTop";
import AppRoute from "./components/navigation/AppRoute";
import Snowfall from "react-snowfall";
import useSnowfallVisibility from "./hooks/useSnowfallVisibility";

function App() {
  const { showSnow } = useSnowfallVisibility();

  return (
    <HashRouter>
      {showSnow && (
        <div
          className={`pointer-events-none fixed inset-0 h-[100px] opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-100`}
        >
          <Snowfall speed={[0.05, 0.2]} />
        </div>
      )}
      <ToastContainer />
      <AuthProvider />
      <ScrollToTop />
      <AppRoute />
    </HashRouter>
  );
}

export default App;
