import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";
import { useCurrentUser } from "@/features/auth";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import QuoteItem from "../QuoteItem";
import Provider from "@/context/PermissionContext";

const FeedItem = ({ post, variant }) => {
  const currentUser = useCurrentUser();

  const {
    id,
    content,
    user,
    replies_count,
    likes_count,
    media_urls,
    reposts_and_quotes_count,
    is_liked_by_auth,
    is_reposted_by_auth,
    original_post,
    original_post_id,
    reply_permission,
  } = post;

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
                  post={post}
                  originalPostId={original_post_id}
                  originalPost={original_post}
                />
              )}
              <div className="flex items-center justify-start">
                <LikeButton
                  postId={id}
                  count={likes_count}
                  isLiked={is_liked_by_auth}
                />
                <CommentButton count={replies_count} />
                <Provider permission={reply_permission}>
                  <RepostButton
                    postId={id}
                    count={reposts_and_quotes_count}
                    isReposted={is_reposted_by_auth}
                    hasMenu={currentUser}
                  />
                </Provider>
                <ShareButton />
              </div>
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
