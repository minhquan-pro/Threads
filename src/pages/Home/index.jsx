import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

import { getPosts } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import { resetPosts, selectList, selectLoadingAllPost } from "@/features/posts";

import CreatePost from "@/components/Posts/components/CreatePost";
import PostSkeleton from "@/components/common/PostSkeleton";
import Posts from "@/components/Posts";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isFollowing = location.pathname.startsWith("/following");
  const posts = useSelector(selectList);
  const loading = useSelector(selectLoadingAllPost);

  useEffect(() => {
    if (currentUser) {
      const hasLoadedAfterLogin = sessionStorage.getItem(
        "postsLoadedAfterLogin",
      );

      // Reset nếu chưa đăng nhập hoặc nếu posts <= 3
      if (!hasLoadedAfterLogin || posts.length <= 3) {
        sessionStorage.setItem("postsLoadedAfterLogin", true);
        dispatch(resetPosts());
        dispatch(getPosts());
      }
    }
  }, [currentUser, dispatch, posts.length]);

  return (
    <div className="overflow-hidden bg-white pt-14 dark:bg-[#181818]">
      {currentUser && <CreatePost />}

      {/* Mobile Tabs: For You / Following */}
      {currentUser && (
        <div className="border-b border-gray-200 bg-white md:hidden dark:border-[#2f2f2f] dark:bg-black">
          <div className="mx-auto flex max-w-screen-sm">
            <Link
              to="/"
              className={`${
                isHome
                  ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } flex-1 py-2 text-center font-semibold`}
            >
              Dành cho bạn
            </Link>
            <Link
              to="/following"
              className={`${
                isFollowing
                  ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } flex-1 py-2 text-center font-semibold`}
            >
              Đang theo dõi
            </Link>
          </div>
        </div>
      )}

      {loading && posts.length <= 3 ? (
        <PostSkeleton count={10} />
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
