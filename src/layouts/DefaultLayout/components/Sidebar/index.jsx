import { Link, NavLink, useLocation } from "react-router";
import classNames from "classnames";

import { NAV_ITEMS } from "@/constants/sidebar";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import { useCurrentUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { useScrollRestoration } from "@/hooks";
import { useState } from "react";
import CreatePostModal from "@/components/modals/CreatePostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThreads } from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentUser = useCurrentUser();
  useScrollRestoration();

  const handleNavigate = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
      return;
    }
  };

  const handleClick = (value) => {
    if (value.action === "create") {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden h-full flex-col justify-between bg-white p-6 md:flex dark:bg-black">
        <Link to={"/"} onClick={handleNavigate} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faThreads}
            className="text-4xl hover:scale-90 dark:text-white"
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
                onClick={() => handleClick(nav)}
                key={nav.id}
                to={nav.path}
                className={classNames(
                  "inline-block rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                  {
                    "bg-gray-100 hover:text-black dark:bg-gray-800/50 dark:hover:text-white":
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
        <div>
          {currentUser ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-black">
        <div className="flex items-center justify-around px-2 py-2">
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
                  iconSize={{ width: 24, height: 24 }}
                />
              );
            }

            return (
              <NavLink
                onClick={() => handleClick(nav)}
                key={nav.id}
                to={nav.path}
                className={classNames(
                  "flex h-14 items-center rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/40",
                  {
                    "bg-gray-100 hover:text-black dark:bg-gray-600/40 dark:hover:text-white":
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
      </div>
      <CreatePostModal open={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
