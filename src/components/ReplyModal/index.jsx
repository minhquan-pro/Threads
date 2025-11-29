import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import ThreadLine from "../ThreadLine";
import ReplyComposer from "../ReplyComposer";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";
import { createComments } from "@/services/comment";
import {
  optimisticIncrementRepliesCount,
  optimisticDecrementRepliesCount,
} from "@/features/posts/postSlice";

const ReplyModal = ({ post, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);

    // const tempComment = {
    //   id: `temp-${Date.now()}`,
    //   content: content.trim(),
    //   user: post.user,
    //   created_at: new Date().toISOString(),
    //   likes_count: 0,
    //   replies_count: 0,
    //   is_liked_by_auth: false,
    // };

    // Optimistic updates
    dispatch(optimisticIncrementRepliesCount({ postId: post.id }));
    // dispatch(
    //   addCommentOptimistic({
    //     postId: post.id,
    //     comment: tempComment,
    //   }),
    // );

    try {
      await createComments(post.id, {
        content: content.trim(),
        reply_permission: post.reply_permission,
      });

      toast(
        <div className="flex w-full items-center justify-between py-2 pt-3">
          <span>Đã đăng</span>
          <div>Xem</div>
        </div>,
        {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        },
      );
    } catch (error) {
      console.error("Failed to create comment:", error);
      dispatch(optimisticDecrementRepliesCount({ postId: post.id }));
      toast.error("Không thể đăng bình luận. Vui lòng thử lại!", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
      onClose();
      setContent("");
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setContent("");
      onClose();
    }
  };

  return (
    <BaseThreadModal
      title="Thread trả lời"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={isSubmitting}
      submitDisabled={!content.trim()}
    >
      <div className="relative flex gap-2">
        <ThreadLine show />
        <FeedItem post={post} hideInteraction={true} />
      </div>
      <div>
        <ReplyComposer
          user={post.user}
          placeholder={`Trả lời ${post.user.username}...`}
          content={content}
          onChange={handleChangeContent}
          disabled={isSubmitting}
        />
      </div>
    </BaseThreadModal>
  );
};

export default ReplyModal;
