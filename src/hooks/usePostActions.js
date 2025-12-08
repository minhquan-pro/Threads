import { deletePost, savePost } from "@/services/Posts";
import { blockUser, unBlockUser } from "@/services/userActions";
import { toast } from "@/utils/toast";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const usePostActions = (post) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(post?.is_saved_by_auth || false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSavePost = async () => {
    try {
      const { is_saved } = await savePost(post.id);
      toast.default(is_saved ? "Đã lưu" : "Đã bỏ lưu");
      setIsSaved(is_saved);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deletePost(post.id));
      toast.default("Đã xóa");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBlockUser = async () => {
    try {
      const isBlocked = await blockUser(post.user.id);
      setIsBlocked(isBlocked);
      toast.default("Đã chặn");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnblockUser = async () => {
    try {
      await unBlockUser(post.user.id);
      toast.default("Đã bỏ chặn");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSaved,
    isDeleting,
    isBlocked,
    handleSavePost,
    handleDeletePost,
    handleBlockUser,
    handleUnblockUser,
  };
};
