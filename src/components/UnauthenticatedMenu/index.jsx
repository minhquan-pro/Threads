import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Menu } from "lucide-react";
import ThemeSubmenu from "../ThemeSubmenu";
import { useMenuSubmenu } from "@/hooks";

const UnauthenticatedMenu = ({ buttonClasses }) => {
  const { handleActiveSubmenu, handleBack, activeSubmenu } = useMenuSubmenu();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className={buttonClasses}>
            <Menu />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          align="start"
          alignOffset={20}
          className="w-64 overflow-hidden border border-gray-300"
        >
          <div
            className={`transition-opacity duration-100 ${
              activeSubmenu
                ? "pointer-events-none absolute inset-0 opacity-0"
                : "opacity-100"
            }`}
          >
            <DropdownMenuItem
              className="text-md flex items-center justify-between p-3 font-semibold"
              onSelect={(e) => {
                e.preventDefault();
                handleActiveSubmenu("interface");
              }}
            >
              Giao diện
              <ArrowRight />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-md p-3 font-semibold">
              Báo cáo sự cố
            </DropdownMenuItem>
          </div>

          {activeSubmenu === "interface" && (
            <ThemeSubmenu handleBack={handleBack} />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UnauthenticatedMenu;
