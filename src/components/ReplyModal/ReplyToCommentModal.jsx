import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { useCurrentUser } from "@/features/auth";
import { createComments } from "@/services/comment";

import { usePostForm } from "@/hooks/usePostForm";
import ThreadLine from "../ThreadLine";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";

import {
  addReplyOptimistic,
  removeOptimisticComment,
  updateReply,
} from "@/features/comments/commentSlice";
import ThreadComposer from "../ThreadComposer";

const ReplyToCommentModal = ({ post, isOpen, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const commentId = post.id;

  const handleReplySubmit = useCallback(
    async ({ content }) => {
      const response = await createComments({
        id: commentId,
        content,
        reply_permission: post.reply_permission,
      });

      dispatch(
        updateReply({
          reply: response.data,
          idFake,
          commentId,
        }),
      );
      return response.data;
    },
    [dispatch, idFake, post.reply_permission, commentId],
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
      commentId,
      user: currentUser,
      created_at: new Date().toISOString(),
      likes_count: 0,
      replies_count: 0,
    };

    dispatch(addReplyOptimistic(dataFake));

    const success = await handleSubmit();

    if (!success) {
      dispatch(removeOptimisticComment({ commentId, idFake }));
    }
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
