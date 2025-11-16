import { Repeat } from "lucide-react";
import Interactions from "../Interactions";

const RepostButton = ({ count }) => {
  const handleRepost = () => {};
  return (
    <Interactions
      count={count}
      Icon={Repeat}
      onClick={handleRepost}
      title="Đăng ký để đăng lại"
      description="Bạn đã tiến thêm được một bước trong hành trình khơi mào cuộc trò chuyện."
    />
  );
};
export default RepostButton;
