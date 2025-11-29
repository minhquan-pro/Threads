import { formatTime } from "@/utils/formatTime";
import verifiedIcon from "@/assets/icons/verifiedIcon.png";

const PostHeader = ({ user, hideDate = false, createdAt }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        <span className="text-md font-semibold">{user.username}</span>
        {user.verified && <img src={verifiedIcon} alt="" className="h-4 w-4" />}
      </div>
      {!hideDate && (
        <span className="text-sm text-gray-500">{formatTime(createdAt)}</span>
      )}
    </div>
  );
};
export default PostHeader;
