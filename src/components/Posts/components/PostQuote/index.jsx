import UserProfileDialog from "@/components/UserProfileDialog";
import PostHeader from "../PostHeader";
import PostContent from "../PostContent";

const PostQuote = ({ originalPost }) => {
  const { user, content, media_urls } = originalPost;
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl border border-gray-800 p-3 shadow">
      <UserProfileDialog user={user} />
      <div>
        <PostHeader user={user} />
        <PostContent content={content} media_urls={media_urls} />
      </div>
    </div>
  );
};
export default PostQuote;
