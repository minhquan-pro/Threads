import { MessageSquareQuote, Repeat } from "lucide-react";

import { useOptimisticRepost } from "@/hooks/useOptimisticRepost";
import { useCallback, useState } from "react";
import { toast } from "@/utils/toast";
import Interactions from "..";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuoteModal from "@/components/Posts/components/QuoteModal";

const RepostButton = ({ post, hasMenu = false }) => {
  const [isOpenQuote, setIsOpenQuote] = useState(false);
  const { toggleRepost } = useOptimisticRepost("post");

  const handleRepost = () => {
    try {
      toggleRepost({ postId: post.id, isReposted: post.is_reposted_by_auth });
      toast.default(post.is_reposted_by_auth ? "Đã gỡ" : "Đã đăng lại");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra! Vui lòng thử lại");
    }
  };

  const handleCloseDialog = useCallback(() => {
    setIsOpenQuote(false);
  }, []);

  if (!hasMenu) {
    return (
      <Interactions
        count={post.reposts_and_quotes_count}
        Icon={Repeat}
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
            <Interactions
              count={post.reposts_and_quotes_count}
              Icon={Repeat}
              isActive={post.is_reposted_by_auth}
              activeClass="text-blue-600 dark:text-blue-600"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 border border-gray-300 dark:border-[#323030]"
        >
          <DropdownMenuItem
            onClick={handleRepost}
            className="text-md flex justify-between p-3 font-semibold"
          >
            <span>{post.is_reposted_by_auth ? "Bỏ đăng lại" : "Đăng lại"}</span>
            <Repeat className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpenQuote(true)}
            className="text-md flex justify-between p-3 font-semibold"
          >
            <span>Trích dẫn</span>
            <MessageSquareQuote className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <QuoteModal
        post={post}
        isOpen={isOpenQuote}
        onClose={handleCloseDialog}
      />
    </div>
  );
};
export default RepostButton;
