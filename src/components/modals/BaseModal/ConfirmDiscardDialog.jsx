import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
// import { Modal, DialogContent, ModalTitle } from "@/components/common/Modal";
import { useConfirmDiscardDialog } from "@/hooks/useConfirmDiscardDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ConfirmDiscardDialog = ({ open, onDiscard, onCancel }) => {
  const { showSaveOption, title, desc } = useConfirmDiscardDialog();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      className="flex items-center justify-center"
    >
      <DialogContent className="flex w-[300px] flex-col items-center rounded-2xl p-0 dark:bg-[#181818]">
        <div className={"p-8 text-center"}>
          <DialogTitle className="text-center text-gray-900 dark:text-white">
            {title || "Bỏ thread?"}
          </DialogTitle>
          {desc && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {showSaveOption ? (
          <div className={"w-full"}>
            <ButtonGroup className={"w-full flex-col"}>
              <Button
                variant="outline"
                className="text-md flex-1 border-gray-300 bg-transparent p-6 dark:text-white"
              >
                Lưu
              </Button>
              <Button
                variant="outline"
                className="text-md flex-1 border-gray-300 bg-transparent p-6 text-red-500"
                onClick={onDiscard}
              >
                Không lưu
              </Button>
              <Button
                variant="outline"
                className="text-md flex-1 border-gray-300 bg-transparent p-6 dark:text-white"
                onClick={onCancel}
              >
                Hủy
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <div className={"w-full"}>
            <ButtonGroup className={"w-full"}>
              <Button
                variant="outline"
                className="flex-1 border-gray-300 bg-transparent p-6 dark:text-white"
                onClick={onCancel}
              >
                Hủy
              </Button>
              <Button
                variant="outline"
                className="text-md flex-1 border-gray-300 bg-transparent p-6 text-red-500"
                onClick={onDiscard}
              >
                Bỏ
              </Button>
            </ButtonGroup>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDiscardDialog;
