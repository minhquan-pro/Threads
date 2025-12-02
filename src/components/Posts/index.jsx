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
    <div>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="border-t border-gray-300 first-of-type:border-none"
          >
            <div
              ref={lastElementRef}
              className="flex w-[640px] flex-col items-start overflow-hidden px-4 py-3"
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
