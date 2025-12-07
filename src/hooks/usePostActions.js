import { deletePost, savePost } from "@/services/Posts";
import { toast } from "@/utils/toast";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const usePostActions = (post) => {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(post?.is_saved_by_auth || false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return { isSaved, isDeleting, handleSavePost, handleDeletePost };
};
