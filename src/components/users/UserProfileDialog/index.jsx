import { Plus } from "lucide-react";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import { useState } from "react";

import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../../ui/button";

const UserProfileDialog = ({ user }) => {
  const currentUser = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="border-none outline-none"
      >
        <UserAvatar
          username={user.name}
          userId={user.id}
          src={user.avatar_url}
          imgSize="h-10 w-10"
          Icon={Plus}
        />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex items-center justify-center"
      >
        <ModalContent
          className="w-80 border border-gray-200 bg-white dark:border-[#2f2f2f] dark:bg-[#181818]"
          aria-describedby="user-dialog-desc"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <ModalTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </ModalTitle>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.username}
              </span>
            </div>
            <UserAvatar src={user.avatar_url} imgSize="h-14 w-14" />
          </div>

          <p
            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            id="user-dialog-desc"
          >
            {user.bio}
          </p>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            23 người theo dõi
          </span>

          {currentUser ? (
            <Button className="dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Theo dõi
            </Button>
          ) : (
            <AuthRequiredDialog
              type="button"
              title="Đăng ký để theo dõi"
              description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
              buttonClasses="w-full bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Theo dõi
            </AuthRequiredDialog>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserProfileDialog;
