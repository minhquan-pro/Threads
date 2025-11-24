import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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

import { getPostById, quotePost } from "@/services/Posts";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import Loading from "@/components/Loading";
import FeedItem from "@/components/FeedItem";
import PostHeader from "../PostHeader";

const QuoteModal = ({ postId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [content, setContent] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !postId) return;

    (async () => {
      setLoading(true);
      try {
        const response = await getPostById(postId);
        setPost(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, postId, isOpen, onClose]);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    setPost(null);
    onClose();
    setContent("");
  };

  const handleQuotePost = async () => {
    setLoading(true);
    try {
      (await quotePost(postId, { content, reply_permission: "everyone" }),
        toast("Đã đăng", {
          autoClose: 1000,
          theme: "dark",
          position: "bottom-center",
        }));
    } catch (error) {
      toast.error("Đăng bài thất bại. Vui lòng thử lại!", {
        autoClose: 1000,
        theme: "colored",
        position: "bottom-center",
      });
      console.log(error);
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
              className="border-none shadow-none"
            >
              Hủy
            </Button>
            <DialogTitle className="m-auto">Thread mới</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex w-full gap-3 p-2">
          <UserProfileDialog user={currentUser} />
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

            <div className="mt-5 w-full rounded-md border border-gray-300 p-3 shadow">
              {loading ? (
                <div className="flex justify-center">
                  <Loading size={"w-6 h-6"} />
                </div>
              ) : (
                post && <FeedItem post={post} variant="quote" />
              )}
            </div>
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
