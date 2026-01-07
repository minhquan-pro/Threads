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
import UserAvatar from "@/components/users/UserAvatar";
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
    threads,
    firstThreadContent,
    hasContent,
    handleSubmit,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
    resetThreads,
  } = usePostForm(handleReplySubmit);

  const handleClose = () => {
    resetThreads();
    onClose();
  };

  const onSubmit = async () => {
    handleClose();

    const dataFake = {
      id: idFake,
      content: firstThreadContent,
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
  };

  const lastThreadContent = threads[threads.length - 1]?.content || "";

  return (
    <BaseThreadModal
      firstThreadContent={firstThreadContent}
      lastThreadContent={lastThreadContent}
      hasContent={hasContent}
      title="Thread mới"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
      submitDisabled={!hasContent}
      onAddThread={handleAddThread}
    >
      <div className="flex w-full flex-col gap-3">
        {threads.map((thread, index) => (
          <div key={thread.id} className="flex gap-3">
            <div className="relative">
              <ThreadLine show />
              {index === 0 ? (
                <UserProfileDialog user={currentUser} />
              ) : (
                <UserAvatar user={currentUser} />
              )}
            </div>
            <div className="w-full">
              <PostComposer
                content={thread.content}
                user={currentUser}
                value={thread.content}
                showRemoveButton={thread.showButton}
                onFocus
                onChange={(e) =>
                  handleThreadContentChange(thread.id, e.target.value)
                }
                placeholder={
                  index === 0
                    ? "Hãy chia sẻ suy nghĩ của bạn..."
                    : "Bạn nói thêm gì đi..."
                }
                onRemoveThread={() => handleRemoveThread(thread.id)}
              />

              {index === 0 && (
                <div className="mt-2">
                  {loading ? (
                    <div className="flex justify-center">
                      <Loading size={"w-6 h-6"} />
                    </div>
                  ) : (
                    post && (
                      <QuoteItem quotedPostId={post.id} quotedPost={post} />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </BaseThreadModal>
  );
};

export default QuoteModal;
