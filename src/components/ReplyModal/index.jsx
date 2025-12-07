import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { useCurrentUser } from "@/features/auth";
import { createComments } from "@/services/comment";

import { usePostForm } from "@/hooks/usePostForm";
import ThreadLine from "../ThreadLine";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";

import {
  optimisticDecrementRepliesCount,
  optimisticIncrementRepliesCount,
} from "@/features/posts/postSlice";
import {
  addCommentOptimistic,
  removeOptimisticComment,
  updateComment,
} from "@/features/comments/commentSlice";
import UserAvatar from "../UserAvatar";
import PostComposer from "../PostComposer";
import ThreadComposer from "../ThreadComposer";

const ReplyModal = ({ post, isOpen, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const postId = post.id;

  const handleReplySubmit = async ({ content }) => {
    const response = await createComments({
      postId,
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
  };

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
      <div className="relative mt-4 flex gap-2">
        <ThreadLine show lineStyle="bg-gray-200" />
        <div className="flex flex-col gap-2">
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

export default ReplyModal;
