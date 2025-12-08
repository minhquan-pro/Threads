import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "../UserAvatar";
import { Ellipsis } from "lucide-react";
import PostModalFooter from "../PostModalFooter";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[700px] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl! p-0 sm:min-w-[500px]">
        {/* Header */}
        <DialogHeader className="sticky top-0 right-0 left-0 z-50 min-h-16 border-b border-gray-300 bg-white px-6 pt-5 pb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-auto p-0 font-semibold hover:bg-transparent hover:opacity-70"
            >
              Hủy
            </Button>
            <DialogTitle className="absolute left-1/2 -translate-x-1/2">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full border-2"
              aria-label="Tùy chọn khác"
            >
              <Ellipsis size={20} />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="mt-3 flex-1 overflow-y-auto px-6">
          {children}
          <div className="mt-4 flex items-center gap-2 pl-3">
            <UserAvatar imgSize="w-4 h-4" />
            <span className="text-sm text-gray-500">Thêm vào threads</span>
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
  );
};

export default BaseThreadModal;
