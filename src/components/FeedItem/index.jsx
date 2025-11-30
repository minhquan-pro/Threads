import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";
import { useCurrentUser } from "@/features/auth";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import QuoteItem from "../QuoteItem";
import { useNavigate } from "react-router";

const FeedItem = ({ post, variant, hideInteraction = false }) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {
    id,
    content,
    user,
    created_at,
    media_urls,
    original_post,
    parent_id,
    original_post_id,
  } = post;

  const handleClickPost = (e) => {
    e.stopPropagation();
    navigate(`/@${user.username}/post/${id}`, {
      state: {
        parentId: parent_id,
      },
    });
  };

  return (
    <div className="w-full cursor-pointer">
      <div className="flex items-start gap-2">
        <UserProfileDialog user={user} />
        <div className="w-full" onClick={handleClickPost}>
          <PostHeader user={user} createdAt={created_at} />
          {variant !== "quote" && (
            <>
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
              {!hideInteraction && (
                <div
                  className="pointer-events-auto flex items-center justify-start"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LikeButton post={post} />
                  <CommentButton post={post} />
                  <RepostButton post={post} hasMenu={currentUser} />
                  <ShareButton />
                </div>
              )}
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
