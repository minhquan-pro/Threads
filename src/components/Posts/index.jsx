import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useInfiniteScroll } from "@/hooks";
import {
  selectorLoading as selectorLoadingPost,
  selectorPagination,
  useFetchPostsList,
  usePostsList,
} from "@/features/posts";
import FeedItem from "../FeedItem";

const Posts = ({ type }) => {
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);

  useFetchPostsList({ type, page, per_page: 10 });
  const posts = usePostsList({ excludeCurrentUser: false });

  const loading = useSelector(selectorLoadingPost);
  const pagination = useSelector(selectorPagination);
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
              className="flex w-[640px] flex-col items-start overflow-hidden bg-white px-4 py-3 dark:bg-[#181818]"
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
