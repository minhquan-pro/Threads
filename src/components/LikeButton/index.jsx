import { Heart } from "lucide-react";
import Interactions from "../Interactions";
import { useState } from "react";

const LikeButton = () => {
  const [isLike, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const handleLike = () => {
    setIsLiked(true);
    setCount(count + 1);
  };
  return (
    <Interactions
      count={count}
      Icon={Heart}
      onClick={handleLike}
      title="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
      description="Hãy đăng ký để thích, trả lời và hơn thế nữa."
      isLike={isLike}
    />
  );
};
export default LikeButton;
