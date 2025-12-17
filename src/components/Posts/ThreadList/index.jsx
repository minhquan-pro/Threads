import UserAvatar from "@/components/users/UserAvatar";
import ThreadLine from "@/components/common/ThreadLine";
import PostComposer from "../PostComposer";

const ThreadList = ({
  threads,
  currentUser,
  loading,
  onContentChange,
  onRemoveThread,
}) => {
  return (
    <>
      {threads.map((thread, index) => (
        <div key={thread.id} className="relative flex gap-2">
          <ThreadLine show lineStyle="bg-gray-200 dark:bg-gray-700" />
          <div className="flex w-full gap-2">
            <UserAvatar user={currentUser} />
            <div className="flex-1">
              <PostComposer
                content={thread.content}
                user={currentUser}
                value={thread.content}
                onChange={(e) => onContentChange(thread.id, e.target.value)}
                onRemoveThread={() => onRemoveThread(thread.id)}
                showRemoveButton={thread.showButton}
                placeholder={
                  index === 0 ? "Có gì mới?" : "Bạn nói thêm gì đi..."
                }
                autoFocus={index === threads.length - 1}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ThreadList;
