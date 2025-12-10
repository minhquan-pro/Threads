import { Link, NavLink, useLocation } from "react-router";
import classNames from "classnames";

import { NAV_ITEMS } from "@/constants/sidebar";
import threads_logo_dark from "@/assets/logo/threads_logo_dark.png";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import { useCurrentUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { useScrollRestoration } from "@/hooks";

const Sidebar = () => {
  const location = useLocation();
  const currentUser = useCurrentUser();
  useScrollRestoration();

  const handleNavigate = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
      return;
    }
  };

  return (
    <div className="flex h-full flex-col justify-between bg-white p-6 dark:bg-black">
      <Link to={"/"} onClick={handleNavigate} className="cursor-pointer">
        <img
          src={threads_logo_dark}
          alt=""
          className="h-12 w-10 hover:scale-90 dark:invert"
        />
      </Link>
      <div className="flex flex-col gap-8">
        {NAV_ITEMS.map((nav) => {
          const Icon = nav.component;

          if (nav.requireAuth && !currentUser) {
            return (
              <AuthRequiredDialog
                id={nav.id}
                key={nav.id}
                title={nav.dialogTitle}
                description={nav.dialogDescription}
                Icon={Icon}
                iconSize={{ width: 26, height: 26 }}
              />
            );
          }

          return (
            <NavLink
              key={nav.id}
              to={nav.path}
              className={classNames(
                "inline-block rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                {
                  "bg-gray-100 hover:text-black dark:bg-gray-800 dark:hover:text-white":
                    nav.id === "create",
                },
              )}
            >
              {({ isActive }) => {
                return (
                  <Button variant="outline border-none shadow-none">
                    <Icon
                      className={classNames({
                        "text-foreground fill-current dark:text-gray-100":
                          isActive,
                      })}
                      style={{ width: 26, height: 26 }}
                    />
                  </Button>
                );
              }}
            </NavLink>
          );
        })}
      </div>
      <div>{currentUser ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}</div>
    </div>
  );
};

export default Sidebar;
