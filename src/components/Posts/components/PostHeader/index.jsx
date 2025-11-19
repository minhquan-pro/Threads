const PostHeader = ({ user }) => {
  return (
    <div className="z-50 flex items-center gap-1">
      <span className="text-md font-semibold">{user.name}</span>
      <span className="text-gray-400">{user.created_at}</span>
    </div>
  );
};
export default PostHeader;
