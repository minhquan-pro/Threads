import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../ui/button";

const UserProfileDialog = ({ user }) => {
  const currentUser = useCurrentUser();

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger className="border-none outline-none">
          <UserAvatar
            username={user.name}
            userId={user.id}
            src={user.avatar_url}
            imgSize="h-10 w-10"
            Icon={Plus}
          />
        </DialogTrigger>
        <DialogContent
          className="w-80 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          aria-describedby="user-dialog-desc"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </DialogTitle>
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
            <Button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
              Theo dõi
            </Button>
          ) : (
            <AuthRequiredDialog
              type="button"
              title="Đăng ký để theo dõi"
              description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
              buttonClasses="w-full bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Theo dõi
            </AuthRequiredDialog>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileDialog;
