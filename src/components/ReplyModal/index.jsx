import { useDispatch } from "react-redux";

import { usePostForm } from "@/hooks/usePostForm";
import { createComments } from "@/services/comment";
import ThreadLine from "../ThreadLine";
import ReplyComposer from "../ReplyComposer";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";
import {
  optimisticDecrementRepliesCount,
  optimisticIncrementRepliesCount,
} from "@/features/posts/postSlice";

const ReplyModal = ({ post, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(
      async ({ content }) => {
        await createComments({
          postId: post.id,
          content,
          reply_permission: post.reply_permission,
        });
      },
      {
        successMessage: "Đã đăng",
        errorMessage: "Không thể đăng bình luận. Vui lòng thử lại!",
      },
    );

  const handleClose = () => {
    resetContent();
    onClose();
  };

  const onSubmit = async () => {
    dispatch(optimisticIncrementRepliesCount({ postId: post.id }));
    handleClose();

    const success = await handleSubmit();
    if (!success)
      dispatch(optimisticDecrementRepliesCount({ postId: post.id }));
  };

  return (
    <BaseThreadModal
      title="Thread trả lời"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
      submitDisabled={!content.trim()}
    >
      <div className="relative flex gap-2">
        <ThreadLine show />
        <FeedItem post={post} hideInteraction={true} showMenu={false} />
      </div>
      <div>
        <ReplyComposer
          user={post.user}
          placeholder={`Trả lời ${post.user.username}...`}
          content={content}
          onChange={handleChangeContent}
          disabled={loading}
        />
      </div>
    </BaseThreadModal>
  );
};

export default ReplyModal;
