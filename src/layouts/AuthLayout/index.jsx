import { Outlet, useLocation } from "react-router";
import { AUTH_PAGES } from "@/constants/auth";
import decorImg from "@/assets/images/decor.avif";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AuthLayout = () => {
  const location = useLocation();
  const currentPage = AUTH_PAGES.find(
    (auth) => auth.route === location.pathname,
  );

  const title = currentPage.title || "";
  const description = currentPage.description || "";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4 py-6 sm:items-center sm:px-0 sm:py-0 dark:bg-[#181818]">
      <div className="pointer-events-none fixed inset-x-0 -top-20 hidden sm:block">
        <AspectRatio ratio={16 / 9}>
          <img src={decorImg} alt="decor" />
        </AspectRatio>
      </div>

      <div className="z-50 w-full max-w-sm rounded-2xl p-4 text-center shadow-lg backdrop-blur sm:w-[350px] sm:backdrop-blur-none">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {title}
        </h1>
        <p className="mb-4 text-sm font-medium text-gray-600 sm:mb-3 dark:text-gray-400">
          {description}
        </p>
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
