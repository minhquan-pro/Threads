import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";

const UserProfileDialog = ({ avatarUrl }) => {
  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger>
          <UserAvatar src={avatarUrl} imgSize="h-10 w-10" Icon={Check} />
        </DialogTrigger>
        <DialogContent className="w-80">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">Leminhquan</span>
              <span>leminhquan022_</span>
            </div>
            <UserAvatar src={avatarUrl} imgSize="h-14 w-14" />
          </div>
          <p className="text-foreground text-sm font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          </p>
          <span className="text-sm text-gray-500">23 người theo dõi</span>
          <AuthRequiredDialog
            type="button"
            title="Đăng ký để theo dõi"
            description="Hãy tham gia Threads để không bỏ lỡ các bài viết của fcbayern."
            buttonClasses="w-full  bg-black text-white"
          >
            Theo dõi
          </AuthRequiredDialog>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UserProfileDialog;
