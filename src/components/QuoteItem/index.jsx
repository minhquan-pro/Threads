import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MoveRight } from "lucide-react";

import { getPostById } from "@/services/Posts";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import UserAvatar from "../UserAvatar";
import Loading from "../Loading";

const QuoteItem = ({ quotedPostId, quotedPost }) => {
  const navigate = useNavigate();
  const { user, content, media_urls } = quotedPost;
  const [originalPost, setOriginalPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickPost = (e) => {
    e.stopPropagation();
    navigate(`/@${user.username}/post/${quotedPostId}`);
  };

  // extra handler when api returns without media_urls field
  useEffect(() => {
    const needsFetch = !media_urls?.length;

    if (!needsFetch || !quotedPostId) return;

    let isCancelled = false;

    (async () => {
      setLoading(true);
      try {
        const response = await getPostById(quotedPostId);
        if (!isCancelled) {
          setOriginalPost(response.original_post);
        }
      } catch (error) {
        console.error("Failed to fetch quote post:", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [media_urls, quotedPostId]);

  if (loading) {
    return (
      <div className="mt-2 flex justify-center rounded-xl border border-gray-300 p-6">
        <Loading size="w-4 h-4" className="text-gray-400" />
      </div>
    );
  }

  return (
    <div
      className="mt-2 flex items-start gap-2 rounded-xl border border-gray-300 p-3"
      onClick={handleClickPost}
    >
      <div>
        <UserAvatar src={user.avatar_url} imgSize="h-6 w-6" />
      </div>
      <div className="w-full">
        <PostHeader user={user} createdAt={quotedPost.created_at} />
        <div>
          <PostContent content={content} mediaUrls={originalPost?.media_urls} />
          {originalPost && (
            <div className="mt-1 flex items-center gap-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
              <MoveRight size={15} color="gray" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span> {originalPost?.user.username}</span>
                {": "} {originalPost?.content}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuoteItem;
