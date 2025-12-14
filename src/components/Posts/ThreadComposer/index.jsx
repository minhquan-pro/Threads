import ThreadLine from "@/components/common/ThreadLine";
import UserAvatar from "@/components/users/UserAvatar";
import PostComposer from "../PostComposer";

const ThreadComposer = ({
  user,
  content,
  onChange,
  placeholder,
  autoFocus = false,
  disabled = false,
  showThreadLine = false,
  lineStyle,
}) => {
  return (
    <div className="relative flex gap-2">
      {showThreadLine && <ThreadLine show lineStyle={lineStyle} />}
      <div className="flex w-full gap-2">
        <UserAvatar />
        <div className="flex-1">
          <PostComposer
            user={user}
            content={content}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadComposer;
