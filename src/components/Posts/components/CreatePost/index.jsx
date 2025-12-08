import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";

import UserAvatar from "@/components/UserAvatar";
import { useCurrentUser } from "@/features/auth";
import BaseThreadModal from "@/components/BaseModal";
import { useMemo, useState } from "react";
import PostComposer from "@/components/PostComposer";
import ThreadLine from "@/components/ThreadLine";
import { Button } from "@/components/ui/button";
import { usePostForm } from "@/hooks/usePostForm";
import { useDispatch } from "react-redux";
import { createPost } from "@/services/Posts";

const CreatePost = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const idFake = useMemo(() => `temp-${uuidv4()}`, []);

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
    setIsOpen(false);
    resetContent();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-300 p-4">
      <div className="flex w-full items-center">
        <Link to={"/profile"}>
          <UserAvatar imgSize="w-9 h-9" src={currentUser.avatar_url} />
        </Link>
        <div
          className="w-full rounded-md p-2 text-sm text-gray-400"
          onClick={handleOpen}
        >
          Có gì mới?
        </div>
        <BaseThreadModal
          content={content}
          onSubmit={onSubmit}
          loading={loading}
          isOpen={isOpen}
          onClose={handleClose}
          title={"Thread mới"}
        >
          <div className="relative flex gap-2">
            <ThreadLine show lineStyle="bg-gray-200" />
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
        <Button variant={"outline"} onClick={handleOpen}>
          Đăng
        </Button>
      </div>
    </div>
  );
};
export default CreatePost;
