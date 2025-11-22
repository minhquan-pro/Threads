import { Heart } from "lucide-react";
import Interactions from "../Interactions";
import { useDispatch } from "react-redux";
import { likePost } from "@/services/Posts";
import { optimisticUpdateLikePost } from "@/features/posts/postSlice";

const LikeButton = ({ postId, count, isLiked }) => {
  const previousLikePost = isLiked;

  const dispatch = useDispatch();
  const handleLike = async () => {
    dispatch(optimisticUpdateLikePost({ postId, isLiked }));
    try {
      await dispatch(likePost(postId)).unwrap();
    } catch (error) {
      dispatch(
        optimisticUpdateLikePost({ postId, isLiked: !previousLikePost }),
      );
      console.log(error);
    }
  };
  return (
    <Interactions
      count={count}
      Icon={Heart}
      onClick={handleLike}
      isActive={isLiked}
      activeClass="text-red-500"
      title="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
      description="Hãy đăng ký để thích, trả lời và hơn thế nữa."
    />
  );
};
export default LikeButton;
