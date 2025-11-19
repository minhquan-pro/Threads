import { Send } from "lucide-react";
import Interactions from "../Interactions";

const ShareButton = () => {
  const handleShare = () => {};
  return (
    <Interactions
      Icon={Send}
      onClick={handleShare}
      title="Bày tỏ nhiều hơn qua Threads"
      description="Tham gia Threads để chia sẻ suy nghĩ, nắm bắt những gì đang diễn ra, theo dõi những người bạn yêu mến và hơn thế nữa."
    />
  );
};
export default ShareButton;
