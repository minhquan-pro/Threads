import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import PostInteractions from "../PostInteractions";

const PostCard = () => {
  return (
    <div className="flex items-start gap-2 border-t p-4 first-of-type:border-t-0">
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
      <div className="max-w-[460px]">
        <div className="flex gap-1">
          <span className="text-[15px] font-bold">Leminhquan022</span>
          <span className="text-sm text-gray-400">1 giờ</span>
        </div>
        <p className="mb-2 text-[15px] text-black">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
          cupiditate laborum harum labore in? Expedita rem culpa deserunt,
          ducimus dicta dolore maxime odio explicabo fuga! Quibusdam repellendus
          esse eum pariatur.
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
          alt=""
          className="rounded-md object-cover"
        />
        <div className="mt-2 flex gap-1">
          <PostInteractions />
        </div>
      </div>
    </div>
  );
};
export default PostCard;
