import { useRef, useState } from "react";

import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useImageExport } from "@/hooks";
import FeedItem from "@/components/Posts/FeedItem";
import Loading from "@/components/common/Loading";

const ASPECT_RATIOS = [
  { label: "Tự động", value: "auto" },
  { label: "Vuông", value: "square" },
  { label: "Bài viết trên instagram", value: "instagram" },
];

const CopyImageDialog = ({ isOpen, post, onClose }) => {
  const elementRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0].label);
  const [showStats, setShowStats] = useState(true);
  const { loadingCopy, loadingDownload, copyImage, downloadImage } =
    useImageExport();

  const handleCopyImage = async () => {
    copyImage(elementRef.current, aspectRatio, onClose);
  };

  const handleDownloadImage = async () => {
    downloadImage(
      elementRef.current,
      `post-${post.id}.png`,
      aspectRatio,
      onClose,
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <ModalContent className="min-h-[40vh] max-w-2xl overflow-y-auto bg-gray-100 p-0 dark:bg-[#181818]">
        <ModalTitle />
        <div ref={elementRef} className="relative py-3">
          <div className="m-auto h-fit w-[90%] rounded-2xl bg-white p-5 dark:bg-[#252424]">
            <FeedItem post={post} showStats={showStats} />
          </div>
          <div className="absolute inset-0 z-10 bg-transparent"></div>
        </div>
        <div className="sticky bottom-0 flex min-h-16 items-center justify-between bg-white px-4 py-2 dark:bg-[#181818]">
          <div className="mr-auto flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={showStats}
              onCheckedChange={() => setShowStats(!showStats)}
            />
            <Label htmlFor="terms" className="dark:text-gray-200">
              Hiển thị số liệu
            </Label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 rounded-md border border-gray-800 p-2 text-sm font-bold outline-none hover:opacity-80 dark:border-gray-300 dark:text-gray-200">
                {aspectRatio} <ChevronDown />{" "}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-gray-800 dark:border-gray-300 dark:bg-[#242424]">
              {ASPECT_RATIOS.map(({ label, value }) => {
                return (
                  <DropdownMenuItem
                    key={value}
                    className={`flex justify-between p-3 font-semibold dark:text-gray-200 dark:hover:bg-[#2f2f2f] ${aspectRatio === label && "border-3 border-blue-400 dark:border-blue-500"}`}
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
              className={
                "w-14 dark:border-gray-600 dark:bg-[#242424] dark:text-gray-200 dark:hover:bg-[#2f2f2f]"
              }
            >
              {loadingDownload ? <Loading size={"w-4 h-4"} /> : <Download />}
            </Button>
            <Button onClick={handleCopyImage} className={"w-28"}>
              {loadingCopy ? <Loading size={"w-4 h-4"} /> : "Sao Chép"}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
export default CopyImageDialog;
