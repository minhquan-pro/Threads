import copy from "copy-to-clipboard";
import { toast } from "@/utils/toast";

export const useCopyPostUrl = () => {
  const copyPostUrl = async (post) => {
    try {
      const postUrl = `${window.location.origin}/Threads/#/@${post.user.username}/post/${post.id}`;
      const success = copy(postUrl);

      if (success) {
        toast.default("Đã sao chép");
      } else {
        toast.error("Không thể sao chép");
      }

      return success;
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Có lỗi xảy ra");
      return false;
    }
  };

  return { copyPostUrl };
};
