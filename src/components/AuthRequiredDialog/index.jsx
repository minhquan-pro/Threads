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

const AuthRequiredDialog = ({
  id,
  title,
  description,
  buttonClasses,
  // eslint-disable-next-line no-unused-vars
  Component,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={classNames(buttonClasses, "hover:text-black", {
            "bg-gray-100": id === "create",
          })}
        >
          <Component size={26} />
        </div>
      </DialogTrigger>
      <DialogContent className="flex max-h-[380px] max-w-[400px] flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
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

export default AuthRequiredDialog;
