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

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  onConfirm,
  onCancel,
  variant = "destructive",
}) => {
  const handleConfirm = async (e) => {
    e?.stopPropagation();
    await onConfirm?.();
  };

  const handleCancel = (e) => {
    e?.stopPropagation();
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        onPointerDownOutside={(e) => e.preventDefault()}
        className="flex max-w-72 flex-col items-center border-gray-200 bg-white p-0 dark:border-[#2f2f2f] dark:bg-[#181818]"
      >
        <DialogHeader className="px-3 py-5">
          <DialogTitle className="text-center text-gray-900 dark:text-white">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-md mt-3 text-center text-gray-600 dark:text-gray-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="w-full">
          <ButtonGroup className="w-full">
            <Button
              variant="outline"
              className="min-h-12 flex-1 border-gray-300 dark:border-[#2f2f2f] dark:bg-[#181818] dark:text-gray-300 dark:hover:bg-[#242424] dark:hover:text-white"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="outline"
              className={`min-h-12 flex-1 border-gray-300 dark:border-[#2f2f2f] dark:bg-[#181818] ${
                variant === "destructive"
                  ? "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:bg-[#242424] dark:hover:text-red-300"
                  : "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:bg-[#242424] dark:hover:text-blue-300"
              }`}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </ButtonGroup>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
