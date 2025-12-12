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
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#181818]">
      <div className="fixed -top-20 right-0 left-0">
        <AspectRatio ratio={16 / 9}>
          <img src={decorImg} />
        </AspectRatio>
      </div>

      <div className="z-50 w-[350px] text-center">
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
