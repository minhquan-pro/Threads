import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSortOrder } from "@/hooks/useSortOrder";

const ActivityHeader = ({ showActivity = true }) => {
  const { sortOrder, setSortOrder } = useSortOrder();

  const sortOptions = {
    recent: "Mới nhất",
    top: "Hàng đầu",
  };

  return (
    <div className="mt-3 flex h-14 items-center justify-between border-t border-gray-300 text-sm">
      {Boolean(showActivity) && (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none focus:ring-0">
            <div className="flex items-center gap-1">
              <span className="text-[16px] font-bold">
                {sortOptions[sortOrder]}
              </span>
              <ChevronDown size={12} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52 border-gray-300">
            <DropdownMenuItem
              onClick={() => setSortOrder("top")}
              className="text-md cursor-pointer p-3 font-semibold"
            >
              <div className="flex w-full items-center justify-between">
                Hàng đầu
                {sortOrder === "top" && <Check size={20} />}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortOrder("recent")}
              className="text-md cursor-pointer p-3 font-semibold"
            >
              <div className="flex w-full items-center justify-between">
                Mới nhất
                {sortOrder === "recent" && <Check size={20} />}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <button className="ml-auto text-gray-400 transition-colors hover:text-gray-600">
        Xem hoạt động
      </button>
    </div>
  );
};

export default ActivityHeader;
