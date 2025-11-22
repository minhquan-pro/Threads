import Loading from "@/components/Loading";
import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import { useCurrentUser } from "@/features/auth";
import { selectorLoading } from "@/features/posts";
import { useSelector } from "react-redux";

const Home = () => {
  const currentUser = useCurrentUser();
  const loading = useSelector(selectorLoading);

  return (
    <div className="overflow-hidden">
      {currentUser && <CreatePost />}
      <Posts type="for_you" />
      {loading && (
        <div className="flex items-center justify-center pb-3">
          <Loading size="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
export default Home;
