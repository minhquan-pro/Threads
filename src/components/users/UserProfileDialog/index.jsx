import { Plus } from "lucide-react";
import { useState } from "react";

import AuthRequiredDialog from "@/components/auth/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../../ui/button";
import { Modal, ModalContent, ModalTitle } from "@/components/common/Modal";
import { Link } from "react-router";

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
        className="fixed inset-0 flex items-center justify-center"
      >
        <ModalContent
          className="mx-auto w-72 max-w-sm border border-gray-200 bg-white p-3 dark:border-[#2f2f2f] dark:bg-[#181818]"
          aria-describedby="user-dialog-desc"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <ModalTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </ModalTitle>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {user.username}
              </p>
            </div>
            <UserAvatar src={user.avatar_url} imgSize="h-14 w-14" />
          </div>

          <p
            className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100"
            id="user-dialog-desc"
          >
            {user.bio}
          </p>

          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            10 người theo dõi
          </div>

          {!currentUser ? (
            <AuthRequiredDialog
              type="button"
              title="Đăng ký để theo dõi"
              description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
              buttonClasses="w-full bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 mt-4"
            >
              Theo dõi
            </AuthRequiredDialog>
          ) : currentUser.id !== user.id ? (
            <Button className="mt-5 w-full dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Theo dõi
            </Button>
          ) : (
            <Button className="mt-5 w-full dark:bg-white dark:text-black dark:hover:bg-gray-200">
              <Link to={"/profile"}>Đi vào trang cá nhân</Link>
            </Button>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserProfileDialog;
