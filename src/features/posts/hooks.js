import { getPosts } from "@/services/Posts";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorList } from "./selectors";
import { useCurrentUser } from "../auth";

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
