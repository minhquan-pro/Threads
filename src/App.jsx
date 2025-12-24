import { HashRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/auth/AuthProvider";
import ScrollToTop from "./components/common/ScrollToTop";
import SnowOverlay from "./components/common/SnowOverlay";
import AppRoute from "./components/navigation/AppRoute";

function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <AuthProvider />
      <ScrollToTop />
      <AppRoute />
    </HashRouter>
  );
}

export default App;
