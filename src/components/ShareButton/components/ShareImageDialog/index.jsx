import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import FeedItem from "@/components/FeedItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download } from "lucide-react";

const ShareImageDialog = ({ isOpen, post }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="min-h-[40vh] max-w-2xl overflow-y-auto bg-gray-100 p-0 pt-3">
        <DialogTitle />
        <div className="m-auto h-fit w-[90%] rounded-2xl bg-white p-5">
          <FeedItem post={post} />
        </div>
        <DialogFooter className="sticky bottom-0 flex min-h-16 items-center justify-between bg-white px-4 py-2">
          <div className="mr-auto flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Hiển thị số liệu</Label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 rounded-md border border-gray-300 p-2 font-bold hover:opacity-80">
                Tự động <ChevronDown />{" "}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-300">
              <DropdownMenuItem className="flex justify-between p-3 font-semibold">
                <span>Tự động</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between p-3 font-semibold">
                <span>Vuông</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between p-3 font-semibold">
                <span>Bài viết trên instagram</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="ml-auto flex items-center gap-2">
            <Button variant={"outline"}>
              <Download />
            </Button>
            <Button>Sao chép</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ShareImageDialog;
