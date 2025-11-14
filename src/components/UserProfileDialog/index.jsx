import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthRequiredDialog from "@/components/AuthRequiredDialog";
import UserAvatar from "../UserAvatar";

const UserProfileDialog = () => {
  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger>
          <UserAvatar
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
            imgSize="h-10 w-10"
            Icon={Check}
          />
        </DialogTrigger>
        <DialogContent className="w-80">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">Leminhquan</span>
              <span>leminhquan022_</span>
            </div>
            <UserAvatar
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
              imgSize="h-14 w-14"
            />
          </div>
          <p className="text-sm font-semibold text-black">
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
