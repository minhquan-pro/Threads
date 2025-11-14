import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";

const FollowingFeed = () => {
  return (
    <div>
      <CreatePost />
      <Posts />
    </div>
  );
};
export default FollowingFeed;
