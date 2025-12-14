import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UserAvatar from "../UserAvatar";
import PostModalFooter from "../PostModalFooter";
import PostModalHeader from "../PostModalHeader";

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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="dark:border-card flex max-h-[700px] w-full max-w-[600px] flex-col gap-0 overflow-hidden rounded-2xl! border-gray-200 bg-white p-0 sm:min-w-[500px] dark:bg-[#181818]">
          <DialogTitle className="sr-only">{title}</DialogTitle>

          {/* Header */}
          <PostModalHeader title={title} content={content} onClose={onClose} />
          {/* Content */}
          <div className="mt-3 flex-1 overflow-y-auto bg-white px-6 dark:bg-[#181818]">
            {children}

            {/* Add to thread button */}
            <button
              type="button"
              className="mt-4 flex items-center gap-2 pl-3 text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-300"
              disabled={loading}
            >
              <UserAvatar imgSize="w-4 h-4" />
              <span className="text-sm">Thêm vào threads</span>
            </button>
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
    </>
  );
};

export default BaseThreadModal;
