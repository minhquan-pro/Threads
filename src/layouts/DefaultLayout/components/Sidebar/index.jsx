import { Link, NavLink } from "react-router";
import classNames from "classnames";

import { NAV_ITEMS } from "@/constants/sidebar";
import threads_logo from "@/assets/logo/threads_logo.png";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import { useCurrentUser } from "@/features/auth";

const Sidebar = () => {
  const currentUser = useCurrentUser();
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <Link to={"/"}>
          <img src={threads_logo} alt="" className="h-12 w-10" />
        </Link>
      </div>
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
                "inline-block rounded-md px-5 py-3 text-gray-600 hover:bg-gray-100",
                {
                  "bg-gray-100 hover:text-black": nav.id === "create",
                },
              )}
            >
              {({ isActive }) => {
                return (
                  <Icon
                    className={`${isActive && "text-foreground fill-current"}`}
                    size={26}
                  />
                );
              }}
            </NavLink>
          );
        })}
      </div>
      <div className="px-4 py-5">
        {currentUser ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      </div>
    </div>
  );
};
export default Sidebar;
