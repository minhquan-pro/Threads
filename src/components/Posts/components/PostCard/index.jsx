import PostHeader from "../PostHeader";
import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";

import useEmblaCarousel from "embla-carousel-react";

const PostCard = ({ post }) => {
  const [emblaRef] = useEmblaCarousel();
  const {
    content,
    user,
    replies_count,
    likes_count,
    media_urls,
    reposts_and_quotes_count,
  } = post;

  return (
    <div className="flex w-[650px] flex-col items-start overflow-hidden border-t border-gray-300 p-3 first-of-type:border-t-0">
      <div className="flex gap-2">
        <UserProfileDialog user={user} />
        <div className="min-w-0 flex-1">
          <PostHeader user={user} />
          <p className="text-[15px] wrap-break-word">{content}</p>
        </div>
      </div>
      <div className="mt-1 w-full pl-12">
        <div ref={emblaRef}>
          <div className="flex items-center gap-2">
            {media_urls.map((url) => {
              return (
                <img
                  key={url}
                  src={url}
                  alt=""
                  className="min-h-52 min-w-40 rounded-md object-cover"
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-start">
          <LikeButton count={likes_count} />
          <CommentButton count={replies_count} />
          <RepostButton count={reposts_and_quotes_count} />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};
export default PostCard;
