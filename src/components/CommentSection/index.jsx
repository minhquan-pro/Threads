import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useInfiniteScroll } from "@/hooks";
import Loading from "../Loading";
import {
  selectCommentsByPostId,
  selectCommentsLoading,
  selectCommentsPagination,
} from "@/features/comments";
import { fetchComments } from "@/services/comment";
import CommentItem from "../CommentItem";

const CommentSection = ({ postId }) => {
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCommentData = async () => {
      await dispatch(fetchComments({ postId, page }));
    };

    loadCommentData();
  }, [dispatch, page, postId]);

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId),
  );
  const commentsLoading = useSelector((state) =>
    selectCommentsLoading(state, postId),
  );
  const pagination = useSelector((state) =>
    selectCommentsPagination(state, postId),
  );

  const onEnd = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useInfiniteScroll({
    lastElementRef,
    page,
    pagination,
    onEnd,
  });

  return (
    <div className="flex flex-col gap-2">
      {commentsLoading?.[postId] ? (
        <div className="flex justify-center py-4">
          <Loading size="w-5 h-5" />
        </div>
      ) : comments?.length === 0 ? (
        <div className="py-8 text-center text-sm font-semibold text-gray-500 italic">
          Chưa có bình luận nào
        </div>
      ) : (
        comments?.map((comment) => (
          <div
            ref={lastElementRef}
            key={comment?.id}
            className="border-t border-gray-300 ps-6 pe-6 pt-3"
          >
            <CommentItem comment={comment} />
          </div>
        ))
      )}
    </div>
  );
};
export default CommentSection;
