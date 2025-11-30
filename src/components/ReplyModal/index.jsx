import { usePostForm } from "@/hooks/usePostForm";
import { createComments } from "@/services/comment";
import ThreadLine from "../ThreadLine";
import ReplyComposer from "../ReplyComposer";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";

const ReplyModal = ({ post, isOpen, onClose }) => {
  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(
      async ({ content }) => {
        await createComments(post.id, {
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

  const onSubmit = () => {
    handleSubmit();
    handleClose();
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
        <FeedItem post={post} hideInteraction={true} />
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
