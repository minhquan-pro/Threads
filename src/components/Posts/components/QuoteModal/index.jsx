import { useCallback } from "react";

import { quotePost as quotePostService } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import { usePostForm } from "@/hooks/usePostForm";

import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import QuoteItem from "@/components/QuoteItem";
import ThreadLine from "@/components/ThreadLine";
import BaseThreadModal from "@/components/BaseModal";
import PostComposer from "@/components/PostComposer";

const QuoteModal = ({ post, isOpen, onClose }) => {
  const currentUser = useCurrentUser();

  const handleReplySubmit = useCallback(
    async ({ content }) => {
      await quotePostService(post.id, {
        content,
        reply_permission: post.reply_permission,
      });
    },
    [post.id, post.reply_permission],
  );

  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(handleReplySubmit);

  const handleClose = () => {
    onClose();
    resetContent();
  };

  const onSubmit = async () => {
    await handleSubmit();
    handleClose();
  };

  return (
    <BaseThreadModal
      content={content}
      title="Thread mới"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative">
            <ThreadLine show />
            <UserProfileDialog user={currentUser} />
          </div>
          <div className="w-full">
            <PostComposer
              user={currentUser}
              content={content}
              onFocus={isOpen}
              onChange={handleChangeContent}
              placeholder="Hãy chia sẻ suy nghĩ của bạn..."
            />
            <div>
              {loading ? (
                <div className="flex justify-center">
                  <Loading size={"w-6 h-6"} />
                </div>
              ) : (
                post && <QuoteItem quotedPostId={post.id} quotedPost={post} />
              )}
            </div>
          </div>
        </div>
        {/* Add to thread */}
        {/* <div className="flex flex-col gap-2">
          <ThreadComposer
            user={currentUser}
            content={content}
            onChange={handleChangeContent}
            placeholder="Bạn nói thêm đi..."
            autoFocus
            showThreadLine
          />
        </div> */}
      </div>
    </BaseThreadModal>
  );
};
export default QuoteModal;
