import { useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth";
import { selectList, selectLoadingAllPost } from "@/features/posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import Loading from "@/components/common/Loading";
import Posts from "@/components/Posts";

const Home = () => {
  const currentUser = useCurrentUser();
  const posts = useSelector(selectList);
  const loading = useSelector(selectLoadingAllPost);

  return (
    <div className="min-h-screen overflow-hidden bg-white pt-16 dark:bg-[#181818]">
      {currentUser && <CreatePost />}

      {loading && posts.length <= 1 ? (
        <div className="flex min-h-screen items-center justify-center py-20">
          <Loading size="w-8 h-8" />
        </div>
      ) : (
        <>
          <div>
            <Posts type="for_you" />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
