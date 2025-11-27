import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";
import { useCurrentUser } from "@/features/auth";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import QuoteItem from "../QuoteItem";

const FeedItem = ({ post, variant, hideInteraction = false }) => {
  const currentUser = useCurrentUser();

  const { content, user, media_urls, original_post, original_post_id } = post;

  return (
    <div className="w-full">
      <div className="flex items-start gap-2">
        <UserProfileDialog user={user} />
        <div className="w-full">
          <PostHeader user={user} />
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
                <div className="flex items-center justify-start">
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
