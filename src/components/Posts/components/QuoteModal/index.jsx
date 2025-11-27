import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Image } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { quotePost as quotePostService } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import PostHeader from "../PostHeader";
import { PermissionContext } from "@/context/PermissionContext";
import QuoteItem from "@/components/QuoteItem";
import UserAvatar from "@/components/UserAvatar";
import ThreadLine from "@/components/ThreadLine";

const QuoteModal = ({ post, postId, isOpen, onClose }) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { permission } = useContext(PermissionContext);

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
      (await quotePostService(postId, {
        content,
        reply_permission: permission,
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
    <Dialog open={isOpen} onOpenChange={handleClose} className="border-none">
      <DialogContent className="max-w-[600px] min-w-[500px]">
        <DialogHeader>
          <div className="flex items-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="text-md border-none shadow-none"
            >
              Hủy
            </Button>
            <DialogTitle className="m-auto">Thread mới</DialogTitle>
          </div>
        </DialogHeader>
        <div>
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
          <div className="mt-4 flex items-center gap-2 pl-3">
            <UserAvatar imgSize="w-4 h-4" />
            <div className="text-sm text-gray-500">Thêm vào threads</div>
          </div>
        </div>
        <DialogFooter>
          <Button disabled={!content.trim()} onClick={handleQuotePost}>
            Đăng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default QuoteModal;
