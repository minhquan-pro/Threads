import { HashRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import AppRoute from "./components/AppRoute";

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
