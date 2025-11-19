import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { MENU_GROUPS, MENU_ITEMS, MENU_OFFSET } from "@/constants";
import { useMenuSubmenu } from "@/hooks";
import classNames from "classnames";
import { ArrowRight, Menu } from "lucide-react";
import ThemeSubmenu from "../ThemeSubmenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/services/auth/authService";
import { loadingSelector as authLoadingSelector } from "@/features/auth";
import { Spinner } from "../ui/spinner";

const AuthenticatedMenu = ({ buttonClasses }) => {
  const { handleActiveSubmenu, handleBack, activeSubmenu } = useMenuSubmenu();
  const dispatch = useDispatch();
  const loading = useSelector(authLoadingSelector);

  const handleClickMenuItem = async (action) => {
    if (action === "logout") {
      await dispatch(logout()).unwrap();
    }

    handleActiveSubmenu(action);
  };

  const renderMenuItem = (menu) => {
    return (
      <DropdownMenuItem
        disabled={loading}
        key={menu}
        onClick={(e) => {
          e.preventDefault();
          handleClickMenuItem(MENU_ITEMS[menu].action);
        }}
        className={classNames(
          "flex w-full items-center justify-between p-3 text-sm font-semibold",
          { "text-red-500": MENU_ITEMS[menu].variant === "destructive" },
        )}
      >
        {MENU_ITEMS[menu].label}
        {MENU_ITEMS[menu].action === "logout" && loading && <Spinner />}
        {MENU_ITEMS[menu].hasSubmenu && <ArrowRight color="gray" />}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className={buttonClasses}>
          <Menu />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={MENU_OFFSET.side}
        align="start"
        className="w-60 overflow-hidden"
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
            <DropdownMenuGroup>
              {MENU_GROUPS.settings.map((menu) => {
                return renderMenuItem(menu);
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {MENU_GROUPS.content.map((menu) => {
                return renderMenuItem(menu);
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {MENU_GROUPS.actions.map((menu) => {
                return renderMenuItem(menu);
              })}
            </DropdownMenuGroup>
          </div>
          {/* Submenu */}
          {activeSubmenu === "interface" && (
            <ThemeSubmenu handleBack={handleBack} />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AuthenticatedMenu;
