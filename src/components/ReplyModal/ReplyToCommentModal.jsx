import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { useCurrentUser } from "@/features/auth";
import { createComments } from "@/services/comment";

import { usePostForm } from "@/hooks/usePostForm";
import ThreadLine from "../ThreadLine";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";

import ThreadComposer from "../ThreadComposer";
import {
  addCommentOptimistic,
  updateComment,
} from "@/features/comments/commentSlice";

const ReplyToCommentModal = ({ post, isOpen, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const commentId = post?.id;
  const originalPostId = post?.parent_id;

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

  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(handleReplySubmit, {
      successMessage: "Đã đăng",
      errorMessage: "Không thể đăng bình luận. Vui lòng thử lại!",
    });

  const handleClose = () => {
    resetContent();
    onClose();
  };

  const onSubmit = async () => {
    const dataFake = {
      id: idFake,
      content,
      postId: originalPostId,
      parentId: commentId,
      user: currentUser,
      created_at: new Date().toISOString(),
      likes_count: 0,
      replies_count: 0,
    };

    dispatch(addCommentOptimistic(dataFake));

    await handleSubmit();
    handleClose();
  };

  return (
    <BaseThreadModal
      content={content}
      title="Thread trả lời"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
      submitDisabled={!content.trim()}
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
      <div className="relative mt-4 flex gap-2">
        <ThreadLine show lineStyle="bg-gray-200" />
        <div className="flex w-full flex-col gap-2">
          <ThreadComposer
            user={currentUser}
            content={content}
            onChange={handleChangeContent}
            placeholder={`Trả lời ${post.user.username}...`}
            autoFocus
          />
        </div>
      </div>
    </BaseThreadModal>
  );
};

export default ReplyToCommentModal;
