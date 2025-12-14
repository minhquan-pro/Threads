import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { createPost } from "@/services/Posts";
import { usePostForm } from "@/hooks/usePostForm";
import { useCurrentUser } from "@/features/auth";

import BaseThreadModal from "../BaseModal";
import ThreadLine from "../../common/ThreadLine";
import UserAvatar from "@/components/users/UserAvatar";
import PostComposer from "@/components/Posts/PostComposer";

const CreatePostModal = ({ open, onClose }) => {
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();

  const handleReplySubmit = async ({ content }) => {
    try {
      await dispatch(
        createPost({ content, idFake, user: currentUser }),
      ).unwrap();
    } catch (error) {
      throw new Error(error);
    }
  };

  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(handleReplySubmit);

  const onSubmit = async () => {
    await handleSubmit();
    handleClose();
  };

  const handleClose = () => {
    resetContent();
    onClose();
  };

  return (
    <BaseThreadModal
      content={content}
      onSubmit={onSubmit}
      loading={loading}
      isOpen={open}
      onClose={handleClose}
      title={"Thread mới"}
    >
      <div className="relative flex gap-2">
        <ThreadLine show lineStyle="bg-gray-200 dark:bg-gray-700" />
        <div className="flex w-full gap-2">
          <UserAvatar />
          <div className="flex-1">
            <PostComposer
              user={currentUser}
              content={content}
              onChange={handleChangeContent}
              placeholder="Có gì mới?"
              autoFocus
            />
          </div>
        </div>
      </div>
    </BaseThreadModal>
  );
};
export default CreatePostModal;
