import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useInfiniteScroll } from "@/hooks";
import {
  selectCommentsByPostId,
  selectCommentsLoading,
  selectCommentsPagination,
  useFetchCommentsList,
} from "@/features/comments";
import Loading from "@/components/Loading";
import CommentItem from "@/components/CommentItem";
import { useSortOrder } from "@/hooks/useSortOrder";

const CommentSection = ({ postId }) => {
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);
  const { sortOrder } = useSortOrder();
  useFetchCommentsList({ postId, page });

  useEffect(() => {
    setPage(1);
  }, [sortOrder]);

  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId, sortOrder),
  );
  const commentsLoading = useSelector((state) =>
    selectCommentsLoading(state, postId),
  );
  const pagination = useSelector((state) =>
    selectCommentsPagination(state, postId),
  );

  const onEnd = useCallback(() => {
    if (page < pagination?.last_page) {
      setPage((prev) => prev + 1);
    }
  }, [page, pagination?.last_page]);

  useInfiniteScroll({
    lastElementRef,
    page,
    pagination,
    onEnd: sortOrder !== "recent" ? onEnd : () => {},
  });

  if (commentsLoading && page === 1) {
    return (
      <div className="flex justify-center py-4">
        <Loading size="w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {comments?.map((comment, index) => (
        <div
          ref={index === comments.length - 1 ? lastElementRef : null}
          key={comment.id}
          className="border-t border-gray-300 ps-6 pe-6 pt-3"
        >
          <CommentItem comment={comment} />
        </div>
      ))}

      {commentsLoading && page > 1 && (
        <div className="flex justify-center py-4">
          <Loading size="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
