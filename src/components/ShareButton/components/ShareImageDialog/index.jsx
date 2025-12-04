import { useRef, useState } from "react";

import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useImageExport } from "@/hooks";
import FeedItem from "@/components/FeedItem";
import Loading from "@/components/Loading";

const ASPECT_RATIOS = [
  { label: "Tự động", value: "auto" },
  { label: "Vuông", value: "square" },
  { label: "Bài viết trên instagram", value: "instagram" },
];

const ShareImageDialog = ({ isOpen, post, onCloseDialog }) => {
  const elementRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0].label);
  const [showStats, setShowStats] = useState(true);
  const { loadingCopy, loadingDownload, copyImage, downloadImage } =
    useImageExport();

  const handleCopyImage = async () => {
    copyImage(elementRef.current, aspectRatio, onCloseDialog);
  };

  const handleDownloadImage = async () => {
    downloadImage(
      elementRef.current,
      `post-${post.id}.png`,
      aspectRatio,
      onCloseDialog,
    );
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
              <div className="flex items-center gap-2 rounded-md border border-gray-300 p-2 text-sm font-bold outline-none hover:opacity-80">
                {aspectRatio} <ChevronDown />{" "}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-300">
              {ASPECT_RATIOS.map(({ label, value }) => {
                return (
                  <DropdownMenuItem
                    key={value}
                    className={`flex justify-between p-3 font-semibold ${aspectRatio === label && "border-3 border-blue-400"}`}
                    onClick={() => setAspectRatio(label)}
                  >
                    <span>{label}</span>
                  </DropdownMenuItem>
                );
              })}
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
