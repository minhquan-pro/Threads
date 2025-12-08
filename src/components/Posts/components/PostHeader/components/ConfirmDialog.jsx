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
        className="flex max-w-72 flex-col items-center p-0"
      >
        <DialogHeader className="px-3 py-5">
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-md mt-3 text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="w-full">
          <ButtonGroup className="w-full">
            <Button
              variant="outline"
              className="min-h-12 flex-1"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              variant="outline"
              className={`min-h-12 flex-1 ${
                variant === "destructive"
                  ? "text-red-500 hover:text-red-600"
                  : "text-blue-500 hover:text-blue-600"
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
