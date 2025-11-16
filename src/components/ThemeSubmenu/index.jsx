import { THEMES } from "@/constants";
import classNames from "classnames";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { ChevronLeft } from "lucide-react";

const ThemeSubmenu = ({ handleBack }) => {
  return (
    <div>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          handleBack();
        }}
        className="flex items-center gap-2 font-medium"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="text-md w-full text-center">Giao diện</span>
      </DropdownMenuItem>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 p-2">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          return (
            <DropdownMenuItem
              key={theme.label}
              className={classNames(`w-full px-4 py-3 font-semibold`)}
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              {Icon && <Icon className="m-auto" />}
            </DropdownMenuItem>
          );
        })}
      </div>
    </div>
  );
};
export default ThemeSubmenu;
