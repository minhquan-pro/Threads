import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { createPost } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import { ConfirmDiscardDialogProvider } from "@/contexts/ConfirmDiscardDialogContext";

import ThreadList from "@/components/Posts/ThreadList";
import BaseThreadModal from "../BaseModal";
import { usePostViewNavigation } from "@/hooks";
import { usePostForm } from "@/hooks/usePostForm";

const CreatePostModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { viewPost } = usePostViewNavigation();

  const idFake = useMemo(() => `temp-${uuidv4()}`, []);
  const currentUser = useCurrentUser();

  const handleReplySubmit = async ({ content }) => {
    try {
      const response = await dispatch(
        createPost({ content, idFake, user: currentUser }),
      ).unwrap();
      return response;
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
  } = usePostForm(handleReplySubmit, { onSuccessView: viewPost });

  const onSubmit = async () => {
    handleClose();
    await handleSubmit();
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
