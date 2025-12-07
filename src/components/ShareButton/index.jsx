import { Send } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import Interactions from "../Interactions";
import { getShareMenuItems } from "@/constants/getShareMenuItems";
import ShareDropdownMenu from "./components/ShareDropdownMenu";
import { useState } from "react";
import CopyImageDialog from "./components/CopyImageDialog";
import EmbedModal from "../EmbedModal";
import { useCopyPostUrl } from "@/hooks";

const ShareButton = ({ post, hasMenu = false }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isEmbedCodeDialogOpen, setIsEmbedCodeDialogOpen] = useState(false);
  const { copyPostUrl } = useCopyPostUrl();

  const handleCopy = () => {
    copyPostUrl(post);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const shareMenuItems = getShareMenuItems({
    onCopyLink: handleCopy,
    onCopyImage: () => setIsOpenDialog(true),
    onEmbed: () => setIsEmbedCodeDialogOpen(true),
  });

  if (!hasMenu) {
    return (
      <Interactions
        Icon={Send}
        activeClass="text-blue-600"
        title="Đăng ký để đăng lại"
        description="Bạn đã tiến thêm được một bước trong hành trình khơi mào cuộc trò chuyện."
      />
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Interactions Icon={Send} activeClass="text-blue-600" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-64 border border-gray-300"
        >
          <ShareDropdownMenu items={shareMenuItems} />
        </DropdownMenuContent>
      </DropdownMenu>

      <CopyImageDialog
        isOpen={isOpenDialog}
        post={post}
        onClose={handleCloseDialog}
      />
      <EmbedModal
        isOpen={isEmbedCodeDialogOpen}
        post={post}
        onClose={() => setIsEmbedCodeDialogOpen(false)}
      />
    </div>
  );
};
export default ShareButton;
