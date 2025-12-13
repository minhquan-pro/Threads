import { useCurrentUser } from "@/features/auth";

import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import { useSelector } from "react-redux";
import { selectList, selectLoadingAllPost } from "@/features/posts";
import Loading from "@/components/Loading";

const Home = () => {
  const currentUser = useCurrentUser();
  const posts = useSelector(selectList);
  const loading = useSelector(selectLoadingAllPost);

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-[#181818]">
      {currentUser && <CreatePost />}

      {loading && posts.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <Loading size="w-8 h-8" />
        </div>
      ) : (
        <>
          <Posts type="for_you" />
          {loading && (
            <div className="flex items-center justify-center pb-3">
              <Loading size="w-5 h-5" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
