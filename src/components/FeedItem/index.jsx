import PostHeader from "../PostHeader";
import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";
import { useCurrentUser } from "@/features/auth";
import PostContent from "../PostContent";

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
  } = post;

  return (
    <>
      <div>
        <div className="flex items-start gap-2">
          <UserProfileDialog user={user} />
          <div>
            <PostHeader user={user} />
            {variant !== "quote" && (
              <>
                <PostContent content={content} media_urls={media_urls} />
                <div>
                  <div className="flex items-center justify-start">
                    <LikeButton
                      postId={id}
                      count={likes_count}
                      isLiked={is_liked_by_auth}
                    />
                    <CommentButton count={replies_count} />
                    <RepostButton
                      postId={id}
                      count={reposts_and_quotes_count}
                      isReposted={is_reposted_by_auth}
                      hasMenu={currentUser}
                    />
                    <ShareButton />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {variant === "quote" && (
          <PostContent content={content} media_urls={media_urls} />
        )}
      </div>
    </>
  );
};
export default FeedItem;
