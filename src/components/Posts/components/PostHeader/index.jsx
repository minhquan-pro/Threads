import UserProfileMenu from "@/components/UserProfileMenu";

const PostHeader = ({ userName, timeAgo }) => {
  return (
    <div className="flex items-center gap-1">
      <div>
        <UserProfileMenu>{userName}</UserProfileMenu>
      </div>
      <span className="text-gray-400">{timeAgo}</span>
    </div>
  );
};
export default PostHeader;
