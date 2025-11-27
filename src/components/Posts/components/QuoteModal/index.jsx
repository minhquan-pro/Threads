import { useState } from "react";
import { toast } from "react-toastify";
import { Image } from "lucide-react";

import { quotePost as quotePostService } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import PostHeader from "../PostHeader";
import QuoteItem from "@/components/QuoteItem";
import UserAvatar from "@/components/UserAvatar";
import ThreadLine from "@/components/ThreadLine";
import BaseThreadModal from "@/components/BaseModal";

const QuoteModal = ({ post, isOpen, onClose }) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleQuotePost = async () => {
    setLoading(true);
    try {
      (await quotePostService(post.id, {
        content,
        reply_permission: post.reply_permission,
      }),
        toast("Đã đăng", {
          autoClose: 1000,
          theme: "dark",
          position: "bottom-center",
        }));
    } catch (error) {
      console.log(error);
      toast.error("Đăng bài thất bại. Vui lòng thử lại!", {
        autoClose: 1000,
        theme: "colored",
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <BaseThreadModal
      title="Thread mới"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleQuotePost}
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
