import { Image, MapPin, Smile } from "lucide-react";

import { quotePost as quotePostService } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import PostHeader from "../PostHeader";
import QuoteItem from "@/components/QuoteItem";
import ThreadLine from "@/components/ThreadLine";
import BaseThreadModal from "@/components/BaseModal";
import CommentActionToolbar from "@/components/CommentActionToolbar";
import { usePostForm } from "@/hooks/usePostForm";
import PostComposer from "@/components/PostComposer";

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
          <PostComposer
            user={currentUser}
            content={content}
            onFocus={isOpen}
            onChange={handleChangeContent}
            placeholder="Hãy chia sẻ suy nghĩ của bạn..."
          />
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
