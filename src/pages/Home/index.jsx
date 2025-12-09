import { useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth";
import {
  selectorLoading as selectorPostsLoading,
  selectorList,
} from "@/features/posts";

import Loading from "@/components/Loading";
import Posts from "@/components/Posts";
import CreatePost from "@/components/Posts/components/CreatePost";

const Home = () => {
  const currentUser = useCurrentUser();
  const loading = useSelector(selectorPostsLoading);
  const posts = useSelector(selectorList);

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
