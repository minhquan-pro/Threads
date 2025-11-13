import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Menu } from "lucide-react";

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
        <DropdownMenuItem className="text-md flex w-full items-center justify-between p-3 font-semibold">
          Giao diện
          <ArrowRight color="gray" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md p-3 font-semibold">
          Báo cáo sự cố
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UnauthenticatedMenu;
