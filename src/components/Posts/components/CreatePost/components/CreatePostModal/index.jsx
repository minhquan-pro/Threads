import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Ellipsis } from "lucide-react";

import ThreadLine from "@/components/ThreadLine";
import UserAvatar from "@/components/UserAvatar";
import PostComposer from "@/components/PostComposer";

import { useCurrentUser } from "@/features/auth";
import { usePostForm } from "@/hooks/usePostForm";
import { createPost } from "@/services/Posts";
import PostModalFooter from "@/components/PostModalFooter";

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

      resetContent();
      onClose();

      onPostCreated?.(result);
    } catch (error) {
      throw new Error(error);
    }
  };

  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(handlePostSubmit);

  const contentLength = String(content || "").length;
  const isSubmitDisabled = contentLength > maxLength || contentLength === 0;

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="z-50 flex max-h-[500px] w-[500px] flex-col gap-2 rounded-2xl border border-gray-300 bg-white shadow-md"
    >
      {/* Header */}
      <div className="sticky top-0 right-0 left-0 flex items-center justify-between border-b border-gray-300 bg-white p-3">
        <div
          className="cursor-pointer font-semibold hover:opacity-70"
          onClick={onClose}
        >
          Hủy
        </div>
        <div className="font-bold">Threads mới</div>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-50"
          disabled={loading}
        >
          <Ellipsis size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="relative flex w-full gap-2">
          <ThreadLine show />
          <UserAvatar user={currentUser} />
          <div className="flex-1">
            <PostComposer
              user={currentUser}
              placeholder="Có gì mới?"
              autoFocus
              content={content}
              onChange={handleChangeContent}
              disabled={loading}
            />
          </div>
        </div>

        {/* Add to thread button */}
        <button
          type="button"
          className="mt-4 flex items-center gap-2 pl-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          disabled={loading}
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
    </form>
  );
};

export default CreatePostForm;
