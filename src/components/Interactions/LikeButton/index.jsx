import { Heart } from "lucide-react";
import { useOptimisticLike } from "@/hooks";
import Interactions from "..";

const LikeButton = ({ post, type }) => {
  const { toggleLike } = useOptimisticLike(type);

  const handleLike = () => {
    toggleLike({
      parentId: post?.parent_id,
      postId: post.id,
      isLiked: post?.is_liked_by_auth,
    });
  };

  return (
    <Interactions
      count={post.likes_count}
      Icon={Heart}
      onClick={handleLike}
      isActive={post.is_liked_by_auth}
      activeClass="text-red-500 dark:text-red-500"
      type="like"
      title="Bạn thích nội dung này ư? Bạn sẽ thích mê Threads."
      description="Hãy đăng ký để thích, trả lời và hơn thế nữa."
    />
  );
};

export default LikeButton;
