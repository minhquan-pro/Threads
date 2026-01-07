import { optimisticUpdateLikeComment } from "@/features/comments/commentSlice";
import { optimisticUpdateLikePost } from "@/features/posts/postSlice";
import { likePost } from "@/services/Posts";
import { useDispatch } from "react-redux";

export const useOptimisticLike = (type) => {
  const dispatch = useDispatch();

  const toggleLike = async ({ parentId, postId, isLiked = false }) => {
    type === "post"
      ? dispatch(optimisticUpdateLikePost({ postId, isLiked }))
      : dispatch(optimisticUpdateLikeComment({ parentId, postId }));

    try {
      await likePost(postId);
    } catch (error) {
      dispatch(optimisticUpdateLikePost({ postId, isLiked: !isLiked }));
    }
  };

  return { toggleLike };
};
