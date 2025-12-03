import { getPostById, getPosts } from "@/services/Posts";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorList } from "./selectors";
import { useCurrentUser } from "../auth";
import { toast } from "@/utils/toast";

export const useFetchPostsList = ({ type, page = 1, per_page = 10 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getPosts({ type, page, per_page }));
    })();
  }, [dispatch, page, per_page, type]);
};

export const usePostsList = ({ excludeCurrentUser = false }) => {
  const currentUser = useCurrentUser();
  const posts = useSelector(selectorList);

  return useMemo(() => {
    if (!excludeCurrentUser || !currentUser?.id) return posts;

    return posts.filter((post) => post.user.id !== currentUser.id);
  }, [currentUser?.id, excludeCurrentUser, posts]);
};

export const useFetchPostDetail = (postId) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;

    let isMounted = true;

    const loadPostData = async () => {
      setLoading(true);
      try {
        const response = await getPostById(postId);
        if (isMounted) {
          setCurrentItem(response);
        }
      } catch (err) {
        console.error("Failed to load parent post:", err);
        if (isMounted) {
          toast.error("Không thể tải bài viết", { theme: "colored" });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPostData();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  return [currentItem, loading];
};
