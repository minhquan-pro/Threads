import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";

import AppInitializer from "../AppInitializer";
import Embed from "@/pages/Embed";
import Home from "@/pages/Home";
import ItemDetailPage from "@/pages/ItemDetail";
import Search from "@/pages/Search";
import { Route, Routes } from "react-router";
import PrivateRoute from "../PrivateRoute";
import Activity from "@/pages/Activity";
import FollowingFeed from "@/pages/FollowingFeed";
import GhostPosts from "@/pages/GhostPosts";
import Profile from "@/pages/Profile";

const AppRoute = () => {
  return (
    <>
      <Routes>
        {/* Embed */}
        <Route path="/:userId/post/:postId/embed" element={<Embed />} />

        {/* AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<AppInitializer />}>
          {/* DefaultLayout */}
          <Route element={<DefaultLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:userId/post/:postId" element={<ItemDetailPage />} />

            {/* PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/activity" element={<Activity />} />
              <Route path="/following" element={<FollowingFeed />} />
              <Route path="/ghost-posts" element={<GhostPosts />} />
              <Route path="/:userId" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};
export default AppRoute;
