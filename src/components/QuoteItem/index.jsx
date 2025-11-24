import PostHeader from "../Posts/components/PostHeader";
import PostContent from "../Posts/components/PostContent";
import UserAvatar from "../UserAvatar";
import defaultImageUser from "@/assets/images/defaultImageUser.png";

const QuoteItem = ({ originalPost }) => {
  const { user, content, media_urls } = originalPost;
  return (
    <div className="mt-2 flex items-start gap-2 rounded-xl border border-gray-300 bg-gray-50 p-3 shadow">
      <div>
        <UserAvatar
          src={user.avatar_url || defaultImageUser}
          imgSize="h-6 w-6"
        />
      </div>
      <div>
        <PostHeader user={user} />
        <PostContent content={content} media_urls={media_urls} />
      </div>
    </div>
  );
};
export default QuoteItem;
