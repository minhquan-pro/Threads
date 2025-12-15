import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { createPost } from "@/services/Posts";
import { usePostForm } from "@/hooks/usePostForm";
import { useCurrentUser } from "@/features/auth";
import { ConfirmDiscardDialogProvider } from "@/contexts/ConfirmDiscardDialogContext";

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
        {threads.map((thread, index) => {
          return (
            <div key={thread.id} className="relative flex gap-2">
              <ThreadLine show lineStyle="bg-gray-200 dark:bg-gray-700" />
              <div className="flex w-full gap-2">
                <UserAvatar user={currentUser} />
                <div className="flex-1">
                  <PostComposer
                    onRemoveThread={() => handleRemoveThread(thread.id)}
                    showRemoveButton={thread.showButton}
                    user={currentUser}
                    value={thread.content}
                    onChange={(e) =>
                      handleThreadContentChange(thread.id, e.target.value)
                    }
                    placeholder={
                      index === 0 ? "Có gì mới?" : "Bạn nói thêm gì đi..."
                    }
                    autoFocus={index === threads.length - 1}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </BaseThreadModal>
    </ConfirmDiscardDialogProvider>
  );
};

export default CreatePostModal;
