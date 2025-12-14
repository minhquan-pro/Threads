import { Link } from "react-router";

import { useCurrentUser } from "@/features/auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreatePostModal from "@/components/modals/CreatePostModal";
import UserAvatar from "@/components/users/UserAvatar";

const CreatePost = () => {
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-300 bg-white p-4 dark:border-gray-800 dark:bg-[#181818]">
      <div className="flex w-full items-center">
        <Link to={"/profile"}>
          <UserAvatar imgSize="w-9 h-9" src={currentUser.avatar_url} />
        </Link>
        <div
          className="w-full cursor-pointer rounded-md p-2 text-sm text-gray-400 transition-colors hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOpen();
            }
          }}
        >
          Có gì mới?
        </div>
        <CreatePostModal open={isOpen} onClose={handleClose} />
        <Button
          variant={"outline"}
          onClick={handleOpen}
          className="border-gray-300 dark:bg-black dark:text-white"
        >
          Đăng
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
