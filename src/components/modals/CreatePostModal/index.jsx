import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { createPost } from "@/services/Posts";
import { usePostForm } from "@/hooks/usePostForm";
import { useCurrentUser } from "@/features/auth";
import { ConfirmDiscardDialogProvider } from "@/contexts/ConfirmDiscardDialogContext";

import ThreadList from "@/components/Posts/ThreadList";
import BaseThreadModal from "../BaseModal";

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

  const {
    loading,
    resetThreads,
    threads,
    firstThreadContent,
    hasContent,
    handleSubmit,
    handleAddThread,
    handleThreadContentChange,
    handleRemoveThread,
  } = usePostForm(handleReplySubmit);

  const onSubmit = async () => {
    await handleSubmit();
    handleClose();
  };

  const handleClose = () => {
    resetThreads();
    onClose();
  };

  const lastThreadContent = threads[threads.length - 1]?.content || "";

  return (
    <ConfirmDiscardDialogProvider showSaveOption={true}>
      <BaseThreadModal
        firstThreadContent={firstThreadContent}
        lastThreadContent={lastThreadContent}
        hasContent={hasContent}
        onSubmit={onSubmit}
        loading={loading}
        isOpen={open}
        onClose={handleClose}
        title={"Thread mới"}
        onAddThread={handleAddThread}
      >
        <ThreadList
          threads={threads}
          currentUser={currentUser}
          loading={loading}
          onContentChange={handleThreadContentChange}
          onRemoveThread={handleRemoveThread}
        />
      </BaseThreadModal>
    </ConfirmDiscardDialogProvider>
  );
};

export default CreatePostModal;
