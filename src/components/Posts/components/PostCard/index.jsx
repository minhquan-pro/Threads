import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Link } from "lucide-react";

import PostHeader from "../PostHeader";
import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";

const PostCard = () => {
  return (
    <div className="flex max-w-[650px] items-start gap-2 border-t p-4 first-of-type:border-t-0">
      <UserProfileDialog />
      <div>
        <PostHeader userName="Leminhquan" timeAgo="5 gio" />
        <p className="mb-2 text-sm font-semibold text-neutral-800">
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
        <div className="mt-2 flex items-center justify-start">
          <LikeButton count={699} />
          <CommentButton count={25} />
          <RepostButton count={34} />
          <ShareButton count={44} />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-none">
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
