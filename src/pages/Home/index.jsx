import { useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth";
import {
  selectList,
  selectLoadingAllPost,
  useRefetchPosts,
} from "@/features/posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import Loading from "@/components/common/Loading";
import Posts from "@/components/Posts";

const Home = () => {
  const currentUser = useCurrentUser();
  const posts = useSelector(selectList);
  const loading = useSelector(selectLoadingAllPost);

  useRefetchPosts({ type: "for_you", page: 1, per_page: 10 });

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-[#181818]">
      {currentUser && <CreatePost />}

      {loading && posts.length <= 1 ? (
        <div className="flex min-h-screen items-center justify-center py-20">
          <Loading size="w-8 h-8" />
        </div>
      ) : (
        <>
          <div className={`${!currentUser && "pt-13"}`}>
            <Posts type="for_you" />
          </div>
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
