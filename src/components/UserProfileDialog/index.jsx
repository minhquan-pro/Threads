import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";
import defaultImageUser from "@/assets/image/defaultImageUser.png";
import { useCurrentUser } from "@/features/auth";
import { Button } from "../ui/button";

const UserProfileDialog = ({ user }) => {
  const currentUser = useCurrentUser();

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger>
          <UserAvatar
            src={user.avatar_url || defaultImageUser}
            imgSize="h-10 w-10"
            Icon={Plus}
          />
        </DialogTrigger>
        <DialogContent className="w-80" aria-describedby="user-dialog-desc">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <DialogTitle className="text-lg font-bold">
                {user.name}
              </DialogTitle>
              <span>{user.username}</span>
            </div>
            <UserAvatar
              src={user.avatar_url || defaultImageUser}
              imgSize="h-14 w-14"
            />
          </div>
          <p
            className="text-foreground text-sm font-semibold"
            id="user-dialog-desc"
          >
            {user.bio}
          </p>
          <span className="text-sm text-gray-500">23 người theo dõi</span>

          {currentUser ? (
            <Button>Theo dõi</Button>
          ) : (
            <AuthRequiredDialog
              type="button"
              title="Đăng ký để theo dõi"
              description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
              buttonClasses="w-full  bg-black text-white"
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
