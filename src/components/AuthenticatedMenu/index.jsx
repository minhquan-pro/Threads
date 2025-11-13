import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { MENU_GROUPS, MENU_ITEMS, MENU_OFFSET } from "@/constants";
import classNames from "classnames";
import { ArrowRight, Menu } from "lucide-react";

const AuthenticatedMenu = ({ buttonClasses }) => {
  const handleClickMenuItem = (action) => {
    console.log(action);
  };

  const renderMenuItem = (menu) => {
    return (
      <DropdownMenuItem
        key={MENU_ITEMS[menu].label}
        onClick={() => handleClickMenuItem(MENU_ITEMS[menu].action)}
        className={classNames(
          "flex w-full items-center justify-between p-3 text-sm font-semibold",
          { "text-red-500": MENU_ITEMS[menu].variant === "destructive" },
        )}
      >
        {MENU_ITEMS[menu].label}
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
        className="w-56"
        alignOffset={MENU_OFFSET.align}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AuthenticatedMenu;
