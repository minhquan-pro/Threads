import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FeedItem from "@/components/FeedItem";
import { Link } from "react-router";
import { toast } from "@/utils/toast";

const EmbedModal = ({ isOpen, post, onClose }) => {
  const embedUrl = `${window.location.origin}/${post.user.username}/post/${post.id}/embed`;

  const embedCode = `<iframe src="${embedUrl}" width="100%" height="100%" frameborder="0" scrolling="no" allow="fullscreen"></iframe>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast.default("Đã sao chép");
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Không thể sao chép");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto">
        <div className="space-y-4">
          <div>
            <div className="relative rounded-lg">
              <div className="m-auto h-fit max-w-[550px] rounded-2xl border border-gray-400 bg-white p-5 shadow-sm">
                <FeedItem post={post} />
              </div>
              <Link
                to={`/@${post.user.username}/post/${post.id}`}
                className="absolute inset-0"
                target="_blank"
              />
            </div>
          </div>

          <div className="relative">
            <Input
              value={embedCode}
              readOnly
              className="bg-gray-100 py-7 pr-24 font-mono text-sm shadow-none"
            />
            <Button
              size="sm"
              className="absolute top-1/2 right-1 min-h-10 min-w-20 -translate-y-1/2"
              onClick={handleCopyCode}
            >
              Sao chép
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedModal;
