import { useEffect, useState } from "react";

import { getPostById } from "@/services/Posts";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import UserAvatar from "../UserAvatar";

const QuoteItem = ({ originalPostId, originalPost }) => {
  const { user, content } = originalPost;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!originalPostId) return;

    (async () => {
      try {
        const response = await getPostById(originalPostId);
        setPost(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [originalPostId]);

  return (
    <div className="mt-2 flex items-start gap-2 rounded-xl border border-gray-300 bg-gray-50 p-3 shadow">
      <div>
        <UserAvatar src={user.avatar_url} imgSize="h-6 w-6" />
      </div>
      <div>
        <PostHeader user={user} />
        <PostContent content={content} mediaUrls={post?.media_urls} />
      </div>
    </div>
  );
};
export default QuoteItem;
