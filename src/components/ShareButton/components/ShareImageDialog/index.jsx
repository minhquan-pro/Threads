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
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import Loading from "@/components/Loading";
import { toast } from "@/utils/toast";

const ShareImageDialog = ({ isOpen, post, onCloseDialog }) => {
  const elementRef = useRef(null);
  const [showStats, setShowStats] = useState(true);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const generateImage = async () => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    try {
      const dataUrl = await htmlToImage.toPng(element, {
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
        pixelRatio: 2,
        cacheBust: true,
      });
      return dataUrl;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handleCopyImage = async () => {
    setLoadingCopy(true);
    try {
      const dataUrl = await generateImage();
      const blob = await fetch(dataUrl).then((res) => res.blob());

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.default("Đã sao chép hình ảnh");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCopy(false);
      onCloseDialog();
    }
  };

  const handleDownloadImage = async () => {
    setLoadingDownload(true);
    try {
      const dataUrl = await generateImage();
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `post-${post.id}.png`;
      link.click();
    } catch (error) {
      console.log(error);
      toast.error("Không thể tải hình ảnh", {
        theme: "colored",
      });
    } finally {
      setLoadingDownload(false);
      onCloseDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      <DialogContent className="min-h-[40vh] max-w-2xl overflow-y-auto bg-gray-100 p-0">
        <DialogTitle />
        <div ref={elementRef} className="relative py-3">
          <div className="m-auto h-fit w-[90%] rounded-2xl bg-white p-5">
            <FeedItem post={post} showStats={showStats} />
          </div>
          <div className="absolute inset-0 z-10 bg-transparent"></div>
        </div>
        <div className="sticky bottom-0 flex min-h-16 items-center justify-between bg-white px-4 py-2">
          <div className="mr-auto flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={showStats}
              onCheckedChange={() => setShowStats(!showStats)}
            />
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
            <Button
              variant={"outline"}
              onClick={handleDownloadImage}
              className={"w-14"}
            >
              {loadingDownload ? <Loading size={"w-4 h-4"} /> : <Download />}
            </Button>
            <Button onClick={handleCopyImage} className={"w-28"}>
              {loadingCopy ? <Loading size={"w-4 h-4"} /> : "Sao Chép"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareImageDialog;
