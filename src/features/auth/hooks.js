import { getCurrentUser } from "@/services/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "./selectors";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    })();
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector(selectorCurrentUser);
  return currentUser;
};
