import { optimisticUpdateLikeComment } from "@/features/comments/commentSlice";
import { optimisticUpdateLikePost } from "@/features/posts/postSlice";
import { likePost } from "@/services/Posts";
import { useDispatch } from "react-redux";

export const useOptimisticLike = (type) => {
  const dispatch = useDispatch();

  const toggleLike = async ({ parentId, id, isLiked = false }) => {
    type === "post"
      ? dispatch(optimisticUpdateLikePost({ id, isLiked }))
      : dispatch(optimisticUpdateLikeComment({ parentId, id }));

    try {
      await likePost(id);
    } catch (error) {
      dispatch(optimisticUpdateLikePost({ id, isLiked: !isLiked }));
      console.log(error);
    }
  };

  return { toggleLike };
};
