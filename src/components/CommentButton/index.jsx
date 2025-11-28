import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Interactions from "../Interactions";
import ReplyModal from "../ReplyModal";

const CommentButton = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleComment = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Interactions
        count={post.replies_count}
        Icon={MessageCircle}
        onClick={handleComment}
        title="Đăng ký để trả lời"
        description="Chỉ còn một bước nữa là bạn có thể tham gia cuộc trò chuyện rồi."
      />

      <ReplyModal post={post} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
export default CommentButton;
