import { fetchComments } from "@/services/comment";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchCommentsList = ({ postId, page = 1, force = false }) => {
  const dispatch = useDispatch();
  const hasComment = useSelector((state) => state.comments.byPostId?.[postId]);
  const loading = useSelector((state) => state.comments.loading?.[postId]);
  const pagination = useSelector(
    (state) => state.comments.pagination?.[postId],
  );

  const loadedPage = useMemo(() => {
    if (!pagination) return 0;
    return pagination.current_page ?? 0;
  }, [pagination]);

  const shouldFetch = useMemo(() => {
    if (!postId) return false;
    if (!hasComment) return true;
    if (force) return true;
    return page > loadedPage;
  }, [force, hasComment, loadedPage, page, postId]);

  useEffect(() => {
    if (!shouldFetch) return;
    if (loading) return;

    dispatch(fetchComments({ postId, page }));
  }, [dispatch, loading, page, postId, shouldFetch]);
};
