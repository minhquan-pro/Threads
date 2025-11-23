import { Heart } from "lucide-react";
import Interactions from "../Interactions";
import { useOptimisticLike } from "@/hooks";

const LikeButton = ({ postId, count, isLiked }) => {
  const { toggleLike } = useOptimisticLike("post");

  const handleLike = () => {
    toggleLike({ postId, isLiked });
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
