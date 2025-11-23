import { optimisticUpdateRepostPost } from "@/features/posts/postSlice";
import { repostPost } from "@/services/Posts";
import { useDispatch } from "react-redux";

const repostComment = () => {};

export const useOptimisticRepost = (type) => {
  const dispatch = useDispatch();
  const toggleRepost = async ({ postId, isReposted }) => {
    dispatch(optimisticUpdateRepostPost({ postId, isReposted }));
    try {
      await (type === "post" ? repostPost(postId) : repostComment(postId));
    } catch (error) {
      console.log(error);
      dispatch(optimisticUpdateRepostPost({ postId, isReposted: !isReposted }));
    }
  };

  return { toggleRepost };
};
