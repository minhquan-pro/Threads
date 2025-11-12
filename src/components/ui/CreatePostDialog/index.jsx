import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import classNames from "classnames";
import { Link } from "react-router";

const CreatePostDialog = ({ index, buttonClasses, Component }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={classNames(
            buttonClasses,
            "cursor-pointer bg-gray-100 hover:text-black",
          )}
        >
          <Component size={26} />
        </div>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[450px] flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Đăng nhập để đăng
          </DialogTitle>
          <DialogDescription className="text-center">
            Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy
            nghĩ bất chợt và hơn thế nữa.
          </DialogDescription>
        </DialogHeader>
        <Link
          to={"/login"}
          className="rounded-md border border-gray-400 p-3 text-center text-lg font-semibold shadow-sm hover:opacity-80"
        >
          Nhấn vào đây để đăng nhập
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
