import { Heart } from "lucide-react";
import Interactions from "../Interactions";
import { useState } from "react";

const LikeButton = ({ count }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(true);
  };
  return (
    <Interactions
      count={count}
      Icon={Heart}
      onClick={handleLike}
      title="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
      description="Hãy đăng ký để thích, trả lời và hơn thế nữa."
      isLiked={isLiked}
    />
  );
};
export default LikeButton;
