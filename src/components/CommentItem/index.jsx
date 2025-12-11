import { useEffect } from "react";
import FeedItem from "../FeedItem";
import ThreadLine from "../ThreadLine";
import { fetchReplies } from "@/services/comment";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRepliesLoading,
  selectReplyByCommentId,
} from "@/features/comments";

const CommentItem = ({ comment, depth = 0 }) => {
  const dispatch = useDispatch();
  const hasReplies = comment.replies_count > 0;
  const hasOnlyOneReply = comment.replies_count === 1;

  const replyComments = useSelector((state) =>
    selectReplyByCommentId(state, comment.id),
  );
  const loading = useSelector((state) =>
    selectRepliesLoading(state, comment.id),
  );

  const MAX_DEPTH = 3;

  useEffect(() => {
    if (!hasOnlyOneReply || depth >= MAX_DEPTH) return;

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
  }, [comment.id, depth, dispatch, hasOnlyOneReply, replyComments]);

  return (
    <>
      <div className="relative">
        {hasReplies && hasOnlyOneReply && <ThreadLine show />}
        <FeedItem post={comment} />
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
