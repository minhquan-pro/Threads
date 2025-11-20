import { Outlet, useLocation } from "react-router";
import { AUTH_PAGES } from "@/constants/auth";
import decorImg from "@/assets/image/decor.jpg";

const AuthLayout = () => {
  const location = useLocation();
  const currentPage = AUTH_PAGES.find(
    (auth) => auth.route === location.pathname,
  );

  const title = currentPage.title || "";
  const description = currentPage.description || "";

  return (
    <div className="flex h-screen items-center justify-center">
      <img
        src={decorImg}
        className="absolute top-[-10%] right-0 left-0 -z-10"
      />
      <div className="w-[350px] text-center">
        <h1 className="mb-3 text-3xl font-bold">{title}</h1>
        <p className="mb-3 text-sm font-medium text-gray-600">{description}</p>
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
