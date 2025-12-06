import { useEffect, useState } from "react";
import FeedItem from "../FeedItem";
import ThreadLine from "../ThreadLine";
import { getReplies } from "@/services/comment";
import Loading from "../Loading";

const CommentItem = ({ comment, depth = 0 }) => {
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasReplies = comment.replies_count > 0;
  const hasOnlyOneReply = comment.replies_count === 1;
  const MAX_DEPTH = 4;

  useEffect(() => {
    if (!hasOnlyOneReply || depth >= MAX_DEPTH) return;
    const loadPageData = async () => {
      setLoading(true);
      try {
        const response = await getReplies(comment.id);
        setReplies(response);
      } catch (err) {
        console.error("Failed to load page data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [comment.id, depth, hasOnlyOneReply]);

  return (
    <div>
      <div className="relative">
        {hasReplies && hasOnlyOneReply && <ThreadLine show />}
        <FeedItem post={comment} />
      </div>
      {hasReplies && hasOnlyOneReply && (
        <div className="mt-3">
          {loading ? (
            <div className="flex pl-3">
              <Loading size="w-3 h-3" />
            </div>
          ) : (
            replies?.map((reply) => {
              return (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
export default CommentItem;
