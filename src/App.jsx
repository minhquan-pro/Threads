import { HashRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./components/auth/AuthProvider";
import AppRoute from "./components/navigation/AppRoute";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <ToastContainer />
      <AuthProvider />
      <AppRoute />
    </HashRouter>
  );
}

export default App;
