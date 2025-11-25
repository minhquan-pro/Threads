import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

import { getPostById } from "@/services/Posts";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import UserAvatar from "../UserAvatar";
import Loading from "../Loading";

const QuoteItem = ({ originalPostId, originalPost }) => {
  const { user, content, media_urls } = originalPost;
  const [nestedPost, setNestedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // extra handler when api returns without media_urls field
  useEffect(() => {
    const needsFetch = !media_urls;
    if (!needsFetch || !originalPostId) return;

    let isCancelled = false;

    (async () => {
      setLoading(true);
      try {
        const response = await getPostById(originalPostId);
        if (!isCancelled) {
          setNestedPost(response.original_post);
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
  }, [media_urls, originalPostId]);

  if (loading) {
    return (
      <div className="mt-2 flex justify-center rounded-xl border border-gray-300 p-6">
        <Loading size="w-4 h-4" className="text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mt-2 flex items-start gap-2 rounded-xl border border-gray-300 p-3">
      <div>
        <UserAvatar src={user.avatar_url} imgSize="h-6 w-6" />
      </div>
      <div>
        <PostHeader user={user} />
        <div>
          <PostContent content={content} mediaUrls={nestedPost?.media_urls} />
          {nestedPost && (
            <div className="mt-1 flex items-center gap-2">
              <MoveRight size={15} color="gray" />
              <span className="text-sm text-gray-500">
                {nestedPost?.user.username}:{nestedPost?.content}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuoteItem;
