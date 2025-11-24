import { MessageSquareQuote, Repeat } from "lucide-react";
import Interactions from "../Interactions";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useOptimisticRepost } from "@/hooks/useOptimisticRepost";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import QuoteModal from "../Posts/components/QuoteModal";

const RepostButton = ({ postId, count, isReposted, hasMenu = false }) => {
  const [isOpenQuote, setIsOpenQuote] = useState(false);
  const { toggleRepost } = useOptimisticRepost("post");

  const handleRepost = () => {
    try {
      toggleRepost({ postId, isReposted });
      toast(isReposted ? "Đã gỡ" : "Đã đăng lại", {
        autoClose: 1000,
        position: "bottom-center",
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra! Vui lòng thử lại", {
        autoClose: 1000,
        position: "bottom-center",
        theme: "colored",
      });
    }
  };

  const handleCloseDialog = useCallback(() => {
    setIsOpenQuote(false);
  }, []);

  if (!hasMenu) {
    return (
      <Interactions
        count={count}
        Icon={Repeat}
        onClick={handleRepost}
        isActive={isReposted}
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
              count={count}
              Icon={Repeat}
              isActive={isReposted}
              activeClass="text-blue-600"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 border border-gray-300"
        >
          <DropdownMenuItem
            onClick={handleRepost}
            className="text-md flex justify-between p-3 font-semibold"
          >
            <span>{isReposted ? "Bỏ đăng lại" : "Đăng lại"}</span>
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
        postId={postId}
        isOpen={isOpenQuote}
        onClose={handleCloseDialog}
      />
    </div>
  );
};
export default RepostButton;
