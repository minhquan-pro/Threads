import { MessageSquareQuote, Repeat } from "lucide-react";
import Interactions from "../Interactions";
import { useDispatch } from "react-redux";
import { repostPost } from "@/services/Posts";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const RepostButton = ({ postId, count, isReposted, hasMenu = false }) => {
  const dispatch = useDispatch();
  const handleRepost = async () => {
    try {
      await dispatch(repostPost(postId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

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
          onClick={handleRepost}
          className="text-md flex justify-between p-3 font-semibold"
        >
          <span>Trích dẫn</span>
          <MessageSquareQuote className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default RepostButton;
