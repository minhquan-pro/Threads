import { Check } from "lucide-react";

import { formatTime } from "@/utils/formatTime";
import verifiedIcon from "@/assets/icons/verifiedIcon.png";

const PostHeader = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-0.5">
        <span className="text-md font-semibold">{user.name}</span>
        {user.verified && (
          <img src={verifiedIcon} alt="" className="h-4 w-4" />
          //   <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
          //     <Check size={9} color="white" strokeWidth={3} />
          //   </div>
        )}
      </div>
      <span className="text-sm text-gray-500">
        {formatTime(user.created_at)}
      </span>
    </div>
  );
};
export default PostHeader;
