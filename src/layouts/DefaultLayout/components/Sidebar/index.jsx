import { Link, NavLink } from "react-router";
import classNames from "classnames";

import { NAV_ITEMS } from "@/constants/sidebar";
import threads_logo from "@/assets/logo/threads_logo.png";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import { useCurrentUser } from "@/features/auth";

const BUTTON_CLASSES =
  "inline-block rounded-md px-5 py-3 text-gray-400 hover:bg-gray-100 cursor-pointer";

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
                buttonClasses={BUTTON_CLASSES}
                Icon={Icon}
                sizeIcon={26}
              />
            );
          }

          return (
            <NavLink
              key={nav.id}
              to={nav.path}
              className={classNames(BUTTON_CLASSES, {
                "bg-gray-100 hover:text-black": nav.id === "create",
              })}
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
      {currentUser ? (
        <AuthenticatedMenu buttonClasses={BUTTON_CLASSES} />
      ) : (
        <UnauthenticatedMenu buttonClasses={BUTTON_CLASSES} />
      )}
    </div>
  );
};
export default Sidebar;
