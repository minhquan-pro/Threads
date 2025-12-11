import { optimisticUpdateLikePost } from "@/features/posts/postSlice";
import { likePost } from "@/services/Posts";
import { useDispatch } from "react-redux";

export const useOptimisticLike = () => {
  const dispatch = useDispatch();
  const toggleLike = async ({ postId, isLiked }) => {
    dispatch(optimisticUpdateLikePost({ postId, isLiked }));
    try {
      await likePost(postId);
    } catch (error) {
      dispatch(optimisticUpdateLikePost({ postId, isLiked: !isLiked }));
      console.log(error);
    }
  };

  return { toggleLike };
};
