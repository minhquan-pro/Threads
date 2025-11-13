import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";

const Home = () => {
  const currentUser = null;
  return (
    <div>
      {currentUser && <CreatePost />}
      <Posts />
    </div>
  );
};
export default Home;
