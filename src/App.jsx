import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FollowingFeed from "./pages/FollowingFeed";
import GhostPosts from "./pages/GhostPosts";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider />
      <Routes>
        {/* AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* DefaultLayout */}
        <Route element={<DefaultLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />

          {/* PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/activity" element={<Activity />} />
            <Route path="/following" element={<FollowingFeed />} />
            <Route path="/ghost-posts" element={<GhostPosts />} />
            <Route path="/:userId" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
