import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import { useCurrentUser } from "@/features/auth";

const Home = () => {
  const currentUser = useCurrentUser();
  return (
    <div>
      {currentUser && <CreatePost />}
      <Posts type="for_you" />
    </div>
  );
};
export default Home;
