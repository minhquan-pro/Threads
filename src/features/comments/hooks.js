import { fetchComments } from "@/services/comment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchCommentsList = ({ postId, page = 1 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCommentData = async () => {
      await dispatch(fetchComments({ postId, page }));
    };

    loadCommentData();
  }, [dispatch, page, postId]);
};
