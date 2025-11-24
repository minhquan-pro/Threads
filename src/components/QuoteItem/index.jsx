import UserProfileDialog from "@/components/UserProfileDialog";
import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";

const QuoteItem = ({ originalPost }) => {
  const { user, content, media_urls } = originalPost;
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl border border-gray-300 p-3 shadow">
      <UserProfileDialog user={user} />
      <div>
        <PostHeader user={user} />
        <PostContent content={content} media_urls={media_urls} />
      </div>
    </div>
  );
};
export default QuoteItem;
