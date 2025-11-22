import { getPosts } from "@/services/Posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorList } from "./selectors";

export const useFetchPostsList = ({ type, page = 1, per_page = 10 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getPosts({ type, page, per_page }));
    })();
  }, [dispatch, page, per_page, type]);
};

export const usePostsList = () => {
  const posts = useSelector(selectorList);
  return posts;
};
