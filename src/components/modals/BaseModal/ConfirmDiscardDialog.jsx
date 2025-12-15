import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useConfirmDiscardDialog } from "@/hooks/useConfirmDiscardDialog";

const ConfirmDiscardDialog = ({ open, onDiscard, onCancel }) => {
  const { showSaveOption, title, desc } = useConfirmDiscardDialog();

  return (
    <Dialog open={open}>
      <DialogContent className="flex w-[300px] flex-col items-center rounded-2xl p-0 dark:bg-[#181818]">
        <DialogHeader className={"p-8"}>
          <DialogTitle className="text-center text-gray-900 dark:text-white">
            {title || "Bỏ thread?"}
          </DialogTitle>
          {desc && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {desc}
            </p>
          )}
        </DialogHeader>

        {showSaveOption ? (
          <DialogFooter className={"w-full"}>
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
          </DialogFooter>
        ) : (
          <DialogFooter className={"w-full"}>
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
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDiscardDialog;
