import { Link, useLocation, useNavigate } from "react-router";
import { Menu, LogIn, ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { useCurrentUser } from "@/features/auth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES, MENU_OFFSET } from "@/constants";

const MobileHeader = () => {
  const currentUser = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isItemDetailPage = location.pathname.includes("/post/");

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between bg-white px-4 shadow-md md:hidden dark:bg-black dark:shadow-xl">
        {/* Left - Menu/Back Button */}
        {isItemDetailPage ? (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none">
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Open theme menu"
              >
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={MENU_OFFSET.side}
              align="start"
              alignOffset={MENU_OFFSET.align}
              className="w-64 overflow-hidden border border-gray-300 dark:border-[#323030]"
            >
              <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 p-2 dark:bg-[#181818]">
                {THEMES.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <DropdownMenuItem
                      key={theme.value}
                      className="w-full px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600"
                      onSelect={(e) => {
                        e.preventDefault();
                        window.setTheme(theme.value);
                      }}
                    >
                      {Icon && <Icon className="m-auto" />}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Link to="/" onClick={handleLogoClick} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faThreads}
            className="text-4xl hover:scale-90 dark:text-white"
          />
        </Link>

        <div>
          {!currentUser && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <LogIn size={18} />
              <span className="text-sm font-semibold">Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
