import copy from "copy-to-clipboard";
import { Send } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import Interactions from "../Interactions";
import { toast } from "@/utils/toast";
import { getShareMenuItems } from "@/constants/getShareMenuItems";
import ShareDropdownMenu from "./components/ShareDropdownMenu";
import { useState } from "react";
import CopyImageDialog from "./components/CopyImageDialog";
import EmbedModal from "../EmbedModal";

const ShareButton = ({ post, hasMenu = false }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isEmbedCodeDialogOpen, setIsEmbedCodeDialogOpen] = useState(false);

  const handleCopy = () => {
    const postUrl = `${window.location.origin}/${post.user.username}/post/${post.id}`;
    const success = copy(postUrl);

    if (success) {
      toast.default("Đã sao chép");
    }
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
        count={post.reposts_and_quotes_count}
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
