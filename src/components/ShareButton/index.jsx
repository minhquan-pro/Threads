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
import ShareImageDialog from "./components/ShareImageDialog";
import { useState } from "react";

const ShareButton = ({ post, hasMenu = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    const postUrl = `${window.location.origin}/${post.user.username}/post/${post.id}`;
    const success = copy(postUrl);

    if (success) {
      toast.default("Đã sao chép");
    }
  };

  const shareMenuItems = getShareMenuItems({
    onCopyLink: handleCopy,
    onCopyImage: () => setIsOpen(true),
    onEmbed: () => {},
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

      <ShareImageDialog isOpen={isOpen} post={post} />
    </div>
  );
};
export default ShareButton;
