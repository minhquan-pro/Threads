import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "../UserAvatar";
import { Ellipsis } from "lucide-react";
import PostModalFooter from "../PostModalFooter";
import { useState } from "react";
import { ButtonGroup } from "../ui/button-group";
import ConfirmDiscardDialog from "./components/ConfirmDiscardDialog";

const BaseThreadModal = ({
  isOpen,
  onClose,
  title,
  content = "",
  onSubmit,
  submitDisabled = false,
  children,
  loading = false,
  maxLength = 500,
}) => {
  const contentLength = String(content || "").length;
  const isSubmitDisabled =
    submitDisabled ||
    loading ||
    contentLength > maxLength ||
    contentLength === 0;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    if (!content) {
      onClose();
      return;
    }
    setOpen(true);
  };

  const handleDiscard = () => {
    setOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="dark:border-card flex max-h-[700px] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl! border-gray-200 bg-white p-0 sm:min-w-[500px] dark:bg-[#181818]">
          {/* Header */}
          <DialogHeader className="sticky top-0 right-0 left-0 z-50 min-h-16 border-b border-gray-300 bg-white px-6 pt-5 pb-3 shadow-sm dark:border-gray-800 dark:bg-[#181818]">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="h-auto p-0 font-semibold text-gray-900 hover:bg-transparent hover:opacity-70 dark:text-white"
              >
                Hủy
              </Button>
              <DialogTitle className="absolute left-1/2 -translate-x-1/2 text-gray-900 dark:text-white">
                {title}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full border-2 border-gray-800 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Tùy chọn khác"
              >
                <Ellipsis size={20} />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="mt-3 flex-1 overflow-y-auto bg-white px-6 dark:bg-[#181818]">
            {children}
            <div className="mt-4 flex items-center gap-2 pl-3">
              <UserAvatar imgSize="w-4 h-4" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Thêm vào threads
              </span>
            </div>
          </div>

          {/* Footer */}
          <PostModalFooter
            onSubmit={onSubmit}
            maxLength={maxLength}
            contentLength={contentLength}
            isSubmitDisabled={isSubmitDisabled}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
      <ConfirmDiscardDialog
        open={open}
        onDiscard={handleDiscard}
        onCancel={handleCancel}
      />
    </>
  );
};

export default BaseThreadModal;
