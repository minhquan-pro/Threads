import { useNavigate } from "react-router";
import { Heart, MessageCircle, Repeat, Send } from "lucide-react";

import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";
import { useCurrentUser } from "@/features/auth";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import QuoteItem from "../QuoteItem";

const FeedItem = ({
  type = "post",
  post,
  variant,
  hideInteraction = false,
  disableNavigation = false,
  showStats = true,
  showMenu = true,
}) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {
    id,
    content,
    user,
    created_at,
    media_urls,
    parent_id,
    original_post,
    original_post_id,
  } = post;

  const handleClickPost = async (e) => {
    if (disableNavigation) return;

    e.stopPropagation();
    navigate(`/@${user.username}/post/${id}`, {
      state: {
        parentId: parent_id,
      },
    });
  };

  return (
    <div className={`w-full ${!disableNavigation && "cursor-pointer"}`}>
      <div className="flex items-start gap-2">
        <UserProfileDialog user={user} />
        <div className="w-full">
          <PostHeader
            type={type}
            post={post}
            user={user}
            createdAt={created_at}
            showStats={showStats}
            showMenu={showMenu}
          />
          {variant !== "quote" && (
            <>
              <div onClick={handleClickPost}>
                <PostContent
                  content={content}
                  mediaUrls={media_urls}
                  original_post={original_post}
                />

                {original_post && (
                  <QuoteItem
                    quotedPostId={original_post_id}
                    quotedPost={original_post}
                  />
                )}
              </div>

              {!hideInteraction &&
                (showStats ? (
                  <div
                    className="pointer-events-auto mt-1 flex items-center justify-start"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LikeButton post={post} type={type} />
                    <CommentButton post={post} />
                    <RepostButton post={post} hasMenu={currentUser} />
                    <ShareButton post={post} hasMenu={currentUser} />
                  </div>
                ) : (
                  <div
                    className="mt-3 flex items-center gap-6 pl-3 text-gray-600 dark:text-gray-400"
                    aria-hidden="true"
                  >
                    <Heart size={16} />
                    <MessageCircle size={16} />
                    <Repeat size={16} />
                    <Send size={16} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      {variant === "quote" && (
        <PostContent content={content} mediaUrls={media_urls} />
      )}
    </div>
  );
};

export default FeedItem;
