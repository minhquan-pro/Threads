import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { THEMES } from "@/constants";
import classNames from "classnames";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const ThemeSubmenu = ({ handleBack }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [selectedTheme, setSelectedTheme] = useState(storedTheme);

  const handleSelector = (theme) => {
    window.setTheme(theme);
    setSelectedTheme(theme);
  };

  return (
    <div>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          handleBack();
        }}
        className="flex items-center gap-2 font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="text-md w-full text-center">Giao diện</span>
      </DropdownMenuItem>
      <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 p-2 dark:bg-[#181818]">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          const isActive = selectedTheme === theme.value;
          return (
            <DropdownMenuItem
              key={theme.label}
              className={classNames(
                "w-full px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600",
                {
                  "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200":
                    isActive,
                  "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600":
                    !isActive,
                },
              )}
              onSelect={(e) => {
                e.preventDefault();
                handleSelector(theme.value);
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
