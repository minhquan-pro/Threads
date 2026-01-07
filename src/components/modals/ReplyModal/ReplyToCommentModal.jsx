import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { usePostForm } from "@/hooks/usePostForm";
import { v4 as uuidv4 } from "uuid";

import { useCurrentUser } from "@/features/auth";
import { createComments } from "@/services/comment";
import {
  addCommentOptimistic,
  updateComment,
} from "@/features/comments/commentSlice";
import BaseThreadModal from "../BaseModal";
import ThreadLine from "@/components/common/ThreadLine";
import FeedItem from "@/components/Posts/FeedItem";
import PostComposer from "@/components/Posts/PostComposer";
import UserAvatar from "@/components/users/UserAvatar";
import { usePostViewNavigation } from "@/hooks";

const ReplyToCommentModal = ({ post, isOpen, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const commentId = post?.id;
  const originalPostId = post?.parent_id;
  const { viewPost } = usePostViewNavigation();

  const handleReplySubmit = useCallback(
    async ({ content }) => {
      const response = await createComments({
        id: commentId,
        content,
        reply_permission: post.reply_permission,
      });

      dispatch(
        updateComment({
          reply: response.data,
          idFake,
          parentId: commentId,
          postId: originalPostId,
        }),
      );
      return response.data;
    },
    [commentId, post.reply_permission, dispatch, idFake, originalPostId],
  );

  const {
    loading,
    threads,
    firstThreadContent,
    hasContent,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
    resetThreads,
    handleSubmit,
  } = usePostForm(handleReplySubmit, {
    errorMessage: "Không thể đăng bình luận. Vui lòng thử lại!",
    onSuccessView: viewPost,
  });

  const lastThreadContent = threads[threads.length - 1]?.content;

  const handleClose = () => {
    resetThreads();
    onClose();
  };

  const onSubmit = async () => {
    handleClose();

    const dataFake = {
      id: idFake,
      content: firstThreadContent,
      postId: originalPostId,
      parentId: commentId,
      user: currentUser,
      created_at: new Date().toISOString(),
      likes_count: 0,
      replies_count: 0,
    };

    dispatch(addCommentOptimistic(dataFake));

    await handleSubmit();
  };

  return (
    <BaseThreadModal
      hasContent={hasContent}
      content={firstThreadContent}
      lastThreadContent={lastThreadContent}
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
          <div key={thread.id} className="relative mt-4 flex">
            <ThreadLine show lineStyle="bg-gray-200" />
            <div className="flex w-full gap-2">
              <UserAvatar user={currentUser} />
              <div className="flex-1">
                <PostComposer
                  content={thread.content}
                  value={thread.content}
                  showRemoveButton={thread.showButton}
                  onRemoveThread={() => handleRemoveThread(thread.id)}
                  user={currentUser}
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

export default ReplyToCommentModal;
