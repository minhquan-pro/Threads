import UserProfileMenu from "@/components/UserProfileMenu";

const PostHeader = ({ userName, timeAgo }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <UserProfileMenu>{userName}</UserProfileMenu>
        <span className="text-gray-400">{timeAgo}</span>
      </div>
    </div>
  );
};
export default PostHeader;
