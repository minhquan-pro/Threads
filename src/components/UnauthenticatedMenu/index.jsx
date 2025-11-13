import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const UnauthenticatedMenu = ({ buttonClasses }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className={buttonClasses}>
          <Menu />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        align="start"
        className="w-56"
        alignOffset={20}
      >
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-md p-3 font-semibold">
            Giao diện
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md p-3 font-semibold">
          Báo cáo sự cố
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UnauthenticatedMenu;
