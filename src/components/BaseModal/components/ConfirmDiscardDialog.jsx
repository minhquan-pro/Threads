import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmDiscardDialog = ({ open, onDiscard, onCancel }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="flex w-[280px] flex-col items-center rounded-2xl p-0 dark:bg-[#181818]">
        <DialogHeader className={"p-5"}>
          <DialogTitle className="text-gray-900 dark:text-white">
            Bỏ thread?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className={"w-full"}>
          <ButtonGroup className={"w-full"}>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 p-6 dark:text-white"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              variant="outline"
              className="text-md flex-1 border-gray-300 p-6 text-red-500"
              onClick={onDiscard}
            >
              Bỏ
            </Button>
          </ButtonGroup>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmDiscardDialog;
