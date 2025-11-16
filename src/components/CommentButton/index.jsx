import { MessageCircle } from "lucide-react";
import Interactions from "../Interactions";

const CommentButton = ({ count }) => {
  const handleComment = () => {};
  return (
    <Interactions
      count={count}
      Icon={MessageCircle}
      onClick={handleComment}
      title="Đăng ký để trả lời"
      description="Chỉ còn một bước nữa là bạn có thể tham gia cuộc trò chuyện rồi."
    />
  );
};
export default CommentButton;
