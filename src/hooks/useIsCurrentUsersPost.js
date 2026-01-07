import { useCurrentUser } from "@/features/auth";
import { useMemo } from "react";

export const useIsCurrentUsersPost = (post) => {
  const currentUser = useCurrentUser();

  return useMemo(() => {
    if (!currentUser?.id || !post?.user?.id) return false;
    return currentUser.id === post.user.id;
  }, [currentUser?.id, post?.user?.id]);
};
