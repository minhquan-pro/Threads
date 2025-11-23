import { optimisticUpdateLikePost } from "@/features/posts/postSlice";
import { likePost } from "@/services/Posts";
import { useDispatch } from "react-redux";

const likeComment = () => {};

export const useOptimisticLike = (type) => {
  const dispatch = useDispatch();
  const toggleLike = async ({ postId, isLiked }) => {
    dispatch(optimisticUpdateLikePost({ postId, isLiked }));
    try {
      await (type === "post" ? likePost(postId) : likeComment(postId));
    } catch (error) {
      dispatch(optimisticUpdateLikePost({ postId, isLiked: !isLiked }));
      console.log(error);
    }
  };

  return { toggleLike };
};
