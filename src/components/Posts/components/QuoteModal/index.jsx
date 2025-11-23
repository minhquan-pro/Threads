import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PostHeader from "../PostHeader";
import { useCurrentUser } from "@/features/auth";
import UserProfileDialog from "@/components/UserProfileDialog";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostById } from "@/services/Posts";
import Loading from "@/components/Loading";
import FeedItem from "@/components/FeedItem";

const QuoteModal = ({ postId, isOpen, handleQuote }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, [dispatch, postId]);

  if (!post) return;

  return (
    <Dialog open={isOpen} onOpenChange={handleQuote} className="border-none">
      <DialogContent className="max-w-[600px] min-w-[500px]">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="outline" className="border-none shadow-none">
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
            />
            <div className="mt-3 flex items-center gap-3">
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
              <Image color="gray" size={20} />
            </div>

            {loading ? (
              <Loading size={"w-6 h-6"} />
            ) : (
              <div className="mt-5 w-full rounded-md border border-gray-400 p-3">
                <FeedItem post={post} variant="quote" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button>Đăng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default QuoteModal;
