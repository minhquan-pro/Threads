import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ArrowUpDown, Ellipsis } from "lucide-react";

import ThreadLine from "@/components/ThreadLine";
import UserAvatar from "@/components/UserAvatar";
import PostComposer from "@/components/PostComposer";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/features/auth";
import { usePostForm } from "@/hooks/usePostForm";
import { createPost } from "@/services/Posts";

const CreatePostForm = ({ onPostCreated, onClose }) => {
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

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-[500px] flex-col gap-2 rounded-2xl border border-gray-300 bg-white shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 p-3">
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
      <div className="flex-1 p-3">
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
          className="mt-2 flex items-center gap-2 pl-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          disabled={loading}
        >
          <UserAvatar user={currentUser} imgSize="w-4 h-4" />
          <span className="text-sm">Thêm vào threads</span>
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-300 p-3">
        <Button
          type="button"
          variant="outline"
          className="mr-auto border-none p-0 text-gray-500 shadow-none outline-none hover:bg-white disabled:opacity-50"
          disabled={loading}
        >
          <div className="rounded-sm border-2 p-0.5">
            <ArrowUpDown size={18} />
          </div>
          <span className="ml-1 text-sm">Các lựa chọn để kiểm soát</span>
        </Button>

        <Button
          type="submit"
          disabled={loading || !content.trim()}
          className="min-w-20"
        >
          {loading ? "Đang đăng..." : "Đăng"}
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
