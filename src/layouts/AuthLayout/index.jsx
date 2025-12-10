import { Outlet, useLocation } from "react-router";
import { AUTH_PAGES } from "@/constants/auth";
import decorImg from "@/assets/images/decor.jpg";

const AuthLayout = () => {
  const location = useLocation();
  const currentPage = AUTH_PAGES.find(
    (auth) => auth.route === location.pathname,
  );

  const title = currentPage.title || "";
  const description = currentPage.description || "";

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#181818]">
      <div className="relative z-50">
        <img src={decorImg} className="absolute top-0 h-full w-full invert" />
      </div>
      <div className="w-[350px] text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
