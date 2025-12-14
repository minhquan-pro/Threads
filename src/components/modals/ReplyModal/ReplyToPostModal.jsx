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
import ThreadComposer from "@/components/Posts/ThreadComposer";

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
    dispatch(optimisticIncrementRepliesCount({ postId: post.id }));

    const dataFake = {
      id: idFake,
      content,
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

export default ReplyToPostModal;
