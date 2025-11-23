import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import PostCard from "./components/PostCard";
import { useInfiniteScroll } from "@/hooks";
import {
  selectorLoading as selectorLoadingPost,
  selectorPagination,
  useFetchPostsList,
  usePostsList,
} from "@/features/posts";

const Posts = ({ type }) => {
  const [page, setPage] = useState(1);
  const lastElementRef = useRef(null);

  useFetchPostsList({ type, page, per_page: 10 });
  const posts = usePostsList();

  const loading = useSelector(selectorLoadingPost);
  const pagination = useSelector(selectorPagination);
  const onEnd = useCallback(() => setPage((prevState) => prevState + 1), []);
  useInfiniteScroll({ lastElementRef, page, loading, pagination, onEnd });

  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            ref={lastElementRef}
            key={post.id}
            className="flex w-[650px] flex-col items-start overflow-hidden border-t border-gray-300 p-3 first-of-type:border-none"
          >
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
};
export default Posts;
