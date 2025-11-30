import { Image } from "lucide-react";

import { quotePost as quotePostService } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import PostHeader from "../PostHeader";
import QuoteItem from "@/components/QuoteItem";
import ThreadLine from "@/components/ThreadLine";
import BaseThreadModal from "@/components/BaseModal";
import { usePostForm } from "@/hooks/usePostForm";

const QuoteModal = ({ post, isOpen, onClose }) => {
  const currentUser = useCurrentUser();

  const { loading, content, handleChangeContent, resetContent, handleSubmit } =
    usePostForm(
      async ({ content }) => {
        await quotePostService(post.id, {
          content,
          reply_permission: post.reply_permission,
        });
      },
      {
        successMessage: "Đã đăng",
        errorMessage: "Đăng bài thất bại. Vui lòng thử lại!",
        onSuccess: () => {
          onClose();
          resetContent();
        },
      },
    );

  const handleClose = () => {
    onClose();
    resetContent();
  };

  const onSubmit = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <BaseThreadModal
      title="Thread mới"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={onSubmit}
      loading={loading}
    >
      <div className="flex w-full gap-3">
        <div className="relative">
          <ThreadLine show />
          <UserProfileDialog user={currentUser} />
        </div>
        <div className="w-full">
          <PostHeader user={currentUser} hideDate />
          <input
            className="w-full border-none p-0 text-sm shadow-none outline-none placeholder:text-gray-600"
            placeholder="Hãy chia sẻ suy nghĩ của bạn..."
            value={content}
            onChange={handleChangeContent}
          />
          <div className="mt-3 flex items-center gap-3">
            <Image color="gray" size={20} />
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center">
                <Loading size={"w-6 h-6"} />
              </div>
            ) : (
              post && <QuoteItem quotedPostId={post.id} quotedPost={post} />
            )}
          </div>
        </div>
      </div>
    </BaseThreadModal>
  );
};
export default QuoteModal;
