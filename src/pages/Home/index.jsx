import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getPosts } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import { resetPosts, selectList, selectLoadingAllPost } from "@/features/posts";

import CreatePost from "@/components/Posts/components/CreatePost";
import PostSkeleton from "@/components/common/PostSkeleton";
import Posts from "@/components/Posts";

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
        sessionStorage.setItem("postsLoadedAfterLogin", true);
        dispatch(resetPosts());
        dispatch(getPosts());
      }
    }
  }, [currentUser, dispatch, posts.length]);

  return (
    <div className="overflow-hidden bg-white pt-16 dark:bg-[#181818]">
      {currentUser && <CreatePost />}

      {loading && posts.length <= 1 ? (
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
