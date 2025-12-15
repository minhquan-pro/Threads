import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import UserAvatar from "@/components/users/UserAvatar";
import ThreadLine from "@/components/common/ThreadLine";
import PostModalFooter from "@/components/Posts/PostModalFooter";
import PostModalHeader from "@/components/Posts/PostModalHeader";

import { usePostForm } from "@/hooks/usePostForm";
import { useCurrentUser } from "@/features/auth";
import { createPost } from "@/services/Posts";
import PostComposer from "../../PostComposer";

const CreatePostForm = ({ onPostCreated, onClose, maxLength = 500 }) => {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);

  const handlePostSubmit = async ({ content }) => {
    try {
      const result = await dispatch(
        createPost({
          content: content.trim(),
          idFake,
          user: currentUser,
        }),
      ).unwrap();

      resetThreads();
      onClose();
      onPostCreated?.(result);
    } catch (error) {
      throw new Error(error);
    }
  };

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
  } = usePostForm(handlePostSubmit);

  const contentLength = String(firstThreadContent || "").length;
  const lastThreadContent = threads[threads.length - 1]?.content || "";
  const canAddThread = lastThreadContent.trim().length > 0;
  const isSubmitDisabled = loading || contentLength > maxLength || !hasContent;

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="z-50 flex max-h-[500px] min-w-[520px] flex-col gap-2 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md dark:border-[#373535] dark:bg-[#181818]">
      {/* Header */}
      <PostModalHeader
        title={"Threads mới"}
        content={firstThreadContent}
        onClose={onClose}
      />

      {/* Content */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-3">
        {threads.map((thread, index) => (
          <div key={thread.id} className="relative mb-4 flex w-full gap-2">
            <ThreadLine show lineStyle="bg-gray-200 dark:bg-gray-700" />
            <UserAvatar user={currentUser} />
            <div className="flex-1">
              <PostComposer
                user={currentUser}
                placeholder={
                  index === 0 ? "Có gì mới?" : "Bạn nói thêm gì đi..."
                }
                autoFocus={index === threads.length - 1}
                value={thread.content}
                showRemoveButton={thread.showButton}
                onChange={(e) =>
                  handleThreadContentChange(thread.id, e.target.value)
                }
                onRemoveThread={() => handleRemoveThread(thread.id)}
                disabled={loading}
              />
            </div>
          </div>
        ))}

        {/* Add to thread button */}
        <button
          type="button"
          className="mt-4 flex items-center gap-2 pl-3 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-300"
          disabled={loading || !canAddThread}
          onClick={handleAddThread}
        >
          <UserAvatar user={currentUser} imgSize="w-4 h-4" />
          <span className="text-sm">Thêm vào threads</span>
        </button>
      </div>

      {/* Footer */}
      <PostModalFooter
        onSubmit={onSubmit}
        loading={loading}
        isSubmitDisabled={isSubmitDisabled}
        contentLength={contentLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CreatePostForm;
