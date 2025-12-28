import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import { useConfirmDiscardDialog } from "@/hooks/useConfirmDiscardDialog";

const ConfirmDiscardDialog = ({ open, onDiscard, onCancel }) => {
  const { showSaveOption, title, desc } = useConfirmDiscardDialog();

  return (
    <Modal
      isOpen={open}
      onClose={onCancel}
      className="flex items-center justify-center"
    >
      <ModalContent className="flex max-w-xs flex-col items-center rounded-2xl p-0 dark:bg-[#181818]">
        <div className={"p-8 text-center"}>
          <ModalTitle className="text-center text-gray-900 dark:text-white">
            {title || "Bỏ thread?"}
          </ModalTitle>
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
      </ModalContent>
    </Modal>
  );
};
export default ConfirmDiscardDialog;
