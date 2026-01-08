import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import PostModalFooter from "../../Posts/PostModalFooter";
import PostModalHeader from "../../Posts/PostModalHeader";
import UserAvatar from "@/components/users/UserAvatar";

const BaseThreadModal = ({
  isOpen,
  onClose,
  title,
  firstThreadContent = "",
  hasContent = false,
  lastThreadContent = "",
  onSubmit,
  submitDisabled = false,
  children,
  loading = false,
  maxLength = 500,
  onAddThread,
}) => {
  const contentLength = String(firstThreadContent || "").length;

  const canAddThread = lastThreadContent.trim().length > 0;

  const isSubmitDisabled =
    submitDisabled || loading || contentLength > maxLength || !hasContent;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="items-end justify-center p-0! md:items-center md:p-4!"
    >
      <ModalContent className="animate-in slide-in-from-bottom-5 flex h-screen w-screen flex-col gap-0 overflow-hidden rounded-none border-0 p-0 duration-300 sm:min-w-[500px] md:h-auto md:max-h-[700px] md:w-full md:max-w-[600px] md:animate-none md:rounded-lg md:border">
        <ModalTitle className="sr-only">{title}</ModalTitle>

        {/* Header */}
        <PostModalHeader
          title={title}
          content={firstThreadContent}
          onClose={onClose}
        />

        {/* Content */}
        <div className="mt-3 overflow-y-auto bg-white px-3 md:flex-1 md:px-6 dark:bg-[#181818]">
          {children}

          {/* Add to thread button */}
          <button
            type="button"
            className={`mt-4 flex items-center gap-2 pl-3 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-300`}
            disabled={loading || !canAddThread}
            onClick={onAddThread}
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
      </ModalContent>
    </Modal>
  );
};

export default BaseThreadModal;
