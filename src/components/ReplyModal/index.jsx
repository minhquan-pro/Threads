import ThreadLine from "../ThreadLine";
import ReplyComposer from "../ReplyComposer";
import FeedItem from "../FeedItem";
import BaseThreadModal from "../BaseModal";

const ReplyModal = ({ post, isOpen, onClose }) => {
  return (
    <BaseThreadModal title="Thread trả lời" isOpen={isOpen} onClose={onClose}>
      <div className="relative flex gap-2">
        <ThreadLine show />
        <FeedItem post={post} hideInteraction={true} />
      </div>
      <div>
        <ReplyComposer
          user={post.user}
          placeholder={`Trả lời ${post.user.username}`}
        />
      </div>
    </BaseThreadModal>
  );
};
export default ReplyModal;
