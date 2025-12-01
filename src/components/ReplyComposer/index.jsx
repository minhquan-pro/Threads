import { Image, X } from "lucide-react";
import PostHeader from "../Posts/components/PostHeader";
import ThreadLine from "../ThreadLine";
import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../ui/button";

const ReplyComposer = ({
  placeholder,
  showClose = false,
  content,
  onChange,
  disabled = false,
}) => {
  const currentUser = useCurrentUser();

  return (
    <div className="relative mt-4 flex gap-2">
      <ThreadLine show lineStyle="bg-gray-200!" />
      <div className="flex gap-2">
        <UserAvatar />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostHeader user={currentUser} hideDate />
            {showClose && (
              <Button variant={"outline"} className={"border-none shadow-none"}>
                <X />
              </Button>
            )}
          </div>
          <input
            className="w-full border-none p-0 shadow-none outline-none placeholder:text-[#050505]/50"
            placeholder={placeholder}
            value={content}
            onChange={onChange}
            disabled={disabled}
            autoFocus
          />
          <div className="mt-3 flex items-center gap-3">
            <Image color="gray" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComposer;
