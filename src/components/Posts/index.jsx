import { useDispatch, useSelector } from "react-redux";
import PostCard from "./components/PostCard";
import { useEffect } from "react";
import { getPosts } from "@/services/Posts";

const Posts = ({ type }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    (async () => {
      await dispatch(getPosts({ type, page: 1, per_page: 10 }));
    })();
  }, [dispatch, type]);

  return (
    <div>
      {posts.map((post) => {
        return <PostCard post={post} key={post.id} />;
      })}
    </div>
  );
};
export default Posts;
