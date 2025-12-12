import { useDispatch, useSelector } from "react-redux";
import FeedItem from "../FeedItem";
import { useEffect } from "react";
import { fetchReplies } from "@/services/comment";
import {
  selectRepliesLoading,
  selectReplyByCommentId,
} from "@/features/comments";
import ThreadLine from "../ThreadLine";
import Loading from "../Loading";

const CommentItem = ({ comment, depth = 0 }) => {
  const MAX_DEPTH = 3;
  const dispatch = useDispatch();
  const hasReplies = comment.replies_count > 0;
  const hasOnlyOneReply = comment.replies_count === 1;

  const replyComments = useSelector((state) =>
    selectReplyByCommentId(state, comment.id),
  );
  const loading = useSelector((state) =>
    selectRepliesLoading(state, comment.id),
  );

  useEffect(() => {
    if (!hasOnlyOneReply || depth >= MAX_DEPTH || loading) return;

    if (!replyComments || replyComments.length === 0) {
      const loadReplies = async () => {
        try {
          await dispatch(fetchReplies({ commentId: comment.id }));
        } catch (err) {
          console.error("Failed to load replies:", err);
        }
      };

      loadReplies();
    }
  }, [comment.id, depth, dispatch, hasOnlyOneReply, loading, replyComments]);

  return (
    <>
      <div className="relative">
        {hasReplies && hasOnlyOneReply && depth < MAX_DEPTH && (
          <ThreadLine show />
        )}
        <FeedItem post={comment} type="comment" />
      </div>

      {hasReplies && hasOnlyOneReply && depth < MAX_DEPTH && (
        <div className="mt-3">
          {loading ? (
            <div className="flex pl-3">
              <Loading size="w-3 h-3" />
            </div>
          ) : (
            replyComments &&
            replyComments.length > 0 && (
              <CommentItem comment={replyComments[0]} depth={depth + 1} />
            )
          )}
        </div>
      )}
    </>
  );
};

export default CommentItem;
