import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "../UserAvatar";
import { ArrowUpDown, Ellipsis } from "lucide-react";

const BaseThreadModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitDisabled,
  children,
  loading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="border-none">
      <DialogContent className="flex max-h-[700px] max-w-[600px] min-w-[500px] flex-col gap-0 overflow-hidden rounded-2xl! p-0">
        {/* Header */}
        <DialogHeader className="sticky top-0 right-0 left-0 z-50 min-h-16 border-b border-gray-300 bg-white pt-5 pb-3 shadow">
          <div className="flex px-6">
            <div
              className="cursor-pointer font-semibold hover:opacity-70"
              onClick={onClose}
            >
              Hủy
            </div>
            <DialogTitle className="m-auto">{title}</DialogTitle>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-3">
              <Ellipsis size={20} />
            </div>
          </div>
        </DialogHeader>
        {/* Children */}
        <div className="mt-3 flex-1 overflow-y-auto ps-6 pe-6">
          {children}
          <div className="mt-4 flex items-center gap-2 pl-3">
            <UserAvatar imgSize="w-4 h-4" />
            <div className="text-gray-500">Thêm vào threads</div>
          </div>
        </div>
        {/* Footer */}
        <DialogFooter className="right-0 bottom-0 left-0 z-50 mt-3 min-h-20 items-center border-t border-gray-100 bg-white py-3 ps-6 pe-6 shadow">
          <Button
            variant="outline"
            className="mr-auto border-none p-0 text-gray-500 shadow-none outline-none hover:bg-white"
          >
            <div className="rounded-sm border-2 p-0.5">
              <ArrowUpDown />
            </div>
            <div>Các lựa chọn để kiểm soát câu trả lời</div>
          </Button>
          <Button disabled={submitDisabled || loading} onClick={onSubmit}>
            Đăng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BaseThreadModal;
