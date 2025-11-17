import PostHeader from "../PostHeader";
import UserProfileDialog from "@/components/UserProfileDialog";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import RepostButton from "@/components/RepostButton";
import ShareButton from "@/components/ShareButton";

const PostCard = () => {
  return (
    <div className="flex w-[650px] flex-col items-start gap-2 overflow-hidden border-t p-4 first-of-type:border-t-0">
      <div className="flex gap-2">
        <UserProfileDialog />
        <div className="min-w-0 flex-1">
          <PostHeader userName="Leminhquan" timeAgo="5 gio" />
          <div>
            <p className="mb-2 text-[15px] wrap-break-word">
              At Content Stadium, we help 170+ sports clubs, teams, federations,
              leagues and organizations to create quality content at speed with
              our content creation platform. Based on this experience working
              with sports (social) media teams, as well as the trends we’ve seen
              developing in the industry over the years, we rounded up our top
              social media content ideas for football clubs and organizations.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pl-12">
        <div className="scrollbar-hide flex gap-1 overflow-x-auto">
          <img
            src=" https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
            alt=""
            className="max-h-52 min-w-52 rounded-md border object-cover"
          />
        </div>
        <div className="mt-1 flex items-center justify-start">
          <LikeButton count={699} />
          <CommentButton count={96} />
          <RepostButton count={78} />
          <ShareButton count={23} />
        </div>
      </div>
    </div>
  );
};
export default PostCard;
