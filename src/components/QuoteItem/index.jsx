import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MoveRight } from "lucide-react";

import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import UserAvatar from "../UserAvatar";
import Loading from "../Loading";
import { selectItemsById, selectorLoading } from "@/features/posts";

const QuoteItem = ({ quotedPostId, quotedPost }) => {
  const originalPostId = quotedPost?.original_post_id;

  const originalPost = useSelector((state) =>
    selectItemsById(state, originalPostId),
  );
  const originalPostLoading = useSelector((state) =>
    selectorLoading(state, originalPostId),
  );

  const navigate = useNavigate();
  const { user, content } = quotedPost;

  const handleClickPost = (e) => {
    e.stopPropagation();
    navigate(`/@${user.username}/post/${quotedPostId}`);
  };

  if (originalPostLoading) {
    return (
      <div className="mt-2 flex justify-center rounded-xl border border-gray-800 p-6">
        <Loading size="w-4 h-4" className="text-gray-400" />
      </div>
    );
  }

  return (
    <div
      className="mt-2 flex cursor-pointer items-start gap-2 rounded-xl border border-gray-300 p-3 dark:border-[#373535]"
      onClick={handleClickPost}
    >
      <div>
        <UserAvatar src={user.avatar_url} imgSize="h-6 w-6" />
      </div>
      <div className="w-full">
        <PostHeader
          user={user}
          createdAt={quotedPost.created_at}
          showMenu={false}
        />
        <div>
          <PostContent content={content} mediaUrls={quotedPost?.media_urls} />
          {originalPost && (
            <div className="mt-1 flex items-center gap-2 rounded-lg p-2">
              <MoveRight size={20} color="gray" />
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
