import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";

const GhostPosts = () => {
  return (
    <div>
      <CreatePost />
      <Posts type="ghost" />
    </div>
  );
};
export default GhostPosts;
