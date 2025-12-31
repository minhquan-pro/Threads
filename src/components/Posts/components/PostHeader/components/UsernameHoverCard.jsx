import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import verifiedIcon from "@/assets/icons/verifiedIcon.png";
import defaultImageUser from "@/assets/images/defaultImageUser.png";
import { useCurrentUser } from "@/features/auth";
import { Button } from "@/components/ui/button";
import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";

const UsernameHoverCard = ({ user }) => {
  const currentUser = useCurrentUser();
  const [openUsernameMenu, setOpenUsernameMenu] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenUsernameMenu(true);
    }, 300);
  };

  const handleMenuMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenUsernameMenu(false);
    }, 200);
  };

  return (
    <div
      onMouseEnter={handleMenuMouseEnter}
      onMouseLeave={handleMenuMouseLeave}
    >
      <DropdownMenu open={openUsernameMenu}>
        <DropdownMenuTrigger asChild>
          <span className="flex items-center gap-0.5">
            <Link
              to={
                user.id === currentUser?.id ? "/profile" : `/@${user.username}`
              }
              className="cursor-pointer font-semibold text-gray-900 hover:underline dark:text-white"
            >
              {user.username}
            </Link>
            {user.verified && (
              <img
                src={verifiedIcon}
                alt="Verified badge"
                className="h-4 w-4"
              />
            )}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-80 border border-gray-300 p-0 px-2 pb-3 outline-none dark:border-gray-800"
          onPointerEnter={handleMenuMouseEnter}
          onPointerLeave={handleMenuMouseLeave}
          onInteractOutside={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            handleMenuMouseLeave();
          }}
        >
          {/* User Profile Card */}
          <div className="p-3">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <img
                src={user.avatar_url || defaultImageUser}
                alt={user.username}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  {user.verified && (
                    <img
                      src={verifiedIcon}
                      alt="Verified badge"
                      className="h-4 w-4"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-[#c4c4c4]">
                  {user.username}
                </p>
                {user.bio && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
          {!currentUser ? (
            <AuthRequiredDialog
              type="button"
              title="Đăng ký để theo dõi"
              description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
              buttonClasses="w-full bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Theo dõi
            </AuthRequiredDialog>
          ) : (
            currentUser.id !== user.id && (
              <Button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Theo dõi
              </Button>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UsernameHoverCard;
