/* eslint-disable no-unused-vars */
import { useState } from "react";
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
  DIALOG_CONFIGS,
  GUEST_MENU_ITEMS,
  POST_HEADER_MENU_ITEMS,
  POST_HEADER_USER_MENU_ITEMS,
} from "@/constants";
import { Ellipsis } from "lucide-react";
import { useCopyPostUrl } from "@/hooks";
import { usePostActions } from "@/hooks/usePostActions";
import ConfirmDialog from "./components/ConfirmDialog";

const PostHeader = ({
  post,
  user,
  hideDate = false,
  createdAt,
  showStats = true,
  showMenu = true,
}) => {
  const currentUser = useCurrentUser();
  const { copyPostUrl } = useCopyPostUrl();
  const {
    isSaved,
    isBlocked,
    isRestricted,
    handleSavePost,
    handleDeletePost,
    handleBlockUser,
    handleUnblockUser,
    handleMuteUser,
    handleUnmuteUser,
  } = usePostActions(post);
  const [dialogState, setDialogState] = useState({
    type: null,
    open: false,
  });

  const menuItems = !currentUser
    ? GUEST_MENU_ITEMS
    : currentUser.id === user.id
      ? POST_HEADER_USER_MENU_ITEMS
      : POST_HEADER_MENU_ITEMS;

  const getMenuLabel = (action, label) => {
    switch (action) {
      case "save":
        return isSaved ? "Bỏ lưu" : label;
      case "block":
        return isBlocked ? "Bỏ chặn" : label;
      case "restrict":
        return isRestricted ? "Bỏ hạn chế" : label;
    }

    return label;
  };

  // Handle menu actions
  const handleAction = (action) => {
    if (action === "block" && isBlocked) {
      setDialogState({ type: "unblock", open: true });
      return;
    } else if (action === "restrict") {
      if (isRestricted) {
        handleUnmuteUser();
        return;
      }

      return handleMuteUser();
    }

    switch (action) {
      case "copyLink":
        copyPostUrl(post);
        break;
      case "save":
        handleSavePost();
        break;
      case "delete":
        setDialogState({ type: "delete", open: true });
        break;
      case "block":
        setDialogState({ type: "block", open: true });
        break;
      default:
        console.log("Unhandled action:", action);
        break;
    }
  };

  const handleConfirm = () => {
    if (dialogState.type === "delete") {
      handleDeletePost();
    } else if (dialogState.type === "block") {
      handleBlockUser();
    } else if (dialogState.type === "unblock") {
      handleUnblockUser();
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialogState({ type: null, open: false });
  };

  const getCurrentDialogConfig = () => {
    if (!dialogState.type) return null;
    const config = DIALOG_CONFIGS[dialogState.type];
    return typeof config === "function" ? config(user.username) : config;
  };

  const currentDialogConfig = getCurrentDialogConfig();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <span className="text-md font-semibold">{user.username}</span>
            {user.verified && (
              <img
                src={verifiedIcon}
                alt="Verified badge"
                className="h-4 w-4"
              />
            )}
          </div>
          {!hideDate && showStats && (
            <span className="text-sm text-gray-500">
              {formatTime(createdAt)}
            </span>
          )}
        </div>

        {/* Menu Dropdown */}
        {showMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              className="rounded-full border-none p-2 outline-none hover:bg-gray-100"
              aria-label="Menu bài viết"
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
                    key={action || label}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(action);
                    }}
                    className={`flex w-56 cursor-pointer items-center justify-between p-3 font-semibold ${
                      danger ? "text-red-500 focus:text-red-500" : ""
                    } ${action === "save" && isSaved ? "text-blue-500" : ""}`}
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

      {currentDialogConfig && (
        <ConfirmDialog
          open={dialogState.open}
          onOpenChange={handleCloseDialog}
          title={currentDialogConfig.title}
          description={currentDialogConfig.description}
          confirmLabel={currentDialogConfig.confirmLabel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default PostHeader;
