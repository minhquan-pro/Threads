import { HashRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/auth/AuthProvider";
import AppRoute from "./components/navigation/AppRoute";

function App() {
  return (
    <HashRouter>
      <ToastContainer />
      <AuthProvider />
      <AppRoute />
    </HashRouter>
  );
}

export default App;
