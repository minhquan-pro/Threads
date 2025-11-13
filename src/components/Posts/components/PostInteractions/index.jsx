import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { Heart, MessageCircle, Plus, Repeat2, Send } from "lucide-react";

const PostInteractions = ({
  likes = [],
  comments = [],
  reports = [],
  shares = [],
  onLikes = () => {},
  onComments = () => {},
  onReports = () => {},
  onShares = () => {},
}) => {
  return (
    <div>
      <Button
        onClick={onLikes}
        variant="outline"
        className={classNames("m-auto border-none text-gray-500 shadow-none", {
          "rounded-full": !likes.length,
        })}
      >
        <Heart />
        {likes.length ? <span>{likes.length}</span> : null}
      </Button>
    </div>
  );
};
export default PostInteractions;
