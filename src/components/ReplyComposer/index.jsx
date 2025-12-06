import { X } from "lucide-react";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../ui/button";
import ThreadLine from "../ThreadLine";
import UserAvatar from "../UserAvatar";
import PostComposer from "../PostComposer";

const ReplyComposer = ({
  placeholder,
  showClose = false,
  onClose,
  content,
  onChange,
  disabled = false,
}) => {
  const currentUser = useCurrentUser();

  return (
    <div className="relative mt-4 flex gap-2">
      <ThreadLine show lineStyle="bg-gray-200" />
      <div className="flex gap-2">
        <UserAvatar />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostComposer
              user={currentUser}
              content={content}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              autoFocus
            />
            {showClose && (
              <Button
                variant="outline"
                className="border-none shadow-none"
                onClick={onClose}
              >
                <X />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComposer;
