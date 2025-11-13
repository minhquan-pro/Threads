import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, Link, Plus } from "lucide-react";
import PostInteractions from "../PostInteractions";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostCard = () => {
  const handleLike = () => {};
  const handleComment = () => {};
  const handleRepost = () => {};
  const handleSend = () => {};

  return (
    <div className="flex max-w-[650px] items-start gap-2 border-t p-4 first-of-type:border-t-0">
      <div className="relative cursor-pointer">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
            className="h-10 w-10 rounded-full"
          />
        </Avatar>
        <div className="absolute right-0 bottom-0 rounded-full bg-black p-0.5 hover:scale-120">
          <Plus size={11} color="white" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-sm">
            <span className="font-bold">Leminhquan022</span>
            <span className="text-gray-400">1 giờ</span>
          </div>
        </div>
        <p className="text-md mb-2 text-black">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
          cupiditate laborum harum labore in? Expedita rem culpa deserunt,
          ducimus dicta dolore maxime odio explicabo fuga! Quibusdam repellendus
          esse eum pariatur.
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
          alt=""
          className="max-h-[430px] rounded-md object-cover"
        />
        <div className="mt-2 flex">
          <PostInteractions
            count={6}
            onClick={handleLike}
            Icon={Heart}
            title="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
            description="Hãy đăng ký để thích, trả lời và hơn thế nữa."
          />
          <PostInteractions
            count={6}
            onClick={handleComment}
            Icon={MessageCircle}
            title="Đăng ký để trả lời"
            description="Chỉ còn một bước nữa là bạn có thể tham gia cuộc trò chuyện rồi."
          />
          <PostInteractions
            count={6}
            onClick={handleRepost}
            Icon={Repeat2}
            title="Đăng ký để đăng lại"
            description="Bạn đã tiến thêm được một bước trong hành trình khơi mào cuộc trò chuyện."
          />
          <PostInteractions
            count={6}
            onClick={handleSend}
            Icon={Send}
            title="Bày tỏ nhiều hơn qua Threads"
            description="Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa."
          />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Ellipsis size={18} color="gray" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-md p-3 font-bold">
            Sao chép liên kết <Link className="ml-10" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default PostCard;
