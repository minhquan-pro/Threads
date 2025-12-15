import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePostForm } from "@/hooks/usePostForm";

import { useCurrentUser } from "@/features/auth";
import { createComments } from "@/services/comment";
import {
  addCommentOptimistic,
  removeOptimisticComment,
  updateComment,
} from "@/features/comments/commentSlice";
import {
  optimisticDecrementRepliesCount,
  optimisticIncrementRepliesCount,
} from "@/features/posts/postSlice";

import BaseThreadModal from "../BaseModal";
import ThreadLine from "@/components/common/ThreadLine";
import FeedItem from "@/components/Posts/FeedItem";
import UserAvatar from "@/components/users/UserAvatar";
import PostComposer from "@/components/Posts/PostComposer";

const ReplyToPostModal = ({ post, isOpen, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const postId = post.id;

  const handleReplySubmit = useCallback(
    async ({ content }) => {
      const response = await createComments({
        id: postId,
        content,
        reply_permission: post.reply_permission,
      });
      dispatch(
        updateComment({
          reply: response.data,
          idFake,
          postId,
        }),
      );
      return response.data;
    },
    [dispatch, idFake, post.reply_permission, postId],
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
  } = usePostForm(handleReplySubmit, {
    successMessage: "Đã đăng",
    errorMessage: "Không thể đăng bình luận. Vui lòng thử lại!",
  });

  const handleClose = () => {
    resetThreads();
    onClose();
  };

  const onSubmit = async () => {
    dispatch(optimisticIncrementRepliesCount({ postId: post.id }));

    const dataFake = {
      id: idFake,
      content: firstThreadContent,
      postId,
      user: currentUser,
      created_at: new Date().toISOString(),
      likes_count: 0,
      replies_count: 0,
    };

    dispatch(addCommentOptimistic(dataFake));

    const success = await handleSubmit();

    if (!success) {
      dispatch(optimisticDecrementRepliesCount({ postId: post.id }));
      dispatch(removeOptimisticComment({ postId, idFake }));
    }
    handleClose();
  };

  const lastThreadContent = threads[threads.length - 1]?.content || "";

  return (
    <BaseThreadModal
      firstThreadContent={firstThreadContent}
      lastThreadContent={lastThreadContent}
      hasContent={hasContent}
      title="Thread trả lời"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
      submitDisabled={!hasContent}
      onAddThread={handleAddThread}
    >
      <div className="relative flex gap-2">
        <ThreadLine show />
        <FeedItem
          post={post}
          hideInteraction={true}
          showMenu={false}
          disableNavigation
        />
      </div>
      {threads.map((thread, index) => {
        return (
          <div key={thread.id} className="relative mt-2 flex">
            <ThreadLine show lineStyle="bg-gray-200" />
            <div className="flex w-full gap-2">
              <UserAvatar user={currentUser} />
              <div className="flex-1">
                <PostComposer
                  user={currentUser}
                  value={thread.content}
                  showRemoveButton={thread.showButton}
                  onRemoveThread={() => handleRemoveThread(thread.id)}
                  onChange={(e) =>
                    handleThreadContentChange(thread.id, e.target.value)
                  }
                  placeholder={
                    index === 0
                      ? `Trả lời ${post.user.username}...`
                      : "Bạn nói thêm gì đi..."
                  }
                  autoFocus={index === threads.length - 1}
                />
              </div>
            </div>
          </div>
        );
      })}
    </BaseThreadModal>
  );
};

export default ReplyToPostModal;
