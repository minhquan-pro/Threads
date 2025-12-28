import { useDispatch, useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth";
import { resetPosts, selectList, selectLoadingAllPost } from "@/features/posts";
import CreatePost from "@/components/Posts/components/CreatePost";
import Loading from "@/components/common/Loading";
import Posts from "@/components/Posts";
import { useEffect } from "react";
import { getPosts } from "@/services/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const posts = useSelector(selectList);
  const loading = useSelector(selectLoadingAllPost);

  useEffect(() => {
    if (currentUser) {
      const hasLoadedAfterLogin = sessionStorage.getItem(
        "postsLoadedAfterLogin",
      );

      // Reset nếu chưa đăng nhập hoặc nếu posts <= 1
      if (!hasLoadedAfterLogin || posts.length <= 1) {
        sessionStorage.setItem("postsLoadedAfterLogin", "true");
        dispatch(resetPosts());
        dispatch(getPosts());
      }
    }
  }, [currentUser, dispatch, posts.length]);

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
