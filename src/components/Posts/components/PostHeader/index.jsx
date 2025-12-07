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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useCurrentUser } from "@/features/auth";
import {
  GUEST_MENU_ITEMS,
  POST_HEADER_MENU_ITEMS,
  POST_HEADER_USER_MENU_ITEMS,
} from "@/constants";
import { Ellipsis } from "lucide-react";
import { useCopyPostUrl } from "@/hooks";
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
  const { copyPostUrl } = useCopyPostUrl();
  const { isSaved, isDeleting, handleSavePost, handleDeletePost } =
    usePostActions(post);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const menuItems = !currentUser
    ? GUEST_MENU_ITEMS
    : currentUser.id === user.id
      ? POST_HEADER_USER_MENU_ITEMS
      : POST_HEADER_MENU_ITEMS;

  const getMenuLabel = (action, label) => {
    if (action === "save") {
      return isSaved ? "Bỏ lưu" : label;
    }
    return label;
  };

  // Handle menu actions
  const handleAction = (action) => {
    switch (action) {
      case "copyLink":
        copyPostUrl(post);
        break;

      case "save":
        handleSavePost();
        break;

      case "delete":
        setOpenDeleteDialog(true);
        break;

      default:
        console.log("Unhandled action:", action);
        break;
    }
  };

  const handleConfirmDelete = async () => {
    await handleDeletePost();
    setOpenDeleteDialog(false);
  };

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

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="flex max-w-72 flex-col items-center p-0"
        >
          <DialogHeader className="px-3 py-5">
            <DialogTitle className="text-center">Xóa bài viết?</DialogTitle>
            <DialogDescription className="text-md mt-3 text-center">
              Nếu xóa bài viết này, bạn sẽ không khôi phục được nữa.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="w-full">
            <ButtonGroup className="w-full">
              <Button
                variant="outline"
                className="min-h-12 flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteDialog(false);
                }}
                disabled={isDeleting}
              >
                Hủy
              </Button>
              <Button
                variant="outline"
                className="min-h-12 flex-1 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleConfirmDelete();
                }}
                disabled={isDeleting}
              >
                Xóa
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostHeader;
