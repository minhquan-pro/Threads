import { Ellipsis, NotepadTextDashed } from "lucide-react";
import { Button } from "../../ui/button";
import ConfirmDiscardDialog from "../../modals/BaseModal/ConfirmDiscardDialog";
import { useState } from "react";
import { useConfirmDiscardDialog } from "@/hooks/useConfirmDiscardDialog";

const PostModalHeader = ({ title, content, onClose }) => {
  const [open, setOpen] = useState(false);
  const { showSaveOption } = useConfirmDiscardDialog();

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
      <div className="sticky top-0 right-0 left-0 z-50 min-h-16 border-b border-gray-300 bg-white px-6 pt-5 pb-3 shadow-sm dark:border-[#323030] dark:bg-[#181818]">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="h-auto p-0 font-semibold text-gray-900 hover:bg-transparent hover:opacity-70 dark:text-white"
          >
            Hủy
          </Button>
          <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <div className="flex gap-3">
            {showSaveOption && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full border-2 border-gray-800 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Tùy chọn khác"
              >
                <NotepadTextDashed size={20} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full border-2 border-gray-800 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Tùy chọn khác"
            >
              <Ellipsis size={20} />
            </Button>
          </div>
        </div>
      </div>
      <ConfirmDiscardDialog
        open={open}
        onDiscard={handleDiscard}
        onCancel={handleCancel}
      />
    </>
  );
};

export default PostModalHeader;
