import { useNavigate } from "react-router-dom";

export const usePostViewNavigation = () => {
  const navigate = useNavigate();

  const viewPost = (post) => {
    if (!post?.user?.username || !post?.id) return;
    const postUrl = `/@${post.user.username}/post/${post.id}`;
    navigate(postUrl);
  };

  return { viewPost };
};
