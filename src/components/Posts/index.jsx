import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useInfiniteScroll } from "@/hooks";
import {
  selectLoadingAllPost,
  selectPagination,
  useFetchPostsList,
  usePostsList,
  //   usePostsUserList,
} from "@/features/posts";
import FeedItem from "./FeedItem";
// import { useLocation, useParams } from "react-router";

const Posts = ({ type }) => {
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);
  //   const location = useLocation();
  //   const { userId } = useParams();
  //   const isPageProfile = location.pathname.includes(userId);

  useFetchPostsList({ type, page, per_page: 10 });
  const allPosts = usePostsList({ excludeCurrentUser: false });
  //   const userPosts = usePostsUserList({ userId });
  const posts = allPosts;

  const loading = useSelector(selectLoadingAllPost);
  const pagination = useSelector(selectPagination);
  const onEnd = useCallback(() => setPage((prevState) => prevState + 1), []);
  useInfiniteScroll({ lastElementRef, page, loading, pagination, onEnd });

  return (
    <div className="bg-white dark:bg-[#181818]">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="border-t border-gray-300 first-of-type:border-none dark:border-gray-800"
          >
            <div
              ref={lastElementRef}
              className="flex max-w-[640px] flex-col items-start overflow-hidden bg-white px-4 py-3 dark:bg-[#181818]"
            >
              <FeedItem post={post} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
