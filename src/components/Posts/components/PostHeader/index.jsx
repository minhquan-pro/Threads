/* eslint-disable no-unused-vars */
import { formatTime } from "@/utils/formatTime";
import verifiedIcon from "@/assets/icons/verifiedIcon.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/auth";
import {
  GUEST_MENU_ITEMS,
  POST_HEADER_MENU_ITEMS,
  POST_HEADER_USER_MENU_ITEMS,
} from "@/constants";
import { Ellipsis } from "lucide-react";
import { useCopyPostUrl } from "@/hooks";
import { savePost } from "@/services/Posts";
import { toast } from "@/utils/toast";
import { usePostActions } from "@/hooks/usePostActions";

const PostHeader = ({
  post,
  user,
  hideDate = false,
  createdAt,
  showStats,
  showMenu = true,
}) => {
  const currentUser = useCurrentUser();
  const menuItems = !currentUser
    ? GUEST_MENU_ITEMS
    : currentUser.id === user.id
      ? POST_HEADER_USER_MENU_ITEMS
      : POST_HEADER_MENU_ITEMS;

  const { copyPostUrl } = useCopyPostUrl();
  const { isSaved, handleSavePost } = usePostActions(post);

  const getMenuLabel = (action, label) => {
    if (action === "save") {
      return isSaved ? "Bỏ lưu" : label;
    }

    return label;
  };

  const handleAction = (action) => {
    switch (action) {
      case "copyLink":
        return copyPostUrl(post);
      case "save":
        return handleSavePost();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5">
          <span className="text-md font-semibold">{user.username}</span>
          {user.verified && <img src={verifiedIcon} className="h-4 w-4" />}
        </div>
        {!hideDate && showStats && (
          <span className="text-sm text-gray-500">{formatTime(createdAt)}</span>
        )}
      </div>
      {showMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="rounded-full border-none p-2 outline-none hover:bg-gray-100"
          >
            <Ellipsis size={16} color="gray" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-gray-200 outline-none"
          >
            {menuItems.map(({ label, action, type, Icon, danger }, index) => {
              if (type === "separator") {
                return <DropdownMenuSeparator key={`separator-${index}`} />;
              }
              return (
                <DropdownMenuItem
                  key={label}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(action);
                  }}
                  className={`flex w-56 cursor-pointer items-center justify-between p-3 font-semibold ${danger ? "text-red-500" : ""}`}
                >
                  {getMenuLabel(action, label)}
                  <Icon size={18} />
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
export default PostHeader;
