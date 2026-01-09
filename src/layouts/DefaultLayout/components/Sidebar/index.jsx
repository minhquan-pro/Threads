import { Link, NavLink, useLocation, useNavigate } from "react-router";
import classNames from "classnames";

import { NAV_ITEMS } from "@/constants/sidebar";
import UnauthenticatedMenu from "@/components/UnauthenticatedMenu";
import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
import AuthenticatedMenu from "@/components/AuthenticatedMenu";
import { useCurrentUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { useScrollRestoration } from "@/hooks";
import { useEffect, useState } from "react";
import CreatePostModal from "@/components/modals/CreatePostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThreads } from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [tabActive, setTabActive] = useState(location.pathname);
  useScrollRestoration();

  useEffect(() => {
    setTabActive(location.pathname);
  }, [location.pathname]);

  const handleNavigate = () => {
    if (location.pathname === "/") {
      window.scrollY === 0
        ? window.location.reload()
        : window.scrollTo({ top: 0 });
      return;
    }
  };

  const handleClick = (e, value) => {
    if (value.action === "create") {
      setIsOpen(true);
    } else if (value.path === "/") {
      navigate(tabActive);
      handleNavigate(e);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const renderNavItems = (isMobile = false) => {
    return NAV_ITEMS.map((nav) => {
      const Icon = nav.component;
      const iconSize = isMobile ? 24 : 26;

      if (nav.requireAuth && !currentUser) {
        return (
          <AuthRequiredDialog
            id={nav.id}
            key={nav.id}
            title={nav.dialogTitle}
            description={nav.dialogDescription}
            Icon={Icon}
            iconSize={{ width: iconSize, height: iconSize }}
          />
        );
      }

      return (
        <NavLink
          onClick={(e) => handleClick(e, nav)}
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
            const isHomeActive =
              nav.id === "for-you" &&
              (location.pathname === "/" || location.pathname === "/following");

            return (
              <Button variant="outline border-none shadow-none">
                <Icon
                  className={classNames({
                    "text-foreground fill-current dark:text-gray-100":
                      isActive || isHomeActive,
                  })}
                  style={{ width: iconSize, height: iconSize }}
                />
              </Button>
            );
          }}
        </NavLink>
      );
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden flex-col justify-between bg-white p-6 md:flex md:h-full dark:bg-black">
        <Link to={"/"} onClick={handleNavigate} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faThreads}
            className="z-10 text-4xl hover:scale-90 dark:text-white"
          />
        </Link>
        <div className="flex flex-col gap-8">{renderNavItems(false)}</div>
        <div>
          {currentUser ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="flex w-full flex-row items-center justify-between gap-4 border-t border-gray-200 bg-white px-2 py-3 shadow-lg md:hidden dark:border-gray-800 dark:bg-black dark:shadow-xl">
        <div className="flex flex-1 flex-row items-center justify-around gap-2">
          {renderNavItems(true)}
        </div>
      </div>

      <CreatePostModal open={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
