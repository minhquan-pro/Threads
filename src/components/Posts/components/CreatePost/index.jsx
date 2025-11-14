import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/UserAvatar";
import { Link } from "react-router";

const CreatePost = () => {
  return (
    <div className="flex items-center justify-between gap-2 border-b p-4">
      <div className="flex w-full items-center">
        <Link to={"/đ"}>
          <UserAvatar
            imgSize="w-9 h-9 border"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
          />
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
