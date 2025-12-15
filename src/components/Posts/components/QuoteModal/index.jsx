import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  optimisticUpdateQuotePost,
  rollbackQuotePost,
  updateQuotePost,
} from "@/features/posts/postSlice";

import { useCurrentUser } from "@/features/auth";
import { usePostForm } from "@/hooks/usePostForm";
import BaseThreadModal from "@/components/modals/BaseModal";
import ThreadLine from "@/components/common/ThreadLine";
import UserProfileDialog from "@/components/users/UserProfileDialog";
import PostComposer from "../../PostComposer";
import Loading from "@/components/common/Loading";
import QuoteItem from "@/components/common/QuoteItem";
import { quotePost } from "@/services/Posts";

const QuoteModal = ({ post, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const currentUser = useCurrentUser();
  const postId = post?.id;

  const handleReplySubmit = useCallback(
    async ({ content }) => {
      const response = await quotePost(postId, {
        content,
        reply_permission: post.reply_permission,
      });
      dispatch(updateQuotePost({ response, idFake }));
    },
    [postId, post.reply_permission, dispatch, idFake],
  );

  const {
    loading,
    contentTest,
    handleSubmit,
    threads,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
    resetThreads,
  } = usePostForm(handleReplySubmit);

  const handleClose = () => {
    onClose();
    resetThreads();
  };

  const onSubmit = async () => {
    const dataFake = {
      id: idFake,
      content: contentTest,
      user: currentUser,
      created_at: new Date().toISOString(),
      original_post: post,
      original_post_id: postId,
      likes_count: 0,
      replies_count: 0,
    };

    dispatch(optimisticUpdateQuotePost(dataFake));
    const success = await handleSubmit();

    if (!success) {
      dispatch(rollbackQuotePost({ idFake }));
    }
    handleClose();
  };

  return (
    <BaseThreadModal
      content={contentTest}
      title="Thread mới"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
      onAddThread={handleAddThread}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative">
            <ThreadLine show />
            <UserProfileDialog user={currentUser} />
          </div>
          <div className="w-full">
            {threads.map((thread) => {
              return (
                <PostComposer
                  user={currentUser}
                  onFocus={isOpen}
                  onChange={(e) =>
                    handleThreadContentChange(thread.id, e.target.value)
                  }
                  placeholder="Hãy chia sẻ suy nghĩ của bạn..."
                  onRemoveThread={() => handleRemoveThread(thread.id)}
                />
              );
            })}

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
      </div>
    </BaseThreadModal>
  );
};
export default QuoteModal;
