import { deleteComment, deletePost, savePost } from "@/services/Posts";
import {
  blockUser,
  muteUser,
  unBlockUser,
  unmuteUser,
} from "@/services/userActions";
import { toast } from "@/utils/toast";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

export const usePostActions = (post) => {
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);

  const [isSaved, setIsSaved] = useState(post?.is_saved_by_auth || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSavePost = useCallback(async () => {
    try {
      const { is_saved } = await savePost(post.id);
      if (isMountedRef.current) {
        setIsSaved(is_saved);
        toast.default(is_saved ? "Đã lưu" : "Đã bỏ lưu");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      if (isMountedRef.current) {
        toast.error("Không thể lưu bài viết");
      }
    }
  }, [post?.id]);

  const handleDeletePost = useCallback(
    async (type = "post") => {
      if (isDeleting) return;

      setIsDeleting(true);
      try {
        toast.default("Đã xóa");
        await new Promise((resolve) => setTimeout(resolve, 100));
        await dispatch(
          type === "post"
            ? deletePost(post.id)
            : deleteComment({
                commentId: post.id,
                parentId: post.parent_id,
              }),
        );
        return true;
      } catch (error) {
        console.error("Error deleting post:", error);
        if (isMountedRef.current) {
          toast.error("Không thể xóa bài viết");
        }
        return false;
      } finally {
        if (isMountedRef.current) {
          setIsDeleting(false);
        }
      }
    },
    [dispatch, post?.id, isDeleting],
  );

  const handleBlockUser = useCallback(async () => {
    try {
      const blocked = await blockUser(post.user.id);
      if (isMountedRef.current) {
        setIsBlocked(blocked);
        toast.default(blocked ? "Đã chặn" : "Đã bỏ chặn");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      if (isMountedRef.current) {
        toast.error("Không thể chặn người dùng");
      }
    }
  }, [post?.user.id]);

  const handleUnblockUser = useCallback(async () => {
    try {
      await unBlockUser(post.user.id);
      if (isMountedRef.current) {
        setIsBlocked(false);
        toast.default("Đã bỏ chặn");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      if (isMountedRef.current) {
        toast.error("Không thể bỏ chặn người dùng");
      }
    }
  }, [post?.user.id]);

  const handleMuteUser = useCallback(async () => {
    try {
      const muted = await muteUser(post.user.id);
      if (isMountedRef.current) {
        setIsRestricted(muted);
        toast.default("Hạn chế");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      if (isMountedRef.current) {
        toast.error("Không thể hạn chế người dùng");
      }
    }
  }, [post?.user.id]);

  const handleUnmuteUser = useCallback(async () => {
    try {
      await unmuteUser(post.user.id);
      if (isMountedRef.current) {
        setIsRestricted(false);
        toast.default("Đã bỏ hạn chế");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      if (isMountedRef.current) {
        toast.error("Không thể bỏ hạn chế người dùng");
      }
    }
  }, [post?.user.id]);

  //   const handleRestrictUser = useCallback(async () => {
  //     try {
  //       const success = await restrictUser(post.user.id);
  //       if (isMountedRef.current) {
  //         setIsRestricted(success);
  //         toast.default(success ? "Đã hạn chế" : "Đã bỏ hạn chế");
  //       }
  //     } catch (error) {
  //       console.error("Error restricting user:", error);
  //       if (isMountedRef.current) {
  //         toast.error("Không thể hạn chế người dùng");
  //       }
  //     }
  //   }, [post?.user.id]);

  return {
    isSaved,
    isDeleting,
    isBlocked,
    isRestricted,
    handleSavePost,
    handleDeletePost,
    handleBlockUser,
    handleUnblockUser,
    handleMuteUser,
    handleUnmuteUser,
    // handleRestrictUser,
  };
};
