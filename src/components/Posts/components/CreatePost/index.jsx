import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserAvatar from "@/components/UserAvatar";
import { useCurrentUser } from "@/features/auth";

const CreatePost = () => {
  const currentUser = useCurrentUser();
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-300 p-4">
      <div className="flex w-full items-center">
        <Link to={"/profile"}>
          <UserAvatar imgSize="w-9 h-9" src={currentUser.avatar_url} />
        </Link>
        <div className="w-full rounded-md p-2 text-sm text-gray-400">
          Có gì mới?
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Đăng</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-between">
              <p>Hủy</p>
              <span className="font-bold">Thread mới</span>
              <div></div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreatePost;
