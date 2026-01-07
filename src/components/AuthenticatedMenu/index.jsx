import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Menu } from "lucide-react";
import { Spinner } from "../ui/spinner";

import { MENU_GROUPS, MENU_ITEMS, MENU_OFFSET } from "@/constants";
import { useMenuSubmenu } from "@/hooks";
import {
  loadingSelector as authLoadingSelector,
  setCurrentUser,
} from "@/features/auth";
import { logout } from "@/services/auth";
import MenuGroup from "./components/MenuGroup";
import ThemeSubmenu from "./components/ThemeSubmenu";
import FeedSubmenu from "./components/FeedSubmenu";

const AuthenticatedMenu = () => {
  const { handleActiveSubmenu, handleBack, activeSubmenu } = useMenuSubmenu();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(authLoadingSelector);

  const handleClickMenuItem = async (action) => {
    if (action === "logout") {
      try {
        await dispatch(logout()).unwrap();
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        /* empty */
      } finally {
        const currentTheme = localStorage.getItem("theme");

        sessionStorage.clear("postsLoadedAfterLogin");
        localStorage.clear();

        if (currentTheme) {
          localStorage.setItem("theme", currentTheme);
        }

        dispatch(setCurrentUser(null));
        navigate("/login");
      }
    }

    const menuItem =
      MENU_ITEMS[
        Object.keys(MENU_ITEMS).find((key) => MENU_ITEMS[key].action === action)
      ];

    if (menuItem?.hasSubmenu) {
      handleActiveSubmenu(action);
    }
  };

  const renderMenuItem = (menu) => {
    return (
      <DropdownMenuItem
        disabled={loading && MENU_ITEMS[menu].action === "logout"}
        key={menu}
        onClick={(e) => {
          e.preventDefault();
          handleClickMenuItem(MENU_ITEMS[menu].action);
        }}
        className={classNames(
          "flex w-full items-center justify-between p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-[#242424]",
          {
            "text-red-500 dark:text-red-400":
              MENU_ITEMS[menu].variant === "destructive",
          },
        )}
      >
        {MENU_ITEMS[menu].label}
        {MENU_ITEMS[menu].action === "logout" && loading && <Spinner />}
        {MENU_ITEMS[menu].hasSubmenu && (
          <ArrowRight className="text-gray-500 dark:text-gray-400" />
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-gray-700 outline-none hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={MENU_OFFSET.side}
        align="start"
        className="w-60 overflow-hidden border border-gray-300 bg-white dark:border-[#2f2f2f] dark:bg-[#181818]"
        alignOffset={MENU_OFFSET.align}
      >
        <div className="relative">
          <div
            className={`transition-opacity duration-200 ${
              activeSubmenu
                ? "pointer-events-none absolute inset-0 opacity-0"
                : "opacity-100"
            }`}
          >
            <MenuGroup
              items={MENU_GROUPS.settings}
              renderMenuItem={renderMenuItem}
            />
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-[#2f2f2f]" />
            <MenuGroup
              items={MENU_GROUPS.content}
              renderMenuItem={renderMenuItem}
            />
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-[#2f2f2f]" />
            <MenuGroup
              items={MENU_GROUPS.actions}
              renderMenuItem={renderMenuItem}
            />
          </div>

          {/* Submenu */}
          {activeSubmenu === "interface" && (
            <ThemeSubmenu handleBack={handleBack} />
          )}
          {activeSubmenu === "feed" && <FeedSubmenu handleBack={handleBack} />}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthenticatedMenu;
